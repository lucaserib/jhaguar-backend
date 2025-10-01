import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateMessageDto, ChatMessageResponseDto } from './dto';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/ws-jwt.guard';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private activeConnections = new Map<
    string,
    { socket: Socket; userId: string; rideId?: string }
  >();

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(socket: Socket) {
    try {
      console.log(`💬 Chat client connected: ${socket.id}`);

      // Autenticação WebSocket
      const token = socket.handshake.auth?.token;
      const rideId = socket.handshake.auth?.rideId;
      const userType = socket.handshake.auth?.userType;

      if (!token) {
        console.error(`💬 [ChatGateway] No token provided for socket ${socket.id}`);
        socket.emit('chat-error', { message: 'Token de autenticação necessário' });
        socket.disconnect();
        return;
      }

      if (!rideId) {
        console.error(`💬 [ChatGateway] No rideId provided for socket ${socket.id}`);
        socket.emit('chat-error', { message: 'ID da corrida necessário' });
        socket.disconnect();
        return;
      }

      // Validate JWT token (basic validation - WsJwtGuard will do full validation)
      try {
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const userId = payload.sub;

        console.log(`💬 [ChatGateway] Authenticated connection: userId=${userId}, rideId=${rideId}, userType=${userType}`);

        // Store connection with authentication info
        this.activeConnections.set(socket.id, {
          socket,
          userId,
          rideId
        });

        // Add user data to socket for guard access
        socket.data = {
          userId,
          rideId,
          userType: userType || 'PASSENGER'
        };

      } catch (authError) {
        console.error(`💬 [ChatGateway] Invalid token for socket ${socket.id}:`, authError.message);
        socket.emit('chat-error', { message: 'Token inválido' });
        socket.disconnect();
        return;
      }

    } catch (error) {
      console.error(`💬 [ChatGateway] Connection error for socket ${socket.id}:`, error.message);
      socket.emit('chat-error', { message: 'Erro de conexão' });
      socket.disconnect();
    }
  }

  handleDisconnect(socket: Socket) {
    console.log(`💬 Chat client disconnected: ${socket.id}`);

    const connection = this.activeConnections.get(socket.id);
    if (connection?.rideId) {
      socket.leave(`ride-${connection.rideId}`);
    }

    this.activeConnections.delete(socket.id);
  }

  @SubscribeMessage('join-chat')
  async handleJoinChat(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { rideId: string },
  ) {
    try {
      // Use authenticated data from socket
      const userId = socket.data?.userId;
      const authenticatedRideId = socket.data?.rideId;
      const requestedRideId = data.rideId;

      if (!userId) {
        throw new Error('Usuário não autenticado');
      }

      // Verify ride ID matches authenticated ride
      if (authenticatedRideId !== requestedRideId) {
        console.error(`💬 [ChatGateway] RideId mismatch: authenticated=${authenticatedRideId}, requested=${requestedRideId}`);
        throw new Error('ID da corrida não corresponde à autenticação');
      }

      console.log(`💬 [ChatGateway] User ${userId} attempting to join chat for ride ${requestedRideId}`);

      // Verificar se o usuário tem permissão para este chat
      const chatData = await this.chatService.getOrCreateChatByRideId(requestedRideId, userId);

      // Entrar na sala do chat
      const roomName = `ride-${requestedRideId}`;
      socket.join(roomName);

      // Atualizar conexão com rideId confirmado
      const connection = this.activeConnections.get(socket.id);
      if (connection) {
        this.activeConnections.set(socket.id, {
          ...connection,
          rideId: requestedRideId
        });
      }

      console.log(`💬 [ChatGateway] User ${userId} successfully joined chat room ${roomName}`);

      socket.emit('joined-chat', {
        rideId: requestedRideId,
        status: 'success',
        chatId: chatData.id
      });
    } catch (error) {
      console.error(`💬 [ChatGateway] Error joining chat:`, error.message);
      socket.emit('chat-error', { message: error.message });
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('leave-chat')
  async handleLeaveChat(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { rideId: string },
  ) {
    const { rideId } = data;
    const roomName = `ride-${rideId}`;

    socket.leave(roomName);

    const connection = this.activeConnections.get(socket.id);
    if (connection) {
      this.activeConnections.set(socket.id, {
        ...connection,
        rideId: undefined,
      });
    }

    console.log(`💬 Socket ${socket.id} left chat for ride ${rideId}`);
    socket.emit('left-chat', { rideId, status: 'success' });
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('send-message')
  async handleSendMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createMessageDto: CreateMessageDto & { userId: string },
  ) {
    try {
      const { userId, ...messageData } = createMessageDto;

      // Enviar mensagem através do service
      const message = await this.chatService.sendMessage(messageData, userId);

      // Emitir para todos na sala
      this.emitNewMessage(messageData.rideId, message);
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('chat-error', { message: error.message });
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('mark-as-read')
  async handleMarkAsRead(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { rideId: string; userId: string },
  ) {
    try {
      const { rideId, userId } = data;

      await this.chatService.markMessagesAsRead(rideId, userId);

      // Emitir evento de leitura
      this.emitMessagesRead(rideId, userId);
    } catch (error) {
      console.error('Error marking messages as read:', error);
      socket.emit('chat-error', { message: error.message });
    }
  }

  // Métodos públicos para emitir eventos externamente
  emitNewMessage(rideId: string, message: ChatMessageResponseDto) {
    const roomName = `ride-${rideId}`;
    this.server.to(roomName).emit('new-message', message);
    console.log(`💬 New message emitted to room ${roomName}`);
  }

  emitMessagesRead(rideId: string, userId: string) {
    const roomName = `ride-${rideId}`;
    this.server.to(roomName).emit('messages-read', { rideId, userId });
    console.log(`💬 Messages read event emitted to room ${roomName}`);
  }

  emitChatDeactivated(rideId: string) {
    const roomName = `ride-${rideId}`;
    this.server.to(roomName).emit('chat-deactivated', { rideId });
    console.log(`💬 Chat deactivated event emitted to room ${roomName}`);
  }
}
