import React, { useEffect, useState } from "react";
import "./App.css";

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_FRUIT = { x: 5, y: 5 };

function App() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState("up");
  const [fruit, setFruit] = useState(INITIAL_FRUIT);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!gameStarted || gameOver) {
      return;
    }

    const interval = setInterval(moveSnake, 100);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [snake, gameStarted, gameOver]);

  const moveSnake = () => {
    if (gameOver) {
      return;
    }

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

    // Verificar colisiones con los bordes del tablero
    if (
      head.x < 0 ||
      head.x >= BOARD_SIZE ||
      head.y < 0 ||
      head.y >= BOARD_SIZE
    ) {
      // Reiniciar el juego
      setSnake(INITIAL_SNAKE);
      setDirection("up");
      setFruit(INITIAL_FRUIT);
      setGameOver(true);
      return;
    }

    // Verificar colisiones con la fruta
    if (head.x === fruit.x && head.y === fruit.y) {
      // Incrementar la longitud de la serpiente y generar una nueva fruta
      const newSnake = [head, ...snake];
      setSnake(newSnake);
      setFruit(generateRandomFruit());
    } else {
      // Mover la serpiente
      setSnake([head, ...snake.slice(0, snake.length - 1)]);
    }
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

  const generateRandomFruit = () => {
    const x = Math.floor(Math.random() * BOARD_SIZE);
    const y = Math.floor(Math.random() * BOARD_SIZE);
    return { x, y };
  };

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection("up");
    setFruit(INITIAL_FRUIT);
    setGameStarted(true);
    setGameOver(false);
  };

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection("up");
    setFruit(INITIAL_FRUIT);
    setGameOver(false);
    setGameStarted(true); // Agregar esta línea
  };

  return (
    <div
      className="App"
      tabIndex="0"
      onKeyDown={gameStarted ? handleKeyDown : null}
    >
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
                      : fruit.x === col && fruit.y === row
                      ? "fruit"
                      : ""
                  }`}
                />
              ))
          )}
      </div>
      {!gameStarted && !gameOver && (
        <button onClick={startGame}>Comenzar partida</button>
      )}
      {gameOver && <button onClick={restartGame}>Reiniciar partida</button>}
    </div>
  );
}

export default App;
