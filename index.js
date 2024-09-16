///////////////////////////////////////////////////////////////////////////////
//
// Title:            Hangman
// Files:            index.js, words.js
//
// Author:           Jaden Watson
//
///////////////////////////////////////////////////////////////////////////////

var wordBankHard = ["bicycle", "industry", "evolve"];
var wordBankMedium = ["monkey", "rhino", "elephant"];
var wordBankEasy = ["banana", "apple", "carrot"];

const storedWordBank = wordBank;

const display = document.getElementById("hidden-text");
const message = document.getElementById("message");
const letterBank = document.getElementById("letter-bank");
const resetButton = document.getElementById("reset");
const hintMessage = document.getElementById("hint-message");

window.addEventListener(
  "keydown",
  function (e) {
    keyPress(e.key);
  },
  false
);

function myFunction(value) {
  console.log(value);
}

function checkWinLose() {
  if (attempts < 1) {
    message.innerHTML =
      "<b>YOU LOSE!</b> THE WORD WAS: <i>" + secretWord.join("") + "</i>";
    disabled = true;
  } else if (hiddenLetters.indexOf("_") == -1) {
    message.innerHTML = "YOU WIN! CLICK RESTART TO PLAY AGAIN";
    disabled = true;
  }
}

function resetGame() {
  disabled = false;
  hiddenLetters = [];
  guesses = [];
  alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  wordBank = storedWordBank;
  const elements = document.getElementsByName("difficulty");

  for (i = 0; i < elements.length; i++) {
    if (elements[i].checked) {
      difficulty = elements[i].value;
    }
  }
  switch (difficulty) {
    case "hard":
      wordBank = wordBank.filter((word) => {
        return word.length >= 7;
      });
      attempts = 10;
      hints = 3;
      break;
    case "medium":
      wordBank = wordBank.filter((word) => {
        return word.length <= 6;
      });
      attempts = 13;
      hints = 3;
      break;
    case "easy":
      wordBank = wordBank.filter((word) => {
        return word.length <= 5;
      });
      attempts = 15;
      hints = 3;
      break;
  }
  hintMessage.innerHTML = hints + " hints remaining.";
  secretWord = wordBank[Math.floor(Math.random() * wordBank.length)].split("");
  secretWord.map(() => {
    hiddenLetters.push("_");
  });

  const keys = document.getElementsByClassName("key");

  for (i = 0; i < keys.length; i++) {
    keys[i].style.background = "#fff898";
  }
  console.log({
    DIFFICULTY: difficulty,
    SECRETWORD: secretWord.join(""),
  });
  display.innerHTML = hiddenLetters.join(" ");
  message.innerHTML = "The word has " + secretWord.length + " letters.";
  letterBank.innerHTML = attempts + " GUESSES";
  resetButton.innerHTML = "Restart";
}

function getHint(letters) {
  if (disabled == false) {
    if (hints > 0) {
      for (i = 0; i < letters.length; i++) {
        alphabet = alphabet.filter((item) => {
          return item !== letters[i];
        });
      }
      for (i = 0; i < guesses.length; i++) {
        alphabet = alphabet.filter((item) => {
          return item !== guesses[i];
        });
      }
      for (i = 0; i < 5; i++) {
        number = Math.floor(Math.random() * alphabet.length);
        document.getElementById(alphabet[number]).style.backgroundColor =
          "#ba3838";
        guesses.push(alphabet[number]);
      }
      hints--;
      hintMessage.innerHTML = hints + " hints remaining.";
    }
    letterBank.innerHTML = attempts + " GUESSES";
    checkWinLose();
  }
}

function keyPress(value) {
  if (disabled == false) {
    matches = [];
    if (guesses.indexOf(value) > -1) {
      message.innerHTML = 'You already guessed "' + value + '"!';
    } else {
      if (secretWord.indexOf(value) > -1) {
        for (i = 0; i < secretWord.length; i++) {
          if (secretWord[i] == value) {
            hiddenLetters[i] = value;
            matches.push(i);
          }
        }
        if (matches.length > 1) {
          message.innerHTML =
            'Wow! "' +
            value +
            '" was in the word ' +
            matches.length +
            " times!";
        } else {
          message.innerHTML = 'Nice! "' + value + '" was in the word!';
        }
        document.getElementById(value).style.backgroundColor = "#56ba38";
        display.innerHTML = hiddenLetters.join(" ");
      } else {
        message.innerHTML = 'Uh oh! "' + value + "\" isn't in the word!";
        document.getElementById(value).style.backgroundColor = "#ba3838";
        attempts--;
      }
    }
    letterBank.innerHTML = attempts + " GUESSES";
    guesses.push(value);
    checkWinLose();
  }
}
