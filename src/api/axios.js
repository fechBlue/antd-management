import axios from "axios";
import Jsonp from "jsonp";
import { Modal } from "antd";
import utils from '../utils/utils'

export default class Axios {
  static requestList(_this, url, method, params) {
    console.log(this)
    this.ajax({
      url,
      method,
      data: {
        params: params
      }
    }).then(res => {
      if (res && res.result) {
        let dataSource = res.result.map((item, index) => {
          item.key = index;
          return item;
        })
        _this.setState({
          dataSource,
          pagination: utils.page(res, (current) => {
            _this.page = current;
            _this.request()
          })
        });
      }
    })
  }
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      Jsonp(options.url, {
        params: 'callback'
      }, function (err, response){
        if (err) {
          reject('请求失败，请重试！');
        }else {
          console.log(response);
          if (response.status === 'success') {
            resolve(response);
          }else {
            reject(response.message);
          }
        }
      })
    })
  }
  static ajax(options) {
    if (options.data && options.data.showLoading !== false) {
      let loading = document.getElementById('ajaxLoading');
      loading.style.display = 'flex';
    } 
    
    const baseURL = window.isMock ? 'https://www.easy-mock.com/mock/5c6cc4eef8b1873e2776d892/management' : ''
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: options.method,
        baseURL,
        timeout: 8000,
        params: (options.data && options.data.params) || ''
      }).then((response) => {
        if (options.data && options.data.showLoading !== false) {
          let loading = document.getElementById('ajaxLoading');
          loading.style.display = 'none';
        }
        if (response && response.status === 200) {
          if (response.data && response.data.code === 0) {
            resolve(response.data)
          }else {
            Modal.info({
              title: '提示',
              content: response.data.msg
            })
          }
        }else {
          reject('接口请求失败')
        }
      }).catch((err) =>{
        if (options.data && options.data.showLoading !== false) {
          let loading = document.getElementById('ajaxLoading');
          loading.style.display = 'none';
        }
        Modal.error({
          title: '连接失败',
          content: err.message
        })
      })
    })
  }
}