import brain from 'brain.js';
import gameList, { Game } from './interfaces';

async function run() {
  const games: Game[] = gameList;

  const net = new brain.recurrent.LSTM();

  const timestamps = games.map(game => game.timestamp);
  const ratings = games.map(game => game.rating);
  let data = [];

  for (let i = 0; i < games.length; i++) {
    data.push({ input: timestamps[i], output: ratings[i].toString() });
  }
  console.log(data);

  net.train(data, {
    iterations: 100,
  });

  const value = net.run('2018-10-06T22:00:00.000Z');
  console.log(`output: ${value}`);
}

run();
