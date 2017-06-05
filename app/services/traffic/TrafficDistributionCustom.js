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
      // let safeRoutes = this.selectSafeRoutes(routesInfo);
      // let nextRoute = index %
      let safeRoutes = routesInfo.routes
        .filter(route => route.isSafe && route.capacity > 0)
        .sort((prevRoute, nextRoute) => -(prevRoute.capacity - nextRoute.capacity));

      let routeInd = safeRoutes[0].index;

      return routeInd;
    }
    else {
      let routeInd;

      let unsafeRoutes = routesInfo.routes
        .filter(route => !route.isSafe && route.capacity > 0)
        .sort((prevRoute, nextRoute) => -(prevRoute.capacity - nextRoute.capacity));

      if (!unsafeRoutes.length) {
        // get safe route
        let safeRoutes = routesInfo.routes
          .filter(route => route.isSafe)
          .sort((prevRoute, nextRoute) => -(prevRoute.capacity - nextRoute.capacity));

        routeInd = safeRoutes[0].index;

        return routeInd;
      }

      routeInd = unsafeRoutes[0].index;

      return routeInd;
    }
  }

}