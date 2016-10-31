import { fabric } from "fabric";

import CanvasService from "../CanvasService.js";


export default class SettingsService {
  constructor() {}

  getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  addNewVertex() {
    var canvas = CanvasService.getCanvas();

    window.cs = CanvasService.getCanvas();

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

    var text = new fabric.Text("A" + canvas._objects.length, {
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
        type: "vertex"
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
    var line, isDown;
    var canvas = CanvasService.getCanvas();

    canvas.on('mouse:down', function(o){
      // applySelection(false);
      isDown = true;
      var pointer = canvas.getPointer(o.e);

      if (o.target && o.target.type == "group") {
        var points = [ o.target.left + 30, o.target.top + 30, o.target.left + 30, o.target.top + 30 ];
        console.log("mouse:down ", pointer);

        line = new fabric.Line(points, {
          strokeWidth: 5,
          fill: 'red',
          stroke: 'red',
          originX: 'center',
          originY: 'center'
        });

        canvas.add(line);
        canvas.sendToBack(line);
      }
    });

    canvas.on('mouse:move', function(o){
      if (!isDown) return;

      var pointer = canvas.getPointer(o.e);
      console.log("mouse:move ", pointer);
      line.set({ x2: pointer.x, y2: pointer.y });
      canvas.renderAll();
      if (o.target && o.target.type == "group") {
        line.set({ x2: o.target.left + 30, y2: o.target.top + 30 });

        canvas.renderAll();
      }
    });

    canvas.on('mouse:up', function(o){
      // applySelection(true);
      isDown = false;
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
