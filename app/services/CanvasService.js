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

    CanvasService.init();

    return this.canvas;
  }

  static loadCanvasList(databaseCollection) {
    return new FirebaseService().loadCanvasListFromFirebase(databaseCollection);
  }

  static loadCanvas(name, databaseCollection) {
    CanvasService.refreshCanvas();
    new FirebaseService().loadCanvasFromFirebase(name, databaseCollection);
    CanvasService.getCanvas().renderAll();
  }

  static saveCanvas(name, databaseCollection) {
    new FirebaseService().saveCanvasToFirebase(name, databaseCollection);
  }

  static refreshCanvas() {
    if (CanvasService.getCanvas()._objects && CanvasService.getCanvas()._objects.length) {
      CanvasService.getCanvas().clear();
    }
  }


  // static refreshCanvas() {
  //   var objects = [];
  //   Array.prototype.forEach.call(this.canvas._objects, (item) => {
  //     objects.push(item);
  //   });
  //   this.canvas.clear();
  //   this.canvas._objects = objects;
  //   this.canvas.renderAll();
  // }

  handleDblClick = (event) => {

  }

  static init() {
    let canvas = CanvasService.getCanvas(),
        that = this;
    console.log("done");

    fabric.util.addListener(CanvasService.getCanvas().upperCanvasEl, 'dblclick', function (event, self) {

      // that.handleDblClick(event);
      console.log(event);
      console.log("fdsfds");
      console.log("DblClick Handled: ", that.canvas.getActiveObject());
      that.canvas.getActiveObject()._objects[0].fill = "green";
    });
  }

}
