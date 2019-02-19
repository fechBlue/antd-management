import React, {Component} from 'react';
import './ui.less';
import { Tabs, Card, message, Icon } from "antd";
const TabPane = Tabs.TabPane;
export default class TabS extends Component {
  state = {
    panes: []
  }

  newTabIndex = 0;

  onChange = (key) => {
    message.info(`你点击了第${key}个标签页`);
  }
  
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }
  
  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: `New Tab ${this.newTabIndex}`, content: '德玛西亚万岁', key: activeKey });
    this.setState({ panes, activeKey });
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  }

  editTabs = (activeKey) => {
    this.setState({
      activeKey
    })
  }

  componentWillMount() {
    const panes = [
      {
        title: 'New Tab1',
        content: 'Content of new Tab',
        key: '1'
      },
      {
        title: 'New Tab2',
        content: 'Content of new Tab',
        key: '2'
      },
      {
        title: 'New Tab3',
        content: 'Content of new Tab',
        key: '3'
      }
    ]
    this.setState({
      panes,
      activeKey: panes[0].key
    })
  }

  render () {
    return (
      <div>
        <Card title="Tabs标签页" className="card-wrap">
          <Tabs
            defaultActiveKey="1"
            onChange={this.onChange}
          >
            <TabPane key="1" tab="Tab1">Tab1</TabPane>
            <TabPane key="2" tab="Tab2">Tab2</TabPane>
            <TabPane key="3" tab="Tab3">Tab3</TabPane>
          </Tabs>
        </Card>
        <Card title="Tabs带图标的标签页" className="card-wrap">
          <Tabs
            defaultActiveKey="1"
            onChange={this.onChange}
          >
            <TabPane key="1" tab={<span><Icon type="plus"/>Tab1</span>}>Tab1</TabPane>
            <TabPane key="2" tab={<span><Icon type="edit"/>Tab2</span>}>Tab2</TabPane>
            <TabPane key="3" tab={<span><Icon type="delete"/>Tab3</span>}>Tab3</TabPane>
          </Tabs>
        </Card>
        <Card title="Tabs可编辑的标签页" className="card-wrap">
          <Tabs
            activeKey={this.state.activeKey}
            type="editable-card"
            onChange={this.editTabs}
            onEdit={this.onEdit}
          >
            {
              this.state.panes.map((pane) => {
                return <TabPane key={pane.key} tab={pane.title}>{pane.content}</TabPane>
              })
            }
          </Tabs>
        </Card>
      </div> 
    )
  }
}