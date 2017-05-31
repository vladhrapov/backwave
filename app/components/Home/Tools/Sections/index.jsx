import React from "react";

import Section from "./Section";
import Queue from "./Queue";
import Routes from "./Routes";

import "./assets/_styles.scss";


export default function Sections({ queueInfo, routesInfo }) {
  return (
    <div className="sections" >
      <Section>
        <Queue queueInfo={queueInfo} />
      </Section>
      <Section>
        <Routes routesInfo={routesInfo} />
      </Section>
    </div>
  );
}