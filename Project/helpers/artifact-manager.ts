import fs from 'fs';
import path from 'path';
import { TestInfo } from '@playwright/test';
import { FolderManager } from './folder-manager';

export class ArtifactManager {

  static async copyArtifacts(testInfo: TestInfo) {

    const folder = FolderManager.create(testInfo);

    console.log('Attachments:', testInfo.attachments);

    for (const attachment of testInfo.attachments) {

      // Attachment berupa file
      if (!attachment.path) {
        continue;
      }

      const source = attachment.path;

      if (!fs.existsSync(source)) {
        console.warn(
          `Attachment tidak ditemukan: ${source}`
        );
        continue;
      }

      try {

        // ==========================
        // VIDEO
        // ==========================
        if (
          attachment.contentType === 'video/webm' ||
          attachment.name === 'video'
        ) {

          const fileName = path.basename(source);

          const destination = path.join(
            folder.video,
            fileName
          );

          fs.copyFileSync(source, destination);

          console.log(
            `Video berhasil dicopy -> ${destination}`
          );
        }

        // ==========================
        // TRACE
        // ==========================
        else if (
          attachment.contentType === 'application/zip' ||
          attachment.name === 'trace'
        ) {

          const fileName = path.basename(source);

          const destination = path.join(
            folder.trace,
            fileName
          );

          fs.copyFileSync(source, destination);

          console.log(
            `Trace berhasil dicopy -> ${destination}`
          );
        }

        // ==========================
        // REPORT
        // ==========================
        else if (
          attachment.name === 'screenshot' &&
          attachment.contentType === 'image/png'
        ) {

          const fileName = path.basename(source);

          const destination = path.join(
            folder.report,
            fileName
          );

          fs.copyFileSync(source, destination);

          console.log(
            `Report berhasil dicopy -> ${destination}`
          );
        }

      } catch (error) {

        console.error(
          `Gagal mencopy attachment: ${attachment.name}`
        );

        console.error(error);
      }
    }
  }
}