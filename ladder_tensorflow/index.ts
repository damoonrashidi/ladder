import { tensor2d, layers, sequential, Tensor, util } from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node-gpu';
// import { get } from 'https';
// import { IncomingMessage } from 'http';
import gameList, { Game } from './interfaces';

// function fetch<T>(url: string): Promise<T> {
//   let data = '';
//   return new Promise(resolve => {
//     get(url, (res: IncomingMessage) => {
//       res.on('data', chunk => (data += chunk));
//       res.on('end', () => {
//         resolve(JSON.parse(data));
//       });
//     });
//   });
// }

// function getGames(name: string): Promise<Game[]> {
//   return fetch<Game[]>(
//     `https://us-central1-ladder-41a39.cloudfunctions.net/person?name=${name}`
//   );
// }

const d = (date: string, dawn: string) =>
  (Date.parse(date) - Date.parse(dawn)) / 1000 / 60 / 60 / 24;

async function run() {
  const games: Game[] = gameList; //await getGames('damoon');

  /**
   * Set up the model
   */
  const model = sequential();
  model.add(layers.dense({ units: 1, activation: 'relu', inputShape: [1] }));
  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
  model.save(`file://${process.env.PWD}/`);
  util.shuffle(games);

  /**
   * set up the data
   */
  const timestamps = games.map(game => d(game.timestamp, games[0].timestamp));
  const ratings = games.map(game => 1450 - game.rating);
  const ts = tensor2d(timestamps, [timestamps.length, 1]);
  const rs = tensor2d(ratings, [ratings.length, 1]);
  console.log(ratings, timestamps);

  /**
   * predict the future
   */
  await model.fit(ts, rs, { epochs: 50 });
  const futureDate = d(games[4].timestamp, games[0].timestamp);
  const theFuture = tensor2d([futureDate], [1, 1]);
  const value = (model.predict(theFuture) as Tensor).print();
  console.log(value);
}

run();
