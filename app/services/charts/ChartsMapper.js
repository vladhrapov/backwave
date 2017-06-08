import { cloneDeep } from "lodash";


export default class ChartsMapper {
  constructor(logger, randomCallback) {
    this.logger = logger;
    this.random = randomCallback;
  }

  get mapping() {
    console.log(this.logger);
    // const { packetsInfo, routesInfo } = logger;

    console.log("lost packets: ", this.lostPackets);
    let { lostPackets } = this;

    return { ...lostPackets };
  }

  get lostPackets() {
    const { packetsInfo } = this.logger;

    const lostPackets = this.updatePacketsLossPosibility(cloneDeep(packetsInfo))
      .filter(packet => packet.isLost);

    return {
      lostPackets: {
        default: this.getLostPacketsSortedByAlgorithm(lostPackets, "default"),
        custom: this.getLostPacketsSortedByAlgorithm(lostPackets, "custom")
      }
    }
  }

  getLostPacketsSortedByAlgorithm(lostPackets, algorithm) {
    const significant = [], inconsiderable = [];
    const sortedByAlgorithm = lostPackets.filter(packet => packet.distributionAlgorithm === algorithm);

    sortedByAlgorithm.forEach(packet => packet.priority === "yes" ? significant.push(packet) : inconsiderable.push(packet));
    // const sortedByTrafficPriorityASC = sortedByAlgorithm.filter(packet => packet.priority === "yes");
    // const sortedByTrafficPriorityDESC = sortedByAlgorithm.filter(packet => packet.priority !== "yes");

    return {
      count: {
        all: sortedByAlgorithm.length,
        significant: significant.length,
        inconsiderable: inconsiderable.length
      },
      packets: {
        all: sortedByAlgorithm,
        significant,
        inconsiderable
      }
    }

  }

  updatePacketsLossPosibility({ sent }) {
    return sent.map(packet => {
      packet.characteristics = packet.characteristics.slice(0, -1);

      packet.lossPosibility = 1 - packet.characteristics.reduce((sum, current) => sum * current, 1);
      packet.isLost = (this.random(0, 100) * 0.01) <= packet.lossPosibility ? true : false;

      return { ...packet };
    });
  }
}