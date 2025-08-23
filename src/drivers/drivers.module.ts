import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { DriverGateway } from './drivers.gateway';
import { RedisService } from './redis.service';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    PrismaModule,
    NotificationsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 1,
      },
    ]),
  ],
  controllers: [DriversController],
  providers: [DriversService, DriverGateway, RedisService],
  exports: [DriversService, DriverGateway, RedisService],
})
export class DriversModule {}
