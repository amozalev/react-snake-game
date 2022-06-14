import React from 'react';
import './cell.css';
import {CELLS} from "../utils/utils";

interface CellProps {
  char: string | number;
}

const snakeCell = <div className='snakeRhumb'></div>;

const foodCell = <div className='coin'>$</div>;

export const Cell: React.FC<CellProps> = ({char}) => {
  let classname = '';
  let child;
  switch (char) {
    case CELLS.SNAKE:
      classname = 'snake';
      child = snakeCell;
      break
    case CELLS.FOOD:
      classname = 'food';
      child = foodCell;
      break;
    default:
      classname = 'empty';
  }
  return <div className={`cell ${classname}`}>{child && child}</div>
}