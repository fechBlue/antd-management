import React, {Component} from 'react';
import './ui.less';
import { message, Card, Button } from "antd";

export default class Messages extends Component {

  openMesssage = (type) => {
    message[type]('德玛西亚万岁')
  }

  render () {
    return (
      <div>
        <Card title="全局提示框" className="card-wrap">
          <Button type="primary" onClick={() => {this.openMesssage('success')}}>Success</Button>
          <Button type="primary" onClick={() => {this.openMesssage('info')}}>Info</Button>
          <Button type="primary" onClick={() => {this.openMesssage('warning')}}>Wraning</Button>
          <Button type="primary" onClick={() => {this.openMesssage('error')}}>Error</Button>
          <Button type="primary" onClick={() => {this.openMesssage('loading')}}>Loading</Button>
        </Card>
      </div> 
    )
  }
}