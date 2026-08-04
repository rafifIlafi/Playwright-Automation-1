import fs from 'fs';
import path from 'path';
import { TestInfo } from '@playwright/test';

export class FolderManager {

  static getTestCaseFolder(testInfo: TestInfo) {

    const tcName = path
      .basename(testInfo.file)
      .replace('.spec.ts', '');

    const tcFolder = path.join(
      path.dirname(testInfo.file),
      tcName
    );

    return {
      tcName,
      tcFolder,

      screenshot: path.join(tcFolder, 'Screenshot'),

      video: path.join(tcFolder, 'Video'),

      trace: path.join(tcFolder, 'Trace'),

      report: path.join(tcFolder, 'Report')
    };

  }

  static create(testInfo: TestInfo) {

    const folder = this.getTestCaseFolder(testInfo);

    [
      folder.tcFolder,
      folder.screenshot,
      folder.video,
      folder.trace,
      folder.report
    ].forEach(dir => {

      if (!fs.existsSync(dir)) {

        fs.mkdirSync(dir, {
          recursive: true
        });

      }

    });

    return folder;

  }

}