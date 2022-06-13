import React, {useEffect, useState} from "react";
import * as _ from 'lodash';
import {createInitFields, getNewSnakeNodeCoords, getNextSnakeCoordsByKey} from "./utils";
import {SnakeList} from "./snake";
import {useKeyboardEvent} from "./hooks/keyboard-event";

type GameProps = {
  height: number,
  width: number,
  snake: SnakeList
  gameSpeed?: number
}

export const Game: React.FC<GameProps> = ({height, width, snake, gameSpeed = 500}) => {
  const [fields, setFields] = useState(createInitFields(height, width));
  const key = useKeyboardEvent();

  useEffect(() => {
    let [i, j] = getNewSnakeNodeCoords(height, width);
    while (fields[i][j] !== 'o') {
      [i, j] = getNewSnakeNodeCoords(height, width);
    }
    const fieldsCopy = _.cloneDeep(fields);
    fieldsCopy[i][j] = 'H';
    setFields(fieldsCopy);
  }, [snake.size])

  useEffect(() => {
    const interval = setInterval(() => {
      if (key) {
        const [i, j] = getNextSnakeCoordsByKey(height, width, key, snake);
        const addNew = fields[i][j] === 'H';
        const popped = snake.move(i, j, addNew);

        setFields(prevFields => {
          const fieldsCopy = _.cloneDeep(prevFields);

          if (popped)
            fieldsCopy[popped.m][popped.n] = 'o';
          let curNode = snake.head;
          while (curNode) {
            fieldsCopy[curNode.m][curNode.n] = 'X'
            curNode = curNode.next;
          }
          return fieldsCopy;
        });
      }
    }, gameSpeed)
    return () => clearInterval(interval)
  }, [key])

  return (
    <div>
      {
        fields.map((row: any, i: number) =>
          <div key={i}>{row.map((cell: any, j: number) => <span key={j}>{cell}&nbsp;</span>
          )}</div>
        )
      }
    </div>
  );
}