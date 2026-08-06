# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Authentication\Login\TS-LOGIN-006.spec.ts >> TS-LOGIN-006
- Location: test\Authentication\Login\TS-LOGIN-006.spec.ts:65:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Enter your username')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('Enter your username')

```

```yaml
- button "Kembali"
- heading "Login" [level=1]
- paragraph: SMK PGRI Wonoasri Management System
- text: Username
- textbox "Enter your username"
- text: Password
- textbox "Enter your password"
- button "Login"
- paragraph: "Default: admin / admin123"
- region "Notifications (F8)":
  - list
- alert
```

# Test source

```ts
  4   | 
  5   | test.beforeEach(async ({ context }) => {
  6   | 
  7   |   // Mulai tracing secara manual
  8   |   await context.tracing.start({
  9   |     screenshots: true,
  10  |     snapshots: true,
  11  |     sources: true
  12  |   });
  13  | 
  14  | });
  15  | 
  16  | 
  17  | test.afterEach(async ({ page, context }, testInfo) => {
  18  | 
  19  |   // ==========================
  20  |   // TRACE
  21  |   // ==========================
  22  | 
  23  |   const tracePath = testInfo.outputPath('trace.zip');
  24  | 
  25  |   await context.tracing.stop({
  26  |     path: tracePath
  27  |   });
  28  | 
  29  |   await testInfo.attach('trace', {
  30  |     path: tracePath,
  31  |     contentType: 'application/zip'
  32  |   });
  33  | 
  34  | 
  35  |   // ==========================
  36  |   // VIDEO
  37  |   // ==========================
  38  | 
  39  |   const video = page.video();
  40  | 
  41  |   // Context harus ditutup agar video selesai dibuat
  42  |   await context.close();
  43  | 
  44  |   if (video) {
  45  | 
  46  |     const videoPath = await video.path();
  47  | 
  48  |     await testInfo.attach('video', {
  49  |       path: videoPath,
  50  |       contentType: 'video/webm'
  51  |     });
  52  | 
  53  |   }
  54  | 
  55  | 
  56  |   // ==========================
  57  |   // COPY ARTIFACT
  58  |   // ==========================
  59  | 
  60  |   await ArtifactManager.copyArtifacts(testInfo);
  61  | 
  62  | });
  63  | 
  64  | 
  65  | test('TS-LOGIN-006', async ({ page }, testInfo) => {
  66  | 
  67  |   // ==========================
  68  |   // Membuka Halaman Login
  69  |   // ==========================
  70  |   await page.goto('/admin');
  71  |   await page.waitForLoadState('networkidle');
  72  | 
  73  |   await Evidence.screenshot(page, testInfo, '01-login-page');
  74  | 
  75  |   // ==========================
  76  |   // Username & Password Kosong
  77  |   // ==========================
  78  |   await Evidence.screenshot(page, testInfo, '02-empty-form');
  79  | 
  80  |   // ==========================
  81  |   // Klik Tombol Login
  82  |   // ==========================
  83  |   await page.getByRole('button', {
  84  |     name: 'Login'
  85  |   }).click();
  86  | 
  87  |   await page.waitForLoadState('networkidle');
  88  | 
  89  |   await Evidence.screenshot(page, testInfo, '03-after-click-login');
  90  | 
  91  |   // ==========================
  92  |   // Verifikasi Tetap di Halaman Login
  93  |   // ==========================
  94  | 
  95  |   await expect(page).toHaveURL('http://localhost:3000/admin');
  96  | 
  97  |   await Evidence.screenshot(page, testInfo, '04-still-on-login-page');
  98  | 
  99  |   // ==========================
  100 |   // Verifikasi Pesan Error
  101 |   // ==========================
  102 |   await expect(
  103 |     page.getByText('Enter your username')
> 104 |   ).toBeVisible();
      |     ^ Error: expect(locator).toBeVisible() failed
  105 | 
  106 |   await Evidence.screenshot(page, testInfo, '05-error-message');
  107 | 
  108 | });
  109 | 
```