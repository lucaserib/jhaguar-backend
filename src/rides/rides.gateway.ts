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
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class RideGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private connectedUsers = new Map<
    string,
    { socketId: string; userId: string; userType: 'driver' | 'passenger' }
  >();
  private readonly logger = new Logger(RideGateway.name);
  constructor(private readonly jwtService: JwtService) {}

  handleConnection(client: Socket) {
    const userId = this.extractUserId(client);
    const userType = this.extractUserType(client);

    this.logger.log(
      `🔌 User connected: ${client.id}, userId: ${userId}, type: ${userType}`,
    );
    this.logger.log(
      `🔑 Connection details: ${JSON.stringify({
        token: client.handshake.auth?.token ? '✅ Present' : '❌ Missing',
        userType: client.handshake.auth?.userType || client.handshake.query.userType,
        driverId: client.handshake.auth?.driverId,
        userId: client.handshake.auth?.userId,
      })}`,
    );

    if (userId && userType) {
      this.connectedUsers.set(client.id, {
        socketId: client.id,
        userId,
        userType,
      });
      this.logger.log(
        `✅ User registered: ${client.id} -> ${userId} (${userType})`,
      );
      this.logger.log(
        `👥 Total connected users: ${this.connectedUsers.size}`,
      );
    } else {
      this.logger.warn(
        `❌ Failed to register user: ${client.id} (userId: ${userId}, userType: ${userType})`,
      );
    }
  }

  handleDisconnect(client: Socket) {
    const userData = this.connectedUsers.get(client.id);
    this.logger.log(
      `User disconnected: ${client.id}, userId: ${userData?.userId}`,
    );

    if (userData) {
      this.connectedUsers.delete(client.id);
    }
  }

  @SubscribeMessage('ride:join')
  handleJoinRide(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { rideId: string; userType: 'driver' | 'passenger' },
  ) {
    this.logger.log(
      `User joining ride room: ${data.rideId}, type: ${data.userType}`,
    );
    client.join(`ride:${data.rideId}`);

    const userData = this.connectedUsers.get(client.id);
    if (userData) {
      userData.userType = data.userType;
    }

    client.to(`ride:${data.rideId}`).emit('ride:user-joined', {
      userType: data.userType,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('ride:leave')
  handleLeaveRide(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { rideId: string },
  ) {
    this.logger.log(`User leaving ride room: ${data.rideId}`);
    client.leave(`ride:${data.rideId}`);

    client.to(`ride:${data.rideId}`).emit('ride:user-left', {
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('ride:status-update')
  handleStatusUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      rideId: string;
      status: string;
      location?: { latitude: number; longitude: number };
      metadata?: any;
    },
  ) {
    this.logger.log(`Ride status update: ${data.rideId} -> ${data.status}`);

    client.to(`ride:${data.rideId}`).emit('ride:status-changed', {
      rideId: data.rideId,
      status: data.status,
      location: data.location,
      metadata: data.metadata,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('ride:location-update')
  handleLocationUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      rideId: string;
      userType: 'driver' | 'passenger';
      location: {
        latitude: number;
        longitude: number;
        heading?: number;
        speed?: number;
      };
    },
  ) {
    client.to(`ride:${data.rideId}`).emit('ride:location-changed', {
      userType: data.userType,
      location: data.location,
      timestamp: new Date(),
    });
  }

  emitToRide(rideId: string, event: string, data: any) {
    this.logger.log(`Emitting ${event} to ride ${rideId}`);
    this.server.to(`ride:${rideId}`).emit(event, {
      ...data,
      timestamp: new Date(),
    });
  }

  emitRideStatusChanged(
    rideId: string,
    status: string,
    location?: { latitude: number; longitude: number },
    metadata?: any,
  ) {
    this.emitToRide(rideId, 'ride:status-changed', {
      rideId,
      status,
      location,
      metadata,
    });
  }

  emitRideAccepted(rideId: string, driverInfo: any, estimatedArrival?: number) {
    this.emitToRide(rideId, 'ride:accepted', {
      rideId,
      driver: driverInfo,
      estimatedArrival,
    });
  }

  emitRideRejected(rideId: string, reason?: string) {
    this.emitToRide(rideId, 'ride:rejected', {
      rideId,
      reason,
    });
  }

  emitDriverArrived(
    rideId: string,
    location: { latitude: number; longitude: number },
  ) {
    this.emitToRide(rideId, 'ride:driver-arrived', {
      rideId,
      location,
    });
  }

  emitRideStarted(rideId: string, route?: any) {
    this.emitToRide(rideId, 'ride:started', {
      rideId,
      route,
    });
  }

  emitRideCompleted(rideId: string, summary: any) {
    this.emitToRide(rideId, 'ride:completed', {
      rideId,
      summary,
    });
  }

  emitRideCancelled(
    rideId: string,
    reason: string,
    cancelledBy: 'driver' | 'passenger',
  ) {
    this.emitToRide(rideId, 'ride:cancelled', {
      rideId,
      reason,
      cancelledBy,
    });
  }

  emitPaymentStatusChanged(
    rideId: string,
    paymentStatus: string,
    details?: any,
  ) {
    this.emitToRide(rideId, 'ride:payment-status-changed', {
      rideId,
      paymentStatus,
      details,
    });
  }

  broadcastRideRequest(ride: any, targetDriverIds: string[]) {
    this.logger.log(
      `🚀 🚨 BROADCASTING RIDE REQUEST - INÍCIO 🚨`,
    );
    this.logger.log(
      `🎯 Ride ID: ${ride.id} | Target drivers: ${targetDriverIds.length}`,
    );
    this.logger.log(
      `🎯 Target driver userIds: ${JSON.stringify(targetDriverIds)}`,
    );

    const allConnectedUsers = Array.from(this.connectedUsers.entries());
    this.logger.log(
      `👥 Total connected users: ${allConnectedUsers.length}`,
    );
    
    const connectedDrivers = allConnectedUsers.filter(([_, userData]) => userData.userType === 'driver');
    this.logger.log(
      `🚗 Connected drivers: ${connectedDrivers.length}`,
    );

    // Log detalhado de todos os motoristas conectados
    connectedDrivers.forEach(([socketId, userData]) => {
      const isTarget = targetDriverIds.includes(userData.userId);
      this.logger.log(
        `🚗 Driver conectado: ${userData.userId} (socket: ${socketId}) - ${isTarget ? '✅ TARGET' : '⚠️ NOT TARGET'}`,
      );
    });
    
    // CORREÇÃO: Buscar motoristas específicos primeiro, depois fallback
    let connectedDriverSockets = allConnectedUsers
      .filter(
        ([_, userData]) =>
          userData.userType === 'driver' &&
          targetDriverIds.includes(userData.userId),
      )
      .map(([socketId]) => socketId);

    this.logger.log(
      `🎯 Specific target drivers connected: ${connectedDriverSockets.length}`,
    );

    // CORREÇÃO CRÍTICA: Se nenhum motorista específico está conectado, usar TODOS os motoristas conectados
    if (connectedDriverSockets.length === 0) {
      this.logger.warn(
        `⚠️ ZERO target drivers connected! Using FALLBACK: sending to ALL connected drivers`,
      );
      
      connectedDriverSockets = connectedDrivers.map(([socketId]) => socketId);
      
      this.logger.log(
        `🔄 FALLBACK: Sending to ${connectedDriverSockets.length} connected drivers`,
      );
      
      if (connectedDriverSockets.length === 0) {
        this.logger.error(
          `❌ NO DRIVERS CONNECTED AT ALL! Cannot broadcast ride request.`,
        );
        return;
      }
    }

    this.logger.log(
      `📤 Final decision: Sending to ${connectedDriverSockets.length} driver sockets`,
    );

    // Enviar para todos os sockets selecionados
    connectedDriverSockets.forEach((socketId) => {
      this.logger.log(`📨 🚨 SENDING RIDE REQUEST to socket: ${socketId}`);
      this.server.to(socketId).emit('new-ride-request', ride);
    });
    
    this.logger.log(`✅ 🚨 BROADCAST COMPLETED! Sent to ${connectedDriverSockets.length} drivers 🚨`);
  }

  broadcastRideRequestExpired(
    rideRequestId: string,
    targetDriverIds: string[],
  ) {
    this.logger.log(`Broadcasting ride request expiration ${rideRequestId}`);

    const connectedDriverSockets = Array.from(this.connectedUsers.entries())
      .filter(
        ([_, userData]) =>
          userData.userType === 'driver' &&
          targetDriverIds.includes(userData.userId),
      )
      .map(([socketId]) => socketId);

    connectedDriverSockets.forEach((socketId) => {
      this.server.to(socketId).emit('ride:request-expired', {
        rideRequestId,
        timestamp: new Date(),
      });
    });
  }

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket) {
    client.emit('pong', { timestamp: new Date() });
  }

  getConnectedUsersCount(): number {
    return this.connectedUsers.size;
  }

  getConnectedDriversCount(): number {
    return Array.from(this.connectedUsers.values()).filter(
      (user) => user.userType === 'driver',
    ).length;
  }

  getConnectedPassengersCount(): number {
    return Array.from(this.connectedUsers.values()).filter(
      (user) => user.userType === 'passenger',
    ).length;
  }

  isUserConnected(userId: string): boolean {
    return Array.from(this.connectedUsers.values()).some(
      (user) => user.userId === userId,
    );
  }

  private extractUserId(client: Socket): string | null {
    const rawToken =
      (client.handshake.auth?.token as string) ||
      (client.handshake.headers?.authorization as string);

    if (!rawToken) {
      this.logger.warn(`No token provided for socket ${client.id}`);
      return null;
    }

    const token = rawToken.startsWith('Bearer ') ? rawToken.slice(7) : rawToken;

    try {
      const payload: any = this.jwtService.decode(token);
      if (!payload?.sub) {
        this.logger.warn('Invalid token payload (no sub)');
        return null;
      }
      return payload.sub as string;
    } catch (error: any) {
      this.logger.error(`Error extracting user ID: ${error.message}`);
      return null;
    }
  }

  private extractUserType(client: Socket): 'driver' | 'passenger' | null {
    const userType = (client.handshake.auth?.userType ||
      client.handshake.query.userType) as string;
    if (userType === 'driver' || userType === 'passenger') {
      return userType;
    }
    return null;
  }
}
