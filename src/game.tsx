import React, {useEffect, useState} from "react";
import * as _ from 'lodash';
import {CELLS, createInitCells, getNewSnakeNodeCoords, getNextSnakeCoordsByKey} from "./utils";
import {SnakeList} from "./snake";
import {useKeyboardEvent} from "./hooks/keyboard-event";

type GameProps = {
  height: number,
  width: number,
  snake: SnakeList
  gameSpeed?: number
}

export const Game: React.FC<GameProps> = ({height, width, snake, gameSpeed = 500}) => {
  const [cells, setCells] = useState(createInitCells(height, width));
  const key = useKeyboardEvent();

  useEffect(() => {
    let [i, j] = getNewSnakeNodeCoords(height, width);
    while (cells[i][j] !== CELLS.EMPTY) {
      [i, j] = getNewSnakeNodeCoords(height, width);
    }
    const cellsCopy = _.cloneDeep(cells);
    cellsCopy[i][j] = CELLS.FOOD;
    setCells(cellsCopy);
  }, [snake.size])

  useEffect(() => {
    const interval = setInterval(() => {
      if (key) {
        const [i, j] = getNextSnakeCoordsByKey(height, width, key, snake);
        const popped = snake.move(i, j, cells[i][j] === CELLS.FOOD);

        setCells(prevCells => {
          const cellsCopy = _.cloneDeep(prevCells);

          if (popped)
            cellsCopy[popped.m][popped.n] = CELLS.EMPTY;
          let curNode = snake.head;
          while (curNode) {
            cellsCopy[curNode.m][curNode.n] = CELLS.SNAKE
            curNode = curNode.next;
          }
          return cellsCopy;
        });
      }
    }, gameSpeed)
    return () => clearInterval(interval)
  }, [key])

  return (
    <div>
      {
        cells.map((row: any, i: number) =>
          <div key={i}>{row.map((cell: any, j: number) => <span key={j}>{cell}&nbsp;</span>
          )}</div>
        )
      }
    </div>
  );
}