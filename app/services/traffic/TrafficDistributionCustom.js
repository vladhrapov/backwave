import TrafficDistributionBase from "./TrafficDistributionBase";


export default class TrafficDistributionCustom extends TrafficDistributionBase {
  constructor() {
    super();
  }

  // should be logic for selecting correct path
  //

  selectRoute(routesInfo, index, packet) {
    // ToDo: Remove this distribution logic
    console.log(routesInfo);
    console.log(index);
    console.log(packet);

    if (packet.priority === "yes") {

    }
    else {

    }

    return 1;
  }
}