const statusDisplay = document.getElementById("status-display")
const gameBoard = document.getElementById("game-board")
const resetButton = document.getElementById("reset-button")
const cells = document.querySelectorAll(".cell")
const gameContainer = document.getElementById("outer-container")
const selectionScreen = document.getElementById("selection-screen")
const vsPlayer = document.getElementById("vs-player")
const vsComp = document.getElementById("vs-comp")
document.getElementById('current-year').textContent = new Date().getFullYear();


let gameArray = ["","","","","","","","","",]
let currentPlayer = "X"
let isGameActive = true
let isVsComputer


statusDisplay.textContent = `${currentPlayer}'s turn to make a move...`
statusDisplay.classList.add("turn-x")


const winningConditions = [
    [0, 1, 2], //Row 1
    [3, 4, 5], //Row 2
    [6, 7, 8], //Row 3
    [0, 3, 6], //Column 1
    [1, 4, 7], //Column 2
    [2, 5, 8], //Column 3
    [0, 4, 8], //Diagonal 1
    [2, 4, 6], //Diagonal 2
]


const checkResult = () => {
    let roundWon = false
    for(const array of winningConditions){
        if(gameArray[array[0]]=== gameArray[array[1]]&&
            gameArray[array[0]]=== gameArray[array[2]]&&
            gameArray[array[0]]!== ""
        ){
            roundWon = true
            isGameActive = false
            let winningArray = array
            winningArray.forEach((index)=>{
                const cell = document.querySelector(`[data-cell-index="${index}"]`)
                cell.classList.add("highlight")
            })
            resetButton.removeAttribute("hidden")
            statusDisplay.classList.remove("turn-x")
            statusDisplay.classList.remove("turn-o")
            statusDisplay.classList.remove("draw")
            statusDisplay.classList.add("highlight")
            statusDisplay.textContent=`${currentPlayer} is the winner!`
            if(currentPlayer==="X"){
                statusDisplay.classList.add("turn-x")
                
               
            }
            else{
                statusDisplay.classList.add("turn-o")
             
        }
        break
        }
        if(roundWon=== false && !gameArray.includes("")){
            isGameActive = false
            resetButton.removeAttribute("hidden")
            statusDisplay.classList.add("highlight")
            statusDisplay.classList.add("draw")
            statusDisplay.textContent=`It's a draw!`
        }
    }
    console.log(statusDisplay.classList)
}

vsPlayer.addEventListener("click", ()=>{
    selectionScreen.setAttribute("hidden", "")
    gameContainer.removeAttribute("hidden")
    isVsComputer = false
    isGameActive = true
})

vsComp.addEventListener("click", ()=>{
    selectionScreen.setAttribute("hidden", "")
    gameContainer.removeAttribute("hidden")
    isVsComputer = true
    isGameActive = true
})


const handleMove = (cellIndex) => {
    gameArray[cellIndex] = currentPlayer
    const cell = document.querySelector(`[data-cell-index="${cellIndex}"]`);
    cell.textContent = currentPlayer
    cell.classList.add(`${currentPlayer.toLowerCase()}-played`)
    checkResult()
}

const switchPlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O":"X"
    statusDisplay.textContent = `${currentPlayer}'s turn to make a move...`
    if(currentPlayer==="X"){
        statusDisplay.classList.remove("turn-o")
            statusDisplay.classList.add("turn-x")
    }
    else{
        statusDisplay.classList.remove("turn-x")
            statusDisplay.classList.add("turn-o")
    }
}

const computerTurn = () => {
    let emptyIndices = []
        gameArray.forEach((cell, index) =>{
        if(cell === ""){
                    emptyIndices.push(index)
                }
            })
        const randomIndex = Math.floor(Math.random() * emptyIndices.length)
            const chosenCellIndex = emptyIndices[randomIndex]
            handleMove(chosenCellIndex)
            if(isGameActive === true){
                switchPlayer()
            }
}

const handleCellClick = (clickedCell) => {
   const clickedCellIndex = clickedCell.dataset.cellIndex
    
   if(isGameActive === false || gameArray[clickedCellIndex] !== ""){
    return
   }

   handleMove(clickedCellIndex)

   if(isGameActive === true){
    switchPlayer()
    if(isVsComputer && currentPlayer === "O" && isGameActive === true){
        gameBoard.classList.add("board-locked")
        setTimeout(()=>{
            computerTurn()
            gameBoard.classList.remove("board-locked")
        }, 750)
        
    }
   }
}


cells.forEach((cell)=>{
   cell.addEventListener("click", ()=>{
    handleCellClick(cell)
   }) 
})


resetButton.addEventListener("click", ()=>{
    gameArray = ["","","","","","","","","",]
    cells.forEach((cell)=>{
        cell.textContent = ""
        cell.classList.remove("x-played", "o-played", "highlight")
    })
    statusDisplay.classList.remove("highlight", "turn-x", "turn-o", "draw")
    statusDisplay.style.backgroundColor = ""

    statusDisplay.classList.add("turn-x")
    currentPlayer = "X"
    statusDisplay.textContent = `${currentPlayer}'s turn to make a move...`
    resetButton.setAttribute("hidden", "")
    selectionScreen.removeAttribute("hidden")
    gameContainer.setAttribute("hidden", "")
})
