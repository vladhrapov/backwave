import CanvasService from "./CanvasService";

export default class TransformationService {
  constructor() {}

  isCanvasHasShapes(canvas) {
    return canvas._objects &&
        canvas._objects.length;
  }

  getTransformedMatrixFromCanvas() {
    let canvas = CanvasService.getCanvas(),
        transformedMatrix = [];

    if (isCanvasHasShapes(canvas)) {

    }
  }


}
