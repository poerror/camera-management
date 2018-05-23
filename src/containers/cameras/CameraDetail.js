import { connect } from 'react-redux';

import CameraDetail from '../../components/cameras/CameraDetail';
import * as actions from '../../actions/index';


const mapStateToProps = (state) => {
  return {
    camera: state.cameras.camera,
    loading: state.cameras.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetCamera: (cuuid) => dispatch(actions.getCamera(cuuid))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CameraDetail);
