const NAVS = [{
  name: '首页',
  path: '/todo'
}, {
  name: '职位管理',
  path: '/position'
}, {
  name: '简历搜索',
  sub: [{
    icon: 'color-wanke-search',
    name: '主动搜索',
    path: '/search',
    desc: '简历库中寻找候选人'
  }, {
    icon: 'color-wanke-report',
    name: '智能推荐',
    path: '/recommend',
    desc: 'AI算法智能精准匹配'
  }]
}, {
  name: '招聘管理',
  sub: [{
    icon: 'color-nav_flow',
    name: '社会招聘',
    path: '/ats/delivery?recruit_type=1',
    desc: '用于日常及专场招聘'
  }, {
    icon: 'color-wanke-college',
    name: '校园招聘',
    path: '/srs/screening?type=2',
    desc: '用于大规模校园及实习生招聘'
  }, {
    icon: 'color-wanke-internal',
    name: '内部招聘',
    path: '/ats/delivery?recruit_type=4',
    desc: '用于集团内部岗位竞聘'
  }, {
    icon: 'color-nav_statement',
    name: '报表',
    path: '/report/recruitment-process',
    desc: '可视化的工作效率分析'
  }]
}, {
  name: 'AI渠道',
  sub: [{
    icon: 'color-nav_service',
    name: '猎头服务',
    path: '/headhunter',
    desc: '猎企及推荐简历管理'
  }, {
    icon: 'color-nav_archives',
    name: '人才库',
    path: '/archives/library',
    desc: '多渠道更新盘活已有简历'
  }]
}, {
  name: 'AI雇品',
  sub: [{
  //   icon: 'color-nav_computer',
  //   name: '机器猎头',
  //   tagA: true,
  //   path: '/archives/library',
  //   desc: '猎企及推荐简历管理'
  // }, {
    icon: 'color-nav_brand',
    name: '雇主品牌',
    tagA: true,
    path: '/wezhaopin/customers/portrait',
    desc: '微信建站与雇品内容传播'
  }, {
    icon: 'color-public_opinion',
    name: '企业舆情',
    tagA: true,
    path: '/opinion/intro',
    desc: '企业口碑监测与分析'
  }, {
    icon: 'color-nav_departure',
    name: '离职员工',
    path: '/aicustomers/leave',
    desc: '离职员工简历更新提醒'
  }]
}, {
  name: 'AI决策',
  sub: [{
    icon: 'color-nav_map',
    name: '人才地图',
    path: '/aipolicy/map',
    desc: '掌握竞争对手人才情报'
  }, {
    icon: 'color-nav_forecast',
    name: '离职预测',
    tagA: true,
    blank: true,
    path: 'http://dt.ifchange.com/',
    desc: '员工离职动向早知晓'
  }]
}]

export function getMenu(name) {
  return NAVS.filter((it, index) => {
    return !it.sub
  })
}
export function getSubMenu(name) {
  return NAVS.filter((it, index) => {
    return !!(it.sub)
  })
}
