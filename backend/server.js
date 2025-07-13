const { createServer } = require('node:http');
const hostname = 'localhost';
const port = 3000;

const server = createServer((req, res) => {
  
  const path= req.url;
      if(path==="/getInitialBoard"){
        try{
        const[board, playerId]=getInitialBoard()
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({board:board, playerId:playerId}));
      }catch(error){
        throw new Error("Too many players.")
      }

      }else if(path==="/takeTurn"){
        try
        { let body=[];
          req.on('data', (chunk)=>{
            body.push(chunk);
          })
          req.on('end',()=>{
          const newBody=JSON.parse(body[0].toString());
          const location= newBody.location
          const player= Number(newBody.player)
          const[newSpots, filledSpot ]=makeMove(player, location);
          let nextTurn=blackTurn;
          if(tempWinner===false)nextTurn=!blackTurn;
          const winner= checkWinner(filledSpot);
          res.statusCode = 200;
          res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({winner, newSpots, nextTurn}));          })
      }catch(error){
        error("It's not your turn.")
      }
      }else if(path==="/clearGame"){
        //Used for development only
         playerBlack.inUse=false;
          playerRed.inUse=false;
          res.end('game cleared')
      }
      else{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World');}
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


const playerBlack={id:2, inUse:false};
const playerRed={id:1, inUse:false};
const blackTurn=true;
let board;

const SpotStatus={
  "RED":1,
  "BLACK":2,
  "EMPTY":0
}

function  makeMove(player, location){
    const newSpots= board;
      const turn= blackTurn ? SpotStatus.BLACK: SpotStatus.RED;
      const validTurn= Number(player)=== turn;
      if(!validTurn) throw Error("It's not your turn.")
      let i=5;
      let filled=0;
      let filledSpot=null;
      if(board[0][location]!== SpotStatus.EMPTY) return;
      while( i>=0 && filled===0){
        if(board[i][location]===SpotStatus.EMPTY){
          newSpots[i][location]=turn;
          filled++
          filledSpot=[i,location]
        }
        i--
      }
      board=newSpots
    return [newSpots,filledSpot ];
}

  function checkWinner(filledSpot){
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


 function getInitialBoard(){
  let player;
    if (playerBlack.inUse===false) {
         player=playerBlack;
        playerBlack.inUse=true;
    }else if(playerRed.inUse=== false){
         player= playerRed;
        playerRed.inUse=true;
    }else{throw Error('All players already in use.')}
    const initialBoard=[];
  for(let i=0; i<6; i++){
    let row=[]
    for(let j=0; j<7; j++){
      row.push(SpotStatus.EMPTY)
    }
    initialBoard.push(row)
  }
  board=initialBoard;
  return [initialBoard, player.id];
}
