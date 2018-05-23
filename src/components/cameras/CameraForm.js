import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import {
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Label,
  Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import CameraNavigation from '../../components/cameras/CameraNavigation';
import Loader from '../layout/Loader';
import './CameraForm.css';

class CameraForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
        uuid: null,
        model: '',
        async_enabled: true,
        async_group_wait: 60,
        async_group_max: 300,
        timezone: '',
        metadata: {},
        new_metadata: {
          attribute: '',
          value: ''
        }
    };
  }

  componentWillMount() {

    const cuuid = this.props.match.params.cuuid;
    if (cuuid) {
      this.props.onGetCamera(this.props.match.params.cuuid);
    }
  }

  componentWillReceiveProps(props) {
      if(this.props.match.params.cuuid) {
        if (props.camera) {
          const camera = props.camera;
          this.setState({
            uuid: camera.uuid,
            model: camera.model,
            async_enabled: camera.async_enabled,
            async_group_wait: camera.async_group_wait,
            async_group_max: camera.async_group_max,
            timezone: camera.timezone,
            metadata: camera.metadata
          });
        }
      }
  }

  onInputChanged = (event, type) => {
    let state = this.state;
    state[type] = event.target.value;
    this.setState({
        state
    });
  }

  onMetadataInputChanged = (event, type) => {
    let metadata = Object.assign({}, this.state.metadata);
    metadata[type] = event.target.value;
    this.setState({
        metadata: metadata
    });
  }

  onNewMetadataInputChanged = (event, type) => {
    let state = Object.assign({}, this.state);
    state['new_metadata'][type] = event.target.value;
    this.setState({
      state
    });
  }

  onNewMetadata = (event) => {
    if (this.state.new_metadata['attribute'] && this.state.new_metadata['value']) {
      let metadata = Object.assign({}, this.state.metadata);
      metadata[this.state.new_metadata['attribute']] =this.state.new_metadata['value'];
      this.setState({
        metadata: metadata,
        new_metadata: {
          attribute: '',
          value: ''
        }
      });
    }
  }

  onDeleteMetadata = (type) => {
    let metadata = Object.assign({}, this.state.metadata);
    delete metadata[type];
    this.setState({
      metadata: metadata
    });
  }

  onSave = (event) => {
    event.preventDefault();
    this.props.onStoreCamera(this.state);
    this.props.history.push('/');
  }

  deleteCameraHandler = (cuuid) => {
    if (window.confirm("Are you sure?")) {
      this.props.onDeleteCamera(cuuid);
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div>
        <CameraNavigation
          deleteCamera={this.deleteCameraHandler}
          cameraId={this.props.match.params.cuuid} />

        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <Form onSubmit={this.onSave}>

                <div className="card">
                  <div className="card-body">
                    <h6>Common</h6>
                    <FormGroup>
                      <Label for="model">Model</Label>
                      <Input
                        type="text"
                        name="model"
                        id="model"
                        required
                        onChange={(event) => this.onInputChanged(event, 'model')}
                        value={this.state.model} />
                    </FormGroup>

                    <FormGroup>
                      <Label for="model">Timezone</Label>
                      <Input
                        type="text"
                        name="timezone"
                        id="timezone"
                        required
                        onChange={(event) => this.onInputChanged(event, 'timezone')}
                        value={this.state.timezone} />
                    </FormGroup>


                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <h6>Async</h6>
                    <FormGroup>
                      <Label for="async_enabled">Async enabled</Label>
                      <Input
                        type="select"
                        name="select"
                        id="async_enabled"
                        onChange={(event) => this.onInputChanged(event, 'async_enabled')}
                        value={this.state.async_enabled}>
                          <option value="true">Enabled</option>
                          <option value="false">Disabled</option>
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <Label for="async_group_wait">Async group wait</Label>
                      <Input
                        type="number"
                        name="async_group_wait"
                        id="async_group_wait"
                        onChange={(event) => this.onInputChanged(event, 'async_group_wait')}
                        value={this.state.async_group_wait} />
                    </FormGroup>

                    <FormGroup>
                      <Label for="async_group_max">Async group max</Label>
                      <Input
                        type="number"
                        name="async_group_max"
                        id="async_group_max"
                        onChange={(event) => this.onInputChanged(event, 'async_group_max')}
                        value={this.state.async_group_max} />
                    </FormGroup>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <h6>Metadata</h6>
                    {
                      this.state.metadata ? (
                        Object.keys(this.state.metadata).map((key) => (
                          <FormGroup key={key}>
                            <Label for={key}>{key}</Label>
                            <FontAwesome className="pull-right text-danger" name="times" onClick={() => this.onDeleteMetadata(key)} />
                            <Input
                              type="text"
                              name={key}
                              id={key}
                              onChange={(event) => this.onMetadataInputChanged(event, key)}
                              value={this.state.metadata[key]} />
                          </FormGroup>
                        ))
                      ) : null
                    }

                    <hr/>
                    <h6>New Metadata</h6>
                    <FormGroup>
                      <Input
                        style={{marginBottom: '5px'}}
                        type="text"
                        onChange={(event) => this.onNewMetadataInputChanged(event, 'attribute')}
                        value={this.state.new_metadata['attribute']}
                        placeholder="Attribute" />
                      <Input
                        type="text"
                        onChange={(event) => this.onNewMetadataInputChanged(event, 'value')}
                        value={this.state.new_metadata['value']}
                        placeholder="Value" />
                    </FormGroup>

                    <Button outline size="sm" color="primary" onClick={this.onNewMetadata} block>Add Metadata</Button>
                  </div>
                </div>

                <div className="text-center" style={{margin: '10px'}}>
                  <ButtonGroup>
                    <Button outline size="sm" color="primary">Submit</Button>
                    <Link to="/" className="btn btn-back btn-outline-secondary btn-sm">
                        Back
                    </Link>
                  </ButtonGroup>
                </div>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CameraForm;
