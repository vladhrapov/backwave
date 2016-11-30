import CanvasService from "./CanvasService";

export default class TransformationService {
  constructor() {}

  isCanvasHasShapes(canvas) {
    return canvas._objects &&
        canvas._objects.length;
  }

  getTransformedMatrixFromCanvas() {
    let canvas = CanvasService.getCanvas(),
        shapesCollection = canvas._objects,
        transformedMatrix = [];

    if (this.isCanvasHasShapes(canvas)) {
      shapesCollection.forEach((shape) => {
        let { type, name } = shape.customProps;

        if (type == "vertex") {
          shapesCollection.forEach((relatedShape) => {
            let {
              type: relatedType,
              name: relatedName
            } = relatedShape.customProps;

            if (name != relatedName
              && relatedType == "vertex"
              && name) {
              console.log("name: ", name, " relatedShape: ", relatedShape);
            }
          });
        }
      });
    }
  }


}
