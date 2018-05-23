import axios from 'axios';

import * as actionTypes from './actionTypes';
// import { API_ENDPOINT } from '../config';

// #############
// GET CAMERAS
// #############

export const getCamerasInit = () => {
  return {
    type: actionTypes.GET_CAMERAS_INIT
  }
}

export const getCamerasSuccess = (cameras, cameras_total) => {
  return {
    type: actionTypes.GET_CAMERAS_SUCCESS,
    cameras: cameras,
    cameras_total: cameras_total
  }
}

export const getCamerasFail = () => {
  return {
    type: actionTypes.GET_CAMERAS_FAIL
  }
}

export const getCameras = (params) => {

  const offset = (params.page - 1) * params.limit;
  return dispatch => {
    dispatch(getCamerasInit());
    axios.get('/v1/cameras?offset='+offset+'&limit='+params.limit)
    .then(respond => {
      dispatch(getCamerasSuccess(respond.data.data, respond.data.total_count));
    })
    .catch(error => {
      dispatch(getCamerasFail());
    });
  }
}

// #############
// GET CAMERA
// #############

export const getCameraInit = () => {
  return {
    type: actionTypes.GET_CAMERA_INIT
  }
}

export const getCameraSuccess = (camera) => {
  return {
    type: actionTypes.GET_CAMERA_SUCCESS,
    camera: camera
  }
}

export const getCameraFail = () => {
  return {
    type: actionTypes.GET_CAMERA_FAIL
  }
}

export const getCamera = (cuuid) => {
  return dispatch => {
    dispatch(getCameraInit());
    axios.get('/v1/cameras/'+cuuid)
    .then(respond => {
      dispatch(getCameraSuccess(respond.data));
    })
    .catch(error => {
      dispatch(getCameraFail());
    });
  }
}

// #############
// STORE CAMERA
// #############

export const storeCameraInit = () => {
  return {
    type: actionTypes.STORE_CAMERA_INIT
  }
}

export const storeCameraSuccess = () => {
  return {
    type: actionTypes.STORE_CAMERA_SUCCESS
  }
}

export const storeCameraFail = () => {
  return {
    type: actionTypes.GET_CAMERA_FAIL
  }
}

export const storeCamera = (params) => {

  return dispatch => {
    dispatch(getCameraInit());

      axios({
        method: params.uuid ? 'put' : 'post',
        url: params.uuid ? `/v1/cameras/${params.uuid}` : '/v1/cameras',
        data: params
      })
      .then(respond => {
        // console.log(`success ${params.uuid ? 'put' : 'post'}`, respond);
        dispatch(storeCameraSuccess(respond.data));
      })
      .catch(error => {
        // console.log(`fail ${params.uuid ? 'put' : 'post'}`, error);
        dispatch(storeCameraFail());
      });
  }
}

// #############
// DELETE CAMERA
// #############

export const deleteCameraInit = () => {
  return {
    type: actionTypes.DELETE_CAMERA_INIT
  }
}

export const deleteCameraSuccess = (camera) => {
  return {
    type: actionTypes.DELETE_CAMERA_SUCCESS
  }
}

export const deleteCameraFail = () => {
  return {
    type: actionTypes.DELETE_CAMERA_FAIL
  }
}

export const deleteCamera = (cuuid) => {
  return dispatch => {
    dispatch(deleteCameraInit());
    axios.delete('/v1/cameras/'+cuuid)
    .then(respond => {
      dispatch(deleteCameraSuccess(respond.data));
    })
    .catch(error => {
      dispatch(deleteCameraFail());
    });
  }
}
