import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Status } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
import { UpdateDriverLocationDto } from './dto/update-driver-location.dto';

@Injectable()
export class DriversService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async create(createDriverDto: CreateDriverDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: createDriverDto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `Usuário com ID ${createDriverDto.userId} não encontrado`,
      );
    }

    const defaultExpiryDate = new Date();
    defaultExpiryDate.setFullYear(defaultExpiryDate.getFullYear() + 1);

    const licenseExpiryDate = createDriverDto.licenseExpiryDate
      ? new Date(createDriverDto.licenseExpiryDate)
      : defaultExpiryDate;

    const existingDriver = await this.prisma.driver.findUnique({
      where: { userId: createDriverDto.userId },
    });

    if (existingDriver) {
      return this.prisma.driver.update({
        where: { userId: createDriverDto.userId },
        data: {
          licenseNumber: createDriverDto.licenseNumber,
          licenseExpiryDate: new Date(createDriverDto.licenseExpiryDate),
          bankAccount: createDriverDto.bankAccount,
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
        },
      });
    }

    const newDriver = await this.prisma.driver.create({
      data: {
        userId: createDriverDto.userId,
        licenseNumber: createDriverDto.licenseNumber || 'TEMP',
        licenseExpiryDate: licenseExpiryDate,
        bankAccount: createDriverDto.bankAccount,
        accountStatus: Status.PENDING,
        backgroundCheckStatus: Status.PENDING,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    await this.notificationsService.sendDriverApplicationNotification(
      newDriver,
    );

    return newDriver;
  }

  async findAll() {
    return this.prisma.driver.findMany({
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
        vehicle: true,
      },
    });
  }

  async findOne(id: string) {
    const driver = await this.prisma.driver.findUnique({
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
        vehicle: true,
      },
    });

    if (!driver) {
      throw new NotFoundException(`Motorista com ID ${id} não encontrado`);
    }

    return driver;
  }

  async findByUserId(userId: string) {
    const driver = await this.prisma.driver.findUnique({
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
        vehicle: true,
      },
    });

    if (!driver) {
      return null;
    }

    return driver;
  }

  async updateStatus(id: string, status: Status) {
    const driver = await this.prisma.driver.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!driver) {
      throw new NotFoundException(`Motorista com ID ${id} não encontrado`);
    }

    const updatedDriver = await this.prisma.driver.update({
      where: { id },
      data: { accountStatus: status },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    await this.notificationsService.sendDriverStatusUpdateNotification(
      updatedDriver,
      status,
    );

    return {
      id: updatedDriver.id,
      userId: updatedDriver.userId,
      status: updatedDriver.accountStatus,
      user: updatedDriver.user,
      message: `Status do motorista atualizado para ${status}`,
    };
  }

  async updateDocuments(id: string, documentData: any) {
    const driver = await this.prisma.driver.findUnique({
      where: { id },
    });

    if (!driver) {
      throw new NotFoundException(`Motorista com ID ${id} não encontrado`);
    }

    return this.prisma.driver.update({
      where: { id },
      data: {
        backgroundCheckStatus: Status.PENDING,
        backgroundCheckDate: new Date(),
      },
    });
  }

  async updateLocation(
    driverId: string,
    updateLocationDto: UpdateDriverLocationDto,
  ) {
    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
    });

    if (!driver) {
      throw new NotFoundException(
        `Motorista com ID ${driverId} não encontrado`,
      );
    }

    const updatedDriver = await this.prisma.driver.update({
      where: { id: driverId },
      data: {
        currentLatitude: updateLocationDto.latitude,
        currentLongitude: updateLocationDto.longitude,
        isAvailable: updateLocationDto.isAvailable ?? driver.isAvailable,
        isOnline: updateLocationDto.isOnline ?? driver.isOnline,
      },
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
        vehicle: true,
      },
    });

    return {
      id: updatedDriver.id,
      latitude: updatedDriver.currentLatitude,
      longitude: updatedDriver.currentLongitude,
      isAvailable: updatedDriver.isAvailable,
      isOnline: updatedDriver.isOnline,
      user: updatedDriver.user,
      vehicle: updatedDriver.vehicle,
    };
  }

  async findOnlineDrivers() {
    return this.prisma.driver.findMany({
      where: {
        isOnline: true,
        accountStatus: 'APPROVED',
        currentLatitude: { not: null },
        currentLongitude: { not: null },
      },
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
        vehicle: true,
      },
    });
  }

  async toggleAvailability(driverId: string) {
    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
    });

    if (!driver) {
      throw new NotFoundException(
        `Motorista com ID ${driverId} não encontrado`,
      );
    }

    const updatedDriver = await this.prisma.driver.update({
      where: { id: driverId },
      data: {
        isAvailable: !driver.isAvailable,
      },
    });

    return {
      id: updatedDriver.id,
      isAvailable: updatedDriver.isAvailable,
      message: `Motorista ${updatedDriver.isAvailable ? 'disponível' : 'indisponível'} para corridas`,
    };
  }
}
