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
      height: window.screen.height - 300,
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

}
