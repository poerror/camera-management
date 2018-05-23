import React from 'react';
import FontAwesome from 'react-fontawesome';

const loader = () => (
  <FontAwesome
    style={{position: 'absolute', display: 'block',top: '50%', left: '50%'}}
    name="spinner"
    spin
    size="lg" />
);

export default loader;
