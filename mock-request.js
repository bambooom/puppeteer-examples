const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    userDataDir: './udata',
    args: [
      "--disable-infobars",
    ]
  });

  const page = await browser.newPage();
  // request interception need to be enabled for mocking request
  await page.setRequestInterception(true);

  page.on('request', request => {
    // request class: https://pptr.dev/#?product=Puppeteer&version=v1.8.0&show=api-class-request
    const url = request.url();
    const method = request.method();
    const headers = request.headers();
    let postData = request.postData(); // string

    if (method === 'GET' && url === '/test-url' && headers.hasOwnProperty('x-header-some-1')) {
      // checking the request properties and respond
      request.respond({
        status: 200,  // Response status code, defaults to 200
        contentType: 'application/json', // this can also put into `headers`
        headers: {
          'x-header-others-22': 'whatever',
        },
        body: '{"code": 0, "msg": "hello world"}', // body is string or buffer
      });
    } else if (method === 'POST' && url === '/test-post-data'
      && postData === JSON.stringify({'hello': 1, 'world': 2}))
    {
      // can abort the request immediately, can specify optional error code
      request.abort('connectionaborted')
    } else {
      // continue with normal request
      // optional request overwrites object
      request.continue({
        url: '/test-req-override',
        method: 'POST',
        postData: '{"code": 0, "msg": "hello world"}',
        headers: {
          'x-header-3': 'whatever',
        }
      });
    }
  });
})();

// other packages or usages:
// https://github.com/getdock/pptr-mock-server
// https://github.com/Diokuz/puppeteer-request-mocker