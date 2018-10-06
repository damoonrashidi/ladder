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

function getGames(name: string): Promise<Game[]> {
  return fetch<Game[]>(
    `https://us-central1-ladder-41a39.cloudfunctions.net/person?name=${name}`
  );
}

async function run() {
  const games: Game[] = await getGames('damoon');

  /**
   * Set up the model
   */
  const model = sequential();
  model.add(layers.dense({ units: 100, activation: 'relu', inputShape: [1] }));
  model.add(layers.dense({ units: 1, activation: 'linear', inputShape: [1] }));
  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
  util.shuffle(games);

  /**
   * set up the data
   */
  const timestamps = games.map(
    game => Date.parse(game.timestamp.split('T')[0]) / 100000001
  );
  const ratings = games.map(game => game.rating);
  util.assertNonNull(timestamps);
  util.assertNonNull(ratings);
  const ts = tensor2d(timestamps, [timestamps.length, 1]);
  const rs = tensor2d(ratings, [ratings.length, 1]);

  /**
   * predict the future
   */
  await model.fit(ts, rs, { epochs: 100 });
  const future = tensor2d([6034080.1], [1, 1]);
  const value = await model.predict(future);
  console.log(value);
}

run();
