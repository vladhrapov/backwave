export default class TrafficDistributionBase {
  constructor() { }

  distributePacket(routesInfo, index, packet, distributionAlgorithm) {
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
      },
      distributionAlgorithm
    };

    return nextVertexAndRoute;
  }
}