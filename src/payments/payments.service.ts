import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
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

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
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
      `PaymentsService iniciado - Modo: ${this.isStripeEnabled ? 'HABILITADO' : 'DESABILITADO'} | Simulação: ${this.isSimulationMode ? 'SIMULAÇÃO' : 'PRODUÇÃO'}`,
    );
  }

  // ==================== CARTEIRA DO USUÁRIO ====================

  async getOrCreateWallet(userId: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { wallet: true },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (!user.wallet) {
      const wallet = await this.prisma.userWallet.create({
        data: {
          userId,
          balance: 0.0,
        },
      });
      return wallet;
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

        // Atualizar saldo imediatamente
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
          newBalance: wallet.balance, // Saldo ainda não foi atualizado
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

  // ==================== PAGAMENTOS DE CORRIDA ====================

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
  ): Promise<{
    success: boolean;
    data: any;
    message: string;
  }> {
    try {
      // Verificar se a corrida existe e pertence ao usuário
      const ride = await this.prisma.ride.findFirst({
        where: {
          id: processPaymentDto.rideId,
          passenger: { userId },
          status: { in: ['COMPLETED', 'IN_PROGRESS'] },
        },
        include: {
          passenger: { include: { user: true } },
          driver: { include: { user: true } },
          payment: true,
        },
      });

      if (!ride) {
        throw new NotFoundException(
          'Corrida não encontrada ou não está em status válido para pagamento',
        );
      }

      if (ride.payment && ride.payment.status === PaymentStatus.PAID) {
        throw new ConflictException('Esta corrida já foi paga');
      }

      // Processar baseado no método de pagamento
      const result = await this.processPaymentByMethod(
        userId,
        ride,
        processPaymentDto,
      );

      return result;
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
        // 🔥 MUDANÇA: Agora apenas reserva o saldo, não debita imediatamente
        return this.reserveWalletPayment(userId, ride, amount, notes);

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
        throw new BadRequestException('Método de pagamento não suportado');
    }
  }

  // 🔥 NOVO MÉTODO: Apenas reserva o saldo, não debita
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

    // Verificar se tem saldo suficiente para reservar
    if (wallet.balance < amount) {
      throw new BadRequestException(
        `Saldo insuficiente. Disponível: R$ ${wallet.balance.toFixed(2)}, Necessário: R$ ${amount.toFixed(2)}`,
      );
    }

    this.logger.log(
      `💰 Reservando R$ ${amount} da carteira do usuário ${userId} para corrida ${ride.id}`,
    );

    // 🔥 MUDANÇA: Criar transação como PENDENTE, será processada quando motorista confirmar
    const transaction = await this.prisma.transaction.create({
      data: {
        userId,
        walletId: wallet.id,
        rideId: ride.id,
        type: TransactionType.RIDE_PAYMENT,
        status: TransactionStatus.PENDING, // ✅ PENDENTE até confirmação do motorista
        amount: -amount, // Negativo porque será um débito
        description: `Pagamento reservado da corrida #${ride.id.substring(0, 8)}`,
        metadata: {
          paymentMethod: PaymentMethod.WALLET_BALANCE,
          driverNotes: notes,
          isReserved: true, // Flag para indicar que é uma reserva
          originalBalance: wallet.balance,
        },
      },
    });

    // Atualizar ou criar registro de pagamento como PENDENTE
    await this.prisma.payment.upsert({
      where: { rideId: ride.id },
      create: {
        rideId: ride.id,
        amount,
        method: PaymentMethod.WALLET_BALANCE,
        status: PaymentStatus.PENDING, // ✅ PENDENTE até confirmação
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

    // Atualizar status da corrida
    await this.prisma.ride.update({
      where: { id: ride.id },
      data: {
        paymentStatus: PaymentStatus.PENDING, // ✅ PENDENTE
        finalPrice: amount,
      },
    });

    return {
      success: true,
      data: {
        rideId: ride.id,
        paymentMethod: PaymentMethod.WALLET_BALANCE,
        amount,
        currentBalance: wallet.balance, // ✅ Saldo não foi alterado ainda
        transactionId: transaction.id,
        status: 'RESERVED', // Novo status para indicar reserva
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
    // Para pagamentos presenciais, apenas registramos a intenção
    // A confirmação virá do motorista

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

  // ==================== CONFIRMAÇÃO DO MOTORISTA ====================

  async confirmDriverPayment(
    driverId: string,
    confirmPaymentDto: ConfirmDriverPaymentDto,
  ): Promise<{
    success: boolean;
    data: any;
    message: string;
  }> {
    try {
      // Verificar se a corrida pertence ao motorista
      const ride = await this.prisma.ride.findFirst({
        where: {
          id: confirmPaymentDto.rideId,
          driverId,
        },
        include: {
          payment: true,
          passenger: { include: { user: { include: { wallet: true } } } },
          driver: { include: { user: true } },
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

      // 🔥 PRINCIPAL MUDANÇA: Processar débito da carteira APENAS se confirmado
      if (ride.payment.method === PaymentMethod.WALLET_BALANCE) {
        return this.processWalletConfirmation(
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

  // 🔥 NOVO MÉTODO: Processa confirmação para pagamento via carteira
  private async processWalletConfirmation(
    ride: any,
    paymentReceived: boolean,
    driverNotes?: string,
  ): Promise<any> {
    const wallet = ride.passenger.user.wallet;

    if (!wallet) {
      throw new BadRequestException('Carteira do passageiro não encontrada');
    }

    // Buscar a transação pendente
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
      // ✅ MOTORISTA CONFIRMOU: Efetivar o débito
      this.logger.log(
        `✅ Confirmação recebida - debitando R$ ${ride.payment.amount} da carteira do usuário ${ride.passenger.userId}`,
      );

      // Verificar se ainda tem saldo suficiente
      const currentWallet = await this.prisma.userWallet.findUnique({
        where: { id: wallet.id },
      });

      if (!currentWallet || currentWallet.balance < ride.payment.amount) {
        // Se não tem mais saldo, marcar como falha
        await this.handleInsufficientFundsOnConfirmation(
          ride,
          pendingTransaction,
          currentWallet?.balance || 0,
        );

        return {
          success: false,
          data: null,
          message: 'Saldo insuficiente no momento da confirmação',
        };
      }

      // 🔥 EFETUAR O DÉBITO REAL
      const updatedWallet = await this.prisma.userWallet.update({
        where: { id: wallet.id },
        data: {
          balance: currentWallet.balance - ride.payment.amount,
        },
      });

      // Atualizar transação para COMPLETED
      await this.prisma.transaction.update({
        where: { id: pendingTransaction.id },
        data: {
          status: TransactionStatus.COMPLETED,
          processedAt: new Date(),
          metadata: {
            ...((pendingTransaction.metadata as Record<string, any>) || {}),
            confirmedByDriver: true,
            driverConfirmationTime: new Date(),
            newBalance: updatedWallet.balance,
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

      this.logger.log(
        `💰 Débito efetuado com sucesso: R$ ${ride.payment.amount}. Novo saldo: R$ ${updatedWallet.balance}`,
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
          newBalance: updatedWallet.balance,
          transactionId: pendingTransaction.id,
        },
        message: 'Pagamento confirmado e saldo debitado com sucesso',
      };
    } else {
      // ❌ MOTORISTA NÃO CONFIRMOU: Cancelar a transação (sem débito)
      this.logger.log(
        `❌ Pagamento não confirmado pelo motorista - cancelando reserva da corrida ${ride.id}`,
      );

      // Cancelar transação pendente
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

      // Atualizar pagamento
      const updatedPayment = await this.prisma.payment.update({
        where: { rideId: ride.id },
        data: {
          status: PaymentStatus.FAILED,
          confirmedByDriver: true, // Confirmou que NÃO recebeu
          driverConfirmationTime: new Date(),
          driverNotes: driverNotes || ride.payment.driverNotes,
        },
      });

      // Atualizar corrida
      await this.prisma.ride.update({
        where: { id: ride.id },
        data: {
          paymentStatus: PaymentStatus.FAILED,
          status: 'COMPLETED', // Corrida finaliza mesmo sem pagamento
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
          currentBalance: wallet.balance, // Saldo não foi alterado
          transactionId: pendingTransaction.id,
        },
        message: 'Pagamento marcado como não recebido - saldo não foi debitado',
      };
    }
  }

  // 🔥 NOVO MÉTODO: Lidar com saldo insuficiente na confirmação
  private async handleInsufficientFundsOnConfirmation(
    ride: any,
    pendingTransaction: any,
    currentBalance: number,
  ): Promise<void> {
    // Marcar transação como falha
    await this.prisma.transaction.update({
      where: { id: pendingTransaction.id },
      data: {
        status: TransactionStatus.FAILED,
        failureReason: `Saldo insuficiente na confirmação. Disponível: R$ ${currentBalance.toFixed(2)}, Necessário: R$ ${ride.payment.amount.toFixed(2)}`,
        processedAt: new Date(),
      },
    });

    // Marcar pagamento como falha
    await this.prisma.payment.update({
      where: { rideId: ride.id },
      data: {
        status: PaymentStatus.FAILED,
        confirmedByDriver: true,
        driverConfirmationTime: new Date(),
        driverNotes: 'Saldo insuficiente no momento da confirmação',
      },
    });

    // Atualizar corrida
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

  // Método para outros tipos de pagamento (sem alteração)
  private async processPresentialConfirmation(
    ride: any,
    paymentReceived: boolean,
    driverNotes?: string,
  ): Promise<any> {
    // Atualizar o pagamento
    const updatedPayment = await this.prisma.payment.update({
      where: { rideId: ride.id },
      data: {
        confirmedByDriver: true,
        driverConfirmationTime: new Date(),
        driverNotes: driverNotes || ride.payment.driverNotes,
        status: paymentReceived ? PaymentStatus.PAID : PaymentStatus.FAILED,
      },
    });

    // Atualizar a corrida
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

  // ==================== HISTÓRICO E CONSULTAS ====================

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

    // Buscar cliente existente
    const existingCustomers = await this.stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      return existingCustomers.data[0];
    }

    // Criar novo cliente
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

  // ==================== WEBHOOK STRIPE (PARA PRODUÇÃO) ====================

  async handleStripeWebhook(signature: string, payload: Buffer): Promise<void> {
    if (this.isSimulationMode || !this.stripe) {
      return; // Ignorar webhooks em modo simulação
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
      // Atualizar transação
      await this.prisma.transaction.update({
        where: { id: transaction.id },
        data: {
          status: TransactionStatus.COMPLETED,
          processedAt: new Date(),
        },
      });

      // Atualizar saldo da carteira
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
