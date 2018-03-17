import React, { Component } from 'react';

import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

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
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
        >
          {
            window.PACKAGES.map((it) => {
              return (
                <Menu.Item key="{it.name}">
                  <Icon type="user" />
                  <span className="nav-text">
                    {it.name}
                    &nbsp;
                    {it.label}
                  </span>
                </Menu.Item>
              );
            })
          }
        </Menu>
      </Sider>

      <Layout
        style={{
          marginLeft: 200
        }}
      >
        <Header
          style={{
            background: '#fff',
            padding: 0
          }}
        />
        <Content
          style={{
            margin: '24px 16px 0', 
            overflow: 'initial'
          }}
        >
          <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
            ...
          <br />
            Really
            <br />...<br />...<br />...<br />
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />
            content
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
