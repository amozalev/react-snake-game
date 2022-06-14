import {SnakeList} from "../components/snake";

export enum CELLS {
  EMPTY = 'o',
  SNAKE = 'X',
  FOOD = 'F'
}

export enum GAME_MODE {
  EASY,
  HARD
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

export const getNextSnakeCoordsByKey = (gameHeight: number, gameWidth: number, key: string, snake: SnakeList, gameMode: GAME_MODE) => {
  let coordY = 0, coordX = 0;
  switch (key) {
    case 'ArrowUp':
      coordY = gameMode === GAME_MODE.EASY ? (snake.head.coordY - 1 + gameHeight) % gameHeight : snake.head.coordY - 1;
      coordX = snake.head.coordX;
      break;
    case 'ArrowDown':
      coordY = gameMode === GAME_MODE.EASY ? (snake.head.coordY + 1) % gameHeight : snake.head.coordY + 1;
      coordX = snake.head.coordX
      break;
    case 'ArrowLeft':
      coordY = snake.head.coordY;
      coordX = gameMode === GAME_MODE.EASY ? (snake.head.coordX - 1 + gameWidth) % gameWidth : snake.head.coordX - 1;
      break;
    case 'ArrowRight':
      coordY = snake.head.coordY;
      coordX = gameMode === GAME_MODE.EASY ? (snake.head.coordX + 1) % gameWidth : snake.head.coordX + 1;
      break;
  }
  return [coordY, coordX];
}