export default class TransformationService {
  constructor() {}

  isCanvasHasShapes(canvas) {
    return canvas._objects &&
      canvas._objects.length;
  }

  transformCanvasToMatrix(canvasSrv) {
    let {
      canvas
    } = canvasSrv,
    shapesCollection = canvas._objects,
      transformedMatrix = [];

    console.log("vertex names: ", canvasSrv.getVertexNames());

    if (this.isCanvasHasShapes(canvas)) {
      shapesCollection.forEach((shape) => {
        let {
          type,
          name,
          lines
        } = shape.customProps,
          shapesTypeGroupCount = canvasSrv.getShapeTypeGroupCount(),
          rowCollection = new Array(shapesTypeGroupCount.vertexCount);

        if (type == "vertex") {
          /*
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
          */
          console.log("name: ", name);

          lines.forEach((line) => {
            let {
              type: lineType,
              name: relatedName,
              label
            } = line.customProps, {
              from: fromObj,
              to: toObj
            } = line.customProps.vertex, {
              weight
            } = label.customProps;

            if (fromObj.name != name) {
              console.log("fromObj.name: ", fromObj.name);
              rowCollection[+(fromObj.name.slice(1)) - 1] = {
                weight: +weight
              };
              // Maybe we need to set -1 vertex
              // rowCollection[+(fromObj.name.slice(1)) - 1] = +weight;
            } else if (toObj.name != name) {
              console.log("toObj.name: ", toObj.name);
              rowCollection[+(toObj.name.slice(1)) - 1] = {
                weight: +weight
              };
              // Maybe we need to set -1 vertex
              // rowCollection[+(toObj.name.slice(1)) - 1] = +weight;
            }
          });

          transformedMatrix.push(rowCollection);
        }
      });
    }

    console.log(transformedMatrix);
    return transformedMatrix;
  }

  getTransformedMatrixFromCanvas(canvasSrv) {
    return this.transformCanvasToMatrix(canvasSrv);
  }


}