import TrafficDistributionService from "./TrafficDistributionService";

export default class TrafficSimulationService {
  constructor() {
    this.distributionService = new TrafficDistributionService();
  }
  
  doNextIteration({ packetsInfo: packets, routesInfo }) {
    // get first packet
    const packet = this.getNextPacketFromQueue({
      index: packets.length,
      currentVertex: routesInfo.vertexFrom - 1,
      routesInfo
    });

    // modify existing packets and move them next
    packets = this.movePacketsToNextVertex(packets, routesInfo);

    // push packet to packets
    packets.push(packet);

    // should return [] updated packets
    return packets;
  }

  getNextPacketFromQueue({ routesInfo, currentVertex, index }) {
    // logic for getting next route for incoming traffic packets
    const packet = {
      name: "Packet_" + index,
      currentVertex: {
        index: currentVertex,
        name: `A${currentVertex + 1}`
      },
      iteration: index,
      isFinishVertex: false
    };

    const distributionInfo = this.distributionService.distributePacket(routesInfo, index, packet);

    // should return updated packet {} with params
    return {
      ...packet,
      ...distributionInfo
    };
  }

  movePacketsToNextVertex(packets, routesInfo) {
    // logic for setting vertex to nextVertex, updating nextVertex, isFinishVertex, etc ...
    packets = packets.map(packet => {
      let location = this.updatePacketLocation(packet, routesInfo);

      packet = { ...packet, ...location };
      return packet;
    });

    // should return updated [] with packets
    return packets;
  }

  updatePacketLocation(packet, routesInfo) {
    const { path } = packet;

    return routesInfo.routes[path.index]
      .map((routeVertex, routeVertexIndex) => {
        let { nextVertex } = packet;

        if (routeVertex.index == nextVertex.index) {
          return {
            currentVertex: {
              index: nextVertex.index + 1,
              name: nextVertex.name
            },
            nextVertex: {
              index: routesInfo.routes[path.index][routeVertexIndex + 1].index,
              name: routesInfo.routes[path.index][routeVertexIndex + 1].name
            },
            path: {
              ...path,
              nextVertexIndex: routeVertexIndex + 1
            }
          };
        }
      })
      .filter(routeVertex => !!routeVertex)[0];
  }
}