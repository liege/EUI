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

// 参数检查
function checkArgs(args) {
  return typeof args === 'string' && !!args;
}

module.exports = function(name, label, cmd) {
  // 参数不对，显示帮助信息
  if (!checkArgs(name) || !checkArgs(label)) {
    console.log('组件名和中文名不能为空！'.red);

    return execSync('yarn component -h', {
      stdio: [1, 1, 1]
    });
  }

  // 待创建的组件根目录
  const COMPONENT_ROOT = path.resolve(path.resolve(
    process.cwd(), './packages'
  ), name);

  // 检查是否存在同名组件
  if (fs.existsSync(COMPONENT_ROOT)) {
    return console.log('已存在同名组件'.yellow);
  }

  // 组件结构
  let component_structure = yaml.parse(fs.readFileSync(
    path.resolve(__dirname, './component.yaml'), 'utf8'
  ));

  // 将组件中文名放入 README.md
  component_structure['README.md'] = `# ${name} ${label}\n\n\n`;

  // 创建组件目录及文件
  touchp(component_structure, COMPONENT_ROOT);

  // 初始化包
  execSync(`cd ${COMPONENT_ROOT} && yarn init`, {
    stdio: [1, 1, 1]
  });
};
