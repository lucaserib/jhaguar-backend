import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Query,
  Param,
  UseGuards,
  Headers,
  RawBody,
  HttpCode,
  HttpStatus,
  BadRequestException,
  Logger,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
  ApiHeader,
} from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { Throttle } from '@nestjs/throttler';
import { Response } from 'express';
import { randomUUID } from 'crypto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorator/user.decorator';
import {
  AddWalletBalanceDto,
  ProcessRidePaymentDto,
  ConfirmDriverPaymentDto,
  WalletBalanceResponse,
  TransactionResponse,
  PaymentMethodOption,
  TransferWalletBalanceDto,
  PlatformFeesResponse,
  TransferResponse,
  RidePaymentSummaryResponse,
  PendingFeesResponse,
} from './dto';

@ApiTags('Pagamentos')
@Controller('payments')
export class PaymentsController {
  private readonly logger = new Logger(PaymentsController.name);
  constructor(private readonly paymentsService: PaymentsService) {}

  // ==================== CARTEIRA (mantido) ====================

  @Get('wallet/balance')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Consultar saldo da carteira',
    description: 'Obtém o saldo atual da carteira do usuário autenticado',
  })
  @ApiResponse({
    status: 200,
    description: 'Saldo consultado com sucesso',
    type: WalletBalanceResponse,
  })
  @Throttle({ default: { limit: 20, ttl: 1000 } })
  async getWalletBalance(@User() user: any) {
    try {
      const balance = await this.paymentsService.getWalletBalance(user.id);

      return {
        success: true,
        data: balance,
        message: 'Saldo consultado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : 'Erro ao consultar saldo',
      };
    }
  }

  @Post('wallet/add-balance')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Adicionar saldo à carteira',
    description:
      'Adiciona saldo à carteira do usuário via Stripe (simulado em desenvolvimento)',
  })
  @ApiResponse({
    status: 200,
    description: 'Saldo adicionado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou carteira bloqueada',
  })
  async addWalletBalance(
    @Body() addBalanceDto: AddWalletBalanceDto,
    @User() user: any,
  ) {
    return this.paymentsService.addWalletBalance(user.id, addBalanceDto);
  }

  @Get('wallet/transactions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Histórico de transações',
    description: 'Lista o histórico de transações da carteira do usuário',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limite de resultados (padrão: 20)',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Offset para paginação (padrão: 0)',
  })
  @ApiResponse({
    status: 200,
    description: 'Histórico retornado com sucesso',
    type: [TransactionResponse],
  })
  @Throttle({ default: { limit: 10, ttl: 1000 } })
  async getTransactionHistory(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @User() user?: any,
  ) {
    try {
      const limitNum = limit ? parseInt(limit) : 20;
      const offsetNum = offset ? parseInt(offset) : 0;

      const result = await this.paymentsService.getTransactionHistory(
        user.id,
        limitNum,
        offsetNum,
      );

      return {
        success: true,
        data: result.transactions,
        pagination: result.pagination,
        message: 'Histórico retornado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        pagination: { total: 0, limit: 0, offset: 0, pages: 0 },
        message:
          error instanceof Error ? error.message : 'Erro ao buscar histórico',
      };
    }
  }

  // ==================== 🔥 NOVOS ENDPOINTS DE TRANSFERÊNCIA ====================

  @Post('wallet/transfer')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Transferir saldo entre carteiras',
    description: 'Transfere saldo da carteira do usuário para outro usuário',
  })
  @ApiResponse({
    status: 200,
    description: 'Transferência realizada com sucesso',
    type: TransferResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Saldo insuficiente ou dados inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário destinatário não encontrado',
  })
  async transferWalletBalance(
    @Body() transferDto: TransferWalletBalanceDto,
    @User() user: any,
  ) {
    try {
      if (transferDto.toUserId === user.id) {
        throw new BadRequestException(
          'Não é possível transferir para sua própria carteira',
        );
      }

      const result = await this.paymentsService.transferWalletBalance(
        user.id,
        transferDto.toUserId,
        transferDto.amount,
        transferDto.description,
        transferDto.rideId,
        transferDto.metadata,
      );

      return result;
    } catch (error) {
      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : 'Erro na transferência',
      };
    }
  }

  @Get('fees/calculate/:amount')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Calcular taxas da plataforma',
    description:
      'Calcula as taxas da plataforma para um valor de corrida específico',
  })
  @ApiParam({
    name: 'amount',
    description: 'Valor da corrida em BRL',
    example: '25.50',
  })
  @ApiResponse({
    status: 200,
    description: 'Taxas calculadas com sucesso',
    type: PlatformFeesResponse,
  })
  async calculatePlatformFees(@Param('amount') amount: string) {
    try {
      const rideAmount = parseFloat(amount);

      if (isNaN(rideAmount) || rideAmount <= 0) {
        throw new BadRequestException('Valor inválido');
      }

      const fees = this.paymentsService.calculatePlatformFees(rideAmount);

      return {
        success: true,
        data: {
          ...fees,
          currency: 'BRL',
          breakdown: {
            description: `Cálculo de taxas para corrida de R$ ${fees.grossAmount.toFixed(2)}`,
            calculations: [
              {
                step: 'Valor bruto da corrida',
                value: fees.grossAmount,
                formula: `R$ ${fees.grossAmount.toFixed(2)}`,
              },
              {
                step: 'Taxa da plataforma',
                value: fees.platformFee,
                formula: `R$ ${fees.grossAmount.toFixed(2)} × ${(fees.feePercentage * 100).toFixed(1)}% = R$ ${fees.platformFee.toFixed(2)}`,
              },
              {
                step: 'Valor líquido para o motorista',
                value: fees.netAmount,
                formula: `R$ ${fees.grossAmount.toFixed(2)} - R$ ${fees.platformFee.toFixed(2)} = R$ ${fees.netAmount.toFixed(2)}`,
              },
            ],
          },
        },
        message: 'Taxas calculadas com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : 'Erro ao calcular taxas',
      };
    }
  }

  @Get('fees/pending')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Consultar taxas pendentes (motorista)',
    description: 'Lista as taxas da plataforma pendentes de pagamento',
  })
  @ApiResponse({
    status: 200,
    description: 'Taxas pendentes consultadas com sucesso',
    type: PendingFeesResponse,
  })
  async getPendingFees(@User() user: any) {
    try {
      // Buscar transações pendentes do tipo taxa
      const [pendingTransactions, currentWallet] = await Promise.all([
        this.paymentsService['prisma'].transaction.findMany({
          where: {
            userId: user.id,
            type: 'CANCELLATION_FEE',
            status: 'PENDING',
            amount: { lt: 0 }, // Apenas débitos
          },
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
        }),
        this.paymentsService.getWalletBalance(user.id),
      ]);

      const totalPendingFees = pendingTransactions.reduce(
        (sum, transaction) => sum + Math.abs(transaction.amount),
        0,
      );

      const pendingFees = pendingTransactions.map((transaction) => ({
        id: transaction.id,
        rideId: transaction.rideId || '',
        amount: Math.abs(transaction.amount),
        description: transaction.description,
        createdAt: transaction.createdAt,
        rideDetails: transaction.ride
          ? {
              originAddress: transaction.ride.originAddress,
              destinationAddress: transaction.ride.destinationAddress,
              date: transaction.ride.createdAt,
            }
          : undefined,
      }));

      return {
        success: true,
        data: {
          totalPendingFees,
          pendingCount: pendingTransactions.length,
          currentBalance: currentWallet.balance,
          canPayAllPending: currentWallet.balance >= totalPendingFees,
          pendingFees,
          nextAutoChargeDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
        } as PendingFeesResponse,
        message: 'Taxas pendentes consultadas com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao consultar taxas pendentes',
      };
    }
  }

  @Post('fees/pay-pending')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Pagar taxas pendentes (motorista)',
    description: 'Paga todas as taxas da plataforma pendentes de uma vez',
  })
  @ApiResponse({
    status: 200,
    description: 'Taxas pagas com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Saldo insuficiente para pagar todas as taxas',
  })
  async payPendingFees(@User() user: any) {
    try {
      return await this.paymentsService['prisma'].$transaction(
        async (prisma) => {
          // Buscar taxas pendentes
          const pendingFees = await prisma.transaction.findMany({
            where: {
              userId: user.id,
              type: 'CANCELLATION_FEE',
              status: 'PENDING',
              amount: { lt: 0 },
            },
            include: { wallet: true },
          });

          if (pendingFees.length === 0) {
            return {
              success: true,
              data: {
                paidAmount: 0,
                paidCount: 0,
                currentBalance: (
                  await this.paymentsService.getWalletBalance(user.id)
                ).balance,
              },
              message: 'Não há taxas pendentes para pagar',
            };
          }

          const totalAmount = pendingFees.reduce(
            (sum, fee) => sum + Math.abs(fee.amount),
            0,
          );

          // Verificar saldo
          const currentWallet = await this.paymentsService.getOrCreateWallet(
            user.id,
          );

          if (currentWallet.balance < totalAmount) {
            throw new BadRequestException(
              `Saldo insuficiente. Disponível: R$ ${currentWallet.balance.toFixed(2)}, Necessário: R$ ${totalAmount.toFixed(2)}`,
            );
          }

          // Debitar saldo
          const updatedWallet = await prisma.userWallet.update({
            where: { id: currentWallet.id },
            data: {
              balance: currentWallet.balance - totalAmount,
            },
          });

          // Marcar taxas como pagas
          await prisma.transaction.updateMany({
            where: {
              id: { in: pendingFees.map((fee) => fee.id) },
            },
            data: {
              status: 'COMPLETED',
              processedAt: new Date(),
            },
          });

          this.logger.log(
            `💳 Taxas pendentes pagas: R$ ${totalAmount} (${pendingFees.length} taxas) - Usuário: ${user.id}`,
          );

          return {
            success: true,
            data: {
              paidAmount: totalAmount,
              paidCount: pendingFees.length,
              currentBalance: updatedWallet.balance,
              paidFees: pendingFees.map((fee) => ({
                id: fee.id,
                amount: Math.abs(fee.amount),
                description: fee.description,
              })),
            },
            message: `${pendingFees.length} taxa(s) paga(s) com sucesso - Total: R$ ${totalAmount.toFixed(2)}`,
          };
        },
      );
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error instanceof Error ? error.message : 'Erro ao pagar taxas',
      };
    }
  }

  // ==================== MÉTODOS DE PAGAMENTO (mantido) ====================

  @Get('methods')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Listar métodos de pagamento disponíveis',
    description: 'Retorna os métodos de pagamento disponíveis para o usuário',
  })
  @ApiResponse({
    status: 200,
    description: 'Métodos de pagamento retornados',
    type: [PaymentMethodOption],
  })
  @Throttle({ default: { limit: 20, ttl: 1000 } })
  async getPaymentMethods(@User() user: any) {
    try {
      const methods = await this.paymentsService.getPaymentMethods(user.id);

      return {
        success: true,
        data: methods,
        count: methods.length,
        message: 'Métodos de pagamento retornados com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        count: 0,
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao buscar métodos de pagamento',
      };
    }
  }

  // ==================== PAGAMENTOS DE CORRIDA ATUALIZADOS ====================

  @Post('ride/pay')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Processar pagamento de corrida',
    description:
      'Processa o pagamento de uma corrida usando o método escolhido pelo passageiro',
  })
  @ApiHeader({
    name: 'Idempotency-Key',
    required: false,
    description:
      'Chave de idempotência para evitar pagamentos duplicados (opcional; se ausente, o servidor gera)',
  })
  @ApiResponse({
    status: 200,
    description: 'Pagamento processado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou saldo insuficiente',
  })
  @ApiResponse({
    status: 404,
    description: 'Corrida não encontrada',
  })
  async processRidePayment(
    @Body() processPaymentDto: ProcessRidePaymentDto,
    @User() user: any,
    @Headers('Idempotency-Key') idemKey?: string,
    @Res({ passthrough: true }) res?: Response,
  ) {
    const key = idemKey || randomUUID();
    const result = await this.paymentsService.processRidePayment(
      user.id,
      processPaymentDto,
      key,
    );
    if (res) res.setHeader('Idempotency-Key', key);
    return result;
  }

  @Put('ride/:rideId/confirm')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Confirmar recebimento do pagamento (motorista)',
    description:
      'Permite ao motorista confirmar que recebeu o pagamento da corrida - AGORA COM TRANSFERÊNCIA AUTOMÁTICA',
  })
  @ApiParam({ name: 'rideId', description: 'ID da corrida' })
  @ApiResponse({
    status: 200,
    description: 'Confirmação registrada e transferência realizada',
    type: RidePaymentSummaryResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Corrida não encontrada ou não pertence ao motorista',
  })
  async confirmDriverPayment(
    @Param('rideId') rideId: string,
    @Body() body: { paymentReceived: boolean; driverNotes?: string },
    @User() user: any,
  ) {
    const confirmPaymentDto: ConfirmDriverPaymentDto = {
      rideId,
      paymentReceived: body.paymentReceived,
      driverNotes: body.driverNotes,
    };

    const result = await this.paymentsService.confirmDriverPayment(
      user.driverId,
      confirmPaymentDto,
    );

    // Se foi sucesso e incluiu transferência, formatar resposta mais rica
    if (result.success && result.data.transferId) {
      const enrichedData: RidePaymentSummaryResponse = {
        rideId: result.data.rideId,
        totalAmount: result.data.amount,
        driverAmount: result.data.netAmount || result.data.amount,
        platformFee: result.data.platformFees || 0,
        paymentMethod: result.data.method,
        paymentStatus: result.data.paymentStatus,
        confirmedByDriver: result.data.paymentReceived,
        confirmationTime: result.data.confirmedAt,
        driverNotes: body.driverNotes,
        transferDetails: result.data.transferId
          ? {
              fromUserId: user.id, // Será ajustado no service
              toUserId: user.driverId,
              amount: result.data.amount,
              completedAt: result.data.confirmedAt,
              transactionIds: [result.data.transferId],
            }
          : undefined,
        balances: {
          passenger: result.data.passengerBalance || 0,
          driver: result.data.driverBalance || 0,
        },
      };

      return {
        ...result,
        data: enrichedData,
      };
    }

    return result;
  }

  // ==================== CONSULTAS ESPECÍFICAS ATUALIZADAS ====================

  @Get('ride/:rideId/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Status do pagamento de uma corrida',
    description:
      'Consulta o status atual do pagamento de uma corrida específica com detalhes de transferência',
  })
  @ApiParam({ name: 'rideId', description: 'ID da corrida' })
  @ApiResponse({
    status: 200,
    description: 'Status do pagamento retornado',
  })
  @ApiResponse({
    status: 404,
    description: 'Corrida não encontrada',
  })
  async getRidePaymentStatus(
    @Param('rideId') rideId: string,
    @User() user: any,
  ) {
    try {
      const ridePayment = await this.paymentsService['prisma'].ride.findFirst({
        where: {
          id: rideId,
          OR: [
            { passenger: { userId: user.id } },
            { driver: { userId: user.id } },
          ],
        },
        include: {
          payment: true,
          passenger: { include: { user: true } },
          driver: { include: { user: true } },
        },
      });

      if (!ridePayment) {
        return {
          success: false,
          data: null,
          message: 'Corrida não encontrada ou acesso negado',
        };
      }

      // 🔥 NOVO: Buscar transações relacionadas à corrida
      const rideTransactions = await this.paymentsService[
        'prisma'
      ].transaction.findMany({
        where: { rideId },
        orderBy: { createdAt: 'desc' },
      });

      // Calcular taxas se aplicável
      const fees = ridePayment.finalPrice
        ? this.paymentsService.calculatePlatformFees(ridePayment.finalPrice)
        : null;

      const paymentInfo = {
        rideId: ridePayment.id,
        paymentStatus: ridePayment.paymentStatus,
        method: ridePayment.payment?.method || null,
        amount: ridePayment.payment?.amount || ridePayment.finalPrice,
        confirmedByDriver: ridePayment.payment?.confirmedByDriver || false,
        driverConfirmationTime:
          ridePayment.payment?.driverConfirmationTime || null,
        driverNotes: ridePayment.payment?.driverNotes || null,
        requiresAction: this.getRequiredAction(ridePayment, user),

        // 🔥 NOVAS INFORMAÇÕES
        platformFees: fees
          ? {
              grossAmount: fees.grossAmount,
              platformFee: fees.platformFee,
              netAmount: fees.netAmount,
              feePercentage: fees.feePercentage,
            }
          : null,

        transfers: rideTransactions
          .filter((t) => t.type === 'RIDE_PAYMENT')
          .map((t) => ({
            id: t.id,
            userId: t.userId,
            amount: t.amount,
            status: t.status,
            type: t.amount > 0 ? 'CREDIT' : 'DEBIT',
            description: t.description,
            processedAt: t.processedAt,
          })),

        pendingFees: rideTransactions
          .filter(
            (t) => t.type === 'CANCELLATION_FEE' && t.status === 'PENDING',
          )
          .map((t) => ({
            id: t.id,
            amount: Math.abs(t.amount),
            description: t.description,
            createdAt: t.createdAt,
          })),
      };

      return {
        success: true,
        data: paymentInfo,
        message: 'Status do pagamento retornado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : 'Erro ao consultar status',
      };
    }
  }

  @Get('ride/:rideId/summary')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Resumo completo do pagamento da corrida',
    description:
      'Retorna um resumo detalhado do pagamento, incluindo transferências e taxas',
  })
  @ApiParam({ name: 'rideId', description: 'ID da corrida' })
  @ApiResponse({
    status: 200,
    description: 'Resumo retornado com sucesso',
    type: RidePaymentSummaryResponse,
  })
  async getRidePaymentSummary(
    @Param('rideId') rideId: string,
    @User() user: any,
  ) {
    try {
      const ride = await this.paymentsService['prisma'].ride.findFirst({
        where: {
          id: rideId,
          OR: [
            { passenger: { userId: user.id } },
            { driver: { userId: user.id } },
          ],
        },
        include: {
          payment: true,
          passenger: { include: { user: { include: { wallet: true } } } },
          driver: { include: { user: { include: { wallet: true } } } },
        },
      });

      if (!ride) {
        return {
          success: false,
          data: null,
          message: 'Corrida não encontrada ou acesso negado',
        };
      }

      const fees = ride.finalPrice
        ? this.paymentsService.calculatePlatformFees(ride.finalPrice)
        : { grossAmount: 0, platformFee: 0, netAmount: 0, feePercentage: 0 };

      // Buscar transações da corrida
      const rideTransactions = await this.paymentsService[
        'prisma'
      ].transaction.findMany({
        where: { rideId },
        orderBy: { createdAt: 'desc' },
      });

      const transferTransactions = rideTransactions.filter(
        (t) => t.type === 'RIDE_PAYMENT' && t.status === 'COMPLETED',
      );

      const summary: RidePaymentSummaryResponse = {
        rideId: ride.id,
        totalAmount: ride.finalPrice || 0,
        driverAmount: fees.netAmount,
        platformFee: fees.platformFee,
        paymentMethod: ride.payment?.method || 'NOT_SET',
        paymentStatus: ride.payment?.status || 'PENDING',
        confirmedByDriver: ride.payment?.confirmedByDriver || false,
        confirmationTime: ride.payment?.driverConfirmationTime || undefined,
        driverNotes: ride.payment?.driverNotes || undefined,
        transferDetails:
          transferTransactions.length > 0
            ? {
                fromUserId: ride.passenger.userId,
                toUserId: ride.driver?.userId || '',
                amount: ride.finalPrice || 0,
                completedAt: transferTransactions[0].processedAt || new Date(),
                transactionIds: transferTransactions.map((t) => t.id),
              }
            : undefined,
        balances: {
          passenger: ride.passenger.user.wallet?.balance || 0,
          driver: ride.driver?.user.wallet?.balance || 0,
        },
      };

      return {
        success: true,
        data: summary,
        message: 'Resumo do pagamento retornado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : 'Erro ao gerar resumo',
      };
    }
  }

  // ==================== WEBHOOK E SIMULAÇÃO (mantidos) ====================

  @Post('webhook/stripe')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Webhook do Stripe',
    description:
      'Endpoint para receber notificações do Stripe sobre pagamentos',
  })
  @ApiHeader({
    name: 'stripe-signature',
    description: 'Assinatura do webhook do Stripe',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Webhook processado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Assinatura inválida ou erro no processamento',
  })
  async handleStripeWebhook(
    @Headers('stripe-signature') signature: string,
    @RawBody() payload: Buffer,
  ) {
    try {
      if (!signature) {
        throw new BadRequestException('Assinatura do Stripe não encontrada');
      }
      this.logger.log('Webhook Stripe recebido');
      await this.paymentsService.handleStripeWebhook(signature, payload);
      return {
        received: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error('Erro ao processar webhook Stripe:', error);
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Erro ao processar webhook',
      );
    }
  }

  @Post('simulate/stripe-success')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Simular sucesso do Stripe (desenvolvimento)',
    description: 'Simula um pagamento bem-sucedido do Stripe para testes',
  })
  @ApiResponse({
    status: 200,
    description: 'Simulação executada com sucesso',
  })
  async simulateStripeSuccess(
    @Body() body: { transactionId: string },
    @User() user: any,
  ) {
    try {
      const transaction = await this.paymentsService[
        'prisma'
      ].transaction.findFirst({
        where: {
          id: body.transactionId,
          userId: user.id,
          status: 'PENDING',
          type: 'WALLET_TOPUP',
        },
        include: { wallet: true },
      });

      if (!transaction) {
        throw new BadRequestException(
          'Transação não encontrada ou já processada',
        );
      }

      await this.paymentsService['prisma'].transaction.update({
        where: { id: transaction.id },
        data: {
          status: 'COMPLETED',
          processedAt: new Date(),
        },
      });

      if (transaction.wallet) {
        await this.paymentsService['prisma'].userWallet.update({
          where: { id: transaction.wallet.id },
          data: {
            balance: transaction.wallet.balance + transaction.amount,
          },
        });
      }

      return {
        success: true,
        data: {
          transactionId: transaction.id,
          newBalance: transaction.wallet
            ? transaction.wallet.balance + transaction.amount
            : 0,
        },
        message: 'Pagamento simulado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error instanceof Error ? error.message : 'Erro na simulação',
      };
    }
  }

  @Get('admin/test')
  @ApiOperation({
    summary: 'Teste do módulo de pagamentos',
    description:
      'Endpoint para testar se o módulo de pagamentos está funcionando',
  })
  @ApiResponse({
    status: 200,
    description: 'Módulo funcionando corretamente',
  })
  testPayments() {
    return {
      success: true,
      message: 'Módulo de pagamentos funcionando',
      timestamp: new Date().toISOString(),
      features: {
        walletManagement: true,
        stripeIntegration: true,
        multiplePaymentMethods: true,
        driverConfirmation: true,
        transactionHistory: true,
        refundSupport: true,
        webhookSupport: true,
        simulationMode: true,
        // 🔥 NOVAS FUNCIONALIDADES
        walletTransfers: true,
        platformFeeManagement: true,
        automaticTaxCollection: true,
        pendingFeeTracking: true,
        ridePaymentSummary: true,
      },
      paymentMethods: ['WALLET_BALANCE', 'CASH', 'PIX', 'CARD_MACHINE'],
      supportedOperations: [
        'ADD_WALLET_BALANCE',
        'PROCESS_RIDE_PAYMENT',
        'CONFIRM_DRIVER_PAYMENT',
        'TRANSFER_WALLET_BALANCE',
        'CALCULATE_PLATFORM_FEES',
        'PAY_PENDING_FEES',
        'VIEW_TRANSACTION_HISTORY',
        'CHECK_PAYMENT_STATUS',
        'GENERATE_PAYMENT_SUMMARY',
      ],
      platformFeePercentage: '10%',
      transferFeatures: {
        atomicTransactions: true,
        realTimeBalanceUpdate: true,
        automaticFeeCollection: true,
        pendingFeeManagement: true,
      },
    };
  }

  // ==================== MÉTODOS AUXILIARES (mantidos) ====================

  private getRequiredAction(ridePayment: any, user: any): string | null {
    if (!ridePayment.payment) {
      return 'PAYMENT_REQUIRED';
    }

    if (
      ridePayment.payment.status === 'PENDING' &&
      !ridePayment.payment.confirmedByDriver
    ) {
      if (user.isDriver) {
        return 'CONFIRM_PAYMENT';
      } else {
        return 'AWAITING_DRIVER_CONFIRMATION';
      }
    }

    if (
      ridePayment.payment.status === 'PAID' &&
      ridePayment.payment.confirmedByDriver
    ) {
      return null;
    }

    return 'UNKNOWN';
  }
}
