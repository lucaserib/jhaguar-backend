import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

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
}
