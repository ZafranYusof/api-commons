# api-commons

> Common HTTP client utilities and response formatters for Node.js APIs.

## Installation

```bash
npm install api-commons
```

## Usage

```javascript
const { get, success, error } = require('api-commons');

// HTTP client
const data = await get('https://api.example.com/users');

// Response formatters
app.get('/users', (req, res) => {
  const users = db.getUsers();
  res.json(success(users));
});

app.use((err, req, res, next) => {
  res.status(500).json(error(err.message, 500));
});
```

## API

### HTTP Client
- `get(url)` - Promise-based HTTPS GET request
- `post(url, data)` - Promise-based HTTPS POST request

### Response Formatters
- `success(data)` - Format success response `{ status: 'ok', data }`
- `error(message, code)` - Format error response `{ status: 'error', message, code }`

## License

MIT