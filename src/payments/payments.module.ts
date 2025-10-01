import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { IdempotencyService } from '../common/services/idempotency.service';
import { RedisModule } from '../common/redis/redis.module';

import { PaymentsController } from './payments.controller';
import { FeeManagementController } from './fee-management.controller';
import { PaymentsAdminController } from './admin.controller';

import { PaymentsService } from './payments.service';
import { FeeManagementService } from './fee-management.service';

import { AutoChargeInterceptor } from './interceptors/auto-charge.interceptor';
import { FeeStatusGuard } from './guards/fee-status.guard';
import { BalanceValidationMiddleware } from './middleware/balance-validation.middleware';

@Module({
  imports: [ConfigModule, ScheduleModule.forRoot(), RedisModule],
  controllers: [
    PaymentsController,
    FeeManagementController,
    PaymentsAdminController,
  ],
  providers: [
    PaymentsService,
    FeeManagementService,
    IdempotencyService,

    // Interceptor global para cobrança automática
    {
      provide: APP_INTERCEPTOR,
      useClass: AutoChargeInterceptor,
    },

    // Guard global para verificação de taxas (aplicado apenas onde necessário)
    {
      provide: APP_GUARD,
      useClass: FeeStatusGuard,
    },
  ],
  exports: [PaymentsService, FeeManagementService],
})
export class PaymentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Aplicar middleware de validação de saldo em rotas críticas
    consumer
      .apply(BalanceValidationMiddleware)
      .forRoutes('payments/ride/pay', 'payments/wallet/transfer');
  }
}
