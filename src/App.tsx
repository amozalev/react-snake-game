import React from 'react';
import './App.css';
import {Game} from "./game";


function App() {
  const height = 10;
  const width = 10;
  const gameSpeed = 100;

  return <Game gameHeight={height} gameWidth={width} gameSpeed={gameSpeed}/>
}

export default App;
