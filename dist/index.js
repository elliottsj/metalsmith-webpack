'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = plugin;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _memoryFs = require('memory-fs');

var _memoryFs2 = _interopRequireDefault(_memoryFs);

var _tty = require('tty');

var _tty2 = _interopRequireDefault(_tty);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

function plugin(config) {
  var compiler = (0, _webpack2['default'])(config);
  var files = {};
  var fs = new _memoryFs2['default'](files);
  compiler.outputFileSystem = new _memoryFs2['default'](files);
  return function (files, metalsmith, done) {
    compiler.run(function (err, stats) {
      if (err) {
        done(err);
        return;
      }
      var info = stats.toString({ chunkModules: false, colors: useColors() });
      if (stats.hasErrors()) {
        done(info);
        return;
      }
      console.log(info);
      fs.readdirSync(config.output.path).forEach(function (file) {
        var filePath = _path2['default'].join(config.output.path, file);
        var key = getMetalsmithKey(files, filePath) || filePath;
        files[key] = {
          contents: fs.readFileSync(filePath)
        };
      });
      return done();
    });
  };
}

function useColors() {
  return _tty2['default'].isatty(1 /* stdout */);
}

function getMetalsmithKey(files, p) {
  p = normalizePath(p);
  for (var key in files) {
    if (normalizePath(key) === p) return key;
  }
  return null;
}

function normalizePath(p) {
  return p.split(_path2['default'].sep).filter(function (p) {
    return typeof p === 'string' && p.length > 0;
  }).join('/');
}
module.exports = exports['default'];