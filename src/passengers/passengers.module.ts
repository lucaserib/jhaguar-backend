import { Module } from '@nestjs/common';
import { PassengersController } from './passengers.controller';
import { PassengersService } from './passengers.service';

@Module({
  controllers: [PassengersController],
  providers: [PassengersService]
})
export class PassengersModule {}
