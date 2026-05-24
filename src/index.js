const { get } = require('./http-client');
const { success, error } = require('./response');

function post(url, data) {
  const https = require('https');
  const payload = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) }
    };
    const req = https.request(options, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve(JSON.parse(d)); }
        catch { resolve(d); }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function paginate(url, options = {}) {
  const limit = options.limit || 100;
  const results = [];
  let page = 1;
  return {
    async all() {
      while (true) {
        const separator = url.includes('?') ? '&' : '?';
        const data = await get(url + separator + 'page=' + page + '&limit=' + limit);
        const parsed = JSON.parse(data);
        if (!Array.isArray(parsed) || parsed.length === 0) break;
        results.push(...parsed);
        if (parsed.length < limit) break;
        page++;
      }
      return results;
    }
  };
}

module.exports = { get, post, success, error, paginate };