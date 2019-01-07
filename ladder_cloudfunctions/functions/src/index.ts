import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

export const rating = (
  winner: number,
  loser: number
): { winner: number; loser: number } => {
  const K = 24;
  const pWinner = 1 / (1 + Math.pow(10, (loser - winner) / 400));
  const pLoser = 1 / (1 + Math.pow(10, (winner - loser) / 400));

  const rWinner = winner + K * (1 - pWinner);
  const rLoser = loser + K * (0 - pLoser);

  return {
    winner: Math.floor(rWinner),
    loser: Math.floor(rLoser),
  };
};

export const games = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');

  return db
    .collection('games')
    .orderBy('timestamp', 'desc')
    .get()
    .then(snapshot => {
      let _games = [];
      snapshot.forEach(game => (_games = _games.concat(game.data())));
      res.send(_games);
    });
});

export const people = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');

  return db
    .collection('games')
    .orderBy('timestamp', 'desc')
    .get()
    .then(snapshot => {
      const _people = new Map<string, number>();
      snapshot.forEach(match => {
        const { winner, loser } = match.data();
        const newRatings = rating(
          _people.get(winner) || 1500,
          _people.get(loser) || 1500
        );

        _people.set(winner, newRatings.winner);
        _people.set(loser, newRatings.loser);
      });

      res.send([..._people].map(([name, points]) => ({ name, points })));
    });
});

export const person = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');

  const name = req.query.name.toLowerCase();
  const ratings = new Map<String, number>();
  let consecutiveWins = 0;
  return db
    .collection('games')
    .orderBy('timestamp', 'asc')
    .get()
    .then(snapshot => {
      let _games = [];
      snapshot.forEach(game => {
        const winner = game.data().winner.toLowerCase();
        const loser = game.data().loser.toLowerCase();

        if (winner === name || loser === name) {
          consecutiveWins = name === winner ? consecutiveWins + 1 : 0;

          const newRatings = rating(
            ratings.get(winner) || 1500,
            ratings.get(loser) || 1500
          );

          ratings.set(winner, newRatings.winner);
          ratings.set(loser, newRatings.loser);

          _games = _games.concat({
            ...game.data(),
            rating: newRatings[name === winner ? 'winner' : 'loser'],
            consecutiveWins,
          });
        }
      });

      res.send(_games);
    });
});

export const reportGame = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST');

  const timestamp = new Date();
  const { winner, loser } = req.body;

  console.log(req.body, winner, loser);
  return db
    .collection('games')
    .add({
      winner,
      loser,
      timestamp,
    })
    .then(match => {
      res.redirect(303, match.path.toString());
    });
});
