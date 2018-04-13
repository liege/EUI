import React, { Component } from 'react';

var path = require('path');

// import README from './../../../../Button/README.md';

// import DDD from './Button/README.md';
// import DDD from './hello.md';
import DDD from './RE.md';
console.log(DDD);
// import Hello from './hello.md';

export default class EuiComponent extends Component {
  constructor(...args) {
      super(...args);

      this.state = {
        Re: null, 
        component: null
      }
  }

  ReplaceFirstUper(str) {
    str = str.toLowerCase();
    return str.replace(/\b(\w)|\s(\w)/g, function (m) {
      return m.toUpperCase();
    });
  }  

  componentDidMount() {
    console.log(this.props);
    console.log('@packages', path.resolve(__dirname, '../packages'), PACKAGES_PATH)
    let { params } = this.props.match;
    // let README = require.context(
    //   PACKAGES_PATH, true, /\.md$/
    // )(`./${params.component}/README.md`);

    // let README = require.context(
    //   './../../../../packages', true, /\.md$/
    // )(`./${params.component}/README.md`);
    // console.log('require.context--->', README)


    // let README = require.context(
    //   './../../../../Button', true, /\.md$/
    // )(`./README.md`);
    // console.log('require.context--->', README)

    let component = this.ReplaceFirstUper(params.component);
    console.log(component);
    let Re = require.context(`./`, true, /\.md$/)(`./${component}/README.md`);
    console.log('---->', Re);
    this.setState({
      Re,
      component
    });
  }

  render() {
    let {
      match,
      location
    } = this.props;
    console.log(this);
    let Readme = this.state.Re;
    return (
      <div>
        <h1>{this.state.component} 组件</h1>
          {
            Readme ? <Readme/> : null
          }
          {/* <DDD/> */}
          eui component
      </div>
    );
  }
}