export default class TrafficDistributionService {
  constructor() { }

  // should be logic for selecting correct path
  //
  
  distributePacket(routesInfo) {
    // logic for getting next vertex

    return {
      nextVertex: {
        index: 2,
        name: "name"
      },
      path: "link or array"
    }
  }

  getNextPacketFromQueue({ routesInfo, currentVertex, index }) {
    // logic for getting next route for incoming traffic packets
    const { nextVertex, path } = this.distributePacket(routesInfo);

    // should return updated packet {} with params
    return {
      name: "NewPacket" + index,
      currentVertex: {
        index: currentVertex,
        name: `A${currentVertex}`
      },
      nextVertex: {
        index: nextVertex.index,
        name: nextVertex.name
      },
      path,
      iteration: index,
      isFinishVertex: false
    }
  }

  movePacketsToNextVertex(packets, routesInfo) {
    // logic for setting vertex to nextVertex, updating nextVertex, isFinishVertex, etc ...


    packets.forEach(packet => {
      // let { index, name } = routesInfo[0][packet.currentVertex - 1];
      // let { index: nextIndex, name: nextName } = routesInfo[0][packet.currentVertex];

      let updatedVertices = routesInfo.routes[0]
        .map((vertex, vertexIndex) => {
          if (vertex.index == (packet.currentVertex.index - 1)) {
            return {
              currentVertex: {
                index: vertex.index + 1,
                name: vertex.name
              },
              nextVertex: {
                index: routesInfo.routes[0][vertexIndex + 1].index,
                name: routesInfo.routes[0][vertexIndex + 1].name
              }
            };
          }
        })
        .filter(vertex => !!vertex)[0];

      packet = { ...packet, ...updatedVertices };
    });

    // should return updated [] with packets
    return packets;
  }
}