import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PaymentsService } from './payments.service';

@Injectable()
export class FeeManagementService {
  private readonly logger = new Logger(FeeManagementService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentsService: PaymentsService,
  ) {}

  @Cron('0 3 * * *', {
    name: 'auto-charge-pending-fees',
    timeZone: 'America/Sao_Paulo',
  })
  async autoChargePendingFees(): Promise<void> {
    this.logger.log('🔄 Iniciando cobrança automática de taxas pendentes');

    try {
      // Buscar motoristas com taxas pendentes há mais de 7 dias
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 7);

      const driversWithPendingFees = await this.prisma.transaction.groupBy({
        by: ['userId'],
        where: {
          type: 'CANCELLATION_FEE',
          status: 'PENDING',
          amount: { lt: 0 },
          createdAt: { lte: cutoffDate },
        },
        _sum: {
          amount: true,
        },
        _count: {
          id: true,
        },
      });

      let totalProcessed = 0;
      let totalCharged = 0;
      let totalFailed = 0;

      for (const driverData of driversWithPendingFees) {
        const userId = driverData.userId;
        const totalOwed = Math.abs(driverData._sum.amount || 0);
        const feeCount = driverData._count.id;

        try {
          const result = await this.chargePendingFeesForDriver(
            userId,
            totalOwed,
            feeCount,
          );

          if (result.success) {
            totalCharged += totalOwed;
            totalProcessed++;
            this.logger.log(
              `✅ Taxas cobradas do motorista ${userId}: R$ ${totalOwed.toFixed(2)} (${feeCount} taxas)`,
            );
          } else {
            totalFailed++;
            this.logger.warn(
              `❌ Falha ao cobrar taxas do motorista ${userId}: ${result.message}`,
            );
          }
        } catch (error) {
          totalFailed++;
          this.logger.error(`💥 Erro ao processar motorista ${userId}:`, error);
        }
      }

      this.logger.log(
        `🏁 Cobrança automática finalizada: ${totalProcessed} sucessos, ${totalFailed} falhas, R$ ${totalCharged.toFixed(2)} cobrado`,
      );

      // Registrar estatísticas
      await this.recordAutoChargeStats(
        totalProcessed,
        totalFailed,
        totalCharged,
      );
    } catch (error) {
      this.logger.error('💥 Erro na cobrança automática de taxas:', error);
    }
  }

  /**
   * Cobra taxas pendentes de um motorista específico
   */
  private async chargePendingFeesForDriver(
    userId: string,
    totalAmount: number,
    feeCount: number,
  ): Promise<{ success: boolean; message: string; data?: any }> {
    return await this.prisma.$transaction(async (prisma) => {
      // Verificar saldo do motorista
      const wallet = await this.paymentsService.getOrCreateWallet(userId);

      if (wallet.balance < totalAmount) {
        // Se não tem saldo suficiente, criar uma transação de débito negativo
        // que será cobrada quando ele adicionar saldo
        await this.createNegativeBalanceEntry(userId, totalAmount, feeCount);

        return {
          success: false,
          message: `Saldo insuficiente - criado débito negativo de R$ ${totalAmount.toFixed(2)}`,
        };
      }

      // Buscar taxas pendentes
      const pendingFees = await prisma.transaction.findMany({
        where: {
          userId,
          type: 'CANCELLATION_FEE',
          status: 'PENDING',
          amount: { lt: 0 },
        },
      });

      // Debitar saldo
      await prisma.userWallet.update({
        where: { id: wallet.id },
        data: {
          balance: wallet.balance - totalAmount,
        },
      });

      // Marcar taxas como pagas
      await prisma.transaction.updateMany({
        where: {
          id: { in: pendingFees.map((fee) => fee.id) },
        },
        data: {
          status: 'COMPLETED',
          processedAt: new Date(),
          metadata: {
            autoCharged: true,
            chargedAt: new Date(),
            originalBalance: wallet.balance,
          },
        },
      });

      return {
        success: true,
        message: `Taxas cobradas com sucesso`,
        data: {
          chargedAmount: totalAmount,
          feeCount,
          newBalance: wallet.balance - totalAmount,
        },
      };
    });
  }

  /**
   * Cria entrada de saldo negativo quando motorista não tem saldo suficiente
   */
  private async createNegativeBalanceEntry(
    userId: string,
    amount: number,
    feeCount: number,
  ): Promise<void> {
    const wallet = await this.paymentsService.getOrCreateWallet(userId);

    await this.prisma.transaction.create({
      data: {
        userId,
        walletId: wallet.id,
        type: 'CANCELLATION_FEE',
        status: 'PENDING',
        amount: -amount,
        description: `Débito automático pendente - ${feeCount} taxa(s) não cobrada(s)`,
        metadata: {
          autoChargeFailed: true,
          originalFeeCount: feeCount,
          createdByAutoCharge: true,
          willBeChargedOnNextTopup: true,
        },
      },
    });

    this.logger.log(
      `📋 Criado débito pendente de R$ ${amount.toFixed(2)} para motorista ${userId}`,
    );
  }

  /**
   * Registra estatísticas da cobrança automática
   */
  private async recordAutoChargeStats(
    successCount: number,
    failureCount: number,
    totalCharged: number,
  ): Promise<void> {
    // Aqui você pode implementar uma tabela de estatísticas se necessário
    // Por enquanto, apenas log
    this.logger.log(
      `📊 Estatísticas salvas: ${successCount} sucessos, ${failureCount} falhas, R$ ${totalCharged.toFixed(2)} total`,
    );
  }

  /**
   * Obtém relatório de taxas pendentes por período
   */
  async getPendingFeesReport(
    startDate?: Date,
    endDate?: Date,
  ): Promise<{
    totalPendingAmount: number;
    totalDriversAffected: number;
    oldestPendingFee: Date | null;
    averageFeePerDriver: number;
    feesByAge: Array<{
      ageRange: string;
      count: number;
      totalAmount: number;
    }>;
  }> {
    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 dias atrás
    const end = endDate || new Date();

    const pendingFees = await this.prisma.transaction.findMany({
      where: {
        type: 'CANCELLATION_FEE',
        status: 'PENDING',
        amount: { lt: 0 },
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      select: {
        userId: true,
        amount: true,
        createdAt: true,
      },
    });

    const totalPendingAmount = pendingFees.reduce(
      (sum, fee) => sum + Math.abs(fee.amount),
      0,
    );

    const uniqueDrivers = new Set(pendingFees.map((fee) => fee.userId));
    const totalDriversAffected = uniqueDrivers.size;

    const oldestPendingFee =
      pendingFees.length > 0
        ? pendingFees.reduce((oldest, current) =>
            current.createdAt < oldest.createdAt ? current : oldest,
          ).createdAt
        : null;

    const averageFeePerDriver =
      totalDriversAffected > 0 ? totalPendingAmount / totalDriversAffected : 0;

    // Agrupar por idade
    const now = new Date();
    const feesByAge = [
      { ageRange: '0-7 dias', count: 0, totalAmount: 0 },
      { ageRange: '8-15 dias', count: 0, totalAmount: 0 },
      { ageRange: '16-30 dias', count: 0, totalAmount: 0 },
      { ageRange: '30+ dias', count: 0, totalAmount: 0 },
    ];

    pendingFees.forEach((fee) => {
      const ageInDays = Math.floor(
        (now.getTime() - fee.createdAt.getTime()) / (24 * 60 * 60 * 1000),
      );
      const amount = Math.abs(fee.amount);

      if (ageInDays <= 7) {
        feesByAge[0].count++;
        feesByAge[0].totalAmount += amount;
      } else if (ageInDays <= 15) {
        feesByAge[1].count++;
        feesByAge[1].totalAmount += amount;
      } else if (ageInDays <= 30) {
        feesByAge[2].count++;
        feesByAge[2].totalAmount += amount;
      } else {
        feesByAge[3].count++;
        feesByAge[3].totalAmount += amount;
      }
    });

    return {
      totalPendingAmount,
      totalDriversAffected,
      oldestPendingFee,
      averageFeePerDriver,
      feesByAge,
    };
  }

  /**
   * Força cobrança de taxas pendentes para um motorista específico
   */
  async forceChargePendingFees(userId: string): Promise<{
    success: boolean;
    message: string;
    data?: any;
  }> {
    try {
      // Buscar taxas pendentes
      const pendingFees = await this.prisma.transaction.findMany({
        where: {
          userId,
          type: 'CANCELLATION_FEE',
          status: 'PENDING',
          amount: { lt: 0 },
        },
      });

      if (pendingFees.length === 0) {
        return {
          success: true,
          message: 'Não há taxas pendentes para este motorista',
          data: { chargedAmount: 0, feeCount: 0 },
        };
      }

      const totalAmount = pendingFees.reduce(
        (sum, fee) => sum + Math.abs(fee.amount),
        0,
      );

      return await this.chargePendingFeesForDriver(
        userId,
        totalAmount,
        pendingFees.length,
      );
    } catch (error) {
      this.logger.error(
        `Erro ao forçar cobrança de taxas para ${userId}:`,
        error,
      );
      return {
        success: false,
        message: 'Erro interno ao processar cobrança',
      };
    }
  }

  /**
   * Obtém próxima data de cobrança automática
   */
  getNextAutoChargeDate(): Date {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(3, 0, 0, 0); // 3h da manhã
    return tomorrow;
  }

  /**
   * Verifica se um motorista tem taxas pendentes críticas (>30 dias)
   */
  async checkCriticalPendingFees(): Promise<
    Array<{
      userId: string;
      totalAmount: number;
      oldestFeeDate: Date;
      feeCount: number;
    }>
  > {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const criticalFees = await this.prisma.transaction.groupBy({
      by: ['userId'],
      where: {
        type: 'CANCELLATION_FEE',
        status: 'PENDING',
        amount: { lt: 0 },
        createdAt: { lte: thirtyDaysAgo },
      },
      _sum: {
        amount: true,
      },
      _count: {
        id: true,
      },
      _min: {
        createdAt: true,
      },
    });

    return criticalFees.map((fee) => ({
      userId: fee.userId,
      totalAmount: Math.abs(fee._sum.amount || 0),
      oldestFeeDate: fee._min.createdAt || new Date(),
      feeCount: fee._count.id,
    }));
  }
}

// src/payments/dto/fee-management.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDateString, IsUUID } from 'class-validator';

export class FeeReportQueryDto {
  @ApiProperty({
    description: 'Data de início do relatório',
    example: '2024-01-01',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({
    description: 'Data de fim do relatório',
    example: '2024-01-31',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class ForceChargeFeesDto {
  @ApiProperty({
    description: 'ID do motorista para forçar cobrança',
    example: 'uuid-do-motorista',
  })
  @IsUUID()
  userId: string;
}

export class FeeReportResponse {
  @ApiProperty({ description: 'Total de taxas pendentes em BRL' })
  totalPendingAmount: number;

  @ApiProperty({
    description: 'Número total de motoristas com taxas pendentes',
  })
  totalDriversAffected: number;

  @ApiProperty({
    description: 'Data da taxa pendente mais antiga',
    nullable: true,
  })
  oldestPendingFee: Date | null;

  @ApiProperty({ description: 'Média de taxa por motorista' })
  averageFeePerDriver: number;

  @ApiProperty({ description: 'Distribuição de taxas por idade' })
  feesByAge: Array<{
    ageRange: string;
    count: number;
    totalAmount: number;
  }>;

  @ApiProperty({ description: 'Próxima data de cobrança automática' })
  nextAutoChargeDate: Date;
}

export class CriticalFeesResponse {
  @ApiProperty({ description: 'Lista de motoristas com taxas críticas' })
  criticalDrivers: Array<{
    userId: string;
    totalAmount: number;
    oldestFeeDate: Date;
    feeCount: number;
  }>;

  @ApiProperty({ description: 'Total de motoristas em situação crítica' })
  totalCriticalDrivers: number;

  @ApiProperty({ description: 'Valor total em taxas críticas' })
  totalCriticalAmount: number;
}
