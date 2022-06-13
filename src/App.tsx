import React from 'react';
import './App.css';
import {Game} from "./game";


function App() {
  const height = 10;
  const width = 10;
  const gameSpeed = 500;

  return <Game height={height} width={width} gameSpeed={gameSpeed}/>
}

export default App;
