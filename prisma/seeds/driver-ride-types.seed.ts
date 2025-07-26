import { PrismaClient, RideTypeEnum } from '@prisma/client';

export async function seedDriverRideTypes(prisma: PrismaClient): Promise<void> {
  console.log('Seeding driver ride type associations...');

  const associations = {
    'motorista.aprovado@test.com': [RideTypeEnum.NORMAL, RideTypeEnum.PET],
    'motorista.mulher@test.com': [
      RideTypeEnum.NORMAL,
      RideTypeEnum.MULHER,
      RideTypeEnum.PET,
    ],
    'motorista.moto@test.com': [RideTypeEnum.MOTO, RideTypeEnum.DELIVERY],
    'motorista.blindado@test.com': [
      RideTypeEnum.EXECUTIVO,
      RideTypeEnum.BLINDADO,
    ],
  };

  for (const email in associations) {
    const driver = await prisma.driver.findFirst({
      where: { user: { email } },
    });
    if (driver) {
      for (const rideType of associations[email]) {
        const rt = await prisma.rideTypeConfig.findUnique({
          where: { type: rideType },
        });
        if (rt) {
          await prisma.driverRideType.upsert({
            where: {
              driverId_rideTypeId: { driverId: driver.id, rideTypeId: rt.id },
            },
            update: {},
            create: { driverId: driver.id, rideTypeId: rt.id },
          });
        }
      }
    }
  }
  console.log('Driver ride types seeded successfully.');
}
