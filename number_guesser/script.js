let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:
// Generate random target
const generateTarget = () => {
    return Math.floor(Math.random() * 10);
}

// Function to calculate absolute distance
const getAbsoluteDistance = (num1, num2) => {
    return Math.abs(num1 - num2);    
}

// Compare guesses
const compareGuesses = (hGuess, cGuess, tNumber) => {
    // Validate human input
    if (Number(hGuess) < 0 || Number(hGuess) > 9) {
        window.alert('Incorrect input! Required: numbers 0 - 9');
        return false;
    }
    if (getAbsoluteDistance(cGuess, tNumber) >= getAbsoluteDistance(hGuess, tNumber)) {
        return true;
    }
    else {
        return false;
    }
}

// Update Score
const updateScore = winner => {
    if (winner === 'human') {
        humanScore++;
    }
    else if (winner === 'computer') {
        computerScore++;
    }
}

// Advance round
const advanceRound = () => {
    currentRoundNumber++;
}