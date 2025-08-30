const { PrismaClient } = require('@prisma/client');

async function cleanupActiveRides() {
  const prisma = new PrismaClient();

  try {
    console.log('🧹 Iniciando limpeza de corridas em andamento...');

    // Buscar todas as corridas ativas (não finalizadas)
    const activeRides = await prisma.ride.findMany({
      where: {
        status: {
          in: ['REQUESTED', 'ACCEPTED', 'IN_PROGRESS'],
        },
      },
      include: {
        passenger: {
          include: { user: true },
        },
        driver: {
          include: { user: true },
        },
      },
    });

    if (activeRides.length === 0) {
      console.log('✅ Nenhuma corrida ativa encontrada.');
      return;
    }

    console.log(`⚠️ Encontradas ${activeRides.length} corridas ativas:`);

    // Mostrar detalhes das corridas que serão removidas
    activeRides.forEach((ride, index) => {
      const passengerName = ride.passenger?.user?.firstName || 'Desconhecido';
      const driverName = ride.driver?.user?.firstName || 'Não atribuído';
      const ageMinutes = Math.floor(
        (Date.now() - ride.createdAt.getTime()) / (1000 * 60),
      );

      console.log(
        `  ${index + 1}. Ride ${ride.id.slice(0, 8)}... - Status: ${ride.status}`,
      );
      console.log(
        `     Passageiro: ${passengerName} | Motorista: ${driverName}`,
      );
      console.log(`     Origem: ${ride.originAddress}`);
      console.log(`     Destino: ${ride.destinationAddress}`);
      console.log(`     Criada há: ${ageMinutes} minutos`);
      console.log('');
    });

    // Executar limpeza em transação
    await prisma.$transaction(async (tx) => {
      const rideIds = activeRides.map((r) => r.id);

      console.log('🗑️ Removendo dados relacionados...');

      // 1. Remover histórico de status das rides
      const deletedStatusHistory = await tx.rideStatusHistory.deleteMany({
        where: { rideId: { in: rideIds } },
      });
      console.log(
        `   - ${deletedStatusHistory.count} registros de histórico de status removidos`,
      );

      // 2. Remover pagamentos relacionados
      const deletedPayments = await tx.payment.deleteMany({
        where: { rideId: { in: rideIds } },
      });
      console.log(
        `   - ${deletedPayments.count} registros de pagamento removidos`,
      );

      // 3. Remover localizações da corrida
      const deletedLocations = await tx.rideLocation.deleteMany({
        where: { rideId: { in: rideIds } },
      });
      console.log(
        `   - ${deletedLocations.count} registros de localização removidos`,
      );

      // 4. Remover transações relacionadas às rides
      const deletedTransactions = await tx.transaction.deleteMany({
        where: { rideId: { in: rideIds } },
      });
      console.log(`   - ${deletedTransactions.count} transações removidas`);

      // 5. Finalmente, remover as corridas
      const deletedRides = await tx.ride.deleteMany({
        where: { id: { in: rideIds } },
      });
      console.log(`   - ${deletedRides.count} corridas removidas`);

      // 6. Atualizar status dos motoristas (torná-los disponíveis novamente)
      const driverIds = activeRides.map((r) => r.driverId).filter(Boolean); // Remove valores null/undefined

      if (driverIds.length > 0) {
        const updatedDrivers = await tx.driver.updateMany({
          where: { id: { in: driverIds } },
          data: {
            isAvailable: true,
            isActiveTrip: false,
          },
        });
        console.log(
          `   - ${updatedDrivers.count} motoristas foram marcados como disponíveis novamente`,
        );
      }
    });

    console.log('✅ Limpeza concluída com sucesso!');
    console.log(
      `📊 Resumo: ${activeRides.length} corridas ativas foram removidas`,
    );
  } catch (error) {
    console.error('❌ Erro durante a limpeza:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar o script
cleanupActiveRides()
  .then(() => {
    console.log('🎉 Script executado com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Falha na execução do script:', error);
    process.exit(1);
  });
