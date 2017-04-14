import React from 'react';

// Components
import Canvas from "./Canvas/Canvas.jsx";

// Styles
import "./assets/_styles.scss";
import "../Shared/assets/_reset-default.scss";

import { firebaseRef } from "../../constants/FirebaseConfig";


export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }




  render() {
    return (
      <div>
        <Canvas canvasSrv={this.props.canvasSrv} />
      </div>
    );
  }
}
