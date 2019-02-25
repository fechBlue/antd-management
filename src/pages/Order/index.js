import React, {Component} from 'react';
import { Card, Button, Table } from "antd";
import Axios from '../../api/axios';
import utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm';
import ETable from '../../components/ETable';

class Order extends Component {
  state = {
    dataSource: [],
    selectedRowKey: []
  }

  page = 1;

  componentWillMount() {
    this.request()
  }

  request = () => {
    Axios.requestList(this, '/orderList', 'get', {page: this.page});
  }

  getOrderDetail = () => {
    window.open('/#/order/detail/27018')
  }

  rowClick = (record) => {
    console.log(record)
  }

  rowChecked = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys, selectedRows)
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
    const {dataSource, selectedRowKeys, pagination} = this.state;
    const rowSelection = {
      selectedRowKeys,
      type: 'radio'
    }
    let rowSelection2 = {
      selectedRowKeys,
      type: 'checkbox'
    }
    const orderForm = {
      layout: "inline",
      haveSearch: true,
      haveReset: true,
      formList: [
        {
          type: 'SELECT',
          label: '城市',
          fieldId: 'city',
          initialValue: '全部',
          width: 90,
          optionList: [
            {
              value: '全部',
              name: '全部'
            },
            {
              value: '北京',
              name: '北京'
            },
            {
              value: '上海',
              name: '上海'
            }
          ]
        },
        {
          type: 'DATE_PICKER',
          fieldId: 'start_time',
          placeholder: '开始时间',
          width: 150,
        },
        {
          type: 'DATE_PICKER',
          fieldId: 'end_time',
          placeholder: '结束时间',
          width: 150,
        },
        {
          type: 'SELECT',
          label: '订单状态',
          fieldId: 'orderState',
          initialValue: '全部',
          width: 150,
          optionList: [
            {
              value: '全部',
              name: '全部'
            },
            {
              value: '进行中',
              name: '进行中'
            },
            {
              value: '进行中（临时锁车）',
              name: '进行中（临时锁车）'
            },
            {
              value: '结束',
              name: '结束'
            }
          ]
        },
      ]
    };
    const tableConfig = {
      columns,
      dataSource,
      pagination,
      rowSelection
    }
    const tableConfig2 = {
      columns,
      dataSource,
      pagination,
      rowSelection: rowSelection2
    }
    return (
      <div>
        <Card style={{marginBottom: 20}}>
          <BaseForm formProps={orderForm} />
        </Card>
        <Card title={<div><Button type="primary" onClick={this.getOrderDetail} style={{marginRight: 20}}>订单详情</Button><Button type="primary">结束订单</Button></div>}>
          <ETable rowClick={this.rowClick} tableConfig={tableConfig}/>
          <ETable rowChecked={this.rowChecked} tableConfig={tableConfig2}/>
        </Card>
      </div> 
    )
  }
}

export default Order;