import { fabric } from "fabric";

export default class ShapesService {
  constructor() {}

  createVertex(props) {
    let { left, top, name } = props;

    let circle = new fabric.Circle({
      strokeWidth: 3,
      radius: 30,
      fill: '#fff',
      stroke: '#666',
      originX: 'center',
      originY: 'center'
    });

    let text = new fabric.Text(name, {
      fontSize: 25,
      originX: 'center',
      originY: 'center'
    });

    return new fabric.Group([ circle, text ], {
      left,
      top,
      customProps: {
        type: "vertex",
        name,
        lines: []
      }
    });
  }

  createLabel(props) {
    let { left, top, name, weight } = props;

    return new fabric.Text(name, {
      left,
      top,
      fontSize: 25,
      originX: 'center',
      originY: 'center',
      customProps: {
        type: "label",
        name,
        weight
      }
    });
  }

  createLine(props) {
    let { isCustom } = props;

    if (!isCustom) {
      let { points } = props;

      return new fabric.Line(points, {
        strokeWidth: 5,
        fill: "red",
        stroke: "red",
        originX: "center",
        originY: "center"
      });
    }
    else {
      let {
        points,
        name,
        vertexFromName,
        vertexFromLink,
        vertexToName,
        vertexToLink,
        label
      } = props;

      return new fabric.Line(points, {
        strokeWidth: 5,
        fill: "red",
        stroke: "red",
        originX: "center",
        originY: "center",
        customProps: {
          type: "line",
          name: name,
          vertex: {
            from: {
              name: vertexFromName,
              link: vertexFromLink
            },
            to: {
              name: vertexToName,
              link: vertexToLink
            }
          },
          label
        }
      });
    }
  }

}
