import React, { Component } from "react";

import "./assets/_styles.scss"

export default function ColorIcon({ color }) {
  return (
    <span
      className="color-icon"
      style={{ backgroundColor: color }}
    >
    </span>
  );
}