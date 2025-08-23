const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkDrivers() {
  try {
    const drivers = await prisma.driver.findMany({
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          }
        }
      }
    });
    
    console.log(`Total drivers: ${drivers.length}`);
    console.log('Drivers list:');
    drivers.forEach((driver, index) => {
      console.log(`${index + 1}. ${driver.user.firstName} ${driver.user.lastName} (${driver.user.email})`);
    });
    
    // Check specifically for test users
    const testDrivers = drivers.filter(d => d.user.email.includes('@test.com'));
    console.log(`\nTest drivers: ${testDrivers.length}`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDrivers();