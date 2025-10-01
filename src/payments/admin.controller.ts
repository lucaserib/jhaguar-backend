import { Controller, Post, Get, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('Admin - Payments')
@Controller('payments/admin')
export class PaymentsAdminController {
  private readonly logger = new Logger(PaymentsAdminController.name);

  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('create-missing-wallets')
  @ApiOperation({ summary: 'Criar carteiras para usuários que não possuem' })
  @ApiResponse({ status: 200, description: 'Carteiras criadas com sucesso' })
  async createMissingWallets(): Promise<{
    success: boolean;
    data: {
      usersChecked: number;
      walletsCreated: number;
      walletsAlreadyExisting: number;
    };
    message: string;
  }> {
    try {
      this.logger.log(
        '🚀 Iniciando criação de carteiras para usuários sem carteira',
      );

      // Buscar todos os usuários
      const users = await this.prisma.user.findMany({
        include: { UserWallet: true },
      });

      let walletsCreated = 0;
      let walletsAlreadyExisting = 0;

      for (const user of users) {
        if (!user.UserWallet) {
          try {
            await this.paymentsService.getOrCreateWallet(user.id);
            walletsCreated++;
            this.logger.log(
              `✅ Carteira criada para usuário ${user.id} (${user.email})`,
            );
          } catch (error) {
            this.logger.error(
              `❌ Erro ao criar carteira para usuário ${user.id}:`,
              error,
            );
          }
        } else {
          walletsAlreadyExisting++;
        }
      }

      this.logger.log(
        `📊 Resumo: ${users.length} usuários verificados, ${walletsCreated} carteiras criadas, ${walletsAlreadyExisting} já existiam`,
      );

      return {
        success: true,
        data: {
          usersChecked: users.length,
          walletsCreated,
          walletsAlreadyExisting,
        },
        message: 'Processo de criação de carteiras concluído',
      };
    } catch (error) {
      this.logger.error('❌ Erro ao criar carteiras:', error);
      return {
        success: false,
        data: {
          usersChecked: 0,
          walletsCreated: 0,
          walletsAlreadyExisting: 0,
        },
        message:
          error instanceof Error ? error.message : 'Erro ao criar carteiras',
      };
    }
  }

  @Get('wallet-statistics')
  @ApiOperation({ summary: 'Obter estatísticas das carteiras' })
  @ApiResponse({ status: 200, description: 'Estatísticas das carteiras' })
  async getWalletStatistics(): Promise<{
    success: boolean;
    data: {
      totalUsers: number;
      usersWithWallets: number;
      usersWithoutWallets: number;
      totalDrivers: number;
      driversWithWallets: number;
      driversWithoutWallets: number;
    };
    message: string;
  }> {
    try {
      const [totalUsers, usersWithWallets, totalDrivers, driversWithWallets] =
        await Promise.all([
          this.prisma.user.count(),
          this.prisma.user.count({ where: { UserWallet: { isNot: null } } }),
          this.prisma.driver.count(),
          this.prisma.driver.count({
            where: { User: { UserWallet: { isNot: null } } },
          }),
        ]);

      return {
        success: true,
        data: {
          totalUsers,
          usersWithWallets,
          usersWithoutWallets: totalUsers - usersWithWallets,
          totalDrivers,
          driversWithWallets,
          driversWithoutWallets: totalDrivers - driversWithWallets,
        },
        message: 'Estatísticas obtidas com sucesso',
      };
    } catch (error) {
      this.logger.error('❌ Erro ao obter estatísticas:', error);
      return {
        success: false,
        data: {
          totalUsers: 0,
          usersWithWallets: 0,
          usersWithoutWallets: 0,
          totalDrivers: 0,
          driversWithWallets: 0,
          driversWithoutWallets: 0,
        },
        message:
          error instanceof Error ? error.message : 'Erro ao obter estatísticas',
      };
    }
  }
}
