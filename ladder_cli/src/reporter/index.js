const inquirer = require("inquirer");
const colors = require("colors");

inquirer.registerPrompt(
  "autocomplete",
  require("inquirer-autocomplete-prompt")
);

const apiService = require("./apiService");

function getQuestions(settings) {
  const questions = [
    {
      type: "input",
      name: "name",
      message: "What's your name?",
      default: () => {
        if (settings.name !== null) {
          return settings.name;
        } else {
          return null;
        }
      }
    },
    {
      type: "autocomplete",
      name: "opponent",
      message: "Who did you play?",
      suggestOnly: true,
      source: (answersSoFar, input) => {
        return apiService.getPeople(answersSoFar.name, input);
      }
    },
    {
      type: "list",
      name: "winner",
      message: "Who won the match?",
      choices: answersSoFar => {
        return [answersSoFar.name, answersSoFar.opponent];
      }
    }
  ];

  return questions;
}

class Reporter {
  constructor(settingsManager) {
    this.settingsManager = settingsManager;
  }

  handleAnswers(answers) {
    // Update the name (in case it changed)
    this.settingsManager.set("name", answers.name);

    // Report the game
    apiService
      .reportGame(answers)
      .then(() => {
        console.log("");
        console.log(colors.green("## Scores reported! Thank joo!"));
      })
      .catch(err => {
        console.error(err);
      });
  }

  run() {
    const settings = this.settingsManager.getAll();
    const questions = getQuestions(settings);

    inquirer.prompt(questions).then(this.handleAnswers.bind(this));
  }
}

module.exports = Reporter;
