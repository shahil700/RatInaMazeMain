export const Pathfinding = (() => {
  const findPath = (maze, start, end) => {
    let stack = [];
    let visited = new Set();
    let parent = {};

    stack.push(start);
    visited.add(JSON.stringify(start));

    while (stack.length > 0) {
      let current = stack.pop();

      if (current.x === end.x && current.y === end.y) {
        return reconstructPath(parent, start, end);
      }

      let neighbors = [
        { x: current.x - 1, y: current.y }, // Up
        { x: current.x + 1, y: current.y }, // Down
        { x: current.x, y: current.y - 1 }, // Left
        { x: current.x, y: current.y + 1 }, // Right
      ];

      for (let neighbor of neighbors) {
        if (
          isValidMove(maze, neighbor) &&
          !visited.has(JSON.stringify(neighbor))
        ) {
          stack.push(neighbor);
          visited.add(JSON.stringify(neighbor));
          parent[JSON.stringify(neighbor)] = current;
        }
      }
    }

    return []; // No path found
  };

  const reconstructPath = (parent, start, end) => {
    let path = [];
    let current = end;
    while (current.x !== start.x || current.y !== start.y) {
      path.unshift(current);
      current = parent[JSON.stringify(current)];
    }
    return path;
  };

  const isValidMove = (maze, pos) => {
    const gridSize = maze.length;
    return (
      pos.x >= 0 &&
      pos.x < gridSize &&
      pos.y >= 0 &&
      pos.y < gridSize &&
      maze[pos.x][pos.y] === 0
    );
  };

  return { findPath };
})();
