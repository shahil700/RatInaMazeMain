export const MazeManager = (() => {
  const create = (size) => {
    return Array(size)
      .fill(null)
      .map(() => Array(size).fill(0));
  };

  const generateWalls = (maze, count) => {
    const size = maze.length;
    let wallsPlaced = 0;
    while (wallsPlaced < count) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
      if (
        maze[x][y] === 0 &&
        !(x === 0 && y === 0) &&
        !(x === size - 1 && y === size - 1)
      ) {
        maze[x][y] = 1;
        wallsPlaced++;
      }
    }
  };

  return { create, generateWalls };
})();
