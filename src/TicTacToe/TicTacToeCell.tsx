import React, { useCallback, useMemo } from "react";
import "./styles.css";

const PLAYER_MARKS = ["", "\u2715", "\u25ef"];

interface IProps {
  cellRow: number;
  cellCol: number;
  player: number;
  cells: number[][];
  setCells: any;
  matchEnded: boolean;
}

const TicTacToeCell = (props: IProps) => {
  const { cellRow, cellCol, player, cells, setCells, matchEnded } = props;
  const onClick = useCallback((e: any) => {
    if (matchEnded || cells[cellRow][cellCol] !== 0) {
      e.stopPropagation();
      return;
    }
    const newCells = cells.map((rowItem, rowIndex) =>
      cells[rowIndex].map((colItem, colIndex) => {
        if (rowIndex != cellRow || colIndex != cellCol) {
          return cells[rowIndex][colIndex];
        }
        return player;
      })
    );
    setCells(newCells);
  }, [matchEnded, cells, cellRow, cellCol, player]);

  const playerMark = useMemo(() => {
    const cellValue = cells[cellRow][cellCol];
    return PLAYER_MARKS[cellValue];
  }, [cells, cellRow, cellCol]);

  return (
    <div id="tictactoeCell" onClick={onClick}>
      {playerMark}
    </div>
  );
};

export default TicTacToeCell;
