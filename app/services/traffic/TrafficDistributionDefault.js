import TrafficDistributionBase from "./TrafficDistributionBase";


export default class TrafficDistributionDefault extends TrafficDistributionBase {
  constructor() {
    super();
  }

  // should be logic for selecting correct path

  selectRoute(routesInfo, index, packet) {
    // if (!(routesInfo && routesInfo.routes && routesInfo.route.length)) return;

    return index % routesInfo.routes.length;
  }
}