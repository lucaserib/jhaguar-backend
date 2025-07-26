import { PrismaClient } from '@prisma/client';
import { seedRideTypes } from './seeds/ride-types.seed';
import { seedUsersAndProfiles } from './seeds/users-and-profiles.seed';
import { seedVehicles } from './seeds/vehicles.seed';
import { seedDriverRideTypes } from './seeds/driver-ride-types.seed';
const prisma = new PrismaClient();

async function main() {
  console.log('Starting the seeding process...');

  await seedRideTypes(prisma);
  await seedUsersAndProfiles(prisma);
  await seedVehicles(prisma);
  await seedDriverRideTypes(prisma);

  console.log('Full seeding process finished.');
}

main()
  .catch((e) => {
    console.error('An error occurred during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
