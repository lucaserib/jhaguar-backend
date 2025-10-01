const fs = require('fs');
const path = require('path');

const fixes = [
  // INCLUDE fixes - maiúsculas corretas
  { pattern: /(\s+)driver:\s*true/g, replace: '$1Driver: true' },
  { pattern: /(\s+)driver:\s*{/g, replace: '$1Driver: {' },
  { pattern: /(\s+)passenger:\s*true/g, replace: '$1Passenger: true' },
  { pattern: /(\s+)passenger:\s*{/g, replace: '$1Passenger: {' },
  { pattern: /(\s+)vehicle:\s*true/g, replace: '$1Vehicle: true' },
  { pattern: /(\s+)vehicle:\s*{/g, replace: '$1Vehicle: {' },
  { pattern: /(\s+)ratings:\s*true/g, replace: '$1Rating: true' },
  { pattern: /(\s+)ratings:\s*{/g, replace: '$1Rating: {' },
  { pattern: /(\s+)sender:\s*true/g, replace: '$1User: true' },
  { pattern: /(\s+)sender:\s*{/g, replace: '$1User: {' },

  // Property access - relações 1:1 usam maiúscula no TypeScript gerado
  { pattern: /\.ratings\)/g, replace: '.Rating)' },
  { pattern: /ride\.ratings/g, replace: 'ride.Rating' },
  { pattern: /updatedDriver\.user/g, replace: 'updatedDriver.User' },
  { pattern: /updatedDriver\.vehicle/g, replace: 'updatedDriver.Vehicle' },

  // User relations - minúscula pois é opcional
  { pattern: /!!user\.Driver/g, replace: '!!user.driver' },
  { pattern: /!!user\.Passenger/g, replace: '!!user.passenger' },
];

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let changes = [];

  for (const fix of fixes) {
    const matches = content.match(fix.pattern);
    if (matches) {
      changes.push(`  - ${matches.length}x: ${fix.pattern}`);
      content = content.replace(fix.pattern, fix.replace);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${path.relative(process.cwd(), filePath)}`);
    changes.forEach(c => console.log(c));
    console.log('');
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

console.log('🔧 Fixing all Prisma relations...\n');

let fixedCount = 0;
walkDir(path.join(__dirname, 'src'), (filePath) => {
  if (fixFile(filePath)) {
    fixedCount++;
  }
});

console.log(`✨ Total: ${fixedCount} files fixed`);
