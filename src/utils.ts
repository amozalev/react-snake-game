import {SnakeList} from "./snake";

export enum CELLS {
  EMPTY = 'o',
  SNAKE = 'X',
  FOOD = 'H'
}

export const createInitCells = (height: number, width: number) =>
  Array(height).fill([]).map(row => row = Array(width).fill(CELLS.EMPTY))


export const getNewSnakeNodeCoords = (height: number, width: number) =>
  [Math.floor(Math.random() * height), Math.floor(Math.random() * width)]

export const getNextSnakeCoordsByKey = (height: number, width: number, key: string, snake: SnakeList) => {
  let i = 0, j = 0;
  switch (key) {
    case 'ArrowUp':
      i = (snake.head.m - 1) % height;
      j = snake.head.n;
      break;
    case 'ArrowDown':
      i = (snake.head.m + 1) % height;
      j = snake.head.n
      break;
    case 'ArrowLeft':
      i = snake.head.m;
      j = (snake.head.n - 1 + width) % width;
      break;
    case 'ArrowRight':
      i = snake.head.m;
      j = (snake.head.n + 1) % width;
      break;
  }
  return [i, j]
}