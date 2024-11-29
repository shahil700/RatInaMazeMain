export const Renderer = (() => {
  const renderMaze = (maze, ratPos, goalPos, mazeEl) => {
    mazeEl.innerHTML = "";
    mazeEl.style.gridTemplateColumns = `repeat(${maze.length}, 1fr)`;
    for (let i = 0; i < maze.length; i++) {
      for (let j = 0; j < maze[i].length; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        if (i === ratPos.x && j === ratPos.y) {
          cell.classList.add("rat");
        } else if (i === goalPos.x && j === goalPos.y) {
          cell.classList.add("goal");
        }
        if (maze[i][j] === 1) {
          cell.classList.add("wall");
        }
        mazeEl.appendChild(cell);
      }
    }
  };

  return { renderMaze };
})();
