import './src/scss/index.scss';

import React, { Component } from 'react';
import { Button } from 'antd';

// 避免当按钮文字为两个字符时，自动在中间添加空格的无状态组件
function ButtonChild(props) {
  return (
    <span>{props.children}</span>
  )
}
var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;

export default class IcButton extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    tag: 'button',
    type: 'secondary'
  };

  // 按钮组
  static Group = require('./src/js/button.group');

  render() {
    let props = this.props;

    let {
      children,
      className,
      tag,
      fixedWidth,
      style,
      size,

      ...other
    } = props;

    style = fixedWidth ? {
      ...style,
      width: fixedWidth
    } : style;

    tag = tag || 'button';

    fixedWidth = `${fixedWidth ? 'ic-btn-fixed-width' : ''}`;

    if (tag === 'button') {
      className = `ic-btn ${className || ''} ${fixedWidth}` +
        `${size === 'mini' ? ' ant-btn-mini' : ''}`;
      if (children && (rxTwoCNChar.test(children) ||
      (typeof (children.type) === 'string' &&
      rxTwoCNChar.test(children.props.children)))) {
        children = (
          <ButtonChild>
            {children}
          </ButtonChild>
        )
      }
    } else {
      className = `ant-btn
        ant-btn-${props.type}
        ${size ? 'ant-btn-' + {large: 'lg', small: 'sm', mini: 'mini'}[size] : ''}
        ic-btn ${className || ''} ${fixedWidth}`;
    }

    className = className.replace(/([\r\n]+)|\s+/g, ' ');

    return tag === 'button' ? (
      <Button
        {...other}
        className={className}
        style={style}
        size={size}
      >
        {children}
      </Button>
    ) : (
      React.createElement(tag, {
        ...other,
        className,
        style
      }, children)
    );
  }
}
