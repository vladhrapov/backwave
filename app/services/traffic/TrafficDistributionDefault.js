export default class TrafficDistributionDefault {
  constructor() { }

  // should be logic for selecting correct path
  //

  distributePacket(routesInfo, index, packet) {
    // logic for getting next vertex
    let nextRouteIndex = this.selectRoute(routesInfo, index, packet);

    let nextVertex = routesInfo.routes[nextRouteIndex][1];

    if (!nextVertex) return;

    let nextVertexAndRoute = {
      nextVertex: {
        index: nextVertex.index,
        name: nextVertex.name
      },
      path: {
        index: nextRouteIndex,
        vertices: [...routesInfo.routes[nextRouteIndex]],
        nextVertexIndex: 2
      }
    };

    return nextVertexAndRoute;
  }

  selectRoute(routesInfo, index, packet) {
    // ToDo: Remove this distribution logic

    return index % routesInfo.routes.length;
  }
}