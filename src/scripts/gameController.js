import { MazeManager } from "./mazeManager.js";
import { RatManager } from "./ratManager.js";
import { Pathfinding } from "./pathFinding.js";
import { Renderer } from "./renderer.js";

(() => {
  "use strict";

  const messageEl = document.getElementById("message");
  const mazeEl = document.getElementById("maze");
  const gridSizeInput = document.getElementById("gridSize");
  const wallCountInput = document.getElementById("wallCount");
  const generateBtn = document.getElementById("generateBtn");
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const restartBtn = document.getElementById("restartBtn");

  let gridSize, wallCount, maze, goalPos, intervalId, path;

  const startGame = () => {
    clearInterval(intervalId);
    gridSize = parseInt(gridSizeInput.value);
    wallCount = parseInt(wallCountInput.value);
    maze = MazeManager.create(gridSize);
    MazeManager.generateWalls(maze, wallCount);
    RatManager.setPosition({ x: 0, y: 0 });
    goalPos = { x: gridSize - 1, y: gridSize - 1 };
    path = Pathfinding.findPath(maze, RatManager.getPosition(), goalPos);
    Renderer.renderMaze(maze, RatManager.getPosition(), goalPos, mazeEl);
    messageEl.textContent = "";
    messageEl.classList.remove("victory");
    messageEl.classList.remove("failed");
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    restartBtn.disabled = true;
  };

  const moveRatAlongPath = () => {
    if (path.length > 0) {
      const nextPos = path.shift();
      RatManager.setPosition(nextPos);
      Renderer.renderMaze(maze, RatManager.getPosition(), goalPos, mazeEl);

      if (
        RatManager.getPosition().x === goalPos.x &&
        RatManager.getPosition().y === goalPos.y
      ) {
        clearInterval(intervalId);
        messageEl.textContent = "Victory!";
        messageEl.classList.add("victory");
        startBtn.disabled = true;
        pauseBtn.disabled = true;
        restartBtn.disabled = false;
      }
    }
  };

  const startRatMovement = () => {
    if (path.length > 0) {
      startBtn.disabled = true;
      pauseBtn.disabled = false;
      restartBtn.disabled = false;
      intervalId = setInterval(moveRatAlongPath, 2000);
    } else {
      messageEl.textContent = "No path found!";
      messageEl.classList.add("failed");
    }
  };

  const pauseGame = () => {
    clearInterval(intervalId);
    pauseBtn.disabled = true;
    startBtn.disabled = false;
  };

  const restartGame = () => {
    clearInterval(intervalId);
    RatManager.setPosition({ x: 0, y: 0 });
    path = Pathfinding.findPath(maze, RatManager.getPosition(), goalPos);
    Renderer.renderMaze(maze, RatManager.getPosition(), goalPos, mazeEl);
    messageEl.textContent = "";
    messageEl.classList.remove("victory");
    messageEl.classList.remove("failed");
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    restartBtn.disabled = true;
  };

  generateBtn.addEventListener("click", startGame);
  startBtn.addEventListener("click", startRatMovement);
  pauseBtn.addEventListener("click", pauseGame);
  restartBtn.addEventListener("click", restartGame);

  startGame();
})();
