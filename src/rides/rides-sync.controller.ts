import { Controller, Get, Post, UseGuards, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserId } from '../auth/decorators/user-id.decorator';
import { RidesStateService } from './rides-state.service';
import { Throttle } from '@nestjs/throttler';

@Controller('rides/sync')
@UseGuards(JwtAuthGuard)
export class RidesSyncController {
  constructor(private readonly ridesStateService: RidesStateService) {}

  @Get('state')
  @Throttle(300, 60) // 300 requests per minute for sync state - mais permissivo
  async getUserRideState(@UserId() userId: string) {
    const state = await this.ridesStateService.getUserRideState(userId);

    return {
      success: true,
      data: state,
      message: 'Estado da corrida sincronizado',
    };
  }

  @Post('cleanup')
  @Throttle(60, 60) // 60 requests per minute for cleanup
  async cleanupOrphanedRides(@UserId() userId: string) {
    const result = await this.ridesStateService.cleanupOrphanedRides(userId);

    return {
      success: true,
      data: result,
      message: `Limpeza concluída: ${result.cleaned} corridas órfãs removidas`,
    };
  }

  @Delete('reset')
  @Throttle(30, 60) // 30 requests per minute for reset
  async forceResetUserState(@UserId() userId: string) {
    const result = await this.ridesStateService.forceResetUserState(userId);

    return {
      success: result.success,
      data: result,
      message: result.message,
    };
  }
}