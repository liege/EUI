// 开发环境静态资源域名
const DEV_ASSETS_DOMAIN = ['//img.dev.ifchange.com/'];

// 域名列表
const DOMAINS = {
  // 开发环境
  dev: DEV_ASSETS_DOMAIN,
  // 开发环境debug模式
  debug: DEV_ASSETS_DOMAIN,
  // testing2
  test: [
    '//img.testing2.ifchange.com/',
    '//img1.testing2.ifchange.com/',
    '//img2.testing2.ifchange.com/',
    '//img3.testing2.ifchange.com/',
    '//img4.testing2.ifchange.com/'
  ],
  // tesing3
  'test3': [
    '//img.testing3.ifchange.com/',
    '//img1.testing3.ifchange.com/',
    '//img2.testing3.ifchange.com/',
    '//img3.testing3.ifchange.com/',
    '//img4.testing3.ifchange.com/'
  ],
  // 生产环境静态资源域名列表
  prod: [
    '//img.ifchange.com/',
    '//img1.ifchange.com/',
    '//img2.ifchange.com/',
    '//img3.ifchange.com/',
    '//img4.ifchange.com/'
  ]
};

module.exports = function (env, project, domain) {
  return (
    DOMAINS[`${env}${domain}.${project}`] ||
    DOMAINS[`${env}${domain}`] ||
    DOMAINS[env]
  );
};
