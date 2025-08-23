import { PrismaClient } from '@prisma/client';
import { seedRideTypes } from './seeds/ride-types.seed';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

/**
 * Seed mínimo para testes - apenas 1 motorista e 1 passageiro
 */
async function main() {
  console.log('Starting minimal seeding process...');
  
  // Criar tipos de corrida primeiro
  await seedRideTypes(prisma);
  
  // Hash da senha padrão
  const hashedPassword = await bcrypt.hash('123456', 10);
  
  // Criar 1 passageiro
  console.log('Creating passenger...');
  const passenger = await prisma.user.create({
    data: {
      email: 'lucas.silva@exemplo.com',
      password: hashedPassword,
      firstName: 'Lucas',
      lastName: 'Silva',
      phone: '+55 17 99999-1111',
      gender: 'MALE',
      isVerified: true,
      passenger: {
        create: {
          totalRides: 0,
          averageRating: 0,
        },
      },
    },
  });
  console.log(`✅ Passenger created: ${passenger.firstName} ${passenger.lastName}`);
  
  // Criar 1 motorista
  console.log('Creating driver...');
  const driver = await prisma.user.create({
    data: {
      email: 'carlos.silva@motorista.com',
      password: hashedPassword,
      firstName: 'Carlos',
      lastName: 'Silva',
      phone: '+55 17 99999-2222',
      gender: 'MALE',
      isVerified: true,
      driver: {
        create: {
          licenseNumber: 'ABC123456789',
          licenseExpiryDate: new Date('2030-12-31'),
          totalRides: 0,
          averageRating: 5.0,
          accountStatus: 'APPROVED',
          isOnline: false,
          isAvailable: false,
          currentLatitude: -20.2974,
          currentLongitude: -50.2478,
          vehicle: {
            create: {
              make: 'Toyota',
              model: 'Corolla',
              year: 2020,
              color: 'Prata',
              licensePlate: 'ABC-1234',
              registrationExpiryDate: new Date('2030-12-31'),
              insuranceExpiryDate: new Date('2030-12-31'),
              vehicleType: 'ECONOMY',
              capacity: 4,
            },
          },
        },
      },
    },
  });
  console.log(`✅ Driver created: ${driver.firstName} ${driver.lastName}`);
  
  // Buscar o driver criado com a relação
  const createdDriver = await prisma.driver.findUnique({
    where: { userId: driver.id },
  });
  
  // Associar motorista com tipos de corrida
  const rideTypes = await prisma.rideTypeConfig.findMany();
  for (const rideType of rideTypes) {
    await prisma.driverRideType.create({
      data: {
        driverId: createdDriver!.id,
        rideTypeId: rideType.id,
      },
    });
  }
  console.log(`✅ Driver associated with ${rideTypes.length} ride types`);
  
  console.log('\n📊 Minimal Seed Statistics:');
  console.log('🚗 Total drivers: 1');
  console.log('👥 Total passengers: 1');
  console.log('📋 Ride types: 6');
  console.log('\n✅ Minimal seed completed successfully!');
  console.log('🎯 Ready for testing with REAL data only');
}

main()
  .catch((e) => {
    console.error('An error occurred during minimal seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });