import React from 'react';
import { Link, browserHistory } from 'react-router';
import classnames from 'classnames';
import Immutable, { is, fromJS} from 'immutable';
import Cookie from 'js-cookie';
import { formatNumer, isFunction  } from '../../../../../../common/lib/utils';

import Icon from '../../../../../../common/components/Icon';
import Tabs from '../../../../../../common/components/Tabs';
import Button from '../../../../../../common/components/Button';
import DialogSale from '../../../../components/DialogSale';
export default function Headerusermsg(props) {
  let {
    personalCenter,  //false时用户信息不显示，true时显示
    account,
    parent
  } = props;
  // this.get_cookie_token = this.get_cookie_token.bind(this);
  const cls_personal =  classnames({
    "columns-item": true,
    "personal-center": true,
    "personal-center-number": personalCenter
  });
  const cls_per = classnames({
    "message-img-bell": true,
    'message-img-bell-active': personalCenter
  });
  return (
    <div
      className={cls_personal}
      onClick={(e) => {
        e.nativeEvent.stopImmediatePropagation();
      }}
    >
      {/*personal组件*/}
      <Icon
        type={
          personalCenter ? 'personal_center_action' : 'personal_center'
        }
        className={cls_per}
        onClick={parent.usermsgVisible}
      />
      {/*未点击用户信息icon底下面板不加载*/}
      <div className="message-gift message-person"
        style={{
          display: personalCenter ? "block" : "none"
        }}
      >
        <div className="people-head-portrait">
          <div className="people-header">
            <Link
              to="/account/company?comefrom=logo"
              onClick={() => {
                isFunction(parent.hidePops) && parent.hidePops();
              }}
            >
              <img
                src={account['upload[logo]']}
                className="people-upload"
              />
            </Link>
            <span className="people-member">
              {account.members.active.name || ""}
            </span>
            <span className="people-name">
              {account.email}
            </span>
          </div>
          <ul className="people-gift-amount">
            {
              account.type * 1 ?
              <li className="people-gift-volume">
                <p>礼金券金额(元)</p>
                <p className="people-money">{formatNumer(account.coupon)}</p>
              </li> : null
            }
            <li className="people-gift-volume">
              <p>可用余额(元)</p>
              <p className="people-money">
                {formatNumer(account.usableBalance)}
                {/* 软通动力不显示充值按钮 */}
                {
                (!account.isoftstone && account.type * 1) ?
                  <div className="people-recharge">
                    <Button
                      type="primary"
                      fixedWidth={80}
                      onClick={() => {
                        Headerusermsg.dialog.show();
                      }}
                    >
                      充值
                    </Button>
                    <DialogSale
                      ref={(dialog) => {
                        Headerusermsg.dialog = dialog;
                      }}
                      text="如需充值，请联系您的金牌顾问："
                      info={account.saleman}
                      origin={1}
                    />
                  </div> : null
                }
              </p>
            </li>
          </ul>
          <div className="people-gift-amount">
            <Link
              to="/account/profile"
              className="account-manage"
              onClick={() => {
                isFunction(parent.hidePops) && parent.hidePops();
              }}
            >账号管理</Link>
            {
              !(props.account || {}).isWebank &&
              <a href="/report/recruitment-process" className="account-manage">报表</a>
            }
            <a href="/account/settings#/third-party" className="account-manage">设置</a>
          </div>
          <a
            className="people-log-off"
            href={`/account/logout?t=${Cookie.get('tob_csrf_token')}`}
          >
            退出登录
          </a>
        </div>
      </div>
    </div>
  );
}
