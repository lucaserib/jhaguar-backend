import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LocationUpdateDto } from './dto/location-update.dto';
import { DriversService } from './drivers.service';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/driver',
})
export class DriverGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private connectedDrivers = new Map<string, string>(); // socketId -> driverId
  private readonly logger = new Logger(DriverGateway.name);

  constructor(
    private driversService: DriversService,
    private jwtService: JwtService,
  ) {}

  handleConnection(client: Socket) {
    const driverId = this.extractDriverId(client);
    this.logger.log(`Driver connected: ${client.id}, driverId: ${driverId}`);

    if (driverId) {
      this.connectedDrivers.set(client.id, driverId);
      client.join(`driver:${driverId}`);
      this.logger.log(`Driver ${driverId} joined room driver:${driverId}`);
    }
  }

  handleDisconnect(client: Socket) {
    const driverId = this.connectedDrivers.get(client.id);
    this.logger.log(`Driver disconnected: ${client.id}, driverId: ${driverId}`);

    if (driverId) {
      this.connectedDrivers.delete(client.id);
      client.leave(`driver:${driverId}`);
      this.logger.log(`Driver ${driverId} left room driver:${driverId}`);
    }
  }

  @SubscribeMessage('driver:online')
  handleDriverOnline(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { driverId: string },
  ) {
    this.logger.log(`Driver going online: ${data.driverId}`);
    client.join(`driver:${data.driverId}`);
    this.connectedDrivers.set(client.id, data.driverId);

    // Broadcast que motorista ficou online para sistema de matchmaking
    this.server.emit('driver:status-changed', {
      driverId: data.driverId,
      status: 'online',
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('driver:offline')
  handleDriverOffline(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { driverId: string },
  ) {
    this.logger.log(`Driver going offline: ${data.driverId}`);
    client.leave(`driver:${data.driverId}`);

    // Broadcast que motorista ficou offline
    this.server.emit('driver:status-changed', {
      driverId: data.driverId,
      status: 'offline',
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('driver:location-update')
  async handleLocationUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: LocationUpdateDto & { driverId: string },
  ) {
    try {
      // Processar atualização de localização através do service
      await this.driversService.updateLocationWithCache(data.driverId, data);

      // Broadcast localização para outros serviços que possam precisar
      this.server.emit('driver:location-changed', {
        driverId: data.driverId,
        location: {
          latitude: data.latitude,
          longitude: data.longitude,
          heading: data.heading,
          speed: data.speed,
          accuracy: data.accuracy,
        },
        isOnline: data.isOnline,
        isAvailable: data.isAvailable,
        timestamp: new Date(),
      });
    } catch (error) {
      this.logger.error(`Error updating driver location: ${error.message}`);
      client.emit('error', {
        message: 'Erro ao atualizar localização',
        code: 'LOCATION_UPDATE_ERROR',
      });
    }
  }

  // Métodos para emitir eventos para motoristas específicos
  emitNewRideRequest(driverId: string, request: any) {
    this.logger.log(`Emitting new ride request to driver ${driverId}`);
    this.server.to(`driver:${driverId}`).emit('ride:new-request', request);
  }

  emitRideRequestCancelled(driverId: string, rideId: string) {
    this.logger.log(`Emitting ride request cancelled to driver ${driverId}`);
    this.server
      .to(`driver:${driverId}`)
      .emit('ride:request-cancelled', { rideId });
  }

  emitRideStatusUpdate(driverId: string, rideData: any) {
    this.logger.log(`Emitting ride status update to driver ${driverId}`);
    this.server.to(`driver:${driverId}`).emit('ride:status-changed', rideData);
  }

  emitEarningsUpdate(driverId: string, earningsData: any) {
    this.logger.log(`Emitting earnings update to driver ${driverId}`);
    this.server.to(`driver:${driverId}`).emit('earnings:updated', earningsData);
  }

  emitSystemMaintenance(message: string) {
    this.logger.log('Emitting system maintenance notification');
    this.server.emit('system:maintenance', { message, timestamp: new Date() });
  }

  // Métodos para broadcast geral
  broadcastToAllDrivers(event: string, data: any) {
    this.server.emit(event, data);
  }

  // Método para verificar se um motorista está conectado
  isDriverConnected(driverId: string): boolean {
    const connectedSocketIds = Array.from(this.connectedDrivers.entries())
      .filter(([_, id]) => id === driverId)
      .map(([socketId]) => socketId);

    return connectedSocketIds.length > 0;
  }

  // Método para obter contagem de motoristas conectados
  getConnectedDriversCount(): number {
    return this.connectedDrivers.size;
  }

  private extractDriverId(client: Socket): string | null {
    try {
      // Extrair token do header de autorização ou query params
      const token =
        client.handshake.auth?.token ||
        client.handshake.query?.token ||
        client.handshake.headers?.authorization?.replace('Bearer ', '');

      if (!token) {
        this.logger.warn('No token provided in WebSocket connection');
        return null;
      }

      // Decodificar JWT
      const payload = this.jwtService.verify(token);

      // Retornar o userId (que será usado para buscar o driverId)
      return payload.sub || payload.userId;
    } catch (error) {
      this.logger.error(
        `Error extracting driver ID from JWT: ${error.message}`,
      );
      return null;
    }
  }
}
