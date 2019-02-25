import React, {Component} from 'react';
import Header from './components/Header'

export default class Common extends Component {
  render () {
    return (
      <div className="common">
        <Header type={"public"}/>
        {this.props.children}
      </div>
    )
  }
}