# simple web sensors

Adapted from resources:

* [Sensor APIs][0]

## Start webserver

Serve from localhost within project directory

### local development 
use VS Code Live Preview extension.

### host web app
Use NodeJS web server with self signed cert.
NOTE: sensor API feature is only availabel in secture contexts with https.

Setup: create self signed ssl cert
```bash
npm install -g mkcert
mkdir -p ~/cert
cd ~/cert
mkcert create-ca
mkcert create-cert
```

Locally host server.
```bash
npx http-server -S -C ~/cert/cert.crt -K ~/cert/cert.key
```

[0]: https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs
