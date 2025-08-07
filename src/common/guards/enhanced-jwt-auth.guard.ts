import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EnhancedJwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(EnhancedJwtAuthGuard.name);

  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token de acesso não fornecido');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      
      // Buscar informações completas do usuário
      const user = await this.prismaService.user.findUnique({
        where: { id: payload.sub },
        include: {
          driver: true,
          passenger: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado');
      }

      // Adicionar informações completas ao request
      request.user = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        driverId: user.driver?.id || null,
        passengerId: user.passenger?.id || null,
        isDriver: !!user.driver,
        isPassenger: !!user.passenger,
        driverStatus: user.driver?.accountStatus || null,
        ...payload,
      };

      return true;
    } catch (error) {
      this.logger.error(`JWT validation failed: ${error.message}`);
      throw new UnauthorizedException('Token de acesso inválido');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}