// Response formatter
function success(data) { return { status: 'ok', data }; }
function error(msg, code) { return { status: 'error', message: msg, code }; }
module.exports = { success, error };