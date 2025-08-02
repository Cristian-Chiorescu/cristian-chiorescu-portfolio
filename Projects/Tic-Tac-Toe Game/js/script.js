const statusDisplay = document.getElementById("status-display")
const gameBoard = document.getElementById("game-board")
const resetButton = document.getElementById("reset-button")
const cells = document.querySelectorAll(".cell")
document.getElementById('current-year').textContent = new Date().getFullYear();


let gameArray = ["","","","","","","","","",]
let currentPlayer = "X"
let isGameActive = true


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
    winningConditions.forEach((array) =>{
        if(gameArray[array[0]]=== gameArray[array[1]]&&
            gameArray[array[0]]=== gameArray[array[2]]&&
            gameArray[array[0]]!== ""
        ){
            isGameActive = false
            resetButton.removeAttribute("hidden")
            statusDisplay.classList.remove("turn-x")
            statusDisplay.classList.remove("turn-o")
            statusDisplay.classList.add("highlight")
            statusDisplay.textContent=`${currentPlayer} is the winner!`
            if(currentPlayer==="X"){
                statusDisplay.classList.add("turn-x")
                
               
            }
            else{
                statusDisplay.classList.add("turn-o")
             
        }
        }
        else if(!gameArray.includes("")){
            isGameActive = false
            resetButton.removeAttribute("hidden")
            statusDisplay.classList.add("highlight")
            statusDisplay.style.backgroundColor = "var(--text-color)"
            statusDisplay.textContent=`It's a draw!`
        }
    })
}


cells.forEach((cell)=>{
   cell.addEventListener("click", ()=>{
    const clickedCellIndex = cell.dataset.cellIndex
    if(isGameActive && gameArray[clickedCellIndex] === ""){
        gameArray[clickedCellIndex] = currentPlayer
        cell.textContent = currentPlayer
        cell.classList.add(`${currentPlayer.toLowerCase()}-played`)

        checkResult()
        if(currentPlayer==="X" && isGameActive === true){
            currentPlayer = "O"
            statusDisplay.classList.remove("turn-x")
            statusDisplay.classList.add("turn-o")
        }
        else if(currentPlayer = "O" && isGameActive === true){
            currentPlayer = "X"
            statusDisplay.classList.remove("turn-o")
            statusDisplay.classList.add("turn-x")
        }
        if(isGameActive === true){
            statusDisplay.textContent = `${currentPlayer}'s turn to make a move...`
        }
    }
    else{
        return
    }
}) 
})


resetButton.addEventListener("click", ()=>{
    gameArray = ["","","","","","","","","",]
    cells.forEach((cell)=>{
        cell.textContent = ""
        cell.classList.remove("x-played")
        cell.classList.remove("o-played")
    })
    statusDisplay.classList.remove("highlight")
    statusDisplay.style.backgroundColor = ""
    statusDisplay.classList.remove("turn-o")
    statusDisplay.classList.add("turn-x")
    currentPlayer = "X"
    statusDisplay.textContent = `${currentPlayer}'s turn to make a move...`
    resetButton.setAttribute("hidden", "")
    isGameActive = true
})
