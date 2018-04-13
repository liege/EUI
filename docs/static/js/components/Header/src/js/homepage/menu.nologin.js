import React, {Component} from 'react';
import {Link} from 'react-router';
const MENU = [{
  name: '首页',
  path: '/todo'
}, {
  name: 'e成动态',
  path: '/trend'
}, {
  name: '帮助中心',
  path: '/helper'
}, {
  name: '关于我们',
  path: '/about',
  tagA: true
}, {
  name: '加入我们',
  path: 'http://hr.ifchange.com/',
  tagA: true,
  blank: true
}];

function getActive(urlPath, navPath) {
  if (typeof navPath === 'string') {
    return urlPath.split('/')[1] === navPath.split('/')[1]
  }
  return navPath.indexOf(urlPath.split('/')[1]) > -1
}


export default function(props) {
  let pathname = props.location.pathname;
  return (
    <div className="homepage-nav">
      <ul className="homepage-header-ul">
        {
          MENU.map((it, index) => {
            let activeClass = getActive(pathname, it.path) ? 'active' : '';
            return (
              <li
                className={"_ul-li " + activeClass}
                key={it.path}
              >
                {
                  it.tagA ?
                  <a href={it.path} 
                    target={it.blank ? '_blank' : '_self'}
                  >
                    {it.name}
                  </a>
                    :
                  <Link
                    to={it.path}
                  >
                    {it.name}
                  </Link>
                }
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}