import React, { Component } from 'react';
import Loadable from 'react-loadable';

import Loading from './loading';

const ComponentDetail = Loadable({
  loader: () => {
    return import('./components/component-detail.js');
  },
  
  loading: Loading
});

export default class EuiComponent extends Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <ComponentDetail
        {...this.props}
      />
    );
  }
}