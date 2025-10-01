const fs = require('fs');
const path = require('path');

// Chat service: Ride -> ride, user -> User no DTO
const chatServicePath = path.join(__dirname, 'src/chat/chat.service.ts');
let chatContent = fs.readFileSync(chatServicePath, 'utf8');

// Fix Ride -> ride in return object
chatContent = chatContent.replace(/(\s+)Ride:\s*\{/g, '$1ride: {');

// Fix user -> User in message response
chatContent = chatContent.replace(/(\s+)user: message\.User/g, '$1sender: message.User');

fs.writeFileSync(chatServicePath, chatContent);
console.log('✅ Fixed src/chat/chat.service.ts');

// Drivers service
const driversServicePath = path.join(__dirname, 'src/drivers/drivers.service.ts');
let driversContent = fs.readFileSync(driversServicePath, 'utf8');

// Fix RideType -> rideTypeConfig
driversContent = driversContent.replace(/include:\s*{\s*RideType:\s*\{/g, 'include: { rideTypeConfig: {');

// Fix driver.User -> driver.user (no include, acesso direto)
driversContent = driversContent.replace(/driver\.User\?\.firstName/g, 'driver.user?.firstName');
driversContent = driversContent.replace(/driver\.User\?\.lastName/g, 'driver.user?.lastName');

// Fix driver.DriverRideType -> driver.driverRideTypes
driversContent = driversContent.replace(/driver\.DriverRideType\.map/g, 'driver.driverRideTypes.map');

fs.writeFileSync(driversServicePath, driversContent);
console.log('✅ Fixed src/drivers/drivers.service.ts');

// Maps controller and service
const mapsControllerPath = path.join(__dirname, 'src/maps/maps.controller.ts');
let mapsControllerContent = fs.readFileSync(mapsControllerPath, 'utf8');

mapsControllerContent = mapsControllerContent.replace(/driver\.User\.profileImage/g, 'driver.user.profileImage');
mapsControllerContent = mapsControllerContent.replace(/driver\.Vehicle\?\.carImageUrl/g, 'driver.vehicle?.carImageUrl');
mapsControllerContent = mapsControllerContent.replace(/driver\.Vehicle\s*\?\.capacity/g, 'driver.vehicle?.capacity');

fs.writeFileSync(mapsControllerPath, mapsControllerContent);
console.log('✅ Fixed src/maps/maps.controller.ts');

const mapsServicePath = path.join(__dirname, 'src/maps/maps.service.ts');
let mapsServiceContent = fs.readFileSync(mapsServicePath, 'utf8');

mapsServiceContent = mapsServiceContent.replace(/selectedDriver\.User\.firstName/g, 'selectedDriver.user.firstName');
mapsServiceContent = mapsServiceContent.replace(/selectedDriver\.User\.lastName/g, 'selectedDriver.user.lastName');
mapsServiceContent = mapsServiceContent.replace(/selectedDriver\.User\.profileImage/g, 'selectedDriver.user.profileImage');
mapsServiceContent = mapsServiceContent.replace(/driver\.User\.firstName/g, 'driver.user.firstName');
mapsServiceContent = mapsServiceContent.replace(/driver\.User\.lastName/g, 'driver.user.lastName');

fs.writeFileSync(mapsServicePath, mapsServiceContent);
console.log('✅ Fixed src/maps/maps.service.ts');

console.log('\n✨ All remaining issues fixed!');
