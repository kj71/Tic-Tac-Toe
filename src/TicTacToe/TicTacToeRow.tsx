import React from "react";
import TicTacToeCell from "./TicTacToeCell";

const TicTacToeRow = (props) => {
  return (
    <div id="tictactoeRow">
      {Array.from({ length: 3 }).map((item, index) => (
        <TicTacToeCell key={index} cellCol={index} {...props}/>
      ))}
    </div>
  );
};

export default TicTacToeRow;
