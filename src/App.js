import './App.css';
import React from "react"
import Square from './Square';
const winningPatterns = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [3,5,7]
]
function App() {
  const [board, setBoard] = React.useState([
    {id:1, text: ""},
    {id:2, text: ""},
    {id:3, text: ""},
    {id:4, text: ""},
    {id:5, text: ""},
    {id:6, text: ""},
    {id:7, text: ""},
    {id:8, text: ""},
    {id:9, text: ""},
  ]);

  const [isTurn, setIsTurn] = React.useState(false)
  const [gameWon, setGameWon] = React.useState(false)
  const [catsGame, setCatsGame] = React.useState(false)
  // I only want to run this once
  // React.useEffect(() => {
  //   setBoard(prevBoard => (
  //     prevBoard.map(prevVal => ({...prevVal, text: Math.random()>.5 ? 'x' : 'o'}))
  //   ))
  // }, []) // so empty dependencies array
  
  function select(id){
    if(gameWon || board[id-1].text !== '') {
      return;  
    }
    let playerIcon = isTurn ? 'X' : 'O'
    setBoard(prevBoard => (
      prevBoard.map(prevVal => ({...prevVal, text: prevVal.id === id ? playerIcon : prevVal.text}))
    ))
  }

  // this is an annoying two middle man approach
  React.useEffect(() => {
    setIsTurn(!isTurn);
    checkWin()
    // uhoh cats game?
    const isNotEmpty = (text) => text !== "";
    const texts = board.map(curSquare => curSquare.text);
    if(texts.every(isNotEmpty)){
      setCatsGame(true);
    }
    
  }, [board])

  React.useEffect(() => {
    setIsTurn(!isTurn);
    setCatsGame(false);
    // I have to do two effect functions so it can change board, then checkWin, 
    // then update the turn at the end so it displays correctly.
  }, [gameWon])



  function checkWin(){
    winningPatterns.forEach(currPattern => {
      const player = board[currPattern[0]-1].text;
      if(player !== ""){
        let notWin = false
        currPattern.forEach(curId => {
          if(board[curId-1].text !== player){
            
            notWin = true
          }
        })
        if(!notWin){
          setGameWon(true)
          return true
        }
      }
    })
    return false
  }

  function clearBoard(){
    setCatsGame(false);
    setIsTurn(false)
    setGameWon(false)
    setBoard(prevBoard => (
      prevBoard.map(prevVal => ({...prevVal, text: ''}))
    ))
  }

  return (
    <div className="App">
      {catsGame ? <h1>Cat's Game, try again :)</h1> :
      <h1>Player {isTurn ? 'X' : 'O'} {gameWon ? 'Won!' : 'Turn'}</h1>}
 
      <div className='board'>
        {board.map(prevSquare => <Square key={prevSquare.id} 
                                        square={prevSquare} 
                                        select={select}
                                        isTurn={isTurn}/>)}
      </div>
      <button onClick={clearBoard}>New Game</button>
    </div>
  );
}

export default App;
