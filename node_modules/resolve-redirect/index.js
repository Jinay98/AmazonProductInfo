const getResponse = require('./get-response');

module.exports = resolveRedirect;

function resolveRedirect(url, maxRedirect, callback) {
  maxRedirect = maxRedirect || 3;
  callback = callback || noop;
  if (typeof maxRedirect === 'function') {
    callback = maxRedirect;
    maxRedirect = 3;
  }

  let count = 0,
    currentUrl = url;

  return getResponse(currentUrl)
    .then(function handleResponse(response) {
      let done;
      if (response.statusCode === 301 || response.statusCode === 302) {
        currentUrl = response.headers.location;
        count = count + 1;
      } else {
        done = true;
      }

      if (done || count >= maxRedirect) {
        callback(null, currentUrl);
        return currentUrl;
      } else {
        return getResponse(currentUrl).then(handleResponse);
      }
    }).catch(function(err) {
      callback(err, currentUrl);
      throw err;
    });
}

function noop() {}
