#!/usr/bin/env node

const program = require('commander');
const colors = require('colors');

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
    const ranks = await apiService.getRankings();
    console.log(ranks);
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
