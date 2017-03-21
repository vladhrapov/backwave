import TransformationService from "./TransformationService";
import _ from 'lodash';

export default class WaveAlgorithmService {
  constructor(startVertex, finishVertex) {
    this.transformationService = new TransformationService();
    this.startVertex = startVertex;
    this.finishVertex = finishVertex;
    this.path = [];
  }

  resetStartVertexColumn() {
    this.matrix.forEach((item, index) => {
      item[this.startVertex] = null;
    });
  }

  resetFinishVertexRow() {
    this.matrix[this.finishVertex].forEach((item, index) => {
      this.matrix[this.finishVertex][index] = null;
    });
  }

  resetVertexColumn(index) {
    this.matrix.forEach((item, i) => {
      item[index] = null;
    });
  }

  resetVertexRow(index) {
    this.matrix[index].forEach((item, columnIndex) => {
      this.matrix[index][columnIndex] = null;
    });
  }

  resetStartingRoutesColumns() {
    this.matrix[this.startVertex].forEach((item, index) => {
      if (item) {
        this.resetVertexColumn(index);
      }
    });
  }

  setStartingRoutes() {
    this.matrix[this.startVertex].forEach((item, index) => {
      if (item) {
        let {
          weight
        } = item;

        this.path.push([{
          name: `A${this.startVertex + 1}`,
          weight: 0,
          index: this.startVertex
        }, {
          name: "A" + (index + 1), // `A${index + 1}`,
          weight,
          index
        }]);
      }
    });
  }

  getLinksCountForVertex(index) {
    return this.matrix[index].filter((rowItem) => !!rowItem).length;
  }

  getNextVertexPathFromPathes(tempPathCollection) {
    let vertexCollection, firstPathLinksCount, firstPathWeight;

    vertexCollection = tempPathCollection
      .sort((prevPath, nextPath) => {
        let {
          linksCount: prevPathLinksCount
        } = prevPath[prevPath.length - 1], {
          linksCount: nextPathLinksCount
        } = nextPath[nextPath.length - 1];

        return prevPathLinksCount - nextPathLinksCount;
      })
      .filter((currentPath, index) => {
        if (!index) firstPathLinksCount = currentPath[currentPath.length - 1].linksCount;

        let {
          linksCount: currentPathLinksCount
        } = currentPath[currentPath.length - 1];

        return firstPathLinksCount == currentPathLinksCount ? true : false;
      });

    if (vertexCollection.length == 1) return vertexCollection[0];

    vertexCollection = vertexCollection
      .sort((prevPath, nextPath) => {
        let {
          weight: prevPathWeight
        } = prevPath[prevPath.length - 1], {
          weight: nextPathWeight
        } = nextPath[nextPath.length - 1];

        return prevPathWeight - nextPathWeight;
      })
      .filter((currentPath, index) => {
        if (!index) firstPathWeight = currentPath[currentPath.length - 1].weight;

        let {
          weight: currentPathWeight
        } = currentPath[currentPath.length - 1];

        return firstPathWeight == currentPathWeight ? true : false;
      });

    if (vertexCollection.length == 1) return vertexCollection[0];

    return vertexCollection
      .sort((prevPath, nextPath) => {
        let {
          index: prevPathIndex
        } = prevPath[prevPath.length - 1], {
          index: nextPathIndex
        } = nextPath[nextPath.length - 1];

        return prevPathIndex - nextPathIndex;
      })[0];
  }

  getLinksCount(tempPath) {
    return tempPath.map((currentPath, i) => {
      let lastIndex = currentPath.length - 1,
        {
          index
        } = currentPath[lastIndex];

      // tempPath[i][currentPath.length - 1].linksCount 
      currentPath[lastIndex].linksCount = this.matrix[index].filter((rowItem) => !!rowItem).length;

      return currentPath;
    });
  }

  getRoutes() {

    this.resetStartVertexColumn();
    this.resetFinishVertexRow();
    this.setStartingRoutes();
    this.resetStartingRoutesColumns();

    this.showMatrix();


    let isAlgorithmNotFinished = true;

    while (!!isAlgorithmNotFinished) {
      let tempPath = _.cloneDeep(this.path.filter((currentPath, index) => {
        return currentPath && !currentPath.hasOwnProperty("isFinished");
      }));


      while (tempPath && tempPath.length) {
        tempPath = this.getLinksCount(tempPath);
        let nextVertex,
          nextVertexPath = this.getNextVertexPathFromPathes(tempPath);

        // if the next vertex could be linked with finish vertex
        this.matrix[nextVertexPath[nextVertexPath.length - 1].index]
          .forEach((rowItem, index) => {
            if (rowItem && this.finishVertex == index) {
              let {
                weight
              } = rowItem;

              nextVertex = {
                weight,
                index,
                name: "A" + (index + 1)
              }
            }
          });

        // if not finish vertex get next vertex by weight
        if (!nextVertex) {
          nextVertex = this.matrix[nextVertexPath[nextVertexPath.length - 1].index]
            .map((rowItem, index) => {
              if (rowItem) {
                let {
                  weight
                } = rowItem;

                return {
                  weight,
                  index,
                  name: "A" + (index + 1)
                };
              }
            })
            .sort((prev, next) => {
              return prev.weight - next.weight;
            });


          nextVertex = nextVertex.filter((rowItem, index) => {
            if (rowItem) return rowItem.weight == nextVertex[0].weight;
          });

          if (nextVertex.length == 1) {
            nextVertex = nextVertex[0];
          } else {
            nextVertex = nextVertex
              .sort((prev, next) => {
                return prev.index - next.index;
              })[0];
          }
        }


        // remove path that we went 
        tempPath = tempPath.filter((currentPath, index) => {
          return currentPath[currentPath.length - 1].index != nextVertexPath[nextVertexPath.length - 1].index;
        });


        if (nextVertex && nextVertex.index) {
          this.path.forEach((currentPath, index) => {
            if (currentPath[currentPath.length - 1].index == nextVertexPath[nextVertexPath.length - 1].index) {
              this.path[index].push({
                name: "A" + (nextVertex.index + 1), // `A${index + 1}`,
                weight: nextVertex.weight,
                index: nextVertex.index
              });

              // this.path[index].isComplete = true;
              if (nextVertex.index == this.finishVertex) this.path[index].isFinished = true;
            }
          });

          if (nextVertex.index != this.finishVertex) this.resetVertexColumn(nextVertex.index);
        } else {
          this.path.forEach((currentPath, index) => {
            if (currentPath[currentPath.length - 1].index == nextVertexPath[nextVertexPath.length - 1].index) {
              this.path[index].isFinished = false;
            }
          });
        }

        // break;
      }



      // currentRowIndex = 0;// should be next vertex index
      // currentRowCount = this.getLinksCountForVertex(currentRowIndex);// should be next vertex links count


      isAlgorithmNotFinished = this.path
        .filter((path, index) => {
          return path && !path.hasOwnProperty("isFinished");
        })
        .length;

      console.log(this.path);
      console.log(this.matrix);
    }

    console.log("==========ALGORITHM FINISHED=======")
    console.log(this.path);
    console.log(this.matrix);

    return this.path;
  }

  showMatrix() {
    console.log(this.matrix);
  }

  invoke(canvasSrv) {
    this.matrix = this.transformationService.getTransformedMatrixFromCanvas(canvasSrv);

    if (!this.matrix || !this.matrix.length) return;
    console.clear();


    return this.getRoutes()
      .filter((route, index) => {
        return route.isFinished;
      });
  }
}