/**
 * 新建组件
 * 
 * @param {String} name 组件名称
 */
const fs = require('fs');
const execSync = require('child_process').execSync;
const path = require('path');

const commander = require('commander');
const yaml = require('yamljs');

const touchp = require('../lib/touchp');

module.exports = function(name, cmd) {
  // 参数不对，显示帮助信息
  if (typeof name !== 'string' || !name) {
    return execSync('yarn component -h', {
      stdio: [1, 1, 1]
    });
  }

  // 组件文件夹
  const COMPONENTS_FOLDER = path.resolve(process.cwd(), './packages');

  // 待创建的组件根目录
  const COMPONENT_ROOT = path.resolve(COMPONENTS_FOLDER, name);

  // 检查是否存在同名组件
  if (fs.existsSync(COMPONENT_ROOT)) {
    return console.log('已存在同名组件'.yellow);
  }

  // 组件结构
  const COMPONENT_STRUCTURE = yaml.parse(fs.readFileSync(
    path.resolve(__dirname, './component.yaml'), 'utf8'
  ));

  // 创建组件目录及文件
  touchp(COMPONENT_STRUCTURE, COMPONENT_ROOT);

  // 初始化包
  execSync(`cd ${COMPONENT_ROOT} && yarn init`, {
    stdio: [1, 1, 1]
  });
};
