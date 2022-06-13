import React, {useEffect, useRef, useState} from "react";
import * as _ from 'lodash';
import {CELLS, createInitCells, getRandomCellCoords, getNextSnakeCoordsByKey} from "./utils";
import {SnakeList} from "./snake";
import {useKeyboardEvent} from "./hooks/keyboard-event";
import {Cells} from "./components/cells";

type GameProps = {
  gameHeight: number,
  gameWidth: number,
  gameSpeed?: number
}

export const Game: React.FC<GameProps> = ({gameHeight, gameWidth, gameSpeed = 500}) => {
  const [cells, setCells] = useState(createInitCells(gameHeight, gameWidth));
  const key = useKeyboardEvent();

  let snakeRef = useRef<SnakeList>(new SnakeList(...getRandomCellCoords(gameHeight, gameWidth)));
  const snake = snakeRef.current;

  useEffect(() => {
    setCells(prevCells => {
      prevCells[snake.head.coordY][snake.head.coordX] = CELLS.SNAKE;
      return [...prevCells]
    })
  }, [])

  useEffect(() => {
    let [foodCoordY, foodCoordX] = getRandomCellCoords(gameHeight, gameWidth);
    while (cells[foodCoordY][foodCoordX] !== CELLS.EMPTY) {
      [foodCoordY, foodCoordX] = getRandomCellCoords(gameHeight, gameWidth);
    }
    const cellsCopy = _.cloneDeep(cells);
    cellsCopy[foodCoordY][foodCoordX] = CELLS.FOOD;
    setCells(cellsCopy);
  }, [snake.size])

  useEffect(() => {
    const interval = setInterval(() => {
      if (key) {
        const [nextCoordY, nextCoordX] = getNextSnakeCoordsByKey(gameHeight, gameWidth, key, snake);
        const poppedNode = snake.move(nextCoordY, nextCoordX, cells[nextCoordY][nextCoordX] === CELLS.FOOD);

        setCells(prevCells => {
          const cellsCopy = _.cloneDeep(prevCells);

          if (poppedNode)
            cellsCopy[poppedNode.coordY][poppedNode.coordX] = CELLS.EMPTY;
          let curNode = snake.head;
          while (curNode) {
            cellsCopy[curNode.coordY][curNode.coordX] = CELLS.SNAKE
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