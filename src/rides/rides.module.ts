import { Module } from '@nestjs/common';
import { RidesController } from './rides.controller';
import { RidesService } from './rides.service';
import { RideGateway } from './rides.gateway';
import { MapsModule } from '../maps/maps.module';
import { RideTypesModule } from '../ride-types/ride-types.module';
import { PaymentsModule } from '../payments/payments.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, MapsModule, RideTypesModule, PaymentsModule],
  controllers: [RidesController],
  providers: [RidesService, RideGateway],
  exports: [RidesService, RideGateway],
})
export class RidesModule {}
