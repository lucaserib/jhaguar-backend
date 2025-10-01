const { PrismaClient } = require('@prisma/client');

async function cleanupCompletedRidesWithPendingPayments() {
  const prisma = new PrismaClient();

  try {
    console.log('🧹 Iniciando limpeza de corridas completas com pagamentos pendentes...');

    // Buscar corridas com status COMPLETED mas payment status PENDING
    const problematicRides = await prisma.ride.findMany({
      where: {
        status: 'COMPLETED',
        payment: {
          status: 'PENDING'
        }
      },
      include: {
        passenger: {
          include: { user: true },
        },
        driver: {
          include: { user: true },
        },
        payment: true,
      },
    });

    if (problematicRides.length === 0) {
      console.log('✅ Nenhuma corrida com pagamento pendente encontrada.');
      return {
        success: true,
        clearedRides: 0,
        message: 'Nenhuma corrida problemática encontrada'
      };
    }

    console.log(`⚠️ Encontradas ${problematicRides.length} corridas completas com pagamentos pendentes:`);

    // Mostrar detalhes das corridas que serão corrigidas
    problematicRides.forEach((ride, index) => {
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
      console.log(`     Valor: R$ ${ride.finalPrice || 0}`);
      console.log(`     Payment Status: ${ride.payment?.status || 'NONE'}`);
      console.log(`     Criada há: ${ageMinutes} minutos`);
      console.log('');
    });

    // Executar correção em transação
    const result = await prisma.$transaction(async (tx) => {
      let fixedCount = 0;

      for (const ride of problematicRides) {
        console.log(`🔧 Corrigindo ride ${ride.id}...`);

        // 1. Atualizar status do pagamento para PAID
        if (ride.payment) {
          await tx.payment.update({
            where: { id: ride.payment.id },
            data: {
              status: 'PAID',
              confirmedByDriver: true,
              driverConfirmationTime: new Date(),
              driverNotes: 'Pagamento confirmado automaticamente via cleanup script'
            }
          });
          console.log(`   ✅ Payment status atualizado para PAID`);
        }

        // 2. Se o pagamento foi via carteira, processar transferência automática
        if (ride.payment?.method === 'WALLET_BALANCE' && ride.driver && ride.finalPrice) {
          try {
            // Calcular valores (taxa da plataforma 10%)
            const grossAmount = ride.finalPrice;
            const platformFee = grossAmount * 0.1;
            const netAmount = grossAmount - platformFee;

            console.log(`   💰 Processando transferência automática: R$ ${grossAmount} (líquido: R$ ${netAmount})`);

            // Buscar carteiras
            const passengerWallet = await tx.userWallet.findFirst({
              where: { userId: ride.passenger.userId }
            });

            let driverWallet = await tx.userWallet.findFirst({
              where: { userId: ride.driver.userId }
            });

            if (!driverWallet) {
              // Criar carteira do motorista se não existir
              driverWallet = await tx.userWallet.create({
                data: {
                  userId: ride.driver.userId,
                  balance: 0.0
                }
              });
              console.log(`   📝 Carteira criada para motorista ${ride.driver.userId}`);
            }

            if (passengerWallet && passengerWallet.balance >= grossAmount) {
              // Processar transferência

              // Debitar do passageiro
              await tx.userWallet.update({
                where: { id: passengerWallet.id },
                data: { balance: passengerWallet.balance - grossAmount }
              });

              // Creditar para o motorista (valor líquido)
              await tx.userWallet.update({
                where: { id: driverWallet.id },
                data: { balance: driverWallet.balance + netAmount }
              });

              // Registrar transações
              await tx.transaction.create({
                data: {
                  userId: ride.passenger.userId,
                  walletId: passengerWallet.id,
                  type: 'RIDE_PAYMENT',
                  amount: -grossAmount,
                  status: 'COMPLETED',
                  description: `Pagamento da corrida ${ride.id}`,
                  rideId: ride.id,
                  processedAt: new Date()
                }
              });

              await tx.transaction.create({
                data: {
                  userId: ride.driver.userId,
                  walletId: driverWallet.id,
                  type: 'RIDE_PAYMENT',
                  amount: netAmount,
                  status: 'COMPLETED',
                  description: `Recebimento da corrida ${ride.id} (líquido após taxa)`,
                  rideId: ride.id,
                  processedAt: new Date()
                }
              });

              // Registrar taxa da plataforma
              await tx.transaction.create({
                data: {
                  userId: ride.driver.userId,
                  walletId: driverWallet.id,
                  type: 'CANCELLATION_FEE',
                  amount: -platformFee,
                  status: 'COMPLETED',
                  description: `Taxa da plataforma (10%) - Corrida ${ride.id}`,
                  rideId: ride.id,
                  processedAt: new Date()
                }
              });

              console.log(`   ✅ Transferência processada: -R$${grossAmount} (passageiro) +R$${netAmount} (motorista)`);
            } else {
              console.log(`   ⚠️ Saldo insuficiente para transferência automática`);
            }
          } catch (transferError) {
            console.log(`   ❌ Erro na transferência: ${transferError.message}`);
          }
        }

        // 3. Marcar motorista como disponível
        if (ride.driver) {
          await tx.driver.update({
            where: { id: ride.driver.id },
            data: {
              isAvailable: true,
              isActiveTrip: false,
            },
          });
          console.log(`   ✅ Motorista ${ride.driver.id} marcado como disponível`);
        }

        fixedCount++;
        console.log(`   ✅ Ride ${ride.id} corrigida com sucesso\n`);
      }

      return fixedCount;
    });

    console.log('✅ Limpeza concluída com sucesso!');
    console.log(`📊 Resumo: ${result} corridas corrigidas`);

    return {
      success: true,
      clearedRides: result,
      details: problematicRides.map(ride => ({
        id: ride.id,
        passengerName: ride.passenger?.user?.firstName || 'N/A',
        driverName: ride.driver?.user?.firstName || 'N/A',
        amount: ride.finalPrice || 0,
        paymentMethod: ride.payment?.method || 'N/A'
      }))
    };

  } catch (error) {
    console.error('❌ Erro durante a limpeza:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Função para buscar informações específicas de uma ride
async function inspectRide(rideId) {
  const prisma = new PrismaClient();

  try {
    console.log(`🔍 Inspecionando ride ${rideId}...`);

    const ride = await prisma.ride.findUnique({
      where: { id: rideId },
      include: {
        passenger: {
          include: {
            user: {
              include: { wallet: true }
            }
          }
        },
        driver: {
          include: {
            user: {
              include: { wallet: true }
            }
          }
        },
        payment: true,
      },
    });

    if (!ride) {
      console.log(`❌ Ride ${rideId} não encontrada`);
      return;
    }

    console.log('\n📋 DETALHES DA RIDE:');
    console.log(`   ID: ${ride.id}`);
    console.log(`   Status: ${ride.status}`);
    console.log(`   Origem: ${ride.originAddress}`);
    console.log(`   Destino: ${ride.destinationAddress}`);
    console.log(`   Valor: R$ ${ride.finalPrice || 0}`);
    console.log(`   Criada: ${ride.createdAt}`);
    console.log(`   Completada: ${ride.dropOffTime || 'N/A'}`);

    console.log('\n👤 PASSAGEIRO:');
    console.log(`   Nome: ${ride.passenger?.user?.firstName} ${ride.passenger?.user?.lastName}`);
    console.log(`   User ID: ${ride.passenger?.userId}`);
    console.log(`   Saldo carteira: R$ ${ride.passenger?.user?.wallet?.balance || 0}`);

    if (ride.driver) {
      console.log('\n🚗 MOTORISTA:');
      console.log(`   Nome: ${ride.driver.user?.firstName} ${ride.driver.user?.lastName}`);
      console.log(`   User ID: ${ride.driver.userId}`);
      console.log(`   Saldo carteira: R$ ${ride.driver.user?.wallet?.balance || 0}`);
      console.log(`   Disponível: ${ride.driver.isAvailable}`);
      console.log(`   Em corrida: ${ride.driver.isActiveTrip}`);
    }

    if (ride.payment) {
      console.log('\n💳 PAGAMENTO:');
      console.log(`   Status: ${ride.payment.status}`);
      console.log(`   Método: ${ride.payment.method}`);
      console.log(`   Valor: R$ ${ride.payment.amount}`);
      console.log(`   Confirmado pelo motorista: ${ride.payment.confirmedByDriver}`);
      console.log(`   Data confirmação: ${ride.payment.driverConfirmationTime || 'N/A'}`);
      console.log(`   Notas: ${ride.payment.driverNotes || 'N/A'}`);
    } else {
      console.log('\n💳 PAGAMENTO: Nenhum registro encontrado');
    }

    // Buscar transações relacionadas
    const transactions = await prisma.transaction.findMany({
      where: { rideId },
      orderBy: { createdAt: 'desc' }
    });

    if (transactions.length > 0) {
      console.log('\n💱 TRANSAÇÕES:');
      transactions.forEach((tx, index) => {
        console.log(`   ${index + 1}. ${tx.type} - R$ ${tx.amount} (${tx.status})`);
        console.log(`      Descrição: ${tx.description}`);
        console.log(`      Data: ${tx.createdAt}`);
        console.log('');
      });
    } else {
      console.log('\n💱 TRANSAÇÕES: Nenhuma encontrada');
    }

  } catch (error) {
    console.error('❌ Erro ao inspecionar ride:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Função principal que permite execução com argumentos
async function main() {
  const args = process.argv.slice(2);

  if (args.length > 0 && args[0] === 'inspect') {
    if (args[1]) {
      await inspectRide(args[1]);
    } else {
      console.log('❌ Uso: node cleanup-completed-rides.js inspect <ride-id>');
    }
  } else {
    await cleanupCompletedRidesWithPendingPayments();
  }
}

// Executar o script
if (require.main === module) {
  main()
    .then(() => {
      console.log('🎉 Script executado com sucesso!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Falha na execução do script:', error);
      process.exit(1);
    });
}

module.exports = {
  cleanupCompletedRidesWithPendingPayments,
  inspectRide
};