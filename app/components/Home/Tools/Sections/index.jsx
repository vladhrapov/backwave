import React from "react";

import Section from "./Section";
import Queue from "./Queue";

import "./assets/_styles.scss";


export default function Sections({ queueInfo }) {
  return (
    <div className="sections" >
      <Section>
        <Queue queueInfo={queueInfo} />
      </Section>
    </div>
  );
}