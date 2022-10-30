// import path from 'path';
// /**
//  * @typedef {Object} Node
//  * @property {String} name
//  * @property {{directory | file}} type
//  * @property {Object} meta - custom information
//  */

// /**
//  * @description Make directory node
//  * @param {String} name
//  * @param {Object} children
//  * @returns Node
//  */
// const mkdir = (name, children = [], meta = {}) => ({
//   name,
//   children,
//   meta,
//   type: 'directory',
// });

// /**
//  * @description Make file node
//  * @param {String} name
//  * @returns Node
//  */
// const mkfile = (name, meta = {}) => ({
//   name,
//   meta,
//   type: 'file',
// });

// /**
//  * @description Return name
//  * @param {Object} node
//  * @returns Name
//  */
// const getName = (node) => node.name;

// /**
//  * @description Return children
//  * @param {Object} directory
//  * @returns Children
//  */
// const getChildren = (directory) => directory.children;

// /**
//  * @description Return meta
//  * @param {Object} node
//  * @returns Meta
//  */
// const getMeta = (node) => node.meta;

// /**
//  * @description Check if node is a directory
//  * @param {Object} node
//  */
// const isDirectory = (node) => node.type === 'directory';

// /**
//  * @description Check if node is a file
//  * @param {Object} node
//  */
// const isFile = (node) => node.type === 'file';

// /**
//  * @description Make deep cloning
//  * @param {Object} data
//  * @returns Data copy
//  */
// const cloneDeep = (data) => {
//   const entries = Object.entries(data);
//   return entries.reduce((copy, [key, value]) => ({ ...copy, [key]: typeof value === 'object' ? cloneDeep(value) : value }), {});
// };

// // const changeClass = (tree, fromClass, toClass) => {
// //   let newClassName;
// //   if (tree.className) {
// //     newClassName = tree.className === fromClass ? toClass : tree.className;
// //   }
// //   if (tree.type === 'tag-internal') {
// //     const changed = tree.children.map((child) => changeClass(child, fromClass, toClass));
// //     return {...tree, className: newClassName, children: changed};
// //   } else {
// //     return {...tree};
// //   }
// // };
// // console.log(JSON.stringify(htmlTreeSource));
// // console.log(JSON.stringify(changeClass(htmlTreeSource, 'hexlet-community', 'CLASSSSSS!!!')));

// class Queue {
//   constructor() {
//     this.values = [];
//   }

//   /**
//    * @description проверяет очередь на пустоту
//    * @returns {Boolean}
//    */
//   isEmpty() {
//     return this.values.length === 0;
//   }

//   /**
//    * @description добавляем новый элемент в конец очереди
//    * @param {String | Number | Boolean} value новый элемент
//    */
//   enqueue(value) {
//     this.values.push(value);
//   }

//   /**
//    * @description извлекает первый элемент в очереди
//    * @returns {String | Number | Boolean} извлекаемый элемент
//    */
//   decqueue() {
//     if (this.isEmpty()) {
//       return null;
//     }
//     const takenValue = this.values.shift();
//     return takenValue;
//   }
// }

// const tree = ['Moscow', [
//   ['Smolensk'],
//   ['Yaroslavl'],
//   ['Voronezh', [
//     ['Liski'],
//     ['Boguchar'],
//     ['Kursk', [
//       ['Belgorod', [
//         ['Borisovka'],
//       ]],
//       ['Kurchatov'],
//     ]],
//   ]],
//   ['Ivanovo', [
//     ['Kostroma'], ['Kineshma'],
//   ]],
//   ['Vladimir'],
//   ['Tver', [
//     ['Klin'], ['Dubna'], ['Rzhev'],
//   ]],
// ]];

// // const makeList = (tree, list, parent = null) => {
// //   const [node, branches] = tree;
// //   list[node] = parent;
// //   if(branches) {
// //     for (const branch of branches) {
// //       const name = makeList(branch, list, node);
// //     }
// //   }
// //   return node;
// // };

// const makeEdges = (tree, edges, parent = null) => {
//   // Объявляем узел и отдельно потомков
//   const [node, children] = tree;
//   // Создаем из узла и родителя - ребро
//   const edge = [node, parent];
//   // Добавляем ребро в список ребер
//   edges.push(edge);
//   // Если потомки существуют
//   if (children) {
//     // То проходим по каждому потомку
//     for (const child of children) {
//       // И делаем ту же самую процедуру добавления ребра
//       makeEdges(child, edges, node);
//     }
//   }
//   return node;
// };

// // const cities = [];
// // makeCitiesList(tree, cities);
// // // console.log(cities);

// const addEdge = (graph, V1, V2) => {
//   if (!graph[V1]) {
//     graph[V1] = new Set();
//   }
//   graph[V1].add(V2);
// };

// const makeAdjacencyList = (tree) => {
//   const edges = [];
//   makeEdges(tree, edges);
//   const graph = {};
//   for (const edge of edges) {
//     const [V1, V2] = edge;
//     if (V1 !== null && V2 !== null) {
//       addEdge(graph, V1, V2);
//       addEdge(graph, V2, V1);
//     }
//   }
//   return graph;
// };

// // const graph = makeAdjacencyList(tree);

// const findShortestPath = (tree, fromVertex, toVertex) => {
//   const graph = makeAdjacencyList(tree);
//   const distances = Object.keys(graph)
//     .reduce((acc, item) => ({ ...acc, [item]: null }), {});

//   const parents = Object.keys(graph)
//     .reduce((acc, item) => ({ ...acc, [item]: null }), {});

//   const queue = [];

//   // Начинаем обход с указанной вершины
//   queue.push(fromVertex);
//   distances[fromVertex] = 0;

//   while (queue.length !== 0) {
//     const currentVertex = queue.shift();

//     for (const neighbor of graph[currentVertex]) {
//       if (!distances[neighbor]) {
//         distances[neighbor] = distances[currentVertex] + 1;
//         queue.push(neighbor);
//         parents[neighbor] = currentVertex;
//       }
//     }
//   }
//   const path = [toVertex];
//   let parent = parents[toVertex]; // Предок для определенной вершины
//   while (parent !== fromVertex) {
//     path.push(parent);
//     parent = parents[parent];
//   }
//   path.push(fromVertex);
//   return path.reverse();
// };

// const paths = findShortestPath(tree, 'Borisovka', 'Kurchatov');
// console.log(paths);

// // ['Dubna', 'Tver', 'Moscow', 'Ivanovo', 'Kostroma']

// // console.log(findShortestPath(graph, 'Borisovka', 'Kurchatov'));
