import React from 'react';
import FontAwesome from 'react-fontawesome';

import './CameraTableRow.css';

const cameraTableRow = (props) => {
  return(
    <tr onClick={props.rowSelected} className={props.selected ? "active" : null}>
      <td>Model XX</td>
      <td>Europe/Bratislava</td>
      <td className="text-center">{<FontAwesome name="check" />}</td>
      <td>2018-05-20 02:26:04</td>
    </tr>
  );
}

export default cameraTableRow;
