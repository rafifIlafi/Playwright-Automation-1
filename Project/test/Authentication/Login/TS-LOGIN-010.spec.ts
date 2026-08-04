import { test, expect } from '@playwright/test';
import { Evidence } from '../../../helpers/evidence';
import { ArtifactManager } from '../../../helpers/artifact-manager';

test.beforeEach(async ({ context }) => {

  // Mulai tracing secara manual
  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true
  });

});


test.afterEach(async ({ page, context }, testInfo) => {

  // ==========================
  // TRACE
  // ==========================

  const tracePath = testInfo.outputPath('trace.zip');

  await context.tracing.stop({
    path: tracePath
  });

  await testInfo.attach('trace', {
    path: tracePath,
    contentType: 'application/zip'
  });


  // ==========================
  // VIDEO
  // ==========================

  const video = page.video();

  // Context harus ditutup agar video selesai dibuat
  await context.close();

  if (video) {

    const videoPath = await video.path();

    await testInfo.attach('video', {
      path: videoPath,
      contentType: 'video/webm'
    });

  }


  // ==========================
  // COPY ARTIFACT
  // ==========================

  await ArtifactManager.copyArtifacts(testInfo);

});


test('TS-LOGIN-010', async ({ page }, testInfo) => {

  // ==========================
  // Login
  // ==========================
  await page.goto('/admin');

  await page.getByRole('textbox', {
    name: 'Enter your username'
  }).fill('admin');

  await page.getByRole('textbox', {
    name: 'Enter your password'
  }).fill('admin123');

  await page.getByRole('button', {
    name: 'Login'
  }).click();

  await page.waitForLoadState('networkidle');

  await Evidence.screenshot(page, testInfo, '01-dashboard');

  // ==========================
  // Klik Tombol Logout
  // ==========================
  await page.getByRole('button', {
    name: 'Logout'
  }).click();

  await page.waitForLoadState('networkidle');

  await Evidence.screenshot(page, testInfo, '02-after-logout');

  // ==========================
  // Verifikasi Kembali ke Login
  // ==========================
  await expect(page).toHaveURL('http://localhost:3000/admin');

  await Evidence.screenshot(page, testInfo, '03-login-page');

});
