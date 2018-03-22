/**
 * 添加组件依赖
 * 
 * @param {String} name 组件名称
 * @param {String} version 组件版本
 */

const path = require('path');
const fs = require('fs');
const prettyJs = require('pretty-js');

module.exports = function(name, version, cmd) {
  const dir = process.cwd();

  if (!/eui\/packages$/.test(path.dirname(dir))) {
    return console.log(
      '请在 eui/packages 中的某个组件目录下执行该命令'.red
    );
  }

  if (!name || typeof name !== 'string') {
    return console.log('请指定依赖的包的名字'.red);
  }

  if (!fs.existsSync(
    path.resolve(path.dirname(dir), name)
  )) {
    return console.log(`包 ${name} 不存在`.red);
  }

  let packageJson = require(
    path.resolve(dir, './package.json')
  );

  packageJson.devDependencies = packageJson.devDependencies || {};
};
