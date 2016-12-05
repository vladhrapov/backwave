import TransformationService from "./TransformationService";

export default class WaveAlgorithmService {
  constructor(startVertex, finishVertex) {
    this.transformationService = new TransformationService();
    this.startVertex = startVertex;
    this.finishVertex = finishVertex;
  }

  getRoutes(matrix) {
    let path = "";
    let a, nextVertex,
        currentVertex = this.startVertex,
        currentVertexWeight = Number.POSITIVE_INFINITY;

    while (true) {

      if (!Number.isFinite(nextVertex)) {
        matrix[this.startVertex].forEach((item, index) => {

          if (item && item.weight) {
            if (item.weight < currentVertexWeight) {
              currentVertexWeight = item.weight;
              currentVertex = index;
              nextVertex = index;
            }
          }
        });

        matrix[this.startVertex][currentVertex] = null;
        matrix[currentVertex][this.startVertex] = null;
        path += `A${currentVertex + 1} - `;
      }
      else {
        currentVertexWeight = Number.POSITIVE_INFINITY;

        matrix[nextVertex].forEach((item, index) => {
          if (item && item.weight) {
            if (item.weight < currentVertexWeight) {
              currentVertexWeight = item.weight;
              currentVertex = index;
              nextVertex = index;
            }
          }
        });

        matrix[nextVertex][currentVertex] = null;
        matrix[currentVertex][nextVertex] = null;
        path += `A${currentVertex + 1} - `;
      }

      if (nextVertex == this.finishVertex) {
        break;
      }
      if (a) {
        break;
      }
    }

    console.log("PATH: ", path);
  }

  invoke() {
    let matrix = this.transformationService.getTransformedMatrixFromCanvas();

    return this.getRoutes(matrix);
  }
}
