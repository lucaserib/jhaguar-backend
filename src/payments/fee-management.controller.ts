import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Param,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import {
  CriticalFeesResponse,
  FeeManagementService,
  FeeReportQueryDto,
  FeeReportResponse,
  ForceChargeFeesDto,
} from './fee-management.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorator/user.decorator';

@ApiTags('Gerenciamento de Taxas')
@Controller('payments/fees')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FeeManagementController {
  private readonly logger = new Logger(FeeManagementController.name);

  constructor(private readonly feeManagementService: FeeManagementService) {}

  @Get('report')
  @ApiOperation({
    summary: 'Relatório de taxas pendentes',
    description:
      'Gera relatório detalhado das taxas pendentes por período (Admin)',
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
    description: 'Data de início (ISO string)',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
    description: 'Data de fim (ISO string)',
  })
  @ApiResponse({
    status: 200,
    description: 'Relatório gerado com sucesso',
    type: FeeReportResponse,
  })
  async getFeeReport(@Query() query: FeeReportQueryDto) {
    try {
      const startDate = query.startDate ? new Date(query.startDate) : undefined;
      const endDate = query.endDate ? new Date(query.endDate) : undefined;

      const report = await this.feeManagementService.getPendingFeesReport(
        startDate,
        endDate,
      );

      const nextAutoChargeDate =
        this.feeManagementService.getNextAutoChargeDate();

      return {
        success: true,
        data: {
          ...report,
          nextAutoChargeDate,
          reportPeriod: {
            startDate:
              startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            endDate: endDate || new Date(),
          },
        } as FeeReportResponse,
        message: 'Relatório de taxas gerado com sucesso',
      };
    } catch (error) {
      this.logger.error('Erro ao gerar relatório de taxas:', error);
      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : 'Erro ao gerar relatório',
      };
    }
  }

  @Get('critical')
  @ApiOperation({
    summary: 'Taxas críticas',
    description:
      'Lista motoristas com taxas pendentes há mais de 30 dias (Admin)',
  })
  @ApiResponse({
    status: 200,
    description: 'Taxas críticas listadas com sucesso',
    type: CriticalFeesResponse,
  })
  async getCriticalPendingFees() {
    try {
      const criticalDrivers =
        await this.feeManagementService.checkCriticalPendingFees();

      const totalCriticalDrivers = criticalDrivers.length;
      const totalCriticalAmount = criticalDrivers.reduce(
        (sum, driver) => sum + driver.totalAmount,
        0,
      );

      return {
        success: true,
        data: {
          criticalDrivers,
          totalCriticalDrivers,
          totalCriticalAmount,
          warningThreshold: 30, // dias
          recommendedActions: [
            'Notificar motoristas via push/email',
            'Suspender novos pedidos até pagamento',
            'Oferecer parcelamento das taxas',
            'Verificar necessidade de ajuste na taxa',
          ],
        } as CriticalFeesResponse,
        message: `${totalCriticalDrivers} motorista(s) com taxas críticas encontrado(s)`,
      };
    } catch (error) {
      this.logger.error('Erro ao buscar taxas críticas:', error);
      return {
        success: false,
        data: null,
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao buscar taxas críticas',
      };
    }
  }

  @Post('force-charge')
  @ApiOperation({
    summary: 'Forçar cobrança de taxas',
    description:
      'Força a cobrança de taxas pendentes para um motorista específico (Admin)',
  })
  @ApiResponse({
    status: 200,
    description: 'Cobrança processada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Saldo insuficiente ou erro no processamento',
  })
  async forceChargeFees(@Body() forceChargeDto: ForceChargeFeesDto) {
    try {
      const result = await this.feeManagementService.forceChargePendingFees(
        forceChargeDto.userId,
      );

      if (result.success) {
        this.logger.log(
          `💳 Cobrança forçada executada para motorista ${forceChargeDto.userId}: ${result.message}`,
        );
      } else {
        this.logger.warn(
          `⚠️ Falha na cobrança forçada para motorista ${forceChargeDto.userId}: ${result.message}`,
        );
      }

      return result;
    } catch (error) {
      this.logger.error('Erro ao forçar cobrança:', error);
      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : 'Erro ao forçar cobrança',
      };
    }
  }

  @Post('run-auto-charge')
  @ApiOperation({
    summary: 'Executar cobrança automática manualmente',
    description:
      'Executa o processo de cobrança automática de taxas manualmente (Admin/Debug)',
  })
  @ApiResponse({
    status: 200,
    description: 'Cobrança automática executada com sucesso',
  })
  async runAutoCharge() {
    try {
      this.logger.log('🚀 Executando cobrança automática manual');

      // Executar cobrança em background para não travar a resposta
      this.feeManagementService.autoChargePendingFees().catch((error) => {
        this.logger.error('Erro na cobrança automática manual:', error);
      });

      return {
        success: true,
        data: {
          executedAt: new Date(),
          mode: 'MANUAL_TRIGGER',
          nextScheduledRun: this.feeManagementService.getNextAutoChargeDate(),
        },
        message:
          'Cobrança automática iniciada em background - verificar logs para resultados',
      };
    } catch (error) {
      this.logger.error('Erro ao executar cobrança automática:', error);
      return {
        success: false,
        data: null,
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao executar cobrança automática',
      };
    }
  }

  @Get('driver/:driverId/summary')
  @ApiOperation({
    summary: 'Resumo de taxas por motorista',
    description: 'Obtém resumo detalhado das taxas de um motorista específico',
  })
  @ApiParam({
    name: 'driverId',
    description: 'ID do motorista',
    example: 'uuid-do-motorista',
  })
  @ApiResponse({
    status: 200,
    description: 'Resumo obtido com sucesso',
  })
  async getDriverFeeSummary(
    @Param('driverId') driverId: string,
    @User() user: any,
  ) {
    try {
      // Verificar se é o próprio motorista ou admin
      if (user.driverId !== driverId && !this.isAdmin(user)) {
        throw new BadRequestException(
          'Você só pode consultar suas próprias taxas',
        );
      }

      // Buscar informações do motorista via user
      const driver = await this.feeManagementService[
        'prisma'
      ].driver.findUnique({
        where: { id: driverId },
        include: { User: true },
      });

      if (!driver) {
        throw new BadRequestException('Motorista não encontrado');
      }

      // Buscar todas as transações de taxa deste motorista
      const [pendingFees, completedFees, walletBalance] = await Promise.all([
        this.feeManagementService['prisma'].transaction.findMany({
          where: {
            userId: driver.userId,
            type: 'CANCELLATION_FEE',
            status: 'PENDING',
            amount: { lt: 0 },
          },
          include: { Ride: {
              select: {
                id: true,
                originAddress: true,
                destinationAddress: true,
                createdAt: true,
                finalPrice: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        }),

        this.feeManagementService['prisma'].transaction.findMany({
          where: {
            userId: driver.userId,
            type: 'CANCELLATION_FEE',
            status: 'COMPLETED',
            amount: { lt: 0 },
          },
          take: 10, // Últimas 10 taxas pagas
          orderBy: { processedAt: 'desc' },
        }),

        this.feeManagementService['paymentsService'].getWalletBalance(
          driver.userId,
        ),
      ]);

      const totalPending = pendingFees.reduce(
        (sum, fee) => sum + Math.abs(fee.amount),
        0,
      );

      const totalPaidThisMonth = completedFees
        .filter((fee) => {
          const processedDate = fee.processedAt || fee.createdAt;
          const thisMonth = new Date();
          thisMonth.setDate(1);
          return processedDate >= thisMonth;
        })
        .reduce((sum, fee) => sum + Math.abs(fee.amount), 0);

      const oldestPendingFee =
        pendingFees.length > 0
          ? pendingFees[pendingFees.length - 1].createdAt
          : null;

      const daysSinceOldest = oldestPendingFee
        ? Math.floor(
            (new Date().getTime() - oldestPendingFee.getTime()) /
              (24 * 60 * 60 * 1000),
          )
        : 0;

      return {
        success: true,
        data: {
          driverId,
          driverName: `${driver.User.firstName} ${driver.User.lastName}`,
          currentBalance: walletBalance.balance,

          pending: {
            count: pendingFees.length,
            totalAmount: totalPending,
            canPayAll: walletBalance.balance >= totalPending,
            oldestFeeDate: oldestPendingFee,
            daysSinceOldest,
            isCritical: daysSinceOldest > 30,
            fees: pendingFees.map((fee) => ({
              id: fee.id,
              amount: Math.abs(fee.amount),
              description: fee.description,
              createdAt: fee.createdAt,
              rideDetails: fee.Ride
                ? {
                    rideId: fee.Ride.id,
                    origin: fee.Ride.originAddress,
                    destination: fee.Ride.destinationAddress,
                    date: fee.Ride.createdAt,
                    amount: fee.Ride.finalPrice,
                  }
                : null,
            })),
          },

          thisMonth: {
            paidAmount: totalPaidThisMonth,
            paidCount: completedFees.filter((fee) => {
              const processedDate = fee.processedAt || fee.createdAt;
              const thisMonth = new Date();
              thisMonth.setDate(1);
              return processedDate >= thisMonth;
            }).length,
          },

          recentPayments: completedFees.slice(0, 5).map((fee) => ({
            id: fee.id,
            amount: Math.abs(fee.amount),
            description: fee.description,
            paidAt: fee.processedAt,
            wasAutoCharged: (fee.metadata as any)?.autoCharged || false,
          })),

          recommendations: this.getDriverRecommendations(
            totalPending,
            walletBalance.balance,
            daysSinceOldest,
          ),
        },
        message: 'Resumo de taxas obtido com sucesso',
      };
    } catch (error) {
      this.logger.error('Erro ao obter resumo de taxas:', error);
      return {
        success: false,
        data: null,
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao obter resumo de taxas',
      };
    }
  }

  @Get('settings')
  @ApiOperation({
    summary: 'Configurações do sistema de taxas',
    description: 'Obtém as configurações atuais do sistema de taxas',
  })
  @ApiResponse({
    status: 200,
    description: 'Configurações obtidas com sucesso',
  })
  async getFeeSettings() {
    return {
      success: true,
      data: {
        platformFeePercentage: 0.1, // 10%
        autoChargeSchedule: '0 3 * * *', // Diário às 3h
        pendingFeeThreshold: 7, // dias
        criticalFeeThreshold: 30, // dias
        maxNegativeBalance: -1000, // R$ -1000
        feeCalculationMethod: 'PERCENTAGE_BASED',

        notifications: {
          pendingFeeReminder: {
            enabled: true,
            intervalDays: 7,
          },
          criticalFeeAlert: {
            enabled: true,
            intervalDays: 3,
          },
          autoChargeNotification: {
            enabled: true,
            beforeHours: 24,
          },
        },

        autoChargeRules: {
          enabled: true,
          minimumAge: 7, // dias
          requiresMinimumBalance: false,
          createNegativeBalanceOnFail: true,
          maxRetries: 3,
        },

        businessRules: {
          suspendDriverAfterDays: 45,
          blockNewRidesAfterDays: 30,
          offerPaymentPlanAfterDays: 15,
        },
      },
      message: 'Configurações obtidas com sucesso',
    };
  }

  @Get('statistics')
  @ApiOperation({
    summary: 'Estatísticas gerais do sistema de taxas',
    description: 'Obtém estatísticas consolidadas do sistema de taxas',
  })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas obtidas com sucesso',
  })
  async getFeeStatistics() {
    try {
      const now = new Date();
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const [
        totalPendingFees,
        thisMonthCollected,
        lastMonthCollected,
        totalDriversWithPending,
        criticalDrivers,
      ] = await Promise.all([
        // Total de taxas pendentes
        this.feeManagementService['prisma'].transaction.aggregate({
          where: {
            type: 'CANCELLATION_FEE',
            status: 'PENDING',
            amount: { lt: 0 },
          },
          _sum: { amount: true },
          _count: { id: true },
        }),

        // Taxas coletadas este mês
        this.feeManagementService['prisma'].transaction.aggregate({
          where: {
            type: 'CANCELLATION_FEE',
            status: 'COMPLETED',
            amount: { lt: 0 },
            processedAt: { gte: thisMonth },
          },
          _sum: { amount: true },
          _count: { id: true },
        }),

        // Taxas coletadas mês passado
        this.feeManagementService['prisma'].transaction.aggregate({
          where: {
            type: 'CANCELLATION_FEE',
            status: 'COMPLETED',
            amount: { lt: 0 },
            processedAt: {
              gte: lastMonth,
              lt: thisMonth,
            },
          },
          _sum: { amount: true },
          _count: { id: true },
        }),

        // Motoristas com taxas pendentes
        this.feeManagementService['prisma'].transaction.groupBy({
          by: ['userId'],
          where: {
            type: 'CANCELLATION_FEE',
            status: 'PENDING',
            amount: { lt: 0 },
          },
        }),

        // Motoristas críticos
        this.feeManagementService.checkCriticalPendingFees(),
      ]);

      const totalPendingAmount = Math.abs(totalPendingFees._sum.amount || 0);
      const thisMonthAmount = Math.abs(thisMonthCollected._sum.amount || 0);
      const lastMonthAmount = Math.abs(lastMonthCollected._sum.amount || 0);

      const monthOverMonthGrowth =
        lastMonthAmount > 0
          ? ((thisMonthAmount - lastMonthAmount) / lastMonthAmount) * 100
          : 0;

      return {
        success: true,
        data: {
          overview: {
            totalPendingAmount,
            totalPendingCount: totalPendingFees._count.id,
            totalDriversWithPending: totalDriversWithPending.length,
            criticalDriversCount: criticalDrivers.length,
          },

          collection: {
            thisMonth: {
              amount: thisMonthAmount,
              count: thisMonthCollected._count.id,
            },
            lastMonth: {
              amount: lastMonthAmount,
              count: lastMonthCollected._count.id,
            },
            monthOverMonthGrowth: Math.round(monthOverMonthGrowth * 100) / 100,
            trend:
              monthOverMonthGrowth > 0
                ? 'UP'
                : monthOverMonthGrowth < 0
                  ? 'DOWN'
                  : 'STABLE',
          },

          healthMetrics: {
            collectionRate:
              totalPendingFees._count.id > 0
                ? Math.round(
                    (thisMonthCollected._count.id /
                      (thisMonthCollected._count.id +
                        totalPendingFees._count.id)) *
                      100,
                  )
                : 100,
            averagePendingPerDriver:
              totalDriversWithPending.length > 0
                ? Math.round(
                    (totalPendingAmount / totalDriversWithPending.length) * 100,
                  ) / 100
                : 0,
            criticalRate:
              totalDriversWithPending.length > 0
                ? Math.round(
                    (criticalDrivers.length / totalDriversWithPending.length) *
                      100,
                  )
                : 0,
          },

          nextActions: {
            autoChargeDate: this.feeManagementService.getNextAutoChargeDate(),
            recommendedActions: this.getSystemRecommendations(
              totalPendingAmount,
              criticalDrivers.length,
              monthOverMonthGrowth,
            ),
          },
        },
        message: 'Estatísticas obtidas com sucesso',
      };
    } catch (error) {
      this.logger.error('Erro ao obter estatísticas:', error);
      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : 'Erro ao obter estatísticas',
      };
    }
  }

  // ==================== MÉTODOS AUXILIARES ====================

  private isAdmin(user: any): boolean {
    // TODO: Implementar lógica real de verificação de admin
    return user.role === 'ADMIN' || user.isAdmin === true;
  }

  private getDriverRecommendations(
    pendingAmount: number,
    currentBalance: number,
    daysSinceOldest: number,
  ): string[] {
    const recommendations: string[] = [];

    if (pendingAmount === 0) {
      recommendations.push('✅ Parabéns! Não há taxas pendentes');
      return recommendations;
    }

    if (currentBalance >= pendingAmount) {
      recommendations.push('💳 Você pode pagar todas as taxas pendentes agora');
    } else {
      const needed = pendingAmount - currentBalance;
      recommendations.push(
        `💰 Adicione R$ ${needed.toFixed(2)} ao saldo para quitar todas as taxas`,
      );
    }

    if (daysSinceOldest > 30) {
      recommendations.push(
        '⚠️ Suas taxas estão em atraso há mais de 30 dias - priorize o pagamento',
      );
    } else if (daysSinceOldest > 15) {
      recommendations.push('⚡ Pague suas taxas em breve para evitar acúmulo');
    }

    if (pendingAmount > 100) {
      recommendations.push(
        '📋 Considere configurar adição automática de saldo para evitar acúmulo',
      );
    }

    return recommendations;
  }

  private getSystemRecommendations(
    totalPending: number,
    criticalCount: number,
    monthGrowth: number,
  ): string[] {
    const recommendations: string[] = [];

    if (criticalCount > 10) {
      recommendations.push(
        'Implementar campanha de recuperação para motoristas críticos',
      );
    }

    if (totalPending > 50000) {
      recommendations.push(
        'Considerar ajustar estratégia de cobrança - muito valor pendente',
      );
    }

    if (monthGrowth > 50) {
      recommendations.push(
        'Crescimento alto nas taxas pendentes - investigar causas',
      );
    }

    if (monthGrowth < -20) {
      recommendations.push('Melhoria na cobrança - manter estratégias atuais');
    }

    return recommendations;
  }
}
