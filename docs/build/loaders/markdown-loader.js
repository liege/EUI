/**
 * 将 markdown 文件转换为字符串
 */

const loaderUtils = require('loader-utils');

const aliasPattern = null;

module.exports = function (content) {
  this.cacheable && this.cacheable();
  let options = loaderUtils.getOptions(this);

  /*
  if (!aliasPattern) {
    aliasPattern = new RegExp(
      '(' + Object.keys(options.alias).join('|') + ')\/'
    );
  }
  */

  content = content.replace(/[\r\n]/gi, '\\n');

  return 'export default "' + content + '";'
};