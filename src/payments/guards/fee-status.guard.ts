import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FeeStatusGuard implements CanActivate {
  private readonly logger = new Logger(FeeStatusGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Verificar se o guard deve ser aplicado para esta rota
    const requiresFeeCheck = this.reflector.get<boolean>(
      'requiresFeeCheck',
      context.getHandler(),
    );

    if (!requiresFeeCheck) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;

    if (!userId) {
      return true; // Deixar outros guards lidar com autenticação
    }

    try {
      // Verificar se é motorista e se tem taxas críticas
      const driver = await this.prisma.driver.findUnique({
        where: { userId },
      });

      if (!driver) {
        return true; // Não é motorista, não precisa verificar taxas
      }

      // Verificar taxas pendentes críticas (>60 dias = suspensão)
      const suspensionDate = new Date();
      suspensionDate.setDate(suspensionDate.getDate() - 60);

      const criticalFees = await this.prisma.transaction.findFirst({
        where: {
          userId,
          type: 'CANCELLATION_FEE',
          status: 'PENDING',
          amount: { lt: 0 },
          createdAt: { lte: suspensionDate },
        },
      });

      if (criticalFees) {
        this.logger.warn(
          `🚫 Acesso negado para motorista ${driver.id}: taxas pendentes há mais de 60 dias`,
        );

        throw new ForbiddenException({
          message:
            'Acesso suspenso devido a taxas pendentes há mais de 60 dias. Entre em contato com o suporte.',
          code: 'DRIVER_SUSPENDED_PENDING_FEES',
          supportContact: 'suporte@rideapp.com',
        });
      }

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }

      this.logger.error('Erro no FeeStatusGuard:', error);
      return true; // Em caso de erro, permitir acesso para não quebrar funcionalidade
    }
  }
}
