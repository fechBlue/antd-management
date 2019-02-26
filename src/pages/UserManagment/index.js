import React, {Component} from 'react';
import { Card, Row, Button, Form, Modal } from 'antd';
import BaseForm from '../../components/BaseForm';
import ETable from '../../components/ETable';
import Axios from '../../api/axios';
import moment from 'moment';

export default class UserManagment extends Component {
  state = {
    visible: false,
    modal: {
      title: '',
      content: ''
    },
    record: {}
  }

  page = 1;

  componentWillMount() {
    this.request()
  }

  request = () => {
    Axios.requestList(this, '/table/list', 'get', {page: this.page})
  }

  rowClick = (record) => {
    this.setState({
      record
    })
  }

  onOk = () => {
    this.setState({
      visible: false
    })
    this.request();
  }
  onCancel = () => {
    this.setState({
      visible: false
    })
  }

  user = (type) => {
    if (type === '创建员工') {
      this.setState({
        record: {}
      })
    }else if (!this.state.record.userName) {
      Modal.info({
        title: '提示',
        content: '请选择一个员工'
      })
      return;
    }
    const createForm = {
      inline: 'horizontal',
      formItemLayout: {
        labelCol: {
          xs: 24,
          sm: 4
        },
        wrapperCol: {
          xs: 24,
          sm: 20
        }
      },
      formList: [
        {
          type: 'INPUT',
          label: '姓名',
          fieldId: 'userName',
          initialValue: this.state.record.userName || '',
          placeholder: '请输入姓名',
          inputType: 'text',
          rules: [{
            required: true
          }]
        },
        {
          type: 'RADIO',
          label: '性别',
          fieldId: 'sex',
          initialValue: this.state.record.sex || '男',
          radioList: [
            {
              value: '男',
              name: '男'
            },
            {
              value: '女',
              name: '女'
            }
          ]
        },
        {
          type: 'INPUT',
          label: '状态',
          fieldId: 'state',
          initialValue: this.state.record.state || '',
          placeholder: '请输入用户状态',
          inputType: 'text'
        },
        {
          type: 'DATE_PICKER',
          label: '生日',
          fieldId: 'birthday',
          initialValue: moment(this.state.record.birthday) || moment(),
          width: 220
        },
        {
          type: 'TEXTAREA',
          label: '联系地址',
          initialValue: this.state.record.address || '',
          fieldId: 'address',
          placeholder: '请输入联系地址'
        }
      ]
    }
    this.setState({
      visible: true,
      modal: {
        title: '创建员工',
        content: <BaseForm formProps={createForm} getForm={(form) => this.setState({createForm: form})}/>
      }
    })
  }

  render () {
    const loginForm = {
      layout: 'inline',
      footerNode: <Form.Item><Button type="primary">登录</Button></Form.Item>,
      formList: [
        {
          type: 'INPUT',
          label: '',
          fieldId: 'userName',
          initialValue: '',
          placeholder: '请输入用户名',
          inputType: 'text',
          width: 220
        },
        {
          type: 'INPUT',
          label: '',
          fieldId: 'password',
          initialValue: '',
          placeholder: '请输入密码',
          inputType: 'password',
          width: 220
        }
      ]
    };
    
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
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      type: 'radio'
    }
    const tableConfig = {
      columns,
      rowSelection,
      dataSource: this.state.dataSource,
      pagination: this.state.pagination
    }
    return (
      <Row>
        <Card style={{marginBottom: 20}}>
          <BaseForm formProps={loginForm}/>
        </Card>
        <Card 
          title={<Row>
                  <Button type="primary" onClick={() => this.user("创建员工")} style={{marginRight: 20}}>创建员工</Button>
                  <Button type="primary" onClick={() => this.user("编辑员工")} style={{marginRight: 20}}>编辑员工</Button>
                  <Button type="primary" onClick={this.userDetail} style={{marginRight: 20}}>员工详情</Button>
                  <Button type="danger" onClick={this.deleteUser}>删除员工</Button>
                </Row>}
        >
          <ETable tableConfig={tableConfig} rowClick={this.rowClick}/>
        </Card>
        <Modal
          title={this.state.modal.title}
          visible={this.state.visible}
          onOk={this.onOk}
          onCancel={this.onCancel}
          okText="确认"
          cancelText="取消"
          width={800}
        >
          {this.state.modal.content}
        </Modal>
      </Row>
    )
  }
}