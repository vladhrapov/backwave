export default class TrafficGenerator {
  constructor(randomCallback) {
    this.queueCapacity = 10;
    this.packetSize = 100;
    this.random = randomCallback;
  }

  initTrafficQueue(dataTypes) {
    const queue = this.createTrafficFrequencyQueue(dataTypes);

    return this.generateRandomDataTypes(queue);
  }

  updateTrafficQueue(dataTypes, trafficQueue) {
    const first = trafficQueue[0];

    first.amount -= this.packetSize;

    if (first.amount <= 0) {
      const queue = this.createTrafficFrequencyQueue(dataTypes);
      const dataType = this.generateRandomDataType(queue);

      trafficQueue = trafficQueue.slice(1);
      trafficQueue.push(dataType);
    }

    return trafficQueue;
  }

  createTrafficFrequencyQueue(dataTypes = []) {
    const queue = [];

    dataTypes.forEach((dataType) => {
      let frequency = parseInt(dataType.frequency * 10) || 0;
      let dataTypeQueue = new Array(frequency).fill(dataType);

      queue.push(...dataTypeQueue);
    });

    return queue;
  }

  generateRandomDataTypes(queue) {
    const trafficQueue = [];

    for (let i = 0; i < this.queueCapacity; i++) {
      let dataType = this.generateRandomDataType(queue);

      trafficQueue.push(dataType);
    }

    return trafficQueue;
  }

  generateRandomDataType(queue) {
    let dataType = queue[this.random(0, queue.length)];
    let { type, minAmount, maxAmount, color, frequency, priority } = dataType;
    let amount = this.random(+minAmount, +maxAmount);

    return { type, amount, color, frequency, priority };
  }

}