/**
 * 导航工具栏目
 * 搜索入口 产品动态 个人中心
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Badge } from 'antd';
import { findIndex } from 'lodash';
import Icon from '@js-common-components/Icon';
import Toast from '@js-common-components/Toast';

import DropdownPanel from './dropdown.panel';
import UserMsg from './user.msg';
import Bell from './bell';
//  原更新提示组件
import UpdateTips from '../update-tips';
import { fetch } from '@js-common/lib/utils';

//  曲线救国配合 DropdownPanel 组件
const IconWrapper = ({children, ...props}) => {
  let Tag = children.props.name === 'badge'? Badge : 'span';

  return (
    <Tag
      {...children.props}
      children={React.cloneElement(children.props.children, props)}
    />
  )
}

export default class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      points: 0,
      noticeList: [],
      newMessageCount: {},
      messageList: [],
      messageTotal: 0,
      updateTips: '',
      activeTabKey: '1'
    }
  }

  componentDidMount() {
    //  获取用户积分
    this.fetchPoints();

    //  获取招聘动态信息
    this.fecthMessage(false);

    //  获取产品动态
    this.fetchTodoList((results) => {
      let updateTips = '' + (results.updateTips || '');

      this.setState({
        noticeList: results.noticeList,
        newMessageCount: results.newMessageCount,
        updateTips: updateTips
      }, () => {
        this.showUpdateTips(this.props);
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.key !== this.props.location.key) {
      this.showUpdateTips(nextProps);
    }
  }

  /**
   * 获取公告接口
   * @param {func} callback 回调函数
   */
  fetchTodoList = (callback) => {
    fetch('/api/todo/todolist').then(({results}) => {
      callback && callback(results)
    })
    .catch((err) => {
      Toast.warning(err.message)
    })
  }

  //  获取积分
  fetchPoints = () => {
    fetch.post('/api/activity/points').then(({results}) => {
      this.setState({
        points: results.points
      })
    })
    .catch((err) => {
      Toast.warning(err.message)
    })
  }

  /**
   * 获取招聘动态消息
   * 如果列表中含有短信消息则直接讲短信设为已读
   * @param {boolean | true} 获取信息的时候是否去读取短信消息
   */
  fecthMessage = (isRead = true) => {
    const query = {
      page: 1, size: 15, type: 0, days_interval: 0, status: 0
    }
    fetch.post('/api/messagelist/recruit', query).then(({results}) => {
      let smsIds = [];
      let linkNull = [];
      //  查看是否有短信和无链接类型
      results.data.forEach((item) => {
        if (item.type === 13) {
          smsIds.push(item.id)
        } else {
          !item.link && linkNull.push(item.id)
        }
      });
      //  有短信和无连接全部设为已读
      ((ids, isRead) => {
        isRead && ids.length && this.readMessage(ids, false)
      })(smsIds.concat(linkNull), isRead);

      this.setState({
        messageList: results.data,
        messageTotal: +results.pagination.total
      })
    })
    .catch((err) => {
      Toast.warning(err.message)
    })
  }

  //  点击公告或礼包后再次回调todolist接口，重置消息条数。
  readNotice = (query) => {
    fetch.post('/api/todo/readnotice', query).then((res) => {
      this.fetchTodoList((results) => {
        this.setState({
          newMessageCount: results.newMessageCount
        })
      })
    })
    .catch((err) => {
      Toast.warning(err.message)
    })
  }

  /**
   * 读取消息
   * @param {array}   ids             消息id
   * @param {boolean} isReload[true] 是否重新加在数据
   *
   * 如果没有重新加载数据，需要把相关id的列表状态更变
   */
  readMessage = (ids, isReload = true) => {
    fetch.post('/api/messagelist/operate', {type: 1, ids})
    .then((res) => {
      if (isReload) {
        this.fecthMessage()
      } else {
        this.setState((preState) => {
          let list = preState.messageList;

          ids.forEach((id) => {
            list[findIndex(list, {id})].status = 1
          })

          return {
            messageList: list,
            messageTotal: (preState.messageTotal - ids.length)
          }
        })
      }
    })
    .catch((err) => {
      Toast.warning(err.message)
    })
  }

  /**
   * @param {string} tabKey ["1", "2"]
   */
  onBellTabClick = (tabKey) => {
    if (+tabKey === 2 && this.state.newMessageCount.notice) {
      this.readNotice({type: 1});
    }

    //  切换后重新拉去信息
    if (+tabKey === 1) {
      this.fecthMessage()
    }

    this.setState({activeTabKey: tabKey})
  }

  //  判断是否有更新提示或者更新提示是否是最新
  showUpdateTips = (props) => {
    let state = this.state;
    //  本地存储的消息跟接口的返回的不一致
    //  表示有更新，则显示弹窗
    try {
      state.updateTips &&
      state.updateTips !== (localStorage.getItem('updateTips') || '') &&
      /^\/(todo)$/.test(props.location.pathname) && this.tipsDialog.show();
    }catch(e){
      //
    }
  }

  render() {
    const props = this.props;
    const state = this.state;

    return (
      <div className="header-toolbar-columns">
        <div className="header-toolbar-columns-item" key="1">
          {
            /vanke/.test(CUSTOMIZE_NAME) ? null :
            <Link to="/search">
              <Icon type="search_normal" className="header-toolbar-icon" size={24} />
            </Link>
          }
        </div>
        <div className="header-toolbar-columns-item" key="2">
          <DropdownPanel
            type="bell"
            icon_type="message_center"
            overlayStyle={{
              right: -64
            }}
            overlay={
              <Bell
                noticeList={state.noticeList}
                newMessageCount={state.newMessageCount}
                messageList={state.messageList}
                messageTotal={state.messageTotal}
                account={props.account}
                activeTabKey={state.activeTabKey}
                readMessage={this.readMessage}
                onBellTabClick={this.onBellTabClick}
              />
            }
            iconClick={() => {
              (state.activeTabKey === '1') && this.fecthMessage()
            }}
          >
            {
              /**
               *  铃铛逻辑
               *  1. 招聘动态未读不为空取招聘动态未读消息合
               *  2. 招聘动态未读消息为空 且 公告未读 显示红点
               *  3. 招聘动态未读消息为空 且 公告已读 红点消失
               *
               *  如果当前 Tab 招聘动态的，则获取数据
               */
              <IconWrapper>
                <Badge
                  name="badge"
                  count={state.messageTotal}
                  dot={!state.messageTotal && state.newMessageCount.notice}
                >
                  <Icon className="header-toolbar-icon" size={24} />
                </Badge>
              </IconWrapper>
            }
          </DropdownPanel>
        </div>
        <div className="header-toolbar-columns-item" key="3">
          <DropdownPanel
            type="user"
            icon_type="personal_center"
            overlay={<UserMsg points={state.points} />}
            overlayStyle={{
              right: 0
            }}
          >
            <Icon className="header-toolbar-icon" size={24} />
          </DropdownPanel>
        </div>

        <UpdateTips
          //  更新提示弹窗
          content={state.updateTips}
          ref={(ref) => {
            this.tipsDialog = ref;
          }}
        />
      </div>
    )
  }
}
