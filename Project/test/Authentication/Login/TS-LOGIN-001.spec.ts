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


test('TC-LOGIN-001', async ({ page }, testInfo) => {

  // ==========================
  // Membuka Halaman Login
  // ==========================

  await page.goto('/admin');

  await page.waitForLoadState('networkidle');

  await Evidence.screenshot(
    page,
    testInfo,
    '01-login-page'
  );


  // ==========================
  // Mengisi Username
  // ==========================

  await page.getByRole('textbox', {
    name: 'Enter your username'
  }).fill('admin');

  await Evidence.screenshot(
    page,
    testInfo,
    '02-username-filled'
  );


  // ==========================
  // Mengisi Password
  // ==========================

  await page.getByRole('textbox', {
    name: 'Enter your password'
  }).fill('admin123');

  await Evidence.screenshot(
    page,
    testInfo,
    '03-password-filled'
  );


  // ==========================
  // Klik Tombol Login
  // ==========================

  await page.getByRole('button', {
    name: 'Login'
  }).click();


  // ==========================
  // Tunggu Redirect Dashboard
  // ==========================

  await page.waitForURL(
    '**/admin/dashboard'
  );

  await Evidence.screenshot(
    page,
    testInfo,
    '04-after-click-login'
  );


  // ==========================
  // Verifikasi Dashboard
  // ==========================

  await expect(page).toHaveURL(
    'http://localhost:3000/admin/dashboard'
  );

  await Evidence.screenshot(
    page,
    testInfo,
    '05-dashboard'
  );

});