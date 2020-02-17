class Game { 
  constructor(){
    this.numberOfKeysNeededToWin = 2;
    this.numberOfKeysObtained = 0;
  }

  async start() {
    this.welcome();
    await this.askQuestions();
  }

  welcome() {
    print("Welcome to Treasure Castle!");
    print(`
                            -|             |-
         -|                  [-_-_-_-_-_-_-_-]                  |-
         [-_-_-_-_-]          |             |          [-_-_-_-_-]
          | o   o |           [  0   0   0  ]           | o   o |
           |     |    -|       |           |       |-    |     |
           |     |_-___-___-___-|         |-___-___-___-_|     |
           |  o  ]              [    0    ]              [  o  |
           |     ]   o   o   o  [ _______ ]  o   o   o   [     | ----__________
_____----- |     ]              [ ||||||| ]              [     |
           |     ]              [ ||||||| ]              [     |
       _-_-|_____]--------------[_|||||||_]--------------[_____|-_-_
      ( (__________------------_____________-------------_________) )
`);

    const response = askQuestion("What is your first name?");
    print(`Hello ${response}!`);

    clearScreen();
    print(`\
Get ready for adventurous game that will blow\nyour mind and change your life!

The object of this game is to obtain keys to\nthe castle so that you can find
the treasure and win the game.

To get keys, you must correctly answer a series of VERY HARD questions.
`);

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
        // Give them a key!
        this.numberOfKeysObtained = this.numberOfKeysObtained + 1;       

        print("CORRECT!");        

        if (this.numberOfKeysObtained == this.numberOfKeysNeededToWin) {
          this.win();
          break;
        } else {
          this.printStatus();
        }

      } else {
        // Take away a key!
        this.numberOfKeysObtained = this.numberOfKeysObtained - 1;

        print("WRONG!");
        this.printStatus();        

        this.lose();
        break;
      }
      waitForKeyPress("[Press any key to continue]");
    }
  }

  printStatus(){
    const numberOfKeysLeftToWin = this.numberOfKeysNeededToWin - this.numberOfKeysObtained;

    let keysObtainedText = "keys";
    if (this.numberOfKeysObtained == 1){
      keysObtainedText = "key"
    }

    let keysLeftToWinText = "keys";
    if (this.numberOfKeysLeftToWin == 1) {
      keysLeftToWinText = "key";
    }

    print(`\
You now have ${this.numberOfKeysObtained} ${keysObtainedText}.
You need ${numberOfKeysLeftToWin} more ${keysLeftToWinText} to win.`);
  }

  win(){
    print(`
You win the treasure!

                                    o
                                   $""$o
                                  $"  $$
                                   $$$$
                                   o "$o
                                  o"  "$
             oo"$$$"  oo$"$ooo   o$    "$    ooo"$oo  $$$"o
o o o o    oo"  o"      "o    $$o$"     o o$""  o$      "$  "oo   o o o o
"$o   ""$$$"   $$         $      "   o   ""    o"         $   "o$$"    o$$
  ""o       o  $          $"       $$$$$       o          $  ooo     o""
     "o   $$$$o $o       o$        $$$$$"       $o        " $$$$   o"
      ""o $$$$o  oo o  o$"         $$$$$"        "o o o o"  "$$$  $
        "" "$"     """""            ""$"            """      """ "
         "oooooooooooooooooooooooooooooooooooooooooooooooooooooo$
          "$$$$"$$$$" $$$$$$$"$$$$$$ " "$$$$$"$$$$$$"  $$$""$$$$
           $$$oo$$$$   $$$$$$o$$$$$$o" $$$$$$$$$$$$$$ o$$$$o$$$"
           $"""""""""""""""""""""""""""""""""""""""""""""""""""$
           $"                                                  o
           $"$"$"$"$"$"$"$"$"$"$"$"$"$"$"$"$"$"$"$"$"$"$"$"$"$$
`);
  }

  lose(){
    print(`
You lose!  Better luck next time.
    `);
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
  return askQuestion(message);
}

function askQuestion(question) {
  return readline.question(question + "\n");
}

const game = new Game();
module.exports = game;
