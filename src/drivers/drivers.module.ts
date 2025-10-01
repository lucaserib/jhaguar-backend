import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { DriverGateway } from './drivers.gateway';
import { RedisModule } from '../common/redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    PrismaModule,
    NotificationsModule,
    RedisModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [DriversController],
  providers: [DriversService, DriverGateway],
  exports: [DriversService, DriverGateway],
})
export class DriversModule {}
