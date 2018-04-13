import '@scss-tob/old-header-and-footer.scss';

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
@connect((state) => {
  return state
})
export default class OldHeader extends Component {
  constructor(...args) {
    super(...args);

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentWillMount() {
    document.documentElement.className += ' _old-header';
    let pathname = window.parent.location.pathname;
    let firstPath = pathname.split('/')[1];
    if (/interpolate|wezhaopin/.test(firstPath)) {
      browserHistory.push(`/${firstPath}/__p__`)
    }
    document.addEventListener('click', this.handleClick, false);
    this.props.loadnotify.done();
  }

  componentDidMount() {
    this.replaceLink();
    try{
      let header = document.getElementById('j-header');
      let icons = header.querySelectorAll('._span-icon, .homepage-submenu-fixed, .ant-dropdown-trigger');

      [...icons].forEach((item) => {
        item.addEventListener('mouseenter', this.handleMouseEnter, false);
        item.addEventListener('mouseleave', this.handleMouseLeave, false);
      });

      [...header.querySelectorAll('.header-bell,.personal-center')].forEach((item) => {
        item.addEventListener('click', this.handleClick, false);
      });
    }catch(e) {
      // catch err
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  handleMouseEnter() {
    let iframe = window.parent.document.getElementById('j-old-header-iframe');

    clearTimeout(this.timer);
    iframe.className += ' _header-enter';
    setTimeout(this.replaceLink, 100);
  }

  handleMouseLeave() {
    let iframe = window.parent.document.getElementById('j-old-header-iframe');

    this.timer = setTimeout(() => {
      iframe.className = iframe.className.replace(/\s*_header-enter\s*/gi, '');
    }, 500);
  }

  handleClick(e) {
    e = e || window.event;
    let target = e.target || e.srcElement;

    if (
      target.nodeName.toLowerCase() === 'a' &&
      target.getAttribute('target') !== '_blank'
    ) {
      try{
        e.preventDefault();
      } catch (err){
        e.returnValue = false;
      }
      let href = target.getAttribute('href');
      window.parent.location.href = href;
    }

    let iframe = window.parent.document.getElementById('j-old-header-iframe');
    setTimeout(() => {
      let header = document.getElementById('j-header');
      let nodes = header.querySelectorAll(
        '.icon-message_center_action, .icon-personal_center_action'
      );

      if (nodes.length) {
        iframe.className += ' _header-open-menu';
      } else {
        iframe.className = iframe.className.replace(/\s*_header-open-menu\s*/gi, '');
      }
    }, 50);

    return false;
  }

  replaceLink() {
    let header = document.getElementById('j-header');
    try{
      [...header.querySelectorAll('a')].forEach((it) => {
        if (
          it.getAttribute('target') !== '_blank' &&
          !it.getAttribute('data-replaced')
        ) {
          let parentNode = it.parentNode;
          let clone = it.cloneNode(true, true);
          clone.setAttribute('data-replaced', 1);
          parentNode.replaceChild(clone, it);
        }
      });
    }catch(e) {
      //
    }
  }

  render() {
    return (
      <div></div>
    );
  }
}
