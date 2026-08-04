import path from 'path';
import { Page, TestInfo } from '@playwright/test';
import { FolderManager } from './folder-manager';

export class Evidence {

  static async screenshot(
    page: Page,
    testInfo: TestInfo,
    fileName: string
  ) {

    const folder = FolderManager.create(testInfo);

    const screenshotPath = path.join(
      folder.screenshot,
      `${fileName}.png`
    );

    await page.screenshot({

      path: screenshotPath,

      fullPage: true

    });

    return screenshotPath;

  }

}