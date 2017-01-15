import { fabric } from "fabric";
import FirebaseService from "./FirebaseService";
import SettingsService from "./SettingsService";

// Constants
import { COLORS } from "../constants/Colors";

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
      SettingsService.shapesCounter = 0;
      SettingsService.lineCounter = 0;
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

  static refreshRoutes() {
    CanvasService.getCanvas()._objects.forEach((shape) => {
      if(shape && shape.customProps.type == "line") {
        shape.fill = "#666";
        shape.stroke = "#666";
        shape.strokeWidth = 2;
      }
    });

    CanvasService.getCanvas().renderAll();
  }

  static drawRoutes(routes) {
    let shapes = CanvasService.getCanvas()._objects;

    if(shapes && shapes.length && routes && routes.length) {
      CanvasService.refreshRoutes();

      routes.forEach((route, i) => {
        let color = COLORS[i];

        route.forEach((vertex, index) => {
          shapes.forEach((shape) => {
            if(shape && shape.customProps) {
              let { type, name } = shape.customProps;

              if(type == "line") {
                  let { from: vertexFrom, to: vertexTo } = shape.customProps.vertex;

                  if(vertexFrom.name == vertex.name && route[index + 1] && vertexTo.name == route[index + 1].name) {
                    shape.fill = color;
                    shape.stroke = color;
                    shape.strokeWidth = 5;
                  }
                  else if(vertexTo.name == vertex.name && route[index + 1] && vertexFrom.name == route[index + 1].name) {
                    shape.fill = color;
                    shape.stroke = color;
                    shape.strokeWidth = 5;
                  }
              }
            }
          }); 
        });
      });
    } 

    CanvasService.getCanvas().renderAll();
  }

}
