const fs = require('fs');
const path = require('path');

// Mapeamento de correções
const fixes = [
  // Include fixes
  { pattern: /include:\s*{\s*passenger:/g, replace: 'include: { Passenger:' },
  { pattern: /include:\s*{\s*driver:/g, replace: 'include: { Driver:' },
  { pattern: /include:\s*{\s*payment:/g, replace: 'include: { Payment:' },
  { pattern: /include:\s*{\s*wallet:/g, replace: 'include: { Wallet:' },
  { pattern: /include:\s*{\s*user:/g, replace: 'include: { User:' },
  { pattern: /include:\s*{\s*vehicle:/g, replace: 'include: { Vehicle:' },
  { pattern: /include:\s*{\s*rideType:/g, replace: 'include: { RideType:' },
  { pattern: /include:\s*{\s*ride:/g, replace: 'include: { Ride:' },

  // Where clause fixes
  { pattern: /where:\s*{\s*passenger:/g, replace: 'where: { Passenger:' },
  { pattern: /where:\s*{\s*driver:/g, replace: 'where: { Driver:' },
  { pattern: /where:\s*{\s*user:/g, replace: 'where: { User:' },

  // OR clause fixes
  { pattern: /OR:\s*\[\s*{\s*passenger:/g, replace: 'OR: [{ Passenger:' },
  { pattern: /{\s*driver:\s*{\s*userId/g, replace: '{ Driver: { userId' },
  { pattern: /{\s*passenger:\s*{\s*userId/g, replace: '{ Passenger: { userId' },

  // Select fixes
  { pattern: /select:\s*{\s*passenger:/g, replace: 'select: { Passenger:' },
  { pattern: /select:\s*{\s*driver:/g, replace: 'select: { Driver:' },

  // Property access - mais cuidadoso para não quebrar IDs
  { pattern: /(\w+)\.passenger\.user/g, replace: '$1.Passenger.User' },
  { pattern: /(\w+)\.passenger\.userId/g, replace: '$1.Passenger.userId' },
  { pattern: /(\w+)\.passenger\.id/g, replace: '$1.Passenger.id' },
  { pattern: /(\w+)\.passenger\.averageRating/g, replace: '$1.Passenger.averageRating' },
  { pattern: /(\w+)\.passenger\.totalRides/g, replace: '$1.Passenger.totalRides' },

  { pattern: /(\w+)\.driver\.user/g, replace: '$1.Driver.User' },
  { pattern: /(\w+)\.driver\.userId/g, replace: '$1.Driver.userId' },
  { pattern: /(\w+)\.driver\.id/g, replace: '$1.Driver.id' },
  { pattern: /(\w+)\.driver\.vehicle/g, replace: '$1.Driver.Vehicle' },
  { pattern: /(\w+)\.driver\.currentLatitude/g, replace: '$1.Driver.currentLatitude' },
  { pattern: /(\w+)\.driver\.currentLongitude/g, replace: '$1.Driver.currentLongitude' },
  { pattern: /(\w+)\.driver\.averageRating/g, replace: '$1.Driver.averageRating' },
  { pattern: /(\w+)\.driver\.totalRides/g, replace: '$1.Driver.totalRides' },

  { pattern: /(\w+)\.payment\.status/g, replace: '$1.Payment.status' },
  { pattern: /(\w+)\.payment\.method/g, replace: '$1.Payment.method' },
  { pattern: /(\w+)\.payment\)/g, replace: '$1.Payment)' },

  { pattern: /(\w+)\.wallet\.id/g, replace: '$1.Wallet.id' },
  { pattern: /(\w+)\.wallet\.balance/g, replace: '$1.Wallet.balance' },
  { pattern: /(\w+)\.wallet\)/g, replace: '$1.Wallet)' },

  { pattern: /(\w+)\.user\.wallet/g, replace: '$1.User.Wallet' },
  { pattern: /(\w+)\.user\.firstName/g, replace: '$1.User.firstName' },
  { pattern: /(\w+)\.user\.lastName/g, replace: '$1.User.lastName' },
  { pattern: /(\w+)\.user\.phone/g, replace: '$1.User.phone' },
  { pattern: /(\w+)\.user\.profileImage/g, replace: '$1.User.profileImage' },
  { pattern: /(\w+)\.user\.gender/g, replace: '$1.User.gender' },

  { pattern: /(\w+)\.vehicle\.model/g, replace: '$1.Vehicle.model' },
  { pattern: /(\w+)\.vehicle\.color/g, replace: '$1.Vehicle.color' },
  { pattern: /(\w+)\.vehicle\.licensePlate/g, replace: '$1.Vehicle.licensePlate' },
  { pattern: /(\w+)\.vehicle\.carImageUrl/g, replace: '$1.Vehicle.carImageUrl' },
  { pattern: /(\w+)\.vehicle\.isPetFriendly/g, replace: '$1.Vehicle.isPetFriendly' },
  { pattern: /(\w+)\.vehicle\.isLuxury/g, replace: '$1.Vehicle.isLuxury' },
  { pattern: /(\w+)\.vehicle\.isMotorcycle/g, replace: '$1.Vehicle.isMotorcycle' },
  { pattern: /(\w+)\.vehicle\.isArmored/g, replace: '$1.Vehicle.isArmored' },
  { pattern: /(\w+)\.vehicle\.vehicleType/g, replace: '$1.Vehicle.vehicleType' },
  { pattern: /(\w+)\.vehicle\?\.model/g, replace: '$1.Vehicle?.model' },
  { pattern: /(\w+)\.vehicle\?\.color/g, replace: '$1.Vehicle?.color' },
  { pattern: /(\w+)\.vehicle\?\.licensePlate/g, replace: '$1.Vehicle?.licensePlate' },
  { pattern: /(\w+)\.vehicle\?\.carImageUrl/g, replace: '$1.Vehicle?.carImageUrl' },
  { pattern: /(\w+)\.vehicle\?\.isPetFriendly/g, replace: '$1.Vehicle?.isPetFriendly' },
  { pattern: /(\w+)\.vehicle\?\.isLuxury/g, replace: '$1.Vehicle?.isLuxury' },
  { pattern: /(\w+)\.vehicle\?\.isMotorcycle/g, replace: '$1.Vehicle?.isMotorcycle' },
  { pattern: /(\w+)\.vehicle\?\.isArmored/g, replace: '$1.Vehicle?.isArmored' },
  { pattern: /(\w+)\.vehicle\?\.vehicleType/g, replace: '$1.Vehicle?.vehicleType' },

  // RideTypeConfig fix
  { pattern: /(\w+)\.RideTypeConfig\.id/g, replace: '$1.RideTypeConfig.id' },
  { pattern: /(\w+)\.RideTypeConfig\.name/g, replace: '$1.RideTypeConfig.name' },
  { pattern: /(\w+)\.RideTypeConfig\.icon/g, replace: '$1.RideTypeConfig.icon' },

  // Conditional checks
  { pattern: /if\s*\((\w+)\.passenger\)/g, replace: 'if ($1.Passenger)' },
  { pattern: /if\s*\((\w+)\.driver\)/g, replace: 'if ($1.Driver)' },
  { pattern: /if\s*\((\w+)\.payment\)/g, replace: 'if ($1.Payment)' },
  { pattern: /if\s*\((\w+)\.wallet\)/g, replace: 'if ($1.Wallet)' },
  { pattern: /if\s*\(!(\w+)\.passenger\)/g, replace: 'if (!$1.Passenger)' },
  { pattern: /if\s*\(!(\w+)\.driver\)/g, replace: 'if (!$1.Driver)' },
  { pattern: /if\s*\(!(\w+)\.payment\)/g, replace: 'if (!$1.Payment)' },
  { pattern: /if\s*\(!(\w+)\.wallet\)/g, replace: 'if (!$1.Wallet)' },
  { pattern: /if\s*\(!(\w+)\.vehicle\)/g, replace: 'if (!$1.Vehicle)' },

  // Logical operators
  { pattern: /(\w+)\.passenger\s*&&/g, replace: '$1.Passenger &&' },
  { pattern: /(\w+)\.driver\s*&&/g, replace: '$1.Driver &&' },
  { pattern: /(\w+)\.payment\s*&&/g, replace: '$1.Payment &&' },
  { pattern: /(\w+)\.wallet\s*&&/g, replace: '$1.Wallet &&' },
  { pattern: /&&\s*(\w+)\.payment/g, replace: '&& $1.Payment' },
  { pattern: /&&\s*(\w+)\.driver/g, replace: '&& $1.Driver' },

  // Nullish/ternary
  { pattern: /(\w+)\.passenger\s*\?/g, replace: '$1.Passenger ?' },
  { pattern: /(\w+)\.driver\s*\?/g, replace: '$1.Driver ?' },
  { pattern: /(\w+)\.payment\s*\?/g, replace: '$1.Payment ?' },
  { pattern: /(\w+)\.wallet\s*\?/g, replace: '$1.Wallet ?' },
  { pattern: /(\w+)\.vehicle\s*\?/g, replace: '$1.Vehicle ?' },
];

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  for (const fix of fixes) {
    if (fix.pattern.test(content)) {
      content = content.replace(fix.pattern, fix.replace);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  }
  return false;
}

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
        walkDir(filePath, callback);
      }
    } else if (file.endsWith('.ts') && !file.endsWith('.spec.ts')) {
      callback(filePath);
    }
  }
}

console.log('🔧 Fixing Prisma relations in TypeScript files...\n');

let fixedCount = 0;
walkDir(path.join(__dirname, 'src'), (filePath) => {
  if (fixFile(filePath)) {
    fixedCount++;
  }
});

console.log(`\n✨ Fixed ${fixedCount} files`);
