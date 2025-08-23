const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkCompleteDB() {
  try {
    // Verificar usuários
    const users = await prisma.user.count();
    console.log(`👥 Total users: ${users}`);
    
    // Verificar motoristas
    const drivers = await prisma.driver.count();
    console.log(`🚗 Total drivers: ${drivers}`);
    
    // Verificar passageiros
    const passengers = await prisma.passenger.count();
    console.log(`🧑‍💼 Total passengers: ${passengers}`);
    
    // Verificar veículos
    const vehicles = await prisma.vehicle.count();
    console.log(`🚙 Total vehicles: ${vehicles}`);
    
    // Verificar tipos de corrida
    const rideTypes = await prisma.rideTypeConfig.count();
    console.log(`📋 Total ride types: ${rideTypes}`);
    
    // Verificar associações driver-ride-types
    const driverRideTypes = await prisma.driverRideType.count();
    console.log(`🔗 Driver-RideType associations: ${driverRideTypes}`);
    
    // Verificar corridas existentes
    const rides = await prisma.ride.count();
    console.log(`🛣️ Total rides: ${rides}`);
    
    // Verificar dados específicos do motorista
    const driverDetails = await prisma.driver.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        },
        vehicle: true,
        driverRideTypes: {
          include: {
            rideType: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });
    
    console.log('\n🔍 Driver Details:');
    driverDetails.forEach(driver => {
      console.log(`  - ${driver.user.firstName} ${driver.user.lastName} (${driver.user.email})`);
      console.log(`    Status: ${driver.accountStatus}`);
      console.log(`    Online: ${driver.isOnline}`);
      console.log(`    Available: ${driver.isAvailable}`);
      console.log(`    Location: ${driver.currentLatitude}, ${driver.currentLongitude}`);
      console.log(`    Vehicle: ${driver.vehicle?.make} ${driver.vehicle?.model} (${driver.vehicle?.licensePlate})`);
      console.log(`    Ride Types: ${driver.driverRideTypes.map(drt => drt.rideType.name).join(', ')}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCompleteDB();