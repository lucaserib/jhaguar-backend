import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Status } from '@prisma/client';

@Injectable()
export class AuthService {
  private userInfoCache = new Map<string, { data: any; expiry: number }>();
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('E-mail já está em uso.');
    }

    const existingPhone = await this.prisma.user.findUnique({
      where: { phone: registerDto.phone },
    });

    if (existingPhone) {
      throw new ConflictException('Telefone já está em uso.');
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

  async updateDriverStatus(driverId: string, status: Status) {
    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!driver) {
      throw new NotFoundException(
        `Motorista com ID ${driverId} não encontrado`,
      );
    }

    await this.prisma.driver.update({
      where: { id: driverId },
      data: { accountStatus: status },
    });

    return {
      success: true,
      message: 'Status do motorista atualizado com sucesso',
    };
  }

  async createTokenFromUser(userId: string, email: string) {
    const driver = await this.prisma.driver.findUnique({
      where: { userId },
      select: {
        id: true,
        accountStatus: true,
        licenseNumber: true,
        licenseExpiryDate: true,
        bankAccount: true,
      },
    });

    const passenger = await this.prisma.passenger.findUnique({
      where: { userId },
      select: { id: true },
    });

    const userDetails = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        profileImage: true,
      },
    });

    if (!userDetails) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
    }

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
        email: userDetails.email,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        phone: userDetails.phone,
        profileImage: userDetails.profileImage,
        isDriver: !!driver,
        isPassenger: !!passenger,
        driverStatus: driver?.accountStatus || null,
        driverId: driver?.id || null,
        passengerId: passenger?.id || null,
        driverDetails: driver
          ? {
              licenseNumber: driver.licenseNumber,
              licenseExpiryDate: driver.licenseExpiryDate,
              bankAccount: driver.bankAccount,
            }
          : null,
      },
    };
  }

  async getUserInfo(userId: string) {
    const cachedInfo = this.userInfoCache.get(userId);
    const now = Date.now();

    if (cachedInfo && cachedInfo.expiry > now) {
      return cachedInfo.data;
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        profileImage: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const driver = await this.prisma.driver.findUnique({
      where: { userId },
      select: {
        id: true,
        accountStatus: true,
        licenseNumber: true,
        licenseExpiryDate: true,
        bankAccount: true,
      },
    });

    const passenger = await this.prisma.passenger.findUnique({
      where: { userId },
      select: { id: true },
    });

    const result = {
      ...user,
      isDriver: !!driver,
      isPassenger: !!passenger,
      driverStatus: driver?.accountStatus || null,
      driverId: driver?.id || null,
      passengerId: passenger?.id || null,
      driverDetails: driver
        ? {
            licenseNumber: driver.licenseNumber,
            licenseExpiryDate: driver.licenseExpiryDate,
            bankAccount: driver.bankAccount,
          }
        : null,
    };

    this.userInfoCache.set(userId, {
      data: result,
      expiry: now + 5000,
    });

    return result;
  }
}
