import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Logger,
  Headers,
  RawBody,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { StripeService } from './stripe.service';

@ApiTags('Stripe')
@Controller('stripe')
export class StripeController {
  private readonly logger = new Logger(StripeController.name);

  constructor(private readonly stripeService: StripeService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Criar PaymentIntent para adicionar saldo',
    description:
      'Cria um PaymentIntent do Stripe para adicionar saldo à carteira',
  })
  @ApiResponse({
    status: 200,
    description: 'PaymentIntent criado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  async createPaymentIntent(@Body() createPaymentDto: CreatePaymentIntentDto) {
    try {
      this.logger.log(
        `Criando PaymentIntent para ${createPaymentDto.name} - R$ ${createPaymentDto.amount}`,
      );

      const result =
        await this.stripeService.createPaymentIntent(createPaymentDto);

      return {
        success: true,
        data: result,
        message: 'PaymentIntent criado com sucesso',
      };
    } catch (error) {
      this.logger.error('Erro ao criar PaymentIntent:', error);

      // Melhor tratamento de erros do Stripe
      if (error instanceof Error) {
        this.logger.error('Stack trace:', error.stack);
        return {
          success: false,
          message: error.message,
          data: null,
        };
      }

      return {
        success: false,
        message: 'Erro desconhecido ao criar PaymentIntent',
        data: null,
      };
    }
  }

  @Post('confirm-payment')
  @ApiOperation({
    summary: 'Confirmar pagamento processado',
    description: 'Confirma que um pagamento foi processado com sucesso',
  })
  async confirmPayment(
    @Body() body: { paymentIntentId: string; userId: string },
  ) {
    try {
      const result = await this.stripeService.confirmPayment(
        body.paymentIntentId,
        body.userId,
      );

      return {
        success: true,
        data: result,
        message: 'Pagamento confirmado com sucesso',
      };
    } catch (error) {
      this.logger.error('Erro ao confirmar pagamento:', error);
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Erro ao confirmar pagamento',
      );
    }
  }

  @Post('webhook')
  @ApiOperation({
    summary: 'Webhook do Stripe',
    description: 'Endpoint para receber eventos do Stripe',
  })
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @RawBody() payload: Buffer,
  ) {
    try {
      if (!signature) {
        throw new BadRequestException('Missing stripe-signature header');
      }

      await this.stripeService.handleWebhook(signature, payload);

      return { received: true };
    } catch (error) {
      this.logger.error('Erro ao processar webhook:', error);
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Erro ao processar webhook',
      );
    }
  }
}
