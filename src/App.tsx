import React, {useState} from 'react';
import './App.css';
import {Game} from "./components/game";


function App() {
  const [key, setKey] = useState<number>(0); // used to remount a game component to restart
  const height = 10;
  const width = 10;
  const gameSpeed = 200;

  return <Game key={key} gameHeight={height} gameWidth={width} gameSpeed={gameSpeed} restartGame={setKey}/>
}

export default App;
