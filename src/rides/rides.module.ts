import { Module } from '@nestjs/common';
import { RidesController } from './rides.controller';
import { RidesService } from './rides.service';
import { MapsModule } from '../maps/maps.module';
import { RideTypesModule } from '../ride-types/ride-types.module';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  imports: [MapsModule, RideTypesModule, PaymentsModule],
  controllers: [RidesController],
  providers: [RidesService],
  exports: [RidesService],
})
export class RidesModule {}
