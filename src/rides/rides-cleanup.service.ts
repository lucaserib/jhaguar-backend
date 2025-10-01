import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RidesService } from './rides.service';
import { RidesStateService } from './rides-state.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RidesCleanupService {
  private readonly logger = new Logger(RidesCleanupService.name);

  constructor(
    private readonly ridesService: RidesService,
    private readonly ridesStateService: RidesStateService,
    private readonly prisma: PrismaService,
  ) {}

  // Executar limpeza a cada 2 minutos - frequência balanceada
  @Cron('0 */2 * * * *')
  async handleOrphanedRidesCleanup() {
    try {
      this.logger.debug('🧹 Executando limpeza automática de rides órfãs...');

      // Use cleanup global sem userId específico
      const result = await this.cleanupAllOrphanedRides();

      if (result.cleaned > 0) {
        this.logger.log(
          `✅ Limpeza automática: ${result.cleaned} rides órfãs removidas - ${result.details.join(', ')}`
        );
      } else {
        this.logger.debug('✅ Limpeza automática: nenhuma ride órfã encontrada');
      }
    } catch (error) {
      this.logger.error(
        `❌ Erro na limpeza automática de rides órfãs: ${error.message}`,
        error.stack
      );
    }
  }

  // Executar limpeza mais agressiva uma vez por hora (rides muito antigas)
  @Cron(CronExpression.EVERY_HOUR)
  async handleDeepCleanup() {
    try {
      this.logger.log('🧽 Executando limpeza profunda de rides muito antigas...');

      // Esta chamada irá remover rides órfãs mais antigas (>10 minutos)
      const result = await this.ridesService.cleanupOrphanedRides();

      if (result && typeof result === 'object' && 'deletedCount' in result) {
        const deletedCount = (result as any).deletedCount;
        if (deletedCount > 0) {
          this.logger.warn(
            `🧽 Limpeza profunda: ${deletedCount} rides muito antigas removidas (podem indicar problema sistêmico)`
          );
        } else {
          this.logger.log('🧽 Limpeza profunda: sistema limpo, nenhuma ride antiga encontrada');
        }
      }
    } catch (error) {
      this.logger.error(
        `❌ Erro na limpeza profunda: ${error.message}`,
        error.stack
      );
    }
  }

  // Método para executar limpeza manual via API se necessário
  async manualCleanup(): Promise<any> {
    this.logger.log('🛠️ Executando limpeza manual solicitada via API...');
    return this.cleanupAllOrphanedRides();
  }

  /**
   * Limpeza global de todas as rides órfãs (sem filtro de usuário)
   */
  private async cleanupAllOrphanedRides(): Promise<{
    cleaned: number;
    details: string[];
  }> {
    try {
      const now = new Date();
      const requestedCutoff = new Date(now.getTime() - 15 * 60 * 1000); // 15 minutos - tempo razoável para drivers responderem
      const acceptedCutoff = new Date(now.getTime() - 5 * 60 * 1000); // 5 minutos - tempo para driver chegar ao passageiro
      const inProgressCutoff = new Date(now.getTime() - 10 * 60 * 1000); // 10 minutos

      const orphanedRides = await this.prisma.ride.findMany({
        where: {
          OR: [
            {
              status: 'REQUESTED',
              createdAt: { lt: requestedCutoff },
            },
            {
              status: 'ACCEPTED',
              createdAt: { lt: acceptedCutoff },
            },
            {
              status: 'IN_PROGRESS',
              createdAt: { lt: inProgressCutoff },
            },
          ],
        },
      });

      if (orphanedRides.length === 0) {
        return { cleaned: 0, details: ['Nenhuma ride órfã encontrada'] };
      }

      const details: string[] = [];
      let cleaned = 0;

      // Cleanup cada ride encontrada - VERSÃO CORRIGIDA
      for (const ride of orphanedRides) {
        try {
          // PRIMEIRA TENTATIVA: Transação limpa
          let cleanupSuccess = false;
          try {
            await this.prisma.$transaction(async (tx) => {
              // Delete relacionados primeiro (sem chat tables)
              await tx.payment.deleteMany({
                where: { rideId: ride.id },
              });

              await tx.rideStatusHistory.deleteMany({
                where: { rideId: ride.id },
              });

              // Delete ride
              await tx.ride.delete({
                where: { id: ride.id },
              });
            });
            cleanupSuccess = true;
          } catch (transactionError) {
            this.logger.warn(`Transação falhou para ride ${ride.id}, tentando deleção direta`);

            // FALLBACK: Deleção direta
            try {
              await this.prisma.payment.deleteMany({
                where: { rideId: ride.id },
              });

              await this.prisma.rideStatusHistory.deleteMany({
                where: { rideId: ride.id },
              });

              await this.prisma.ride.delete({
                where: { id: ride.id },
              });
              cleanupSuccess = true;
            } catch (directError) {
              throw new Error(`Ambas as abordagens falharam: ${directError.message}`);
            }
          }

          if (cleanupSuccess) {
            cleaned++;
            const ageMinutes = Math.floor(
              (now.getTime() - ride.createdAt.getTime()) / 60000,
            );
            details.push(
              `${ride.status}-${ride.id.slice(-8)} (${ageMinutes}min)`,
            );
          }
        } catch (error) {
          this.logger.error(`Erro limpando ride ${ride.id}:`, error);
        }
      }

      return { cleaned, details };
    } catch (error) {
      this.logger.error('Erro na limpeza global:', error);
      return { cleaned: 0, details: [`Erro: ${error.message}`] };
    }
  }
}