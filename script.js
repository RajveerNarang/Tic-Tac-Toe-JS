const X_CLASS ='x'
const O_CLASS ='o'
const WinWays =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [2,5,8],
    [1,4,7],
    [0,4,8],
    [2,4,6]
]
const cellunits = document.querySelectorAll('[data-cell]')
const GameSpace = document.getElementById('GameSpace')
const winningMessageElement = document.getElementById('WinningMessage')
const restartbtn =document.getElementById('restartbt')
const winningMessageTextElement = document.querySelector('.data-winning')
let oTurn

startPlay()

restartbtn.addEventListener('click',startPlay)

function startPlay(){
    oTurn = true
    cellunits.forEach(cell =>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click',handleMark)
        cell.addEventListener('click',handleMark,{once:true})
    })
    setGameSpaceHowerClass()
    winningMessageElement.classList.remove('show')
}
function handleMark(e){
    const unit = e.target
    const currentClass = oTurn ? O_CLASS : X_CLASS
    console.log('Marked');
   placeMark(unit,currentClass)
   if(CheckWin(currentClass)){
    console.log('Winner')
    endplay(false)
   }else if(isDraw()){
       endplay(true)
   }
   else{
    swapChance()
   setGameSpaceHowerClass()
   }

   //place the Mark easiest
   //Check for win
   //Check for draw
   //Switch turns most important
   
}
function endplay(draw){
    if(draw){
        winningMessageTextElement.innerText = 'Draw!'
    } else{
        winningMessageTextElement.innerText = `${oTurn ? "O's":"X's"}Win!`
    }
    winningMessageElement.classList.add('show')
}
function isDraw(){
    return [...cellunits].every(cell=>{//does not have an every method cell units
        return cell.classList.contains(X_CLASS)||
        cell.classList.contains(O_CLASS)
    })
}

function placeMark(unit,currentClass){
    unit.classList.add(currentClass)
}
function swapChance(){
    oTurn = !oTurn
}
function setGameSpaceHowerClass(){
GameSpace.classList.remove(X_CLASS)
GameSpace.classList.remove(O_CLASS)
if(oTurn){
    GameSpace.classList.add(O_CLASS)
}
else{
    GameSpace.classList.add(X_CLASS)
}

}

function CheckWin(currentClass){
    return WinWays.some(Ways =>{
        return Ways.every(index =>{
            return cellunits[index].classList.contains(currentClass)
        } )
    })

}