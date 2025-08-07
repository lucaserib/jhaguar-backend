import { Injectable, Logger } from '@nestjs/common';
import { NotifyPassengerDto } from './dto/notify-passenger.dto';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  async sendDriverApplicationNotification(driverData: any) {
    this.logger.log(
      `[EMAIL] Nova solicitação de motorista: ${driverData.user.firstName} ${driverData.user.lastName} (${driverData.user.email})`,
    );

    this.logger.log(`Assunto: Nova solicitação de motorista`);
    this.logger.log(`Para: admin@seu-app.com`);
    this.logger.log(
      `Conteúdo: Um novo motorista se cadastrou e está aguardando aprovação.`,
    );
    this.logger.log(`Detalhes do motorista:`);
    this.logger.log(
      `- Nome: ${driverData.user.firstName} ${driverData.user.lastName}`,
    );
    this.logger.log(`- Email: ${driverData.user.email}`);
    this.logger.log(`- Telefone: ${driverData.user.phone}`);
    this.logger.log(`- Número da licença: ${driverData.licenseNumber}`);
    this.logger.log(
      `- Data de expiração da licença: ${driverData.licenseExpiryDate}`,
    );

    return true;
  }

  async sendDriverStatusUpdateNotification(driverData: any, status: string) {
    this.logger.log(
      `[EMAIL] Status do motorista atualizado: ${driverData.user.firstName} ${driverData.user.lastName} -> ${status}`,
    );

    this.logger.log(`Assunto: Atualização de status de motorista`);
    this.logger.log(`Para: ${driverData.user.email}`);
    this.logger.log(
      `Conteúdo: Seu status como motorista foi atualizado para: ${status}`,
    );

    return true;
  }

  // ==================== NOVAS FUNCIONALIDADES OBRIGATÓRIAS ====================

  async notifyPassenger(driverId: string, notifyData: NotifyPassengerDto) {
    try {
      this.logger.log(`Driver ${driverId} notifying passenger for ride ${notifyData.rideId}: ${notifyData.type}`);

      // Aqui você buscaria os dados da corrida para obter o passengerId
      // Por simplicidade, vou simular

      const message = notifyData.message || this.getDefaultMessage(notifyData.type);

      // Enviar notificação via WebSocket
      switch (notifyData.type) {
        case 'DRIVER_ARRIVED':
          this.notificationsGateway.notifyDriverArrived('passenger-id', notifyData.rideId);
          break;
        case 'RIDE_STARTED':
          this.notificationsGateway.notifyRideStarted('passenger-id', notifyData.rideId);
          break;
        case 'RIDE_COMPLETED':
          this.notificationsGateway.notifyRideCompleted('passenger-id', notifyData.rideId, {});
          break;
        case 'DRIVER_DELAYED':
          this.notificationsGateway.sendToUser('passenger-id', 'ride:driver-delayed', {
            rideId: notifyData.rideId,
            message,
          });
          break;
        case 'CUSTOM':
          this.notificationsGateway.sendToUser('passenger-id', 'ride:custom-message', {
            rideId: notifyData.rideId,
            message,
          });
          break;
      }

      // Aqui você também poderia enviar push notification, SMS, etc.
      await this.sendPushNotification('passenger-id', notifyData.type, message);

      return {
        success: true,
        message: 'Notificação enviada com sucesso',
      };
    } catch (error) {
      this.logger.error(`Error notifying passenger: ${error.message}`);
      return {
        success: false,
        message: 'Erro ao enviar notificação',
      };
    }
  }

  // Métodos de notificação em tempo real
  async notifyRideAccepted(rideId: string, passengerId: string, driverInfo: any) {
    this.logger.log(`Notifying ride accepted: ${rideId} to passenger ${passengerId}`);
    this.notificationsGateway.notifyRideAccepted(passengerId, {
      rideId,
      driver: driverInfo,
    });
  }

  async notifyRideStatusChanged(rideId: string, status: string, participantIds: string[]) {
    this.logger.log(`Notifying ride status changed: ${rideId} -> ${status}`);
    
    participantIds.forEach(userId => {
      this.notificationsGateway.sendToUser(userId, 'ride:status-changed', {
        rideId,
        status,
      });
    });
  }

  async broadcastSystemMaintenance(message: string, estimatedDuration?: number) {
    this.logger.log(`Broadcasting system maintenance: ${message}`);
    this.notificationsGateway.broadcastSystemMaintenance(message, estimatedDuration);
  }

  async notifyEarningsUpdate(driverId: string, earningsData: any) {
    this.logger.log(`Notifying earnings update to driver ${driverId}`);
    this.notificationsGateway.sendToUser(driverId, 'earnings:updated', earningsData);
  }

  // Métodos auxiliares
  private getDefaultMessage(type: string): string {
    const messages = {
      'DRIVER_ARRIVED': 'Seu motorista chegou ao local de embarque',
      'RIDE_STARTED': 'Sua corrida foi iniciada',
      'RIDE_COMPLETED': 'Sua corrida foi finalizada',
      'DRIVER_DELAYED': 'Seu motorista está com um pequeno atraso',
      'CUSTOM': 'Mensagem do motorista',
    };

    return messages[type] || 'Atualização da sua corrida';
  }

  private async sendPushNotification(userId: string, type: string, message: string) {
    // Implementação de push notification (Firebase, Apple Push, etc.)
    this.logger.log(`[PUSH] Sending to ${userId}: ${type} - ${message}`);
    
    // Aqui você integraria com serviços como:
    // - Firebase Cloud Messaging
    // - Apple Push Notification Service
    // - OneSignal
    // etc.
    
    return true;
  }

  private async sendSMSNotification(phoneNumber: string, message: string) {
    // Implementação de SMS (Twilio, AWS SNS, etc.)
    this.logger.log(`[SMS] Sending to ${phoneNumber}: ${message}`);
    return true;
  }

  private async sendEmailNotification(email: string, subject: string, message: string) {
    // Implementação de email (SendGrid, AWS SES, etc.)
    this.logger.log(`[EMAIL] Sending to ${email}: ${subject} - ${message}`);
    return true;
  }
}
