const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Pick a random number from 1 to 100
const secretNumber = Math.floor(Math.random() * 100) + 1;
let tries = 0;

function askGuess() {
  rl.question("Enter your guess (1-100): ", function (input) {
    const trimmed = input.trim();
    const guess = Number(trimmed);

    // Invalid input: empty, NaN, not an integer, or outside 1-100 range
    if (trimmed === "" || isNaN(guess) || !Number.isInteger(guess) || guess < 1 || guess > 100) {
      console.log("Invalid input! Please enter a whole number from 1 to 100.");
      askGuess();
      return;
    }

    // Only valid guesses count as a try
    tries++;

    if (guess > secretNumber) {
      console.log("Too high");
      askGuess();
    } else if (guess < secretNumber) {
      console.log("Too low");
      askGuess();
    } else {
      console.log(`Correct in ${tries} tries`);
      rl.close();
    }
  });
}

askGuess();
