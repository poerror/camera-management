import React, { Component } from 'react';
import { connect } from 'react-redux';

import CameraNavigation from '../../components/cameras/CameraNavigation';
import CameraPagination from '../../components/cameras/CameraPagination';
import CameraTable from '../../components/cameras/CameraTable';
import * as actions from '../../actions/index';
import {
  DEFAULT_PAGE,
  DEFAULT_ITEM_PER_PAGE } from '../../config';
import './CameraList.css';

class CameraList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedCamera: null
    };
  }

  updateTable = (page, limit) => {
    this.props.onGetCameras({
      page: page,
      limit: limit
    });
  }

  componentWillMount() {
    this.updateTable(this.props.page, this.props.limit);
  }

  rowSelectedHadler = (cameraId) => {
    this.setState({
      selectedCamera: cameraId
    });
  }

  deleteCameraHandler = (cuuid) => {
    if (window.confirm("Are you sure?")) {
      this.props.onDeleteCamera(cuuid);
      this.setState({
        selectedCamera: null
      });
    }
  }

  render() {
    let pages = Math.ceil(this.props.cameras_total / this.props.limit);

    return (
      <div>
        <CameraNavigation
          deleteCamera={this.deleteCameraHandler}
          cameraId={this.state.selectedCamera} />
        <CameraPagination
          limit={this.props.limit}
          clicked={this.updateTable}
          currentPage={this.props.page}
          pages={pages} />
        <CameraTable
          cameras={this.props.cameras}
          cameraId={this.state.selectedCamera}
          loading={this.props.loading} rowSelected={this.rowSelectedHadler} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const query = new URLSearchParams(props.location.search);

  return {
    cameras: state.cameras.cameras,
    cameras_total: state.cameras.cameras_total,
    loading: state.cameras.loading,
    page: query.has('page') ? query.get('page') : DEFAULT_PAGE,
    limit: query.has('limit') ? query.get('limit') : DEFAULT_ITEM_PER_PAGE
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetCameras: (params) => dispatch(actions.getCameras(params)),
    onDeleteCamera: (cuuid) => dispatch(actions.deleteCamera(cuuid))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CameraList);
