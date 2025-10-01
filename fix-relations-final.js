const fs = require('fs');
const path = require('path');

const fixes = [
  // Fix lowercase driver in includes
  { pattern: /include:\s*{\s*driver:/g, replace: 'include: { Driver:' },

  // Fix lowercase passenger in includes (case sensitive, avoid Passenger)
  { pattern: /include:\s*{\s*passenger:/g, replace: 'include: { Passenger:' },

  // Fix messages to ChatMessage
  { pattern: /messages:\s*{/g, replace: 'ChatMessage: {' },
  { pattern: /messages:\s*true/g, replace: 'ChatMessage: true' },

  // Fix user.driver and user.passenger checks
  { pattern: /!!user\.driver/g, replace: '!!user.Driver' },
  { pattern: /!!user\.passenger/g, replace: '!!user.Passenger' },

  // Fix UserId to userId in property access
  { pattern: /\.UserId ===/g, replace: '.userId ===' },
  { pattern: /\.UserId !==/g, replace: '.userId !==' },
];

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  for (const fix of fixes) {
    const matches = content.match(fix.pattern);
    if (matches) {
      console.log(`  Found ${matches.length} occurrence(s) of pattern: ${fix.pattern}`);
      content = content.replace(fix.pattern, fix.replace);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}\n`);
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

console.log('🔧 Final fix for remaining Prisma relation issues...\n');

let fixedCount = 0;
walkDir(path.join(__dirname, 'src'), (filePath) => {
  if (fixFile(filePath)) {
    fixedCount++;
  }
});

console.log(`\n✨ Fixed ${fixedCount} additional files`);
