import React, {Component} from 'react';
import './index.less';
import { Form, Select, Card, Button, Modal, Radio, Table, message } from 'antd';
import Axios from '../../api/axios';
import utils from '../../utils/utils';

class CityManage extends Component {
  state = {
    visible: false,
    dataSource: []
  }

  page = 1;

  componentWillMount() {
    this.request();
  }

  request = () => {
    Axios.ajax({
      url: '/cityManagement',
      method: 'get',
      data: {
        params: {
          page: this.page
        }
      }
    }).then((res) => {
      let _this = this;
      let dataSource = res.result.map((item) => {
        item.key = item.cityId;
        return item;
      })
      this.setState({
        dataSource,
        pagination: utils.page(res, (current) => {
          _this.page = current;
          _this.request()
        })
      });
    })
  }

  openCity = () => {
    this.setState({
      visible: true
    })
  }

  openCityOk = () => {
    const city_info = this.openCityForm.props.form.getFieldsValue();
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
    return (
      <div className="city-manage">
        <Card style={{marginBottom: 20}}>
          <FilterCityForm />
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
            <OpenCityForm wrappedComponentRef={(element) => {this.openCityForm = element}}/>
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

class FilterCity extends Component {
  render () {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form layout="inline">
        <Form.Item label="城市">
          {
            getFieldDecorator('city', {
              initialValue: '全部'
            })(
              <Select style={{width:90}}>
                <Select.Option value="全部">全部</Select.Option>
                <Select.Option value="北京">北京</Select.Option>
                <Select.Option value="上海">上海</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="用车模式">
          {
            getFieldDecorator('useMode', {
              initialValue: '全部'
            })(
              <Select style={{width:140}}>
                <Select.Option value="全部">全部</Select.Option>
                <Select.Option value="指定停车点模式">指定停车点模式</Select.Option>
                <Select.Option value="禁停区模式">禁停区模式</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="运营模式">
          {
            getFieldDecorator('operateMode', {
              initialValue: '全部'
            })(
              <Select>
                <Select.Option value="全部">全部</Select.Option>
                <Select.Option value="自营">自营</Select.Option>
                <Select.Option value="加盟">加盟</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="加盟商授权状态" style={{marginRight: 30}}>
          {
            getFieldDecorator('corperateState', {
              initialValue: '全部'
            })(
              <Select style={{width: 90}}>
                <Select.Option value="全部">全部</Select.Option>
                <Select.Option value="已授权">已授权</Select.Option>
                <Select.Option value="未授权">未授权</Select.Option>
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
const FilterCityForm = Form.create()(FilterCity)

class OpenCity extends Component {
  render () {
    const {getFieldDecorator} = this.props.form;
    const formLayout = {
      labelCol: {
        xs: 24,
        sm: 5
      },
      wrapperCol: {
        xs: 24,
        sm: 19
      }
    }
    return (
      <Form layout="horizontal">
        <Form.Item label="选择城市" {...formLayout}>
          {
            getFieldDecorator('city', {
              initialValue: '全部'
            })(
              <Select style={{width:120}}>
                <Select.Option value="全部">全部</Select.Option>
                <Select.Option value="北京市">北京市</Select.Option>
                <Select.Option value="上海市">上海市</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="运营模式" {...formLayout}>
          {
            getFieldDecorator('operateMode', {
              initialValue: '1'
            })(
              <Radio.Group>
                <Radio value="1">自营</Radio>
                <Radio value="2">加盟</Radio>
              </Radio.Group>
            )
          }
        </Form.Item>
        <Form.Item label="用车模式" {...formLayout}>
          {
            getFieldDecorator('useMode', {
              initialValue: '1'
            })(
              <Radio.Group>
                <Radio value="1">指定停车点模式</Radio>
                <Radio value="2">禁停区模式</Radio>
              </Radio.Group>
            )
          }
        </Form.Item>
      </Form>
    )
  }
}
const OpenCityForm = Form.create()(OpenCity)

export default CityManage