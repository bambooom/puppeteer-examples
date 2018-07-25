const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    userDataDir: './udata',
    args: [
      "--disable-infobars",
    ]
  });

  console.log(await browser.wsEndpoint());
  const process = await browser.process();
  console.log('Chromium pid is: ', process.pid);
})();
