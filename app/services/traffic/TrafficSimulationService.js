import TrafficDistributionService from "./TrafficDistributionService";

export default class TrafficSimulationService {
  constructor() {
    this.distributionService = new TrafficDistributionService();
  }
  
  doNextIteration({ packetsInfo: packets, routesInfo, vertexFrom }) {
    const packet = this.distributionService.getNextPacketFromQueue({
      index: packets.length,
      currentVertex: vertexFrom,
      routesInfo
    });

    packets = this.distributionService.movePacketsToNextVertex(packets, routesInfo);

    // push packet to packets
    packets.push(packet);

    // should return [] updated packets
    return packets;
  }
}