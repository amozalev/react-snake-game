export const createInitFields = (height: number, width: number) =>
  Array(height).fill([]).map(row => row = Array(width).fill('o'))


export const getNewNodeCoords = (height: number, width: number) =>
  [Math.floor(Math.random() * height), Math.floor(Math.random() * width)]