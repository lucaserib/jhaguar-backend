import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorator/user.decorator';
import { NotifyPassengerDto } from './dto/notify-passenger.dto';

@ApiTags('Notificações')
@Controller()
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('drivers/:driverId/notify-passenger')
  @ApiOperation({
    summary: 'Notificar passageiro sobre atualização da corrida',
    description:
      'Permite que o motorista envie notificações para o passageiro sobre o status da corrida',
  })
  @ApiParam({ name: 'driverId', description: 'ID do motorista' })
  @ApiResponse({
    status: 200,
    description: 'Notificação enviada com sucesso',
    schema: {
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async notifyPassenger(
    @Param('driverId') driverId: string,
    @Body() notifyPassengerDto: NotifyPassengerDto,
    @User() user: any,
  ) {
    // Verificar se o usuário logado é o próprio motorista
    const authenticatedDriverId = user.driverId || user.id;

    if (authenticatedDriverId !== driverId) {
      return {
        success: false,
        message:
          'Você não tem permissão para enviar notificações em nome deste motorista',
      };
    }

    return this.notificationsService.notifyPassenger(
      driverId,
      notifyPassengerDto,
    );
  }
}
