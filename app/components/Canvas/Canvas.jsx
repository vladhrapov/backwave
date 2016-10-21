import React from "react";


export default class Canvas extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <canvas width="100" height="100">
        </canvas>
      </div>
    );
  }
}
