import React, { Component } from 'react';
import { Container } from 'reactstrap';

import Navigation from '../../components/layout/Navigation';
import './Layout.css';

class Layout extends Component {

  render() {
    return (
      <div>
        <Navigation />

        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

export default Layout;
