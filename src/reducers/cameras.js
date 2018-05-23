import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  cameras: [],
  cameras_total: 0,
  camera: {},
  loading: false,
  success: false
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // #############
    // GET CAMERAS
    // #############
    case actionTypes.GET_CAMERAS_INIT:
      return {
        ...state,
        loading: true
      }
    case actionTypes.GET_CAMERAS_SUCCESS:
      return {
        ...state,
        cameras: action.cameras,
        cameras_total: action.cameras_total,
        loading: false
      }
    case actionTypes.GET_CAMERAS_FAIL:
      return {
        ...state,
        loading: false
      }
    // #############
    // GET CAMERA
    // #############
    case actionTypes.GET_CAMERA_INIT:
      return {
        ...state,
        loading: true
      }
    case actionTypes.GET_CAMERA_SUCCESS:
      return {
        ...state,
        camera: action.camera,
        loading: false
      }
    case actionTypes.GET_CAMERA_FAIL:
      return {
        ...state,
        loading: false
      }
    // #############
    // STORE CAMERA
    // #############
    case actionTypes.STORE_CAMERA_INIT:
      return {
        ...state,
        loading: true
      }
    case actionTypes.STORE_CAMERA_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true
      }
    case actionTypes.STORE_CAMERA_FAIL:
      return {
        ...state,
        loading: false,
        success: false
      }
    // #############
    // DELETE CAMERA
    // #############
    case actionTypes.DELETE_CAMERA_INIT:
      return {
        ...state,
        loading: true
      }
    case actionTypes.DELETE_CAMERA_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case actionTypes.DELETE_CAMERA_FAIL:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}

export default reducer;
