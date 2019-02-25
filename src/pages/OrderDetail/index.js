import React, {Component} from 'react';
import Axios from '../../api/axios';
import './index.less'

export default class OrderDetail extends Component {
  state = {
    orderInfo: {}
  }

  map = '';

  componentDidMount() {
    Axios.ajax({
      url: '/orderDetail',
      method: 'get',
      data: {
        params: {

        }
      }
    }).then(res => {
      console.log(res)
      if (res.code === 0) {
        this.setState({
          orderInfo: res.result
        })
        this.renderMap(res.result)
      }
    })
  }

  addMarker = (point, image) => {
    let startIcon = new window.BMap.Icon(image, new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(36, 42)
    })
    let marker = new window.BMap.Marker(point, {icon: startIcon});
    this.map.addOverlay(marker);
  }

  drawRoute = (positionList) => {
    let trackPoint = [];
    for (let i = 0;i < positionList.length; i++) {
      trackPoint.push(new window.BMap.Point(positionList[i].lon, positionList[i].lat));
    }
    let polyLine = new window.BMap.Polyline(trackPoint, {
      strokeColor: 'red',
      strokeWeight: 3,
      strokeOpacity: 1
    });
    this.map.addOverlay(polyLine)
  }

  drawServiceArea = (positionList) => {
    let trackPoint = [];
    for (let i = 0;i < positionList.length; i++) {
      trackPoint.push(new window.BMap.Point(positionList[i].lon, positionList[i].lat));
    }
    let polyGon = new window.BMap.Polygon(trackPoint, {
      strokeColor: 'red',
      strokeWeight: 4,
      strokeOpacity: 1,
      fillColor: '#ff8605',
      fillOpacity: 0.4
    });
    this.map.addOverlay(polyGon)
  }

  renderMap = (data) => {
    this.map = new window.BMap.Map("order-map");
    // 创建地图实例  
    let startPoint = new window.BMap.Point(data.position_list[0].lon, data.position_list[0].lat);
    let endPoint = new window.BMap.Point(data.position_list[data.position_list.length - 1].lon, data.position_list[data.position_list.length - 1].lat);

    this.map.addControl(new window.BMap.NavigationControl({type: window.BMAP_ANCHOR_TOP_RIGHT}));
    this.map.addControl(new window.BMap.ScaleControl({type: window.BMAP_ANCHOR_TOP_RIGHT}));
    // 创建点坐标  
    this.addMarker(startPoint, '/assets/start_point.png');
    this.addMarker(endPoint, '/assets/end_point.png');
    this.drawRoute(data.position_list);
    this.drawServiceArea(data.area);
    this.map.centerAndZoom(endPoint, 11);
  }

  render () {
    const {orderInfo} = this.state;
    return (
      <div className="orderDetail">
        <div id="order-map" style={{height: 500}}></div>
        <div className="orderInfo">
          <header>基础信息</header>
          <ul>
            <li>
              <span>用车模式</span>
              <span>{orderInfo.mode === 1 ? '停车点' : '禁停区'}</span>
            </li>
            <li>
              <span>订单编号</span>
              <span>{orderInfo.order_sn}</span>
            </li>
            <li>
              <span>车辆编号</span>
              <span>{orderInfo.bike_sn}</span>
            </li>
            <li>
              <span>用户姓名</span>
              <span>{orderInfo.user_name}</span>
            </li>
            <li>
              <span>手机号码</span>
              <span>{orderInfo.mobile}</span>
            </li>
          </ul>
        </div>
        <hr style={{margin: '0 200px', borderColor: '#fff'}}/>
        <div className="orderInfo">
          <header>行程轨迹</header>
          <ul>
            <li>
              <span>行程起点</span>
              <span>{orderInfo.start_location}</span>
            </li>
            <li>
              <span>行程终点</span>
              <span>{orderInfo.end_location}</span>
            </li>
            <li>
              <span>行程里程</span>
              <span>{orderInfo.distance / 1000}公里</span>
            </li>
          </ul>
        </div>
      </div> 
    )
  }
}