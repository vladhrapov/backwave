import React from "react";
import { fabric } from "fabric";

import Settings from "./Settings/Settings.jsx";
import CanvasService from "./CanvasService.js";

import "./assets/_styles.scss";

export default class Canvas extends React.Component {
  constructor() {
    super();
    console.log("Fabric: ", fabric);
  }

  render() {
    return (
      <div>
        <canvas id="canvas" width="1480" height="750"></canvas>
        <Settings />
      </div>
    );
  }
}
