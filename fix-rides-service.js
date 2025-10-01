const fs = require('fs');

console.log('🔧 Fixing src/rides/rides.service.ts...\n');

let content = fs.readFileSync('src/rides/rides.service.ts', 'utf8');
const original = content;

// 1. Acessos a propriedades após include - usar maiúsculas
content = content.replace(/ride\.passenger\./g, 'ride.Passenger.');
content = content.replace(/ride\.passenger\?/g, 'ride.Passenger?');
content = content.replace(/ride\.driver\./g, 'ride.Driver.');  
content = content.replace(/ride\.driver\?/g, 'ride.Driver?');
content = content.replace(/ride\.driver\)/g, 'ride.Driver)');
content = content.replace(/ride\.payment\./g, 'ride.Payment.');
content = content.replace(/ride\.payment\?/g, 'ride.Payment?');
content = content.replace(/updatedRide\.driver\?/g, 'updatedRide.Driver?');
content = content.replace(/updatedRide\.passenger\./g, 'updatedRide.Passenger.');

// 2. Condicionais
content = content.replace(/\(ride\.driver\s*&&/g, '(ride.Driver &&');
content = content.replace(/\(!ride\.driver/g, '(!ride.Driver');
content = content.replace(/!!\s*ride\.driver/g, '!!ride.Driver');
content = content.replace(/if\s*\(ride\.payment/g, 'if (ride.Payment');
content = content.replace(/}\s*else\s*if\s*\(ride\.payment/g, '} else if (ride.Payment');

// 3. Includes que faltaram
content = content.replace(/passenger:\s*{\s*include:/g, 'Passenger: { include:');
content = content.replace(/driver:\s*{\s*include:/g, 'Driver: { include:');
content = content.replace(/payment:\s*true/g, 'Payment: true');
content = content.replace(/passenger:\s*{\s*select:/g, 'Passenger: { select:');
content = content.replace(/user:\s*{\s*select:/g, 'User: { select:');

// 4. Where clauses  
content = content.replace(/OR:\s*\[\s*{\s*passenger:/g, 'OR: [{ Passenger:');
content = content.replace(/},\s*{\s*driver:\s*{/g, '}, { Driver: {');
content = content.replace(/driver:\s*true\s*}/g, 'Driver: true }');

if (content !== original) {
  fs.writeFileSync('src/rides/rides.service.ts', content);
  console.log('✅ Fixed rides.service.ts');
  console.log(`   Changed ${(original.length - content.length)} characters\n`);
} else {
  console.log('⚠️  No changes needed\n');
}
