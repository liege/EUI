/**
 * 后端模板清理
 */
function WebpackArrangeTemplate() {

}

WebpackArrangeTemplate.prototype.apply = function (compiler) {
  compiler.plugin('compilation', (compilation) => {
    compilation.plugin(
      'html-webpack-plugin-before-html-processing', (data, callback) => {
        console.log('----->', data);
        data.html += '==========';
        return callback(null, data);
      }
    )
  });
};

module.exports = WebpackArrangeTemplate;
