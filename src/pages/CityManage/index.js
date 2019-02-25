import React, {Component} from 'react';
import './index.less';
import { Card, Button, Modal, Table, message } from 'antd';
import Axios from '../../api/axios';
import utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm';

class CityManage extends Component {
  state = {
    visible: false,
    dataSource: []
  }

  page = 1;

  openCityForm = {};

  filterCityForm = {};

  componentWillMount() {
    this.request();
  }

  request = () => {
    Axios.requestList(this, '/cityManagement', 'get', {page: this.page})
  }

  openCity = () => {
    this.setState({
      visible: true
    })
  }

  openCityOk = () => {
    const city_info = this.openCityForm.getFieldsValue();
    Axios.ajax({
      url: '/cityAdd',
      method: 'get',
      data: {
        params: city_info
      }
    }).then((res) => {
      if (res.code === 0) {
        message.success(res.result);
        return;
      }
      message.error('开通失败');
    })
    this.setState({
      visible: false
    });
    this.request();
  }

  openCityClose = () => {
    this.setState({
      visible: false
    })
  }

  handleSubmit = (formValue) => {
    console.log(formValue)
  }

  render () {
    const columns = [
      {
        title: '城市Id',
        dataIndex: 'cityId'
      },
      {
        title: '城市名称',
        dataIndex: 'cityName'
      },
      {
        title: '用车模式',
        dataIndex: 'userMode',
        render: (value) => {
          return value === 1 ? '停车点' : '禁停区'
        }
      },
      {
        title: '运营模式',
        dataIndex: 'operateMode',
        render: (value) => {
          return value === 1 ? '自营' : '加盟'
        }
      },
      {
        title: '授权加盟商',
        dataIndex: 'corperator'
      },
      {
        title: '城市管理员',
        dataIndex: 'cityManager',
        render: (value) => {
          return value.length === 2 ? value[0].user_name + ',' + value[1].user_name : value[0].user_name
        }
      },
      {
        title: '城市开通时间',
        dataIndex: 'cityOpenTime'
      },
      {
        title: '操作时间',
        dataIndex: 'operateTime'
      },
      {
        title: '操作人',
        dataIndex: 'operator'
      }
    ]
    const {dataSource} = this.state;
    const filterCityForm = {
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
          type: 'SELECT',
          label: '用车模式',
          fieldId: 'useMode',
          initialValue: '全部',
          width: 140,
          optionList: [
            {
              value: '全部',
              name: '全部'
            },
            {
              value: '指定停车点模式',
              name: '指定停车点模式'
            },
            {
              value: '禁停区模式',
              name: '禁停区模式'
            }
          ]
        },
        {
          type: 'SELECT',
          label: '运营模式',
          fieldId: 'operateMode',
          initialValue: '全部',
          width: 90,
          optionList: [
            {
              value: '全部',
              name: '全部'
            },
            {
              value: '自营',
              name: '自营'
            },
            {
              value: '加盟',
              name: '加盟'
            }
          ]
        },
        {
          type: 'SELECT',
          label: '加盟商授权状态',
          fieldId: 'corperateState',
          initialValue: '全部',
          width: 90,
          style: {
            marginRight: 30
          },
          optionList: [
            {
              value: '全部',
              name: '全部'
            },
            {
              value: '已授权',
              name: '已授权'
            },
            {
              value: '未授权',
              name: '未授权'
            }
          ]
        },
      ]
    };
    const openCityForm = {
      layout: "horizontal",
      haveSearch: false,
      haveReset: false,
      formItemLayout: {
        labelCol: {
          xs: 24,
          sm: 5
        },
        wrapperCol: {
          xs: 24,
          sm: 19
        }
      },
      formList: [
        {
          type: 'SELECT',
          label: '选择城市',
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
          type: 'RADIO',
          label: '运营模式',
          initialValue: '自营',
          fieldId: 'operateMode',
          radioList: [
            {
              value: '自营',
              name: '自营'
            },
            {
              value: '加盟',
              name: '加盟'
            }
          ]
        },
        {
          type: 'RADIO',
          label: '用车模式',
          initialValue: '指定停车点模式',
          fieldId: 'useMode',
          radioList: [
            {
              value: '指定停车点模式',
              name: '指定停车点模式'
            },
            {
              value: '禁停区模式',
              name: '禁停区模式'
            }
          ]
        }
      ]
    };
    return (
      <div className="city-manage">
        <Card style={{marginBottom: 20}}>
          <BaseForm formProps={filterCityForm} handleSubmit={(value) => {this.handleSubmit(value)}} reset={this.request} getForm={(form) => {this.filterCityForm = form}}/>
        </Card>
        <Card title={<Button type="primary" onClick={this.openCity}>开通城市</Button>}>
          <Modal
            visible={this.state.visible}
            title="开通城市"
            onOk={this.openCityOk}
            onCancel={this.openCityClose}
            okText={'确定'}
            cancelText={'取消'}
            maskClosable={true}
          >
            <BaseForm formProps={openCityForm} getForm={(form) => {this.openCityForm = form}}/>
          </Modal>
          <Table
            bordered
            columns={columns}
            dataSource={dataSource}
            pagination={this.state.pagination}
          />
        </Card>
      </div> 
    )
  }
}

export default CityManage