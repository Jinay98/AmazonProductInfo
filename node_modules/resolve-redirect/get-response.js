const http = require('http');
const https = require('https');
const parseUrl = require('url').parse;

module.exports = getResponse;

function getResponse(url, callback) {
  callback = callback || noop;
  const parsedUrl = parseUrl(url);
  const path = parsedUrl.search ? (parsedUrl.pathname + '?' + parsedUrl.search) : parsedUrl.pathname;

  if (!(parsedUrl.protocol && parsedUrl.host && path)) {
    const err = new Error('Not a valid URL: ' + url);
    callback(err);
    throw err;
  }

  return new Promise((resolve, reject) => {
    const req = ('https:' === parsedUrl.protocol ? https : http).request({
      method: 'HEAD',
      host: parsedUrl.host,
      path: path
    });

    req.on('response', function(res) {
      callback(null, res);
      resolve(res);
    });

    req.on('error', function(err) {
      callback(err);
      reject(err)
    });

    req.end();
  });
}

function noop() {}
