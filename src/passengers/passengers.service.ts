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

    // Verificar se passageiro já existe
    const existingPassenger = await this.findByUserId(
      createPassengerDto.userId,
    );
    if (existingPassenger) {
      // Atualizar dados se necessário e retornar o existente
      return this.prisma.passenger.update({
        where: { userId: createPassengerDto.userId },
        data: {
          prefersFemaleDriver:
            createPassengerDto.prefersFemaleDriver ||
            existingPassenger.prefersFemaleDriver,
          specialNeeds:
            createPassengerDto.specialNeeds || existingPassenger.specialNeeds,
          specialNeedsDesc:
            createPassengerDto.specialNeedsDesc ||
            existingPassenger.specialNeedsDesc,
        },
        include: {
          User: {
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

    return this.prisma.passenger.create({
      data: {
        userId: createPassengerDto.userId,
        prefersFemaleDriver: createPassengerDto.prefersFemaleDriver || false,
        specialNeeds: createPassengerDto.specialNeeds || false,
        specialNeedsDesc: createPassengerDto.specialNeedsDesc,
      },
      include: {
        User: {
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

  async findAll() {
    return this.prisma.passenger.findMany({
      include: {
        User: {
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
        User: {
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
        User: {
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
