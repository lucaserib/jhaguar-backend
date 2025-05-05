import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';

@Injectable()
export class PassengersService {
  constructor(private prisma: PrismaService) {}

  async create(createPassengerDto: CreatePassengerDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: createPassengerDto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `Usuário com ID ${createPassengerDto.userId} não encontrado`,
      );
    }

    return this.prisma.passenger.create({
      data: {
        userId: createPassengerDto.userId,
        prefersFemaleDriver: createPassengerDto.prefersFemaleDriver || false,
        specialNeeds: createPassengerDto.specialNeeds || false,
        specialNeedsDesc: createPassengerDto.specialNeedsDesc,
      },
    });
  }

  async findAll() {
    return this.prisma.passenger.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            profileImage: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const passenger = await this.prisma.passenger.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            profileImage: true,
          },
        },
      },
    });

    if (!passenger) {
      throw new NotFoundException(`Passageiro com ID ${id} não encontrado`);
    }

    return passenger;
  }

  async findByUserId(userId: string) {
    const passenger = await this.prisma.passenger.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            profileImage: true,
          },
        },
      },
    });

    if (!passenger) {
      return null;
    }

    return passenger;
  }
}
