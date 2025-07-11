const { createServer } = require('node:http');
const hostname = '127.0.0.1';
const port = 3000;
const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


const playerBlack={id:2, inUse:false};
const playerRed={id:1, inUse:false};


const  makeMove=()=>{
    const newSpots= board;
      const turn= blackTurn? SpotStatus.BLACK: SpotStatus.RED
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
}

 function getInitialBoard(){
    if (playerBlack.inUse===false) {
        const player=playerBlack;
        playerBlack.inUse=true;
    }else if(playerRed.inUse=== false){
        const player= playerRed;
        playerRed.inUse
    }else{throw Error('All players already in use.')}
    const initialBoard=[];
  for(let i=0; i<6; i++){
    let row=[]
    for(let j=0; j<7; j++){
      row.push(SpotStatus.EMPTY)
    }
    initialBoard.push(row)
  }
  return [initialBoard, player.id];
}
