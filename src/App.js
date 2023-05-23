import React, { useEffect, useState } from "react";
import "./App.css";

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];

function App() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState("up");

  useEffect(() => {
    const interval = setInterval(moveSnake, 100);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      clearInterval(interval);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [snake]);

  const moveSnake = () => {
    const head = { ...snake[0] };
    switch (direction) {
      case "up":
        head.y -= 1;
        break;
      case "down":
        head.y += 1;
        break;
      case "left":
        head.x -= 1;
        break;
      case "right":
        head.x += 1;
        break;
      default:
        break;
    }
    setSnake([head, ...snake.slice(0, snake.length - 1)]);

    if (
      head.x < 0 ||
      head.x >= BOARD_SIZE ||
      head.y < 0 ||
      head.y >= BOARD_SIZE
    ) {
      // Reiniciar el juego
      setSnake(INITIAL_SNAKE);
      setDirection("up");
      return;
    }

    setSnake([head, ...snake.slice(0, snake.length - 1)]);
  };

  const handleKeyDown = (event) => {
    const key = event.keyCode;
    if (key === 38 && direction !== "down") {
      setDirection("up");
    } else if (key === 40 && direction !== "up") {
      setDirection("down");
    } else if (key === 37 && direction !== "right") {
      setDirection("left");
    } else if (key === 39 && direction !== "left") {
      setDirection("right");
    }
  };

  return (
    <div className="App" onKeyDown={handleKeyDown} tabIndex="0">
      <div className="game-board">
        {Array(BOARD_SIZE)
          .fill(0)
          .map((_, row) =>
            Array(BOARD_SIZE)
              .fill(0)
              .map((_, col) => (
                <div
                  key={`${row}-${col}`}
                  className={`cell ${
                    snake.find((cell) => cell.x === col && cell.y === row)
                      ? "snake"
                      : ""
                  }`}
                />
              ))
          )}
      </div>
    </div>
  );
}

export default App;
