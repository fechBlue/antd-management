import { axios } from "axios";
import Jsonp from "jsonp";

export default class Axios {
  static jsonp = (options) => {
    return new Promise((resolve, reject) => {
      Jsonp(options.url, {
        params: 'callback'
      }, function (err, response){
        if (err) {
          reject('请求失败，请重试！');
        }else {
          if (response.status === 'success') {
            resolve(response);
          }else {
            reject(response.message);
          }
        }
      })
    })
  }
}