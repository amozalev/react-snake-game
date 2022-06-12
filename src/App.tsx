import React from 'react';
import './App.css';
import {SnakeList} from "./snake";
import {Game} from "./game";


function App() {
  const height = 10;
  const width = 10;
  const gameSpeed = 500;
  const snake = new SnakeList(1, 2);

  return <Game height={height} width={width} snake={snake} gameSpeed={gameSpeed}/>
}

export default App;
