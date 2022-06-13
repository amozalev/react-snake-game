import React from 'react';
import {Cell} from "./cell";

interface CellsProps {
  cells: (string | number)[][];
}

export const Cells: React.FC<CellsProps> = ({cells}) => {
  return (
    <div>
      {
        cells.map((row: (string | number)[], i: number) =>
          <div key={i}>{row.map((cell: string | number, j: number) => <Cell key={j} char={cell}/>)}</div>
        )
      }
    </div>
  );
}