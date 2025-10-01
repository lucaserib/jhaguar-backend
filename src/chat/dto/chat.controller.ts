import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ChatService } from '../chat.service';
import { CreateMessageDto } from '.';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ChatGateway } from '../chat.gateway';
import { UserId } from '../../auth/decorators/user-id.decorator';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatGateway: ChatGateway,
  ) {}

  @Get('ride/:rideId')
  async getChatByRideId(
    @Param('rideId') rideId: string,
    @UserId() userId: string,
  ) {
    try {
      const result = await this.chatService.getOrCreateChatByRideId(
        rideId,
        userId,
      );
      return { success: true, data: result };
    } catch (error) {
      console.error(
        `💬 [ChatController] Error loading chat for ride ${rideId}, user ${userId}:`,
        {
          error: error.message,
          status: error.status,
          name: error.name,
          rideId,
          userId,
        },
      );

      // Return more specific error messages
      if (error.message === 'Corrida não encontrada') {
        return { success: false, message: 'Corrida não encontrada' };
      }
      if (error.message === 'Acesso negado para esta conversa') {
        return { success: false, message: 'Acesso negado para esta conversa' };
      }
      if (
        error.message?.includes('Chat não está disponível') ||
        error.message?.includes('Chat estará disponível')
      ) {
        return { success: false, message: error.message };
      }

      return { success: false, message: 'Erro ao carregar chat' };
    }
  }

  @Post('message')
  async sendMessage(
    @Body() createMessageDto: CreateMessageDto,
    @UserId() userId: string,
  ) {
    const message = await this.chatService.sendMessage(
      createMessageDto,
      userId,
    );

    // Emitir mensagem via WebSocket
    this.chatGateway.emitNewMessage(createMessageDto.rideId, message);

    return message;
  }

  @Put('ride/:rideId/read')
  async markMessagesAsRead(
    @Param('rideId') rideId: string,
    @UserId() userId: string,
  ) {
    await this.chatService.markMessagesAsRead(rideId, userId);

    // Emitir evento de leitura via WebSocket
    this.chatGateway.emitMessagesRead(rideId, userId);

    return { success: true };
  }

  @Get('ride/:rideId/unread-count')
  async getUnreadMessageCount(
    @Param('rideId') rideId: string,
    @UserId() userId: string,
  ) {
    const count = await this.chatService.getUnreadMessageCount(rideId, userId);
    return { count };
  }
}
