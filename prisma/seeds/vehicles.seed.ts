import { PrismaClient, VehicleType } from '@prisma/client';

export async function seedVehicles(prisma: PrismaClient): Promise<void> {
  console.log('Seeding vehicles...');

  const vehiclesData = [
    {
      driverEmail: 'motorista.aprovado@test.com',
      make: 'Toyota',
      model: 'Corolla',
      year: 2022,
      licensePlate: 'ABC1D23',
      vehicleType: VehicleType.COMFORT,
      isPetFriendly: true,
    },
    {
      driverEmail: 'motorista.pendente@test.com',
      make: 'Chevrolet',
      model: 'Onix',
      year: 2021,
      licensePlate: 'DEF4E56',
      vehicleType: VehicleType.ECONOMY,
    },
    {
      driverEmail: 'motorista.mulher@test.com',
      make: 'Hyundai',
      model: 'HB20',
      year: 2023,
      licensePlate: 'GHI7F89',
      vehicleType: VehicleType.ECONOMY,
      isPetFriendly: true,
    },
    {
      driverEmail: 'motorista.moto@test.com',
      make: 'Honda',
      model: 'PCX',
      year: 2023,
      licensePlate: 'JKL0M12',
      vehicleType: VehicleType.MOTORCYCLE,
      isMotorcycle: true,
    },
    {
      driverEmail: 'motorista.blindado@test.com',
      make: 'Audi',
      model: 'A4',
      year: 2022,
      licensePlate: 'MNO3P45',
      vehicleType: VehicleType.LUXURY,
      isArmored: true,
    },
  ];

  for (const data of vehiclesData) {
    const driver = await prisma.driver.findFirst({
      where: { user: { email: data.driverEmail } },
    });

    if (driver) {
      // --- INÍCIO DA CORREÇÃO ---
      // Remove a propriedade 'driverEmail' do objeto antes de usá-lo no Prisma
      const { driverEmail, ...vehicleInfo } = data;
      // --- FIM DA CORREÇÃO ---

      await prisma.vehicle.upsert({
        where: { driverId: driver.id },
        // Usa o objeto corrigido 'vehicleInfo' sem o 'driverEmail'
        update: vehicleInfo,
        create: {
          ...vehicleInfo,
          driverId: driver.id,
          color: 'Prata',
          capacity: vehicleInfo.vehicleType === VehicleType.MOTORCYCLE ? 2 : 4,
          registrationExpiryDate: new Date('2028-12-31'),
          insuranceExpiryDate: new Date('2028-12-31'),
        },
      });
    }
  }
  console.log('Vehicles seeded successfully.');
}
