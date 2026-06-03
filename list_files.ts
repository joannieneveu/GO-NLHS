import fs from 'fs';
import path from 'path';

function listFiles(dir: string, indent: string = '') {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        console.log(`${indent}${file}/`);
        listFiles(fullPath, indent + '  ');
      }
    } else {
      console.log(`${indent}${file}`);
    }
  }
}

function listPngs(dir: string) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      try {
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
          if (file !== 'node_modules' && file !== '.git' && dir.length < 50) {
            listPngs(fullPath);
          }
        } else if (file.endsWith('.png')) {
          console.log(fullPath);
        }
      } catch (e) {}
    }
  } catch (e) {}
}

console.log('Searching for PNGs starting from /:');
listPngs('/');
