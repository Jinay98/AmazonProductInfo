const test = require('ava');
const resolveRedirect = require('..');

test('url without protocol', t => {
  t.throws(() => resolveRedirect('www.google.com'));
});

test('url with basic redirect', t => {
  return resolveRedirect('http://google.com/').then(url =>
    t.is(url, 'http://www.google.com/'));

});

test('url without redirect', t => {
  return resolveRedirect('http://www.google.com/').then(url =>
    t.is(url, 'http://www.google.com/'));

});

test('secure url with redirect', t => {
  return resolveRedirect('https://google.com/').then(url =>
    t.is(url, 'https://www.google.com/'));

});

test('secure url without redirect', t => {
  return resolveRedirect('https://www.google.com/').then(url =>
    t.is(url, 'https://www.google.com/'));

});

test('broken url', t => {
  t.throws(() => resolveRedirect('http://feedproxy.google.com/~r/Coroflot/AllJobs/~3/69s2F4RGu-k/Designer'));
});
