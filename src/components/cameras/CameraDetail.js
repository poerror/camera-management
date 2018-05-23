import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import CameraNavigation from './CameraNavigation';
import Loader from '../layout/Loader';
import './CameraDetail.css';

class CameraDetail extends Component {

  componentWillMount() {
    this.props.onGetCamera(this.props.match.params.cuuid);
  }

  render() {

    let metadataHtml = [];
    if (this.props.camera.metadata) {
      const metadata = this.props.camera.metadata;
      for (var key in metadata) {
        metadataHtml.push(
          <div>
            <dt>{key}</dt>
            <dd>{metadata[key]}</dd>
          </div>
        );
      }
    }

    let camera;
    if (this.props.loading) {
      camera = <Loader />;
    } else {
      camera = (
        <dl>
          <div className="card">
            <div className="card-body">
              <h6>Common</h6>
              <dt>Model</dt>
              <dd>{this.props.camera.model}</dd>
              <dt>Timezone</dt>
              <dd>{this.props.camera.timezone}</dd>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h6>Async</h6>
              <dt>Async enabled</dt>
              <dd><FontAwesome name={this.props.camera.async_enabled ? "check" : "times"} /></dd>
              <dt>Async group wait</dt>
              <dd>{this.props.camera.async_group_wait}</dd>
              <dt>Async group max</dt>
              <dd>{this.props.camera.async_group_max}</dd>
              <dt>Async address</dt>
              <dd>{this.props.camera.async && this.props.camera.async.address}</dd>
              <dt>Async port</dt>
              <dd>{this.props.camera.async && this.props.camera.async.port}</dd>
              <dt>Async protocol</dt>
              <dd>{this.props.camera.async && this.props.camera.async.protocol}</dd>
              <dt>Async login</dt>
              <dd>{this.props.camera.async && this.props.camera.async.login}</dd>
              <dt>Async password</dt>
              <dd>{this.props.camera.async && this.props.camera.async.password}</dd>
            </div>
          </div>
          {
            metadataHtml ?
            (
              <div className="card">
                <div className="card-body">
                  <h6>Metadata</h6>
                  {metadataHtml}
                </div>
              </div>
            ) : null
          }
        </dl>
      );
    }
    return (
      <div>
        <CameraNavigation cameraId={this.props.camera.uuid} />

        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            {camera}
          </Col>
        </Row>
      </div>
    );
  }
}

export default CameraDetail;
