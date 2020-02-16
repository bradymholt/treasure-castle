var inquirer = require("inquirer");
const readline = require("readline");

(async function() {
  console.log("Welcome to Treasure Castle!");
  const response = await askQuestion("What is your first name?");
  console.log(`Hello ${response.answer}!`);
  await waitForKeyPress(`\
Get ready for adventurous game that will blow\nyour mind and change your life!

The object of this game is to obtain keys to\nthe castle so that you can find
the treasure and win the game.

To get keys, you must correctly answer a series of VERY HARD questions.

[Press any key to play]
`);

  clearScreen();

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
    const response = await inquirer.prompt([
      {
        type: "list",
        name: "answer",
        message: question.text,
        choices: question.choices
      }
    ]);

    const youAnswered = response.answer;
    const correctAnswer = question.answer;
    console.log(`You answered: '${youAnswered}'`);
    if (youAnswered == correctAnswer) {
      console.log("CORRECT!");
    } else {
      console.log("YOU LOSE!");
    }
    await waitForKeyPress("Press any key to continue");

    clearScreen();
  }
})();

function clearScreen() {
  process.stdout.write("\u001b[2J\u001b[0;0H");
}

function waitForKeyPress() {}

function waitForKeyPress(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve =>
    rl.question(query, ans => {
      rl.close();
      resolve(ans);
    })
  );
}

async function askQuestion(question) {
  return inquirer.prompt([
    {
      type: "input",
      name: "answer",
      message: question
    }
  ]);  
}
