import style from '../scss/index.scss';

import React, { Component } from 'react';
import { upperFirst } from 'lodash';
import { Layout, Menu, Icon } from 'antd';
import { Link, Route, Switch, NavLink } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;


import NotFound from './notfound';
import EuiComponent from './component.js';
import Main from './main.js';

export default () => {
  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0
        }}
      >
        <div
          className={style.logo}
        >
          <Link to="/">EUI</Link>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={['components']}
        >
          <Menu.Item
          >
            <NavLink
              to="/"
              exact
              activeClassName="ant-menu-item-selected"
            >
              <span
                className={style['nav-text']}
              >
                首页
              </span>
            </NavLink>
          </Menu.Item>

          <Menu.SubMenu
            title="组件"
            key="components"
          >
          {
            window.PACKAGES.map((it) => {
              return (
                <Menu.Item
                  key={it.name}
                >
                  <Link
                    to={`/component/${it.name}`}
                    // activeClassName="ant-menu-item-selected" // 导致Warning
                  >
                    <span
                      className={style['nav-text']}
                    >
                      {upperFirst(it.name)}
                      <span
                        className={style['component']}
                      >
                        {it.label}
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
              );
            })
          }
          </Menu.SubMenu>
        </Menu>
      </Sider>

      <Layout
        style={{
          marginLeft: 200,
          background: '#fff'
        }}
      >
        <Content>
          <div className={style['content-wrap']}>
            <Switch>
              <Route
                path="/"
                exact
                component={Main}
              />

              <Route
                path="/component/:component"
                exact
                component={EuiComponent}
              />

              <Route
                component={NotFound}
              />
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
