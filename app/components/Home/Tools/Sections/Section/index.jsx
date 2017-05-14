import React from "react";

import "./assets/_styles.scss";


export default function Section({ children }) {
  return (
    <div className="section" >
      {children}
    </div>
  );
}