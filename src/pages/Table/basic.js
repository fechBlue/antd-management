import React, {Component} from 'react';
import { Card, Table } from "antd";
import Axios from '../../api/axios';

export default class BasicTable extends Component {
  state = {
    dataSource: [],
    dataSource2: [],
    selectedItems: [],
    selectedRowKeys: []
  }

  componentWillMount() {
    Axios.ajax({
      url: '/table/list',
      method: 'get',
      data: {
        params: {
          page: 1
        },

      }
    }).then((res) => {
        this.setState({
          dataSource2: res
        })
      })
    const dataSource = [{
      key: '0',
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

  onRowClick = (record) => {
    let {selectedItems} = this.state;
    let {selectedRowKeys} = this.state;
    selectedItems.push(record);
    selectedRowKeys.push(record.key);
    this.setState({
      selectedItems,
      selectedRowKeys
    })
  }

  render () {
    let {selectedRowKeys} = this.state;
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
        key: 'sex',
        render: (text) => {
          return text === 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render: (text) => {
          let config = {
            "1": '吃饭',
            "2": '睡觉',
            "3": '打豆豆',
            "4": '打LOL',
            "5": '陪女朋友'
          }
          return config[text]
        }
      },
      {
        title: '爱好',
        dataIndex: 'hobby',
        key: 'hobby',
        render: (text) => {
          let config = {
            "1": '打篮球',
            "2": '画画',
            "3": '读书',
            "4": '写字'
          }
          return config[text]
        }
      },
      {
        title: '是否已婚',
        dataIndex: 'married',
        key: 'married',
        render: (text) => {
          return text === 1 ? '已婚' : '未婚'
        }
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
    let rowSelection = {
      selectedRowKeys,
      type: 'checkbox'
    }
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
        <Card title="Mock动态数据渲染表格" style={{marginBottom: 20}}>
          <Table
            columns={columns}
            bordered
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card title="Mock选中表格中的某列">
          <Table
            columns={columns}
            bordered
            dataSource={this.state.dataSource2}
            pagination={false}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record)
                }
              };
            }}
          />
        </Card>
      </div> 
    )
  }
}