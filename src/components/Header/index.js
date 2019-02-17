import React, {Component} from 'react'
import { Row, Col } from "antd";
import './index.less'
import Utils from '../../utils/utils'
import Axios from '../../api/axios'

export default class Header extends Component {
  state = {
    sysTime: ''
  };

  componentWillMount() {
    setInterval(() => {
      let sysTime = Utils.formateTime(new Date());
      this.setState({
        sysTime
      })
    }, 1000);
    this.getWeatherData();
  }

  getWeatherData = () => {
    const city = '杭州';
    Axios.jsonp({
      url: 'http://api.map.baidu.com/telematics/v3/weather?location='+ encodeURIComponent(city) +'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
    }).then((res) => {
      if (res.status === 'success') {
        let data = res.results[0].weather_data[0];
        this.setState({
          weather: data.weather + ' ' + data.temperature + ' ' + data.wind,
          weatherPic: data.dayPictureUrl
        })
      }
    })
  }

  render () {
    return (
      <div className="header">
        <Row className="header-top">
          <Col span={24} className="user-detail">
            <span className="userName">欢迎，想在太空扬起帆</span>
            <a href="#" className="quit">退出</a>
          </Col>
        </Row>
        <Row className="header-bottom">
          <Col span={12}>
            <span className="bread-crumb">首页</span>
          </Col>
          <Col span={12} className="weather">
            <span className="time">{this.state.sysTime}</span>
            <span className="weather-detail">
              <img src={this.state.weatherPic}/>
              <i>{this.state.weather}</i>
            </span>
          </Col>
        </Row>
      </div> 
    )
  }
}