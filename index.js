let signPlayed 
let counter = 0

const scores = {
    "X": 0,
    "0": 0
}

const boxValues = {}

function placeMarker (event){
    
    if(counter%2 === 0){
        signPlayed = 'X'
    }
    else signPlayed = '0'
    
    const clickedButton = event.target
    
    const clickedSquare = clickedButton.parentElement
    
    const marker = document.createElement('p')

    marker.className = "marker"
    
    const textNode = document.createTextNode(signPlayed)
    
    marker.appendChild(textNode)
    
    clickedSquare.appendChild(marker)
    
    clickedSquare.replaceChild(marker, clickedButton)

    getBoxValues()

    checkWinner(signPlayed)
    
    counter ++

}

function getBoxValues() {
    const allBoxes = document.getElementsByClassName("grid-box")
    const boxesArray = [...allBoxes]
    boxesArray.forEach((box, index) => {
        if (box.firstElementChild.innerText === "X") {
            boxValues[index] = "X"
        }
        else if (box.firstElementChild.innerText === "0") {
            boxValues[index] = "0"
        }
    })
}

function checkWinner(signPlayed) {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    winningCombos.forEach(combo => {
        if (boxValues[combo[0]] === signPlayed && boxValues[combo[1]] === signPlayed && boxValues[combo[2]] === signPlayed) {
            console.log(`${signPlayed} WINS THE GAME!`)
            updateScores(signPlayed)
            resetGame()
        }
    })

}

function updateScores(signPlayed) {
    scores[signPlayed]++

    let scoreToUpdate

    if (signPlayed === "X") {
        scoreToUpdate = document.getElementById("player-x")
    } else {
        scoreToUpdate = document.getElementById("player-0")
    }
    scoreToUpdate.innerText = signPlayed + " Score: " + scores[signPlayed]

    
}

function resetGame() {
    const allBoxes = document.getElementsByClassName("grid-box")
    const boxesArray = [...allBoxes]
    boxesArray.forEach(box => {
        const boxContents = box.firstElementChild
        const button = document.createElement("button")
        button.className = "play-button"
        button.addEventListener("click", placeMarker)
        box.appendChild(button)
        box.replaceChild(button, boxContents)
    })
    for (let value in boxValues) {
        boxValues[value] = ""
    }
}