import React, {Component} from 'react';
import {Table} from 'antd'

export default class ETable extends Component {
  state = {
    rowSelection: {}
  }

  componentDidMount() {
    this.setState({
      rowSelection: this.props.tableConfig.rowSelection
    });
  }

  onRowClick = (record) => {
    this.props.rowClick(record);
    this.setState({
      rowSelection:{
        type: 'radio',
        selectedRowKeys: [record.key]
      }
    })
  }

  render () {
    const {columns, dataSource, pagination} = this.props.tableConfig;
    return (
      <div>
        <Table
            bordered
            columns={columns}
            dataSource={dataSource}
            rowSelection={this.state.rowSelection}
            pagination={pagination}
            onRow={(record) => {
              return {
                onClick: () => {
                  if (!this.state.rowSelection || this.state.rowSelection.type === 'checkbox') return; 
                  this.onRowClick(record)
                }
              };
            }}
          />
      </div> 
    )
  }
}