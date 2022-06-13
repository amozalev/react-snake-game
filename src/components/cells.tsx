import React from 'react';
import {Cell} from "./cell";
import './cells.css'

interface CellsProps {
  cells: (string | number)[][];
}

export const Cells: React.FC<CellsProps> = ({cells}) => {
  return (
    <div className='cells_container'>
      {
        cells.map((row: (string | number)[], i: number) =>
          <div className='row' key={i}>
            {row.map((cell: string | number, j: number) => <Cell key={j} char={cell}/>)}
          </div>
        )
      }
    </div>
  );
}