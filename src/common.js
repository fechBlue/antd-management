import React, {Component} from 'react';
import Header from './components/Header'

export default class Common extends Component {
  render () {
    return (
      <div className="common" style={{backgroundColor: '#f1f3f5'}}>
        <Header type={"public"}/>
        <div style={{padding: 20}}>
          {this.props.children}
        </div>
      </div>
    )
  }
}