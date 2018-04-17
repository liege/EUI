import React, { Component } from 'react';

var path = require('path');


export default class EuiComponent extends Component {
  constructor(...args) {
      super(...args);

      this.state = {
        README: null, 
        component: null
      }
  }

  // 转换首字母大写
  ReplaceFirstUper(str) {
    str = str.toLowerCase();
    return str.replace(/\b(\w)|\s(\w)/g, function (m) {
      return m.toUpperCase();
    });
  }  

  componentDidMount() {
    console.log(this.props);
    console.log('@packages', path.resolve(__dirname, './packages'), PACKAGES_PATH)
    let { params } = this.props.match;
    let component = this.ReplaceFirstUper(params.component);
    console.log(component);

    let README = require.context(
      PACKAGES_PATH, true, /\.md$/
    )(`./${component}/README.md`);

    console.log('require.context--->', README)
    this.setState({
      component,
      README
    });
  }

  render() {
    let {
      match,
      location
    } = this.props;
    console.log(this);
    let Readme = this.state.README;
    return (
      <div>
        <h1>{this.state.component} 组件API</h1>
          {
            Readme ? <Readme/> : null
          }
          eui component
      </div>
    );
  }
}