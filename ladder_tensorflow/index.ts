import { tensor2d, layers, sequential, util } from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node-gpu';
import { get } from 'https';
import { IncomingMessage } from 'http';
import { Game } from './interfaces';

function fetch<T>(url: string): Promise<T> {
  let data = '';
  return new Promise(resolve => {
    get(url, (res: IncomingMessage) => {
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });
  });
}

function getGames(): Promise<Game[]> {
  return fetch<Game[]>(
    'https://us-central1-ladder-41a39.cloudfunctions.net/matches'
  );
}

const id = (name: string): number =>
  parseInt(
    name
      .split('')
      .map(c => Math.floor(c.charCodeAt(0) / 255))
      .join(''),
    10
  );

async function run() {
  const games: Game[] = await getGames();
  const model = sequential();
  model.add(layers.dense({ units: 1, inputShape: [2] }));

  util.shuffle(games);
  const games2d = tensor2d(
    games.map(game => [id(game.winner), id(game.loser)]),
    [games.length, 2]
  );
  const winners2d = tensor2d(games.map(game => id(game.winner)), [
    games.length,
    1,
  ]);

  await model.compile({
    loss: 'meanSquaredError',
    optimizer: 'sgd',
  });
  await model.fit(games2d, winners2d, { epochs: 100 });
  const value = await model.predict(
    tensor2d([id('JPK'), id('Damoon')], [2, 1])
  );
  console.log(value);
  await model.save(`file://${process.env.PWD}`);
}

run();
