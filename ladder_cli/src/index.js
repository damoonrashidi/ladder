#!/usr/bin/env node

const program = require('commander');
const colors = require('colors/safe');
const asciichart = require('asciichart');
const cachios = require('cachios');

const manifest = require('../package.json');
const apiService = require('./reporter/apiService');
const Settings = require('./settings');
const Reporter = require('./reporter');

// Initialize settings module, that we can use for storing settings
const settingsManager = new Settings();
settingsManager.initialize();

const checkForUpdates = async () => {
  const remoteManifest = await cachios.get(
    'https://raw.githubusercontent.com/damoonrashidi/ladder/master/ladder_cli/package.json'
  );
  const latestVersion = remoteManifest.data.version;
  const thisVersion = manifest.version;
  if (latestVersion !== thisVersion) {
    console.log(
      `\nThere is a new version available! (${colors.red(
        thisVersion
      )} -> ${colors.green(latestVersion)})`
    );
    console.log(`Run 'npm i -g kingofpong@latest' to get it`);
  }
};

// Available commands
program
  .command('report')
  .description('Report scores for a match')
  .action(() => {
    const reporter = new Reporter(settingsManager);
    reporter.run();
    checkForUpdates();
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
    checkForUpdates();
  });

program
  .command('matches')
  .description('Show log of all matches')
  .action(async () => {
    const games = await apiService.getHistory();
    games.forEach(game => console.log(game));
    checkForUpdates();
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
    checkForUpdates();
  });

program
  .command('suggest')
  .description('Suggest an opponent')
  .action(async () => {
    const name = settingsManager.get('name');
    const list = await apiService.getRankings();
    const profile = await apiService.getProfile(name);
    const listMap = new Map();
    list.forEach(player => listMap.set(player.name, 0));
    const rating = profile[profile.length - 1].rating;
    const opponents = profile
      .map(game => (game.winner === name ? game.loser : game.winner))
      .reduce((players, player) => {
        players.set(player, players.get(player) + 1);
        return players;
      }, listMap);
    const close = list.filter(
      player => Math.abs(player.points - rating) <= 20 && list.name !== name
    );
    const closeRareOpponents = [...opponents]
      .filter(([player, _]) => close.map(p => p.name).includes(player))
      .sort(([_, games1], [__, games2]) => games1 - games2)
      .filter(([player, _]) => player !== name);
    if (closeRareOpponents.length > 1) {
      const [found, points] = closeRareOpponents[
        Math.round(Math.random() * closeRareOpponents.length) - 1
      ];
      console.log(`Play vs ${found}`);
    }
  });

// Give the arguments to commander
program.parse(process.argv);

if (!process.argv.slice(2).length) {
  const title = `
#########################
##                                          ##
##        Welcome to King of Pong CLI       ##
##                                          ##
#########################`.replace(/#/g, '🏓');
  console.log(title);
  program.help();
  checkForUpdates();
}
