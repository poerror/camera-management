import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';

const cameraNavigation = props => (
  <div className="text-center" style={{margin: '10px'}}>
    <ButtonGroup>
      <Link to="/cameras/new" className="btn btn-outline-primary btn-sm">New</Link>
      <Link to={`/cameras/${props.cameraId}`} className={`btn btn-outline-secondary btn-sm ${props.cameraId ? null : 'disabled'}`}>Show</Link>
      <Link to={`/cameras/${props.cameraId}/edit`} className={`btn btn-outline-info btn-sm ${props.cameraId ? null : 'disabled'}`}>Edit</Link>
      <Button
        size="sm"
        outline
        onClick={() => props.deleteCamera(props.cameraId)}
        disabled={props.cameraId ? false : true}
        color="danger">Delete</Button>
    </ButtonGroup>
  </div>
);

export default cameraNavigation;
