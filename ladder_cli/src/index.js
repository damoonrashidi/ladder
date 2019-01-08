#!/usr/bin/env node

const program = require('commander');
const colors = require('colors/safe');
const asciichart = require('asciichart');
const apiService = require('./reporter/apiService');

const Settings = require('./settings');
const Reporter = require('./reporter');

// Initialize settings module, that we can use for storing settings
const settingsManager = new Settings();
settingsManager.initialize();

// Available commands
program
  .command('report')
  .description('Report scores for a match')
  .action(() => {
    const reporter = new Reporter(settingsManager);
    reporter.run();
  });

program
  .command('rankings')
  .description('Show current rankings of players')
  .action(async () => {
    const name = settingsManager.get('name') || '';

    (await apiService.getRankings())
      .map(person => {
        if (person.name === name) {
          return colors.blue(`${person.points} ${person.name}`);
        }

        return `${person.points} ${person.name}`;
      })
      .forEach((person, index) => {
        const number = (index + 1).toString();
        const prefix = (number.length === 1 ? ' ' : '') + number;
        const suffix = index === 0 ? '[👑 of 🏓]' : '';
        console.log(`${colors.white(prefix)}. ${person} ${suffix}`);
        if (index === 4) {
          console.log(colors.rainbow('--------------------------------'));
        }
      });
  });

program
  .command('matches')
  .description('Show log of all matches')
  .action(async () => {
    const games = await apiService.getHistory();
    games.forEach(game => console.log(game));
  });

program
  .command('profile <name>')
  .description('Show the results for a single person')
  .action(async name => {
    let rating = 1500;
    const games = await apiService.getProfile(name);
    const data = [1500, ...games.map(game => game.rating)];
    console.log(asciichart.plot(data, { height: 10 }));
    const wins = games.reduce(
      (w, g) => (g.winner.toLowerCase() === name.toLowerCase() ? w + 1 : w),
      0
    );
    console.log(`${games.length} games played`);
    console.log(
      `${colors.green(wins)} wins, ${colors.red(games.length - wins)} losses`
    );
    games.forEach(game => {
      if (game.winner.toLowerCase() === name.toLowerCase()) {
        console.log(
          colors.green('Victory'),
          'vs ',
          game.loser,
          `(+${game.rating - rating})`
        );
      } else {
        console.log(
          colors.red('Defeat'),
          'vs ',
          game.winner,
          `(${game.rating - rating})`
        );
      }
      rating = game.rating;
    });
    console.log('Rating:', rating);
  });

// Give the arguments to commander
program.parse(process.argv);

if (!process.argv.slice(2).length) {
  console.log(colors.blue('###############################################'));
  console.log(colors.blue('##                                           ##'));
  console.log(colors.blue('##        Welcome to King of Pong CLI        ##'));
  console.log(colors.blue('##                                           ##'));
  console.log(colors.blue('###############################################'));
  console.log('');
  program.help();
}
