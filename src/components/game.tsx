import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {
  CELLS,
  createInitCells,
  getRandomCellCoords,
  getNextSnakeCoordsByKey,
  ALLOWED_KEYS,
  createFoodCell,
  GAME_MODE
} from "../utils/utils";
import {SnakeList} from "./snake";
import {useKeyboardEvent} from "../hooks/keyboard-event";
import {Cells} from "./cells";

type GameProps = {
  gameHeight: number,
  gameWidth: number,
  gameSpeed?: number
  restartGame: Dispatch<SetStateAction<number>>
  gameMode?: GAME_MODE
}

export const Game: React.FC<GameProps> = ({
                                            gameHeight,
                                            gameWidth,
                                            gameSpeed = 500,
                                            restartGame,
                                            gameMode = GAME_MODE.HARD
                                          }) => {
  const [cells, setCells] = useState(createInitCells(gameHeight, gameWidth));
  let keyRef = useRef<string | undefined>(useKeyboardEvent());
  let key = useKeyboardEvent();
  keyRef.current = key && ALLOWED_KEYS.has(key) ? key : keyRef.current;

  let snakeRef = useRef<SnakeList>(new SnakeList(...getRandomCellCoords(gameHeight, gameWidth)));
  const snake = snakeRef.current;
  const foodRef = useRef(createFoodCell(gameHeight, gameWidth, cells)) // used to create initial food only once => in strict mode Game rerenders twice during a mount
  const [initFoodCoordY, initFoodCoordX] = foodRef.current;

  useEffect(() => {
    cells[snake.head.coordY][snake.head.coordX] = CELLS.SNAKE;
    cells[initFoodCoordY][initFoodCoordX] = CELLS.FOOD;
    setCells([...cells])
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (keyRef.current && ALLOWED_KEYS.has(keyRef.current)) {
        const [nextCoordY, nextCoordX] = getNextSnakeCoordsByKey(gameHeight, gameWidth, keyRef.current, snake, gameMode);

        checkIfLostGame(nextCoordY, nextCoordX, gameHeight, gameWidth, interval);

        const isFoodCell = cells[nextCoordY][nextCoordX] === CELLS.FOOD
        const poppedNode = snake.move(nextCoordY, nextCoordX, isFoodCell);

        if (poppedNode) {
          cells[poppedNode.coordY][poppedNode.coordX] = CELLS.EMPTY;
        } else {
          const [foodCoordY, foodCoordX] = createFoodCell(gameHeight, gameWidth, cells);
          cells[foodCoordY][foodCoordX] = CELLS.FOOD;
        }
        cells[nextCoordY][nextCoordX] = CELLS.SNAKE;
        setCells([...cells]);
      }
    }, gameSpeed)
    return () => clearInterval(interval)
  }, [keyRef.current, cells])

  const checkIfLostGame = (nextCoordY: number, nextCoordX: number, gameHeight: number, gameWidth: number, interval: NodeJS.Timer) => {
    if (snake.isCellInSnake(nextCoordY, nextCoordX) || nextCoordY < 0 || nextCoordY >= gameHeight || nextCoordX < 0 || nextCoordX >= gameWidth) {
      clearInterval(interval)
      alert('You have lost!');
      restartGame((prevKey: number) => prevKey + 1);
    }
  }

  return <Cells cells={cells}/>
}