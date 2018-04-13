import React, { Component } from 'react';
import { Link } from 'react-router';
import Cookie from 'js-cookie';
import { get } from 'lodash';
import Icon from '@js-common-components/Icon';
import Img from '@js-common-components/Img';
import { formatNumer } from '@js-common/lib/utils';

const MENU_MAP = [
  {
    icon_name: 'integral',
    value: '积分',
    key: 'points',
    key_suffix: '分',
    link: '/account/integral'
  },
  {
    icon_name: 'amount',
    value: '充值余额',
    key: 'usableBalance',
    key_suffix: '元',
    formatFunc: formatNumer,
    link: '/account/profile'
  },
  {
    hr: true
  },
  {
    icon_name: 'reward',
    value: '礼金券',
    key: 'coupon',
    key_suffix: '元',
    formatFunc: formatNumer,
    link: '/account/profile'
  },
  {
    icon_name: 'People',
    value: '账户管理',
    link: '/account/profile'
  },
  {
    tag: 'a',
    icon_name: 'Settings',
    value: '设置',
    link: '/account/settings#/third-party'
  },
  {
    hr: true
  },
  {
    tag: 'a',
    icon_name: 'logout',
    value: '退出登录',
    link: `/account/logout?t=${Cookie.get('tob_csrf_token')}`
  }
];

//  等级图片
const LevelImg = {
  1: require('../../img/level_1.svg'),
  2: require('../../img/level_2.svg'),
  3: require('../../img/level_3.svg'),
  4: require('../../img/level_4.svg'),
  5: require('../../img/level_5.svg')
}[get(window.ACCOUNT, 'members.active.id') || 1];

export default function userMsg(props) {
  const account = window.ACCOUNT || {};
  account.points = props.points;

  return (
    <div className="header-user-wrapper">
      <div className="header-user-info">
        <Link
          to="/account/company?comefrom=logo"
          className="header-user-avatar"
          onClick={props.onClick}
        >
          <img src={account['upload[logo]']} />
        </Link>
        <p className="header-user-exp">
          <Img src={LevelImg} fitResolution={false} />
        </p>
        <p className="header-user-name">
          {account.email}
        </p>
      </div>
      <ul className="header-user-list">
        {
          MENU_MAP.map((item) => {
            if (item.hr) {
              return <li className="header-user-item-hr" />
            }

            //  退出登入需要原生 a 便签
            let Tag = item.tag || Link;

            return (
              <li className="header-user-item" onClick={props.onClick}>
                <Tag to={item.link} href={item.link} className="clearfix">
                  <span className="header-user-item-name">
                    <Icon type={item.icon_name} />
                    {item.value}
                  </span>
                  {
                    item.key &&
                    <span className="header-user-item-unit">
                      {item.formatFunc? item.formatFunc(account[item.key]) : props[item.key]} {item.key_suffix}
                    </span>
                  }
                </Tag>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
