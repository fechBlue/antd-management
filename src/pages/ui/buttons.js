import React, {Component} from 'react';
import { Button, Radio, Card, Icon } from "antd";
import './ui.less'

export default class Buttons extends Component {
  state = {
    loading: true,
    size: 'default'
  }

  handleToggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    })
  }

  handleButtonSize = (e) => {
    this.setState({
      size: e.target.value
    })
  }

  render () {
    return (
      <div>
        <Card className="card-wrap" title="基础按钮">
          <Button type="primary">LOL</Button>
          <Button>LOL</Button>
          <Button type="dash">LOL</Button>
          <Button type="danger">LOL</Button>
          <Button type="disabled">LOL</Button>
        </Card>
        <Card className="card-wrap" title="图形按钮">
          <Button icon="add">添加</Button>
          <Button icon="edit">编辑</Button>
          <Button icon="delete">删除</Button>
          <Button icon="search" shape="circle"></Button>
          <Button icon="search" type="primary">搜索</Button>
          <Button icon="download" type="primary">下载</Button>
        </Card>
        <Card className="card-wrap" title="Loading按钮">
          <Button type="primary" loading={this.state.loading}>确定</Button>
          <Button type="primary" loading={this.state.loading} shape="circle"></Button>
          <Button loading={this.state.loading}>点击加载</Button>
          <Button loading={this.state.loading} shape="circle"></Button>
          <Button type="primary" onClick={this.handleToggleLoading}>切换</Button>
        </Card>
        <Card className="card-wrap" title="按钮尺寸">
          <Radio.Group onChange={this.handleButtonSize}>
            <Radio value="small">小</Radio>
            <Radio value="default">中</Radio>
            <Radio value="large">大</Radio>
          </Radio.Group>
          <Button type="primary" size={this.state.size}>LOL</Button>
          <Button size={this.state.size}>LOL</Button>
          <Button type="dash" size={this.state.size}>LOL</Button>
          <Button type="danger" size={this.state.size}>LOL</Button>
        </Card>
        <Card title="按钮组">
          <Button.Group>
            <Button type="primary" icon="left">后退</Button>
            <Button type="primary">前进<Icon type="right"/></Button>
          </Button.Group>
        </Card>
      </div> 
    )
  }
}