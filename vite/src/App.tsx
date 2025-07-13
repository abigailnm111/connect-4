import { useState } from 'react'

import './App.css'

const SpotStatus={
  "RED":1,
  "BLACK":2,
  "EMPTY":0
}

function Board() {

  
  const[board, setBoard]= useState(null);
  const [player, setPlayer]= useState(null)
  const [blackTurn, setBlackTurn]= useState(true)
  const [winner, setWinner]= useState(false);


  if(board ===null){
    fetch('http://localhost:3000/getInitialBoard')
      .then(response => response.json())
      .then(json =>  { setBoard(json.board); setPlayer(json.playerId); })
      .catch(error => console.error(error));}
  function checkWinner(filledSpot:number[]){
    const colorToCheck= blackTurn?SpotStatus.BLACK: SpotStatus.RED;
    let hOptions=0;
    let vOptions=0;
    let rdOptions=0;
    let ldOptions=0;
    let [r, c]= filledSpot

    for(let i=c; i<6; i++){
      if(board[r][i]=== colorToCheck) {hOptions++
      }else{break;};
    }
    for(let i=c-1; i>=0; i--){
      if(board[r][i]=== colorToCheck) {hOptions++}else{break;};
    }
    if(hOptions===4) {return true}


    for(let i=r; i<6; i++){
      if(board[i][c]=== colorToCheck) {vOptions++}else{break;};
    }
    if(vOptions===4) {return true}
    
    
  for(let i=0; i+r<6 && c+i<7; i++){
    if(board[r+i][c+i]=== colorToCheck) {rdOptions++}else{break;};
  }
  for(let i=1; r-i>=0 && c+i>=0; i++){
    if(board[r-i][c-i]=== colorToCheck) {rdOptions++}else{break;};

  }
  if(rdOptions===4) {return true}
    for(let i=0; r-i>=0 && c+i<7; i++){
    if(board[r-i][c+i]=== colorToCheck) {ldOptions++}else{break;};
  }
  for(let i=1; i+r<6 && c-i>=0; i++){
    if(board[r+i][c-i]=== colorToCheck) {ldOptions++}else{break;};
  }
  if (ldOptions===4){return true}
  return false;
    }

  

    function handleClick(location){
      if(winner===true) return;
    fetch('http://localhost:3000/takeTurn', {method: "POST", body:JSON.stringify({location, player})})
      .then(response => response.json())
      .then(json =>  { 
        setBoard(json.newSpots); 
        setWinner(json.winner); 
        setBlackTurn(json.nextTurn)
        })
      .catch(error => console.error(error));
  }

  function Square({ location, value, handleClick }){
    let colorValue="empty";
    if(value=== SpotStatus.BLACK) {colorValue="black"}else if(value=== SpotStatus.RED){colorValue="red"}

  return <span id={colorValue} className={"spot"}onClick={()=>handleClick( location)} ></span>
  }

  return (
  
  <div className={'board'}>
    <div>{winner&& <span className='winner'>{blackTurn?"Black":"Red"} is the Winner!</span>}</div>
  {board &&board.map((row, i)=> {
    return <div className="row" key={i}>
      {row.map((spot, i)=>{
        return <Square key={i} location={i} value={spot} handleClick={handleClick}/>}
      )
      }
      </div> }
      )
  }

</div>
  );
}

function App() {


  return (<>
<Board/>
</>
  );
}

export default App
