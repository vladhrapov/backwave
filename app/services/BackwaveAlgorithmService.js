import TransformationService from "./TransformationService";
import _ from 'lodash';

export default class BackwaveAlgorithmService {
  constructor(startVertex, finishVertex) {
    this.transformationService = new TransformationService();
    this.startVertex = startVertex;
    this.finishVertex = finishVertex;
    this.path1 = [];
    this.path2 = [];
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

  resetStartingRoutesColumns(startingRouteIndex) {
    this.matrix[startingRouteIndex].forEach((item, index) => {
      if (item) {
        this.resetVertexColumn(index);
      }
    });
  }

  setStartingRoutes(startingRouteIndex, path) {
    this.matrix[startingRouteIndex].forEach((item, index) => {
      if (item) {
        let {
          weight
        } = item;

        path.push([{
          name: `A${startingRouteIndex + 1}`,
          weight: 0,
          index: startingRouteIndex
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

    this.resetVertexColumn(this.startVertex);
    this.resetVertexColumn(this.finishVertex);
    this.setStartingRoutes(this.startVertex, this.path1);
    this.setStartingRoutes(this.finishVertex, this.path2);
    this.resetStartingRoutesColumns(this.startVertex);
    this.resetStartingRoutesColumns(this.finishVertex);

    this.showMatrix();
    // console.log(this.path1);
    // console.log(this.path2);


    let isAlgorithmNotFinished = true;

    while (!!isAlgorithmNotFinished) {
      let tempPath = _.cloneDeep(this.path1.filter((currentPath, index) => {
        return currentPath && !currentPath.hasOwnProperty("isFinished");
      }));


      while (tempPath && tempPath.length) {
        tempPath = this.getLinksCount(tempPath);
        let nextVertex,
          nextVertexPath = this.getNextVertexPathFromPathes(tempPath);

        // this.matrix[nextVertexPath[nextVertexPath.length - 1].index]
        //   .forEach((rowItem, index) => {
        //     if(rowItem && this.finishVertex == index) {
        //       let { weight } = rowItem;

        //       nextVertex = {
        //         weight,
        //         index,
        //         name: "A" + (index + 1)
        //       }
        //     }
        //   });
        this.matrixCopy1[nextVertexPath[nextVertexPath.length - 1].index]
          .forEach((rowItem, index) => {
            if (rowItem) {
              this.path2.forEach((path, i) => {
                if (index == path[path.length - 1].index) {
                  let {
                    weight
                  } = rowItem;

                  nextVertex = {
                    weight,
                    index,
                    name: "A" + (index + 1),
                    linked: true
                  }

                }
              });
            }
          });


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


        tempPath = tempPath.filter((currentPath, index) => {
          return currentPath[currentPath.length - 1].index != nextVertexPath[nextVertexPath.length - 1].index;
        });



        if (nextVertex && nextVertex.index) {
          this.path1.forEach((currentPath, index) => {
            if (currentPath[currentPath.length - 1].index == nextVertexPath[nextVertexPath.length - 1].index) {
              let tempVertexObj = {
                name: "A" + (nextVertex.index + 1), // `A${index + 1}`,
                weight: nextVertex.weight,
                index: nextVertex.index
              };

              this.path1[index].push(tempVertexObj);

              // this.path[index].isComplete = true;
              // if(nextVertex.index == this.finishVertex) this.path1[index].isFinished = true;

              this.path2.forEach((currentPath, ind) => {
                if (currentPath[currentPath.length - 1].index == tempVertexObj.index) {
                  //this.path2[ind].push(tempVertexObj);
                  this.path1[index].isFinished = this.path2[ind].isFinished = true;
                }
              });

              this.resetVertexColumn(nextVertex.index);
              this.matrixCopy1.forEach((item) => {
                item[nextVertex.index] = null;
              });
            }
          });


          // if(nextVertex.index != this.finishVertex) this.resetVertexColumn(nextVertex.index); 
        } else {
          this.path1.forEach((currentPath, index) => {
            if (currentPath[currentPath.length - 1].index == nextVertexPath[nextVertexPath.length - 1].index) {
              this.path1[index].isFinished = false;
            }
          });
        }


        // break;
      }

      tempPath = _.cloneDeep(this.path2.filter((currentPath, index) => {
        return currentPath && !currentPath.hasOwnProperty("isFinished");
      }));

      while (tempPath && tempPath.length) {
        tempPath = this.getLinksCount(tempPath);
        let nextVertex,
          nextVertexPath = this.getNextVertexPathFromPathes(tempPath);

        // this.matrix[nextVertexPath[nextVertexPath.length - 1].index]
        //   .forEach((rowItem, index) => {
        //     if(rowItem && this.finishVertex == index) {
        //       let { weight } = rowItem;

        //       nextVertex = {
        //         weight,
        //         index,
        //         name: "A" + (index + 1)
        //       }
        //     }
        //   });
        this.matrixCopy[nextVertexPath[nextVertexPath.length - 1].index]
          .forEach((rowItem, index) => {
            if (rowItem) {
              this.path1.forEach((path, i) => {
                if (index == path[path.length - 1].index) {
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
            }
          });


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


        tempPath = tempPath.filter((currentPath, index) => {
          return currentPath[currentPath.length - 1].index != nextVertexPath[nextVertexPath.length - 1].index;
        });




        if (nextVertex && nextVertex.index) {
          this.path2.forEach((currentPath, index) => {
            if (currentPath[currentPath.length - 1].index == nextVertexPath[nextVertexPath.length - 1].index) {
              let tempVertexObj = {
                name: "A" + (nextVertex.index + 1), // `A${index + 1}`,
                weight: nextVertex.weight,
                index: nextVertex.index
              };

              this.path2[index].push(tempVertexObj);

              // this.path[index].isComplete = true;
              // if(nextVertex.index == this.finishVertex) this.path2[index].isFinished = true;

              this.path1.forEach((currentPath, ind) => {
                if (currentPath[currentPath.length - 1].index == tempVertexObj.index) {
                  //this.path1[ind].push(tempVertexObj);
                  this.path2[index].isFinished = this.path1[ind].isFinished = true;
                }
              });

              this.resetVertexColumn(nextVertex.index);
              this.matrixCopy.forEach((item) => {
                item[nextVertex.index] = null;
              });
            }
          });

          // if(nextVertex.index != this.finishVertex) this.resetVertexColumn(nextVertex.index); 
        } else {
          this.path2.forEach((currentPath, index) => {
            if (currentPath[currentPath.length - 1].index == nextVertexPath[nextVertexPath.length - 1].index) {
              this.path2[index].isFinished = false;
            }
          });
        }
      }




      isAlgorithmNotFinished = this.path1
        .filter((path, index) => {
          return path && !path.hasOwnProperty("isFinished");
        })
        .length &&
        this.path2
          .filter((path, index) => {
            return path && !path.hasOwnProperty("isFinished");
          })
          .length;

      // isAlgorithmNotFinished = false;
      // console.log(this.path1);
      // console.log(this.path2);
      // console.log(this.matrix);
    }

    console.log("==========ALGORITHM FINISHED=======")
    console.log(this.path1);
    console.log(this.path2);
    // console.log(this.matrix);
    console.log(this.concatRoutes());

    return this.concatRoutes();
  }

  showMatrix() {
    console.log(this.matrix);
  }

  concatRoutes() {
    return this.path1.map((path1CurrentRoute, path1CurrentIndex) => {
      let linkedRoute = this.path2
        .filter((path2CurrentRoute, path2CurrentIndex) => {
          return path1CurrentRoute[path1CurrentRoute.length - 1].index == path2CurrentRoute[path2CurrentRoute.length - 1].index;
        })[0];

      if (linkedRoute) {
        let fullRoute = _.cloneDeep(path1CurrentRoute);

        fullRoute[fullRoute.length - 1].isCenter = true;

        for (let i = linkedRoute.length - 2; i >= 0; i--) {
          fullRoute.push(linkedRoute[i]);
        }

        return fullRoute;
      }

    });
  }

  cutPath1Routes() {
    let hasLink = false;

    this.path1.forEach((routePath1, routePath1Index) => {
      for (let vertexIndex in routePath1) {

        this.path2.forEach((routePath2) => {
          routePath2 = routePath2.reverse();

          for (let vrtxIndex in routePath2) {
            console.log("FROM: ", routePath1[vertexIndex].name, " TO: ", routePath2[vrtxIndex].name);

            if (routePath1[vertexIndex] &&
              routePath1[vertexIndex].index &&
              routePath2[vrtxIndex] &&
              routePath2[vrtxIndex].index) {
              hasLink = !!this.matrixCopy[routePath1[vertexIndex].index][routePath2[vrtxIndex].index];
            }
            // .filter((mtrxRowItem, mrtxIndex) => {
            //   if(mtrxRowItem && mrtxIndex == vrtxIndex) {
            //     return mtrxRowItem;
            //   }
            // }).length;

            if (!!hasLink) {
              console.log("TRUE: ", this.path1[routePath1Index], " from: ", 0, " to: ", +vertexIndex + 1);
              this.path1[routePath1Index] = this.path1[routePath1Index].slice(0, +vertexIndex + 1);
              break;
            }


          }

        });

        console.log("-------------PATH2 DONE----------", );
        if (!!hasLink) break;
      }

      console.log("=========PATH1 DONE=========", );
      hasLink = false;
    });

    console.log("CONCAT PATH1: ", this.path1);
  }

  cutPath2Routes() {

  }

  invoke(canvasSrv) {
    this.matrix = this.transformationService.getTransformedMatrixFromCanvas(canvasSrv);
    this.matrixCopy1 = _.cloneDeep(this.matrix);
    this.matrixCopy = _.cloneDeep(this.matrix);

    if (!this.matrix || !this.matrix.length) return;
    console.clear();


    return this.getRoutes()
      .filter(route => !!route)
      .map((route, index) => ({ path: route, index }));
  }
}