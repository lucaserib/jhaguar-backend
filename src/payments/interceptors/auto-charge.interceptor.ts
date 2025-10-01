import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../../prisma/prisma.service';
import { PaymentsService } from '../payments.service';

@Injectable()
export class AutoChargeInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AutoChargeInterceptor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentsService: PaymentsService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const isWalletTopup = this.isWalletTopupRequest(request);

    if (!isWalletTopup) {
      return next.handle();
    }

    return next.handle().pipe(
      tap(async (response) => {
        // Só processar se a adição de saldo foi bem-sucedida
        if (response?.success && response?.data?.transactionId) {
          const userId = this.extractUserIdFromRequest(request);
          if (userId) {
            // Executar cobrança automática em background
            this.processAutoChargeForUser(userId).catch((error) => {
              this.logger.error(
                `Erro na cobrança automática para usuário ${userId}:`,
                error,
              );
            });
          }
        }
      }),
    );
  }

  private isWalletTopupRequest(request: any): boolean {
    return (
      request.url?.includes('/payments/wallet/add-balance') ||
      request.url?.includes('/stripe/confirm-payment') ||
      (request.url?.includes('/payments/wallet') && request.method === 'POST')
    );
  }

  private extractUserIdFromRequest(request: any): string | null {
    return request.user?.id || null;
  }

  private async processAutoChargeForUser(userId: string): Promise<void> {
    try {
      this.logger.log(
        `🔄 Iniciando cobrança automática para usuário ${userId}`,
      );

      // Verificar se há taxas pendentes
      const pendingFees = await this.prisma.transaction.findMany({
        where: {
          userId,
          type: 'CANCELLATION_FEE',
          status: 'PENDING',
          amount: { lt: 0 },
        },
        orderBy: { createdAt: 'asc' }, // Mais antigas primeiro
      });

      if (pendingFees.length === 0) {
        this.logger.log(`✅ Usuário ${userId} não tem taxas pendentes`);
        return;
      }

      const totalPendingAmount = pendingFees.reduce(
        (sum, fee) => sum + Math.abs(fee.amount),
        0,
      );

      // Verificar saldo atual
      const currentWallet =
        await this.paymentsService.getOrCreateWallet(userId);

      if (currentWallet.balance < totalPendingAmount) {
        this.logger.log(
          `💰 Saldo insuficiente para cobrança automática. Usuário ${userId}: R$ ${currentWallet.balance} < R$ ${totalPendingAmount}`,
        );
        return;
      }

      // Processar cobrança automática
      await this.chargeAllPendingFees(userId, pendingFees, totalPendingAmount);
    } catch (error) {
      this.logger.error(
        `💥 Erro na cobrança automática para usuário ${userId}:`,
        error,
      );
    }
  }

  private async chargeAllPendingFees(
    userId: string,
    pendingFees: any[],
    totalAmount: number,
  ): Promise<void> {
    return await this.prisma.$transaction(
      async (prisma) => {
        // Buscar carteira atualizada
        const wallet = await this.paymentsService.getOrCreateWallet(userId);

        // Verificar saldo mais uma vez (pode ter mudado)
        if (wallet.balance < totalAmount) {
          throw new Error('Saldo insuficiente após verificação final');
        }

        // Debitar saldo
        const updatedWallet = await prisma.userWallet.update({
          where: { id: wallet.id },
          data: {
            balance: wallet.balance - totalAmount,
          },
        });

        // Marcar todas as taxas como pagas
        await prisma.transaction.updateMany({
          where: {
            id: { in: pendingFees.map((fee) => fee.id) },
          },
          data: {
            status: 'COMPLETED',
            processedAt: new Date(),
            metadata: {
              autoCharged: true,
              autoChargedOnTopup: true,
              originalBalance: wallet.balance,
              newBalance: updatedWallet.balance,
              chargedAt: new Date(),
            },
          },
        });

        this.logger.log(
          `💳 Cobrança automática realizada: R$ ${totalAmount.toFixed(2)} (${pendingFees.length} taxas) - Usuário: ${userId}. Novo saldo: R$ ${updatedWallet.balance.toFixed(2)}`,
        );

        // Opcional: Criar notificação para o usuário
        await this.createAutoChargeNotification(
          userId,
          totalAmount,
          pendingFees.length,
        );
      },
      {
        timeout: 15000, // Reduced timeout for auto-charge
        isolationLevel: 'ReadCommitted',
      },
    );
  }

  private async createAutoChargeNotification(
    userId: string,
    amount: number,
    feeCount: number,
  ): Promise<void> {
    try {
      // Aqui você pode integrar com seu sistema de notificações
      // Por enquanto, apenas log
      this.logger.log(
        `📲 Notificação criada: ${feeCount} taxa(s) no valor de R$ ${amount.toFixed(2)} foram debitadas automaticamente do saldo do usuário ${userId}`,
      );

      // Exemplo de como poderia ser implementado:
      /*
        await this.notificationsService.create({
          userId,
          type: 'AUTO_CHARGE_COMPLETED',
          title: 'Taxas debitadas automaticamente',
          message: `${feeCount} taxa(s) no valor de R$ ${amount.toFixed(2)} foram debitadas do seu saldo`,
          data: {
            amount,
            feeCount,
            timestamp: new Date(),
          },
        });
        */
    } catch (error) {
      this.logger.error(
        'Erro ao criar notificação de cobrança automática:',
        error,
      );
      // Não rethrow - notificação é opcional
    }
  }
}
