import { Module, Global } from '@nestjs/common';
import { CommonRedisService } from './redis.service';

@Global()
@Module({
  providers: [CommonRedisService],
  exports: [CommonRedisService],
})
export class CommonRedisModule {}
