import React, { useCallback, useEffect, useState, useMemo } from "react";
import TicTacToeRow from "./TicTacToeRow";

const VALID_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const MATCH_STATUS = {
  RUNNING: 1,
  DRAW: 2,
  WON: 3,
}

const getCoord = (position) => {
  return { x: Math.floor(position / 3), y: position % 3 };
};

const combinationExists = (cells, combination) => {
  const { x: x1, y: y1 } = getCoord(combination[0]);
  const { x: x2, y: y2 } = getCoord(combination[1]);
  const { x: x3, y: y3 } = getCoord(combination[2]);
  if (
    cells[x1][y1] !== 0 &&
    cells[x1][y1] === cells[x2][y2] &&
    cells[x1][y1] === cells[x3][y3]
  ) {
    return true;
  }
  return false;
};

const TicTacToe = () => {
  const [cells, setCells] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [turnCount, setTurnCount] = useState(0);
  const [matchStatus, setMatchStatus] = useState(MATCH_STATUS.RUNNING);

  useEffect(() => {
    for (let combination of VALID_COMBINATIONS) {
      if (combinationExists(cells, combination)) {
        setMatchStatus(MATCH_STATUS.WON);
        return;
      }
    }
    if(turnCount == 9) {
      setMatchStatus(MATCH_STATUS.DRAW);
    }
  }, [cells, turnCount]);

  const onClick = useCallback(() => {
    setTurnCount(prevCount => prevCount + 1);
  }, [turnCount]);

  const matchEnded = useMemo(() => matchStatus !== MATCH_STATUS.RUNNING, [matchStatus]);
  const currPlayer = useMemo(() => turnCount % 2 + 1, [turnCount]);
  const prevPlayer = useMemo(() => (turnCount + 1) % 2 + 1, [turnCount]);

  const matchStatusText = useMemo(() => {
    if(matchStatus === MATCH_STATUS.RUNNING) {
      return `Turn: Player ${currPlayer}`;
    }
    if(matchStatus === MATCH_STATUS.WON) {
      return `Player ${prevPlayer} WON`;
    }
    return `DRAW`;
  }, [matchStatus, currPlayer, prevPlayer]);

  return (
    <>
      <div id="tictactoe" onClick={onClick}>
        {Array.from({ length: 3 }).map((item, index) => (
          <TicTacToeRow
            key={index}
            cellRow={index}
            player={currPlayer}
            cells={cells}
            setCells={setCells}
            matchEnded={matchEnded}
          />
        ))}
      </div>
      <h1>{matchStatusText}</h1>
    </>
  );
};

export default TicTacToe;
