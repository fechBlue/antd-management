import React, {Component} from 'react';
import { Form, Card, Button, Icon, Input, message, Checkbox } from 'antd'

class FormLogin extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(`登录成功，用户名为${values.userName}，密码为${values.password}，记住我：${values.remember}`)
      }else {
        message.error(`登录失败`)
      }
    })
  }

  render () {
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Card title="内联表单" style={{marginBottom: 20}}>
          <Form layout="inline">
            <Form.Item>
              <Input placeholder="请输入用户名"/>
            </Form.Item>
            <Form.Item>
              <Input placeholder="请输入密码" type="password"/>
            </Form.Item>
            <Form.Item>
              <Button type="primary">登录</Button>
            </Form.Item>
          </Form>
        </Card>
        <Card title="登录水平表单" style={{marginBottom: 20}}>
          <Form layout="horizontal" style={{maxWidth: 300}} onSubmit={this.handleSubmit}>
            <Form.Item>
              {
                getFieldDecorator('userName', {
                  initialValue: '德玛西亚',
                  rules: [
                    {
                      required: true,
                      message: '请输入用户名'
                    }
                  ]
                })(
                  <Input prefix={<Icon type="user"/>} placeholder="请输入用户名"/>
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  initialValue: '123456',
                  rules: [
                    {
                      required: true,
                      message: '请输入密码'
                    }
                  ]
                })(
                  <Input prefix={<Icon type="lock"/>} placeholder="请输入密码" type="password"/>
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('remember', {
                  initialValue: true,
                  valuePropName: 'checked'
                })(
                  <Checkbox>记住我</Checkbox>
                )
              }
              <a href="javascript:;" style={{float: 'right'}}>忘记密码</a>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" style={{width: '100%'}}>登录</Button>
            </Form.Item>
          </Form>
        </Card>
      </div> 
    )
  }
}

export default Form.create()(FormLogin)