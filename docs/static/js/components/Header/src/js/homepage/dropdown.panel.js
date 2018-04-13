import React, { Component, Children } from 'react';
import classnames from 'classnames';

export default class DropdownPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible || false
    }

    this.overlayHeight = 0;
  }

  componentDidMount() {
    this.getOverlayHeight();
    this.isBindHoverNav(true);

    document.addEventListener('click', this.listenerEvent, true);
  }

  componentWillUnmount() {
    this.isBindHoverNav(false);
    document.removeEventListener('click', this.listenerEvent);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {

      this.setState({
        visible: nextProps.visible
      })
    }
  }

  //  监听点击事件
  listenerEvent = (ev) => {
    if (!this.wrapper) {
      return false;
    }

    let checkContainer = this.wrapper.contains(ev.target);

    !checkContainer && this.closePanel();
  }

  //  ui需求导航和下拉不能同时进行
  //  这里需要监听是否鼠标移动到头部下拉导航
  isBindHoverNav = (bind) => {
    let method = bind? 'addEventListener' : 'removeEventListener';

    try {
      let navDrownChild = document.querySelector('.homepage-header-ul').querySelectorAll('._li-icon');

      for(let i = 0; i < navDrownChild.length; i++) {
        navDrownChild[i][method]('mouseenter', this.closePanel)
      }
    } catch(e) {
      //...
    }
  }

  //  获取高度
  getOverlayHeight = () => {
    this.overlayHeight = this.downPanel.children[0].scrollHeight + 2;
  }

  //  更改状态的时候
  onVisibleChange = (state) => {
    let props = this.props;

    this.setState({
      visible: state
    }, () => {
      props.onVisibleChange && props.onVisibleChange(state)
    })
  }

  //  关闭面板
  closePanel = () => {
    if (this.state.visible) {
      this.onVisibleChange(false)
    }
  }

  changePanel = () => {
    this.onVisibleChange(! this.state.visible)
  }

  render() {
    const props = this.props;
    const state = this.state;

    return (
      <div
        className="header-toolbar-down"
        ref={(ref) => {
          this.wrapper = ref;
        }}
      >
        {React.cloneElement(
          props.children,
          {
            onClick: () => {
              this.changePanel()
              // 下拉没有出来的时候激活
              !state.visible && props.iconClick && props.iconClick()
            },
            type: state.visible? `${props.icon_type}_action` : props.icon_type
          }
        )}
        <div
          className={
            classnames({
              'header-toolbar-down-wrapper': true,
              'visible': state.visible,
              'hidden': !state.visible
            })
          }
          ref={(ref) => {
            this.downPanel = ref;
          }}
          style={{
            height: state.visible? this.overlayHeight : 0,
            ...props.overlayStyle
          }}
        >
          {React.cloneElement(
            props.overlay,
            {onClick: this.closePanel}
          )}
        </div>
      </div>
    )
  }
}