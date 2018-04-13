import './index.scss';

import React, { Component } from 'react';
import { render } from 'react-dom';

import Button from '../index';

export default class ButtonExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="button-example">
        <dl>
          <dt>大小：</dt>
          <dd>
            <p className="singl-btn">
              <Button size="large">大号</Button>
              <Button>中号</Button>
              <Button size="small">小号</Button>
              <Button size="mini">迷你</Button>
            </p>
          </dd>
        </dl>

        <dl>
          <dt>固定宽度：</dt>
          <dd>
            <p className="singl-btn">
              <Button fixedWidth={90} size="large">大号</Button>
              <Button fixedWidth={90} size="large">大号字多</Button>

              <Button fixedWidth={90}>中号</Button>
              <Button fixedWidth={90}>中号字多</Button>

              <Button fixedWidth={90} size="small">小号</Button>
              <Button fixedWidth={90} size="small">小号字多</Button>
            </p>
          </dd>
        </dl>

        <dl>
          <dt>样式：</dt>
          <dd>
            <p className="singl-btn">
              <Button type="primary">主要</Button>
              <Button>次要</Button>
              <Button type="ghost">镂空</Button>
              <Button type="dashed">虚线</Button>
            </p>
          </dd>
        </dl>

        <dl>
          <dt>按钮标签：</dt>
          <dd className="singl-btn" style={{
            marginBottom: 20
          }}>
            <Button size="large" type="primary">span标签</Button>
            <Button href="http://github.com" target="_blank"  tag="a" >a标签</Button>
            <Button size="small" tag="div" type="ghost">div标签</Button>

            <Button type="primary">主要</Button>
            <Button disabled href="http://github.com" target="_blank"  tag="a" >链接禁用</Button>
            <Button type="ghost">镂空</Button>
            <Button type="dashed">虚线</Button>
          </dd>
        </dl>

        <dl>
          <dt>按钮组：</dt>
          <dd>
            <div style={{
              marginLeft: 10,
              marginBottom: 20
            }}>

              <Button.Group>
                <Button size="large">left</Button>
                <Button size="large">center</Button>
                <Button size="large">right</Button>
              </Button.Group>

              <Button.Group style={{
                marginLeft: 10
              }}>
                <Button type="primary">left</Button>
                <Button type="primary">center</Button>
                <Button type="primary">right</Button>
              </Button.Group>

              <Button.Group style={{
                marginLeft: 10
              }}>
                <Button>left</Button>
                <Button>center</Button>
                <Button>right</Button>
              </Button.Group>

              <Button.Group style={{
                marginLeft: 10
              }}>
                <Button type="ghost">left</Button>
                <Button type="ghost">center</Button>
                <Button type="ghost">right</Button>
              </Button.Group>

              <Button.Group style={{
                marginLeft: 10
              }}>
                <Button type="dashed">left</Button>
                <Button type="dashed">center</Button>
                <Button type="dashed">right</Button>
              </Button.Group>

              <Button.Group style={{
                marginLeft:10
              }}>
                <Button size="small">left</Button>
                <Button size="small">center</Button>
                <Button size="small">right</Button>
              </Button.Group>
            </div>
          </dd>
        </dl>

        <dl>
          <dt>loading状态：</dt>
          <dd>
            <p
              className="singl-btn"
            >
              <Button type="primary" loading={true}>Loading状态</Button>
              <Button loading={true}>Loading状态</Button>
              <Button type="ghost" loading={true}>Loading状态</Button>
              <Button type="dashed" loading={true}>Loading状态</Button>
            </p>
          </dd>
        </dl>

        <dl>
          <dt>禁用状态：</dt>
          <dd>
            <p
              className="singl-btn"
            >
              <Button type="primary" disabled>禁用状态</Button>
              <Button disabled>禁用状态</Button>
              <Button type="ghost" disabled>禁用状态</Button>
              <Button icon="poweroff" type="dashed" disabled>禁用状态</Button>
            </p>
          </dd>
        </dl>
      </div>
    );
  }
}

// render(
//   <ButtonExample />,
//   document.getElementById('j-react-root')
// );
