import { PrismaClient, RideTypeEnum, VehicleType } from '@prisma/client';

export async function seedRideTypes(prisma: PrismaClient): Promise<void> {
  console.log('Seeding ride types...');

  const rideTypesData = [
    {
      type: RideTypeEnum.NORMAL,
      name: 'Normal',
      description: 'Opção econômica e confiável para o dia a dia.',
      icon: 'car-sport',
      vehicleTypes: [VehicleType.ECONOMY, VehicleType.COMFORT],
      basePrice: 5.0,
      pricePerKm: 1.8,
      pricePerMin: 0.3,
      minimumPrice: 8.0,
      priority: 1,
    },
    {
      type: RideTypeEnum.EXECUTIVO,
      name: 'Executivo',
      description: 'Maior conforto com veículos premium.',
      icon: 'car',
      vehicleTypes: [VehicleType.LUXURY, VehicleType.SUV],
      basePrice: 8.0,
      pricePerKm: 2.5,
      pricePerMin: 0.45,
      minimumPrice: 12.0,
      priority: 2,
    },
    {
      type: RideTypeEnum.BLINDADO,
      name: 'Blindado',
      description: 'Máxima segurança com veículos blindados.',
      icon: 'shield-car',
      requiresArmored: true,
      vehicleTypes: [VehicleType.LUXURY, VehicleType.SUV],
      basePrice: 15.0,
      pricePerKm: 3.5,
      pricePerMin: 0.6,
      minimumPrice: 20.0,
      priority: 4,
    },
    {
      type: RideTypeEnum.PET,
      name: 'Pet',
      description: 'Transporte seguro para você e seu pet.',
      icon: 'paw',
      requiresPetFriendly: true,
      vehicleTypes: [VehicleType.ECONOMY, VehicleType.COMFORT, VehicleType.SUV],
      basePrice: 7.0,
      pricePerKm: 2.0,
      pricePerMin: 0.35,
      minimumPrice: 10.0,
      priority: 3,
    },
    {
      type: RideTypeEnum.MULHER,
      name: 'Mulher',
      description: 'Exclusivo para mulheres com motoristas mulheres.',
      icon: 'woman',
      femaleOnly: true,
      vehicleTypes: [VehicleType.ECONOMY, VehicleType.COMFORT],
      basePrice: 5.5,
      pricePerKm: 1.8,
      pricePerMin: 0.3,
      minimumPrice: 8.5,
      priority: 3,
    },
    {
      type: RideTypeEnum.MOTO,
      name: 'Moto',
      description: 'Rápido e econômico para trajetos curtos.',
      icon: 'bicycle',
      allowMotorcycle: true,
      vehicleTypes: [VehicleType.MOTORCYCLE],
      basePrice: 3.0,
      pricePerKm: 1.2,
      pricePerMin: 0.2,
      minimumPrice: 5.0,
      priority: 5,
    },
    {
      type: RideTypeEnum.DELIVERY,
      name: 'Delivery',
      description: 'Entrega de pacotes e encomendas.',
      icon: 'cube',
      isDeliveryOnly: true,
      vehicleTypes: [VehicleType.ECONOMY, VehicleType.MOTORCYCLE],
      basePrice: 4.0,
      pricePerKm: 1.5,
      pricePerMin: 0.25,
      minimumPrice: 7.0,
      priority: 6,
    },
  ];

  for (const data of rideTypesData) {
    await prisma.rideTypeConfig.upsert({
      where: { type: data.type },
      update: data,
      create: data,
    });
  }
  console.log('Ride types seeded successfully.');
}
