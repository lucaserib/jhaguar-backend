import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Patch,
  Logger,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorator/user.decorator';
import { SendMessageDto } from './dto/send-message.dto';
import { MarkAsReadDto } from './dto/mark-as-read.dto';
import { MessageSenderType } from './dto/create-message.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Chat')
@Controller('chat')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ChatController {
  private readonly logger = new Logger(ChatController.name);

  constructor(private readonly chatService: ChatService) {}

  @Get('ride/:rideId')
  @ApiOperation({ summary: 'Obter ou criar chat para uma corrida' })
  @ApiParam({ name: 'rideId', description: 'ID da corrida' })
  @ApiResponse({ status: 200, description: 'Chat retornado com sucesso' })
  @ApiResponse({ status: 404, description: 'Corrida não encontrada' })
  @ApiResponse({ status: 403, description: 'Sem permissão para acessar este chat' })
  async getChatRoom(@Param('rideId') rideId: string, @User() user: any) {
    this.logger.log(`📱 GET /chat/ride/${rideId} - User: ${user.id}`);
    return this.chatService.getOrCreateChatByRideId(rideId, user.id);
  }

  @Get('ride/:rideId/messages')
  @ApiOperation({ summary: 'Buscar histórico de mensagens' })
  @ApiParam({ name: 'rideId', description: 'ID da corrida' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limite de mensagens' })
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Offset para paginação' })
  @ApiResponse({ status: 200, description: 'Mensagens retornadas com sucesso' })
  async getChatHistory(
    @Param('rideId') rideId: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @User() user?: any,
  ) {
    this.logger.log(
      `📜 GET /chat/ride/${rideId}/messages - User: ${user.id} - Limit: ${limit}, Offset: ${offset}`,
    );
    return this.chatService.getChatHistory(
      rideId,
      user.id,
      limit ? Number(limit) : 50,
      offset ? Number(offset) : 0,
    );
  }

  @Post('ride/:rideId/messages')
  @ApiOperation({ summary: 'Enviar mensagem no chat' })
  @ApiParam({ name: 'rideId', description: 'ID da corrida' })
  @ApiResponse({ status: 201, description: 'Mensagem enviada com sucesso' })
  async sendMessage(
    @Param('rideId') rideId: string,
    @Body() sendMessageDto: SendMessageDto,
    @User() user: any,
  ) {
    this.logger.log(
      `💬 POST /chat/ride/${rideId}/messages - User: ${user.id} - Content: "${sendMessageDto.content.substring(0, 50)}..."`,
    );

    // Inferir senderType automaticamente com base no usuário
    const userRecord = await this.chatService['prisma'].user.findUnique({
      where: { id: user.id },
      include: { Driver: true, Passenger: true },
    });

    const senderType: MessageSenderType = userRecord?.Driver
      ? MessageSenderType.DRIVER
      : MessageSenderType.PASSENGER;

    // Construir CreateMessageDto completo
    const createMessageDto = {
      rideId,
      content: sendMessageDto.content,
      type: sendMessageDto.type,
      metadata: sendMessageDto.metadata,
      senderType,
    };

    return this.chatService.sendMessage(createMessageDto, user.id);
  }

  @Patch('ride/:rideId/messages/read')
  @ApiOperation({ summary: 'Marcar mensagens como lidas' })
  @ApiParam({ name: 'rideId', description: 'ID da corrida' })
  @ApiResponse({ status: 200, description: 'Mensagens marcadas como lidas' })
  async markAsRead(
    @Param('rideId') rideId: string,
    @Body() markAsReadDto: MarkAsReadDto,
    @User() user: any,
  ) {
    this.logger.log(
      `✓✓ PATCH /chat/ride/${rideId}/messages/read - User: ${user.id} - MessageIds: ${markAsReadDto.messageIds.length}`,
    );

    // Override rideId from params (segurança)
    markAsReadDto.rideId = rideId;

    return this.chatService.markSpecificMessagesAsRead(
      rideId,
      markAsReadDto.messageIds,
      user.id,
    );
  }

  @Get('ride/:rideId/unread')
  @ApiOperation({ summary: 'Contar mensagens não lidas' })
  @ApiParam({ name: 'rideId', description: 'ID da corrida' })
  @ApiResponse({ status: 200, description: 'Contagem de mensagens não lidas' })
  async getUnreadCount(@Param('rideId') rideId: string, @User() user: any) {
    this.logger.log(`🔢 GET /chat/ride/${rideId}/unread - User: ${user.id}`);

    const count = await this.chatService.getUnreadMessageCount(rideId, user.id);

    return {
      rideId,
      unreadCount: count,
    };
  }

  @Patch('ride/:rideId/mark-all-read')
  @ApiOperation({ summary: 'Marcar todas as mensagens da corrida como lidas' })
  @ApiParam({ name: 'rideId', description: 'ID da corrida' })
  @ApiResponse({ status: 200, description: 'Todas as mensagens marcadas como lidas' })
  async markAllAsRead(@Param('rideId') rideId: string, @User() user: any) {
    this.logger.log(
      `✓✓ PATCH /chat/ride/${rideId}/mark-all-read - User: ${user.id}`,
    );

    await this.chatService.markMessagesAsRead(rideId, user.id);

    return {
      success: true,
      message: 'Todas as mensagens foram marcadas como lidas',
    };
  }
}
