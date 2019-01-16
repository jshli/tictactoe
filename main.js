let insaneMode = true;
let currentTurn;
let turnCount = 0;

let playerOne = {
    name: "Josh",
    token: "X"
}

let playerTwo = {
    name: "test",
    token: "O"
}



function takeTurn () {
    turnCount++;
    turnCount % 2 !== 0 ? currentTurn = playerOne:currentTurn = playerTwo;
    event.target.removeEventListener('click', takeTurn); 
    let token = document.createElement('p');
    token.textContent = currentTurn.token;
    event.target.dataset.click = currentTurn.name;
    this.appendChild(token);

    checkWinningConditions();
}


const createBoard = () => {
    for (let i = 0; i < 9; i ++){
        const boardGrid = document.querySelector('.board-wrapper');
        const boardGridItem = document.createElement('div');
        boardGridItem.classList.add('board__grid-item');
        if (!insaneMode) {
            boardGridItem.addEventListener('click', takeTurn);
        }
        boardGrid.appendChild(boardGridItem);
    }
}


createBoard();

const pureBoardGridItems = document.querySelectorAll('.board__grid-item')
const boardGridItems = Array.from(pureBoardGridItems);



const createMiniBoard = () => {
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
                console.log(arr);
                arr.forEach(function(el){
                   el.forEach(function(e){
                        e.textContent = "";
                   })
                })
                arr[0][0].parentNode.textContent = `${currentTurn.token}`;
            }
        });
    })
    boardGridItems.generateWinningConditions().forEach(function(el,index,arr){
        if(el.every(e => e.textContent === el[0].textContent && e.textContent.length > 0)){
            boardGridItems[index].innerHTML = `${currentTurn.token}`;
            console.log(`${currentTurn.name} wins all`);
            
        }
    });
    
}


