import React from 'react';
import './App.css';
import {Game} from "./game";


function App() {
  const height = 10;
  const width = 10;
  const gameSpeed = 500;

  return <Game fieldHeight={height} fieldWidth={width} gameSpeed={gameSpeed}/>
}

export default App;
