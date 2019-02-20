import React, {Component} from 'react';
import { Card, Table } from "antd";
import axios from 'axios';

export default class BasicTable extends Component {
  state = {
    dataSource: [],
    dataSource2: []
  }

  componentWillMount() {
    axios.get(' https://www.easy-mock.com/mock/5c6cc4eef8b1873e2776d892/management/table/list')
      .then((res) => {
        console.log(res.data)
        if (res.data.code === 0 && res.data.result) {
          this.setState({
            dataSource2: res.data.result
          })
        }
      })
    const dataSource = [{
      id: '0',
      userName: '张三',
      sex: '男',
      state: '在吃饭',
      hobby: '打篮球',
      married: '未婚',
      birthday: '2020-10-10',
      address: '浙江省杭州市滨江区',
      time: '09:30:00'
    }]
    this.setState({
      dataSource
    })
  }

  render () {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex'
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state'
      },
      {
        title: '爱好',
        dataIndex: 'hobby',
        key: 'hobby'
      },
      {
        title: '是否已婚',
        dataIndex: 'married',
        key: 'married'
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        key: 'birthday'
      },
      {
        title: '联系地址',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '早期时间',
        dataIndex: 'time',
        key: 'time'
      }
    ]
    return (
      <div>
        <Card title="基础表格" style={{marginBottom: 20}}>
          <Table
            columns={columns}
            bordered
            dataSource={this.state.dataSource}
            pagination={false}
          />
        </Card>
        <Card title="Mock动态数据渲染表格">
          <Table
            columns={columns}
            bordered
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
      </div> 
    )
  }
}