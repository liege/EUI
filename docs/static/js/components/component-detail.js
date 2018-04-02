import React, { Component } from 'react';



// import DDD from './Button/README.md';
// import DDD from './hello.md';
import DDD from './RE.md';
console.log(DDD);
// import Hello from './hello.md';

export default class EuiComponent extends Component {
  constructor(...args) {
      super(...args);
  }
  componentDidMount() {
    console.log(this.props);
    let { params } = this.props.match;
    // let README = require.context(
    //     '@packages', true, /\.md$/
    // )(`./${params.component}/README.md`);
    // console.log(README);
  }
  render() {
    let {
      match,
      location
    } = this.props;
    let Readme = this.README;
    return (
      <div>
          <DDD/>
          eui component
      </div>
    );
  }
}