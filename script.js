const matrixElement = document.getElementById('matrix');
const LINE_LENGTH = 6;
const COL_LENGTH = 7;
const matrix = [];
let counter = 0;
let tokenColor;
let winner = "";
let comboPositions = [0, 1, 2, 3];

function createMatrix() {
    for (let i = 0; i < LINE_LENGTH; ++i) {
        const row = [];
        for (let j = 0; j < COL_LENGTH; ++j) {
            const box = document.createElement('div');
            const divChild = document.createElement('div');
            divChild.className = 'divChild';
            divChild.setAttribute('data-line', i);
            divChild.setAttribute('data-column', j);
            box.className = 'box';
            box.appendChild(divChild);
            matrixElement.appendChild(box);
            row.push(box);
        }
        matrix.push(row);
    }
};

createMatrix();
let divs = document.querySelectorAll('.divChild');

function startPlayer(colorAssigned) {
    tokenColor = colorAssigned;
    playGame();
}

function addColor(e) {
    e.stopPropagation();
    ++counter;
    let column = parseInt(e.target.getAttribute('data-column'));
    for (let i = LINE_LENGTH - 1; i >= 0; --i) {
        let cell = matrix[i][column].firstElementChild;
        if (cell.style.backgroundColor === '') {
            cell.style.backgroundColor = tokenColor;
            break;
        }
    }
    findWinner();
    if (tokenColor === 'yellow') {
        tokenColor = 'red';
    } else {
        tokenColor = 'yellow';
    }   
}

function playGame() {
    document.getElementById('btnRed').disabled = true;
    document.getElementById('btnYellow').disabled = true;
    divs.forEach(element => {
        element.addEventListener("click", addColor);
    });
}

function verticalCheck(elem) {
    for (let line = 0; line < LINE_LENGTH; ++line) {
        for (let col = 0; col < COL_LENGTH; ++col) {
            if ((line === 0 || line === 1 || line === 2) 
                && matrix[line][col].firstElementChild.style.backgroundColor === elem) {
                for (let k = 0; k < 4; ++k) {
                    if (comboPositions.every(k => elem === 
                        matrix[line + k][col].firstElementChild.style.backgroundColor)) {
                        winner = elem;  
                    }
                }
            }            
        }
    }
}

function horizontalCheck(elem) {
    for (let line = 0; line < LINE_LENGTH; ++line) {
        for (let col = 0; col < COL_LENGTH; ++col) {
            if ((col === 0 || col === 1 || col === 2 || col === 3) 
                && matrix[line][col].firstElementChild.style.backgroundColor === elem) {
                for (let k = 0; k < 4; ++k) {
                    if (comboPositions.every(k => elem === 
                        matrix[line][col + k].firstElementChild.style.backgroundColor)) {
                        winner = elem;
                    }
                }
            }               
        }
    }
}

function mainDiagonalCheck(elem) {
    for (let line = 0; line < LINE_LENGTH; ++line) {
        for (let col = 0; col < COL_LENGTH; ++col) {
            if ((line === 0 || line === 1 || line === 2)
                && (col === 0 || col === 1 || col === 2 || col === 3) 
                && matrix[line][col].firstElementChild.style.backgroundColor === elem) {
                for (let k = 0; k < 4; ++k) {
                    if (comboPositions.every(k => elem === 
                        matrix[line + k][col + k].firstElementChild.style.backgroundColor)) {
                        winner = elem;
                    }
                }
            }               
        }
    }
}

function secondDiagonalCheck(elem) {
    for (let line = 0; line < LINE_LENGTH; ++line) {
        for (let col = 0; col < COL_LENGTH; ++col) {
            if ((line === 0 || line === 1 || line === 2)
                && (col === 3 || col === 4 || col === 5 || col === 6) 
                && matrix[line][col].firstElementChild.style.backgroundColor === elem) {
                for (let k = 0; k < 4; ++k) {
                    if (comboPositions.every(k => elem === 
                        matrix[line + k][col - k].firstElementChild.style.backgroundColor)) {
                        winner = elem;
                    }
                }
            }               
        }
    }
}

function checkConditions() {
    verticalCheck(tokenColor);
    horizontalCheck(tokenColor);
    mainDiagonalCheck(tokenColor);
    secondDiagonalCheck(tokenColor);
}

function findWinner() {
    checkConditions();
    if (winner !== "") {
        document.getElementById('winner').innerHTML = `<h2>Player ${winner} WON!!!</h2>`;
    } else if (counter === 42) {
        document.getElementById('winner').innerHTML = `<h2>There is no winner...</h2>`;
    }
    if (winner || counter === 42) {
        removeEvents();
    }
}

function removeEvents() {
    divs.forEach(elem => {
        elem.removeEventListener("click", addColor);
    });
}