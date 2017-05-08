export default class FirebaseSerializer {
  constructor() { }

  getVertexPropsForSerialization(vertex) {
    const { top, left } = vertex;
    const { name, type, lines } = vertex.customProps;

    lines.forEach((line, index) => {
      lines[index] = line.customProps.name
    });

    return {
      customProps: { name, type, lines },
      helperProps: { top, left }
    };
  }

  getLinePropsForSerialization(line) {
    const { x1, x2, y1, y2 } = line;
    let { label, name, type, vertex } = line.customProps;

    label = label.customProps.name;
    vertex.from.link = vertex.to.link = null;

    return {
      customProps: { label, name, type, vertex },
      helperProps: { x1, x2, y1, y2 }
    };
  }

  getLabelPropsForSerialization(label) {
    const { top, left } = label;
    const { name, type, weight } = label.customProps;

    return {
      customProps: { name, type, weight },
      helperProps: { top, left }
    };
  }

  getSerializedObjectByType(type, serializedObject) {
    switch (type) {
      case "vertex":
        return this.getVertexPropsForSerialization(serializedObject);
      case "line":
        return this.getLinePropsForSerialization(serializedObject);
      case "label":
        return this.getLabelPropsForSerialization(serializedObject);
      default:
        throw new Error("Not supported type of object!");
    }
  }

  getCanvasObjectsCollection(canvas) {
    let canvasObjectsCollection = [];

    canvas._objects.forEach((serializedObject) => {
      let { type } = serializedObject.customProps;

      canvasObjectsCollection.push(this.getSerializedObjectByType(type, serializedObject));
    });

    return canvasObjectsCollection;
  }
}