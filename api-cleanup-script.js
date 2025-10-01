const axios = require('axios');
const readline = require('readline');

// Configuration
const API_BASE_URL = 'http://192.168.100.111:3000'; // Backend URL from CLAUDE.md
const API_TIMEOUT = 30000; // 30 seconds

class RideCleanupAPI {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.authToken = null;
    this.axios = axios.create({
      baseURL: baseUrl,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Add request interceptor to include auth token
    this.axios.interceptors.request.use((config) => {
      if (this.authToken) {
        config.headers.Authorization = `Bearer ${this.authToken}`;
      }
      return config;
    });
  }

  // Prompt for user credentials
  async promptCredentials() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      rl.question('Enter email: ', (email) => {
        rl.question('Enter password: ', (password) => {
          rl.close();
          resolve({ email, password });
        });
      });
    });
  }

  // Authenticate with the API
  async authenticate(email, password) {
    try {
      console.log('🔐 Authenticating...');
      const response = await this.axios.post('/auth/login', {
        email,
        password
      });

      if (response.data.success && response.data.data.accessToken) {
        this.authToken = response.data.data.accessToken;
        console.log('✅ Authentication successful');
        return true;
      } else {
        console.log('❌ Authentication failed');
        return false;
      }
    } catch (error) {
      console.error('❌ Authentication error:', error.response?.data?.message || error.message);
      return false;
    }
  }

  // Check pending rides using existing endpoint
  async checkPendingRides() {
    try {
      console.log('🔍 Checking pending rides...');
      const response = await this.axios.get('/rides/status/pending');

      if (response.data.success) {
        const rides = response.data.data.rides;
        console.log(`📊 Found ${rides.length} pending rides:`);

        rides.forEach((ride, index) => {
          console.log(`  ${index + 1}. ${ride.id} - ${ride.status} (${ride.ageMinutes}min old)`);
          console.log(`     Passenger: ${ride.passengerName}`);
          console.log(`     Origin: ${ride.origin}`);
          console.log('');
        });

        return rides;
      }
    } catch (error) {
      console.error('❌ Error checking pending rides:', error.response?.data?.message || error.message);
      return [];
    }
  }

  // Cleanup orphaned rides using existing endpoint
  async cleanupOrphanedRides() {
    try {
      console.log('🧹 Cleaning up orphaned rides...');
      const response = await this.axios.post('/rides/cleanup/orphaned');

      if (response.data.success) {
        console.log('✅ Orphaned rides cleanup completed');
        console.log(`📊 Cleared ${response.data.data.clearedRides} rides`);
        console.log(`⏰ Oldest ride age: ${response.data.data.oldestRideAge || 'N/A'}`);

        if (response.data.data.details) {
          console.log('\n📋 Cleaned rides:');
          response.data.data.details.forEach((detail, index) => {
            console.log(`  ${index + 1}. ${detail.id} - ${detail.status} (${detail.ageMinutes}min)`);
            console.log(`     Passenger: ${detail.passengerName}`);
          });
        }

        return response.data.data;
      }
    } catch (error) {
      console.error('❌ Error cleaning orphaned rides:', error.response?.data?.message || error.message);
      return null;
    }
  }

  // Get specific ride details
  async getRideDetails(rideId) {
    try {
      console.log(`🔍 Getting details for ride ${rideId}...`);
      const response = await this.axios.get(`/rides/${rideId}`);

      if (response.data.success) {
        const ride = response.data.data;
        console.log('\n📋 RIDE DETAILS:');
        console.log(`   ID: ${ride.id}`);
        console.log(`   Status: ${ride.status}`);
        console.log(`   Origin: ${ride.originAddress}`);
        console.log(`   Destination: ${ride.destinationAddress}`);
        console.log(`   Price: R$ ${ride.estimatedPrice || 0}`);
        console.log(`   Created: ${ride.createdAt}`);

        if (ride.driver) {
          console.log(`   Driver: ${ride.driver.user?.firstName} ${ride.driver.user?.lastName}`);
        }

        if (ride.passenger) {
          console.log(`   Passenger: ${ride.passenger.user?.firstName} ${ride.passenger.user?.lastName}`);
        }

        return ride;
      }
    } catch (error) {
      console.error('❌ Error getting ride details:', error.response?.data?.message || error.message);
      return null;
    }
  }

  // Get payment status for a ride
  async getRidePaymentStatus(rideId) {
    try {
      console.log(`💳 Getting payment status for ride ${rideId}...`);
      const response = await this.axios.get(`/payments/ride/${rideId}/status`);

      if (response.data.success) {
        const payment = response.data.data;
        console.log('\n💳 PAYMENT STATUS:');
        console.log(`   Status: ${payment.paymentStatus}`);
        console.log(`   Method: ${payment.method || 'N/A'}`);
        console.log(`   Amount: R$ ${payment.amount || 0}`);
        console.log(`   Confirmed by driver: ${payment.confirmedByDriver}`);
        console.log(`   Required action: ${payment.requiresAction || 'None'}`);

        if (payment.transfers && payment.transfers.length > 0) {
          console.log('\n💱 TRANSFERS:');
          payment.transfers.forEach((transfer, index) => {
            console.log(`   ${index + 1}. ${transfer.type} - R$ ${transfer.amount} (${transfer.status})`);
          });
        }

        if (payment.pendingFees && payment.pendingFees.length > 0) {
          console.log('\n⚠️ PENDING FEES:');
          payment.pendingFees.forEach((fee, index) => {
            console.log(`   ${index + 1}. R$ ${fee.amount} - ${fee.description}`);
          });
        }

        return payment;
      }
    } catch (error) {
      console.error('❌ Error getting payment status:', error.response?.data?.message || error.message);
      return null;
    }
  }

  // Force confirm payment for a ride (if you have driver access)
  async forceConfirmPayment(rideId, notes = 'Payment confirmed via cleanup script') {
    try {
      console.log(`💳 Force confirming payment for ride ${rideId}...`);
      const response = await this.axios.put(`/payments/ride/${rideId}/confirm`, {
        paymentReceived: true,
        driverNotes: notes
      });

      if (response.data.success) {
        console.log('✅ Payment confirmed successfully');
        console.log(`💰 Amount: R$ ${response.data.data.totalAmount || 0}`);
        console.log(`🎯 Driver amount: R$ ${response.data.data.driverAmount || 0}`);
        console.log(`🏦 Platform fee: R$ ${response.data.data.platformFee || 0}`);

        return response.data.data;
      }
    } catch (error) {
      console.error('❌ Error confirming payment:', error.response?.data?.message || error.message);
      return null;
    }
  }

  // Get wallet balance
  async getWalletBalance() {
    try {
      const response = await this.axios.get('/payments/wallet/balance');

      if (response.data.success) {
        const balance = response.data.data;
        console.log(`💰 Wallet balance: R$ ${balance.balance}`);
        console.log(`📊 Total transactions: ${balance.totalTransactions || 0}`);
        return balance;
      }
    } catch (error) {
      console.error('❌ Error getting wallet balance:', error.response?.data?.message || error.message);
      return null;
    }
  }

  // Interactive menu
  async showMenu() {
    console.log('\n🔧 JHAGUAR RIDE CLEANUP TOOL');
    console.log('================================');
    console.log('1. Check pending rides');
    console.log('2. Cleanup orphaned rides');
    console.log('3. Inspect specific ride');
    console.log('4. Check payment status of ride');
    console.log('5. Force confirm payment (driver only)');
    console.log('6. Check wallet balance');
    console.log('7. Full cleanup report');
    console.log('0. Exit');
    console.log('================================');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      rl.question('Select option: ', (answer) => {
        rl.close();
        resolve(answer.trim());
      });
    });
  }

  // Get ride ID input
  async promptRideId() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      rl.question('Enter ride ID: ', (rideId) => {
        rl.close();
        resolve(rideId.trim());
      });
    });
  }

  // Full cleanup report
  async fullCleanupReport() {
    console.log('\n📊 GENERATING FULL CLEANUP REPORT...');
    console.log('=====================================');

    // 1. Check pending rides
    await this.checkPendingRides();

    // 2. Check wallet balance
    await this.getWalletBalance();

    // 3. Cleanup orphaned rides
    await this.cleanupOrphanedRides();

    console.log('\n✅ Full cleanup report completed');
  }

  // Main interactive loop
  async run() {
    console.log('🚀 JHAGUAR BACKEND CLEANUP TOOL');
    console.log('=================================');

    // Get credentials and authenticate
    const credentials = await this.promptCredentials();
    const authenticated = await this.authenticate(credentials.email, credentials.password);

    if (!authenticated) {
      console.log('❌ Failed to authenticate. Exiting...');
      return;
    }

    // Interactive menu loop
    while (true) {
      const choice = await this.showMenu();

      switch (choice) {
        case '1':
          await this.checkPendingRides();
          break;

        case '2':
          await this.cleanupOrphanedRides();
          break;

        case '3':
          const rideId = await this.promptRideId();
          if (rideId) {
            await this.getRideDetails(rideId);
          }
          break;

        case '4':
          const paymentRideId = await this.promptRideId();
          if (paymentRideId) {
            await this.getRidePaymentStatus(paymentRideId);
          }
          break;

        case '5':
          const confirmRideId = await this.promptRideId();
          if (confirmRideId) {
            await this.forceConfirmPayment(confirmRideId);
          }
          break;

        case '6':
          await this.getWalletBalance();
          break;

        case '7':
          await this.fullCleanupReport();
          break;

        case '0':
          console.log('👋 Goodbye!');
          return;

        default:
          console.log('❌ Invalid option. Please try again.');
          break;
      }

      // Wait a moment before showing menu again
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

// Command line usage
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    // Interactive mode
    const cleanup = new RideCleanupAPI();
    await cleanup.run();
    return;
  }

  // Command line mode
  const command = args[0];
  const rideId = args[1];

  if (!process.env.CLEANUP_EMAIL || !process.env.CLEANUP_PASSWORD) {
    console.log('❌ For command line mode, set CLEANUP_EMAIL and CLEANUP_PASSWORD environment variables');
    console.log('📖 Or run without arguments for interactive mode');
    return;
  }

  const cleanup = new RideCleanupAPI();
  const authenticated = await cleanup.authenticate(process.env.CLEANUP_EMAIL, process.env.CLEANUP_PASSWORD);

  if (!authenticated) {
    console.log('❌ Failed to authenticate');
    return;
  }

  switch (command) {
    case 'pending':
      await cleanup.checkPendingRides();
      break;

    case 'cleanup':
      await cleanup.cleanupOrphanedRides();
      break;

    case 'inspect':
      if (!rideId) {
        console.log('❌ Usage: node api-cleanup-script.js inspect <ride-id>');
        return;
      }
      await cleanup.getRideDetails(rideId);
      await cleanup.getRidePaymentStatus(rideId);
      break;

    case 'confirm':
      if (!rideId) {
        console.log('❌ Usage: node api-cleanup-script.js confirm <ride-id>');
        return;
      }
      await cleanup.forceConfirmPayment(rideId);
      break;

    case 'report':
      await cleanup.fullCleanupReport();
      break;

    default:
      console.log('❌ Unknown command. Available commands:');
      console.log('  pending  - Check pending rides');
      console.log('  cleanup  - Cleanup orphaned rides');
      console.log('  inspect <ride-id> - Inspect specific ride');
      console.log('  confirm <ride-id> - Force confirm payment');
      console.log('  report   - Full cleanup report');
      break;
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = RideCleanupAPI;