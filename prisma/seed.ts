// prisma/seed.ts
import { PrismaClient, Gender, Status, VehicleType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Coordenadas de bairros de São Paulo
  const saoPauloLocations = [
    { name: 'Vila Mariana', lat: -23.5874, lng: -46.6376 },
    { name: 'Pinheiros', lat: -23.5614, lng: -46.6823 },
    { name: 'Moema', lat: -23.6012, lng: -46.6697 },
    { name: 'Jardins', lat: -23.5732, lng: -46.6658 },
    { name: 'Itaim Bibi', lat: -23.5837, lng: -46.6781 },
    { name: 'Vila Olímpia', lat: -23.5954, lng: -46.6851 },
    { name: 'Brooklin', lat: -23.6065, lng: -46.6962 },
    { name: 'Campo Belo', lat: -23.6267, lng: -46.6721 },
    { name: 'Santo Amaro', lat: -23.6547, lng: -46.7099 },
    { name: 'Morumbi', lat: -23.6084, lng: -46.7167 },
    { name: 'Perdizes', lat: -23.5408, lng: -46.6796 },
    { name: 'Higienópolis', lat: -23.5453, lng: -46.6574 },
    { name: 'Consolação', lat: -23.5505, lng: -46.6585 },
    { name: 'Bela Vista', lat: -23.5629, lng: -46.6544 },
    { name: 'Liberdade', lat: -23.5598, lng: -46.6356 },
  ];

  // Dados dos motoristas
  const driversData = [
    {
      personal: {
        firstName: 'Carlos',
        lastName: 'Silva',
        email: 'carlos.silva@exemplo.com',
        phone: '+5511987654321',
        gender: Gender.MALE,
        profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      license: 'CNH123456789',
      vehicle: {
        make: 'Toyota',
        model: 'Corolla',
        year: 2022,
        color: 'Prata',
        licensePlate: 'ABC-1A23',
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
        phone: '+5511987654322',
        gender: Gender.FEMALE,
        profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      license: 'CNH123456790',
      vehicle: {
        make: 'Honda',
        model: 'Civic',
        year: 2023,
        color: 'Branco',
        licensePlate: 'DEF-5B78',
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
        phone: '+5511987654323',
        gender: Gender.MALE,
        profileImage: 'https://randomuser.me/api/portraits/men/55.jpg',
      },
      license: 'CNH123456791',
      vehicle: {
        make: 'Volkswagen',
        model: 'Virtus',
        year: 2023,
        color: 'Preto',
        licensePlate: 'GHI-9C12',
        vehicleType: VehicleType.ECONOMY,
        carImageUrl:
          'https://cdn.imagin.studio/getimage?customer=img&make=volkswagen&modelFamily=virtus',
      },
      rating: 4.7,
      totalRides: 289,
    },
    {
      personal: {
        firstName: 'Ana',
        lastName: 'Santos',
        email: 'ana.santos@exemplo.com',
        phone: '+5511987654324',
        gender: Gender.FEMALE,
        profileImage: 'https://randomuser.me/api/portraits/women/22.jpg',
      },
      license: 'CNH123456792',
      vehicle: {
        make: 'Nissan',
        model: 'Versa',
        year: 2022,
        color: 'Azul',
        licensePlate: 'JKL-3D56',
        vehicleType: VehicleType.ECONOMY,
        carImageUrl:
          'https://cdn.imagin.studio/getimage?customer=img&make=nissan&modelFamily=versa',
      },
      rating: 4.9,
      totalRides: 412,
    },
    {
      personal: {
        firstName: 'Pedro',
        lastName: 'Costa',
        email: 'pedro.costa@exemplo.com',
        phone: '+5511987654325',
        gender: Gender.MALE,
        profileImage: 'https://randomuser.me/api/portraits/men/67.jpg',
      },
      license: 'CNH123456793',
      vehicle: {
        make: 'Hyundai',
        model: 'HB20',
        year: 2023,
        color: 'Vermelho',
        licensePlate: 'MNO-7E90',
        vehicleType: VehicleType.ECONOMY,
        carImageUrl:
          'https://cdn.imagin.studio/getimage?customer=img&make=hyundai&modelFamily=hb20',
      },
      rating: 4.6,
      totalRides: 198,
    },
    {
      personal: {
        firstName: 'Luiza',
        lastName: 'Ferreira',
        email: 'luiza.ferreira@exemplo.com',
        phone: '+5511987654326',
        gender: Gender.FEMALE,
        profileImage: 'https://randomuser.me/api/portraits/women/65.jpg',
      },
      license: 'CNH123456794',
      vehicle: {
        make: 'Chevrolet',
        model: 'Onix Plus',
        year: 2023,
        color: 'Cinza',
        licensePlate: 'PQR-1F34',
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
        phone: '+5511987654327',
        gender: Gender.MALE,
        profileImage: 'https://randomuser.me/api/portraits/men/43.jpg',
      },
      license: 'CNH123456795',
      vehicle: {
        make: 'Toyota',
        model: 'Yaris',
        year: 2022,
        color: 'Branco',
        licensePlate: 'STU-5G78',
        vehicleType: VehicleType.ECONOMY,
        carImageUrl:
          'https://cdn.imagin.studio/getimage?customer=img&make=toyota&modelFamily=yaris',
      },
      rating: 4.7,
      totalRides: 376,
    },
    {
      personal: {
        firstName: 'Fernanda',
        lastName: 'Alves',
        email: 'fernanda.alves@exemplo.com',
        phone: '+5511987654328',
        gender: Gender.FEMALE,
        profileImage: 'https://randomuser.me/api/portraits/women/68.jpg',
      },
      license: 'CNH123456796',
      vehicle: {
        make: 'Renault',
        model: 'Kwid',
        year: 2023,
        color: 'Prata',
        licensePlate: 'VWX-9H12',
        vehicleType: VehicleType.ECONOMY,
        carImageUrl:
          'https://cdn.imagin.studio/getimage?customer=img&make=renault&modelFamily=kwid',
      },
      rating: 4.5,
      totalRides: 156,
    },
    {
      personal: {
        firstName: 'Marcos',
        lastName: 'Rodrigues',
        email: 'marcos.rodrigues@exemplo.com',
        phone: '+5511987654329',
        gender: Gender.MALE,
        profileImage: 'https://randomuser.me/api/portraits/men/52.jpg',
      },
      license: 'CNH123456797',
      vehicle: {
        make: 'Jeep',
        model: 'Compass',
        year: 2023,
        color: 'Preto',
        licensePlate: 'YZA-3I45',
        vehicleType: VehicleType.SUV,
        carImageUrl:
          'https://cdn.imagin.studio/getimage?customer=img&make=jeep&modelFamily=compass',
      },
      rating: 4.9,
      totalRides: 432,
    },
    {
      personal: {
        firstName: 'Patricia',
        lastName: 'Mendes',
        email: 'patricia.mendes@exemplo.com',
        phone: '+5511987654330',
        gender: Gender.FEMALE,
        profileImage: 'https://randomuser.me/api/portraits/women/91.jpg',
      },
      license: 'CNH123456798',
      vehicle: {
        make: 'Honda',
        model: 'HR-V',
        year: 2023,
        color: 'Branco',
        licensePlate: 'BCD-6J78',
        vehicleType: VehicleType.SUV,
        carImageUrl:
          'https://cdn.imagin.studio/getimage?customer=img&make=honda&modelFamily=hr-v',
      },
      rating: 4.8,
      totalRides: 278,
    },
  ];

  console.log('👤 Criando motoristas em São Paulo...');

  for (let i = 0; i < driversData.length; i++) {
    const driverData = driversData[i];
    const location = saoPauloLocations[i % saoPauloLocations.length];

    // Adicionar pequena variação aleatória para simular movimento real
    const latVariation = (Math.random() - 0.5) * 0.01; // ±0.005 grau
    const lngVariation = (Math.random() - 0.5) * 0.01;

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
            profileImage: driverData.personal.profileImage,
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
            licenseExpiryDate: new Date(2025, 11, 31),
            accountStatus: Status.APPROVED,
            backgroundCheckStatus: Status.APPROVED,
            backgroundCheckDate: new Date(),
            isOnline: Math.random() > 0.2, // 80% online
            isAvailable: Math.random() > 0.3, // 70% disponível
            currentLatitude: location.lat + latVariation,
            currentLongitude: location.lng + lngVariation,
            averageRating: driverData.rating,
            totalRides: driverData.totalRides,
          },
        });

        console.log(
          `🚗 Motorista criado: ${user.firstName} em ${location.name} (${driver.isOnline ? 'Online' : 'Offline'})`,
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
            carImageUrl: driverData.vehicle.carImageUrl,
            inspectionStatus: Status.APPROVED,
            inspectionDate: new Date(),
          },
        });

        console.log(
          `🚙 Veículo criado: ${driverData.vehicle.make} ${driverData.vehicle.model} (${driverData.vehicle.licensePlate})`,
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
  console.log('\n👥 Criando passageiros de exemplo...');

  const passengersData = [
    {
      firstName: 'Lucas',
      lastName: 'Mendes',
      email: 'lucas.mendes@exemplo.com',
      phone: '+5511999888777',
      gender: Gender.MALE,
      profileImage: 'https://randomuser.me/api/portraits/men/86.jpg',
    },
    {
      firstName: 'Juliana',
      lastName: 'Rodrigues',
      email: 'juliana.rodrigues@exemplo.com',
      phone: '+5511999888778',
      gender: Gender.FEMALE,
      profileImage: 'https://randomuser.me/api/portraits/women/79.jpg',
    },
    {
      firstName: 'Rafael',
      lastName: 'Souza',
      email: 'rafael.souza@exemplo.com',
      phone: '+5511999888779',
      gender: Gender.MALE,
      profileImage: 'https://randomuser.me/api/portraits/men/73.jpg',
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
      }
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
  console.log('\n🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
