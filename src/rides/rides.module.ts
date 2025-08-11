import { Module } from '@nestjs/common';
import { IdempotencyService } from '../common/services/idempotency.service';
import { CommonRedisModule } from '../common/redis/redis.module';
import { RidesController } from './rides.controller';
import { RidesService } from './rides.service';
import { RideGateway } from './rides.gateway';
import { MapsModule } from '../maps/maps.module';
import { RideTypesModule } from '../ride-types/ride-types.module';
import { PaymentsModule } from '../payments/payments.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    MapsModule,
    RideTypesModule,
    PaymentsModule,
    CommonRedisModule,
  ],
  controllers: [RidesController],
  providers: [RidesService, RideGateway, IdempotencyService],
  exports: [RidesService, RideGateway],
})
export class RidesModule {}
