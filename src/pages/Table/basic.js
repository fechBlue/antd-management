import React, {Component} from 'react';
import { Card, Table, Modal } from "antd";
import Axios from '../../api/axios';
import utils from '../../utils/utils';

export default class BasicTable extends Component {
  state = {
    dataSource: [],
    dataSource2: [],
  }

  page = 1

  componentWillMount() {
    this.request();
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

  request = () => {
    Axios.ajax({
      url: '/table/list',
      method: 'get',
      data: {
        params: {
          page: this.page
        },

      }
    }).then((res) => {
      let _this = this;
      this.setState({
        dataSource2: res.result,
        pagination: utils.page(res, (current) => {
          _this.page = current;
          _this.request()
        })
      });
    })
  }

  onRowClick = (record) => {
    this.setState({
      selectedItems: record,
      selectedRowKeys: [record.key]
    })
    Modal.info({
      title: '提示',
      content: `选择的id是${record.id}，姓名是${record.userName}`
    })
  }

  onChange = (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }

  render () {
    let {selectedRowKeys, selectedRowKeys2} = this.state;
    console.log(this.state)
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
      type: 'radio'
    }
    let rowSelection2 = {
      selectedRowKeys2,
      type: 'checkbox',
      onChange: this.onChange,
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
        <Card title="Mock-表格单选" style={{marginBottom: 20}}>
          <Table
            columns={columns}
            bordered
            dataSource={this.state.dataSource2}
            pagination={false}
            rowSelection={rowSelection}
            onRow={(record) => {
              return {
                onClick: () => {
                  this.onRowClick(record)
                }
              };
            }}
          />
        </Card>
        <Card title="Mock-表格多选" style={{marginBottom: 20}}>
          <Table
            columns={columns}
            bordered
            dataSource={this.state.dataSource2}
            pagination={false}
            rowSelection={rowSelection2}
          />
        </Card>
        <Card title="Mock-表格分页" style={{marginBottom: 20}}>
          <Table
            columns={columns}
            bordered
            dataSource={this.state.dataSource2}
            pagination={this.state.pagination}
          />
        </Card>
      </div> 
    )
  }
}