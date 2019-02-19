import React, {Component} from 'react';
import { Form, Card, Button, Icon, Input, message, Checkbox, Radio, InputNumber, Select, Switch } from 'antd'

class FormRegister extends Component {
  

  render () {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        sm: 8
      }
    }
    console.log({...formItemLayout})
    return (
      <div>
        <Card title="注册表单">
          <Form layout="horizontal">
              <Form.Item label="用户名" {...formItemLayout}>
                {
                  getFieldDecorator('userName', {
                    initialValue: '',
                    rules: [
                      {
                        required: true,
                        message: '请输入用户名'
                      }
                    ]
                  })(
                    <Input placeholder="请输入用户名"/>
                  )
                }
              </Form.Item>
              <Form.Item label="密码" {...formItemLayout}>
                {
                  getFieldDecorator('password', {
                    initialValue: '',
                    rules: [
                      {
                        required: true,
                        message: '请输入密码'
                      }
                    ]
                  })(
                    <Input placeholder="请输入密码" type="password"/>
                  )
                }
              </Form.Item>
              <Form.Item label="性别" {...formItemLayout}>
                {
                  getFieldDecorator('sex', {
                    initialValue: '1',
                  })(
                    <Radio.Group>
                      <Radio value="1">男</Radio>
                      <Radio value="2">女</Radio>
                    </Radio.Group>
                  )
                }
              </Form.Item>
              <Form.Item label="年龄" {...formItemLayout}>
                {
                  getFieldDecorator('age', {
                    initialValue: 18,
                  })(
                    <InputNumber />
                  )
                }
              </Form.Item>
              <Form.Item label="当前状态" {...formItemLayout}>
                {
                  getFieldDecorator('nowStatus', {
                    initialValue: '3',
                  })(
                    <Select>
                      <Select.Option value="1">咸鱼一条</Select.Option>
                      <Select.Option value="2">风华才子</Select.Option>
                      <Select.Option value="3">百度FE</Select.Option>
                      <Select.Option value="4">阿里p6</Select.Option>
                      <Select.Option value="5">咸鱼一条</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
              <Form.Item label="爱好" {...formItemLayout}>
                {
                  getFieldDecorator('hobits', {
                    initialValue: ['1', '3'],
                  })(
                    <Select mode="multiple">
                      <Select.Option value="1">唱歌</Select.Option>
                      <Select.Option value="2">跳舞</Select.Option>
                      <Select.Option value="3">打篮球</Select.Option>
                      <Select.Option value="4">吃饭</Select.Option>
                      <Select.Option value="5">睡觉</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
              <Form.Item label="是否已婚" {...formItemLayout}>
                {
                  getFieldDecorator('isMarried', {
                    initialValue: true,
                    valuePropName: 'checked'
                  })(
                    <Switch />
                  )
                }
              </Form.Item>
              <Form.Item label="生日" {...formItemLayout}>
                {
                  getFieldDecorator('isMarried', {
                    initialValue: true,
                  })(
                    <Switch />
                  )
                }
              </Form.Item>
              <Form.Item>
                <Button type="primary">注册</Button>
              </Form.Item>
            </Form>
          </Card>
      </div> 
    )
  }
}

export default Form.create()(FormRegister)