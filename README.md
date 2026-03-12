# Vigil - Security Middleware for Express.js

A standalone, modular security middleware package for Express.js applications.

## Installation

```bash
npm install vigil
```

---

## 1. Rate Limiting

### Usage

```javascript
const { ratelimiting } = require('vigil');

app.use(ratelimiting({
  mode: 'LIVE',
  by: 'userId',
  refillRate: 5,
  interval: 10,
  capacity: 10
}));
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `mode` | `'LIVE' \| 'TEST'` | `'LIVE'` | Enable/disable |
| `by` | `string` | `'ip'` | Identifier type |
| `ipPrimary` | `boolean` | `true` | IP is primary key |
| `refillRate` | `number` | `5` | Tokens/interval |
| `interval` | `number` | `10` | Seconds |
| `capacity` | `number` | `10` | Max tokens |

### Response (Success)

```http
HTTP/1.1 200 OK
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 9
X-RateLimit-Reset: 1773318895
```

### Response (Rate Limited)

```http
HTTP/1.1 429 Too Many Requests

{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Please try again later.",
  "retryAfter": 10
}
```

---

## 2. Bot Detection

### Usage

```javascript
const { botDetection } = require('vigil');

app.use(botDetection({
  mode: 'LIVE',
  searchEngine: ['google', 'bing', 'yahoo']
}));
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `mode` | `'LIVE' \| 'TEST'` | `'LIVE'` | Enable/disable |
| `searchEngine` | `string[]` | All | Allowed engines |
| `allowList` | `array` | `[]` | Always allowed |
| `blockList` | `array` | `[]` | Always blocked |

### Response (Success)

```http
HTTP/1.1 200 OK
X-Bot-Detected: true
X-Search-Engine: google
```

### Response (Blocked)

```http
HTTP/1.1 403 Forbidden

{
  "error": "Forbidden",
  "message": "Search engine bots are not allowed."
}
```

### Utility

```javascript
// Detect bot from User-Agent
botDetection.detect('Googlebot/2.1');
// Returns: { isBot: true, botName: 'Googlebot', searchEngine: 'google' }
```

---

## 3. Email Verification

### Usage (Direct Verification)

```javascript
const emailVerification = require('vigil/email-verification');

const result = await emailVerification({ 
  email: 'user@example.com',
  checkMX: true
});
```

### Usage (Express Middleware)

```javascript
const { emailVerification } = require('vigil');

// Add email verification middleware
app.use(emailVerification.middleware({
  source: 'body',        // Get email from: 'body', 'query', 'params', 'header'
  emailField: 'email',   // Field name (for body/query/params)
  checkMX: true,         // Check MX records
  checkDisposable: true,// Check disposable emails
  blockOnDisposable: true // Block requests with disposable emails
}));

// Then use req.emailVerification in your routes
app.post('/api/register', (req, res) => {
  const verification = req.emailVerification;
  // verification = { email, valid, exists, hasMX, isDisposable, ... }
  res.json(verification);
});
```

### Options (Direct)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `email` | `string` | required | Email to verify |
| `checkMX` | `boolean` | `true` | Check MX records |
| `checkDisposable` | `boolean` | `true` | Block disposable |

### Options (Middleware)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `source` | `'body' \| 'query' \| 'params' \| 'header'` | `'body'` | Where to get email from |
| `emailField` | `string` | `'email'` | Field name (body/query/params) |
| `headerName` | `string` | `'x-email'` | Header name (if source is 'header') |
| `checkMX` | `boolean` | `true` | Check MX records |
| `checkDisposable` | `boolean` | `true` | Check disposable emails |
| `blockOnDisposable` | `boolean` | `true` | Block disposable emails |
| `handler` | `function` | `null` | Custom handler for invalid emails |

### Response (Valid Email)

```json
{
  "email": "test@gmail.com",
  "valid": true,
  "exists": true,
  "hasMX": true,
  "isDisposable": false,
  "isValidFormat": true,
  "isReserved": false,
  "mxRecords": [
    { "host": "gmail-smtp-in.l.google.com", "priority": 5 },
    { "host": "alt1.gmail-smtp-in.l.google.com", "priority": 10 }
  ],
  "errors": []
}
```

### Response (Disposable Email)

```json
{
  "email": "test@mailinator.com",
  "valid": false,
  "exists": false,
  "hasMX": false,
  "isDisposable": true,
  "isValidFormat": true,
  "isReserved": false,
  "mxRecords": [],
  "errors": ["Disposable email domain"]
}
```

### Response (Invalid Format)

```json
{
  "email": "invalid-email",
  "valid": false,
  "exists": false,
  "hasMX": false,
  "isDisposable": false,
  "isValidFormat": false,
  "isReserved": false,
  "mxRecords": [],
  "errors": ["Invalid email format"]
}
```

---

## 4. SQL Injection Protection

### Usage

```javascript
const sqlinjection = require('vigil/sql-injection');

// Direct check
const result = await sqlinjection({ text: userInput });

// As middleware
app.use(sqlinjection.middleware({ mode: 'LIVE' }));
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `text` | `string` | - | Text to check |
| `data` | `object` | - | Object to scan |
| `checkBody` | `boolean` | `true` | Check body |

### Response (Safe Input)

```json
{
  "detected": false,
  "safe": true,
  "threats": [],
  "errors": []
}
```

### Response (Threat Detected)

```json
{
  "detected": true,
  "safe": false,
  "threats": [
    {
      "type": "text",
      "value": "'; OR 1=1--",
      "detected": true,
      "patterns": [
        {
          "pattern": "/\\bOR\\s+1\\s*=\\s*1/i",
          "matched": "OR 1=1"
        }
      ]
    }
  ],
  "errors": []
}
```

### Response (Middleware - 400 Bad Request)

```http
HTTP/1.1 400 Bad Request

{
  "error": "Potential SQL injection detected",
  "message": "Your input contains potentially dangerous characters"
}
```

---

## Quick Start

```javascript
const express = require('express');
const { ratelimiting, botDetection, emailVerification, sqlinjection } = require('vigil');

const app = express();
app.use(express.json());

// Rate limiting (IP-primary - prevents bypass)
app.use(ratelimiting({ mode: 'LIVE', capacity: 10 }));

// Bot detection
app.use(botDetection({ mode: 'LIVE', searchEngine: ['google'] }));

// Email verification middleware
app.use(emailVerification.middleware({
  source: 'body',
  checkMX: true,
  checkDisposable: true
}));

// Routes
app.post('/api/register', (req, res) => {
  // Email already verified by middleware
  const emailResult = req.emailVerification;
  if (!emailResult.valid) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  
  // Check SQL injection
  const sqlResult = await sqlinjection({ data: req.body });
  if (!sqlResult.safe) {
    return res.status(400).json({ error: 'SQL injection detected' });
  }
  
  res.json({ success: true });
});

app.listen(3000);
```

---

## License

MIT
# vigil
