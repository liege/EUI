import React, { Component } from 'react';
import { Button } from 'antd';

/**
 * HelloWorld
 * @param {Object} props React props
 * @returns {JSX} template
 */
export default function HelloWorld(props) {
  return (
    <div className="hello-world">
      Hello { props.who }
        <Button>
            一个按钮
        </Button>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="danger">Danger</Button>
    </div>
  );
}

HelloWorld.defaultProps = {
  who: 'World'
};