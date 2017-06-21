import { fabric } from "fabric";
import _ from 'lodash';
import FirebaseService from "./firebase";
import ShapesService from "./ShapesService";
import WaveAlgorithmService from "./WaveAlgorithmService";
import BackwaveAlgorithmService from "./BackwaveAlgorithmService";
import { TrafficSimulationService, TrafficGenerator } from "./traffic";
import { ChartsMapper } from "./charts";

// Constants
import { COLORS } from "../constants/Colors";
import { firebaseRef } from "../constants/FirebaseConfig";


export default class CanvasService {
  constructor() {
    this.shapesService = new ShapesService();
    this.simulationService = new TrafficSimulationService();
    this.firebaseService = new FirebaseService(this.shapesService);
    this.trafficGenerator = new TrafficGenerator(this.getRandomInt);
  }

  get canvas() {
    if (this._canvas) {
      return this._canvas;
    }

    this._canvas = new fabric.Canvas('canvas', {
      width: window.screen.width - 200,
      height: window.screen.height - 260,
      selectionColor: 'rgba(100, 100, 255, 0.3)',
      backgroundColor: 'white',
      color: "black",
      shapesCounter: 0,
      lineCounter: 0,
      packetCounter: 0
    });

    window.cnvs = this.canvas;

    return this._canvas;
    // return CanvasService.canvas;
  }

  get isCanvasEmpty() {
    return this.canvas._objects && this.canvas._objects.length;
  }

  renderAll() {
    this.canvas.renderAll();
  }

  refreshCanvas() {
    if (this.canvas._objects && this.canvas._objects.length) {
      this.canvas.clear();
      this.canvas.shapesCounter = 0;
      this.canvas.lineCounter = 0;
    }
  }

  reinitCanvas() {
    this._canvas = null;
    this.canvas.shapesCounter = 0;
    this.canvas.lineCounter = 0;
  }

  restoreCanvas(collection, needsReinit = false) {
    if (needsReinit) {
      this.reinitCanvas();
    }
    else {
      this.refreshCanvas();
    }
    this.firebaseService.deserializeCanvasObjectsCollection(collection, this.canvas);
    this.renderAll();
  }

  getSerializedCanvasObjectsCollection() {
    return this.firebaseService.getSerializedCanvasObjectsCollection(this.canvas);
  }

  getShapeTypeGroupCount() {
    let vertexCount = 0,
      lineCount = 0,
      labelCount = 0;

    this.canvas._objects.forEach((shape) => {
      let {
        type
      } = shape.customProps;

      if (type == "vertex") {
        vertexCount++;
      } else if (type == "line") {
        lineCount++;
      } else if (type == "label") {
        labelCount++;
      }
    });

    return {
      vertexCount,
      lineCount,
      labelCount
    };
  }

  getVertexNames() {
    let shapes = this.canvas._objects;

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

  initRouting({ vertexFrom, vertexTo, settings, loggerActions }) {
    const { algorithmType } = settings;
    let algorithmService, algorithm, result;

    if (algorithmType === 1) {
      algorithmService = new WaveAlgorithmService(vertexFrom - 1, vertexTo - 1);
      algorithm = "wave";
    }
    else if (algorithmType === 2) {
      algorithmService = new BackwaveAlgorithmService(vertexFrom - 1, vertexTo - 1);
      algorithm = "backwave";
    }

    result = algorithmService.invoke(this);
    this.drawRoutes(result, vertexFrom, vertexTo);

    loggerActions.logRoutesInfo({
      algorithm,
      vertexFrom: vertexFrom,
      vertexTo: vertexTo,
      routes: result
    });
  }


  refreshRoutes() {
    this.canvas._objects.forEach((shape) => {
      if (shape && shape.customProps.type == "line") {
        shape.fill = "#666";
        shape.stroke = "#666";
        shape.strokeWidth = 2;
      } else if (shape && shape.customProps.type == "vertex") {
        shape.fill = '#fff';
      }
    });

    this.renderAll();
  }


  drawRoutes(routes, startVertex, finishVertex) {
    let shapes = this.canvas._objects;

    if (shapes && shapes.length && routes && routes.length) {
      this.refreshRoutes();

      routes.forEach((route, i) => {
        let color = COLORS[i];

        route.path.forEach((vertex, index) => {
          shapes.forEach((shape) => {
            if (shape && shape.customProps) {
              let {
                type,
                name
              } = shape.customProps;

              if (type == "line") {
                let {
                  from: vertexFrom,
                  to: vertexTo
                } = shape.customProps.vertex;

                if (vertexFrom.name == vertex.name && route.path[index + 1] && vertexTo.name == route.path[index + 1].name) {
                  if (!route.safety) {
                    shape.fill = color;
                    shape.stroke = color;
                  }
                  else {
                    if (route.isSafe) {
                      shape.fill = "green";
                      shape.stroke = "green";
                    }
                    else {
                      shape.fill = "red";
                      shape.stroke = "red";
                    }
                  }

                  shape.strokeWidth = 5;
                } else if (vertexTo.name == vertex.name && route.path[index + 1] && vertexFrom.name == route.path[index + 1].name) {
                  if (!route.safety) {
                    shape.fill = color;
                    shape.stroke = color;
                  }
                  else {
                    if (route.isSafe) {
                      shape.fill = "green";
                      shape.stroke = "green";
                    }
                    else {
                      shape.fill = "red";
                      shape.stroke = "red";
                    }
                  }
                  // shape.fill = color;
                  // shape.stroke = color;
                  shape.strokeWidth = 5;
                }
              }

              if (type == "vertex") {
                if (name == `A${startVertex}`) {
                  // shape._objects[0].fill = "#372";
                  // shape._objects[1].fill = "#372";
                  shape.set("fill", "rgb(27, 146, 42)"); //.fill = "#372";
                  shape._objects[1].fill = "#fff";
                  // this.canvas.bringToFront(shape);
                } else if (name == `A${finishVertex}`) {
                  shape.set("fill", "#234eae"); //.fill = "#372";
                  shape._objects[1].fill = "#fff";
                } else {
                  shape.set("fill", "#fff");
                  shape._objects[1].fill = "#000";
                }


              }

            }
          });
        });
      });

      let linkedPoints = routes.map((route) => {
        return route.path.filter(vertex => !!vertex.isCenter)[0];
      });

      if (!!linkedPoints && linkedPoints.filter(vertex => !!vertex).length) {
        // a81d31
        shapes.forEach((shape) => {
          if (shape && shape.customProps) {
            let {
              type,
              name
            } = shape.customProps;

            if (type == "vertex") {
              let linkedPoint = linkedPoints.filter(vertex => vertex.name == name)[0];

              if (linkedPoint && name == linkedPoint.name) {
                shape.set("fill", "rgb(167, 10, 219)"); //.fill = "#372";
                shape._objects[1].fill = "#fff";
              }
            }
          }
        });
      }
    }

    this.renderAll();
  }


  getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  addNewVertex(canvas) {
    this.canvas.shapesCounter++;

    let vertex = this.shapesService.createVertex({
      left: this.getRandomInt(20, 700),
      top: this.getRandomInt(20, 500),
      name: `A${this.canvas.shapesCounter}`
    });

    this.setObjectMigration(vertex, false);

    canvas.add(vertex);
  }

  doNextIteration(packetsInfo, routesInfo, dataType, distributionAlgorithm, changesFrequency) {
    // const { vertexFrom, vertexTo } = props;
    const { packetCounter } = this.canvas;

    if (packetCounter % changesFrequency === 0) {
      this.updateVertexCharacteristics();
    }

    let updatedRoutes = this.updateRouteCharacteristics(_.cloneDeep(routesInfo), distributionAlgorithm);

    // Step 1: move existing packets to the next vertices.
    // should be a call of traffic simulation service with packets param
    let iterationResult = this.simulationService.doNextIteration({
      packetsInfo: [...packetsInfo],
      routesInfo: updatedRoutes,
      packetCounter,
      distributionAlgorithm,
      dataType
    });

    this.canvas._objects
      .filter(shape => shape.customProps.type === "vertex")
      .forEach(vertex => {
        let { name, safety } = vertex.customProps;

        if (iterationResult.packets.length) {
          iterationResult.packets.forEach((packet, index) => {
            if (packet.currentVertex.name == name) {
              if (!iterationResult.packets[index].characteristics) {
                iterationResult.packets[index].characteristics = [];
              }
              else {
                iterationResult.packets[index].characteristics = _.cloneDeep(iterationResult.packets[index].characteristics.concat(safety));
              }
            }
          });
        }
      });

    let { packets } = iterationResult;
    updatedRoutes = iterationResult.updatedRoutes;
    console.log("CanvasService - doNextIteration: ", packets);
    // last one will be that needs to be added
    this.updatePacketsCharacteristics(packets);
    this.updatePacketsLocation(packets);
    this.refreshPacketsOnCanvas(packets);

    // Step 2: add new packet to the start vertex
    // this will be on canvas
    this.addPacket({
      vertexFrom: routesInfo.vertexFrom,
      packetIndex: packetCounter,
      color: dataType.color
    });

    updatedRoutes = this.updateRouteCharacteristics(updatedRoutes);

    this.canvas.packetCounter += 1;

    return {
      packets,
      updatedRoutes
    };
  }

  updateVertexCharacteristics() {
    this.canvas._objects.forEach((shape, key) => {
      let { type } = shape.customProps;

      if (type == "vertex") {
        if (key % 3 == 0) {
          shape.customProps.safety = this.getRandomInt(90, 100) / 100;
        }
        else if (key % 2 == 0) {
          shape.customProps.safety = this.getRandomInt(97, 100) / 100;
        }
        else {
          shape.customProps.safety = this.getRandomInt(99, 100) / 100;
        }
      }
    });
  }

  updateRouteCharacteristics(routesInfo, distributionAlgorithm) {
    console.log("routesInfo: ", routesInfo);
    const vertices = this.canvas._objects.filter(shape => shape.customProps.type === "vertex");

    routesInfo.routes.forEach((route, index) => {

      const sum = route.path.reduce((sum, nextVertex) => {
        console.log(nextVertex);
        let safety = vertices.filter(vertex => vertex.customProps.name === nextVertex.name)[0].customProps.safety;

        return sum * safety;
      }, 1);

      routesInfo.routes[index].safety = sum;
      routesInfo.routes[index].isSafe = sum > 0.75 ? true : false;
      routesInfo.routes[index].capacity = routesInfo.routes[index].capacity || 1000;
      routesInfo.routes[index].maxCapacity = 1000;
      if (distributionAlgorithm) {
        if (!routesInfo.routes[index].characteristics) {
          routesInfo.routes[index].characteristics = [];
        }
        else {
          routesInfo.routes[index].characteristics.push({
            safety: sum,
            isSafe: sum > 0.75 ? true : false,
            capacity: routesInfo.routes[index].capacity || 1000,
            distributionAlgorithm
          });
        }

      }
    });

    console.log(routesInfo);

    return routesInfo;
  }

  updatePacketsCharacteristics(packets) {
    this.canvas._objects.forEach((shape) => {
      let { type, name } = shape.customProps;

      if (type == "packet") {
        let packet = packets
          .filter(packet => packet.name == name)[0];

        if (packet) {
          shape.customProps.relatedVertex = packet.currentVertex.name;
        }
      }
    });
  }

  updatePacketsLocation(packets) {
    let vertices = this.canvas._objects
      .filter(shape => shape.customProps.type == "vertex");

    this.canvas._objects
      .filter(shape => shape.customProps.type == "packet")
      .forEach(packet => {
        let { relatedVertex } = packet.customProps;

        vertices.forEach(vertex => {
          let { name } = vertex.customProps;

          if (name == relatedVertex) {
            packet.left = vertex.left + 50;
            packet.top = vertex.top - 20;
          }
        });
      });
  }

  addPacket({ vertexFrom, packetIndex, color }) {
    const vertexName = `A${vertexFrom}`;
    const vertex = this.getVertexByName(vertexName);
    const packet = this.shapesService.createPacket({
      left: vertex.left + 50,
      top: vertex.top - 20,
      name: `Packet_${packetIndex}`,
      relatedVertex: vertexName,
      fill: color,
      stroke: "#000"
    });

    this.setObjectMigration(packet, false);

    this.canvas.add(packet);
    this.canvas.sendToBack(packet);
    // should be call for iteration through
    // all lines and labels and send them to back
    this.setShapesTypeToBack("label");
    this.setShapesTypeToBack("line");
  }

  refreshPacketsOnCanvas(packets) {
    this.canvas._objects = this.canvas._objects
      .filter((shape, index) => {
        let { type, name } = shape.customProps;
        let packet = packets.filter(packet => packet.name == name)[0];

        if (type != "packet" || (type == "packet" && !!packet)) {
          return shape;
        }
      });

    this.renderAll();
  }

  setShapesTypeToBack(shapeType) {
    this.canvas._objects.forEach(shape => {
      let { type, name } = shape.customProps;

      if (type == shapeType) {
        this.canvas.sendToBack(shape);
      }
    });

    this.renderAll();
  }

  getVertexByName(vertexName) {
    return this.canvas._objects.filter(shape => {
      let { type, name } = shape.customProps;

      if (type == "vertex" && name == vertexName) {
        return shape;
      }
    })[0];
  }

  removeVertex(canvas) {
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
    } else if (canvas.getActiveObject()) {
      canvas.getActiveObject().remove();
    } else {
      for (let i = 0; i < canvas.getActiveGroup()._objects.length; i++) {
        canvas.getActiveGroup()._objects[i].remove();
      }
    }
  }

  enableConnectionMode() {
    let x1, y1, x2, y2, vertexFrom, vertexTo,
      line, label, isDown;
    let { canvas } = this;

    canvas.on("mouse:down", (o) => {
      let pointer = canvas.getPointer(o.e);
      isDown = true;

      if (o.target && o.target.type == "group") {
        x1 = o.target.left + 30;
        y1 = o.target.top + 30;
        vertexFrom = o.target;
        let points = [x1, y1, x1, y1];

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

      line.set({
        x2: pointer.x,
        y2: pointer.y
      });
      canvas.renderAll();

      if (o.target && o.target.type == "group") {
        line.set({
          x2: o.target.left + 30,
          y2: o.target.top + 30
        });
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

        this.canvas.lineCounter++;

        label = this.shapesService.createLabel({
          left: ((x1 + x2) / 2),
          top: ((y1 + y2) / 2),
          name: `Line${this.canvas.lineCounter}`,
          weight: 1
        });

        line = this.shapesService.createLine({
          isCustom: true,
          points: [x1, y1, x2, y2],
          name: `Line${this.canvas.lineCounter}`,
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
      } else {
        canvas.remove(line);
        canvas.renderAll();
      }
    });

  }

  disableConnectionMode() {
    this.canvas.off("mouse:down");
    this.canvas.off("mouse:move");
    this.canvas.off("mouse:up");

    this.canvas._objects.forEach((item) => {
      this.setObjectMigration(item, false);
    });
  }

  enableMigrationMode() {
    let { canvas } = this;
    canvas.on("object:moving", (o) => {
      let {
        left,
        top,
        type,
        customProps,
        ...props
      } = o.target;

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
          } else {
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
    let { canvas } = this;
    this.canvas._objects.forEach((item) => {
      this.setObjectMigration(item, true);
    });
  }

  setObjectMigration(obj, isEnabled) {
    obj.lockScalingX = obj.lockScalingY = obj.lockRotation = obj.lockMovementX = obj.lockMovementY = isEnabled;
    obj.selectable = !isEnabled;
  }

  // showRoutesInfo(routes) {
  //   return routes.map((path, i) => {
  //     let pathInfo = {
  //       vertices: "",
  //       weight: 0
  //     };

  //     path.map((vertex, index) => {
  //       let {
  //         weight,
  //         name
  //       } = vertex;

  //       pathInfo.weight += weight;

  //       if (index == path.length - 1) {
  //         pathInfo.vertices += `${name}`;
  //         pathInfo.reliability = "0." + (this.getRandomInt(10, 30));
  //         return pathInfo;
  //       } else {
  //         pathInfo.vertices += `${name} - `;
  //       }

  //     });

  //     return pathInfo;
  //   });
  // }

  updateTrafficQueue(dataTypes, trafficQueue) {
    if (trafficQueue && trafficQueue.length) {
      return this.trafficGenerator.updateTrafficQueue(dataTypes, _.cloneDeep(trafficQueue));
    }

    return this.trafficGenerator.initTrafficQueue(dataTypes);
  }

  mapCharts(logger) {
    return new ChartsMapper(logger, this.getRandomInt).mapping;
  }

}