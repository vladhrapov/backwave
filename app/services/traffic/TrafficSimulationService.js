import TrafficDistributionDefault from "./TrafficDistributionDefault";
import TrafficDistributionCustom from "./TrafficDistributionCustom";
import { ALGORITHM_DEFAULT, ALGORITHM_CUSTOM } from "./constants";

export default class TrafficSimulationService {
  constructor() {
    this.distributionDefaultService = new TrafficDistributionDefault();
    this.distributionCustomService = new TrafficDistributionCustom();
  }

  doNextIteration({ packetsInfo: packets, routesInfo, packetCounter, distributionAlgorithm, dataType }) {
    // get first packet
    const packet = this.getNextPacketFromQueue({
      index: packetCounter,
      currentVertex: routesInfo.vertexFrom - 1,
      routesInfo,
      distributionAlgorithm,
      dataType
    });

    // modify existing packets and move them next
    packets = this.movePacketsToNextVertex(packets, routesInfo);

    // push packet to packets
    packets.push(packet);

    // should return [] updated packets
    return packets;
  }

  getNextPacketFromQueue({ routesInfo, currentVertex, index, distributionAlgorithm, dataType }) {
    // logic for getting next route for incoming traffic packets
    const packet = {
      name: "Packet_" + index,
      currentVertex: {
        index: currentVertex,
        name: `A${currentVertex + 1}`
      },
      iteration: index,
      priority: dataType.priority,
      isFinishVertex: false
    };

    const distributionInfo = this.getDistributionService(distributionAlgorithm).distributePacket(routesInfo, index, packet, distributionAlgorithm);

    // should return updated packet {} with params
    return {
      ...packet,
      ...distributionInfo
    };
  }

  getDistributionService(distributionAlgorithm) {
    switch (distributionAlgorithm) {
      case ALGORITHM_DEFAULT:
        return this.distributionDefaultService;
      case ALGORITHM_CUSTOM:
      default:
        return this.distributionCustomService;
    }
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

    return routesInfo.routes[path.index].path
      .map((routeVertex, routeVertexIndex) => {
        let { nextVertex } = packet;

        if (routeVertex.index == nextVertex.index) {
          let nextVertexFromRoute = routesInfo.routes[path.index].path[routeVertexIndex + 1];

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