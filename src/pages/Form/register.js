import React, {Component} from 'react';
import { Col, Form, Card, Button, Icon, Input, Checkbox, Radio, InputNumber, Select, Switch, DatePicker, TimePicker, Upload } from 'antd'
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import './upload.less'

class FormRegister extends Component {

  state = {
    imageUrl: ''
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

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
                  getFieldDecorator('birthday', {
                    initialValue: moment('2019-02-20'),
                  })(
                    <DatePicker />
                  )
                }
              </Form.Item>
              <Form.Item label="联系地址" {...formItemLayout}>
                {
                  getFieldDecorator('address', {
                    initialValue: '浙江省杭州市滨江区',
                  })(
                    <TextArea autosize={{minRows: 3, maxRows: 5}}/>
                  )
                }
              </Form.Item>
              <Form.Item label="起床时间" {...formItemLayout}>
                {
                  getFieldDecorator('getUpTime')(
                    <TimePicker />
                  )
                }
              </Form.Item>
              <Form.Item label="头像" {...formItemLayout}>
                {
                  getFieldDecorator('avatar', {
                    rules: [{
                      required: true
                    }]
                  })(
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="//jsonplaceholder.typicode.com/posts/"
                      onChange={this.handleChange}
                    >
                      {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" /> : <Icon type="plus"/>}
                    </Upload>
                  )
                }
              </Form.Item>
              <Form.Item label="" {...formItemLayout}>
                <Col xs={24} sm={12}/>
                {
                  getFieldDecorator('rule', {
                    valuePropName: 'checked',
                    initialValue: true
                  })(
                    <Checkbox>我已阅读并同意<a href="javascript:;">安全游戏协议</a></Checkbox>
                  )
                }
              </Form.Item>
              <Form.Item>
                <Col xs={24} sm={4}/>
                <Button type="primary">注册</Button>
              </Form.Item>
            </Form>
          </Card>
      </div> 
    )
  }
}

export default Form.create()(FormRegister)