let secretNumber = generateSecretNumber();
let currentScore = 10;
let highScore = 0;
let guessedNumbers = [];

const secretNumberElement = document.getElementById('secret-number');
const currentScoreElement = document.getElementById('current-score');
const highScoreElement = document.getElementById('high-score');
const messageElement = document.getElementById('message');
const historyList = document.getElementById('history-list');
const guessInput = document.getElementById('guessInput');
const checkBtn = document.getElementById('checkBtn');
const playBtn = document.getElementById('playBtn');

function generateSecretNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function updateMessage(message, isError = false) {
    messageElement.textContent = message;
    messageElement.classList.toggle('error', isError);
}

checkBtn.addEventListener('click', function() {
    const guess = Number(guessInput.value);

    if (!guess || guess < 1 || guess > 100) {
        updateMessage('Invalid input! Enter a number between 1 and 100.', true);
        return;
    }

    if (guessedNumbers.includes(guess)) {
        updateMessage('You already guessed that number!', true);
        return;
    }

    guessedNumbers.push(guess);
    const historyItem = document.createElement('li');
    historyItem.textContent = `You guessed: ${guess}`;
    historyList.appendChild(historyItem);

    if (guess === secretNumber) {
        updateMessage('🎉 Correct! You guessed the number!');
        secretNumberElement.textContent = secretNumber;
        document.body.style.backgroundColor = '#28a745';
        checkBtn.disabled = true;
        guessInput.disabled = true;

        if (currentScore > highScore) {
            highScore = currentScore;
            highScoreElement.textContent = highScore;
        }
        playBtn.classList.remove('hidden');
    } else {
        updateMessage(guess > secretNumber ? 'Too high!' : 'Too low!', true);
        currentScore--;
        currentScoreElement.textContent = currentScore;
    }

    if (currentScore === 0) {
        updateMessage('💥 Game over! Try again.');
        checkBtn.disabled = true;
        guessInput.disabled = true;
        playBtn.classList.remove('hidden');
    }

    guessInput.value = '';
});

playBtn.addEventListener('click', function() {
    secretNumber = generateSecretNumber();
    currentScore = 10;
    guessedNumbers = [];
    currentScoreElement.textContent = currentScore;
    secretNumberElement.textContent = '?';
    messageElement.textContent = 'Start guessing...';
    checkBtn.disabled = false;
    guessInput.disabled = false;
    playBtn.classList.add('hidden');
    document.body.style.backgroundColor = '#f8f9fa';
    historyList.innerHTML = '';
});
