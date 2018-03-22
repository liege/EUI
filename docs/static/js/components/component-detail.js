import React, { Component } from 'react';
// import marked from 'marked';

export default class EuiComponent extends Component {
  constructor(...args) {
    super(...args);
  }

  componentDidMount() {
    console.log(this.props);
    let { params } = this.props.match;

    let README = require.context(
      '@packages', true, /\.md$/
    )(`./${params.component}/README.md`);

    console.log(README);
  }

  render() {
    let {
      match,
      location
    } = this.props;

    let Readme = this.README;

    return (
      <div>
        eui component
      </div>
    );
  }
}
