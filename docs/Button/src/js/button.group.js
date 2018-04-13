import React, { Component } from 'react';
import { Button } from 'antd';
const Group = Button.Group;

export default class ButtonGroup extends Component {
  constructor(props) {
    super(props);

    this.className = 'ic-btn-group ';
  }

  render() {
    let {
      className,
      ...other
    } = this.props;

    return (
      <Group
        {...other}
        className={
          this.className + (className || '')
        }
      />
    );
  }
}
