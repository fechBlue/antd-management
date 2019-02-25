import React, {Component} from 'react';
import {Form, Button, Input, Select, Checkbox, Radio, InputNumber, Switch, TimePicker, DatePicker} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
const FormItem = Form.Item;
const Option = Select.Option;

class BaseForm extends Component {

  fieldsValue = {}

  componentDidMount() {
    if (!this.props.getForm) return;
    this.props.getForm(this.props.form);
  }

  handleSearch = () => {
    this.fieldsValue = this.props.form.getFieldsValue();
    this.props.handleSubmit(this.fieldsValue)
  }

  handleReset = () => {
    this.props.reset()
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const layout = this.props.formProps.layout;
    const formList = this.props.formProps.formList;
    const formItemLayout = this.props.formProps.formItemLayout ? this.props.formProps.formItemLayout : {}
    let formItem = [];
    formList.forEach((item, index) => {
      const label = item.label;
      const fieldId = item.fieldId;
      const initialValue = item.initialValue;
      const rules = item.rules ? item.rules : [];
      const width = item.width ? item.width : {};
      const style = item.style ? item.style : {};
      switch (item.type) {
        case 'INPUT':
          const placeholder = item.placeholder;
          const type = item.inputType;
          formItem.push(
            <Form.Item label={label} style={style} key={index} {...formItemLayout}>
            {
              getFieldDecorator(fieldId, {
                initialValue: initialValue,
                placeholder: placeholder,
                rules: rules
              })(
                <Input type={type} style={{width: width}}/>
              )
            }
            </Form.Item>
          )
          break;
        case 'INPUT_NUMBER':
          formItem.push(
            <Form.Item label={label} style={style} key={index} {...formItemLayout}>
            {
              getFieldDecorator(fieldId, {
                initialValue: initialValue,
                placeholder: placeholder,
                rules: rules
              })(
                <InputNumber />
              )
            }
            </Form.Item>
          )
          break;
        case 'SELECT':
          const optionList = item.optionList;
          const mode = item.selectMode ? item.selectMode : '';
          formItem.push(
            <Form.Item label={label} style={style} key={index} {...formItemLayout}>
            {
              getFieldDecorator(fieldId, {
                initialValue: initialValue,
                placeholder: placeholder,
                rules: rules
              })(
                <Select style={{width: width}} mode={mode}>
                  {
                    optionList.map((item, index) => {
                      return <Option value={item.value} key={index}>{item.name}</Option>
                    })
                  }
                </Select>
              )
            }
            </Form.Item>
          )
          break;
        case 'CHECKBOX':
          const checkList = item.checkList;
          formItem.push(
            <Form.Item label={label} style={style} key={index} {...formItemLayout}>
            {
              getFieldDecorator(fieldId, {
                initialValue: true,
                placeholder: placeholder,
                valuePropName: 'checked',
                rules: rules
              })(
                <Checkbox.Group style={{width: width}}>
                  {
                    checkList.map((item, index) => {
                      return <Checkbox value={item.value} key={index}>{item.name}</Checkbox>
                    })
                  }
                </Checkbox.Group>
              )
            }
            </Form.Item>
          )
          break;
        case 'RADIO':
          const radioList = item.radioList;
          formItem.push(
            <Form.Item label={label} style={style} key={index} {...formItemLayout}>
            {
              getFieldDecorator(fieldId, {
                initialValue: initialValue,
                placeholder: placeholder,
                rules: rules
              })(
                <Radio.Group style={{width: width}}>
                  {
                    radioList.map((item, index) => {
                      return <Radio value={item.value} key={index}>{item.name}</Radio>
                    })
                  }
                </Radio.Group>
              )
            }
            </Form.Item>
          )
          break;
        case 'SWITCH':
          formItem.push(
            <Form.Item label={label} style={style} key={index} {...formItemLayout}>
            {
              getFieldDecorator(fieldId, {
                initialValue: true,
                valuePropName: 'checked',
                rules: rules
              })(
                <Switch />
              )
            }
            </Form.Item>
          )
          break;
        case 'TIME_PICKER':
          formItem.push(
            <Form.Item label={label} style={style} key={index} {...formItemLayout}>
            {
              getFieldDecorator(fieldId, {
                rules: rules
              })(
                <TimePicker />
              )
            }
            </Form.Item>
          )
          break;
        case 'DATE_PICKER':
          formItem.push(
            <Form.Item label={label} style={style} key={index} {...formItemLayout}>
            {
              getFieldDecorator(fieldId, {
                initialValue: initialValue,
                placeholder: placeholder,
                rules: rules
              })(
                <DatePicker />
              )
            }
            </Form.Item>
          )
          break;
        case 'TEXTAREA':
          formItem.push(
            <Form.Item label={label} style={style} key={index} {...formItemLayout}>
            {
              getFieldDecorator(fieldId, {
                initialValue: initialValue,
                placeholder: placeholder,
                rules: rules
              })(
                <TextArea autosize={{minRows: 3, maxRows: 5}}/>
              )
            }
            </Form.Item>
          )
          break;
        default:
          break;
      }
    })
    return (
      <Form layout={layout}>
        {formItem}
        {this.props.formProps.haveSearch ? 
          <FormItem>
            <Button type="primary" onClick={this.handleSearch}>查询</Button>
          </FormItem>
        : ''}
        {this.props.formProps.haveReset ? 
          <FormItem>
            <Button onClick={this.handleReset}>重置</Button>
          </FormItem>
        : ''}
      </Form>
    )
  }
}
export default Form.create()(BaseForm)