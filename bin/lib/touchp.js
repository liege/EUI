const colors = require('colors');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const isArray = (args) => {
  return '[object Array]' === toString.call(args);
};
const isObject = (args) => {
  return '[object Object]' === toString.call(args);
};

// 把目录结构转换为路径列表
function structure2path(structure, p, res) {
  // 当前函数
  const callee = arguments.callee;

  p = p || '';
  res = res || {};

  // 遍历目录结构
  _.each(structure, function (v, k) {
    if (typeof v === 'object') {
      // 递归调用
      return callee(v, path.join(p, k), res);
    } else {
      if (isArray(structure)) {
        k = v;
        v = '';
      }

      res[path.join(p, k || '')] = v;
    }
  });

  return res;
}

// 创建文件并写入内容
function touchpSync(filepath, content) {
  let dirpath = path.dirname(filepath);

  if (!fs.existsSync(filepath)) {
    mkdirp.sync(dirpath);

    fs.writeFileSync(filepath, content || '', 'utf8');
    return true;
  } else {
    console.warn(`${filepath} already exists!`.yellow);
    return false;
  }
}

// 创建
module.exports = function (structure, root) {
  let paths = structure2path(structure, root);

  _.each(paths, (val, key) => {
    touchpSync(key, val)
      && console.log(`${key} created successfully!`.green);
  });
};
