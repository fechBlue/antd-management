import React, {Component} from 'react';
import './ui.less';
import { Spin, Icon, Card, Alert } from "antd";

export default class Loadings extends Component {
  render () {
    const icon = <Icon type="loading"/>
    return (
      <div>
        <Card title="Spin用法" className="card-wrap">
          <Spin />
          <Spin size="small" style={{margin: '0 20px'}}/>
          <Spin size="large" style={{marginRight: 20}}/>
          <Spin size="large" indicator={icon}/>
        </Card>
        <Card title="内容遮罩用法" className="card-wrap">
          <Spin indicator={icon}>
            <Alert 
              message="德玛西亚万岁"
              description="无形装逼，最为致命"
              type="info"
            />
          </Spin>
          <div style={{height: 20}}></div>
          <Spin indicator={icon} tip="加载中">
            <Alert 
              message="德玛西亚万岁"
              description="无形装逼，最为致命"
              type="info"
            />
          </Spin>
        </Card>
      </div> 
    )
  }
}