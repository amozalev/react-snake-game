import React from 'react';
import './App.css';
import {useSnakeMove} from "./hooks/snake-move";
import {SnakeList} from "./snake";


function App() {
  const height = 10;
  const width = 10;
  const snake = new SnakeList(1, 2);
  snake.push(1, 1)
  const fields: any[] = useSnakeMove(height, width, snake);

  return (
    <div className="App">
      {
        fields.map((row: any, i: number) =>
          <div key={i}>{row.map((cell: any, j: number) => <span key={j}>{cell}&nbsp;</span>
          )}</div>
        )
      }
    </div>
  );
}

export default App;
