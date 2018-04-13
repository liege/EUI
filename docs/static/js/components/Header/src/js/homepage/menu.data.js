const INTERPOLATETYPE = window.ACCOUNT.interpolateType * 1 ?
 window.ACCOUNT.interpolateType * 1 : 0;
const CUSTOMIZE_PATH = {
  valeo: {neitui: '/referral/home'},
  webank: {neitui: '/interpolate'}
}[CUSTOMIZE_NAME] || {
  neitui: {
    0: '/referral/intro',
    1: '/referral/home',
    2: '/interpolate'
  }[INTERPOLATETYPE]
};

const NAVS = [{
  name: '首页',
  path: '/todo'
}, {
  name: '职位',
  path: '/position'
}, {
  name: '智能推荐',
  path: '/recommend'
}, {
  name: '招聘管理',
  sub: [{
    icon: 'color-nav_flow',
    name: '流程管理',
    path: '/ats/delivery',
    desc: '全流程管理招聘进度'
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
  }, {
    icon: 'color-nav_recommend',
    name: '内推',
    tagA: true,
    path: CUSTOMIZE_PATH.neitui,
    desc: '内推职位及伯乐管理'
  }]
}, {
  name: 'AI雇品',
  sub: [{
    icon: 'color-nav_computer',
    name: '机器猎头',
    tagA: true,
    path: '/aihunter/intro',
    desc: '用AI智能传播雇主价值'
  }, {
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
    icon: 'color-appraisal',
    name: '人才质量',
    tagA: true,
    blank: true,
    path: '/evaluate',
    desc: '公司人才的行业画像'
  }, {
    icon: 'color-nav_map',
    name: '人才地图',
    path: '/aipolicy/map',
    desc: '掌握竞争对手人才情报'
  }, {
    icon: 'color-nav_forecast',
    name: '离职预测',
    tagA: true,
    blank: true,
    path: '//dt.ifchange.com/',
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
