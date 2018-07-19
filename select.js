// https://stackoverflow.com/a/48164449/5919446
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://test-navlang-demo-vvkpjvrhym.now.sh');
  await page.setViewport({ width: 1380, height: 900 });
  await page.waitFor(1000);

  // use elementHandle.type
  const selectElem = await page.$('select[name="choose1"]');
  await selectElem.type('Value 2');
  // may need to manually trigger change event on <select> like:
  //
  // await page.evaluate((optionElem, selectElem) => {
  //     optionElem.selected = true;
  //     const event = new Event('change', {bubbles: true});
  //     selectElem.dispatchEvent(event);
  // }, optionElem, selectElem);

  // use page.select
  await page.select('select[name="choose2"]', 'val3');

})();