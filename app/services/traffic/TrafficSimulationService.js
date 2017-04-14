import TrafficDistributionService from "./TrafficDistributionService";

export default class TrafficSimulationService {
  constructor() {
    this.distributionService = new TrafficDistributionService();
  }
  
  doNextIteration() {
    let packet = this.distributionService.distributePacket();

    let packets = this.distributionService.movePacketsToNextVertex();

    // push packet to packets

    // should return [] updated packets
  }
}