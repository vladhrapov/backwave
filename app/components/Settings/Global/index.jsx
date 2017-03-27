import React, { Component } from "react";

export default class Global extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Global settings
        1) Vertex naming
        2) Vertex shape (optional)
        3) Trafic distribution (step by step or in time)
        4) Algorithm type
        5) Bind canvas vertices from/to to first/last
        6) Random value for line (from - to)
      </div>
    );
  }
} 