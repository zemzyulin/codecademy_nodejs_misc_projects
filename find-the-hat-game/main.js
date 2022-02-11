const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
    }
    print() {
        for (let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(''));
        }
    }
    static generateField(height, width, difficulty) {
        // build plain field
        let field = new Array(height);
        for (let i = 0; i < height; i++) {
            field[i] = new Array(width).fill(fieldCharacter);
        }
        // add holes (depending on difficulty)
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (Math.floor(Math.random() * difficulty) < 1) {
                    field[i][j] = hole;
                }
            }
        }
        // place character and hat (close to bottom right corner)
        field[0][0] = pathCharacter;
        const randomHeight = height - 1 - (Math.floor(Math.random() * (Math.round(height * 0.4))));
        const randomWidth = width - 1 - (Math.floor(Math.random() * (Math.round(width * 0.4))));
        field[randomHeight][randomWidth] = hat;
        return field;
    }
}

// Ask user to pick field size and difficulty
console.log('Welcome to Find The Hat!\n\n');
let height = 6;
let width = 6;
let difficulty = 7;
while (true) {
    const fieldSize = prompt('Please pick the size of the field: from 1 (a napkin) to 3 (a football field) : ');
    if (Number(fieldSize) === 1) { break; }
    if (Number(fieldSize) === 2) {
        height = 10;
        width = 20;
        break;
    }
    if (Number(fieldSize) === 3) {
        height = 12;
        width = 64;
        break;
    }
}
while (true) {
    const difficultyInput = prompt('Now difficulty: from 1 (a walk in a park) to 3 (nightmare) : ');
    if (Number(difficultyInput) === 1) { break; }
    if (Number(difficultyInput) === 2) {
        difficulty = 5;
        break;
    }
    if (Number(difficultyInput) === 3) {
        difficulty = 3;
        break;
    }
}

// generate field
const testField = new Field(Field.generateField(height, width, difficulty));
testField.print();

// define 'check next move' function
let i = 0;
let j = 0;
const checkMove = (direction) => {
    if (direction === 'l') {
        !testField.field[i][j - 1] ? direction = undefined : direction = testField.field[i][j - 1];
    }
    else if (direction === 'r') {
        !testField.field[i][j + 1] ? direction = undefined : direction = testField.field[i][j + 1];
    }
    else if (direction === 'u') {
        !testField.field[i - 1] ? direction = undefined : direction = testField.field[i - 1][j];
    }
    else if (direction === 'd') {
        !testField.field[i + 1] ? direction = undefined : direction = testField.field[i + 1][j];
    }

    if (direction === undefined) {
        outOfBounds();
        return false;
    }
    else if (direction === hole) {
        foundHole();
        return false;
    }
    else if (direction === hat) {
        winGame();
        return false;
    }
    return true;
}

// define 'game over' functions
const outOfBounds = () => {
    console.log('Out of bounds. Game over.\n');
}
const foundHole = () => {
    console.log('You fell into a hole. Haha. Game over.\n')
}
const winGame = () => {
    console.log('Congrats! You found the hat! A trully extraordinary achievement!\n')
}

// main game logic
while (1 < 2) {
    let move = prompt('Make your move: ');
    move = move.toLowerCase();
    //const regEx = /r/;
    if (!move.match(/[lrud]/)) { console.log('Wrong move. Expected: R, L, U or D.\n'); }
    // move left
    if (move === 'l') {
        if (!checkMove(move)) { break; } 
        testField.field[i][j - 1] = pathCharacter;
        j--;
        testField.print();
    }
    // move right
    if (move === 'r') {
        if (!checkMove(move)) { break; } 
        testField.field[i][j + 1] = pathCharacter;
        j++;
        testField.print();
    }
    // move up
    if (move === 'u') {
        if (!checkMove(move)) { break; } 
        testField.field[i - 1][j] = pathCharacter;
        i--;
        testField.print();
    }
    // move down
    if (move === 'd') {
        if (!checkMove(move)) { break; } 
        testField.field[i + 1][j] = pathCharacter;
        i++;
        testField.print();
    }
}