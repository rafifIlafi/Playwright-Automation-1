import fs from 'fs';
import { execSync } from 'child_process';

if (!fs.existsSync('playwright-report')) {
  console.log('playwright-report belum tersedia.');
  console.log('Jalankan npm test terlebih dahulu.');
  process.exit(0);
}

try {
  execSync(
    'npx playwright merge-reports --reporter html playwright-report',
    {
      stdio: 'inherit'
    }
  );

  console.log('Merge report selesai.');

} catch (err) {

  console.error(err);

}