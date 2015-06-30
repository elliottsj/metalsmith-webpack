# metalsmith-webpack [![Build Status][travis-badge]][travis]

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

A [webpack][] plugin for [Metalsmith][].

## install

```
npm install elliottsj/metalsmith-webpack
```

## usage

```js
var webpack = require('metalsmith-webpack')

Metalsmith(__dirname)
  .use(webpack(options))
  .build()
```

### options

See the [webpack configuration][] documentation for details.

## example

```js
Metalsmith(__dirname)
  .use(webpack({
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, './build/'),
      filename: 'bundle.js'
    }
  }))
  .build()
```

See the [tests][] for more examples.

## tests

```
$ npm test
```

## license

MIT License, see [LICENSE](https://github.com/elliottsj/metalsmith-webpack/blob/master/LICENSE.md) for details.

[travis]: https://travis-ci.org/elliottsj/metalsmith-webpack
[travis-badge]: https://travis-ci.org/elliottsj/metalsmith-webpack.svg?branch=master
[metalsmith]: http://www.metalsmith.io/
[tests]: https://github.com/elliottsj/metalsmith-webpack/blob/master/test/index.js
[webpack]: http://webpack.github.io/
[webpack configuration]: http://webpack.github.io/docs/configuration.html
