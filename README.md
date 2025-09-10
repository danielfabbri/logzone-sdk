# 📦 Logzone SDK
**Logzone SDK — Embed the Leadzone logging platform**

Logzone SDK is a minimal Node.js client for sending structured logs from your application to the Leadzone logging platform.  
It aims to make sending error, warning and info logs simple and consistent.

---

![npm](https://img.shields.io/npm/v/logzone-sdk?label=npm) ![downloads](https://img.shields.io/npm/dw/logzone-sdk) ![license](https://img.shields.io/badge/license-MIT-blue) ![build](https://img.shields.io/badge/build-passing-brightgreen)

---

## Table of Contents
- [Features](#features)  
- [Installation](#installation)  
- [Quick start](#quick-start)  
  - [CommonJS](#commonjs)  
  - [ESM](#esm)  
  - [Environment variables (recommended)](#environment-variables-recommended)  
- [API Reference](#api-reference)  
  - [`LogZoneSDK`](#logzonesdk)  
  - [`createLog(options)`](#createlogoptions)  
- [Parameters](#parameters)  
- [Examples](#examples)  
  - [Basic example](#basic-example)  
  - [Express middleware example (pattern)](#express-middleware-example-pattern)  
- [Error handling & retries](#error-handling--retries)  
- [Publishing & versioning](#publishing--versioning)  
- [Contributing](#contributing)  
- [Security](#security)  
- [License](#license)  
- [Authors](#authors)

---

## Features
- Simple, minimal API to send logs (`createLog`)  
- Async/Promise-based calls  
- Designed to be used in Node.js services and scripts  
- Lightweight — small surface area to integrate quickly

---

## Installation

```bash
npm install logzone-sdk
```

or with yarn:

```bash
yarn add logzone-sdk
```

---

## Quick start

### CommonJS

```js
// index.js
const LogZoneSDK = require('logzone-sdk');

const sdk = new LogZoneSDK();

async function main() {
  try {
    await sdk.createLog({
      apiKey: 'YOUR_API_KEY',
      project: 'YOUR_PROJECT_ID',
      level: 'error',
      message: 'Failed to authenticate user 333',
      context: 'Invalid JWT token received at /login'
    });
    console.log('Log successfully sent!');
  } catch (err) {
    console.error('Error sending log:', err.message);
  }
}

main();
```

### ESM

```js
// index.mjs
import LogZoneSDK from 'logzone-sdk';

const sdk = new LogZoneSDK();

await sdk.createLog({
  apiKey: process.env.LOGZONE_API_KEY,
  project: process.env.LOGZONE_PROJECT,
  level: 'warn',
  message: 'Something unexpected happened',
  context: { route: '/api/foo', userId: 123 }
});
```

### Environment variables (recommended)
Keep your API key and project ID in environment variables instead of hard-coding:

```bash
# .env or CI secrets
LOGZONE_API_KEY=sk_live_xxx
LOGZONE_PROJECT=my-project
```

Then in code:

```js
const sdk = new (require('logzone-sdk'))();

await sdk.createLog({
  apiKey: process.env.LOGZONE_API_KEY,
  project: process.env.LOGZONE_PROJECT,
  level: 'info',
  message: 'Service started'
});
```

---

## API Reference

### `LogZoneSDK`
Constructs a new SDK instance.

```js
const sdk = new LogZoneSDK();
```

> The SDK constructor currently does not require options. All request-scoped credentials (like API key and project) are provided on each `createLog` call.

---

### `createLog(options) → Promise<void>`
Sends a single log entry to Leadzone.

**Parameters (object):**

- `apiKey` — `string` (required) — Leadzone API key used to authenticate the request.  
- `project` — `string` (required) — Target project ID or name where the log will be stored.  
- `level` — `string` (required) — Log severity. Typical values: `info`, `warn`, `error`, `debug`.  
- `message` — `string` (required) — Short human-readable message describing the event.  
- `context` — `string | object` (optional) — Additional contextual information (stack, route, JSON object, etc.).  
- `timestamp` — `string | number` (optional) — Unix timestamp or ISO string — if omitted, SDK uses `Date.now()`.

**Returns:** a `Promise` that resolves when the log is accepted by the SDK (or rejects on error).

Example:

```js
await sdk.createLog({
  apiKey: process.env.LOGZONE_API_KEY,
  project: 'backend-prod',
  level: 'error',
  message: 'Database connection failure',
  context: { host: 'db1', errorCode: 'ECONNREFUSED' }
});
```

> Note: The exact HTTP responses and retry semantics depend on the SDK internals and the Leadzone server. Consume the promise and handle rejection accordingly.

---

## Parameters

| Field     | Type                 | Required | Description |
|-----------|----------------------|----------|-------------|
| `apiKey`  | `string`             | ✅       | Leadzone API key |
| `project` | `string`             | ✅       | Project identifier |
| `level`   | `string`             | ✅       | Log severity (`info`, `warn`, `error`, ...) |
| `message` | `string`             | ✅       | Main log message |
| `context` | `string` \| `object` | ❌       | Optional additional context or structured metadata |
| `timestamp` | `string\|number`   | ❌       | Optional timestamp |

---

## Examples

### Basic example

```js
const LogZoneSDK = require('logzone-sdk');
const sdk = new LogZoneSDK();

async function sendError() {
  try {
    await sdk.createLog({
      apiKey: process.env.LOGZONE_API_KEY,
      project: process.env.LOGZONE_PROJECT,
      level: 'error',
      message: 'Unhandled exception in worker',
      context: { pid: process.pid, stack: 'Error: ...' }
    });
  } catch (err) {
    // Fallback: local logging if send fails
    console.error('Failed to send log to Logzone:', err);
  }
}

sendError();
```

### Express middleware example (pattern)

```js
// error-logger.js
const LogZoneSDK = require('logzone-sdk');
const sdk = new LogZoneSDK();

module.exports = function errorLogger(err, req, res, next) {
  sdk.createLog({
    apiKey: process.env.LOGZONE_API_KEY,
    project: process.env.LOGZONE_PROJECT,
    level: 'error',
    message: err.message || 'Unhandled error',
    context: {
      url: req.originalUrl,
      method: req.method,
      body: req.body,
      stack: err.stack
    }
  }).catch(console.error);

  next(err); // pass to next error handler
};
```

---

## Error handling & retries
- Always wrap `createLog` in `try/catch` (or use `.catch`) to handle network issues or invalid parameters.  
- For critical logs you may want to implement a retry/backoff strategy on failure or persist the event locally and retry later.  
- Avoid blocking application critical paths waiting for remote logging — best practice is to send logs asynchronously and handle failures gracefully.

---

## Publishing & versioning
If you maintain this package and want to publish to npm:

1. Make sure `package.json` has a unique `name` and correct `version`.  
2. Authenticate: `npm login` or `npm adduser`.  
3. Publish: `npm publish` (for scoped packages: `npm publish --access public`).  
4. When releasing updates, bump the version with:
   ```bash
   npm version patch   # bugfix
   npm version minor   # new feature, non-breaking
   npm version major   # breaking change
   ```
   Then `git push --follow-tags` and `npm publish`.

> Note: npm does not allow re-publishing the same version number — always increment the version.

---

## Contributing
Contributions are welcome! Suggested workflow:

1. Fork the repository.  
2. Create a feature branch: `git checkout -b feat/your-feature`.  
3. Add tests, update README if necessary.  
4. Open a PR describing your change.

---

## Security
If you discover a security vulnerability, please report it privately to the maintainers so we can patch before public disclosure.

---

## License
This project is licensed under the **MIT License**.

---
## Authors
Developed by [Daniel Fabbri](https://www.linkedin.com/daniel-fabbri-019121ba/) and [Wendell Lavor](https://github.com/wendellfranck).


---

## Changelog
- **Unreleased**: Add TypeScript types, advanced configuration and batching (planned).  
- **1.0.0**: Initial minimal SDK (basic `createLog` method).
