import React, {useState} from 'react';
import './App.css';
import {Game} from "./components/game";
import {GAME_MODE} from "./utils/utils";


function App() {
  const [key, setKey] = useState<number>(0); // used to remount a game component to restart
  const height = 10;
  const width = 10;
  const gameSpeed = 100;
  const gameMode: GAME_MODE = GAME_MODE.HARD

  return <Game key={key} gameHeight={height} gameWidth={width} gameSpeed={gameSpeed} restartGame={setKey} gameMode={gameMode}/>
}

export default App;
