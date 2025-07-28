import {
  Injectable,
  NestMiddleware,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../../prisma/prisma.service';

interface RequestWithUser extends Request {
  user?: {
    id: string;
    driverId?: string;
    isDriver?: boolean;
  };
}

@Injectable()
export class BalanceValidationMiddleware implements NestMiddleware {
  private readonly logger = new Logger(BalanceValidationMiddleware.name);

  constructor(private readonly prisma: PrismaService) {}

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    // Aplicar apenas para endpoints de pagamento de corrida
    if (!this.shouldValidateBalance(req)) {
      return next();
    }

    try {
      const userId = req.user?.id;
      if (!userId) {
        return next();
      }

      // Verificar se há taxas pendentes críticas que impedem pagamentos
      const criticalFees = await this.checkCriticalPendingFees(userId);

      if (criticalFees.hasCriticalFees) {
        const errorMessage = `Você possui taxas pendentes há mais de ${criticalFees.daysPending} dias totalizando R$ ${criticalFees.totalAmount.toFixed(2)}. Quite suas taxas antes de fazer novos pagamentos.`;

        this.logger.warn(
          `🚫 Pagamento bloqueado para usuário ${userId}: ${errorMessage}`,
        );

        throw new BadRequestException({
          message: errorMessage,
          code: 'CRITICAL_PENDING_FEES',
          details: {
            totalAmount: criticalFees.totalAmount,
            daysPending: criticalFees.daysPending,
            feeCount: criticalFees.feeCount,
            canPayNow: criticalFees.canPayNow,
            walletBalance: criticalFees.walletBalance,
          },
        });
      }

      next();
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      this.logger.error('Erro no middleware de validação de saldo:', error);
      next(); // Continue mesmo com erro para não bloquear funcionalidade principal
    }
  }

  private shouldValidateBalance(req: RequestWithUser): boolean {
    const criticalEndpoints = [
      '/payments/ride/pay',
      '/payments/wallet/transfer',
    ];

    return criticalEndpoints.some((endpoint) => req.url?.includes(endpoint));
  }

  private async checkCriticalPendingFees(userId: string): Promise<{
    hasCriticalFees: boolean;
    totalAmount: number;
    daysPending: number;
    feeCount: number;
    canPayNow: boolean;
    walletBalance: number;
  }> {
    const CRITICAL_DAYS_THRESHOLD = 45; // Bloquear após 45 dias

    // Buscar taxas pendentes antigas
    const criticalDate = new Date();
    criticalDate.setDate(criticalDate.getDate() - CRITICAL_DAYS_THRESHOLD);

    const [criticalFees, wallet] = await Promise.all([
      this.prisma.transaction.findMany({
        where: {
          userId,
          type: 'CANCELLATION_FEE',
          status: 'PENDING',
          amount: { lt: 0 },
          createdAt: { lte: criticalDate },
        },
        orderBy: { createdAt: 'asc' },
      }),

      this.prisma.userWallet.findUnique({
        where: { userId },
      }),
    ]);

    if (criticalFees.length === 0) {
      return {
        hasCriticalFees: false,
        totalAmount: 0,
        daysPending: 0,
        feeCount: 0,
        canPayNow: false,
        walletBalance: wallet?.balance || 0,
      };
    }

    const totalAmount = criticalFees.reduce(
      (sum, fee) => sum + Math.abs(fee.amount),
      0,
    );

    const oldestFee = criticalFees[0];
    const daysPending = Math.floor(
      (new Date().getTime() - oldestFee.createdAt.getTime()) /
        (24 * 60 * 60 * 1000),
    );

    const walletBalance = wallet?.balance || 0;
    const canPayNow = walletBalance >= totalAmount;

    return {
      hasCriticalFees: true,
      totalAmount,
      daysPending,
      feeCount: criticalFees.length,
      canPayNow,
      walletBalance,
    };
  }
}
