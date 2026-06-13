const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const assetsDir = path.join(__dirname, '..', 'src', 'assets');
const files = fs.readdirSync(assetsDir);

function getHash(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(data).digest('hex');
  } catch (e) {
    return null;
  }
}

const targetHashes = {
  '1.jpeg': getHash(path.join(assetsDir, '1.jpeg')),
  '2.jpeg': getHash(path.join(assetsDir, '2.jpeg')),
};

console.log('Target Hashes:', targetHashes);

for (const file of files) {
  if (file === '1.jpeg' || file === '2.jpeg') continue;
  const hash = getHash(path.join(assetsDir, file));
  if (hash === targetHashes['1.jpeg']) {
    console.log(`1.jpeg is identical to ${file}`);
  }
  if (hash === targetHashes['2.jpeg']) {
    console.log(`2.jpeg is identical to ${file}`);
  }
}
