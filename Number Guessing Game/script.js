const startBtn = document.getElementById("start-btn");
const submitBtn = document.getElementById("submit-btn");
const guessInput = document.getElementById("guess-input");
const gameMessage = document.getElementById("game-message");
const scoreDisplay = document.getElementById("score-display");
const attemptsLeft = document.getElementById("attempts-left");

let targetNumber, attempts, maxAttempts, score;

function startGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    maxAttempts = 5;
    score = score || 0;

    guessInput.disabled = false;
    submitBtn.disabled = false;

    gameMessage.textContent = "I have selected a number between 1 and 100. Can you guess it?";
    attemptsLeft.textContent = `Attempts left: ${maxAttempts - attempts}`;
    startBtn.style.display = "none";
}

function checkGuess() {
    const guess = parseInt(guessInput.value, 10);

    if (isNaN(guess)) {
        gameMessage.textContent = "Invalid input! Please enter a number.";
        return;
    }

    attempts++;
    attemptsLeft.textContent = `Attempts left: ${maxAttempts - attempts}`;

    if (guess === targetNumber) {
        score++;
        gameMessage.textContent = `🎉 Correct! The number was ${targetNumber}. Your score is ${score}.`;
        endGame(true);
    } else if (attempts >= maxAttempts) {
        gameMessage.textContent = `😢 Out of attempts! The correct number was ${targetNumber}.`;
        endGame(false);
    } else if (guess < targetNumber) {
        gameMessage.textContent = "Too low! Try again.";
    } else {
        gameMessage.textContent = "Too high! Try again.";
    }

    guessInput.value = "";
}

function endGame(won) {
    guessInput.disabled = true;
    submitBtn.disabled = true;

    setTimeout(() => {
        startBtn.style.display = "inline-block";
        startBtn.textContent = won ? "Play Again" : "Try Again";
    }, 1000);

    scoreDisplay.textContent = `Score: ${score}`;
}

startBtn.addEventListener("click", startGame);
submitBtn.addEventListener("click", checkGuess);
