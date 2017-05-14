import React from "react";

import ColorIcon from "../../../../Shared/ColorIcon";

import "./assets/_styles.scss";


function DataType({ type, amount, color }) {
  return (
    <div className="data-type">
      <ColorIcon className="data-type-color" color={color} />
      <span className="data-type-amount"><span>{amount}</span> MB</span>
      <div className="data-type-name">{type}</div>
    </div>
  );
}

export default function Queue({ queueInfo }) {
  return (
    <div>
      {queueInfo.map((dataType, index) => <DataType key={index} {...dataType} />)}
    </div>
  );
}