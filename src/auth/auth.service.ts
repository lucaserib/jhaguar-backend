// src/auth/auth.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Status } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new UnauthorizedException('E-mail já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        phone: registerDto.phone,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        password: hashedPassword,
        gender: registerDto.gender,
        dateOfBirth: registerDto.dateOfBirth,
        profileImage: registerDto.profileImage,
        address: registerDto.address,
      },
    });

    if (registerDto.userType === 'PASSENGER') {
      await this.prisma.passenger.create({
        data: {
          userId: user.id,
        },
      });
    } else if (registerDto.userType === 'DRIVER') {
      await this.prisma.driver.create({
        data: {
          userId: user.id,
          licenseNumber: 'TEMP',
          licenseExpiryDate: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1),
          ),
          accountStatus: Status.PENDING,
          backgroundCheckStatus: Status.PENDING,
        },
      });
    }

    return this.createTokenFromUser(user.id, user.email);
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const passwordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    return this.createTokenFromUser(user.id, user.email);
  }

  async createTokenFromUser(userId: string, email: string) {
    const driver = await this.prisma.driver.findUnique({
      where: { userId },
      select: { id: true, accountStatus: true },
    });

    const passenger = await this.prisma.passenger.findUnique({
      where: { userId },
      select: { id: true },
    });

    const payload = {
      email,
      sub: userId,
      isDriver: !!driver,
      isPassenger: !!passenger,
      driverId: driver?.id,
      passengerId: passenger?.id,
      driverStatus: driver?.accountStatus,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: userId,
        email,
        isDriver: !!driver,
        isPassenger: !!passenger,
        driverStatus: driver?.accountStatus || null,
        driverId: driver?.id || null,
        passengerId: passenger?.id || null,
      },
    };
  }

  async getUserInfo(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        profileImage: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const driver = await this.prisma.driver.findUnique({
      where: { userId },
      select: { id: true, accountStatus: true },
    });

    const passenger = await this.prisma.passenger.findUnique({
      where: { userId },
      select: { id: true },
    });

    return {
      ...user,
      isDriver: !!driver,
      isPassenger: !!passenger,
      driverStatus: driver?.accountStatus || null,
      driverId: driver?.id || null,
      passengerId: passenger?.id || null,
    };
  }
}
