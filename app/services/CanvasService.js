import { fabric } from "fabric";
import FirebaseService from "./FirebaseService";

export default class CanvasService {
  constructor() {}

  static getCanvas() {
    if (this.canvas) {
      return this.canvas;
    }

    this.canvas = new fabric.Canvas('canvas', {
      width: window.screen.width - 200,
      height: window.screen.height - 260,
      selectionColor: 'rgba(100, 100, 255, 0.3)',
      backgroundColor: 'white',
      color: "black"
    });

    return this.canvas;
  }

  static loadCanvasList(database) {
    return new FirebaseService().loadCanvasListFromFirebase(database);
  }

  static loadCanvas(name, database) {
    CanvasService.refreshCanvas();
    new FirebaseService().loadCanvasFromFirebase(name, database);
    CanvasService.getCanvas().renderAll();
  }

  static saveCanvas(name, database) {
    new FirebaseService().saveCanvasToFirebase(name, database);
  }

  static removeCanvas(name, database) {
    new FirebaseService().removeCanvasFromFirebase(name, database);
  }

  static refreshCanvas() {
    if (CanvasService.getCanvas()._objects && CanvasService.getCanvas()._objects.length) {
      CanvasService.getCanvas().clear();
    }
  }

  static getShapeTypeGroupCount() {
    let vertexCount = 0,
        lineCount = 0,
        labelCount = 0;

    CanvasService.getCanvas()._objects.forEach((shape) => {
      let { type } = shape.customProps;

      if (type == "vertex") {
        vertexCount++;
      }
      else if (type == "line") {
        lineCount++;
      }
      else if (type == "label") {
        labelCount++;
      }
    });

    return { vertexCount, lineCount, labelCount };
  }

  static getVertexNames() {
    let shapes = CanvasService.getCanvas()._objects;

    if (shapes) {
      return shapes
      .filter((shape) => {
        if (shape.customProps.type == "vertex") return true;
      })
      .map((shape) => {
        return shape.customProps.name;
      });
    }

    return [];
  }

}
