<div align="center">

# api-commons

[![CI](https://github.com/RaizenXxx/api-commons/actions/workflows/ci.yml/badge.svg)](https://github.com/RaizenXxx/api-commons/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/badge/npm-v1.1.0-blue)](https://www.npmjs.com/package/api-commons)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org)

Lightweight HTTP client and response formatting utilities for Node.js REST APIs. No axios, no node-fetch - just native `https` done right.

[Installation](#installation) | [HTTP Client](#http-client) | [Response Formatters](#response-formatters) | [Pagination](#pagination)

</div>

---

## Why?

Most HTTP libraries are overkill for server-to-server communication. `api-commons` gives you:

- **Native HTTPS** - No dependencies, no supply chain attacks
- **Promise-based** - Modern async/await interface
- **Response formatting** - Consistent API responses across your services
- **Pagination helper** - Auto-paginate any REST endpoint
- **Under 2KB** - Smaller than a single axios import

## Installation

```bash
npm install api-commons
```

## HTTP Client

### GET Request

```javascript
const { get } = require('api-commons');

const data = await get('https://api.github.com/users/octocat');
const user = JSON.parse(data);
console.log(user.login); // 'octocat'
```

### POST Request

```javascript
const { post } = require('api-commons');

const result = await post('https://api.example.com/users', {
  name: 'John Doe',
  email: 'john@example.com'
});
console.log(result); // { id: 123, name: 'John Doe', ... }
```

## Response Formatters

Standardize your API responses across all endpoints:

```javascript
const { success, error } = require('api-commons');
const express = require('express');
const app = express();

// Success response
app.get('/api/users', async (req, res) => {
  const users = await db.getUsers();
  res.json(success(users));
  // { status: 'ok', data: [...] }
});

// Error response
app.get('/api/users/:id', async (req, res) => {
  const user = await db.getUser(req.params.id);
  if (!user) {
    return res.status(404).json(error('User not found', 404));
    // { status: 'error', message: 'User not found', code: 404 }
  }
  res.json(success(user));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(error('Internal server error', 500));
});
```

## Pagination

Auto-paginate any REST API that supports `page` and `limit` params:

```javascript
const { paginate } = require('api-commons');

// Fetch ALL pages automatically
const allUsers = await paginate('https://api.example.com/users', {
  limit: 50  // items per page
}).all();

console.log(allUsers.length); // Could be hundreds
```

## Real-World Example

```javascript
const { get, post, success, error } = require('api-commons');

class UserService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getUser(id) {
    try {
      const raw = await get(this.baseUrl + '/users/' + id);
      return success(JSON.parse(raw));
    } catch (err) {
      return error('Failed to fetch user: ' + err.message, 502);
    }
  }

  async createUser(data) {
    try {
      const result = await post(this.baseUrl + '/users', data);
      return success(result);
    } catch (err) {
      return error('Failed to create user: ' + err.message, 500);
    }
  }
}

module.exports = UserService;
```

## API Reference

| Function | Description | Returns |
|----------|-------------|---------|
| `get(url)` | HTTPS GET request | `Promise<string>` |
| `post(url, data)` | HTTPS POST with JSON body | `Promise<object>` |
| `success(data)` | Format success response | `{ status, data }` |
| `error(msg, code)` | Format error response | `{ status, message, code }` |
| `paginate(url, opts)` | Create paginator | `{ all(): Promise<array> }` |

## Error Handling

```javascript
const { get } = require('api-commons');

try {
  const data = await get('https://api.example.com/data');
} catch (err) {
  // err.message contains the error description
  // Network errors, timeouts, DNS failures all throw here
  console.error('Request failed:', err.message);
}
```

## Contributing

1. Fork it
2. Create your feature branch
3. Add tests for new functionality
4. Ensure `npm test` passes
5. Submit a PR

## License

[MIT](./LICENSE)