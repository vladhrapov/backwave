import { fabric } from "fabric";

import CanvasService from "./CanvasService";
import ShapesService from "./ShapesService";


export default class SettingsService {
  constructor() {
    this.shapesService = new ShapesService();
  }

  static shapesCounter = 0
  static lineCounter = 0

  getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  addNewVertex() {
    let canvas = CanvasService.getCanvas();

    SettingsService.shapesCounter++;

    let vertex = this.shapesService.createVertex({
      left: this.getRandomInt(20, 700),
      top: this.getRandomInt(20, 500),
      name: `A${SettingsService.shapesCounter}`
    });

    this.setObjectMigration(vertex, false);

    canvas.add(vertex);
  }

  removeVertex() {
    var canvas = CanvasService.getCanvas();

    if (canvas.getActiveObject() && canvas.getActiveObject()._objects.length > 1) {
      // // for (let i = 0; i < canvas.getActiveObject()._objects.length; i++) {
      // //   canvas.getActiveObject()._objects[i].remove();
      // // }
      // // canvas.getActiveObject().forEachObject(function(o){ canvas.remove(o) });
      // // canvas.discardActiveGroup().renderAll();
      // // } else {
      // // canvas.remove(canvas.getActiveObject());
      // // }
      // var curSelectedObjects = canvas.getActiveObject();//canvas.getObjects(
      //   canvas.setActiveGroup(curSelectedObjects).remove();//;//);
      //
      //   CanvasService.refreshCanvas();
      //   //canvas.renderAll();
      //   //canvas.clear();
      //   canvas.renderAll.bind(canvas);
      // console.log(curSelectedObjects);
      // console.log(canvas);
      canvas.remove(canvas.getActiveObject());
    }
    else if (canvas.getActiveObject()) {
      canvas.getActiveObject().remove();
    }
    else {
      for (let i = 0; i < canvas.getActiveGroup()._objects.length; i++) {
        canvas.getActiveGroup()._objects[i].remove();
      }
    }
  }

  enableConnectionMode() {
    let x1, y1, x2, y2, vertexFrom, vertexTo,
        line, label, isDown,
        canvas = CanvasService.getCanvas();

    canvas.on("mouse:down", (o) => {
      let pointer = canvas.getPointer(o.e);
      isDown = true;

      if (o.target && o.target.type == "group") {
        x1 = o.target.left + 30;
        y1 = o.target.top + 30;
        vertexFrom = o.target;
        let points = [ x1, y1, x1, y1 ];

        line = this.shapesService.createLine({
          isCustom: false,
          points,
        });

        canvas.add(line);
        canvas.sendToBack(line);
      }
    });

    canvas.on("mouse:move", (o) => {
      if (!isDown) return;
      let pointer = canvas.getPointer(o.e);

      line.set({ x2: pointer.x, y2: pointer.y });
      canvas.renderAll();

      if (o.target && o.target.type == "group") {
        line.set({ x2: o.target.left + 30, y2: o.target.top + 30 });
        x2 = o.target.left + 30;
        y2 = o.target.top + 30;
        canvas.renderAll();
      }
    });

    canvas.on("mouse:up", (o) => {
      isDown = false;

      if (o.target && o.target.type == "group") {
        canvas.remove(line);
        vertexTo = o.target;

        SettingsService.lineCounter++;

        label = this.shapesService.createLabel({
          left: ((x1 + x2) / 2),
          top: ((y1 + y2) / 2),
          name: `Line${SettingsService.lineCounter}`,
          weight: 1
        });

        line = this.shapesService.createLine({
          isCustom: true,
          points: [x1, y1, x2, y2],
          name: `Line${SettingsService.lineCounter}`,
          vertexFromName: vertexFrom.customProps.name,
          vertexFromLink: vertexFrom,
          vertexToName: vertexTo.customProps.name,
          vertexToLink: vertexTo,
          label
        });

        canvas.add(line);
        canvas.add(label);
        canvas.sendToBack(line);

        line.customProps.vertex.from.link.customProps.lines.push(line);
        line.customProps.vertex.to.link.customProps.lines.push(line);

        canvas.renderAll();
      }
      else {
        canvas.remove(line);
        canvas.renderAll();
      }
    });

  }

  disableConnectionMode() {
    let canvas = CanvasService.getCanvas();

    canvas.off("mouse:down");
    canvas.off("mouse:move");
    canvas.off("mouse:up");

    canvas._objects.forEach((item) => {
      this.setObjectMigration(item, false);
    });
  }

  enableMigrationMode() {
    let canvas = CanvasService.getCanvas();

    canvas.on("object:moving", (o) => {
      let { left, top, type, customProps, ...props } = o.target;

      if (type && type == "group" && customProps && customProps.type == "vertex") {

        customProps.lines.forEach((line) => {
          if (line.customProps.vertex.from.name == o.target.customProps.name) {
            line.set({
              x1: (o.target.left + 30),
              y1: (o.target.top + 30)
            });
            line.customProps.label.set({
              left: ((line.x1 + line.x2) / 2),
              top: ((line.y1 + line.y2) / 2),
            });
          }
          else {
            line.set({
              x2: (o.target.left + 30),
              y2: (o.target.top + 30)
            });
            line.customProps.label.set({
              left: ((line.x1 + line.x2) / 2),
              top: ((line.y1 + line.y2) / 2)
            });
          }
        });

        canvas.renderAll();
      }
    });
  }

  disableMigrationMode() {
    CanvasService.getCanvas()._objects.forEach((item) => {
      this.setObjectMigration(item, true);
    });
  }

  setObjectMigration(obj, isEnabled) {
    obj.lockScalingX = obj.lockScalingY = obj.lockRotation = obj.lockMovementX = obj.lockMovementY = isEnabled;
    obj.selectable = !isEnabled;
  }

  showRoutesInfo(routes) {
    return routes.map((path, i) => {
      let pathInfo = {
        vertices: "",
        weight: 0
      };

      path.map((vertex, index) => {
        let { weight, name } = vertex;  

        pathInfo.weight += weight;

        if(index == path.length - 1) {
          pathInfo.vertices += `${name}`;
          pathInfo.reliability = "0." + (this.getRandomInt(10, 30));
          return pathInfo;
        }
        else {
          pathInfo.vertices += `${name} - `;
        }
        
      });

      return pathInfo;
    });
  }

}
