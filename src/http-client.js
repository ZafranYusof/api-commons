// HTTP client wrapper
const https = require('https');
function get(url) { return new Promise((resolve, reject) => { https.get(url, res => { let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(d)); }).on('error', reject); }); }
module.exports = { get };