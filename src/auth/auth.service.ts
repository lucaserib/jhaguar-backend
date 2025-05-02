import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserByClerkId(clerkId: string) {
    const user = await this.prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }

    return user;
  }

  async createTokenFromUser(userId: string, email: string) {
    const payload = { email, sub: userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(clerkId: string) {
    const user = await this.validateUserByClerkId(clerkId);

    return this.createTokenFromUser(user.id, user.email);
  }
}
