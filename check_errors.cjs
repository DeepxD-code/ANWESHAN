const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('pageerror', error => console.log('BROWSER_ERROR_STACK:', error.stack));
  await page.goto('http://localhost:8080');
  await page.waitForTimeout(2000);
  await browser.close();
})();
