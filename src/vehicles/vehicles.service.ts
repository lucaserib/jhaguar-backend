// src/vehicles/vehicles.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async create(createVehicleDto: CreateVehicleDto) {
    const driver = await this.prisma.driver.findUnique({
      where: { id: createVehicleDto.driverId },
    });

    if (!driver) {
      throw new NotFoundException(
        `Motorista com ID ${createVehicleDto.driverId} não encontrado`,
      );
    }

    const existingVehicle = await this.prisma.vehicle.findUnique({
      where: { driverId: createVehicleDto.driverId },
    });

    if (existingVehicle) {
      return this.prisma.vehicle.update({
        where: { driverId: createVehicleDto.driverId },
        data: {
          make: createVehicleDto.make,
          model: createVehicleDto.model,
          year: createVehicleDto.year,
          color: createVehicleDto.color || 'Não informado',
          licensePlate: createVehicleDto.licensePlate,
          registrationExpiryDate: new Date(
            createVehicleDto.registrationExpiryDate,
          ),
          insuranceExpiryDate: new Date(createVehicleDto.insuranceExpiryDate),
          vehicleType: createVehicleDto.vehicleType,
          capacity: createVehicleDto.capacity,
          accessibility: createVehicleDto.accessibility || false,
          carImageUrl: createVehicleDto.carImageUrl,
          features: createVehicleDto.features || [],
        },
      });
    }

    return this.prisma.vehicle.create({
      data: {
        driverId: createVehicleDto.driverId,
        make: createVehicleDto.make,
        model: createVehicleDto.model,
        year: createVehicleDto.year,
        color: createVehicleDto.color || 'Não informado',
        licensePlate: createVehicleDto.licensePlate,
        registrationExpiryDate: new Date(
          createVehicleDto.registrationExpiryDate,
        ),
        insuranceExpiryDate: new Date(createVehicleDto.insuranceExpiryDate),
        vehicleType: createVehicleDto.vehicleType,
        capacity: createVehicleDto.capacity,
        accessibility: createVehicleDto.accessibility || false,
        carImageUrl: createVehicleDto.carImageUrl,
        features: createVehicleDto.features || [],
      },
    });
  }

  async findByDriverId(driverId: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { driverId },
    });

    if (!vehicle) {
      throw new NotFoundException(
        `Nenhum veículo encontrado para o motorista com ID ${driverId}`,
      );
    }

    return vehicle;
  }
}
