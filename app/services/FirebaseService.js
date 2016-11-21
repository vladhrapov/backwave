import CanvasService from "./CanvasService";
import ShapesService from "./ShapesService";


export default class FirebaseService {
  constructor() {
    this.shapesService = new ShapesService();
  }

  getVertexPropsForSerialization(vertex) {
    let { top, left } = vertex,
        { name, type, lines } = vertex.customProps;

    lines.forEach((line, index) => {
      lines[index] = line.customProps.name
    });

    return {
      customProps: {
        name, type, lines
      },
      helperProps: {
        top, left
      }
    };
  }

  getLinePropsForSerialization(line) {
    let { x1, x2, y1, y2 } = line,
        { label, name, type, vertex } = line.customProps;

    label = label.customProps.name;
    vertex.from.link = vertex.to.link = null;

    return {
      customProps: {
        label, name, type, vertex
      },
      helperProps: {
        x1, x2, y1, y2
      }
    };
  }

  getLabelPropsForSerialization(label) {
    let { top, left } = label,
        { name, type } = label.customProps;

    return {
      customProps: {
        name, type
      },
      helperProps: {
        top, left
      }
    };
  }

  getSerializedObjectByType(type, serializedObject) {
    switch (type) {
      case "vertex":
        return this.getVertexPropsForSerialization(serializedObject);
        break;
      case "line":
        return this.getLinePropsForSerialization(serializedObject);
        break;
      case "label":
        return this.getLabelPropsForSerialization(serializedObject);
        break;
      default:
        throw new Error("Not supported type of object!");
        break;
    }
  }

  getCanvasObjectsCollection() {
    let canvas = CanvasService.getCanvas(),
        canvasObjectsCollection = [];

    canvas._objects.forEach((serializedObject) => {
      let { type } = serializedObject.customProps;

      canvasObjectsCollection.push(this.getSerializedObjectByType(type, serializedObject));
    });

    return canvasObjectsCollection;
  }

  saveCanvasToFirebase(name, databaseCollection) {
    console.log(databaseCollection);
    databaseCollection.child(name).set({
      name: name,
      canvasObjects: this.getCanvasObjectsCollection()
    });
  }

  restoreVertices(vertices) {
    console.log(vertices);

    vertices.forEach((vertex) => {
      let { left, top } = vertex.helperProps,
          { name } = vertex.customProps;

      CanvasService.getCanvas().add(
        this.shapesService.createVertex({ left, top, name, lines: [] })
      );
    });
  }

  restoreLines(lines) {
    console.log(lines);
    lines.forEach((line) => {
      let { x1, x2, y1, y2 } = line.helperProps,
          { name, label, vertex } = line.customProps;

      CanvasService.getCanvas().add(
        this.shapesService.createLine({
          isCustom: true,
          points: [x1, y1, x2, y2],
          name,
          vertexFromName: vertex.from.name,
          vertexFromLink: null,
          vertexToName: vertex.to.name,
          vertexToLink: null,
          label: null
        })
      );
    });
  }

  restoreLabels(labels) {
    console.log(labels);

    labels.forEach((label) => {
      let { left, top } = label.helperProps,
          { name } = label.customProps;

      CanvasService.getCanvas().add(
        this.shapesService.createLabel({ left, top, name })
      );
    });
  }

  restoreLinks() {
    let canvasObjects = CanvasService.getCanvas()._objects;

    canvasObjects.forEach((item) => {
      if (item && item.customProps && item.customProps.type == "vertex") {
        canvasObjects.forEach((linkItem) => {
          if (linkItem && linkItem.customProps && linkItem.customProps.type == "line"
          && (linkItem.customProps.vertex.from.name == item.customProps.name
            || linkItem.customProps.vertex.to.name == item.customProps.name)) {
            item.customProps.lines.push(linkItem);
          }
        });
      }
      else if (item && item.customProps && item.customProps.type == "line") {
        canvasObjects.forEach((linkItem) => {
          if (linkItem && linkItem.customProps && linkItem.customProps.type == "vertex"
          && (item.customProps.vertex.from.name == linkItem.customProps.name)) {
            item.customProps.vertex.from.link = linkItem;
          }
          else if (linkItem && linkItem.customProps && linkItem.customProps.type == "vertex"
          && (item.customProps.vertex.to.name == linkItem.customProps.name)) {
            item.customProps.vertex.to.link = linkItem;
          }
          else if (linkItem && linkItem.customProps && linkItem.customProps.type == "label"
          && (item.customProps.name == linkItem.customProps.name)) {
            item.customProps.label = linkItem;
          }

        });
      }
    });
  }

  filterCollectionByType(type, collection) {
    return collection.filter((item) => {
      return item
        && item.customProps
        && item.customProps.type
        && item.customProps.type == type;
    });
  }

  loadCanvasFromFirebase(name, databaseCollection) {
    databaseCollection.once("value").then((data) => {
      console.log(data.child(name + "/canvasObjects").val());
      console.log(data.child(name + "/name").val());
      let canvasObjects = data.child(name + "/canvasObjects").val();
      let canvasName = data.child(name + "/name").val();

      this.restoreVertices(this.filterCollectionByType("vertex", canvasObjects));
      this.restoreLines(this.filterCollectionByType("line", canvasObjects));
      this.restoreLabels(this.filterCollectionByType("label", canvasObjects));

      this.restoreLinks();

      console.log("CANVAS: ", CanvasService.getCanvas()._objects);
      // data.forEach((item) => {
      //   console.log(item);
      // });
    });
  }
}
