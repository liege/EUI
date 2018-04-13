import { fetch } from '../../../../../../common/lib/utils';
import React, { Component } from 'react';
//铃铛组件
import Headerbell from './header.bell';
//用户信息组件
import Headerusermsg from './header.user.msg';
import Toast from '../../../../../../common/components/Toast';

import UpdateTips from './update-tips';

export default class HandleRead extends Component {
  constructor(props){
    super(props);
    this.handleRead = this.handleRead.bind(this);
    this.state = {
      notificationVisible: false,  //点击铃铛控制下面的显示与否，，false为隐藏，true为显示
      noticeList: [],  //同步后端拿到的公告信息
      // packageList: [],  //同步后端的消息中心的信息，其中包含礼包、公告
      newMessageCount: {}, //同步后端的消息总条数显示
      personalCenter: false  //false时用户信息不显示，true时显示
    };
    this.hidePops = this.hidePops.bind(this);
    this.packageVisible = this.packageVisible.bind(this);
    this.showUpdateTips = this.showUpdateTips.bind(this);
    // this.onTabClick = this.onTabClick.bind(this);
    
    // this.bellTabsDom = false;  //true为至少点击了一次铃铛
    // this.clicknotice = false;   //true为至少点击了一次公告部分
    // this.clickpack = false;   //true为至少点击了一次礼包部分
    //header.bell
    this.usermsgVisible = this.usermsgVisible.bind(this);
    this.gettodoList = this.gettodoList.bind(this);
    // this.personTabsDom = false;  //true为至少点击了一次人头
    //header.user.msg
  }
  
  componentWillMount() {
    this.gettodoList((results) => {
      let updateTips = '' + (results.updateTips || '');
      this.setState({
        noticeList: results.noticeList || [],
        // packageList: results.packageList || [],
        newMessageCount: results.newMessageCount || {},
        updateTips: updateTips
      }, () => {
        this.showUpdateTips(this.props);
      });
    });
  }
  componentDidMount(){
    //创建监听事件
    document.addEventListener('click', this.hidePops, false);
  }
  componetwillUnmount(){
    //清除监听事件
    document.removeEventListener('click', this.hidePops);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.showUpdateTips(nextProps);
    }
  }

  gettodoList(callback) {
    fetch('/api/todo/todolist').then((response) => {
      let results = response.results;
      callback && callback(results);
    });
  }
  showUpdateTips(props) {
    let state = this.state;
    // 本地存储的消息跟接口的返回的不一致
    // 表示有更新，则显示弹窗
    try{
      state.updateTips && 
      state.updateTips !== (localStorage.getItem('updateTips') || '') &&
      /^\/todo$/.test(props.location.pathname) && this.tips.show();
    }catch(e){
      //
    }
  }
  
  handleRead(index) {
    let state = this.state;
    let {
      // packageList,
      newMessageCount
    } = state;
    // let packId = packageList.map((it) => {
    //   return it.id
    // });
    let TabRequirst = [{
      type: 1
    }];
    // , {
    //   type: 0,
    //   ids: packId
    // }
  
    
    fetch.post('/api/todo/readnotice', 
      TabRequirst[index]
    ).then(() => {
      //点击公告或礼包后再次回调todolist接口，重置消息条数。
      this.gettodoList((results) => {
        this.setState({
          newMessageCount: results.newMessageCount || {}
        }); 
      });
    });
  }
  //点击浏览器将显示框隐藏的回调,
  //notificationVisible 铃铛下拉框显示，为false时隐藏，为true时显示
  hidePops() {
    let state = this.state;
    let { 
      // newMessageCount,
      notificationVisible,
      personalCenter
    } = state;
    if(!personalCenter && !notificationVisible){
      return;
    };
    if(personalCenter){
      this.setState({
        personalCenter: false
      });
    }
    if(notificationVisible){
      this.setState({
        notificationVisible: false
      })
      // if(newMessageCount.total === 0) {
      //   return;
      // }
      // if(newMessageCount.package !== 0){
      //   this.handleRead(1);
      // }else  
      // if(newMessageCount.notice !== 0 ){
      //   // && this.clicknotice
      
      //   this.handleRead(0);
      // }
    }
  }
  //点击人头样式的回调
  usermsgVisible() {
    let state = this.state;
    let {
      personalCenter
      // newMessageCount
    } = state;
    // if(!this.personTabsDom){
    //   this.personTabsDom = true
    // }
    this.setState({
      personalCenter: !personalCenter,
      notificationVisible: false
    })
    // if(!this.bellTabsDom || newMessageCount.total === 0){
    //   return;
    // }
    // if(newMessageCount.package > 0 && this.bellTabsDom) {
    //   this.handleRead(1);
    // }else  
    // if(newMessageCount.notice > 0){
    //   //  && this.clicknotice
    //   this.handleRead(0);
      
    // }
  }
  //点击铃铛按钮的回调
  packageVisible() {
    //e.nativeEvent.stopImmediatePropagation();
    let state = this.state;
    let account = this.props.account || '';
    let { 
      newMessageCount,
      notificationVisible
    } = state;
    // if(!this.bellTabsDom){
    //   this.bellTabsDom = true;
    // }
    this.setState({
      notificationVisible: !notificationVisible,
      personalCenter: false
    });
    if(newMessageCount.notice !== 0) {
      // account.type*1 === 0 && 
      this.handleRead(0);
    }
  }
  
  //点击消息中心的公告或礼包时的回调
  // onTabClick(index){
  //   let newMessageCount = this.state.newMessageCount;
    //点击公告将clicknotice置为true
    // if(index*1 === 1){
    //   this.clicknotice = true;
    // }
    // else {
    //   this.clickpack = true;
    // }   
    //点击礼包或公告时的回调，点击礼包传type，点击公告传type和ids
    // if(!this.clicknotice){
    //   return;
    // }
  //   if(newMessageCount.total) {
  //     this.handleRead(index); 
  //   }    
  // }
  render() {
    let props = this.props;
    let state = this.state;
    return (
      <div className="header-common">
        {/*铃铛的样式*/}
        <Headerbell 
          {...props} 
          {...state}  
          parent = {this} 
        />
        {/*people的样式*/}
        <Headerusermsg 
          {...props} 
          {...state}  
          parent = {this}
        />

        {/* 更新提示弹窗 */}
        <UpdateTips
          content={state.updateTips}
          ref={(tips) => {
            this.tips = tips;
          }}
        />
      </div>
    ) 
  }  
}
