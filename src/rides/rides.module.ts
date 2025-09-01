import { Module, forwardRef } from '@nestjs/common';
import { IdempotencyService } from '../common/services/idempotency.service';
import { RedisModule } from '../common/redis/redis.module';
import { RidesController } from './rides.controller';
import { RidesService } from './rides.service';
import { RideGateway } from './rides.gateway';
import { MapsModule } from '../maps/maps.module';
import { RideTypesModule } from '../ride-types/ride-types.module';
import { PaymentsModule } from '../payments/payments.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

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
    RedisModule,
  ],
  controllers: [RidesController],
  providers: [RidesService, RideGateway, IdempotencyService],
  exports: [RidesService, RideGateway],
})
export class RidesModule {}
