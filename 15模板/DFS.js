var visited = new Set();

var dfs = function (node, visited) {
  visited.add(node);

  for (let next_node in node.children()) {
    if (!visited.add(next_node)) {
      dfs(next_node, visited);
    }
  }
};
