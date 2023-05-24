import React from "react";

const Cell = ({ isSnake, isFruit, fruitColor, snakeHead }) => {
  const cellStyle = {
    backgroundColor: isFruit ? fruitColor : null,
  };

  return (
    <div className={`cell ${isSnake ? "snake" : ""}`} style={cellStyle}>
      {snakeHead && <div className="snake-head" />}
    </div>
  );
};

export default Cell;
