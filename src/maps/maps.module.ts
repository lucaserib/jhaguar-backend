import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DriversModule } from 'src/drivers/drivers.module';
import { RideTypesModule } from 'src/ride-types/ride-types.module';
import { MapsService } from './maps.service';
import { MapsController } from './maps.controller';

@Module({
  imports: [ConfigModule, DriversModule, RideTypesModule],
  controllers: [MapsController],
  providers: [MapsService],
  exports: [MapsService],
})
export class MapsModule {}
