import React, { Component } from 'react';
import Loadable from 'react-loadable';

import Loading from './loading';

const MainPage = Loadable({
  loader: () => {
    return import('./components/main-page.js');
  },

  loading: Loading
});

export default class Main extends Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <MainPage
        {...this.props}
      />
    );
  }
}