import React, {Component} from 'react';
import { Button, Modal, Card } from "antd";
import './ui.less'
export default class Modals extends Component {
  state = {
    baseModal1: false,
    baseModal2: false,
    baseModal3: false,
    baseModal4: false,
  }

  handleBaseModal = (type) => {
    this.setState({
      [type]: true
    })
  }

  handleInfoModal = (type) => {
    Modal[type]({
      title: '德玛西亚万岁',
      okText: "确认",
      cancelText: "取消",
      onOk(){
        console.log('ok')
      },
      onCancel(){
        console.log('cancel')
      },
      maskClosable: true
    })
  }

  render () {
    return (
      <div>
        <Card className="card-wrap" title="基础模态框">
          <Button type="primary" onClick={() => {this.handleBaseModal('baseModal1')}}>Open</Button>
          <Button type="primary" onClick={() => {this.handleBaseModal('baseModal2')}}>自定义页脚</Button>
          <Button type="primary" onClick={() => {this.handleBaseModal('baseModal3')}}>顶部20px弹框</Button>
          <Button type="primary" onClick={() => {this.handleBaseModal('baseModal4')}}>水平垂直居中</Button>
        </Card>
        <Card className="card-wrap" title="信息确认框">
          <Button type="primary" onClick={() => {this.handleInfoModal('confirm')}}>Confirm</Button>
          <Button type="primary" onClick={() => {this.handleInfoModal('info')}}>Info</Button>
          <Button type="primary" onClick={() => {this.handleInfoModal('success')}}>Success</Button>
          <Button type="primary" onClick={() => {this.handleInfoModal('error')}}>Error</Button>
          <Button type="primary" onClick={() => {this.handleInfoModal('warning')}}>Warning</Button>
        </Card>
        <Modal
          title="德玛西亚万岁"
          visible={this.state.baseModal1}
          onCancel={()=>{
            this.setState({
              baseModal1: false
            })
          }}
        >
          无形装逼，最为致命
        </Modal>
        <Modal
          title="德玛西亚万岁"
          visible={this.state.baseModal2}
          onCancel={()=>{
            this.setState({
              baseModal2: false
            })
          }}
          okText="确定"
          cancelText="取消"
        >
          无形装逼，最为致命
        </Modal>
        <Modal
          title="德玛西亚万岁"
          style={{top: 20}}
          visible={this.state.baseModal3}
          onCancel={()=>{
            this.setState({
              baseModal3: false
            })
          }}
        >
          无形装逼，最为致命
        </Modal>
        <Modal
          title="德玛西亚万岁"
          wrapClassName="vertical-center-modal"
          visible={this.state.baseModal4}
          onCancel={()=>{
            this.setState({
              baseModal4: false
            })
          }}
        >
          无形装逼，最为致命
        </Modal>
      </div> 
    )
  }
}