import TransformationService from "./TransformationService";

export default class WaveAlgorithmService {
  constructor(startVertex, finishVertex) {
    this.transformationService = new TransformationService();
    this.startVertex = startVertex;
    this.finishVertex = finishVertex;
  }

  getRoutes(matrix) {
    while (true) {
      
    }
  }

  invoke() {
    let matrix = this.transformationService.getTransformedMatrixFromCanvas();

    return this.getRoutes(matrix);
  }
}
