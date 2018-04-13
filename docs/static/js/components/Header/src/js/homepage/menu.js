import React, {Component} from 'react';
import {Link} from 'react-router';
import {getMenu, getSubMenu} from './@p@.menu.data';
import SubMenu from './submenu';
import Icon from '@js-common-components/Icon';
const MENU = getMenu();
const SUBMENU = getSubMenu();

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state= {
      visible: false,
      sub: [],
      distance: 350,
      activeName: ''
    }
    this.handleEnter= this.handleEnter.bind(this);
    this.handleLeave= this.handleLeave.bind(this);
    this.getActive = this.getActive.bind(this);
  }
  handleEnter(item, distance) {
    this.timer && clearTimeout(this.timer);
    this.submenu.clearTimer();
    this.enterTimer = setTimeout(() => {
      this.setState({
        visible: true,
        sub: item.sub,
        distance: distance,
        activeName: item.name
      })
    }, 200)
  }
  handleLeave() {
    this.enterTimer && clearTimeout(this.enterTimer);
    this.timer= setTimeout(() => {
      this.setState({
        visible: false,
        activeName: ''
      })
    }, 200)
  }
  getActive(urlPath, navPath) {
    if (typeof navPath === 'string') {
      return urlPath.split('/')[1] === navPath.split('/')[1]
    }
    return navPath.indexOf(urlPath.split('/')[1]) > -1
  }
  render() {
    let props = this.props;
    let state = this.state;
    let pathname = props.location.pathname;
    let getActive = this.getActive;
    return (
      <div className="homepage-nav">
        <ul className="homepage-header-ul">
          {
            MENU.map((it, index) => {
              let activeClass = getActive(pathname, it.path) ? 'active' : '';
              return (
                <li
                  className={"_ul-li " + activeClass}
                  key={it.path}
                >
                  <Link
                    to={it.path}
                  >
                    {it.name}
                  </Link>
                </li>
              )
            })
          }
          {
            SUBMENU.map((it, index) => {
              let subPath = it.sub.map((p, index) => {
                return p.path.split('/')[1]
              })
              let activeClass = getActive(pathname, subPath) ? 'active' : '';
              let hoverClass = state.activeName === it.name ? 'over' : ''
              return (
                <li
                  className={"_ul-li _li-icon " + activeClass + ' ' + hoverClass}
                  key={it.path}
                  onMouseEnter={(e) => {
                    let wd = e.target.clientWidth;
                    let offleft = e.target.offsetLeft;
                    let distance = offleft + wd/2 -15;
                    this.handleEnter(it, distance)
                  }}
                  onMouseLeave={(e) => {
                    this.handleLeave()
                  }}
                >
                  <span className="_span-icon">
                    {it.name}
                    <Icon type="spread "/>
                  </span>
                </li>
              )
            })
          }
        </ul>
        <SubMenu
          sub={state.sub}
          visible={state.visible}
          onClose={() => {
            this.setState({
              visible: false,
              activeName: ''
            })
          }}
          distance={state.distance}
          parent={this}
          ref={(submenu) => {
            this.submenu = submenu
          }}
        />
      </div>
    )
  }

}
