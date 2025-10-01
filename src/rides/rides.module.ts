import { Module, forwardRef } from '@nestjs/common';
import { IdempotencyService } from '../common/services/idempotency.service';
import { RedisModule } from '../common/redis/redis.module';
import { RidesController } from './rides.controller';
import { RidesDebugController } from './rides-debug.controller';
import { RidesSyncController } from './rides-sync.controller';
import { RidesService } from './rides.service';
import { RidesStateService } from './rides-state.service';
import { RidesCleanupService } from './rides-cleanup.service';
import { RidesValidationService } from './rides-validation.service';
import { RideGateway } from './rides.gateway';
import { MapsModule } from '../maps/maps.module';
import { RideTypesModule } from '../ride-types/ride-types.module';
import { PaymentsModule } from '../payments/payments.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev-secret-key',
      signOptions: { expiresIn: '7d' },
    }),
    MapsModule,
    RideTypesModule,
    PaymentsModule,
    forwardRef(() => NotificationsModule),
    ChatModule,
    RedisModule,
  ],
  controllers: [RidesController, RidesDebugController, RidesSyncController],
  providers: [RidesService, RidesStateService, RidesCleanupService, RidesValidationService, RideGateway, IdempotencyService],
  exports: [RidesService, RideGateway],
})
export class RidesModule {}
