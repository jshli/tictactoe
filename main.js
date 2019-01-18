const playerOneScoreWrap = document.querySelector('#playerOne-score');
const playerTwoScoreWrap = document.querySelector('#playerTwo-score');
const boardWrapper = document.querySelector('.board-wrapper');
const playerIndicator = document.querySelector('.player-indicator');
const resetButton = document.querySelector('#resetBtn');
const playerOneScore = document.querySelector('#playerOne-score');
const playerTwoScore = document.querySelector('#playerTwo-score');
const nameInputForm = document.querySelector('#name-input-form');
const normalModeBtn = document.querySelector('#normal-mode__btn');
const nineXModeBtn = document.querySelector('#ninex-mode__btn');
const blindModeBtn = document.querySelector('#blind-mode__btn');
const gameStatusHeader = document.querySelector('#game-instructions__header');
const scoreBoardWrap = document.querySelector('.score-board__wrap');
const newGameBtn = document.querySelector('#new-game-btn');
const settingsPage = document.querySelector('#settings-section');
const gameSwitchWrapper = document.querySelector('.game-mode-switch__wrapper');
const settingsButton = document.querySelector('#settings-btn');
const closeSettingsButton = document.querySelector('#close-btn');

const gameModes = [
    {
        name:"Normal", 
        instructions: "Just normal fucking tic tac toe. Get three in a row to win."
    },
    {
        name:"9x9",
        instructions: "Win a small box to claim a big box. Get three big boxes in a row. Fucking easy."
    },
    {
        name: "Blind",
        instructions:"Let's see you try winning when you can't see shit."
    }
];

let currentMode;
let currentTurn;
let turnCount = 0;

let playerOne = {
    name: "Josh",
    token: "X",
    score: 0,
    color: "#6dcff6"
}

let playerTwo = {
    name: "test",
    token: "O",
    score: 0,
    color: "#F7869C"
}


const randomNames = ["Bob", "Laquisha", "Jane", "Derp", "Ronald","Dude", "Thaddeus", "Ping", "Noot Noot", "Morty"]

randomNameGenerator = () => {
    playerTwo.name = randomNames[Math.floor(Math.random()*randomNames.length)];
}

settingsButton.addEventListener('click', function(){
    settingsPage.style.transform = "translateY(0%)";
    closeSettingsButton.style.visibility = "visible";
})

closeSettingsButton.addEventListener('click', function(){
    settingsPage.style.transform = "translateY(120%)";
    
})

const createModeSwitches = () => {
    gameModes.forEach(function(el){
       let modeSwitch = document.createElement('button');
        modeSwitch.classList.add('mode-switch');
        modeSwitch.textContent = el.name;
        console.log(el)
        if (el === currentMode){
            modeSwitch.classList.add('mode-switch--active')
        }
        gameSwitchWrapper.appendChild(modeSwitch);
        modeSwitch.addEventListener('click',switchGameMode)
    })
}

function switchGameMode() {
    closeSettingsButton.style.visibility = "hidden";
    currentMode = gameModes[gameModes.findIndex(e => e.name === event.target.textContent)];
    document.querySelectorAll('.mode-switch').forEach(function(el){
        if (el.textContent === currentMode.name){
            el.classList.add('mode-switch--active')
        } else {
            el.classList.remove('mode-switch--active')
        }
    })
}


nameInputForm.addEventListener('submit',function(event){
    event.preventDefault()
    if ((document.querySelector('input').value).length > 0) {
        playerOne.name = document.querySelector('input').value;
        document.querySelector('.carousel-control-next-icon').click();
    }
    randomNameGenerator();
    document.querySelector('#player-two-name').textContent = `Player two, no-one really cares what your name is. So from now on, you'll just be referred to as...${playerTwo.name}.`
})


const switchPlayer = () =>{
    if (turnCount % 2 === 0 || turnCount === 0){
        currentTurn = playerOne
        playerOneScoreWrap.classList.add('player_wrap--active');
        playerIndicator.classList.remove("player-indicator--player2");
        playerTwoScoreWrap.classList.remove('player_wrap--active');
    } else {
        currentTurn = playerTwo;
        playerIndicator.classList.add("player-indicator--player2");
        playerOneScoreWrap.classList.remove('player_wrap--active');
        playerTwoScoreWrap.classList.add('player_wrap--active');
    }
}


function takeTurn () {
    turnCount++;
    event.target.removeEventListener('click', takeTurn); 
    let token = document.createElement('p');
    token.textContent = currentTurn.token;
    event.target.dataset.click = currentTurn.name;
    this.appendChild(token);
    if(currentMode === gameModes[1]){
        this.style.backgroundColor = currentTurn.color;
    }
    checkWinningConditions();
    switchPlayer()
}


const createBoard = () => {
    for (let i = 0; i < 9; i ++){
        const boardGridItem = document.createElement('div');
        boardGridItem.classList.add('board__grid-item');
        if (currentMode !== gameModes[1]) {
            boardGridItem.addEventListener('click', takeTurn);
            boardGridItem.classList.add("board__grid-item--complete")
        }
        boardWrapper.appendChild(boardGridItem);
    }
}



let pureBoardGridItems = document.querySelectorAll('.board__grid-item')
let boardGridItems = Array.from(pureBoardGridItems);

const createMiniBoard = () => {
    pureBoardGridItems = document.querySelectorAll('.board__grid-item')
    boardGridItems = Array.from(pureBoardGridItems);
    boardGridItems.forEach(function(el){
        for (let i = 0; i < 9; i ++){
            const miniBoardGridItem = document.createElement('div');
            miniBoardGridItem.classList.add('board__grid-item--mini');
            el.appendChild(miniBoardGridItem);
            if (currentMode === gameModes[1]) {
                miniBoardGridItem.addEventListener('click', takeTurn);
            }
        }
    }) 
};


let pureMiniBoardGridItems = document.querySelectorAll('.board__grid-item--mini')
let miniBoardGridItems = Array.from(pureMiniBoardGridItems);
const miniBoardArr = () => {
    let arr = [];
    for (let i = 0; i < miniBoardGridItems.length; i += 9) {
        arr.push(miniBoardGridItems.slice(i, i+9))
    }
    return arr;
}



const gridItemsMouse = () => {
    pureBoardGridItems = document.querySelectorAll('.board__grid-item');
    boardGridItems = Array.from(pureBoardGridItems);
    if(currentMode !== gameModes[1]) {
        pureBoardGridItems.forEach(function(el){
            el.addEventListener("mouseover", function(event){
                if(this.textContent.length === 0 ){
                    this.style.backgroundColor = currentTurn.color;
                    this.style.borderColor = currentTurn.color;
                    this.style.transform = "scale(1.3 ,1.3);"
                    currentTurn === playerOne ? this.style.boxShadow= "0 0 40px rgba(109, 207, 246, 0.8)" : this.style.boxShadow= "0 0 40px rgba(247, 134, 156, 0.8)"
                }
            })
        })
        pureBoardGridItems.forEach(function(el){
            el.addEventListener("mouseout", function(event){
                this.style.borderColor = "#333";
                if(this.textContent.length ===0 || currentMode == gameModes[2]){
                    this.style.backgroundColor = "white";
                }
                this.style.transform = "none";
                this.style.boxShadow= "none"
            })
        })
    } 
    pureMiniBoardGridItems = document.querySelectorAll('.board__grid-item--mini');
    miniBoardGridItems = Array.from(pureMiniBoardGridItems);
    pureMiniBoardGridItems.forEach(function(el){
        el.addEventListener("mouseover", function(event){
            if(this.textContent.length === 0){
                this.style.backgroundColor = currentTurn.color;
                this.style.borderColor = currentTurn.color;
                this.style.transform = "scale(1.3 ,1.3);"
                currentTurn === playerOne ? this.style.boxShadow= "0 0 40px rgba(109, 207, 246, 0.8)" : this.style.boxShadow= "0 0 40px rgba(247, 134, 156, 0.8)"
            }
        })
    })
    pureMiniBoardGridItems.forEach(function(el){
        el.addEventListener("mouseout", function(event){
            this.style.backgroundColor = "white";
            this.style.borderColor = "#ccc";
            this.style.transform = "none";
            this.style.boxShadow= "none"
        })
    })
}


//returns an array with all the combinations
Array.prototype.generateWinningConditions = function () {
    let arr = [];
    //horizontal checks
    for (let i = 0; i < this.length; i+= 3){
        arr.push(this.slice(i, i + 3));
    }

    //vertical checks

    for (let i = 0; i < 3; i++){
        let arr2 = [];
        for (let j = i; j < this.length; j+= 3){
            arr2.push(this[j])
        }
        arr.push(arr2)
    }

    //diagonal checks

    for (let i = 0; i < this.length; i+=this.length){
        let arr2 = []
        for (let j = 0; j <this.length; j++){
            if (j % 4 === 0){
                arr2.push(this[j])
            }
        }
        arr.push(arr2);
    };

    for (let i = 2; i < this.length; i+=this.length){
        let arr2 = []
        for (let j = 2; j < 7; j++){
            if (j % 2 === 0){
                arr2.push(this[j])
            }
        }
        arr.push(arr2);
    };
    return arr;
}



const checkWinningConditions = () => {
    if(currentMode === gameModes[1]){
        pureMiniBoardGridItems = document.querySelectorAll('.board__grid-item--mini')
        miniBoardGridItems = Array.from(pureMiniBoardGridItems);
        miniBoardArr().forEach(function(el){
            el.generateWinningConditions().forEach(function(el,index,arr){
                if(el.every(e => e.textContent === el[0].textContent && e.textContent.length > 0)){
                    console.log(arr);
                    arr.forEach(function(el){
                        el.forEach(function(e){
                                e.textContent = "";
                        })
                    })
                    arr[0][0].parentNode.classList.add("board__grid-item--complete")
                    arr[0][0].parentNode.style.backgroundColor = currentTurn.color;
                    arr[0][0].parentNode.textContent = `${currentTurn.token}`;
                }
            });
        })
    }
   
    boardGridItems.generateWinningConditions().forEach(function(el,index,arr){
        if(el.every(e => e.textContent === el[0].textContent && e.textContent.length > 0 && e.classList.contains('board__grid-item--complete'))){
            boardGridItems[index].innerHTML = `${currentTurn.token}`;
            console.log(`${currentTurn.name} wins all`);
            currentTurn.score ++;
            boardWrapper.classList.add('board-wrapper--complete');
            gameStatusHeader.textContent = `${currentTurn.name} wins. Now run that shit again.`;
            boardWrapper.style.backgroundColor = currentTurn.color;
            boardWrapper.textContent = `${currentTurn.token}`;
            console.log(currentTurn.score)
            playerOneScore.textContent = `${playerOne.name}: ${playerOne.score}`;
            playerTwoScore.textContent = `${playerTwo.name}: ${playerTwo.score}`;
        } 
        
    });
    if (boardGridItems.every(e => e.textContent.length > 0)){
        gameStatusHeader.textContent = `Well shit, it's a tie.`
    }
}

createModeSwitches();
const startGame = () => {
    turnCount = 0;
    boardWrapper.classList.remove('board-wrapper--complete')
    boardWrapper.style.backgroundColor = "white";
    boardWrapper.innerHTML ="";
    playerOne.score = 0;
    playerTwo.score = 0;
    switchPlayer();
    createBoard();
    if (currentMode === gameModes[1]) {
        createMiniBoard();
    }
    scoreBoardWrap.appendChild(playerIndicator);
    gridItemsMouse();
    document.querySelector('.hero').style.visibility = "hidden";
    playerOneScore.textContent = `${playerOne.name}: ${playerOne.score}`;
    playerTwoScore.textContent = `${playerTwo.name}: ${playerTwo.score}`;
    gameStatusHeader.textContent = `${currentMode.instructions}`;
}


document.querySelector('#normal-mode__btn').addEventListener('click', function(){
    currentMode = gameModes[0];
    startGame();
})
document.querySelector('#ninex-mode__btn').addEventListener('click', function(){
    currentMode = gameModes[1];
    startGame();
    
});
document.querySelector('#blind-mode__btn').addEventListener('click', function(){
    currentMode = gameModes[2];
    startGame();
})

const resetGame = () => {
    boardWrapper.classList.remove('board-wrapper--complete')
    boardWrapper.style.backgroundColor = "white";
    boardWrapper.innerHTML ="";
    createBoard();
    if (currentMode === gameModes[1]) {
        createMiniBoard();
    }
    gridItemsMouse();
    gameStatusHeader.textContent = currentMode.instructions;
    turnCount = 0;
    switchPlayer();
};

resetButton.addEventListener('click', resetGame)
newGameBtn.addEventListener('click', function(){
    settingsPage.style.transform = 'translateY(100%)';
    startGame();
});