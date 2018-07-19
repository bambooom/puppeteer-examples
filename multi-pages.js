const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://github.com');
  await page.setViewport({ width: 1380, height: 900 });
  await page.waitFor(1000);

  const page2 = await browser.newPage();
  await page2.goto('https://www.google.com/');

  await page.bringToFront(); // use this to activates Tab

})();