import React, { Component } from 'react';
import { Link } from 'react-router';
import classN from 'classnames';
import Icon from '../../../../../../common/components/Icon';
import Button from '../../../../../../common/components/Button';
import Empty from '../../../../../../common/components/Empty';

import { fetch, formatNumer, isFunction } from '../../../../../../common/lib/utils';
import Tabs from '../../../../../../common/components/Tabs';
import Toast from '../../../../../../common/components/Toast';
export default class Headerbell extends Component {
  constructor (props) {
    super(props);
    // this.state = {
    //   disable: false,   //点击领取后的按钮状态
    //   receive: '领取'   //点击领取后按钮的文字信息
    // };
  }

  //点击铃铛下面的领取礼包回调
  // takePack(id) {
  //   return fetch.post('/api/account/receivegift', {
  //     id: id
  //   }).then((response) => {
  //     return this.setState(
  //       {
  //         [id + 'disable']: true,
  //         [id + 'receive']: '已领取'
  //       }
  //     )
  //   }).catch((err) => {
  //     let msg = err.message;
  //     return Toast.error(msg, {
  //       time: 1000
  //     })
  //   })
  // }
  render() {
    let props = this.props;
    let state = this.state;
    let {
      notificationVisible,  //点击铃铛控制下面的显示与否，，false为隐藏，true为显示
      newMessageCount,   //同步后端的消息总条数显示
      // packageList,  ////同步后端的消息中心的信息，其中包含礼包、公告
      noticeList,  ////同步后端拿到的公告信息
      parent,
      account,
      updateTips
    } = props;
    /*红色点点的消息显示对象
     *newMessageCount.total  消息的总条数
     *newMessageCount.package  礼包的总条数
     *newMessageCount.notice  公告的总条数
     */
    let {
      notice
    } = newMessageCount;
    // let newpackage = newMessageCount.package;

    //未领取礼包后台数据从接口中过滤出来定义为 waitTakeList
    // let waitTakeList = packageList.filter((it) => {
    //   return it.action === 'prize';
    // });
    let cls_vissiable = classN({
      "columns-item": true,
      "notification-center": true,
      "notification-center-change": notificationVisible
    });
    let cls_bell = classN({
      "message-img-bell": true,
      "message-img-bell-active": notificationVisible
    });
    let cls_total = classN({
      "head-bell-dot": notice >= 100,
      "head-bell-round": notice < 10,
      "head-bell-width-large": notice < 100 && notice >= 10
    });
    let cls_notice = classN({
      "message-gift": true,
      "message-gift-height": true,
      "header-gonggao": account.type*1 === 0
    });
    return (
      <div
        className={cls_vissiable}
        onClick={(e) => {
          e.nativeEvent.stopImmediatePropagation();
        }}
      >
        {/*铃铛组件*/}
        <div className="header-bell"
             onClick={parent.packageVisible}
        >
          <Icon
            type={notificationVisible ? 'message_center_action' : 'message_center'}
            className={cls_bell}
          />
          {
            !!notice &&
            <p className={cls_total}>
              { notice >= 100 ? "99+" : notice }
            </p>
          }
        </div>

        {/*铃铛下面显示框部分*/}
        <div
          className={cls_notice}
          style={{
            display: notificationVisible ? "block" : "none"
          }}
        >
          <ul className="message-gift-pack">
            {/*铃铛下面显示框中的礼包*/}
            <Tabs
              className="header-tabs"
              active={1}
              // onTabClick={(key) => {
              //   !!total && parent.onTabClick(key);
              // }}
            >
              {/*
                !!(account.type*1) &&
                <Tabs.TabPane
                  tab={
                    <div className="header-bell">
                      <span className="message-pack-number">礼包</span>
                      {
                        !!newpackage &&
                        <p
                          className={
                            newpackage >= 100 ? "head-bell-dot head-pack-dot" :
                              (newpackage < 10 ? "head-bell-round head-pack-round"
                                : "head-bell-width-large head-pack-width-large")
                          }
                        >
                          {
                            newpackage >= 100 ? "99+" : newpackage
                          }
                        </p>
                      }
                    </div>
                  }
                  key={0}
                  className="header-tabs-pack"
                >
                  {/*铃铛下面显示框中的未完成任务以下*
                  <div className="header-bell-middle">
                    <ul className="message-small-pack">
                      {
                        packageList.map((it) => {
                          if(it.action !== 'prize'){
                            return (
                              <li key={it.id} className="give">
                                <Icon
                                  type="mission"
                                  className="singl-btn message-mission"
                                />
                                <span className="message-name">
                                  {it.name}
                                </span>
                                <Button
                                  type="primary"
                                  tag="a"
                                  fixedWidth="72px"
                                  href={it.link}
                                  target="_blank"
                                  className="experience"
                                  onClick={it.action !== 'follow' ? null : (e) => {
                                    setTimeout(() => {
                                      parent.hidePops(e);
                                    });
                                    e.preventDefault();
                                    props.refs.recruitmentAssistantQrcode.show();
                                  }}
                                >
                                  {it.btn_name}
                                </Button>
                              </li>
                            );
                          }
                        })
                      }
                    </ul>
                  </div>
                  {/*铃铛下面显示框中的未领取礼包以下*
                  <div className="message-header-boot">
                    {
                      !!waitTakeList.length &&
                      <p className="unclaimed-package">-&nbsp;未领取礼包&nbsp;-</p>
                    }
                    {
                      waitTakeList.length ? waitTakeList.map((it, index) => {
                        return (
                          <li className="give" key={index}>
                            <Icon
                              type="reward"
                              className="icon-reward"
                            />
                            <span className="message-name">
                              {it.name}
                              <span className="unclaimed-money">({it.money}元)</span>
                            </span>
                            <Button
                              type="primary"
                              fixedWidth="72px"
                              target="_blank"
                              className="experience"
                              onClick={this.takePack.bind(this, it.id)}
                              disabled={state[it.id + 'disable'] || state.disable}
                            >
                              {state[it.id + 'receive'] || state.receive}
                            </Button>
                          </li>
                        )
                      }) :
                        /*所有礼品领取完后提示信息*
                        <div className={{
                          1: "prompt-msg-one",
                          2: "prompt-msg-two",
                          3: "prompt-msg"
                        }[packageList.length]}>
                          <Empty type="msg_gift"></Empty>
                        </div>
                    }
                  </div>
                  <p className="never-receive">
                    <Icon type="prize" className="icon-prize"/>
                    <Link
                      to="/account/profile/prizes"
                      className="look-pack"
                      onClick={() => {
                        isFunction(parent.hidePops) && parent.hidePops()
                      }}
                    >我的礼包</Link>
                  </p>
                </Tabs.TabPane>
              */}
              {/*公告*/}
              <Tabs.TabPane
                tab={
                  <div className="header-bell">
                    <span className="message-pack-number">公告</span>
                    {
                      notice && account.type*1  ?
                        <p
                          className={
                            notice >= 100 ? "head-bell-dot head-pack-dot" :
                              (notice < 10 ? "head-bell-round head-pack-round"
                                : "head-bell-width-large head-pack-width-large")
                          }
                        >
                          {
                            notice >= 100 ? "99+" : notice
                          }
                        </p> : null
                    }
                  </div>
                }
                key={1}
                className="header-tabs-pack"
              >
                {
                  !!noticeList.length ? (
                    noticeList.map((value, index) => {
                      return (
                        <li
                          key={index}
                          dangerouslySetInnerHTML={{
                            __html: value.title
                          }}
                          className="message-title"
                        ></li>
                      )
                    })
                  ) : (
                    <div className="prompt-record">
                      <Empty
                        type="msg_notice"
                        text="当前暂无新公告"
                        className="now-none-record"
                      ></Empty>
                    </div>
                  )
                }
              </Tabs.TabPane>
            </Tabs>
          </ul>
        </div>
      </div>
    );
  }
}
