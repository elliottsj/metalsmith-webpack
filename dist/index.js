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
  compiler.outputFileSystem = new _memoryFs2['default']();
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
      compiler.outputFileSystem.readdirSync(config.output.path).forEach(function (file) {
        var filePath = _path2['default'].join(config.output.path, file);
        var key = _path2['default'].relative(metalsmith.destination(), filePath);
        files[key] = {
          contents: compiler.outputFileSystem.readFileSync(filePath)
        };
      });
      return done();
    });
  };
}

function useColors() {
  return _tty2['default'].isatty(1 /* stdout */);
}
module.exports = exports['default'];