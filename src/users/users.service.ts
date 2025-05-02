import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        phone: true,
        firstName: true,
        lastName: true,
        gender: true,
        dateOfBirth: true,
        profileImage: true,
        address: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
        // Excluímos o clerkId por segurança
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        phone: true,
        firstName: true,
        lastName: true,
        gender: true,
        dateOfBirth: true,
        profileImage: true,
        address: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
        // Excluímos o clerkId por segurança
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return user;
  }

  async findByClerkId(clerkId: string) {
    const user = await this.prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      return null;
    }

    // Removendo clerkId antes de retornar
    const { clerkId: _, ...userWithoutClerkId } = user;
    return userWithoutClerkId;
  }

  async update(id: string, updateData: Partial<CreateUserDto>) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    // Soft delete - atualizamos apenas o campo deletedAt
    return this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
