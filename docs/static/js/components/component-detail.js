import React, { Component } from 'react';
import marked from 'marked';
import { request } from 'https';

var md = require('markdown-it')();

// import ReadMe from '../README.md';
// console.log(ReadMe);

import Dt, { meta } from './document.mdx'
import Dt2 from './document2.mdx'

console.log(Dt);

export default class EuiComponent extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      importCode: ''
    }
  }

  componentWillMount() {
    // console.log(marked('# 123 `haha`'));
    // console.log(md.renderInline('__markdown-it__ rulezz!'))
  }

  componentDidMount() {
    console.log(this.props);
    let { params } = this.props.match;
    
    // let README = require.context(
    //   '@packages', true, /\.md$/
    // )(`./${params.component}/README.md`);

    // console.log('README--->', README);
    // let readmeTxt = marked(README.default.markdownContent)
    // let code = README.default.code;

    // console.log(readmeTxt);
    // let code = `${readmeTxt}`.match(/import.*[</code></pre>$]/)[0];
    // console.log(code);
    
    // document.querySelector('.content').innerHTML = marked(readmeTxt);

    let requireTs = require.context(
      './Button', true, /\.js$/
    )(`./examples/index.js`);
    
    this.setState({
      // importCode: LocalCode
    })
  }

  render() {
    let {
      match,
      location
    } = this.props;

    // let Readme = this.README;
    let Code = this.state.importCode;

    return (
      <div>   
        <Dt/>
        {/* <ReadMe/> */}
        <div className="title">eui component</div>
        <div className="content">
        </div>
        {/* {
          Code ? <Code /> : null
        } */}
      </div>
    );
  }
}
