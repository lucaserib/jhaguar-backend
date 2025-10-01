const fs = require('fs');
const path = require('path');

const fileSpecificFixes = {
  'src/chat/chat.service.ts': [
    { pattern: /(\s+)ride:\s*{/g, replace: '$1Ride: {' },
    { pattern: /!!user\.driver/g, replace: '!!user.Driver' },
    { pattern: /!!user\.passenger/g, replace: '!!user.Passenger' },
    { pattern: /sender: message\.sender/g, replace: 'user: message.User' },
    { pattern: /messages: chat\.messages/g, replace: 'messages: chat.ChatMessage' },
    { pattern: /ride: chat\.ride/g, replace: 'ride: chat.Ride' },
    { pattern: /driver: chat\.ride\.Driver/g, replace: 'driver: chat.Ride.Driver' },
  ],
  'src/drivers/drivers.service.ts': [
    { pattern: /updatedDriver\.UserId/g, replace: 'updatedDriver.userId' },
    { pattern: /(\s+)payment:\s*true/g, replace: '$1Payment: true' },
    { pattern: /ride\.Rating/g, replace: 'ride.Rating' },
    { pattern: /(\s+)driverRideTypes:\s*{/g, replace: '$1DriverRideType: {' },
    { pattern: /driver\.user\?/g, replace: 'driver.User?' },
    { pattern: /driver\.driverRideTypes/g, replace: 'driver.DriverRideType' },
  ],
  'src/maps/maps.controller.ts': [
    { pattern: /driver\.User\.firstName/g, replace: 'driver.user.firstName' },
    { pattern: /driver\.User\.lastName/g, replace: 'driver.user.lastName' },
  ],
  'src/payments/payments.service.ts': [
    { pattern: /(\s+)payment:\s*true/g, replace: '$1Payment: true' },
  ],
  'src/rides/rides.service.ts': [
    { pattern: /(\s+)payment:\s*true/g, replace: '$1Payment: true' },
  ],
};

function fixFile(filePath, fixes) {
  const relativePath = path.relative(process.cwd(), filePath);
  const fileFixes = fixes[relativePath];

  if (!fileFixes) return false;

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let changes = [];

  for (const fix of fileFixes) {
    const matches = content.match(fix.pattern);
    if (matches) {
      changes.push(`  - ${matches.length}x: ${fix.pattern}`);
      content = content.replace(fix.pattern, fix.replace);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${relativePath}`);
    changes.forEach(c => console.log(c));
    console.log('');
    return true;
  }
  return false;
}

console.log('🔧 Applying final specific fixes...\n');

let fixedCount = 0;
for (const [relativePath, fixes] of Object.entries(fileSpecificFixes)) {
  const filePath = path.join(process.cwd(), relativePath);
  if (fs.existsSync(filePath)) {
    if (fixFile(filePath, fileSpecificFixes)) {
      fixedCount++;
    }
  }
}

console.log(`✨ Fixed ${fixedCount} files with specific corrections`);
