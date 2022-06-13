import {SnakeList} from "./snake";

export enum CELLS {
  EMPTY = 'o',
  SNAKE = 'X',
  FOOD = 'H'
}

export const createInitCells = (height: number, width: number) =>
  Array(height).fill([]).map(row => row = Array(width).fill(CELLS.EMPTY))


export const getRandomCellCoords = (height: number, width: number): [number, number] =>
  [Math.floor(Math.random() * height), Math.floor(Math.random() * width)]

export const getNextSnakeCoordsByKey = (fieldHeight: number, fieldWidth: number, key: string, snake: SnakeList) => {
  let coordY = 0, coordX = 0;
  switch (key) {
    case 'ArrowUp':
      coordY = (snake.head.coordY - 1 + fieldHeight) % fieldHeight;
      coordX = snake.head.coordX;
      break;
    case 'ArrowDown':
      coordY = (snake.head.coordY + 1) % fieldHeight;
      coordX = snake.head.coordX
      break;
    case 'ArrowLeft':
      coordY = snake.head.coordY;
      coordX = (snake.head.coordX - 1 + fieldWidth) % fieldWidth;
      break;
    case 'ArrowRight':
      coordY = snake.head.coordY;
      coordX = (snake.head.coordX + 1) % fieldWidth;
      break;
  }
  return [coordY, coordX]
}