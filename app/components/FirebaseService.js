import CanvasService from "./Canvas/CanvasService";



export default class FirebaseService {
  constructor() {}

  saveCanvas(name, collection) {
    collection.push({
      name: name,
      canvas: CanvasService.getCanvas()
    });
  }
}
