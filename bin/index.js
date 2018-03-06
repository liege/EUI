const colors = require('colors');
const commander = require('commander');

// 使用帮助
commander.usage('使用 yarn command -h 查看命令详细介绍，如：yarn component -h');

// 添加组件
commander.command('component')
  .description('添加新组件')
  .option('-n, --name <component name>', '组件名称')
  .action(require('./cmd/component'));

// 解析命令行参数
commander.parse(process.argv);
if (!commander.args.length) {
  return commander.help();
}
