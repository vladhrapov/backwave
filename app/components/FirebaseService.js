import CanvasService from "./Canvas/CanvasService";



export default class FirebaseService {
  constructor() {}

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

  saveCanvasToFirebase(name, collection) {
    collection.push({
      name: name,
      canvasObjects: this.getCanvasObjectsCollection()
    });
  }

  loadCanvasFromFirebase() {
    
  }
}
