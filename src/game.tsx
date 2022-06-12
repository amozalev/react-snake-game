import React, {useEffect, useState} from "react";
import * as _ from 'lodash';
import {createInitFields, getNewNodeCoords} from "./utils";
import {SnakeList} from "./snake";
import {useSnakeMove} from "./hooks/snake-move";

type GameProps = {
  height: number,
  width: number,
  snake: SnakeList
  gameSpeed?: number
}

export const Game: React.FC<GameProps> = ({height, width, snake, gameSpeed = 500}) => {
  const [fields, setFields] = useState(createInitFields(height, width));
  const key = useSnakeMove();

  useEffect(() => {
    let [i, j] = getNewNodeCoords(height, width);
    while (fields[i][j] !== 'o') {
      [i, j] = getNewNodeCoords(height, width);
    }
    const fieldsCopy = _.cloneDeep(fields);
    fieldsCopy[i][j] = 'H';
    setFields(fieldsCopy);
  }, [snake.size])

  useEffect(() => {
    const interval = setInterval(() => {
      if (key) {
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
            j = (snake.head.n - 1) % width;
            break;
          case 'ArrowRight':
            i = snake.head.m;
            j = (snake.head.n + 1) % width;
            break;
        }
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