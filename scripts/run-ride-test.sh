#!/bin/bash

# Production-ready Ride Flow Test Runner
# Validates complete ride system functionality

set -e

echo "🚀 Starting Production Ride Flow Validation"
echo "==========================================="

# Check if required dependencies are installed
echo "📦 Checking dependencies..."

# Install axios and socket.io-client if not present
if ! npm list axios > /dev/null 2>&1; then
    echo "Installing axios..."
    npm install axios
fi

if ! npm list socket.io-client > /dev/null 2>&1; then
    echo "Installing socket.io-client..."
    npm install socket.io-client
fi

# Check if backend is running
echo "🔍 Checking backend server..."
BACKEND_URL=${BACKEND_URL:-http://localhost:3000}

if ! curl -f -s "$BACKEND_URL/health" > /dev/null 2>&1; then
    echo "❌ Backend server not accessible at $BACKEND_URL"
    echo "Please ensure the backend is running with:"
    echo "  npm run start:dev"
    exit 1
fi

echo "✅ Backend server is accessible"

# Check database connectivity
echo "🗄️  Checking database..."
if ! npx prisma db status > /dev/null 2>&1; then
    echo "❌ Database not accessible or not migrated"
    echo "Please ensure database is running and migrated"
    exit 1
fi

echo "✅ Database is accessible"

# Run system health check
echo "🏥 Running system health validation..."
node -e "
const axios = require('axios');

(async () => {
  try {
    const response = await axios.get('$BACKEND_URL/debug/rides/active');
    console.log('✅ System health check passed');
    console.log('📊 Active rides:', response.data.count);
  } catch (error) {
    console.error('❌ System health check failed:', error.message);
    process.exit(1);
  }
})();
"

# Run the comprehensive ride flow test
echo "🧪 Running comprehensive ride flow test..."
echo "This will test the complete ride lifecycle:"
echo "  ✓ User authentication"
echo "  ✓ State synchronization"
echo "  ✓ Ride creation"
echo "  ✓ Driver matching"
echo "  ✓ Ride acceptance"
echo "  ✓ Ride start"
echo "  ✓ Ride completion"
echo "  ✓ State cleanup"
echo ""

export BACKEND_URL="$BACKEND_URL"

# Run the test with timeout
timeout 60s node scripts/test-ride-flow.js || {
    echo "❌ Test failed or timed out"
    echo ""
    echo "💡 Troubleshooting:"
    echo "  - Check backend logs for errors"
    echo "  - Verify WebSocket connections are working"
    echo "  - Ensure test users exist in database"
    echo "  - Run: npm run seed to create test data"
    exit 1
}

echo ""
echo "🎉 All tests completed successfully!"
echo "✅ Ride system is production-ready"
echo ""
echo "📋 Summary:"
echo "  ✓ Backend connectivity"
echo "  ✓ Database connectivity"
echo "  ✓ WebSocket functionality"
echo "  ✓ Complete ride flow"
echo "  ✓ State management"
echo "  ✓ Data consistency"
echo ""
echo "🚀 System ready for production deployment!"