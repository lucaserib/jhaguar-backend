import { PrismaClient, Gender, Status, VehicleType, RideTypeEnum } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed LIMPO para funcionalidade REAL...');

  // ==================== LIMPEZA COMPLETA ====================
  console.log('🧹 Limpando banco de dados...');
  
  // Deletar em ordem reversa às dependências
  await prisma.rideStatusHistory.deleteMany();
  await prisma.rideLocation.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.ride.deleteMany();
  await prisma.rideRequest.deleteMany();
  await prisma.driverRideType.deleteMany();
  await prisma.driverLocation.deleteMany();
  await prisma.driverDocument.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.userWallet.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.passenger.deleteMany();
  await prisma.rideTypeConfig.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Banco de dados limpo');

  // ==================== TIPOS DE CORRIDA ====================
  console.log('📋 Criando tipos de corrida...');

  const rideTypes = [
    {
      type: RideTypeEnum.NORMAL,
      name: 'Normal',
      description: 'Opção econômica e confiável para o dia a dia.',
      icon: 'car-sport',
      vehicleTypes: [VehicleType.ECONOMY, VehicleType.COMFORT],
      basePrice: 8.0,
      pricePerKm: 2.2,
      pricePerMin: 0.35,
      minimumPrice: 12.0,
      priority: 1,
      isActive: true,
    },
    {
      type: RideTypeEnum.EXECUTIVO,
      name: 'Executivo',
      description: 'Maior conforto com veículos premium.',
      icon: 'car',
      vehicleTypes: [VehicleType.LUXURY, VehicleType.SUV],
      basePrice: 12.0,
      pricePerKm: 3.2,
      pricePerMin: 0.55,
      minimumPrice: 18.0,
      priority: 2,
      isActive: true,
    },
    {
      type: RideTypeEnum.MULHER,
      name: 'Mulher',
      description: 'Exclusivo para mulheres com motoristas mulheres.',
      icon: 'woman',
      femaleOnly: true,
      vehicleTypes: [VehicleType.ECONOMY, VehicleType.COMFORT],
      basePrice: 9.0,
      pricePerKm: 2.4,
      pricePerMin: 0.4,
      minimumPrice: 13.0,
      priority: 3,
      isActive: true,
    },
    {
      type: RideTypeEnum.PET,
      name: 'Pet',
      description: 'Transporte seguro para você e seu pet.',
      icon: 'paw',
      requiresPetFriendly: true,
      vehicleTypes: [VehicleType.ECONOMY, VehicleType.COMFORT, VehicleType.SUV],
      basePrice: 10.0,
      pricePerKm: 2.6,
      pricePerMin: 0.42,
      minimumPrice: 15.0,
      priority: 4,
      isActive: true,
    },
    {
      type: RideTypeEnum.MOTO,
      name: 'Moto',
      description: 'Rápido e econômico para trajetos curtos.',
      icon: 'bicycle',
      allowMotorcycle: true,
      vehicleTypes: [VehicleType.MOTORCYCLE],
      basePrice: 5.0,
      pricePerKm: 1.5,
      pricePerMin: 0.25,
      minimumPrice: 8.0,
      priority: 5,
      isActive: true,
    },
    {
      type: RideTypeEnum.BLINDADO,
      name: 'Blindado',
      description: 'Máxima segurança com veículos blindados.',
      icon: 'shield-car',
      requiresArmored: true,
      vehicleTypes: [VehicleType.LUXURY, VehicleType.SUV],
      basePrice: 25.0,
      pricePerKm: 4.5,
      pricePerMin: 0.8,
      minimumPrice: 35.0,
      priority: 6,
      isActive: true,
    },
  ];

  for (const rideType of rideTypes) {
    await prisma.rideTypeConfig.create({ data: rideType });
  }

  console.log(`✅ ${rideTypes.length} tipos de corrida criados`);

  // ==================== USUÁRIOS PASSAGEIROS ====================
  console.log('👥 Criando passageiros de exemplo...');

  const passengersData = [
    {
      firstName: 'Lucas',
      lastName: 'Silva',
      email: 'lucas.silva@exemplo.com',
      phone: '+5517999000001',
      gender: Gender.MALE,
    },
    {
      firstName: 'Ana',
      lastName: 'Costa',
      email: 'ana.costa@exemplo.com',
      phone: '+5517999000002',
      gender: Gender.FEMALE,
    },
    {
      firstName: 'Pedro',
      lastName: 'Santos',
      email: 'pedro.santos@exemplo.com',
      phone: '+5517999000003',
      gender: Gender.MALE,
    },
  ];

  const hashedPassword = await bcrypt.hash('123456', 10);

  for (const passengerData of passengersData) {
    const user = await prisma.user.create({
      data: {
        ...passengerData,
        password: hashedPassword,
        isVerified: true,
      },
    });

    await prisma.passenger.create({
      data: { userId: user.id },
    });

    // Criar carteira para o passageiro
    await prisma.userWallet.create({
      data: {
        userId: user.id,
        balance: 50.0, // Saldo inicial para testes
        currency: 'BRL',
      },
    });

    console.log(`✅ Passageiro criado: ${user.firstName} ${user.lastName}`);
  }

  // ==================== MOTORISTAS REAIS ====================
  console.log('🚗 Criando motoristas para Fernandópolis-SP...');

  // Localizações base em Fernandópolis
  const fernandopolisLocations = [
    { name: 'Centro', lat: -20.2834, lng: -50.2466 },
    { name: 'Jardim Universitário', lat: -20.2953, lng: -50.2658 },
    { name: 'Jardim América', lat: -20.289, lng: -50.252 },
    { name: 'Vila Donata', lat: -20.278, lng: -50.238 },
    { name: 'Jardim Santa Rita', lat: -20.292, lng: -50.241 },
    { name: 'Parque Universitário', lat: -20.295, lng: -50.265 },
    { name: 'Jardim Araguaia', lat: -20.287, lng: -50.259 },
    { name: 'Vila São José', lat: -20.276, lng: -50.255 },
  ];

  const driversData = [
    // MOTORISTAS NORMAIS
    {
      personal: {
        firstName: 'Carlos',
        lastName: 'Silva',
        email: 'carlos.silva@motorista.com',
        phone: '+5517981000001',
        gender: Gender.MALE,
        profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      license: 'CNH001',
      vehicle: {
        make: 'Toyota',
        model: 'Corolla',
        year: 2022,
        color: 'Prata',
        licensePlate: 'FND-1A01',
        vehicleType: VehicleType.COMFORT,
        carImageUrl: 'https://cdn.imagin.studio/getimage?customer=img&make=toyota&modelFamily=corolla',
      },
      rating: 4.8,
      totalRides: 145,
      specialties: ['NORMAL'],
    },
    {
      personal: {
        firstName: 'Roberto',
        lastName: 'Santos',
        email: 'roberto.santos@motorista.com',
        phone: '+5517981000002',
        gender: Gender.MALE,
        profileImage: 'https://randomuser.me/api/portraits/men/25.jpg',
      },
      license: 'CNH002',
      vehicle: {
        make: 'Volkswagen',
        model: 'Gol',
        year: 2021,
        color: 'Branco',
        licensePlate: 'FND-2B02',
        vehicleType: VehicleType.ECONOMY,
        carImageUrl: 'https://cdn.imagin.studio/getimage?customer=img&make=volkswagen&modelFamily=gol',
      },
      rating: 4.6,
      totalRides: 89,
      specialties: ['NORMAL'],
    },

    // MOTORISTAS MULHERES
    {
      personal: {
        firstName: 'Maria',
        lastName: 'Oliveira',
        email: 'maria.oliveira@motorista.com',
        phone: '+5517981000003',
        gender: Gender.FEMALE,
        profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      license: 'CNH003',
      vehicle: {
        make: 'Honda',
        model: 'Civic',
        year: 2023,
        color: 'Branco',
        licensePlate: 'FND-3C03',
        vehicleType: VehicleType.COMFORT,
        carImageUrl: 'https://cdn.imagin.studio/getimage?customer=img&make=honda&modelFamily=civic',
        isPetFriendly: true,
      },
      rating: 4.9,
      totalRides: 234,
      specialties: ['NORMAL', 'MULHER', 'PET'],
    },
    {
      personal: {
        firstName: 'Ana',
        lastName: 'Ferreira',
        email: 'ana.ferreira@motorista.com',
        phone: '+5517981000004',
        gender: Gender.FEMALE,
        profileImage: 'https://randomuser.me/api/portraits/women/68.jpg',
      },
      license: 'CNH004',
      vehicle: {
        make: 'Hyundai',
        model: 'HB20',
        year: 2022,
        color: 'Rosa',
        licensePlate: 'FND-4D04',
        vehicleType: VehicleType.ECONOMY,
        carImageUrl: 'https://cdn.imagin.studio/getimage?customer=img&make=hyundai&modelFamily=hb20',
      },
      rating: 4.7,
      totalRides: 156,
      specialties: ['NORMAL', 'MULHER'],
    },

    // MOTORISTA EXECUTIVO
    {
      personal: {
        firstName: 'Paulo',
        lastName: 'Rodriguez',
        email: 'paulo.rodriguez@motorista.com',
        phone: '+5517981000005',
        gender: Gender.MALE,
        profileImage: 'https://randomuser.me/api/portraits/men/55.jpg',
      },
      license: 'CNH005',
      vehicle: {
        make: 'BMW',
        model: '320i',
        year: 2024,
        color: 'Preto',
        licensePlate: 'FND-5E05',
        vehicleType: VehicleType.LUXURY,
        carImageUrl: 'https://cdn.imagin.studio/getimage?customer=img&make=bmw&modelFamily=320i',
        isLuxury: true,
      },
      rating: 4.9,
      totalRides: 98,
      specialties: ['EXECUTIVO'],
    },

    // MOTORISTA MOTO
    {
      personal: {
        firstName: 'João',
        lastName: 'Pereira',
        email: 'joao.pereira@motorista.com',
        phone: '+5517981000006',
        gender: Gender.MALE,
        profileImage: 'https://randomuser.me/api/portraits/men/15.jpg',
      },
      license: 'CNH006',
      vehicle: {
        make: 'Honda',
        model: 'PCX 160',
        year: 2023,
        color: 'Vermelho',
        licensePlate: 'FND-6F06',
        vehicleType: VehicleType.MOTORCYCLE,
        carImageUrl: 'https://cdn.imagin.studio/getimage?customer=img&make=honda&modelFamily=pcx',
        isMotorcycle: true,
      },
      rating: 4.5,
      totalRides: 67,
      specialties: ['MOTO'],
    },

    // MOTORISTA PET-FRIENDLY
    {
      personal: {
        firstName: 'Juliana',
        lastName: 'Costa',
        email: 'juliana.costa@motorista.com',
        phone: '+5517981000007',
        gender: Gender.FEMALE,
        profileImage: 'https://randomuser.me/api/portraits/women/75.jpg',
      },
      license: 'CNH007',
      vehicle: {
        make: 'Volkswagen',
        model: 'Tiguan',
        year: 2023,
        color: 'Cinza',
        licensePlate: 'FND-7G07',
        vehicleType: VehicleType.SUV,
        carImageUrl: 'https://cdn.imagin.studio/getimage?customer=img&make=volkswagen&modelFamily=tiguan',
        isPetFriendly: true,
      },
      rating: 4.8,
      totalRides: 123,
      specialties: ['NORMAL', 'PET', 'MULHER'],
    },

    // MOTORISTA BLINDADO
    {
      personal: {
        firstName: 'Sérgio',
        lastName: 'Lima',
        email: 'sergio.lima@motorista.com',
        phone: '+5517981000008',
        gender: Gender.MALE,
        profileImage: 'https://randomuser.me/api/portraits/men/62.jpg',
      },
      license: 'CNH008',
      vehicle: {
        make: 'Audi',
        model: 'A4 Blindado',
        year: 2024,
        color: 'Preto',
        licensePlate: 'FND-8H08',
        vehicleType: VehicleType.LUXURY,
        carImageUrl: 'https://cdn.imagin.studio/getimage?customer=img&make=audi&modelFamily=a4',
        isArmored: true,
        isLuxury: true,
      },
      rating: 4.9,
      totalRides: 45,
      specialties: ['BLINDADO', 'EXECUTIVO'],
    },
  ];

  // Criar motoristas
  for (let i = 0; i < driversData.length; i++) {
    const driverData = driversData[i];
    const location = fernandopolisLocations[i % fernandopolisLocations.length];

    // Adicionar pequena variação na localização
    const latVariation = (Math.random() - 0.5) * 0.005;
    const lngVariation = (Math.random() - 0.5) * 0.005;

    try {
      // Criar usuário
      const user = await prisma.user.create({
        data: {
          ...driverData.personal,
          password: hashedPassword,
          isVerified: true,
        },
      });

      // Criar motorista
      const driver = await prisma.driver.create({
        data: {
          userId: user.id,
          licenseNumber: driverData.license,
          licenseExpiryDate: new Date(2026, 11, 31),
          accountStatus: Status.APPROVED,
          backgroundCheckStatus: Status.APPROVED,
          backgroundCheckDate: new Date(),
          isOnline: true,
          isAvailable: true,
          currentLatitude: location.lat + latVariation,
          currentLongitude: location.lng + lngVariation,
          lastLocationUpdate: new Date(),
          averageRating: driverData.rating,
          totalRides: driverData.totalRides,
          acceptsFemaleOnly: driverData.personal.gender === Gender.FEMALE,
          isPetFriendly: driverData.vehicle.isPetFriendly || false,
        },
      });

      // Criar veículo
      await prisma.vehicle.create({
        data: {
          driverId: driver.id,
          make: driverData.vehicle.make,
          model: driverData.vehicle.model,
          year: driverData.vehicle.year,
          color: driverData.vehicle.color,
          licensePlate: driverData.vehicle.licensePlate,
          registrationExpiryDate: new Date(2026, 11, 31),
          insuranceExpiryDate: new Date(2026, 11, 31),
          vehicleType: driverData.vehicle.vehicleType,
          capacity: driverData.vehicle.isMotorcycle ? 2 : 4,
          accessibility: false,
          carImageUrl: driverData.vehicle.carImageUrl,
          inspectionStatus: Status.APPROVED,
          inspectionDate: new Date(),
          isArmored: driverData.vehicle.isArmored || false,
          isLuxury: driverData.vehicle.isLuxury || false,
          isMotorcycle: driverData.vehicle.isMotorcycle || false,
          isPetFriendly: driverData.vehicle.isPetFriendly || false,
          features: [],
        },
      });

      // Associar tipos de corrida
      for (const specialty of driverData.specialties) {
        const rideType = await prisma.rideTypeConfig.findFirst({
          where: { type: specialty as RideTypeEnum },
        });

        if (rideType) {
          await prisma.driverRideType.create({
            data: {
              driverId: driver.id,
              rideTypeId: rideType.id,
              isActive: true,
            },
          });
        }
      }

      console.log(`✅ Motorista criado: ${user.firstName} ${user.lastName} em ${location.name}`);
    } catch (error) {
      console.error(`❌ Erro ao criar motorista ${driverData.personal.firstName}:`, error);
    }
  }

  // ==================== ESTATÍSTICAS FINAIS ====================
  const totalDrivers = await prisma.driver.count();
  const onlineDrivers = await prisma.driver.count({
    where: { isOnline: true },
  });
  const availableDrivers = await prisma.driver.count({
    where: { isOnline: true, isAvailable: true },
  });
  const totalPassengers = await prisma.passenger.count();
  const totalRideTypes = await prisma.rideTypeConfig.count();
  const totalAssociations = await prisma.driverRideType.count();

  console.log('\n📊 Estatísticas do Seed PRODUÇÃO:');
  console.log(`🚗 Total de motoristas: ${totalDrivers}`);
  console.log(`🟢 Motoristas online: ${onlineDrivers}`);
  console.log(`✅ Motoristas disponíveis: ${availableDrivers}`);
  console.log(`👥 Total de passageiros: ${totalPassengers}`);
  console.log(`📋 Tipos de corrida: ${totalRideTypes}`);
  console.log(`🔗 Associações driver-tipo: ${totalAssociations}`);
  console.log('\n🎉 Seed LIMPO concluído com sucesso!');
  console.log('🚀 Sistema pronto para funcionalidade REAL - SEM SIMULAÇÕES!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
