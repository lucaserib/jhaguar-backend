import { PrismaClient, RideTypeEnum, VehicleType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚗 Iniciando seed dos tipos de corrida...');

  await prisma.driverRideType.deleteMany({});
  await prisma.rideTypeConfig.deleteMany({});

  console.log('🗑️ Tipos de corrida anteriores removidos');

  const rideTypesConfig = [
    {
      type: RideTypeEnum.STANDARD,
      name: 'Corrida Padrão',
      description: 'Opção econômica e confiável para o dia a dia',
      icon: 'car',
      isActive: true,
      femaleOnly: false,
      requiresArmored: false,
      vehicleTypes: [VehicleType.ECONOMY, VehicleType.COMFORT],
      basePrice: 8.0,
      pricePerKm: 2.5,
      pricePerMinute: 0.5,
      surgeMultiplier: 1.0,
      minimumPrice: 12.0,
    },
    {
      type: RideTypeEnum.FEMALE_ONLY,
      name: 'Mulheres',
      description:
        'Exclusivo para mulheres, com motoristas mulheres verificadas',
      icon: 'female',
      isActive: true,
      femaleOnly: true,
      requiresArmored: false,
      vehicleTypes: [
        VehicleType.ECONOMY,
        VehicleType.COMFORT,
        VehicleType.LUXURY,
      ],
      basePrice: 10.0,
      pricePerKm: 3.0,
      pricePerMinute: 0.6,
      surgeMultiplier: 1.0,
      minimumPrice: 15.0,
    },
    {
      type: RideTypeEnum.LUXURY,
      name: 'Luxo',
      description: 'Viaje com máximo conforto e estilo em veículos premium',
      icon: 'luxury-car',
      isActive: true,
      femaleOnly: false,
      requiresArmored: false,
      vehicleTypes: [VehicleType.LUXURY],
      basePrice: 18.0,
      pricePerKm: 4.0,
      pricePerMinute: 0.8,
      surgeMultiplier: 1.2,
      minimumPrice: 25.0,
    },
    {
      type: RideTypeEnum.ARMORED,
      name: 'Blindado',
      description: 'Máxima segurança com veículos blindados certificados',
      icon: 'shield',
      isActive: true,
      femaleOnly: false,
      requiresArmored: true,
      vehicleTypes: [VehicleType.ARMORED_CAR],
      basePrice: 35.0,
      pricePerKm: 8.0,
      pricePerMinute: 1.5,
      surgeMultiplier: 1.5,
      minimumPrice: 50.0,
    },
    {
      type: RideTypeEnum.DELIVERY,
      name: 'Entrega',
      description: 'Envie e receba encomendas de forma rápida e segura',
      icon: 'package',
      isActive: true,
      femaleOnly: false,
      requiresArmored: false,
      vehicleTypes: [
        VehicleType.ECONOMY,
        VehicleType.COMFORT,
        VehicleType.MOTORCYCLE,
      ],
      basePrice: 6.0,
      pricePerKm: 2.0,
      pricePerMinute: 0.3,
      surgeMultiplier: 1.0,
      minimumPrice: 8.0,
    },
    {
      type: RideTypeEnum.MOTORCYCLE,
      name: 'Moto',
      description: 'Rápido e econômico, ideal para trajetos curtos na cidade',
      icon: 'motorcycle',
      isActive: true,
      femaleOnly: false,
      requiresArmored: false,
      vehicleTypes: [VehicleType.MOTORCYCLE],
      basePrice: 5.0,
      pricePerKm: 1.5,
      pricePerMinute: 0.25,
      surgeMultiplier: 1.0,
      minimumPrice: 7.0,
    },
    {
      type: RideTypeEnum.EXPRESS,
      name: 'Express',
      description: 'Chegue mais rápido ao seu destino com prioridade máxima',
      icon: 'flash',
      isActive: true,
      femaleOnly: false,
      requiresArmored: false,
      vehicleTypes: [VehicleType.COMFORT, VehicleType.LUXURY],
      basePrice: 12.0,
      pricePerKm: 3.5,
      pricePerMinute: 0.7,
      surgeMultiplier: 1.3,
      minimumPrice: 18.0,
    },
    {
      type: RideTypeEnum.SCHEDULED,
      name: 'Agendada',
      description:
        'Agende sua corrida com antecedência para maior tranquilidade',
      icon: 'calendar',
      isActive: true,
      femaleOnly: false,
      requiresArmored: false,
      vehicleTypes: [
        VehicleType.ECONOMY,
        VehicleType.COMFORT,
        VehicleType.LUXURY,
      ],
      basePrice: 10.0,
      pricePerKm: 2.8,
      pricePerMinute: 0.6,
      surgeMultiplier: 1.1,
      minimumPrice: 15.0,
    },
    {
      type: RideTypeEnum.SHARED,
      name: 'Compartilhada',
      description: 'Divida a corrida com outros passageiros e economize',
      icon: 'users',
      isActive: true,
      femaleOnly: false,
      requiresArmored: false,
      vehicleTypes: [VehicleType.ECONOMY, VehicleType.COMFORT],
      basePrice: 6.0,
      pricePerKm: 1.8,
      pricePerMinute: 0.4,
      surgeMultiplier: 0.8,
      minimumPrice: 9.0,
    },
  ];

  console.log('📋 Criando tipos de corrida...');

  for (const config of rideTypesConfig) {
    try {
      const rideType = await prisma.rideTypeConfig.create({
        data: config,
      });

      console.log(`✅ Tipo criado: ${rideType.name} (${rideType.type})`);
    } catch (error) {
      console.error(`❌ Erro ao criar tipo ${config.name}:`, error);
    }
  }

  console.log('\n🔗 Associando tipos aos motoristas existentes...');

  const drivers = await prisma.driver.findMany({
    include: {
      User: {
        select: { gender: true },
      },
      vehicle: {
        select: {
          vehicleType: true,
          isArmored: true,
          isLuxury: true,
          isMotorcycle: true,
        },
      },
    },
  });

  const rideTypes = await prisma.rideTypeConfig.findMany();

  for (const driver of drivers) {
    console.log(`\n🚗 Configurando motorista: ${driver.id}`);

    for (const rideType of rideTypes) {
      try {
        const canOffer = await checkDriverCompatibility(driver, rideType);

        if (canOffer) {
          await prisma.driverRideType.create({
            data: {
              driverId: driver.id,
              rideTypeId: rideType.id,
              isActive: true,
            },
          });

          console.log(`  ✅ Adicionado: ${rideType.name}`);
        } else {
          console.log(`  ⏭️ Pulado: ${rideType.name} (não compatível)`);
        }
      } catch (error) {
        console.log(
          `  ❌ Erro ao adicionar ${rideType.name}: ${error.message}`,
        );
      }
    }
  }

  console.log('\n📊 Estatísticas do Seed:');

  const totalRideTypes = await prisma.rideTypeConfig.count();
  const totalAssociations = await prisma.driverRideType.count();
  const driversWithTypes = await prisma.driver.count({
    where: {
      supportedRideTypes: {
        some: {},
      },
    },
  });

  console.log(`Total de tipos de corrida: ${totalRideTypes}`);
  console.log(`Total de associações criadas: ${totalAssociations}`);
  console.log(`Motoristas com tipos configurados: ${driversWithTypes}`);

  console.log('\n📈 Distribuição por tipo de corrida:');
  for (const rideType of rideTypes) {
    const count = await prisma.driverRideType.count({
      where: { rideTypeId: rideType.id },
    });
    console.log(`  ${rideType.name}: ${count} motoristas`);
  }

  console.log('\n🎉 Seed de tipos de corrida concluído com sucesso!');
}

async function checkDriverCompatibility(
  driver: any,
  rideType: any,
): Promise<boolean> {
  if (rideType.femaleOnly && driver.User?.[0]?.gender !== 'FEMALE') {
    return false;
  }

  if (rideType.requiresArmored && !driver.vehicle?.isArmored) {
    return false;
  }

  if (
    driver.vehicle &&
    !rideType.vehicleTypes.includes(driver.vehicle.vehicleType)
  ) {
    return false;
  }

  switch (rideType.type) {
    case RideTypeEnum.LUXURY:
      return (
        driver.vehicle?.vehicleType === VehicleType.LUXURY ||
        driver.vehicle?.isLuxury
      );

    case RideTypeEnum.MOTORCYCLE:
      return (
        driver.vehicle?.vehicleType === VehicleType.MOTORCYCLE ||
        driver.vehicle?.isMotorcycle
      );

    case RideTypeEnum.ARMORED:
      return driver.vehicle?.isArmored;

    default:
      return true;
  }
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed de tipos de corrida:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
