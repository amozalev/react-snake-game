import React from 'react';

interface CellProps {
  char: string | number;
}

export const Cell: React.FC<CellProps> = ({char}) => {
  return <span>{char}&nbsp;</span>
}