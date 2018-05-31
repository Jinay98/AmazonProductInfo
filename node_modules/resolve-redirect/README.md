# resolve-redirect

Follows redirects and passes back last URL

## Install

```sh
npm i resolve-redirect -S
```

## Usage

```javascript
import resolveRedirect from 'resolve-redirect';

resolveRedirect('http://bit.ly/1TCI5N0')
  .then(url => console.log(url));
// => https://github.com/cezary/resolve-redirect
```

## License

MIT
