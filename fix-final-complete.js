const fs = require('fs');

// 1. Chat: DTO usa minúsculas, mas acesso ao Prisma usa maiúsculas
let chat = fs.readFileSync('src/chat/chat.service.ts', 'utf8');
chat = chat.replace(/Ride: \{$/gm, 'ride: {');
chat = chat.replace(/(\s+)user: message\.User/g, '$1sender: message.User');
fs.writeFileSync('src/chat/chat.service.ts', chat);
console.log('✅ Fixed chat.service.ts (DTO fields)');

// 2. Drivers: rt.rideType -> rt.RideTypeConfig
let drivers = fs.readFileSync('src/drivers/drivers.service.ts', 'utf8');
drivers = drivers.replace(/rt\.rideType\.name/g, 'rt.RideTypeConfig.name');
fs.writeFileSync('src/drivers/drivers.service.ts', drivers);
console.log('✅ Fixed drivers.service.ts (RideTypeConfig)');

// 3. Maps controller: interface usa minúsculas
let mapsCtrl = fs.readFileSync('src/maps/maps.controller.ts', 'utf8');
mapsCtrl = mapsCtrl.replace(/driver\.User\./g, 'driver.user.');
mapsCtrl = mapsCtrl.replace(/driver\.Vehicle\?/g, 'driver.vehicle?');
fs.writeFileSync('src/maps/maps.controller.ts', mapsCtrl);
console.log('✅ Fixed maps.controller.ts (interface access)');

// 4. Maps service: mixed (interface usa minúsculas, Prisma usa maiúsculas)
let mapsSvc = fs.readFileSync('src/maps/maps.service.ts', 'utf8');
// Para DriverWithDistance (interface) usar minúsculas
mapsSvc = mapsSvc.replace(/selectedDriver\.User\./g, 'selectedDriver.user.');
mapsSvc = mapsSvc.replace(/driver\.User\./g, 'driver.user.');
mapsSvc = mapsSvc.replace(/driver\.Vehicle\?/g, 'driver.vehicle?');
mapsSvc = mapsSvc.replace(/vehicle: driver\.Vehicle,/g, 'vehicle: driver.vehicle,');
mapsSvc = mapsSvc.replace(/driver\.Vehicle\s*\?/g, 'driver.Vehicle?');
// Para queries Prisma diretas, manter maiúsculas no include mas minúsculas no mapeamento
mapsSvc = mapsSvc.replace(/include:\s*{\s*RideType:\s*true/g, 'include: { RideTypeConfig: true');
mapsSvc = mapsSvc.replace(/user:\s*driver\.User,/g, 'user: driver.User,');
mapsSvc = mapsSvc.replace(/vehicle:\s*driver\.Vehicle\s*\?/g, 'vehicle: driver.Vehicle?');
mapsSvc = mapsSvc.replace(/driver\.driverRideTypes/g, 'driver.DriverRideType');
fs.writeFileSync('src/maps/maps.service.ts', mapsSvc);
console.log('✅ Fixed maps.service.ts (mixed access)');

// 5. Payments admin: Wallet
let paymentsAdmin = fs.readFileSync('src/payments/admin.controller.ts', 'utf8');
paymentsAdmin = paymentsAdmin.replace(/Wallet:\s*true/g, 'UserWallet: true');
paymentsAdmin = paymentsAdmin.replace(/user\.Wallet/g, 'user.UserWallet');
paymentsAdmin = paymentsAdmin.replace(/wallet:\s*{/g, 'UserWallet: {');
fs.writeFileSync('src/payments/admin.controller.ts', paymentsAdmin);
console.log('✅ Fixed admin.controller.ts (UserWallet)');

console.log('\n✨ Final fixes complete!');
