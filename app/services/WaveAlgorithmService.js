import TransformationService from "./TransformationService";

export default class WaveAlgorithmService {
  constructor(startVertex, finishVertex) {
    this.transformationService = new TransformationService();
    this.startVertex = startVertex;
    this.finishVertex = finishVertex;
  }

  /* getRoutes(matrix) {
    let path = "";
    let a, nextVertex,
        currentVertex = this.startVertex,
        currentVertexWeight = Number.POSITIVE_INFINITY;

    while (true) {

      if (!Number.isFinite(nextVertex)) {
        matrix[this.startVertex].forEach((item, index) => {

          if (item && item.weight) {
            if (item.weight < currentVertexWeight) {
              currentVertexWeight = item.weight;
              currentVertex = index;
              nextVertex = index;
            }
          }
        });

        matrix[this.startVertex][currentVertex] = null;
        matrix[currentVertex][this.startVertex] = null;
        path += `A${currentVertex + 1} - `;
      }
      else {
        currentVertexWeight = Number.POSITIVE_INFINITY;

        matrix[nextVertex].forEach((item, index) => {
          if (item && item.weight) {
            if (item.weight < currentVertexWeight) {
              currentVertexWeight = item.weight;
              currentVertex = index;
              nextVertex = index;
            }
          }
        });

        matrix[nextVertex][currentVertex] = null;
        matrix[currentVertex][nextVertex] = null;
        path += `A${currentVertex + 1} - `;
      }

      if (nextVertex == this.finishVertex) {
        break;
      }
      if (a) {
        break;
      }
    }

    console.log("PATH: ", path);
  }
  */

  getRoutes(matrix) {
    let startingRoutes = [],
      completeRoutes = []; //найденные полные пути
    matrix.forEach((item, index) => {
      item[this.startVertex] = null;
    });
    let i = 0; //чтобы пути записывать в массив по порядку
    if (matrix.length == 0) {
      alert('ГДЕ ГРАФ ТО?!');
      return;
    }
    matrix[this.startVertex].forEach((item, index) => {
      let currVertex = index;
      if (item && item.weight) {
        item.name = `A${index + 1}`
        item.index = index;
        item.pow = 0;
        item.pathIndex = i; //запоминаем номер пути в массиве путей
        startingRoutes[i] = {
          "path": [],
          "routeWeight": 0,
          "routeIndex": i
        }; //при удаление из этого массива смещается индекс, поэтому запоминаем (понадобится)
        startingRoutes[i].path.push({
          "name": `A${this.startVertex + 1}`,
          "routeWeight": 0,
          "index": this.startVertex,
          "pow": 0,
          "pathIndex": i
        }, item);
        startingRoutes[i].routeWeight = item.weight;
        i++;
        matrix.forEach((item1) => {
          if (item1[currVertex]) item1[currVertex] = null;
        })
      }
    });


    while (startingRoutes.length > 0) {
      let currentVertices = []; //последние вершины конкретных путей в массиве путей, для которых будем считать степень и от них дальше искать пути


      startingRoutes.forEach((item, index) => {
        let currVertexPow = 0; //степень рассматриваемой вершины
        matrix[item.path[item.path.length - 1].index].forEach((item1, index1) => {
          if (item1 && item1.weight) {
            currVertexPow++;
          }
        })
        startingRoutes[index].path[item.path.length - 1].pow = currVertexPow;
        currentVertices.push(item.path[item.path.length - 1]);
      });

      while (currentVertices.length > 0) //пока не рассмотрены все смежные вершины
      {
        let leastPowVertex = {
          "pow": Number.POSITIVE_INFINITY
        }; //Вершина с найменьшей степенью, которую будем рассматривать
        for (var j = currentVertices.length - 1; j >= 0; j--) { //ищем с найменьшей степенью, начинаем с конца т.к. если одинаковые степени, то выберится с меньшим порядковым номером
          if (leastPowVertex.pow >= currentVertices[j].pow) leastPowVertex = currentVertices[j];
        }

        currentVertices.forEach((item, index) => {
          if (item.index == leastPowVertex.index) currentVertices.splice(index, 1); //вершину рассматриваем, в будущем уже не рассматриваем, поэтому удаляем
        });

        let leastWeightLink = {
          "weight": Number.POSITIVE_INFINITY
        }; //смежная вершина с найменьшей стоимостью
        for (var k = matrix[leastPowVertex.index].length - 1; k >= 0; k--) { //ищем связь с найменьшей стоимостью
          if (matrix[leastPowVertex.index][k] && k == this.finishVertex) //если смежная конечная, то берём её полюбе
          {
            leastWeightLink.index = k;
            leastWeightLink.name = `A${k + 1}`;
            leastWeightLink.pathIndex = leastPowVertex.pathIndex;
            leastWeightLink.pow = 0;
            leastWeightLink.weight = matrix[leastPowVertex.index][k].weight;
            break;
          } else if (matrix[leastPowVertex.index][k] && leastWeightLink.weight >= matrix[leastPowVertex.index][k].weight) { //иначе ищем подходящую
            leastWeightLink.index = k;
            leastWeightLink.name = `A${k + 1}`;
            leastWeightLink.pathIndex = leastPowVertex.pathIndex;
            leastWeightLink.pow = 0;
            leastWeightLink.weight = matrix[leastPowVertex.index][k].weight;
          }
        }


        startingRoutes.forEach((item, index) => {
          if (item.routeIndex == leastWeightLink.pathIndex) {
            startingRoutes[index].path.push(leastWeightLink); //добавляем подходящую вершину в путь
            startingRoutes[index].routeWeight = startingRoutes[index].routeWeight + leastWeightLink.weight;
            return;
          }
        });
        if (leastWeightLink.index == this.finishVertex) //если путь дошёл до конца, то вырезаем и вставляем в массив полных путей
        {
          let indexToDelete = 0;
          startingRoutes.forEach((item, index) => {
            if (item.routeIndex == leastWeightLink.pathIndex) {
              indexToDelete = index;
              return;
            }
          });
          completeRoutes.push(startingRoutes.splice(indexToDelete, 1)); //т.к. путь сформирован - заносим его в "полные пути"
        } else { //если не конечная то удаляем столбик
          matrix.forEach((item) => {
            if (item[leastWeightLink.index]) item[leastWeightLink.index] = null;
          })
        }
      }

    }

    completeRoutes.forEach((item, index) => {
      let path = "";
      item[0].path.forEach((item1, index1) => {
        path += item1.name + '-';
      })
      item.completePath = path;
    });
    console.log("PATH: ", completeRoutes);
  }

  invoke() {
    let matrix = this.transformationService.getTransformedMatrixFromCanvas();

    if (!matrix || !matrix.length) return;

    return this.getRoutes(matrix);
  }
}
