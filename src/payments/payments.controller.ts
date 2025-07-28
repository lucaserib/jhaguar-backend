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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorator/user.decorator';
import {
  AddWalletBalanceDto,
  ProcessRidePaymentDto,
  ConfirmDriverPaymentDto,
  WalletBalanceResponse,
  TransactionResponse,
  PaymentMethodOption,
} from './dto';

@ApiTags('Pagamentos')
@Controller('payments')
export class PaymentsController {
  private readonly logger = new Logger(PaymentsController.name);
  constructor(private readonly paymentsService: PaymentsService) {}

  // ==================== CARTEIRA ====================

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

  // ==================== MÉTODOS DE PAGAMENTO ====================

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

  // ==================== PAGAMENTOS DE CORRIDA ====================

  @Post('ride/pay')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Processar pagamento de corrida',
    description:
      'Processa o pagamento de uma corrida usando o método escolhido pelo passageiro',
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
  ) {
    return this.paymentsService.processRidePayment(user.id, processPaymentDto);
  }

  @Put('ride/:rideId/confirm')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Confirmar recebimento do pagamento (motorista)',
    description:
      'Permite ao motorista confirmar que recebeu o pagamento da corrida',
  })
  @ApiParam({ name: 'rideId', description: 'ID da corrida' })
  @ApiResponse({
    status: 200,
    description: 'Confirmação registrada com sucesso',
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
    // if (!user.isDriver || !user.driverId) {
    //   throw new BadRequestException(
    //     'Apenas motoristas podem confirmar pagamentos',
    //   );
    // }

    const confirmPaymentDto: ConfirmDriverPaymentDto = {
      rideId,
      paymentReceived: body.paymentReceived,
      driverNotes: body.driverNotes,
    };

    return this.paymentsService.confirmDriverPayment(
      user.driverId,
      confirmPaymentDto,
    );
  }

  // ==================== CONSULTAS ESPECÍFICAS ====================
  @Get('ride/:rideId/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Status do pagamento de uma corrida',
    description:
      'Consulta o status atual do pagamento de uma corrida específica',
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
      // Buscar o pagamento da corrida
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

  private getRequiredAction(ridePayment: any, user: any): string | null {
    if (!ridePayment.payment) {
      return 'PAYMENT_REQUIRED'; // Passageiro precisa escolher método e pagar
    }

    if (
      ridePayment.payment.status === 'PENDING' &&
      !ridePayment.payment.confirmedByDriver
    ) {
      if (user.isDriver) {
        return 'CONFIRM_PAYMENT'; // Motorista precisa confirmar recebimento
      } else {
        return 'AWAITING_DRIVER_CONFIRMATION'; // Passageiro aguardando confirmação
      }
    }

    if (
      ridePayment.payment.status === 'PAID' &&
      ridePayment.payment.confirmedByDriver
    ) {
      return null; // Tudo concluído
    }

    return 'UNKNOWN';
  }

  // ==================== WEBHOOK STRIPE ====================

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
  // Localize este método no seu payments.controller.ts e substitua:
  @Post('webhook/stripe')
  @HttpCode(HttpStatus.OK)
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

  // ==================== SIMULAÇÃO E TESTES ====================

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
      // Buscar transação pendente
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

      // Simular sucesso
      await this.paymentsService['prisma'].transaction.update({
        where: { id: transaction.id },
        data: {
          status: 'COMPLETED',
          processedAt: new Date(),
        },
      });

      // Atualizar saldo
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
      },
      paymentMethods: ['WALLET_BALANCE', 'CASH', 'PIX', 'CARD_MACHINE'],
      supportedOperations: [
        'ADD_WALLET_BALANCE',
        'PROCESS_RIDE_PAYMENT',
        'CONFIRM_DRIVER_PAYMENT',
        'VIEW_TRANSACTION_HISTORY',
        'CHECK_PAYMENT_STATUS',
      ],
    };
  }
}
