import React, { Component } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { Link } from 'react-router';
import { Badge } from 'antd';
import { isEqual } from 'lodash';

import Dialog from '@js-common-components/Dialog';
import Empty from '@js-common-components/Empty';
import Tabs from '@js-common-components/Tabs';
import Toast from '@js-common-components/Toast';
import Button from '@js-common-components/Button';
import Icon from '@js-common-components/Icon';
import CustomScrollBar from '@js-common-components/CustomScrollBar';

import CheckAbnormalList from '@js-tob-common/components/CheckAbnormalList';

import { fetch } from '@js-common/lib/utils';
import { T } from '@js-common/lib/track';

const TabPane = Tabs.TabPane;
//  虚拟滚动条配置
const scrollBarOptions = {
  maxHeight: 424,
  width: 402,
  scrollStyle: {width: '6px'},
  customBarStyle: {
    backgroundColor: '#eee',
    width: '6px',
    borderRadius: '3px'
  }
}
export default class HeaderBell extends Component {

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.messageList && nextProps.messageList)) {
      this.checkLine()
    }
  }

  /**
   * 超出第二行的时候文本截取
   * 并添加省略符号
   */
  checkLine = () => {
    let list = document.querySelector('.header-bell-message-list');
    let items = list && list.querySelectorAll('li');

    //  固定值行s
    const clamp = 2;

    // 获取元素css属性
    function getNodeStyle(el, attr) {
      return (
        el.currentStyle? el.currentStyle[attr] : window.getComputedStyle(el, null)[attr]
      )
    }

    // 检测是否已经超出高度
    function ckHeight(node, wrapNode, maxHeight) {
      let chunks =  !!node.innerHTML? node.innerHTML.split('') : [];
      if (wrapNode.scrollHeight > maxHeight) {
        if (chunks.length > 1) {
          chunks.pop();
          node.innerHTML = chunks.join('');
          ckHeight(node, wrapNode, maxHeight);
        }
      } else {
        node.innerHTML = node.innerHTML.replace(/.{3}$/, '...') ;
      }
    }

    // 循环去检测赋值
    if (items) {
      [...items].forEach((item, index) => {
        let contentNode = item.querySelector('.message-text');
        let wrapNode = item.querySelector('.message-content');
        let indexs = [];
        let maxHeight;

        if (wrapNode && contentNode) {
          //  计算限制的高度
          maxHeight =  parseFloat(getNodeStyle(wrapNode, 'line-height')) * clamp || 44;
          if (wrapNode.scrollHeight > maxHeight) {
            ckHeight(contentNode, wrapNode, maxHeight);
          }
        }
      })
    }
  }

  // 打点
  postPositionSuccessClick = (t_name, item) => {
    if (item.distribute_success * 1 === 1) {
      // 打点
      T.setVars([
        ['click', t_name],
        ['uid', window.ACCOUNT.uid],
        ['from', 'message']
      ]).done();
    }
  }

  // 统一读取消息
  readMessage = (item) => {
    item.link && this.props.onClick()
    this.props.readMessage([item.id], false)
    //this.postPositionSuccessClick('position_sync_success', item)
  }

  // 打开异常名单
  showExtraDialog = (token) => {
    this.extra_dialog.show();
  }

  /**
   * 招聘动态列表
   *
   * @param {Array} messageList
   * @return JSX.Element
   */
  renderMessage = (messageList) => {

    return (
      <CustomScrollBar {...scrollBarOptions} virtualKey="header_message">
        <ul className="header-bell-message-list">
          {messageList.map((item) => {
            //  fix: template 字段可能为 null
            if (!item.template) {
              return false;
            }

            let pattern = /\{\{(.+?)\}\}/g;
            let content = item.template.replace(pattern, function($1, $2) {
              return item.params[$2]
            });
            let listClassName = classnames([
              'header-bell-message-item', !item.status && 'unread'
            ]);
            //  后端中英文标点混用，统一换成中文标点
            content = content.replace(/:/g, '：');
            //  ui需求,截断做兼容
            let listType = content.substr(0, content.indexOf('：'));
            content = (content.substr(listType.length + 1)).replace(/【/g, ' [').replace(/】/g, '] ');

            return (
              <li className={listClassName} key={item.id}>
                <h3 className="message-title">{listType}</h3>
                <p className="message-content" title={content}>
                  <span
                    className="message-text"
                    dangerouslySetInnerHTML={{__html:content}}
                    onClick={() => {
                      // 没有链接且不是短信类型，点击已读
                      item.type !== 13 &&
                      !item.link &&
                      this.readMessage(item)
                    }}
                  />
                  {
                    item.link &&
                    <a
                      className="header-bell-message-link"
                      href={item.link}
                      target="_blank"
                      onClick={this.readMessage.bind(this, item)}
                    >
                    查看<Icon type="retract" size={14} />
                    </a>
                  }
                  {
                    //  短信异常名单
                    item.type === 13 && item.params.content_extra &&
                    <CheckAbnormalList send_batch_token={item.params.send_batch_token}>
                      <span className="header-bell-message-extra">
                        {item.params.content_extra}
                      </span>
                    </CheckAbnormalList>
                  }
                </p>
                <span className="header-bell-message-item-time">
                  {
                    //  php时间戳 => js时间戳
                    moment(item.created * 1000).format('MM-DD')
                  }
                </span>
              </li>
            )
          })}
          {
            //条数大于15的时候才会出现查看全部按钮
            this.props.messageTotal > 15 &&
            (<li className="header-bell-message-more">
              <Link
                className="ant-btn ic-btn"
                to="/reg/message-center"
                onClick={this.props.onClick}
              >
                查看全部
              </Link>
            </li>)
          }
        </ul>
      </CustomScrollBar>
    )
  }

  /**
   * 产品通知列表
   *
   * @param {Array}  noticeList
   * @return JSX.Element
   */
  renderInformation = (noticeList) => {

    return (
      <CustomScrollBar {...scrollBarOptions} virtualKey="header_information">
        <ul className="header-bell-information-list">
          {noticeList.map((item, index) => {
            return (
              <li key={item.id} className="header-bell-information-item" >
                <span>{item.note}</span>
                {
                  item.url &&
                  <a target="_blank" href={item.url} onClick={this.props.onClick.bind(this)}>
                    {
                      //  fix: 产品公告可能出现 number 类型
                      (item.title && `${item.title}` || '').replace(/>/g, '')
                    }
                    <Icon type="retract" size={14} />
                  </a>
                }
              </li>
            )
          })}
        </ul>
      </CustomScrollBar>
    )
  }

  render() {
    const props = this.props;
    const state = this.state;

    //  公告 tab 是否有点
    const informationTitle = (
      <span className={(props.newMessageCount.notice && props.account.type * 1)? 'dot': void 0}>
        公告
      </span>
    )

    return (
        <div className="header-bell">
          <Tabs
            className="header-bell-tabs"
            activeKey={props.activeTabKey}
            onTabClick={props.onBellTabClick}
          >

            <TabPane className="header-bell-message" tab="招聘动态" key="1">
              {
                props.messageList.length?
                this.renderMessage(props.messageList || [])
                :
                <Empty
                  type="msg_content"
                  text="当前暂无新招聘动态"
                  className="header-bell-none-record"
                />
              }
            </TabPane>

            <TabPane className="header-bell-information" tab={informationTitle} key="2">
              {
                props.noticeList.length ?
                this.renderInformation(props.noticeList || [])
                :
                <Empty
                  type="msg_content"
                  text="当前暂无新公告"
                  className="header-bell-none-record"
                />
              }
            </TabPane>
          </Tabs>
        </div>
    )
  }
}
