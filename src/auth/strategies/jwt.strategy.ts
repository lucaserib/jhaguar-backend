import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'dev-secret-key',
    });
  }

  async validate(payload: { sub: string; email: string }) {
    // Buscar o usuário no banco de dados
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    // Remover a propriedade de clerkId por segurança
    if (user) {
      delete user['clerkId'];
    }

    return user;
  }
}
