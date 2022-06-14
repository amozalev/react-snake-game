import {SnakeList} from "./snake";

export enum CELLS {
  EMPTY = 'o',
  SNAKE = 'X',
  FOOD = 'F'
}

export const ALLOWED_KEYS = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'])

export const createInitCells = (height: number, width: number) =>
  Array(height).fill([]).map(row => row = Array(width).fill(CELLS.EMPTY));


export const getRandomCellCoords = (height: number, width: number): [number, number] =>
  [Math.floor(Math.random() * height), Math.floor(Math.random() * width)];

export const createFoodCell = (gameHeight: number, gameWidth: number, cells: any) => {
  let [foodCoordY, foodCoordX] = getRandomCellCoords(gameHeight, gameWidth);
  while (cells[foodCoordY][foodCoordX] !== CELLS.EMPTY) {
    [foodCoordY, foodCoordX] = getRandomCellCoords(gameHeight, gameWidth);
  }
  return [foodCoordY, foodCoordX];
}

export const getNextSnakeCoordsByKey = (gameHeight: number, gameWidth: number, key: string, snake: SnakeList) => {
  let coordY = 0, coordX = 0;
  switch (key) {
    case 'ArrowUp':
      coordY = (snake.head.coordY - 1 + gameHeight) % gameHeight;
      coordX = snake.head.coordX;
      break;
    case 'ArrowDown':
      coordY = (snake.head.coordY + 1) % gameHeight;
      coordX = snake.head.coordX
      break;
    case 'ArrowLeft':
      coordY = snake.head.coordY;
      coordX = (snake.head.coordX - 1 + gameWidth) % gameWidth;
      break;
    case 'ArrowRight':
      coordY = snake.head.coordY;
      coordX = (snake.head.coordX + 1) % gameWidth;
      break;
  }
  return [coordY, coordX];
}