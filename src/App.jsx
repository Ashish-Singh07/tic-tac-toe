import { useEffect, useState } from 'react';

import logo from './logo.svg';
import './App.css';

function App() {
  const [moves,setMoves] = useState([]);  //record the moves played by each player one by one
  const [curplayer,setCurplayer] = useState("X"); //to switch between the player X and player O
  const [history, setHistory] = useState([]); //to time travel
  const [winner,setWinner] =useState(''); //to declare winner

  //this array holds the indexes of the moves array which has to be same to declare a winner
  let winningCombination = [
     [0,1,2],
     [3,4,5],
     [6,7,8],
     [0,3,6],
     [1,4,7],
     [2,5,8],
     [0,4,8],
     [2,4,6]
  ];

  
  //switches between the player X and player O and set the position on board if it is not already set
  function changePlayer( i ){
    if(!moves[i] && !winner) {
      let tempdata = [...moves];
      tempdata[i] = curplayer;
      setMoves(tempdata);
      curplayer==="X" ?  setCurplayer("O") : setCurplayer("X");
    }
  }

  //record the moves in the history array with each move
  const historyFunction = (e) =>{
    setMoves(e);
  }

  const resetGame = () =>{
    setCurplayer('X');
    setWinner('');
    let temp = [...moves];
    temp=[];
    setMoves(temp);
    temp=[...history];
    temp=[];
    setHistory(temp);
  }

  //To declare the winner
  useEffect(() => {
    winningCombination.forEach((e)=>{
      if(moves[e[0]] && moves[e[1]] && moves[e[2]] && moves[e[0]] === moves[e[1]] && moves[e[1]] === moves[e[2]]){
        setWinner( moves[e[1]]);
        alert(`The winner of this game is ${moves[e[1]]}`);
        }
      let tempdata = [...history];
      tempdata.push(moves);
      setHistory(tempdata);
      }); 
    },[curplayer]
  );

  return (
    <div className="App">
      <div className="row">
        <div className="col" onClick={()=>changePlayer(0)}>{moves[0]}</div>
        <div className="col" onClick={()=>changePlayer(1)}>{moves[1]}</div>
        <div className="col" onClick={()=>changePlayer(2)}>{moves[2]}</div>
      </div>

      <div className="row">
        <div className="col" onClick={()=>changePlayer(3)}>{moves[3]}</div>
        <div className="col" onClick={()=>changePlayer(4)}>{moves[4]}</div>
        <div className="col" onClick={()=>changePlayer(5)}>{moves[5]}</div>
      </div>

      <div className="row">
        <div className="col" onClick={()=>changePlayer(6)}>{moves[6]}</div>
        <div className="col" onClick={()=>changePlayer(7)}>{moves[7]}</div>
        <div className="col" onClick={()=>changePlayer(8)}>{moves[8]}</div>
      </div>
      <div>
      {
        history.map((e,i)=>{
          return <button id={i} onClick={()=>historyFunction(e)}>step {i}</button>
        })
      }
      </div>
      <button id="reset" onClick={resetGame}>Reset</button>
    </div>
  );
}

export default App;
