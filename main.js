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
const blindModeBtn = document.querySelector('#blind-mode__btn')

let nineXNineMode = false;
let blindMode = false;
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
        playerIndicator.classList.remove("player-indicator--player2");
        playerIndicator.classList.add("player-indicator--player2");
        playerOneScoreWrap.classList.remove('player_wrap--active');
        playerTwoScoreWrap.classList.add('player_wrap--active');
    }
}

switchPlayer();


function takeTurn () {
    turnCount++;
    event.target.removeEventListener('click', takeTurn); 
    let token = document.createElement('p');
    token.textContent = currentTurn.token;
    event.target.dataset.click = currentTurn.name;
    this.appendChild(token);
    if(!nineXNineMode){
        this.style.backgroundColor = currentTurn.color;
    }
    checkWinningConditions();
    switchPlayer()
}


const createBoard = () => {
    for (let i = 0; i < 9; i ++){
        const boardGridItem = document.createElement('div');
        boardGridItem.classList.add('board__grid-item');
        if (!nineXNineMode) {
            boardGridItem.addEventListener('click', takeTurn);
            boardGridItem.classList.add("board__grid-item--complete")
        }
        boardWrapper.appendChild(boardGridItem);
    }
}

createBoard();

let pureBoardGridItems = document.querySelectorAll('.board__grid-item')
let boardGridItems = Array.from(pureBoardGridItems);

const gridItemsMouse = () => {
    pureBoardGridItems = document.querySelectorAll('.board__grid-item')
    if(!nineXNineMode) {
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
                if(this.textContent.length ===0 || blindMode ){
                    this.style.backgroundColor = "white";
                }
                this.style.transform = "none";
                this.style.boxShadow= "none"
            })
        })
    }
    
}

gridItemsMouse();



const createMiniBoard = () => {
    pureBoardGridItems = document.querySelectorAll('.board__grid-item')
    boardGridItems = Array.from(pureBoardGridItems);
    boardGridItems.forEach(function(el){
        for (let i = 0; i < 9; i ++){
            const miniBoardGridItem = document.createElement('div');
            miniBoardGridItem.classList.add('board__grid-item--mini');
            el.appendChild(miniBoardGridItem);
            if (nineXNineMode) {
                miniBoardGridItem.addEventListener('click', takeTurn);
            }
        }
    })
    
};

if (nineXNineMode) {
    createMiniBoard();
}


const pureMiniBoardGridItems = document.querySelectorAll('.board__grid-item--mini')
const miniBoardGridItems = Array.from(pureMiniBoardGridItems);
const miniBoardArr = () => {
    let arr = [];
    for (let i = 0; i < miniBoardGridItems.length; i += 9) {
        arr.push(miniBoardGridItems.slice(i, i+9))
    }
    return arr;
}

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
   if(nineXNineMode){
        miniBoardArr().forEach(function(el){
            el.generateWinningConditions().forEach(function(el,index,arr){
                if(el.every(e => e.textContent === el[0].textContent && e.textContent.length > 0)){
                    console.log(`${currentTurn.name} wins`);
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
        if(el.every(e => e.textContent === el[0].textContent && e.textContent.length > 0)){
            boardGridItems[index].innerHTML = `${currentTurn.token}`;
            console.log(`${currentTurn.name} wins all`);
            currentTurn.score ++;
            boardWrapper.classList.add('board-wrapper--complete');
            boardWrapper.textContent = `${currentTurn.name} wins`;
            console.log(currentTurn.score)
            playerOneScore.textContent = `${playerOne.name}: ${playerOne.score}`;
            playerTwoScore.textContent = `${playerTwo.name}: ${playerTwo.score}`;
        }
    });
    
}

const startGame = () => {
    document.querySelector('.hero').style.visibility = "hidden";
    playerOneScore.textContent = `${playerOne.name}: ${playerOne.score}`;
    playerTwoScore.textContent = `${playerTwo.name}: ${playerTwo.score}`;
    playerOneScore.appendChild(playerIndicator);
}

document.querySelector('#normal-mode__btn').addEventListener('click', startGame)
document.querySelector('#ninex-mode__btn').addEventListener('click', function(){
    nineXNineMode = true;
    startGame();
});
document.querySelector('#blind-mode__btn').addEventListener('click', function(){
    blindMode = true;
    startGame();
})

const resetGame = () => {
    boardWrapper.classList.remove('board-wrapper--complete')
    boardWrapper.innerHTML ="";
    createBoard();
    gridItemsMouse();
    if (nineXNineMode) {
        createMiniBoard();
    }
    turnCount = 0;
    switchPlayer();
};


resetButton.addEventListener('click', resetGame)
