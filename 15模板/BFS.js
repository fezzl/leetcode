var visited = new Set();

var BFS = function (graph, start, end) {
  let queue = [];
  queue.concat([start]);
  visited.add(start);

  while (queue.length) {
    let node = queue.shift();
    visited.add(node);
    process(node);
    let nodes = generate_related_nodes(node);
    queue.push(nodes);
  }
};
