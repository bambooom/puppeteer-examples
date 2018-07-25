# puppeteer-examples
just some snippets about how to use puppeteer


## browser websocket endpoint
```bash
$ node browser.js&
[1] 9231 # this is the pid of this nodejs process

# chromium websocket endppoint url
ws://127.0.0.1:62813/devtools/browser/32385bc8-47c2-47f6-a3e9-ef1a5fd1edbf
# headless chromium's process pid
Chromium pid is:  9244
```

It will start a nodejs daemon process, and also start a headless browser for
others to connect. Now it also logs the browser's websocket endpoint and the
process pid, which can be used to kill after running.

Then running `node ws-connect.js ws://127.0.0.1:62813/devtools/browser/32385bc8-47c2-47f6-a3e9-ef1a5fd1edbf` to connect the previous browser.

After everything done, close nodejs process and chromium procee by `kill -QUIT {PID}`
for example:
```bash
$ kill -QUIT 9231
```