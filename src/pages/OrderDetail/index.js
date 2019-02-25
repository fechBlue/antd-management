import React, {Component} from 'react';
import Axios from 'axios';

export default class OrderDetail extends Component {

  componentWillMount() {
    Axios.get('https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api/order/detail').then(res => {console.log(res)})
  }

  render () {
    return (
      <div className="common">
        订单详情
      </div> 
    )
  }
}