import { connect } from 'react-redux';

import CameraForm from '../../components/cameras/CameraForm';
import * as actions from '../../actions/index';

const mapStateToProps = (state, props) => {

  // const cuuid = ownProps.match.params.cuuid;
  // let camera = {};
  // if (cuuid) {
  //   camera = state.cameras.camera;
  // }

  return {
    camera: state.cameras.camera,
    success: state.cameras.success
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetCamera: (cuuid) => dispatch(actions.getCamera(cuuid)),
    onStoreCamera: (params) => dispatch(actions.storeCamera(params)),
    onDeleteCamera: (cuuid) => dispatch(actions.deleteCamera(cuuid))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CameraForm);
