import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './containers/layout/layout';
import CameraList from './containers/cameras/CameraList';
import CameraForm from './containers/cameras/CameraForm';
import CameraDetail from './containers/cameras/CameraDetail';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/' exact component={CameraList} />
            <Route path='/cameras/new' exact component={CameraForm} />
            <Route path="/cameras/:cuuid" exact component={CameraDetail} />
            <Route path="/cameras/:cuuid/edit" exact component={CameraForm} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
