import { PrismaClient } from '@prisma/client';
import { seedRideTypes } from './seeds/ride-types.seed';

const prisma = new PrismaClient();

/**
 * Seed limpo para desenvolvimento - sem dados mockados
 * Este seed cria apenas os tipos de corrida necessários
 * sem criar usuários ou motoristas de teste que podem
 * aparecer no mapa
 */
async function main() {
  console.log('Starting clean seeding process...');
  
  // Limpar dados de desenvolvimento/teste que podem estar poluindo
  console.log('Cleaning up test data...');
  
  // Remover motoristas de teste que podem estar aparecendo no mapa
  await prisma.driver.deleteMany({
    where: {
      user: {
        email: {
          contains: '@test.com'
        }
      }
    }
  });
  
  // Remover usuários de teste
  await prisma.user.deleteMany({
    where: {
      email: {
        contains: '@test.com'
      }
    }
  });
  
  // Criar apenas tipos de corrida
  await seedRideTypes(prisma);
  
  console.log('Clean seeding process finished.');
  console.log('✅ Removed test users and drivers from database');
  console.log('✅ Only ride types were seeded');
}

main()
  .catch((e) => {
    console.error('An error occurred during clean seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });