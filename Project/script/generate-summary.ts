import fs from 'fs';
import path from 'path';

let passed = 0;
let failed = 0;
let skipped = 0;

function countStatus(node: any) {
  if (!node) return;

  if (Array.isArray(node)) {
    node.forEach(countStatus);
    return;
  }

  if (typeof node === 'object') {
    switch (node.status) {
      case 'passed':
        passed++;
        break;
      case 'failed':
        failed++;
        break;
      case 'skipped':
        skipped++;
        break;
    }

    Object.values(node).forEach(countStatus);
  }
}

const jsonReport = path.join(
  process.cwd(),
  'test-results',
  'results.json'
);

const htmlDataFolder = path.join(
  process.cwd(),
  'playwright-report',
  'data'
);

let reportFound = false;

// ==========================
// Prioritas 1 : results.json
// ==========================
if (fs.existsSync(jsonReport)) {
  const json = JSON.parse(
    fs.readFileSync(jsonReport, 'utf8')
  );

  countStatus(json);
  reportFound = true;
}

// =====================================
// Prioritas 2 : playwright-report/data
// =====================================
else if (fs.existsSync(htmlDataFolder)) {

  const files = fs
    .readdirSync(htmlDataFolder)
    .filter(file => file.endsWith('.json'));

  for (const file of files) {

    const json = JSON.parse(
      fs.readFileSync(
        path.join(htmlDataFolder, file),
        'utf8'
      )
    );

    countStatus(json);
  }

  reportFound = true;
}

if (!reportFound) {
  console.log('Tidak ditemukan report Playwright.');
  process.exit(0);
}

const summary = `==========================================
PLAYWRIGHT EXECUTION SUMMARY
==========================================

Execution Date :
${new Date().toLocaleString()}

------------------------------------------

Passed : ${passed}

Failed : ${failed}

Skipped : ${skipped}

Total :
${passed + failed + skipped}

==========================================
`;

const output = path.join(
  process.cwd(),
  'Execution-Summary.txt'
);

fs.writeFileSync(output, summary);

console.log('Summary berhasil dibuat.');
console.log(output);