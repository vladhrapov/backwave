import { MAX_PACKET_SIZE } from "./constants";

export default class GraphSimulation {
  constructor() { }

  updateRoutesCapacity(routesInfo, packets) {
    routesInfo.routes = routesInfo.routes.map((route, routeIndex) => {
      let { capacity, maxCapacity } = route;

      capacity = maxCapacity;

      packets.forEach(packet => {
        let { index } = packet.path;

        if (routeIndex === index) {
          let packetSize = packet.amount > MAX_PACKET_SIZE ? MAX_PACKET_SIZE : packet.amount;

          capacity -= packetSize;
        }
      });

      return { ...route, capacity };
    });

    return routesInfo;
  }
}