import React, { Component } from 'react';
import { Table } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import CameraTableRow from './CameraTableRow';

class CameraTable extends Component {

  render() {
    const loader = <tr><td className="text-center" colSpan="4"><FontAwesome name="spinner" spin size="lg" /></td></tr>;
    const cameraRows = (this.props.cameras && this.props.cameras.length) ?
                        this.props.cameras.map(camera => <CameraTableRow
                          key={camera}
                          selected={this.props.cameraId === camera}
                          rowSelected={() => this.props.rowSelected(camera)} />) :
                        loader;
    return (
      <Table hover>
        <thead>
          <tr>
            <th>Model</th>
            <th>Timezone</th>
            <th>Async enabled</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {this.props.loading ? loader : cameraRows}
        </tbody>
      </Table>
    );
  }
}

export default CameraTable;
