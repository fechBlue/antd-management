import React, {Component} from 'react';
import './ui.less';
import { notification, Card, Button } from "antd";

export default class Notifications extends Component {

  openNotification = (type, direction) => {
    if (direction) {
      notification.config({
        placement: direction
      })
    }
    notification[type]({
      message: '德玛西亚万岁',
      description: '我的大刀早已饥渴难耐'
    })
  }

  render () {
    return (
      <div>
        <Card title="通知提醒框" className="card-wrap">
          <Button type="primary" onClick={() => {this.openNotification('success')}}>Success</Button>
          <Button type="primary" onClick={() => {this.openNotification('info')}}>Info</Button>
          <Button type="primary" onClick={() => {this.openNotification('warning')}}>Wraning</Button>
          <Button type="primary" onClick={() => {this.openNotification('error')}}>Error</Button>
        </Card>
        <Card title="通知提醒框-方向控制" className="card-wrap">
          <Button type="primary" onClick={() => {this.openNotification('success', 'topLeft')}}>Success-TopLeft</Button>
          <Button type="primary" onClick={() => {this.openNotification('info', 'topRight')}}>Info-TopRight</Button>
          <Button type="primary" onClick={() => {this.openNotification('warning', 'bottomLeft')}}>Wraning-BottomLeft</Button>
          <Button type="primary" onClick={() => {this.openNotification('error', 'bottomRight')}}>Error-BottomRight</Button>
        </Card>
      </div> 
    )
  }
}