const puppeteer = require('puppeteer');
const [, , browserWSEndpoint] = process.argv;

(async () => {
  const browser = await puppeteer.connect({
    browserWSEndpoint,
  });
  const page = await browser.newPage();
  const page.goto('https://www.google.com');
  // do the other thing
  await page.waitFor(5000);
  await page.close();
  process.exit();
})();