import React from 'react';
import './cell.css';
import {CELLS} from "../utils";

interface CellProps {
  char: string | number;
}

export const Cell: React.FC<CellProps> = ({char}) => {
  let classname = '';
  switch (char) {
    case CELLS.SNAKE:
      classname = 'snake';
      break
    case CELLS.FOOD:
      classname = 'food';
      break;
    default:
      classname = 'empty';
  }
  return <div className={`cell ${classname}`}></div>
}