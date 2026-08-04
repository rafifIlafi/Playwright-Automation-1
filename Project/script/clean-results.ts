import fs from 'fs';
import path from 'path';

const folders = [
  'test-results',
  'playwright-report'
];

for (const folder of folders) {

  const fullPath = path.resolve(folder);

  if (fs.existsSync(fullPath)) {

    fs.rmSync(fullPath, {
      recursive: true,
      force: true
    });

    console.log(`Deleted : ${folder}`);

  } else {

    console.log(`Folder ${folder} tidak ditemukan.`);

  }
}