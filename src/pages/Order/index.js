import React, {Component} from 'react';
import { Card, Modal, Button, Table, Form, Select, TimePicker } from "antd";
import Axios from '../../api/axios';
import utils from '../../utils/utils';

class Order extends Component {
  state = {
    dataSource: []
  }

  page = 1;

  componentWillMount() {
    this.request()
  }

  request = () => {
    Axios.ajax({
      url: '/orderList',
      method: 'get',
      data: {
        params: {
          page: this.page
        }
      }
    }).then((res) => {
      let _this = this;
      this.setState({
        dataSource: res.result.map((item, index) => {
          item.key = index;
          return item;
        }),
        pagination: utils.page(res, (current) => {
          _this.page = current;
          _this.request()
          _this.setState({
            selectedRowKey: []
          })
        })
      })
    })
  }

  render () {
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'orderId'
      },
      {
        title: '车辆编号',
        dataIndex: 'bikeId'
      },
      {
        title: '用户名',
        dataIndex: 'userName'
      },
      {
        title: '手机号',
        dataIndex: 'mobile'
      },
      {
        title: '里程',
        dataIndex: 'orderMiles'
      },
      {
        title: '行程时长',
        dataIndex: 'orderTime'
      },
      {
        title: '状态',
        dataIndex: 'orderState'
      },
      {
        title: '开始时间',
        dataIndex: 'orderStartTime'
      },
      {
        title: '结束时间',
        dataIndex: 'orderEndTime'
      },
      {
        title: '订单金额',
        dataIndex: 'orderMoney'
      },
      {
        title: '实付金额',
        dataIndex: 'realMoney'
      }
    ]
    const {dataSource, selectedRowKey} = this.state;
    const rowSelection = {
      selectedRowKey,
      type: 'radio'
    }
    return (
      <div>
        <Card style={{marginBottom: 20}}>
          <FilterOrderForm />
        </Card>
        <Card title={<div><Button type="primary" style={{marginRight: 20}}>订单详情</Button><Button type="primary">结束订单</Button></div>}>
          <Table
            bordered
            columns={columns}
            dataSource={dataSource}
            rowSelection={rowSelection}
            pagination={this.state.pagination}
          />
        </Card>
      </div> 
    )
  }
}
class FilterOrder extends Component {
  render () {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form layout="inline">
        <Form.Item label="城市">
          {
            getFieldDecorator('city', {
              initialValue: ' '
            })(
              <Select style={{width:90}}>
                <Select.Option value=" ">全部</Select.Option>
                <Select.Option value="1">北京</Select.Option>
                <Select.Option value="2">上海</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item colon={false}>
          {
            getFieldDecorator('startTime')(
              <TimePicker placeholder="请选择开始时间" style={{width: 150}}/>
            )
          }
        </Form.Item>
        <span style={{marginRight: 16, lineHeight: '38px'}}>~</span>
        <Form.Item colon={false}>
          {
            getFieldDecorator('endTime')(
              <TimePicker placeholder="请选择结束时间" style={{width: 150}}/>
            )
          }
        </Form.Item>
        <Form.Item label="订单状态">
          {
            getFieldDecorator('orderState', {
              initialValue: ' '
            })(
              <Select style={{width: 150}}>
                <Select.Option value=" ">全部</Select.Option>
                <Select.Option value="1">进行中</Select.Option>
                <Select.Option value="2">进行中（临时锁车）</Select.Option>
                <Select.Option value="3">行程结束</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item>
          <Button type="primary">查询</Button>
        </Form.Item>
        <Form.Item>
          <Button>重置</Button>
        </Form.Item>
      </Form>
    )
  }
}
const FilterOrderForm = Form.create()(FilterOrder);

export default Order;