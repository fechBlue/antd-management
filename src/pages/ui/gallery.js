import React, {Component} from 'react';
import './ui.less';
import { Card, Row, Col, Modal } from "antd";

export default class Gallerys extends Component {

  openModal = (src) => {
    Modal.info({
      title: "图片预览",
      content: <img src={src} alt="example" width='240'/>,
      maskClosable: true
    })
  }

  render () {
    const imgs = [];
    for (let i = 0; i <= 5; i++) {
      imgs.push([]);
      for (let j = 1 + (4*i); j <= (i+1)*4; j++) {
        imgs[i].push(`/gallery/${j}.png`)
      }
    }

    const imgElement = imgs.map((img, i) => {
      const card = img.map((item) => {
        return (
          <Card
            className="card-wrap"
            cover={<img alt="example" src={item} />}
            onClick={() => {this.openModal(item)}}
          >
            <Card.Meta
              title="德玛西亚万岁"
              description="死亡如风，常伴吾身"
            />
          </Card>
        )
      })
      return (
        <Col span={4}>
          {card}
        </Col>
      )
    })
    
    return (
      <div>
        <Row gutter={16}>
          {imgElement}
        </Row>
      </div> 
    )
  }
}