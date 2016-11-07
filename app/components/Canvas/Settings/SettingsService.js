import { fabric } from "fabric";

import CanvasService from "../CanvasService.js";


export default class SettingsService {
  constructor() {}

  static shapesCounter = 0
  static lineCounter = 0

  getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  addNewVertex() {
    var canvas = CanvasService.getCanvas();

    window.cs = CanvasService.getCanvas();
    SettingsService.shapesCounter++;

    var circle = new fabric.Circle({
      // left: 100,
      // top: 100,
      strokeWidth: 3,
      radius: 30,
      fill: '#fff',
      stroke: '#666',
      originX: 'center',
      originY: 'center'//,
      // selectable: false
    });

    var text = new fabric.Text(`A${SettingsService.shapesCounter}`, {
      fontSize: 25,
      originX: 'center',
      originY: 'center'//,
      // selectable: false
    });

    var group = new fabric.Group([ circle, text ], {
      left: this.getRandomInt(20, 900),
      // selectable: false,
      top: this.getRandomInt(20, 600),//,
      // selectable: false
      customProps: {
        type: "vertex",
        name: `A${SettingsService.shapesCounter}`
      }
    });

    this.setObjectMigration(group, false);

    canvas.add(group);
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
    let line, text, isDown,
        canvas = CanvasService.getCanvas();
    let x1, y1, x2, y2, vertexFrom, vertexTo, vertexFromLink, vertexToLink;

    canvas.on("mouse:down", function(o){
      // applySelection(false);
      isDown = true;
      var pointer = canvas.getPointer(o.e);

      if (o.target && o.target.type == "group") {
        var points = [ o.target.left + 30, o.target.top + 30, o.target.left + 30, o.target.top + 30 ];
        x1 = o.target.left + 30;
        y1 = o.target.top + 30;
        vertexFrom = o.target.customProps.name;
        vertexFromLink = o.target;
        console.log("mouse:down ", pointer);

        line = new fabric.Line(points, {
          strokeWidth: 5,
          fill: "red",
          stroke: "red",
          originX: "center",
          originY: "center"
        });

        canvas.add(line);
        canvas.sendToBack(line);
      }
    });

    canvas.on("mouse:move", function(o){
      if (!isDown) return;

      var pointer = canvas.getPointer(o.e);
      console.log("mouse:move ", pointer);
      line.set({ x2: pointer.x, y2: pointer.y });
      canvas.renderAll();
      if (o.target && o.target.type == "group") {
        line.set({ x2: o.target.left + 30, y2: o.target.top + 30 });
        x2 = o.target.left + 30;
        y2 = o.target.top + 30;

        canvas.renderAll();
      }
    });

    canvas.on("mouse:up", function(o){
      // applySelection(true);
      isDown = false;

      if (o.target && o.target.type == "group") {
        canvas.remove(line);
        let pathWeight = 0;
        vertexTo = o.target.customProps.name;
        vertexToLink = o.target;

        SettingsService.lineCounter++;

        line = new fabric.Line([x1, y1, x2, y2], {
          strokeWidth: 5,
          fill: "red",
          stroke: "red",
          originX: "center",
          originY: "center"
        });

        text = new fabric.Text(`Line${SettingsService.lineCounter}`, {
          left: ((x1 + x2) / 2),
          top: ((y1 + y2) / 2),
          fontSize: 25,
          originX: 'center',
          originY: 'center'//,
          // selectable: false
        });

        var group = new fabric.Group([ line, text ], {
          //left: x1,
          // selectable: false,
          //top: y1,//,
          // selectable: false
          customProps: {
            type: "line",
            weight: pathWeight,
            vertexFrom: vertexFrom,
            vertexTo: vertexTo,
            vertexFromLink: vertexFromLink,
            vertexToLink: vertexToLink,
            name: `Line${SettingsService.lineCounter}`
          }
        });

        canvas.add(group);
        canvas.sendToBack(group);
        console.log("Custom props for line group: ", group.customProps);

        canvas.renderAll();
      }
      else {
        canvas.remove(line);

        canvas.renderAll();
      }
    });

    function applySelection(selection) {
      canvas._objects.forEach(function(item) {
        item.selectable = selection;
      })
    }
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
    // var line, isDown;
    //
    // canvas.on('mouse:down', function(o){
    //   isDown = true;
    //   var pointer = canvas.getPointer(o.e);
    //   var points = [ pointer.x, pointer.y, pointer.x, pointer.y ];
    //   line = new fabric.Line(points, {
    //     strokeWidth: 5,
    //     fill: 'red',
    //     stroke: 'red',
    //     originX: 'center',
    //     originY: 'center'
    //   });
    //   canvas.add(line);
    // });
    //
    // canvas.on('mouse:move', function(o){
    //   if (!isDown) return;
    //   var pointer = canvas.getPointer(o.e);
    //   line.set({ x2: pointer.x, y2: pointer.y });
    //   canvas.renderAll();
    // });
    //
    // canvas.on('mouse:up', function(o){
    //   isDown = false;
    // });

    // let canvas = CanvasService.getCanvas(),
    //     shapesCollection = canvas._objects;
    //
    // shapesCollection.forEach((item) => {
    //   if (item.customProps && item.customProps.type == "vertex") {
    //     // console.log("Type: ", item._objects[0].type);
    //     // console.log(shapesCollection[i].customProps.type);
    //     canvas.bringToFront(item);
    //   }
    // });
    // for (let i = 0; i < shapesCollection.length; i++) {
    //   // this.setObjectMigration(shapesCollection[i], true);
    //
    //   if (shapesCollection[i].customProps && shapesCollection[i].customProps.type == "vertex") {
    //     console.log("Type: ", shapesCollection[i]._objects[0].type);
    //     console.log(shapesCollection[i].customProps.type);
    //     canvas.bringToFront(shapesCollection[i]);
    //   }
    // }

    let canvas = CanvasService.getCanvas();

    canvas.on("object:moving", (o) => {
      console.log("obj:Moving");

      if (o.target && o.target.type && o.target.type == "group" && o.target.customProps && o.target.customProps.type == "vertex") {
        let left = o.target.left,
            top = o.target.top;

        let lineCollection = [];

        canvas._objects.forEach((item) => {
          let { type, vertexFrom, vertexTo, name } = item.customProps;

          if (type == "line") {
            // if (vertexFrom == o.target.customProps.name || vertexTo == o.target.customProps.name) {
            //   console.log("name of the line(from): ", name);
            //   lineCollection.push(vertexFrom);
            //   lineCollection.push(vertexTo);
            // }

            if (vertexFrom == o.target.customProps.name) {
              console.log("name of the line(from): ", name);
              item.set({ left: (o.target.left + 30), top: (o.target.top + 30)});
              let vertexToX1, vertexToY1;

              // canvas._objects.forEach((item2) => {
              //   if (item2.customProps.type == "vertex" && item2.customProps.name == vertexTo) {
              //     vertexToX1 = item2.left;
              //     vertexToY1 = item2.top;
              //     console.log("vertexToX1: ", vertexToX1, " vertexToY1: ", vertexToY1);
              //   }
              // });
              //
              // item._objects[0].set({ x1: vertexToX1, y1: vertexToY1 });

              // item.set({ left: (o.target.left + 30), top: (o.target.top + 30)});
              // let x2 = item._objects[0].x2, y2 = item._objects[0].y2;
              // let x1 = item._objects[0].x1, y1 = item._objects[0].y1;
              // item._objects[0].set({ x1: (o.target.left + 30), y1: (o.target.top + 30) });
              // item._objects[1].set({ left: ((x1 + x2) / 2), top: ((y1 + y2) / 2) });
              // // item._objects[0].set({ x1: (x1 + 1), y1: (y1 + 1) });
            }
            else if (vertexTo == o.target.customProps.name) {
              console.log("name of the line(to): ", name, item.customProps.vertexToLink);
              let vrtx;

              canvas._objects.forEach((vrtxItem) => {
                if (vrtxItem.customProps.name == vertexFrom && vrtxItem.customProps.type == "vertex") {
                  vrtx = vrtxItem;
                }
              });

              item.set({ left: (o.target.left + 30 - item.width), top: (o.target.top + 30), height: (vrtx.top - o.target.top)});

              // item._objects[0].set({
              //   x1: (item.customProps.vertexFromLink._objects[0].left),
              //   y1: (item.customProps.vertexFromLink._objects[0].top),
              //   x2: (item.customProps.vertexToLink._objects[0].left),
              //   y2: (item.customProps.vertexToLink._objects[0].top)
              // });
              // item._objects[0].set({ x1: (o.target.left + 30), y1: (o.target.top + 30) });
              // item.set({ left: (o.target.left + 30), top: (o.target.top + 30)});
              // let x1 = item._objects[0].x1, y1 = item._objects[0].y1;
              // let x2 = item._objects[0].x2, y2 = item._objects[0].y2;
              // item._objects[0].set({ x2: (o.target.left + 30), y2: (o.target.top + 30) });
              // item._objects[1].set({ left: ((x1 + x2) / 2), top: ((y1 + y2) / 2) });
            }
            canvas.renderAll();
            // item._objects.forEach((item) => {
            //
            // });
          }
        });

        // lineCollection = lineCollection.sort().filter((item, index, self) => {
        //   return self.lastIndexOf(item) == index;
        // });
        //
        // console.log("line collection: ", lineCollection);
        //
        // let vertexCollection = [];
        //
        // canvas._objects.forEach((item) => {
        //   let { type, vertexFrom, vertexTo, name } = item.customProps;
        //
        //   if (type == "vertex" && lineCollection.includes(name)) {
        //     vertexCollection.push({
        //       name: name,
        //       top: item.top,
        //       left: item.left
        //     });
        //   }
        // });
        //
        // console.log("vertex Collection: ", vertexCollection);

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

}
