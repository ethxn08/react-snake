import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Button from "./components/Button";

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_FRUIT = { x: 5, y: 5 };
const MAX_SCORE = 10;

const App = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState("up");
  const [fruit, setFruit] = useState(INITIAL_FRUIT);
  const [fruitColor, setFruitColor] = useState("#ff6347");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

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

  useEffect(() => {
    const randomColor = generateRandomColor();
    setFruitColor(randomColor);
  }, [fruit]);

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

    if (
      head.x < 0 ||
      head.x >= BOARD_SIZE ||
      head.y < 0 ||
      head.y >= BOARD_SIZE
    ) {
      setSnake(INITIAL_SNAKE);
      setDirection("up");
      setFruit(INITIAL_FRUIT);
      setGameOver(true);
      setScore(0);
      return;
    }

    if (head.x === fruit.x && head.y === fruit.y) {
      const newSnake = [head, ...snake];
      setSnake(newSnake);
      setFruit(generateRandomFruit());
      setScore(score + 1); // Incrementar el puntaje en 1
    } else {
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

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection("up");
    setFruit(INITIAL_FRUIT);
    setGameStarted(true);
    setGameOver(false);
    setScore(0); // Reiniciar el puntaje al comenzar el juego
  };

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection("up");
    setFruit(INITIAL_FRUIT);
    setGameOver(false);
    setGameStarted(true);
    setScore(0); // Reiniciar el puntaje al reiniciar el juego
  };

  return (
    <div
      className="App"
      tabIndex="0"
      onKeyDown={gameStarted ? handleKeyDown : null}
    >
      <Board snake={snake} fruit={fruit} fruitColor={fruitColor} />
      <div className="score">Puntaje: {score}</div> {/* Mostrar el puntaje */}
      {!gameStarted && !gameOver && (
        <Button text="Comenzar partida" onClick={startGame} />
      )}
      {gameOver && <Button text="Reiniciar partida" onClick={restartGame} />}
      {score === MAX_SCORE && <div className="message">¡Has ganado!</div>}{" "}
      {/* Mostrar un mensaje de "¡Has ganado!" cuando se alcanza la puntuación máxima */}
    </div>
  );
};

export default App;
