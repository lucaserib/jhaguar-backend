// prisma/seed-fernandopolis.ts
import { PrismaClient, Gender, Status, VehicleType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados para Fernandópolis-SP...');

  // Coordenadas de bairros e regiões de Fernandópolis
  const fernandopolisLocations = [
    { name: 'Centro', lat: -20.2834, lng: -50.2466 },
    { name: 'Jardim Universitário', lat: -20.2953, lng: -50.2658 },
    { name: 'Jardim América', lat: -20.289, lng: -50.252 },
    { name: 'Vila Donata', lat: -20.278, lng: -50.238 },
    { name: 'Jardim Santa Rita', lat: -20.292, lng: -50.241 },
    { name: 'Parque Universitário', lat: -20.295, lng: -50.265 },
    { name: 'Jardim Araguaia', lat: -20.287, lng: -50.259 },
    { name: 'Vila São José', lat: -20.276, lng: -50.255 },
    { name: 'Jardim Planalto', lat: -20.281, lng: -50.249 },
    { name: 'Vila Venâncio', lat: -20.29, lng: -50.244 },
    { name: 'Jardim Paraíso', lat: -20.284, lng: -50.253 },
    { name: 'Vila Industrial', lat: -20.273, lng: -50.26 },
    { name: 'Jardim Boa Vista', lat: -20.288, lng: -50.248 },
    { name: 'Vila Botega', lat: -20.279, lng: -50.256 },
    { name: 'Jardim Santista', lat: -20.286, lng: -50.25 },
  ];

  // Dados dos motoristas adaptados para Fernandópolis
  const driversData = [
    {
      personal: {
        firstName: 'Carlos',
        lastName: 'Silva',
        email: 'carlos.silva@exemplo.com',
        phone: '+5517981234567',
        gender: Gender.MALE,
        profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      license: 'CNH123456789',
      vehicle: {
        make: 'Toyota',
        model: 'Corolla',
        year: 2022,
        color: 'Prata',
        licensePlate: 'FND-1A23',
        vehicleType: VehicleType.COMFORT,
        carImageUrl:
          'https://cdn.imagin.studio/getimage?customer=img&make=toyota&modelFamily=corolla',
      },
      rating: 4.8,
      totalRides: 342,
    },
    {
      personal: {
        firstName: 'Maria',
        lastName: 'Oliveira',
        email: 'maria.oliveira@exemplo.com',
        phone: '+5517982345678',
        gender: Gender.FEMALE,
        profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      license: 'CNH123456790',
      vehicle: {
        make: 'Honda',
        model: 'Civic',
        year: 2023,
        color: 'Branco',
        licensePlate: 'FND-5B78',
        vehicleType: VehicleType.COMFORT,
        carImageUrl:
          'https://cdn.imagin.studio/getimage?customer=img&make=honda&modelFamily=civic',
      },
      rating: 4.9,
      totalRides: 567,
    },
    {
      personal: {
        firstName: 'João',
        lastName: 'Pereira',
        email: 'joao.pereira@exemplo.com',
        phone: '+5517983456789',
        gender: Gender.MALE,
        profileImage: 'https://randomuser.me/api/portraits/men/55.jpg',
      },
      license: 'CNH123456791',
      vehicle: {
        make: 'Volkswagen',
        model: 'Gol',
        year: 2021,
        color: 'Preto',
        licensePlate: 'FND-9C12',
        vehicleType: VehicleType.ECONOMY,
        carImageUrl:
          'https://cdn.imagin.studio/getimage?customer=img&make=volkswagen&modelFamily=gol',
      },
      rating: 4.7,
      totalRides: 289,
    },
    {
      personal: {
        firstName: 'Ana',
        lastName: 'Santos',
        email: 'ana.santos@exemplo.com',
        phone: '+5517984567890',
        gender: Gender.FEMALE,
        profileImage: 'https://randomuser.me/api/portraits/women/22.jpg',
      },
      license: 'CNH123456792',
      vehicle: {
        make: 'Fiat',
        model: 'Mobi',
        year: 2022,
        color: 'Vermelho',
        licensePlate: 'FND-3D56',
        vehicleType: VehicleType.ECONOMY,
        carImageUrl:
          'https://cdn.imagin.studio/getimage?customer=img&make=fiat&modelFamily=mobi',
      },
      rating: 4.9,
      totalRides: 412,
    },
    {
      personal: {
        firstName: 'Pedro',
        lastName: 'Costa',
        email: 'pedro.costa@exemplo.com',
        phone: '+5517985678901',
        gender: Gender.MALE,
        profileImage: 'https://randomuser.me/api/portraits/men/67.jpg',
      },
      license: 'CNH123456793',
      vehicle: {
        make: 'Hyundai',
        model: 'HB20',
        year: 2023,
        color: 'Branco',
        licensePlate: 'FND-7E90',
        vehicleType: VehicleType.ECONOMY,
        carImageUrl:
          'https://cdn.imagin.studio/getimage?customer=img&make=hyundai&modelFamily=hb20',
      },
      rating: 4.6,
      totalRides: 198,
    },
    {
      personal: {
        firstName: 'Juliana',
        lastName: 'Ferreira',
        email: 'juliana.ferreira@exemplo.com',
        phone: '+5517986789012',
        gender: Gender.FEMALE,
        profileImage: 'https://randomuser.me/api/portraits/women/65.jpg',
      },
      license: 'CNH123456794',
      vehicle: {
        make: 'Chevrolet',
        model: 'Onix',
        year: 2023,
        color: 'Cinza',
        licensePlate: 'FND-1F34',
        vehicleType: VehicleType.ECONOMY,
        carImageUrl:
          'https://cdn.imagin.studio/getimage?customer=img&make=chevrolet&modelFamily=onix',
      },
      rating: 4.8,
      totalRides: 523,
    },
    {
      personal: {
        firstName: 'Roberto',
        lastName: 'Lima',
        email: 'roberto.lima@exemplo.com',
        phone: '+5517987890123',
        gender: Gender.MALE,
        profileImage: 'https://randomuser.me/api/portraits/men/43.jpg',
      },
      license: 'CNH123456795',
      vehicle: {
        make: 'Renault',
        model: 'Sandero',
        year: 2022,
        color: 'Azul',
        licensePlate: 'FND-5G78',
        vehicleType: VehicleType.ECONOMY,
        carImageUrl:
          'https://cdn.imagin.studio/getimage?customer=img&make=renault&modelFamily=sandero',
      },
      rating: 4.7,
      totalRides: 376,
    },
    {
      personal: {
        firstName: 'Fernanda',
        lastName: 'Alves',
        email: 'fernanda.alves@exemplo.com',
        phone: '+5517988901234',
        gender: Gender.FEMALE,
        profileImage: 'https://randomuser.me/api/portraits/women/68.jpg',
      },
      license: 'CNH123456796',
      vehicle: {
        make: 'Volkswagen',
        model: 'Up',
        year: 2021,
        color: 'Prata',
        licensePlate: 'FND-9H12',
        vehicleType: VehicleType.ECONOMY,
        carImageUrl:
          'https://cdn.imagin.studio/getimage?customer=img&make=volkswagen&modelFamily=up',
      },
      rating: 4.5,
      totalRides: 156,
    },
  ];

  console.log('👤 Criando motoristas em Fernandópolis...');

  // Limpar dados existentes na ordem correta (foreign keys)
  await prisma.vehicle.deleteMany({});
  await prisma.driver.deleteMany({});
  await prisma.passenger.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('🗑️ Dados anteriores removidos');

  for (let i = 0; i < driversData.length; i++) {
    const driverData = driversData[i];
    const location = fernandopolisLocations[i % fernandopolisLocations.length];

    // Adicionar pequena variação aleatória para simular movimento real
    const latVariation = (Math.random() - 0.5) * 0.005; // ±0.0025 grau
    const lngVariation = (Math.random() - 0.5) * 0.005;

    try {
      // Criar usuário
      const hashedPassword = await bcrypt.hash('123456', 10);

      const user = await prisma.user.create({
        data: {
          email: driverData.personal.email,
          phone: driverData.personal.phone,
          firstName: driverData.personal.firstName,
          lastName: driverData.personal.lastName,
          password: hashedPassword,
          gender: driverData.personal.gender,
          profileImage: driverData.personal.profileImage,
          isVerified: true,
        },
      });

      console.log(`✅ Usuário criado: ${user.firstName} ${user.lastName}`);

      // Criar motorista
      const driver = await prisma.driver.create({
        data: {
          userId: user.id,
          licenseNumber: driverData.license,
          licenseExpiryDate: new Date(2025, 11, 31),
          accountStatus: Status.APPROVED,
          backgroundCheckStatus: Status.APPROVED,
          backgroundCheckDate: new Date(),
          isOnline: true, // Todos online para teste
          isAvailable: true, // Todos disponíveis para teste
          currentLatitude: location.lat + latVariation,
          currentLongitude: location.lng + lngVariation,
          averageRating: driverData.rating,
          totalRides: driverData.totalRides,
        },
      });

      console.log(
        `🚗 Motorista criado: ${user.firstName} em ${location.name} (Lat: ${driver.currentLatitude}, Lng: ${driver.currentLongitude})`,
      );

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
          carImageUrl: driverData.vehicle.carImageUrl,
          inspectionStatus: Status.APPROVED,
          inspectionDate: new Date(),
        },
      });

      console.log(
        `🚙 Veículo criado: ${driverData.vehicle.make} ${driverData.vehicle.model} (${driverData.vehicle.licensePlate})`,
      );
    } catch (error) {
      console.error(
        `❌ Erro ao criar motorista ${driverData.personal.firstName}:`,
        error,
      );
    }
  }

  // Criar alguns passageiros de exemplo
  console.log('\n👥 Criando passageiros de exemplo em Fernandópolis...');

  const passengersData = [
    {
      firstName: 'Lucas',
      lastName: 'Mendes',
      email: 'lucas.mendes@exemplo.com',
      phone: '+5517999888777',
      gender: Gender.MALE,
      profileImage: 'https://randomuser.me/api/portraits/men/86.jpg',
    },
    {
      firstName: 'Juliana',
      lastName: 'Rodrigues',
      email: 'juliana.rodrigues@exemplo.com',
      phone: '+5517999888778',
      gender: Gender.FEMALE,
      profileImage: 'https://randomuser.me/api/portraits/women/79.jpg',
    },
  ];

  for (const passengerData of passengersData) {
    try {
      const hashedPassword = await bcrypt.hash('123456', 10);

      const user = await prisma.user.create({
        data: {
          email: passengerData.email,
          phone: passengerData.phone,
          firstName: passengerData.firstName,
          lastName: passengerData.lastName,
          password: hashedPassword,
          gender: passengerData.gender,
          profileImage: passengerData.profileImage,
          isVerified: true,
        },
      });

      await prisma.passenger.create({
        data: {
          userId: user.id,
        },
      });

      console.log(`✅ Passageiro criado: ${user.firstName} ${user.lastName}`);
    } catch (error) {
      console.error(
        `❌ Erro ao criar passageiro ${passengerData.firstName}:`,
        error,
      );
    }
  }

  // Estatísticas finais
  const totalDrivers = await prisma.driver.count();
  const onlineDrivers = await prisma.driver.count({
    where: { isOnline: true },
  });
  const availableDrivers = await prisma.driver.count({
    where: { isOnline: true, isAvailable: true },
  });

  console.log('\n📊 Estatísticas do Seed:');
  console.log(`Total de motoristas: ${totalDrivers}`);
  console.log(`Motoristas online: ${onlineDrivers}`);
  console.log(`Motoristas disponíveis: ${availableDrivers}`);
  console.log('\n🎉 Seed para Fernandópolis concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
