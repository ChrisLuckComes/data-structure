import Queue from "./queue.mjs";
import { Stack } from "./stack.mjs";

/**
 * @desc 图是网络结构的抽象模型，是一组由边连接的顶点，图G=(V,E)。
 * V：一组顶点
 * E: 一组边，连接V中的顶点
 * 相邻顶点：由一条边连在一起的顶点
 * 度：一个顶点相邻节点的数量
 * 路径：顶点的一个连续序列
 * 可以用邻接矩阵和邻接表来表示图，以下代码使用邻接表。
 */
export class Graph {
  isDirected = false;
  vertices = []; //顶点列表
  adjList = new Map(); //邻接表
  constructor(isDirected = false) {
    this.isDirected = isDirected;
  }

  /**
   * @desc 添加顶点，设置该键的字典值为空数组
   * @param {*} v 顶点
   */
  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }

  /**
   * @desc 添加边。接收两个需要建立连接的顶点，顶点在图中不存在时添加到顶点列表中
   * @param {*} v
   * @param {*} w
   */
  addEdge(v, w) {
    if (!this.adjList.get(v)) {
      this.addVertex(v);
    }
    if (!this.adjList.get(w)) {
      this.addVertex(w);
    }
    this.adjList.get(v).push(w);
    if (!this.isDirected) {
      this.adjList.get(w).push(v);
    }
  }

  getVertices() {
    return this.vertices;
  }

  getAdjList() {
    return this.adjList;
  }

  toString() {
    let s = "";
    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `;
      const neighbors = this.adjList.get(this.vertices[i]);
      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]} `;
      }
      s += "\n";
    }
    return s;
  }
}

/**
 * 遍历算法的辅助枚举值和初始化函数，将所有顶点标记为未访问。
 */
const Colors = {
    WHITE: 0,
    GREY: 1,
    BLACK: 2
  },
  initalizeColor = (vertices) => {
    let color = {};
    for (let i = 0; i < vertices.length; i++) {
      color[vertices[i]] = Colors.WHITE;
    }
    return color;
  };

const graph = new Graph(),
  myVerices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

myVerices.forEach((v) => graph.addVertex(v));
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");

// console.log(graph.toString());

/**
 * @desc 广度优先搜索。先宽后深地访问顶点
 * @param {*} graph
 * @param {*} startVertex
 * @param {*} callback
 */
function breadthFirstSearch(graph, startVertex, callback) {
  const vertices = graph.getVertices(),
    adjList = graph.getAdjList(),
    color = initalizeColor(vertices),
    queue = new Queue();

  queue.enqueue(startVertex);

  while (!queue.isEmpty()) {
    const u = queue.dequeue(),
      neighbors = adjList.get(u);

    color[u] = Colors.GREY;

    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GREY;
        queue.enqueue(w);
      }
    }

    color[u] = Colors.BLACK;
    if (callback) {
      callback(u);
    }
  }
}

function BFS(graph, startVertex) {
  const vertices = graph.getVertices(),
    adjList = graph.getAdjList(),
    color = initalizeColor(vertices),
    queue = new Queue(),
    distances = {}, //两点之间的距离
    predecessors = {}; //前溯点

  queue.enqueue(startVertex);

  for (let i = 0; i < vertices.length; i++) {
    distances[vertices[i]] = 0;
    predecessors[vertices[i]] = null;
  }

  while (!queue.isEmpty()) {
    const u = queue.dequeue(),
      neighbors = adjList.get(u);

    color[u] = Colors.GREY;
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GREY;
        distances[w] = distances[u] + 1;
        predecessors[w] = u;
        queue.enqueue(w);
      }
    }
    color[u] = Colors.BLACK;
  }

  return {
    distances,
    predecessors
  };
}
const print = (value) => console.log(`Visited vertex: ${value}`);
// breadthFirstSearch(graph, myVerices[0], print);

// const shortestPathA = BFS(graph, myVerices[0]);

// const fromVertex = myVerices[0];

// for (let i = 1; i < myVerices.length; i++) {
//   const toVertex = myVerices[i],
//     path = new Stack();

//   for (let v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
//     path.push(v);
//   }
//   path.push(fromVertex);
//   let s = path.pop();
//   while (!path.isEmpty()) {
//     s += " - " + path.pop();
//   }
//   console.log(s);
// }

/**
 * @desc 深度优先遍历算法辅助函数
 * @param {*} u
 * @param {*} color
 * @param {*} adjList
 * @param {*} callback
 */
function depthFirstSearchVisit(u, color, adjList, callback) {
  color[u] = Colors.GREY;
  if (callback) {
    callback(u);
  }
  const neighbors = adjList.get(u);
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (color[w] === Colors.WHITE) {
      depthFirstSearchVisit(w, color, adjList, callback);
    }
  }
  color[u] = Colors.BLACK;
}

/**
 * @desc 深度优先遍历算法
 * @param {*} graph
 * @param {*} callback
 */
function depthFirstSearch(graph, callback) {
  const vertices = graph.getVertices(),
    adjList = graph.getAdjList(),
    color = initalizeColor(vertices);

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      depthFirstSearchVisit(vertices[i], color, adjList, callback);
    }
  }
}

let graph1 = [
  [0, 2, 4, 0, 0, 0],
  [0, 0, 1, 4, 2, 0],
  [0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 2],
  [0, 0, 0, 3, 0, 2],
  [0, 0, 0, 0, 0, 0]
];
