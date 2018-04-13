import React, {Component} from 'react';
import {Link} from 'react-router';
import Icon from '@js-common-components/Icon';
let timer = null;

function PureSubMenu({
  sub,
  visible,
  distance,
  onLeave,
  onEnter,
  onClose
}) {
  let showSub = visible ? '_show-sub' : '';
  return (
    <div
      className={`homepage-submenu-fixed ${showSub}`}
      onMouseEnter={(e) => {
        onEnter()
      }}
      onMouseLeave={(e) => {
        onLeave()
      }}
      onMouseMove={(e) => {
        e.preventDefault();
        timer && clearTimeout(timer)
      }}
    >
      <ol className="homepage-submenu-ol">
        <span
          className="_slide-icon"
          style={{
            left:distance + 'px'
          }}
        >
        </span>
        {
          sub && sub.map((it, index) => {
            return (
              <li className="_ol-li" key={it.path}>
                {
                  it.tagA ?
                  <a
                    href={it.path}
                    target={it.blank ? "_blank" : "_self"}
                    onClick={(e) => {
                      onClose()
                    }}
                  >
                    <Icon type={it.icon}/>
                    <p className="_name">{it.name}</p>
                  </a>
                  :
                  <Link
                    to={it.path}
                    onClick={(e) => {
                      onClose()
                    }}
                  >
                    <Icon type={it.icon}/>
                    <p className="_name">{it.name}</p>
                  </Link>
                }
                <p className="_desc">
                  {it.desc}
                </p>
              </li>
            )
          })
        }
      </ol>
    </div>
  )
}

export default class SubMenu extends Component {
  constructor(props) {
    super(props);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
  }
  handleEnter() {
    let props = this.props;
    let pararentTimer = props.parent.timer;
    pararentTimer && clearTimeout(pararentTimer)
    this.clearTimer()
  }
  handleLeave() {
    timer = setTimeout(() => {
      this.props.onClose()
    }, 300)
  }
  clearTimer() {
    timer && clearTimeout(timer)
  }
  render() {
    let props = this.props;
    let state = this.state;
    let {...others} = props;
    return (
      <PureSubMenu
        onEnter={this.handleEnter}
        onLeave={this.handleLeave}
        {...others}
      />
    )
  }
}
