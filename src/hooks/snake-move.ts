import {useEffect, useState} from "react";
import * as _ from "lodash";
import {SnakeList} from "../snake";

const createInitFields = (height: number, width: number) =>
  Array(height).fill([]).map(row => row = Array(width).fill('o'))

export const useSnakeMove = (height: number, width: number, snakeLst: SnakeList) => {
  let initArr: any = createInitFields(height, width);

  const [fields, setFields] = useState(initArr);

  useEffect(() => {
      const handleSnakeMove = (event: any) => {
        const fieldsCopy = _.cloneDeep(fields)

        switch (event.key) {
          case 'ArrowUp':
            snakeLst.push((snakeLst.head.m - 1) % height, snakeLst.head.n)
            break;
          case 'ArrowDown':
            snakeLst.push((snakeLst.head.m + 1) % height, snakeLst.head.n)
            break;
          case 'ArrowLeft':
            snakeLst.push(snakeLst.head.m, (snakeLst.head.n - 1) % width)
            break;
          case 'ArrowRight':
            snakeLst.push(snakeLst.head.m, (snakeLst.head.n + 1) % width)
            break;
        }

        let curNode = snakeLst.head;
        while (curNode) {
          fieldsCopy[curNode.m][curNode.n] = 'X'
          curNode = curNode.next;
        }
        setFields(fieldsCopy);
      }

      document.addEventListener('keydown', handleSnakeMove);
      return () => document.removeEventListener('keydown', handleSnakeMove);
    }, [height, width]
  )

  return fields;
}