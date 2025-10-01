const fs = require('fs');

// Chat service: manter Ride nos includes, ajustar apenas o DTO response
let chat = fs.readFileSync('src/chat/chat.service.ts', 'utf8');
chat = chat.replace(/(\s+)ride:\s*\{/g, '$1Ride: {');
chat = chat.replace(/ride:\s*\{$/gm, 'ride: {'); // Manter ride no response DTO
chat = chat.replace(/sender: message\.User/g, 'user: message.User'); // DTO field
fs.writeFileSync('src/chat/chat.service.ts', chat);
console.log('✅ Fixed chat.service.ts');

// Drivers service: usar maiúsculas para includes e acessos
let drivers = fs.readFileSync('src/drivers/drivers.service.ts', 'utf8');
drivers = drivers.replace(/include:\s*{\s*rideTypeConfig:/g, 'include: { RideTypeConfig:');
drivers = drivers.replace(/driver\.user\?/g, 'driver.User?');
drivers = drivers.replace(/driver\.driverRideTypes/g, 'driver.DriverRideType');
drivers = drivers.replace(/driverRideTypes:\s*\{/g, 'DriverRideType: {');
fs.writeFileSync('src/drivers/drivers.service.ts', drivers);
console.log('✅ Fixed drivers.service.ts');

// Maps: usar maiúsculas para propriedades quando vem de include
let mapsCtrl = fs.readFileSync('src/maps/maps.controller.ts', 'utf8');
mapsCtrl = mapsCtrl.replace(/driver\.user\./g, 'driver.User.');
mapsCtrl = mapsCtrl.replace(/driver\.vehicle\?/g, 'driver.Vehicle?');
fs.writeFileSync('src/maps/maps.controller.ts', mapsCtrl);
console.log('✅ Fixed maps.controller.ts');

let mapsSvc = fs.readFileSync('src/maps/maps.service.ts', 'utf8');
mapsSvc = mapsSvc.replace(/selectedDriver\.user\./g, 'selectedDriver.User.');
mapsSvc = mapsSvc.replace(/driver\.user\./g, 'driver.User.');
mapsSvc = mapsSvc.replace(/user\?\.passenger\?/g, 'user?.Passenger?');
mapsSvc = mapsSvc.replace(/driverRideTypes:\s*\{/g, 'DriverRideType: {');
mapsSvc = mapsSvc.replace(/driver\.user,/g, 'driver.User,');
mapsSvc = mapsSvc.replace(/driver\.vehicle,/g, 'driver.Vehicle,');
mapsSvc = mapsSvc.replace(/driver\.Vehicle\s*\?/g, 'driver.Vehicle?');
fs.writeFileSync('src/maps/maps.service.ts', mapsSvc);
console.log('✅ Fixed maps.service.ts');

console.log('\n✨ All corrected!');
