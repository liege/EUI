import React, { Component } from 'react';
import Dialog from '../../../../../../common/components/Dialog';
import Button from '../../../../../../common/components/Button';

export default class UpdateTips extends Component {
  constructor(...args) {
    super(...args);

    this.updateStorage = this.updateStorage.bind(this);
  }

  show() {
    this.dialog.show();
  }

  // 弹窗显示或关闭后即将消息存入本地存储
  updateStorage() {
    localStorage.setItem(
      'updateTips', this.props.content
    );
  }

  render() {
    let props = this.props;

    return (
      <Dialog
        ref={(dialog) => {
          this.dialog = dialog;
        }}
        footer={null}
        className="_update-tips-dialog"
        padding="30px 60px"
        width="auto"
        onClose={this.updateStorage}
        onBeforeShow={this.updateStorage}
        visible={false}
      >
        <div
          className="_title"
        >
          新功能更新
        </div>
        <div
          className="_content"
          dangerouslySetInnerHTML={{
            __html: props.content
          }}
        />

        <div
          className="_btn-box"
        >
          <Button
            type="primary"
            fixedWidth={120}
            size="large"
            onClick={() => {
              this.dialog.hide();
            }}
          >
            确认
          </Button>
        </div>
      </Dialog>
    );
  }
}
