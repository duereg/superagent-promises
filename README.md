superagent-promises
===================

Wraps superagent requests in Bluebird promises.

## Usage

e.g

```javascript
require('superagent').get('http://api.mysite.com/?id=23432').use(require('superagent-promises')).end();
```

### Note on testing

superagent-promises caches the native `.end()` method of superagent. For testing purposes an `.uncache()` method is provided, which should be called immediately before spying or stubbing `superagent.end()`
