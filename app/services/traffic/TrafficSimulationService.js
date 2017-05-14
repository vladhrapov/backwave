import TrafficDistributionDefault from "./TrafficDistributionDefault";

export default class TrafficSimulationService {
  constructor() {
    this.distributionService = new TrafficDistributionDefault();
  }

  doNextIteration({ packetsInfo: packets, routesInfo, packetCounter }) {
    // get first packet
    const packet = this.getNextPacketFromQueue({
      index: packetCounter,
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

    // should return updated [] with packets
    return packets
      .filter(packet => !packet.isFinishVertex)
      .map(packet => {
        let location = this.updatePacketLocation(packet, routesInfo);

        packet = { ...packet, ...location };
        return packet;
      });
  }

  updatePacketLocation(packet, routesInfo) {
    const { path } = packet;

    return routesInfo.routes[path.index]
      .map((routeVertex, routeVertexIndex) => {
        let { nextVertex } = packet;

        if (routeVertex.index == nextVertex.index) {
          let nextVertexFromRoute = routesInfo.routes[path.index][routeVertexIndex + 1];

          let updatedPacket = {
            currentVertex: {
              index: nextVertex.index + 1,
              name: nextVertex.name
            },
            path: {
              ...path,
              nextVertexIndex: routeVertexIndex + 1
            }
          };

          if (nextVertexFromRoute) {
            updatedPacket = {
              ...updatedPacket,
              nextVertex: {
                index: nextVertexFromRoute.index,
                name: nextVertexFromRoute.name
              }
            }
          }
          else {
            updatedPacket = {
              ...updatedPacket,
              isFinishVertex: true
            }
          }

          return updatedPacket;
        }
      })
      .filter(routeVertex => !!routeVertex)[0];
  }
}