# metalsmith-plugin-webpack

[![Greenkeeper badge](https://badges.greenkeeper.io/elliottsj/metalsmith-plugin-webpack.svg)](https://greenkeeper.io/)
[![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david] [![devDependency Status][david-dev-badge]][david-dev]

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

A [webpack][] plugin for [Metalsmith][].

## install

```
npm install metalsmith-plugin-webpack
```

## usage

```js
var webpack = require('metalsmith-plugin-webpack')

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

MIT License, see [LICENSE](https://github.com/elliottsj/metalsmith-plugin-webpack/blob/master/LICENSE.md) for details.

[travis]: https://travis-ci.org/elliottsj/metalsmith-plugin-webpack
[travis-badge]: https://travis-ci.org/elliottsj/metalsmith-plugin-webpack.svg?branch=master
[david]: https://david-dm.org/elliottsj/metalsmith-plugin-webpack
[david-badge]: https://david-dm.org/elliottsj/metalsmith-plugin-webpack.svg
[david-dev]: https://david-dm.org/elliottsj/metalsmith-plugin-webpack#info=devDependencies
[david-dev-badge]: https://david-dm.org/elliottsj/metalsmith-plugin-webpack/dev-status.svg
[metalsmith]: http://www.metalsmith.io/
[tests]: https://github.com/elliottsj/metalsmith-plugin-webpack/blob/master/test/index.js
[webpack]: http://webpack.github.io/
[webpack configuration]: http://webpack.github.io/docs/configuration.html
