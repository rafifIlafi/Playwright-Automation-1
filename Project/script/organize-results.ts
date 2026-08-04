import fs from 'fs';
import path from 'path';

const root = path.resolve('test');

function moveArtifacts(folder: string) {

  if (!fs.existsSync(folder))
    return;

  const files = fs.readdirSync(folder);

  for (const file of files) {

    const full = path.join(folder, file);

    if (fs.statSync(full).isDirectory()) {

      moveArtifacts(full);

    }

  }

}

moveArtifacts(root);

console.log('Organize selesai.');