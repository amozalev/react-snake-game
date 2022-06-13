import React from 'react';
import './App.css';
import {Game} from "./game";


function App() {
  const height = 30;
  const width = 30;
  const gameSpeed = 100;

  return <Game fieldHeight={height} fieldWidth={width} gameSpeed={gameSpeed}/>
}

export default App;
