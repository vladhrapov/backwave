export default class FirebaseDeserializer {
  constructor(shapesService) {
    this.shapesService = shapesService
  }

  isItemOfType = (item, type) => {
    return !!(item && item.customProps && item.customProps.type && item.customProps.type == type);
  }

  isVertexLinkedWithLine(linkItem, item) {
    return !!(linkItem.customProps.vertex.from.name == item.customProps.name ||
      linkItem.customProps.vertex.to.name == item.customProps.name)
  }

  restoreVertices(vertices, canvas) {
    vertices.forEach((vertex) => {
      let { left, top } = vertex.helperProps;
      let { name } = vertex.customProps;

      canvas.add(this.shapesService.createVertex({ left, top, name, lines: [] }));
    });

    canvas.shapesCounter = vertices.length;
  }

  restoreLines(lines, canvas) {
    lines.forEach((line) => {
      let { x1, x2, y1, y2 } = line.helperProps;
      let { name, label, vertex } = line.customProps;

      let restoredLine = this.shapesService.createLine({
        isCustom: true,
        points: [x1, y1, x2, y2],
        name,
        vertexFromName: vertex.from.name,
        vertexFromLink: null,
        vertexToName: vertex.to.name,
        vertexToLink: null,
        label: null
      });

      canvas.add(restoredLine);
      canvas.sendToBack(restoredLine);
    });

    canvas.lineCounter = lines.length;
  }

  restoreLabels(labels, canvas) {
    labels.forEach((label) => {
      let { left, top } = label.helperProps;
      let { name, weight } = label.customProps;

      canvas.add(this.shapesService.createLabel({ left, top, name, weight }));
    });
  }

  restoreLinks(canvas) {
    let canvasObjects = canvas._objects;

    canvasObjects.forEach((item) => {
      if (this.isItemOfType(item, "vertex")) {
        canvasObjects.forEach((linkItem) => {
          if (this.isItemOfType(linkItem, "line") && this.isVertexLinkedWithLine(linkItem, item)) {
            item.customProps.lines.push(linkItem);
          }
        });
      } else if (this.isItemOfType(item, "line")) {
        canvasObjects.forEach((linkItem) => {
          if (this.isItemOfType(linkItem, "vertex") && (item.customProps.vertex.from.name == linkItem.customProps.name)) {
            item.customProps.vertex.from.link = linkItem;
          } else if (this.isItemOfType(linkItem, "vertex") && (item.customProps.vertex.to.name == linkItem.customProps.name)) {
            item.customProps.vertex.to.link = linkItem;
          } else if (this.isItemOfType(linkItem, "label") && (item.customProps.name == linkItem.customProps.name)) {
            item.customProps.label = linkItem;
          }
        });
      }
    });
  }

  filterCollectionByType(type, collection) {
    return collection.filter((item) => {
      return this.isItemOfType(item, type);
    });
  }

  restoreCanvas(collection, canvas) {
    if (collection && collection.length) {
      this.restoreVertices(this.filterCollectionByType("vertex", collection), canvas);
      this.restoreLines(this.filterCollectionByType("line", collection), canvas);
      this.restoreLabels(this.filterCollectionByType("label", collection), canvas);
      this.restoreLinks(canvas);
    }
  }
}
