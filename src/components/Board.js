import React from "react";
import Cell from "./Cell";

const BOARD_SIZE = 20;

const Board = ({ snake, fruit, fruitColor }) => {
  return (
    <div className="game-board">
      {Array(BOARD_SIZE)
        .fill(0)
        .map((_, row) =>
          Array(BOARD_SIZE)
            .fill(0)
            .map((_, col) => (
              <Cell
                key={`${row}-${col}`}
                isSnake={snake.find((cell) => cell.x === col && cell.y === row)}
                isFruit={fruit.x === col && fruit.y === row}
                fruitColor={fruitColor}
                snakeHead={snake[0].x === col && snake[0].y === row}
              />
            ))
        )}
    </div>
  );
};

export default Board;
