// prisma/seed.ts
import { PrismaClient, Gender, Status, VehicleType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Coordenadas de algumas cidades brasileiras para distribuir os motoristas
  const locations = [
    { name: 'São Paulo - Centro', lat: -23.5505, lng: -46.6333 },
    { name: 'São Paulo - Vila Madalena', lat: -23.5367, lng: -46.6925 },
    { name: 'São Paulo - Ibirapuera', lat: -23.5911, lng: -46.6577 },
    { name: 'São Paulo - Morumbi', lat: -23.6178, lng: -46.7019 },
    { name: 'São Paulo - Santana', lat: -23.5092, lng: -46.6285 },
    { name: 'Rio de Janeiro - Copacabana', lat: -22.9708, lng: -43.1882 },
    { name: 'Rio de Janeiro - Ipanema', lat: -22.9838, lng: -43.2058 },
    { name: 'Belo Horizonte - Centro', lat: -19.9167, lng: -43.9345 },
  ];

  // Dados dos motoristas de exemplo
  const driversData = [
    {
      personal: {
        firstName: 'Carlos',
        lastName: 'Silva',
        email: 'carlos.silva@exemplo.com',
        phone: '+5511987654321',
        gender: Gender.MALE,
      },
      license: 'CNH123456789',
      vehicle: {
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        color: 'Prata',
        licensePlate: 'ABC-1234',
        vehicleType: VehicleType.ECONOMY,
      },
    },
    {
      personal: {
        firstName: 'Maria',
        lastName: 'Oliveira',
        email: 'maria.oliveira@exemplo.com',
        phone: '+5511987654322',
        gender: Gender.FEMALE,
      },
      license: 'CNH123456790',
      vehicle: {
        make: 'Honda',
        model: 'Civic',
        year: 2021,
        color: 'Branco',
        licensePlate: 'DEF-5678',
        vehicleType: VehicleType.COMFORT,
      },
    },
    {
      personal: {
        firstName: 'João',
        lastName: 'Pereira',
        email: 'joao.pereira@exemplo.com',
        phone: '+5511987654323',
        gender: Gender.MALE,
      },
      license: 'CNH123456791',
      vehicle: {
        make: 'Volkswagen',
        model: 'Jetta',
        year: 2019,
        color: 'Preto',
        licensePlate: 'GHI-9012',
        vehicleType: VehicleType.COMFORT,
      },
    },
    {
      personal: {
        firstName: 'Ana',
        lastName: 'Santos',
        email: 'ana.santos@exemplo.com',
        phone: '+5511987654324',
        gender: Gender.FEMALE,
      },
      license: 'CNH123456792',
      vehicle: {
        make: 'Nissan',
        model: 'Versa',
        year: 2022,
        color: 'Azul',
        licensePlate: 'JKL-3456',
        vehicleType: VehicleType.ECONOMY,
      },
    },
    {
      personal: {
        firstName: 'Pedro',
        lastName: 'Costa',
        email: 'pedro.costa@exemplo.com',
        phone: '+5511987654325',
        gender: Gender.MALE,
      },
      license: 'CNH123456793',
      vehicle: {
        make: 'Hyundai',
        model: 'HB20',
        year: 2021,
        color: 'Vermelho',
        licensePlate: 'MNO-7890',
        vehicleType: VehicleType.ECONOMY,
      },
    },
    {
      personal: {
        firstName: 'Luiza',
        lastName: 'Ferreira',
        email: 'luiza.ferreira@exemplo.com',
        phone: '+5511987654326',
        gender: Gender.FEMALE,
      },
      license: 'CNH123456794',
      vehicle: {
        make: 'Chevrolet',
        model: 'Onix',
        year: 2020,
        color: 'Cinza',
        licensePlate: 'PQR-1234',
        vehicleType: VehicleType.ECONOMY,
      },
    },
    {
      personal: {
        firstName: 'Roberto',
        lastName: 'Lima',
        email: 'roberto.lima@exemplo.com',
        phone: '+5511987654327',
        gender: Gender.MALE,
      },
      license: 'CNH123456795',
      vehicle: {
        make: 'Ford',
        model: 'Ka',
        year: 2021,
        color: 'Branco',
        licensePlate: 'STU-5678',
        vehicleType: VehicleType.ECONOMY,
      },
    },
    {
      personal: {
        firstName: 'Fernanda',
        lastName: 'Alves',
        email: 'fernanda.alves@exemplo.com',
        phone: '+5511987654328',
        gender: Gender.FEMALE,
      },
      license: 'CNH123456796',
      vehicle: {
        make: 'Renault',
        model: 'Sandero',
        year: 2019,
        color: 'Prata',
        licensePlate: 'VWX-9012',
        vehicleType: VehicleType.ECONOMY,
      },
    },
  ];

  console.log('👤 Criando motoristas...');

  for (let i = 0; i < driversData.length; i++) {
    const driverData = driversData[i];
    const location = locations[i % locations.length];

    // Adicionar pequena variação na localização para não ficarem todos no mesmo ponto
    const latVariation = (Math.random() - 0.5) * 0.02; // ±0.01 grau
    const lngVariation = (Math.random() - 0.5) * 0.02;

    try {
      // Verificar se o usuário já existe
      let user = await prisma.user.findUnique({
        where: { email: driverData.personal.email },
      });

      if (!user) {
        // Criar usuário
        const hashedPassword = await bcrypt.hash('123456', 10);

        user = await prisma.user.create({
          data: {
            email: driverData.personal.email,
            phone: driverData.personal.phone,
            firstName: driverData.personal.firstName,
            lastName: driverData.personal.lastName,
            password: hashedPassword,
            gender: driverData.personal.gender,
            isVerified: true,
          },
        });

        console.log(`✅ Usuário criado: ${user.firstName} ${user.lastName}`);
      }

      // Verificar se o motorista já existe
      let driver = await prisma.driver.findUnique({
        where: { userId: user.id },
      });

      if (!driver) {
        // Criar motorista
        driver = await prisma.driver.create({
          data: {
            userId: user.id,
            licenseNumber: driverData.license,
            licenseExpiryDate: new Date(2025, 11, 31), // 31 de dezembro de 2025
            accountStatus: Status.APPROVED,
            backgroundCheckStatus: Status.APPROVED,
            backgroundCheckDate: new Date(),
            isOnline: Math.random() > 0.3, // 70% online
            isAvailable: Math.random() > 0.2, // 80% disponível quando online
            currentLatitude: location.lat + latVariation,
            currentLongitude: location.lng + lngVariation,
            averageRating: 4.0 + Math.random() * 1.0, // Entre 4.0 e 5.0
            totalRides: Math.floor(Math.random() * 500) + 50, // Entre 50 e 549
          },
        });

        console.log(
          `🚗 Motorista criado: ${user.firstName} (${location.name})`,
        );
      }

      // Verificar se o veículo já existe
      const existingVehicle = await prisma.vehicle.findUnique({
        where: { driverId: driver.id },
      });

      if (!existingVehicle) {
        // Criar veículo
        await prisma.vehicle.create({
          data: {
            driverId: driver.id,
            make: driverData.vehicle.make,
            model: driverData.vehicle.model,
            year: driverData.vehicle.year,
            color: driverData.vehicle.color,
            licensePlate: driverData.vehicle.licensePlate,
            registrationExpiryDate: new Date(2025, 11, 31),
            insuranceExpiryDate: new Date(2025, 11, 31),
            vehicleType: driverData.vehicle.vehicleType,
            capacity: 4,
            accessibility: false,
            inspectionStatus: Status.APPROVED,
            inspectionDate: new Date(),
          },
        });

        console.log(
          `🚙 Veículo criado: ${driverData.vehicle.make} ${driverData.vehicle.model}`,
        );
      }
    } catch (error) {
      console.error(
        `❌ Erro ao criar motorista ${driverData.personal.firstName}:`,
        error,
      );
    }
  }

  // Criar alguns passageiros de exemplo
  console.log('👥 Criando passageiros de exemplo...');

  const passengersData = [
    {
      firstName: 'Lucas',
      lastName: 'Mendes',
      email: 'lucas.mendes@exemplo.com',
      phone: '+5511999888777',
      gender: Gender.MALE,
    },
    {
      firstName: 'Juliana',
      lastName: 'Rodrigues',
      email: 'juliana.rodrigues@exemplo.com',
      phone: '+5511999888778',
      gender: Gender.FEMALE,
    },
  ];

  for (const passengerData of passengersData) {
    try {
      let user = await prisma.user.findUnique({
        where: { email: passengerData.email },
      });

      if (!user) {
        const hashedPassword = await bcrypt.hash('123456', 10);

        user = await prisma.user.create({
          data: {
            email: passengerData.email,
            phone: passengerData.phone,
            firstName: passengerData.firstName,
            lastName: passengerData.lastName,
            password: hashedPassword,
            gender: passengerData.gender,
            isVerified: true,
          },
        });

        await prisma.passenger.create({
          data: {
            userId: user.id,
          },
        });

        console.log(`✅ Passageiro criado: ${user.firstName} ${user.lastName}`);
      }
    } catch (error) {
      console.error(
        `❌ Erro ao criar passageiro ${passengerData.firstName}:`,
        error,
      );
    }
  }

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// package.json - adicionar script:
// "db:seed": "tsx prisma/seed.ts"
