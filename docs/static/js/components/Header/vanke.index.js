import './src/scss/homepage.index.scss';

import React, {Component} from 'react';
import {Link} from 'react-router';
import Icon from '@js-common-components/Icon';
import Logo from '@js-common-components/Logo/vanke.index.js';
import Menu from './src/js/homepage/vanke.menu.js';
import NoLoginMenu from './src/js/homepage/menu.nologin';
import Toolbar from './src/js/homepage/toolbar';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let props = this.props;
    let hasLogin = !!props.account;

    return (
      <div className="header" id="j-header">
        <div className="homepage-fixed">
          <div className="homepage-header-inner">
            <div className="homepage-logo">
              <Logo ico={true} className="_vanke-header-logo" />
            </div>
            {
              hasLogin ?
              <Menu
                {...props}
              />
              :
              <NoLoginMenu
                {...props}
              />
            }
            {
              hasLogin &&
              <div className="homepage-other">
                <Toolbar {...props}/>
              </div>
            }
              </div>
        </div>
      </div>
    )
  }
}
