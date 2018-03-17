/**
 * 移除开发环境带有雪碧图标记的文件bas64编码中的雪碧图标记
 */

var assert = require('assert');
var _ = require('lodash');

function FixInvalidBase64(options) {
  this.pattern = /\?#_sprite(\.[a-zA-Z0-9-]+)?_/g;

  assert.equal(options, undefined, 'The FixInvalidBase64 does not accept any options');
}

FixInvalidBase64.prototype.apply = function(compiler) {
  var self = this;

  compiler.plugin('emit', function(compilation, callback) {
    var assets = compilation.assets;

    _.each(assets, function(v, k) {
      if (/\.js$/g.test(k) && !v.__fixed__) {
        var source = v.source();

        if (self.pattern.test(source)) {
          source = source.replace(self.pattern, '');

          v.source = function() {
            return source;
          };

          v.size = function() {
            return source.length;
          };
        }
        v.__fixed__ = true;
      }
    });
    return callback();
  });
};

module.exports = FixInvalidBase64;
