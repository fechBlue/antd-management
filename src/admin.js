import React, {Component} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft'
import Home from './pages/Home'
import { Row, Col } from 'antd';
import './style/common.less'

export default class Admin extends Component {
  render () {
    return (
      <div className="container">
        <Row span={24}>
          <Col span={4}>
            <NavLeft />
          </Col>
          <Col span={20} className="main">
            <Header />
            <Home />
            <Footer />
          </Col>
        </Row>
      </div>
    )
  }
}