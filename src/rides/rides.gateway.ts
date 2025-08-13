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
  namespace: '/ride',
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
      `User connected: ${client.id}, userId: ${userId}, type: ${userType}`,
    );

    if (userId && userType) {
      this.connectedUsers.set(client.id, {
        socketId: client.id,
        userId,
        userType,
      });
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
      `Broadcasting ride ${ride.id} to ${targetDriverIds.length} drivers`,
    );

    const connectedDriverSockets = Array.from(this.connectedUsers.entries())
      .filter(
        ([_, userData]) =>
          userData.userType === 'driver' &&
          targetDriverIds.includes(userData.userId),
      )
      .map(([socketId]) => socketId);

    connectedDriverSockets.forEach((socketId) => {
      this.server.to(socketId).emit('ride:new-request', ride);
    });
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
