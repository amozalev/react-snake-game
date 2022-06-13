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
  let i = 0, j = 0;
  switch (key) {
    case 'ArrowUp':
      i = (snake.head.m - 1 + fieldHeight) % fieldHeight;
      j = snake.head.n;
      break;
    case 'ArrowDown':
      i = (snake.head.m + 1) % fieldHeight;
      j = snake.head.n
      break;
    case 'ArrowLeft':
      i = snake.head.m;
      j = (snake.head.n - 1 + fieldWidth) % fieldWidth;
      break;
    case 'ArrowRight':
      i = snake.head.m;
      j = (snake.head.n + 1) % fieldWidth;
      break;
  }
  return [i, j]
}