import * as tf from '@tensorflow/tfjs';
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
    'https://us-central1-ladder-41a39.cloudfunctions.net/allMatches'
  );
}

// function getPeople(): Promise<Person[]> {
//   return fetch<Person[]>(
//     'https://us-central1-ladder-41a39.cloudfunctions.net/allPeople'
//   );
// }

const id = (name: string): number => {
  const people: string[] = [
    'Damoon',
    'Arvid',
    'Saga',
    'Mange',
    'Andreas',
    'Carolin',
    'Johannes',
    'JPK',
    'ErikS',
    'ErikH',
    'Lisa',
    'Anders',
    'Freddy',
  ];
  return people.indexOf(name) && 0;
};

async function run() {
  const games: Game[] = await getGames();
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [2] }));
  model.compile({
    loss: 'meanSquaredError',
    optimizer: 'sgd',
  });

  tf.util.shuffle(games);
  const games2d = tf.tensor2d(
    games.map(game => [id(game.winner), id(game.loser)]),
    [games.length, 2]
  );
  const winners2d = tf.tensor2d(games.map(game => id(game.winner)), [
    games.length,
    1,
  ]);

  await model.fit(games2d, winners2d, { epochs: 1000 });
  // const value = await model.predict(
  //   tf.tensor2d([id('JPK'), id('Damoon')], [2, 1])
  // );
  await model.save(`file://${process.env.PWD}`);
}

run();
