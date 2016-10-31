import { fabric } from "fabric";

export default class BaseCanvas {
  constructor() {

  }

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

    BaseCanvas.init();

    return this.canvas;
  }

  static refreshCanvas() {
    var objects = [];
    Array.prototype.forEach.call(this.canvas._objects, (item) => {
      objects.push(item);
    });
    this.canvas.clear();
    this.canvas._objects = objects;
    this.canvas.renderAll();
  }

  handleDblClick = (event) => {

  }

  static init() {
    let canvas = BaseCanvas.getCanvas(),
        that = this;
    console.log("done");

    fabric.util.addListener(BaseCanvas.getCanvas().upperCanvasEl, 'dblclick', function (event, self) {

      // that.handleDblClick(event);
      console.log(event);
      console.log("fdsfds");
      console.log("DblClick Handled: ", that.canvas.getActiveObject());
      that.canvas.getActiveObject()._objects[0].fill = "green";
    });
  }

}
