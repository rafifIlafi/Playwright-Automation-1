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


test('TS-LOGIN-008', async ({ page }, testInfo) => {

  // ==========================
  // Membuka Halaman Login
  // ==========================
  await page.goto('/admin');
  await page.waitForLoadState('networkidle');

  await Evidence.screenshot(page, testInfo, '01-login-page');

  // ==========================
  // Mengisi Username XSS
  // ==========================
  await page.getByRole('textbox', {
    name: 'Enter your username'
  }).fill('<script>alert("XSS")</script>');

  await Evidence.screenshot(page, testInfo, '02-xss-username');

  // ==========================
  // Mengisi Password XSS
  // ==========================
  await page.getByRole('textbox', {
    name: 'Enter your password'
  }).fill('<script>alert("XSS")</script>');

  await Evidence.screenshot(page, testInfo, '03-xss-password');

  // ==========================
  // Klik Tombol Login
  // ==========================
  await page.getByRole('button', {
    name: 'Login'
  }).click();

  await page.waitForLoadState('networkidle');

  await Evidence.screenshot(page, testInfo, '04-after-click-login');

  // ==========================
  // Verifikasi Login Ditolak
  // ==========================
  await expect(page).toHaveURL('http://localhost:3000/admin');

  await expect(
    page.getByText('Invalid username or password')
  ).toBeVisible();

  await Evidence.screenshot(page, testInfo, '05-login-rejected');

});
