const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        passenger: true,
        driver: true
      }
    });
    
    console.log(`Total users: ${users.length}`);
    console.log('Users list:');
    users.forEach((user, index) => {
      const role = user.driver ? 'Driver' : user.passenger ? 'Passenger' : 'No role';
      console.log(`${index + 1}. ${user.firstName} ${user.lastName} (${user.email}) - ${role}`);
    });
    
    // Check for specific test users
    const testUsers = [
      'carlos.silva@motorista.com',
      'lucas.silva@exemplo.com'
    ];
    
    testUsers.forEach(email => {
      const user = users.find(u => u.email === email);
      if (user) {
        console.log(`✅ Found: ${email}`);
      } else {
        console.log(`❌ Missing: ${email}`);
      }
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();