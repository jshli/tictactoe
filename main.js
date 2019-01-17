const playerOneScoreWrap = document.querySelector('#playerOne-score');
const playerTwoScoreWrap = document.querySelector('#playerTwo-score');
const boardWrapper = document.querySelector('.board-wrapper');
const playerIndicator = document.querySelector('.player-indicator');
const resetButton = document.querySelector('#resetBtn');

let insaneMode = true;
let currentTurn;
let turnCount = 0;

let playerOne = {
    name: "Josh",
    token: "X",
    score: 0,
}

let playerTwo = {
    name: "test",
    token: "O",
    score: 0
}


const switchPlayer = () =>{
    if (turnCount % 2 === 0 ){
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
    switchPlayer()
    turnCount++;
    // turnCount % 2 !== 0?currentTurn = playerOne :currentTurn = playerTwo;
    // playerIndicator.classList.toggle("player-indicator--player2");
    // playerOneScoreWrap.classList.toggle('player_wrap--active');
    // playerTwoScoreWrap.classList.toggle('player_wrap--active');
    
    event.target.removeEventListener('click', takeTurn); 
    let token = document.createElement('p');
    token.textContent = currentTurn.token;
    event.target.dataset.click = currentTurn.name;
    this.appendChild(token);
    checkWinningConditions();
}


const createBoard = () => {
    for (let i = 0; i < 9; i ++){
        const boardGridItem = document.createElement('div');
        boardGridItem.classList.add('board__grid-item');
        if (!insaneMode) {
            boardGridItem.addEventListener('click', takeTurn);
        }
        boardWrapper.appendChild(boardGridItem);
    }
}


createBoard();

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
            if (insaneMode) {
                miniBoardGridItem.addEventListener('click', takeTurn);
            }
        }
    })
    
};

createMiniBoard();


const resetGame = () => {
    boardWrapper.innerHTML ="";
    createBoard();
    createMiniBoard();
    turnCount = 0;
    switchPlayer();
};

const pureMiniBoardGridItems = document.querySelectorAll('.board__grid-item--mini')
const miniBoardGridItems = Array.from(pureMiniBoardGridItems);
const miniBoardArr = () => {
    let arr = [];
    for (let i = 0; i < miniBoardGridItems.length; i += 9) {
        arr.push(miniBoardGridItems.slice(i, i+9))
    }
    return arr;
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
    let gameWon = false;
    
    //mini grid functions
   
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
                arr[0][0].parentNode.textContent = `${currentTurn.token}`;
                
            }
        });
    })
    boardGridItems.generateWinningConditions().forEach(function(el,index,arr){
        if(el.every(e => e.textContent === el[0].textContent && e.textContent.length > 0)){
            boardGridItems[index].innerHTML = `${currentTurn.token}`;
            console.log(`${currentTurn.name} wins all`);
            currentTurn.score ++;
            boardWrapper.classList.add('board-wrapper--complete');
            boardWrapper.textContent = `${currentTurn.name} wins`;
            console.log(currentTurn.score)
        }
    });
    
}


resetButton.addEventListener('click', resetGame)