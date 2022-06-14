import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import * as _ from 'lodash';
import {
  CELLS,
  createInitCells,
  getRandomCellCoords,
  getNextSnakeCoordsByKey,
  ALLOWED_KEYS,
  createFoodCell
} from "./utils";
import {SnakeList} from "./snake";
import {useKeyboardEvent} from "./hooks/keyboard-event";
import {Cells} from "./components/cells";

type GameProps = {
  gameHeight: number,
  gameWidth: number,
  gameSpeed?: number
  restartGame: Dispatch<SetStateAction<number>>
}

export const Game: React.FC<GameProps> = ({gameHeight, gameWidth, gameSpeed = 500, restartGame}) => {
  const [cells, setCells] = useState(createInitCells(gameHeight, gameWidth));
  let key = useKeyboardEvent();

  let snakeRef = useRef<SnakeList>(new SnakeList(...getRandomCellCoords(gameHeight, gameWidth)));
  const snake = snakeRef.current;
  const foodRef = useRef(createFoodCell(gameHeight, gameWidth, cells))
  const [initFoodCoordY, initFoodCoordX] = foodRef.current;

  useEffect(() => {
    cells[snake.head.coordY][snake.head.coordX] = CELLS.SNAKE;
    cells[initFoodCoordY][initFoodCoordX] = CELLS.FOOD;
    setCells([...cells])
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (key && ALLOWED_KEYS.has(key)) {
        const [nextCoordY, nextCoordX] = getNextSnakeCoordsByKey(gameHeight, gameWidth, key, snake);

        if (snake.isCellInSnake(nextCoordY, nextCoordX)) {
          stopGame();
          clearInterval(interval)
          restartGame((prevKey: number) => prevKey + 1);
        }

        const isFoodCell = cells[nextCoordY][nextCoordX] === CELLS.FOOD
        const poppedNode = snake.move(nextCoordY, nextCoordX, isFoodCell);

        setCells(prevCells => {
          const cellsCopy = _.cloneDeep(prevCells);

          if (poppedNode) {
            cellsCopy[poppedNode.coordY][poppedNode.coordX] = CELLS.EMPTY;
          } else {
            const [foodCoordY, foodCoordX] = createFoodCell(gameHeight, gameWidth, cellsCopy);
            cellsCopy[foodCoordY][foodCoordX] = CELLS.FOOD;
          }
          cellsCopy[nextCoordY][nextCoordX] = CELLS.SNAKE;
          return cellsCopy;
        });
      }
    }, gameSpeed)
    return () => clearInterval(interval)
  }, [key, cells])

  const stopGame = () => {
    alert('You loose!');
  }

  return <Cells cells={cells}/>
}