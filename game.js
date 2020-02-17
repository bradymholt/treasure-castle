class Game {
  async start() {
    this.welcome();
    await this.askQuestions();
  }

  welcome() {
    print("Welcome to Treasure Castle!");

    const response = askQuestion("What is your first name?");
    print(`Hello ${response}!`);

    print(`\
Get ready for adventurous game that will blow\nyour mind and change your life!

The object of this game is to obtain keys to\nthe castle so that you can find
the treasure and win the game.

To get keys, you must correctly answer a series of VERY HARD questions.`);

    waitForKeyPress("[Press any key to play]");
  }

  async askQuestions() {
    const questions = [
      {
        text: "What color is the sky?",
        choices: ["Blue", "Ultraviolet", "White"],
        answer: "Ultraviolet"
      },
      {
        text: "What is the liquid from a volcano erruption called?",
        choices: ["Magma", "Lava", "Red"],
        answer: "Magma"
      }
    ];
    for (let question of questions) {
      clearScreen();

      const response = await inquirer.prompt([
        {
          type: "list",
          name: "answer",
          message: question.text,
          choices: question.choices
        }
      ]);

      const enteredAnswer = response.answer;
      const correctAnswer = question.answer;
      if (enteredAnswer == correctAnswer) {
        console.log("CORRECT!");
      } else {
        console.log("YOU LOSE!");
      }
      waitForKeyPress("[Press any key to continue]");
    }
  }
}

const inquirer = require("inquirer");
const readline = require("readline-sync");

function print(message) {
  console.log(message);
}

function clearScreen() {
  console.clear();
}

function waitForKeyPress(message) {
  return askQuestion("[Press any key to play]");
}

function askQuestion(question) {
  return readline.question(question + "\n");
}

const game = new Game();
module.exports = game;
