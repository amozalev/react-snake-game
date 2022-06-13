import React, {useEffect, useRef, useState} from "react";
import * as _ from 'lodash';
import {CELLS, createInitCells, getRandomCellCoords, getNextSnakeCoordsByKey} from "./utils";
import {SnakeList} from "./snake";
import {useKeyboardEvent} from "./hooks/keyboard-event";
import {Cells} from "./components/cells";

type GameProps = {
  height: number,
  width: number,
  gameSpeed?: number
}

export const Game: React.FC<GameProps> = ({height, width, gameSpeed = 500}) => {
  const [cells, setCells] = useState(createInitCells(height, width));
  const key = useKeyboardEvent();

  let snakeRef = useRef<SnakeList>(new SnakeList(...getRandomCellCoords(height, width)));
  const snake = snakeRef.current;

  useEffect(() => {
    setCells(prevCells => {
      prevCells[snake.head.m][snake.head.n] = CELLS.SNAKE;
      return [...prevCells]
    })
  }, [])

  useEffect(() => {
    let [i, j] = getRandomCellCoords(height, width);
    while (cells[i][j] !== CELLS.EMPTY) {
      [i, j] = getRandomCellCoords(height, width);
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

  return <Cells cells={cells}/>
}