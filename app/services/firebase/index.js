import FirebaseSerializer from "./FirebaseSerializer";
import FirebaseDeserializer from "./FirebaseDeserializer";


export default class FirebaseService {
  constructor(shapesService) {
    this.firebaseSerializer = new FirebaseSerializer();
    this.firebaseDeserializer = new FirebaseDeserializer(shapesService);
  }

  getSerializedCanvasObjectsCollection(canvas) {
    return this.firebaseSerializer.getCanvasObjectsCollection(canvas);
  }

  deserializeCanvasObjectsCollection(collection, canvas) {
    this.firebaseDeserializer.restoreCanvas(collection, canvas);
  }
}
