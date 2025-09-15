import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IdempotencyService } from '../common/services/idempotency.service';
import { ConfigService } from '@nestjs/config';
import {
  AddWalletBalanceDto,
  ProcessRidePaymentDto,
  ConfirmDriverPaymentDto,
  WalletBalanceResponse,
  TransactionResponse,
  PaymentMethodOption,
} from './dto';
import {
  PaymentMethod,
  TransactionType,
  TransactionStatus,
  PaymentStatus,
} from '@prisma/client';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private readonly stripe: Stripe | null = null;
  private readonly isSimulationMode: boolean;
  private readonly isStripeEnabled: boolean;

  // 🔥 CONSTANTES DA PLATAFORMA
  private readonly PLATFORM_FEE_PERCENTAGE = 0.1; // 10%
  private readonly DRIVER_NEGATIVE_BALANCE_LIMIT = -15.0; // -R$15,00

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly idempotency?: IdempotencyService,
  ) {
    const stripeKey = this.configService.get<string>('STRIPE_SECRET_KEY');

    this.isStripeEnabled = Boolean(
      stripeKey &&
        stripeKey.length > 10 &&
        !stripeKey.includes('your_key_here') &&
        !stripeKey.includes('placeholder'),
    );
    this.isSimulationMode = !this.isStripeEnabled;

    if (this.isStripeEnabled) {
      this.stripe = new Stripe(stripeKey!, {
        apiVersion: '2025-06-30.basil',
      });
    }

    this.logger.log(
      `PaymentsService iniciado - Modo: ${this.isStripeEnabled ? 'HABILITADO' : 'DESABILITADO'} | Simulação: ${this.isSimulationMode ? 'SIMULAÇÃO' : 'PRODUÇÃO'} | Taxa da plataforma: ${(this.PLATFORM_FEE_PERCENTAGE * 100).toFixed(1)}%`,
    );
  }

  // ==================== CARTEIRA DO USUÁRIO (mantido) ====================

  async getOrCreateWallet(userId: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { wallet: true },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (!user.wallet) {
      try {
        const wallet = await this.prisma.userWallet.create({
          data: {
            userId,
            balance: 0.0,
          },
        });
        return wallet;
      } catch (error: any) {
        // Se for erro de constraint unique, tenta buscar a wallet existente
        if (error.code === 'P2002' && error.meta?.target?.includes('userId')) {
          this.logger.warn(`Wallet já existe para usuário ${userId}, buscando...`);
          const existingWallet = await this.prisma.userWallet.findUnique({
            where: { userId },
          });
          if (existingWallet) {
            return existingWallet;
          }
        }
        throw error;
      }
    }

    return user.wallet;
  }

  async getWalletBalance(userId: string): Promise<WalletBalanceResponse> {
    const wallet = await this.getOrCreateWallet(userId);

    return {
      balance: wallet.balance,
      currency: wallet.currency,
      isBlocked: wallet.isBlocked,
      blockReason: wallet.blockReason,
      lastUpdated: wallet.updatedAt,
    };
  }

  async addWalletBalance(
    userId: string,
    addBalanceDto: AddWalletBalanceDto,
  ): Promise<{
    success: boolean;
    data: any;
    message: string;
  }> {
    try {
      const wallet = await this.getOrCreateWallet(userId);
      if (wallet.isBlocked) {
        throw new BadRequestException(
          `Carteira bloqueada: ${wallet.blockReason}`,
        );
      }

      if (this.isSimulationMode) {
        this.logger.log(
          `[SIMULAÇÃO] Adicionando R$ ${addBalanceDto.amount} à carteira do usuário ${userId}`,
        );

        await this.delay(1500);

        const transaction = await this.prisma.transaction.create({
          data: {
            userId,
            walletId: wallet.id,
            type: TransactionType.WALLET_TOPUP,
            status: TransactionStatus.COMPLETED,
            amount: addBalanceDto.amount,
            description: `Adição de saldo via ${addBalanceDto.paymentMethod || 'cartão'} (simulação)`,
            stripePaymentIntentId: `pi_sim_${Date.now()}`,
            metadata: {
              paymentMethod: addBalanceDto.paymentMethod || 'CREDIT_CARD',
              isSimulation: true,
            },
            processedAt: new Date(),
          },
        });

        const updatedWallet = await this.prisma.userWallet.update({
          where: { id: wallet.id },
          data: {
            balance: wallet.balance + addBalanceDto.amount,
          },
        });

        return {
          success: true,
          data: {
            transactionId: transaction.id,
            amount: addBalanceDto.amount,
            newBalance: updatedWallet.balance,
            status: 'COMPLETED',
            paymentIntentId: transaction.stripePaymentIntentId,
            isSimulation: true,
          },
          message: 'Saldo adicionado com sucesso (simulação)',
        };
      }

      // MODO PRODUÇÃO - Criar transação pendente que será processada via Stripe
      this.logger.log(
        `[PRODUÇÃO] Criando transação pendente para usuário ${userId} - R$ ${addBalanceDto.amount}`,
      );

      const transaction = await this.prisma.transaction.create({
        data: {
          userId,
          walletId: wallet.id,
          type: TransactionType.WALLET_TOPUP,
          status: TransactionStatus.PENDING,
          amount: addBalanceDto.amount,
          description: `Adição de saldo via ${addBalanceDto.paymentMethod || 'cartão'}`,
          metadata: {
            paymentMethod: addBalanceDto.paymentMethod || 'CREDIT_CARD',
            isSimulation: false,
          },
        },
      });

      return {
        success: true,
        data: {
          transactionId: transaction.id,
          amount: addBalanceDto.amount,
          newBalance: wallet.balance,
          status: 'PENDING',
          requiresStripePayment: true,
          isSimulation: false,
        },
        message: 'Transação criada - proceda com o pagamento via Stripe',
      };
    } catch (error) {
      this.logger.error('Erro ao adicionar saldo:', error);
      return {
        success: false,
        data: null,
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao processar adição de saldo',
      };
    }
  }

  // ==================== 🔥 NOVOS MÉTODOS DE TRANSFERÊNCIA ====================

  /**
   * Transfere saldo entre duas carteiras de forma atômica
   */
  async transferWalletBalance(
    fromUserId: string,
    toUserId: string,
    amount: number,
    description: string,
    rideId?: string,
    metadata?: any,
  ): Promise<{
    success: boolean;
    data: any;
    message: string;
  }> {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        // Buscar carteiras
        const fromWallet = await this.getOrCreateWallet(fromUserId);
        const toWallet = await this.getOrCreateWallet(toUserId);

        // Validações with detailed logging
        if (fromWallet.isBlocked) {
          this.logger.error(`❌ Transfer failed: Sender wallet ${fromUserId} is blocked: ${fromWallet.blockReason}`);
          throw new BadRequestException(
            `Carteira do remetente bloqueada: ${fromWallet.blockReason}`,
          );
        }

        if (toWallet.isBlocked) {
          this.logger.error(`❌ Transfer failed: Recipient wallet ${toUserId} is blocked: ${toWallet.blockReason}`);
          throw new BadRequestException(
            `Carteira do destinatário bloqueada: ${toWallet.blockReason}`,
          );
        }

        if (fromWallet.balance < amount) {
          this.logger.error(
            `❌ Transfer failed: Insufficient balance. Sender ${fromUserId} has R$ ${fromWallet.balance.toFixed(2)}, needs R$ ${amount.toFixed(2)}`,
          );
          throw new BadRequestException(
            `Saldo insuficiente. Disponível: R$ ${fromWallet.balance.toFixed(2)}, Necessário: R$ ${amount.toFixed(2)}`,
          );
        }

        this.logger.log(
          `🔄 Processing wallet transfer: R$ ${amount} from ${fromUserId} (balance: R$ ${fromWallet.balance.toFixed(2)}) to ${toUserId} (balance: R$ ${toWallet.balance.toFixed(2)})`,
        );

        // Debitar do remetente
        const updatedFromWallet = await prisma.userWallet.update({
          where: { id: fromWallet.id },
          data: {
            balance: fromWallet.balance - amount,
          },
        });

        // Creditar ao destinatário
        const updatedToWallet = await prisma.userWallet.update({
          where: { id: toWallet.id },
          data: {
            balance: toWallet.balance + amount,
          },
        });

        // Criar transação de débito
        const debitTransaction = await prisma.transaction.create({
          data: {
            userId: fromUserId,
            walletId: fromWallet.id,
            rideId,
            type: TransactionType.RIDE_PAYMENT,
            status: TransactionStatus.COMPLETED,
            amount: -amount, // Negativo para débito
            description: `Transferência enviada: ${description}`,
            processedAt: new Date(),
            metadata: {
              ...metadata,
              transferType: 'DEBIT',
              recipientUserId: toUserId,
              originalAmount: amount,
            },
          },
        });

        // Criar transação de crédito
        const creditTransaction = await prisma.transaction.create({
          data: {
            userId: toUserId,
            walletId: toWallet.id,
            rideId,
            type: TransactionType.RIDE_PAYMENT,
            status: TransactionStatus.COMPLETED,
            amount: amount, // Positivo para crédito
            description: `Transferência recebida: ${description}`,
            processedAt: new Date(),
            metadata: {
              ...metadata,
              transferType: 'CREDIT',
              senderUserId: fromUserId,
              originalAmount: amount,
              relatedTransactionId: debitTransaction.id,
            },
          },
        });

        this.logger.log(
          `💰 Transferência realizada: R$ ${amount} de ${fromUserId} para ${toUserId}. Saldos: ${updatedFromWallet.balance.toFixed(2)} -> ${updatedToWallet.balance.toFixed(2)}`,
        );

        return {
          success: true,
          data: {
            amount,
            fromUserId,
            toUserId,
            fromBalance: updatedFromWallet.balance,
            toBalance: updatedToWallet.balance,
            debitTransaction: debitTransaction.id,
            creditTransaction: creditTransaction.id,
          },
          message: 'Transferência realizada com sucesso',
        };
      });
    } catch (error) {
      this.logger.error('Erro na transferência:', error);
      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : 'Erro na transferência',
      };
    }
  }

  /**
   * Calcula as taxas da plataforma e valor líquido para o motorista
   */
  calculatePlatformFees(rideAmount: number): {
    grossAmount: number;
    platformFee: number;
    netAmount: number;
    feePercentage: number;
  } {
    const platformFee = rideAmount * this.PLATFORM_FEE_PERCENTAGE;

    return {
      grossAmount: rideAmount,
      platformFee: Math.round(platformFee * 100) / 100, // Arredondar para 2 casas
      netAmount: Math.round((rideAmount - platformFee) * 100) / 100,
      feePercentage: this.PLATFORM_FEE_PERCENTAGE,
    };
  }

  /**
   * Processa o pagamento completo da corrida: passageiro -> motorista -> taxa
   */
  async processRideWalletPayment(
    passengerId: string,
    driverId: string,
    rideAmount: number,
    rideId: string,
    description: string,
  ): Promise<{
    success: boolean;
    data: any;
    message: string;
  }> {
    try {
      // Validate input parameters
      if (!passengerId || !driverId || !rideId) {
        this.logger.error(`❌ Invalid parameters for ride payment: passenger=${passengerId}, driver=${driverId}, ride=${rideId}`);
        throw new BadRequestException('Invalid payment parameters');
      }

      if (rideAmount <= 0) {
        this.logger.error(`❌ Invalid ride amount: R$ ${rideAmount}`);
        throw new BadRequestException('Invalid ride amount');
      }

      const fees = this.calculatePlatformFees(rideAmount);

      this.logger.log(
        `🎯 Processing ride payment ${rideId}: R$ ${fees.grossAmount} (net: R$ ${fees.netAmount}, platform fee: R$ ${fees.platformFee}) - passenger: ${passengerId}, driver: ${driverId}`,
      );

      return await this.prisma.$transaction(async (prisma) => {
        // 1. Transferir valor total do passageiro para o motorista
        const transferResult = await this.transferWalletBalance(
          passengerId,
          driverId,
          fees.grossAmount,
          `Pagamento da corrida - ${description}`,
          rideId,
          {
            ridePayment: true,
            grossAmount: fees.grossAmount,
            netAmount: fees.netAmount,
            platformFee: fees.platformFee,
          },
        );

        if (!transferResult.success) {
          throw new BadRequestException(transferResult.message);
        }

        // 2. Debitar taxa da plataforma do motorista
        const driverWallet = await this.getOrCreateWallet(driverId);
        const newBalance = driverWallet.balance - fees.platformFee;

        if (newBalance < this.DRIVER_NEGATIVE_BALANCE_LIMIT) {
          this.logger.warn(
            `⚠️ Motorista ${driverId} atingiu limite de saldo negativo. Saldo atual: R$ ${driverWallet.balance}, Taxa: R$ ${fees.platformFee}, Limite: R$ ${this.DRIVER_NEGATIVE_BALANCE_LIMIT}`,
          );

          // Criar débito pendente que será cobrado depois
          await prisma.transaction.create({
            data: {
              userId: driverId,
              walletId: driverWallet.id,
              rideId,
              type: TransactionType.CANCELLATION_FEE,
              status: TransactionStatus.PENDING,
              amount: -fees.platformFee,
              description: `Taxa da plataforma pendente - ${description}`,
              metadata: {
                ridePayment: true,
                feeType: 'PLATFORM_FEE',
                feePercentage: fees.feePercentage,
                originalRideAmount: fees.grossAmount,
                isPending: true,
                exceedsNegativeLimit: true,
                currentBalance: driverWallet.balance,
                negativeLimit: this.DRIVER_NEGATIVE_BALANCE_LIMIT,
              },
            },
          });
        } else {
          // Debitar taxa imediatamente (permitindo saldo negativo até o limite)
          await prisma.userWallet.update({
            where: { id: driverWallet.id },
            data: {
              balance: newBalance,
            },
          });

          await prisma.transaction.create({
            data: {
              userId: driverId,
              walletId: driverWallet.id,
              rideId,
              type: TransactionType.CANCELLATION_FEE,
              status: TransactionStatus.COMPLETED,
              amount: -fees.platformFee,
              description: `Taxa da plataforma - ${description}`,
              processedAt: new Date(),
              metadata: {
                ridePayment: true,
                feeType: 'PLATFORM_FEE',
                feePercentage: fees.feePercentage,
                originalRideAmount: fees.grossAmount,
              },
            },
          });

          this.logger.log(
            `💳 Taxa da plataforma debitada: R$ ${fees.platformFee} do motorista ${driverId}. Novo saldo: R$ ${newBalance}${newBalance < 0 ? ' (NEGATIVO)' : ''}`,
          );
        }

        return {
          success: true,
          data: {
            rideId,
            grossAmount: fees.grossAmount,
            netAmount: fees.netAmount,
            platformFee: fees.platformFee,
            feePercentage: fees.feePercentage,
            transferData: transferResult.data,
          },
          message: 'Pagamento da corrida processado com sucesso',
        };
      });
    } catch (error) {
      this.logger.error('Erro ao processar pagamento da corrida:', error);
      return {
        success: false,
        data: null,
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao processar pagamento da corrida',
      };
    }
  }

  // ==================== SIMPLIFIED WALLET PAYMENT METHOD ====================

  /**
   * Simplified method for automatic wallet payment processing on ride completion
   */
  async processAutomaticWalletPayment(
    rideId: string,
    passengerId: string,
    driverId: string,
    amount: number,
  ): Promise<{
    success: boolean;
    data: any;
    message: string;
  }> {
    try {
      this.logger.log(
        `🚀 Starting automatic wallet payment for ride ${rideId}: R$ ${amount}`,
      );

      // Get wallet balances
      const passengerWallet = await this.getOrCreateWallet(passengerId);
      const driverWallet = await this.getOrCreateWallet(driverId);

      // Validate passenger wallet
      if (passengerWallet.isBlocked) {
        throw new BadRequestException(
          `Passenger wallet blocked: ${passengerWallet.blockReason}`,
        );
      }

      if (passengerWallet.balance < amount) {
        throw new BadRequestException(
          `Insufficient passenger balance. Available: R$ ${passengerWallet.balance.toFixed(2)}, Required: R$ ${amount.toFixed(2)}`,
        );
      }

      // Validate driver wallet
      if (driverWallet.isBlocked) {
        throw new BadRequestException(
          `Driver wallet blocked: ${driverWallet.blockReason}`,
        );
      }

      // Process the full wallet transfer
      const transferResult = await this.processRideWalletPayment(
        passengerId,
        driverId,
        amount,
        rideId,
        `Automatic payment for completed ride ${rideId.substring(0, 8)}`,
      );

      if (!transferResult.success) {
        throw new BadRequestException(`Transfer failed: ${transferResult.message}`);
      }

      // Update payment record directly
      await this.prisma.payment.upsert({
        where: { rideId },
        create: {
          rideId,
          amount,
          method: PaymentMethod.WALLET_BALANCE,
          status: PaymentStatus.PAID,
          confirmedByDriver: true,
          driverConfirmationTime: new Date(),
          driverNotes: 'Automatic payment processing for completed ride',
        },
        update: {
          status: PaymentStatus.PAID,
          confirmedByDriver: true,
          driverConfirmationTime: new Date(),
          method: PaymentMethod.WALLET_BALANCE,
          driverNotes: 'Automatic payment processing for completed ride',
        },
      });

      // Update ride payment status
      await this.prisma.ride.update({
        where: { id: rideId },
        data: {
          paymentStatus: PaymentStatus.PAID,
        },
      });

      this.logger.log(
        `✅ Automatic wallet payment completed for ride ${rideId}: R$ ${amount} (net: R$ ${transferResult.data.netAmount}, fee: R$ ${transferResult.data.platformFee})`,
      );

      return {
        success: true,
        data: {
          rideId,
          amount,
          method: PaymentMethod.WALLET_BALANCE,
          status: PaymentStatus.PAID,
          processedAt: new Date(),
          transferData: transferResult.data,
          platformFee: transferResult.data.platformFee,
          netAmount: transferResult.data.netAmount,
        },
        message: 'Automatic wallet payment processed successfully',
      };
    } catch (error) {
      this.logger.error(`❌ Automatic wallet payment failed for ride ${rideId}:`, error);
      return {
        success: false,
        data: null,
        message: error instanceof Error ? error.message : 'Automatic wallet payment failed',
      };
    }
  }

  // ==================== MÉTODOS DE PAGAMENTO ATUALIZADOS ====================

  async getPaymentMethods(userId: string): Promise<PaymentMethodOption[]> {
    const wallet = await this.getOrCreateWallet(userId);

    const methods: PaymentMethodOption[] = [
      {
        code: 'WALLET_BALANCE',
        name: 'Saldo da Conta',
        description: `Saldo disponível: R$ ${wallet.balance.toFixed(2)}`,
        available: wallet.balance > 0 && !wallet.isBlocked,
        icon: 'wallet',
        requiresBalance: true,
        isDigital: true,
      },
      {
        code: 'CASH',
        name: 'Dinheiro',
        description: 'Pagamento presencial em espécie',
        available: true,
        icon: 'cash',
        isDigital: false,
      },
      {
        code: 'PIX',
        name: 'PIX',
        description: 'Transferência via PIX presencial',
        available: true,
        icon: 'pix',
        isDigital: false,
      },
      {
        code: 'CARD_MACHINE',
        name: 'Cartão na Maquininha',
        description: 'Débito ou crédito na maquininha do motorista',
        available: true,
        icon: 'card-machine',
        isDigital: false,
      },
    ];

    return methods;
  }

  async processRidePayment(
    userId: string,
    processPaymentDto: ProcessRidePaymentDto,
    idempotencyKey?: string,
  ): Promise<{
    success: boolean;
    data: any;
    message: string;
  }> {
    try {
      const exec = async () => {
        const ride = await this.prisma.ride.findFirst({
        where: {
          id: processPaymentDto.rideId,
          passenger: { userId },
          status: 'COMPLETED', // Only accept completed rides
        },
        include: {
          passenger: { include: { user: true } },
          driver: { include: { user: true } },
          payment: true,
        },
      });

      if (!ride) {
        // Provide specific error messages for debugging
        const rideExists = await this.prisma.ride.findUnique({
          where: { id: processPaymentDto.rideId },
          select: { id: true, status: true, passenger: { select: { userId: true } } },
        });

        if (!rideExists) {
          this.logger.error(`❌ Payment failed: Ride ${processPaymentDto.rideId} not found`);
          throw new NotFoundException('Ride not found');
        }

        if (rideExists.passenger.userId !== userId) {
          this.logger.error(`❌ Payment failed: User ${userId} is not the passenger of ride ${processPaymentDto.rideId}`);
          throw new NotFoundException('Ride not found or access denied');
        }

        if (rideExists.status !== 'COMPLETED') {
          this.logger.error(`❌ Payment failed: Ride ${processPaymentDto.rideId} is in status ${rideExists.status}, expected COMPLETED`);
          throw new BadRequestException(`Ride not completed yet. Current status: ${rideExists.status}`);
        }

        throw new NotFoundException('Ride not found or ride is not completed yet');
      }

      if (ride.payment && ride.payment.status === PaymentStatus.PAID) {
        this.logger.warn(`⚠️ Payment attempt for already paid ride ${ride.id}`);
        throw new ConflictException('Ride already paid');
      }

      // Additional validation to prevent double payments
      if (ride.paymentStatus === PaymentStatus.PAID) {
        this.logger.warn(`⚠️ Payment attempt for ride ${ride.id} with paymentStatus already PAID`);
        throw new ConflictException('Ride payment already processed');
      }

      this.logger.log(`💳 Processing payment for ride ${ride.id}: ${processPaymentDto.paymentMethod}, amount: R$ ${processPaymentDto.amount}`);

      const result = await this.processPaymentByMethod(
        userId,
        ride,
        processPaymentDto,
      );

      return result;
      };

      if (idempotencyKey && this.idempotency) {
        return await this.idempotency.getOrSet(
          `payments:ridepay:${userId}:${idempotencyKey}`,
          10 * 60 * 1000,
          exec,
        );
      }

      return await exec();
    } catch (error) {
      this.logger.error('Erro ao processar pagamento da corrida:', error);

      return {
        success: false,
        data: null,
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao processar pagamento',
      };
    }
  }

  private async processPaymentByMethod(
    userId: string,
    ride: any,
    processPaymentDto: ProcessRidePaymentDto,
  ): Promise<any> {
    const { paymentMethod, amount, notes } = processPaymentDto;

    switch (paymentMethod) {
      case PaymentMethod.WALLET_BALANCE:
        // For completed rides, process wallet payment immediately
        if (ride.status === 'COMPLETED') {
          this.logger.log(`🚀 Processing immediate wallet payment for completed ride ${ride.id}`);
          return this.processCompletedWalletPayment(userId, ride, amount, notes);
        } else {
          // For non-completed rides, use the reservation system (backward compatibility)
          return this.reserveWalletPayment(userId, ride, amount, notes);
        }

      case PaymentMethod.CASH:
      case PaymentMethod.PIX:
      case PaymentMethod.CARD_MACHINE:
        return this.processPresentialPayment(
          ride,
          paymentMethod,
          amount,
          notes,
        );

      default:
        throw new BadRequestException('Payment method not supported');
    }
  }

  // 🔥 NEW METHOD: Process wallet payment immediately for completed rides
  private async processCompletedWalletPayment(
    userId: string,
    ride: any,
    amount: number,
    notes?: string,
  ): Promise<any> {
    const wallet = await this.getOrCreateWallet(userId);

    if (wallet.isBlocked) {
      throw new BadRequestException(
        `Wallet blocked: ${wallet.blockReason}`,
      );
    }

    if (wallet.balance < amount) {
      throw new BadRequestException(
        `Insufficient balance. Available: R$ ${wallet.balance.toFixed(2)}, Required: R$ ${amount.toFixed(2)}`,
      );
    }

    this.logger.log(
      `💰 Processing immediate wallet payment R$ ${amount} for completed ride ${ride.id}`,
    );

    // Process the full wallet payment immediately
    const transferResult = await this.processRideWalletPayment(
      userId, // passenger
      ride.driver.userId, // driver
      amount,
      ride.id,
      `Completed ride ${ride.id.substring(0, 8)}`,
    );

    if (!transferResult.success) {
      throw new BadRequestException(transferResult.message);
    }

    // Update payment record
    await this.prisma.payment.upsert({
      where: { rideId: ride.id },
      create: {
        rideId: ride.id,
        amount,
        method: PaymentMethod.WALLET_BALANCE,
        status: PaymentStatus.PAID,
        confirmedByDriver: true,
        driverConfirmationTime: new Date(),
        driverNotes: notes || 'Automatic payment processing for completed ride',
      },
      update: {
        method: PaymentMethod.WALLET_BALANCE,
        status: PaymentStatus.PAID,
        confirmedByDriver: true,
        driverConfirmationTime: new Date(),
        driverNotes: notes || 'Automatic payment processing for completed ride',
      },
    });

    // Update ride payment status
    await this.prisma.ride.update({
      where: { id: ride.id },
      data: {
        paymentStatus: PaymentStatus.PAID,
        finalPrice: amount,
      },
    });

    return {
      success: true,
      data: {
        rideId: ride.id,
        paymentMethod: PaymentMethod.WALLET_BALANCE,
        amount,
        status: 'COMPLETED',
        transferData: transferResult.data,
        platformFee: transferResult.data.platformFee,
        netAmount: transferResult.data.netAmount,
      },
      message: 'Wallet payment processed successfully',
    };
  }

  // 🔥 UPDATED METHOD: Keep original for non-completed rides (backward compatibility)
  private async reserveWalletPayment(
    userId: string,
    ride: any,
    amount: number,
    notes?: string,
  ): Promise<any> {
    const wallet = await this.getOrCreateWallet(userId);

    if (wallet.isBlocked) {
      throw new BadRequestException(
        `Carteira bloqueada: ${wallet.blockReason}`,
      );
    }

    if (wallet.balance < amount) {
      throw new BadRequestException(
        `Saldo insuficiente. Disponível: R$ ${wallet.balance.toFixed(2)}, Necessário: R$ ${amount.toFixed(2)}`,
      );
    }

    this.logger.log(
      `💰 Reservando R$ ${amount} da carteira do usuário ${userId} para corrida ${ride.id}`,
    );

    const transaction = await this.prisma.transaction.create({
      data: {
        userId,
        walletId: wallet.id,
        rideId: ride.id,
        type: TransactionType.RIDE_PAYMENT,
        status: TransactionStatus.PENDING,
        amount: -amount,
        description: `Pagamento reservado da corrida #${ride.id.substring(0, 8)}`,
        metadata: {
          paymentMethod: PaymentMethod.WALLET_BALANCE,
          driverNotes: notes,
          isReserved: true,
          originalBalance: wallet.balance,
        },
      },
    });

    await this.prisma.payment.upsert({
      where: { rideId: ride.id },
      create: {
        rideId: ride.id,
        amount,
        method: PaymentMethod.WALLET_BALANCE,
        status: PaymentStatus.PENDING,
        transactionId: transaction.id,
        confirmedByDriver: false,
        driverNotes: notes,
      },
      update: {
        method: PaymentMethod.WALLET_BALANCE,
        status: PaymentStatus.PENDING,
        transactionId: transaction.id,
        confirmedByDriver: false,
        driverNotes: notes,
      },
    });

    await this.prisma.ride.update({
      where: { id: ride.id },
      data: {
        paymentStatus: PaymentStatus.PENDING,
        finalPrice: amount,
      },
    });

    return {
      success: true,
      data: {
        rideId: ride.id,
        paymentMethod: PaymentMethod.WALLET_BALANCE,
        amount,
        currentBalance: wallet.balance,
        transactionId: transaction.id,
        status: 'RESERVED',
        requiresDriverConfirmation: true,
      },
      message: 'Saldo reservado - aguardando confirmação do motorista',
    };
  }

  private async processPresentialPayment(
    ride: any,
    paymentMethod: PaymentMethod,
    amount: number,
    notes?: string,
  ): Promise<any> {
    await this.prisma.payment.upsert({
      where: { rideId: ride.id },
      create: {
        rideId: ride.id,
        amount,
        method: paymentMethod,
        status: PaymentStatus.PENDING,
        driverNotes: notes,
        confirmedByDriver: false,
      },
      update: {
        method: paymentMethod,
        status: PaymentStatus.PENDING,
        driverNotes: notes,
        confirmedByDriver: false,
      },
    });

    const methodNames = {
      [PaymentMethod.CASH]: 'Dinheiro',
      [PaymentMethod.PIX]: 'PIX',
      [PaymentMethod.CARD_MACHINE]: 'Cartão na Maquininha',
    };

    return {
      success: true,
      data: {
        rideId: ride.id,
        paymentMethod,
        amount,
        status: 'PENDING_DRIVER_CONFIRMATION',
        requiresDriverConfirmation: true,
      },
      message: `Forma de pagamento registrada: ${methodNames[paymentMethod]}. Aguardando confirmação do motorista.`,
    };
  }

  // ==================== 🔥 CONFIRMAÇÃO ATUALIZADA COM TRANSFERÊNCIAS ====================

  async confirmDriverPayment(
    driverId: string,
    confirmPaymentDto: ConfirmDriverPaymentDto,
  ): Promise<{
    success: boolean;
    data: any;
    message: string;
  }> {
    try {
      const ride = await this.prisma.ride.findFirst({
        where: {
          id: confirmPaymentDto.rideId,
          driverId,
        },
        include: {
          payment: true,
          passenger: { include: { user: { include: { wallet: true } } } },
          driver: { include: { user: { include: { wallet: true } } } },
        },
      });

      if (!ride) {
        throw new NotFoundException(
          'Corrida não encontrada ou você não é o motorista desta corrida',
        );
      }

      if (!ride.payment) {
        throw new BadRequestException(
          'Nenhum pagamento registrado para esta corrida',
        );
      }

      const { paymentReceived, driverNotes } = confirmPaymentDto;

      if (ride.payment.method === PaymentMethod.WALLET_BALANCE) {
        return this.processWalletConfirmationWithTransfer(
          ride,
          paymentReceived,
          driverNotes,
        );
      } else {
        return this.processPresentialConfirmation(
          ride,
          paymentReceived,
          driverNotes,
        );
      }
    } catch (error) {
      this.logger.error('Erro ao confirmar pagamento:', error);

      return {
        success: false,
        data: null,
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao confirmar pagamento',
      };
    }
  }

  // 🔥 NOVO MÉTODO: Processa confirmação COM transferência automática
  private async processWalletConfirmationWithTransfer(
    ride: any,
    paymentReceived: boolean,
    driverNotes?: string,
  ): Promise<any> {
    const passengerWallet = ride.passenger.user.wallet;
    const driverWallet = ride.driver.user.wallet;

    if (!passengerWallet) {
      throw new BadRequestException('Carteira do passageiro não encontrada');
    }

    if (!driverWallet) {
      throw new BadRequestException('Carteira do motorista não encontrada');
    }

    const pendingTransaction = await this.prisma.transaction.findFirst({
      where: {
        rideId: ride.id,
        type: TransactionType.RIDE_PAYMENT,
        status: TransactionStatus.PENDING,
      },
    });

    if (!pendingTransaction) {
      throw new BadRequestException(
        'Transação pendente não encontrada para esta corrida',
      );
    }

    if (paymentReceived) {
      // ✅ MOTORISTA CONFIRMOU: Efetivar transferência completa
      this.logger.log(
        `✅ Confirmação recebida - processando transferência completa da corrida ${ride.id}`,
      );

      const transferResult = await this.processRideWalletPayment(
        ride.passenger.userId,
        ride.driver.userId,
        ride.payment.amount,
        ride.id,
        `Corrida ${ride.id.substring(0, 8)}`,
      );

      if (!transferResult.success) {
        await this.handleInsufficientFundsOnConfirmation(
          ride,
          pendingTransaction,
          passengerWallet.balance,
        );

        return {
          success: false,
          data: null,
          message: transferResult.message,
        };
      }

      // Atualizar transação pendente para cancelada (será substituída pelas novas)
      await this.prisma.transaction.update({
        where: { id: pendingTransaction.id },
        data: {
          status: TransactionStatus.CANCELLLED,
          processedAt: new Date(),
          metadata: {
            ...((pendingTransaction.metadata as Record<string, any>) || {}),
            replacedByTransfer: true,
            transferResult: transferResult.data,
          },
        },
      });

      // Atualizar pagamento
      const updatedPayment = await this.prisma.payment.update({
        where: { rideId: ride.id },
        data: {
          status: PaymentStatus.PAID,
          confirmedByDriver: true,
          driverConfirmationTime: new Date(),
          driverNotes: driverNotes || ride.payment.driverNotes,
        },
      });

      // Atualizar corrida
      await this.prisma.ride.update({
        where: { id: ride.id },
        data: {
          paymentStatus: PaymentStatus.PAID,
          status: 'COMPLETED',
        },
      });

      // Buscar saldos atualizados
      const updatedPassengerWallet = await this.getOrCreateWallet(
        ride.passenger.userId,
      );
      const updatedDriverWallet = await this.getOrCreateWallet(
        ride.driver.userId,
      );

      this.logger.log(
        `💰 Transferência completa efetuada: R$ ${ride.payment.amount}. Saldos - Passageiro: R$ ${updatedPassengerWallet.balance}, Motorista: R$ ${updatedDriverWallet.balance}`,
      );

      return {
        success: true,
        data: {
          rideId: ride.id,
          paymentStatus: updatedPayment.status,
          paymentReceived: true,
          confirmedAt: updatedPayment.driverConfirmationTime,
          method: updatedPayment.method,
          amount: updatedPayment.amount,
          passengerBalance: updatedPassengerWallet.balance,
          driverBalance: updatedDriverWallet.balance,
          platformFees: transferResult.data.platformFee,
          netAmount: transferResult.data.netAmount,
          transferId: transferResult.data.transferData?.debitTransaction,
        },
        message: 'Pagamento confirmado e transferência completa realizada',
      };
    } else {
      // ❌ MOTORISTA NÃO CONFIRMOU: Cancelar a transação
      this.logger.log(
        `❌ Pagamento não confirmado pelo motorista - cancelando reserva da corrida ${ride.id}`,
      );

      await this.prisma.transaction.update({
        where: { id: pendingTransaction.id },
        data: {
          status: TransactionStatus.CANCELLLED,
          failureReason: 'Pagamento não confirmado pelo motorista',
          processedAt: new Date(),
          metadata: {
            ...((pendingTransaction.metadata as Record<string, any>) || {}),
            confirmedByDriver: false,
            driverConfirmationTime: new Date(),
            driverNotes,
          },
        },
      });

      const updatedPayment = await this.prisma.payment.update({
        where: { rideId: ride.id },
        data: {
          status: PaymentStatus.FAILED,
          confirmedByDriver: true,
          driverConfirmationTime: new Date(),
          driverNotes: driverNotes || ride.payment.driverNotes,
        },
      });

      await this.prisma.ride.update({
        where: { id: ride.id },
        data: {
          paymentStatus: PaymentStatus.FAILED,
          status: 'COMPLETED',
        },
      });

      return {
        success: true,
        data: {
          rideId: ride.id,
          paymentStatus: updatedPayment.status,
          paymentReceived: false,
          confirmedAt: updatedPayment.driverConfirmationTime,
          method: updatedPayment.method,
          amount: updatedPayment.amount,
          currentBalance: passengerWallet.balance,
          transactionId: pendingTransaction.id,
        },
        message: 'Pagamento marcado como não recebido - saldo não foi debitado',
      };
    }
  }

  // Método para outros tipos de pagamento
  private async processPresentialConfirmation(
    ride: any,
    paymentReceived: boolean,
    driverNotes?: string,
  ): Promise<any> {
    const updatedPayment = await this.prisma.payment.update({
      where: { rideId: ride.id },
      data: {
        confirmedByDriver: true,
        driverConfirmationTime: new Date(),
        driverNotes: driverNotes || ride.payment.driverNotes,
        status: paymentReceived ? PaymentStatus.PAID : PaymentStatus.FAILED,
      },
    });

    await this.prisma.ride.update({
      where: { id: ride.id },
      data: {
        paymentStatus: paymentReceived
          ? PaymentStatus.PAID
          : PaymentStatus.FAILED,
        status: 'COMPLETED',
      },
    });

    return {
      success: true,
      data: {
        rideId: ride.id,
        paymentStatus: updatedPayment.status,
        paymentReceived,
        confirmedAt: updatedPayment.driverConfirmationTime,
        method: updatedPayment.method,
        amount: updatedPayment.amount,
      },
      message: paymentReceived
        ? 'Pagamento confirmado com sucesso'
        : 'Pagamento marcado como não recebido',
    };
  }

  // Método atualizado para lidar com saldo insuficiente
  private async handleInsufficientFundsOnConfirmation(
    ride: any,
    pendingTransaction: any,
    currentBalance: number,
  ): Promise<void> {
    await this.prisma.transaction.update({
      where: { id: pendingTransaction.id },
      data: {
        status: TransactionStatus.FAILED,
        failureReason: `Saldo insuficiente na confirmação. Disponível: R$ ${currentBalance.toFixed(2)}, Necessário: R$ ${ride.payment.amount.toFixed(2)}`,
        processedAt: new Date(),
      },
    });

    await this.prisma.payment.update({
      where: { rideId: ride.id },
      data: {
        status: PaymentStatus.FAILED,
        confirmedByDriver: true,
        driverConfirmationTime: new Date(),
        driverNotes: 'Saldo insuficiente no momento da confirmação',
      },
    });

    await this.prisma.ride.update({
      where: { id: ride.id },
      data: {
        paymentStatus: PaymentStatus.FAILED,
        status: 'COMPLETED',
      },
    });

    this.logger.warn(
      `⚠️ Saldo insuficiente na confirmação da corrida ${ride.id}. Saldo: R$ ${currentBalance}, Necessário: R$ ${ride.payment.amount}`,
    );
  }

  // ==================== HISTÓRICO E CONSULTAS (mantido) ====================

  async getTransactionHistory(
    userId: string,
    limit = 20,
    offset = 0,
  ): Promise<{
    transactions: TransactionResponse[];
    pagination: any;
  }> {
    const [transactions, total] = await Promise.all([
      this.prisma.transaction.findMany({
        where: { userId },
        include: {
          ride: {
            select: {
              id: true,
              originAddress: true,
              destinationAddress: true,
              createdAt: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      this.prisma.transaction.count({ where: { userId } }),
    ]);

    const formattedTransactions: TransactionResponse[] = transactions.map(
      (transaction) => ({
        id: transaction.id,
        type: transaction.type,
        status: transaction.status,
        amount: transaction.amount,
        currency: transaction.currency,
        description: transaction.description,
        createdAt: transaction.createdAt,
        processedAt: transaction.processedAt || undefined,
        metadata: transaction.metadata,
      }),
    );

    return {
      transactions: formattedTransactions,
      pagination: {
        total,
        limit,
        offset,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // ==================== UTILITÁRIOS ====================

  private async getOrCreateStripeCustomer(user: any): Promise<Stripe.Customer> {
    if (!this.stripe) {
      throw new BadRequestException('Sistema de pagamento não configurado');
    }

    const existingCustomers = await this.stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      return existingCustomers.data[0];
    }

    return this.stripe.customers.create({
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      phone: user.phone,
      metadata: {
        userId: user.id,
        app: 'ride-sharing',
      },
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // ==================== WEBHOOK STRIPE (mantido) ====================

  async handleStripeWebhook(signature: string, payload: Buffer): Promise<void> {
    if (this.isSimulationMode || !this.stripe) {
      return;
    }

    try {
      const webhookSecret = this.configService.get<string>(
        'STRIPE_WEBHOOK_SECRET',
      );
      if (!webhookSecret) {
        throw new Error('Webhook secret não configurado');
      }

      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret,
      );

      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentSuccess(
            event.data.object as Stripe.PaymentIntent,
          );
          break;

        case 'payment_intent.payment_failed':
          await this.handlePaymentFailure(
            event.data.object as Stripe.PaymentIntent,
          );
          break;
      }
    } catch (error) {
      this.logger.error('Erro ao processar webhook do Stripe:', error);
      throw error;
    }
  }

  private async handlePaymentSuccess(
    paymentIntent: Stripe.PaymentIntent,
  ): Promise<void> {
    const transaction = await this.prisma.transaction.findFirst({
      where: { stripePaymentIntentId: paymentIntent.id },
      include: { wallet: true },
    });

    if (transaction && transaction.status === TransactionStatus.PENDING) {
      await this.prisma.transaction.update({
        where: { id: transaction.id },
        data: {
          status: TransactionStatus.COMPLETED,
          processedAt: new Date(),
        },
      });

      if (
        transaction.wallet &&
        transaction.type === TransactionType.WALLET_TOPUP
      ) {
        await this.prisma.userWallet.update({
          where: { id: transaction.wallet.id },
          data: {
            balance: transaction.wallet.balance + transaction.amount,
          },
        });
      }

      this.logger.log(
        `Pagamento confirmado via Stripe: ${paymentIntent.id} - R$ ${transaction.amount}`,
      );
    }
  }

  private async handlePaymentFailure(
    paymentIntent: Stripe.PaymentIntent,
  ): Promise<void> {
    const transaction = await this.prisma.transaction.findFirst({
      where: { stripePaymentIntentId: paymentIntent.id },
    });

    if (transaction && transaction.status === TransactionStatus.PENDING) {
      await this.prisma.transaction.update({
        where: { id: transaction.id },
        data: {
          status: TransactionStatus.FAILED,
          failureReason:
            paymentIntent.last_payment_error?.message || 'Falha no pagamento',
          processedAt: new Date(),
        },
      });

      this.logger.warn(
        `Pagamento falhou via Stripe: ${paymentIntent.id} - ${paymentIntent.last_payment_error?.message}`,
      );
    }
  }
}
