import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

export const rating = (
  winner: number,
  loser: number
): { winner: number; loser: number } => {
  const K = 26;
  const pWinner = 1 / (1 + Math.pow(10, (loser - winner) / 400));
  const pLoser = 1 / (1 + Math.pow(10, (winner - loser) / 400));

  console.log(pWinner, pLoser);

  const rWinner = winner + K * (1 - pWinner);
  const rLoser = loser + K * (0 - pLoser);

  return {
    winner: Math.floor(rWinner),
    loser: Math.floor(rLoser)
  };
};

export const games = functions.https.onRequest(async (req, res) => {
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
  return db
    .collection('games')
    .orderBy('timestamp', 'desc')
    .get()
    .then(snapshot => {
      const uniques = new Set();
      snapshot.forEach(match => {
        uniques.add(match.data().winner);
        uniques.add(match.data().loser);
      });
      res.send([...uniques].sort((a, b) => (a < b ? -1 : 1)));
    });
});

export const person = functions.https.onRequest(async (req, res) => {
  const name = req.query.name.toLowerCase();
  const ratings = new Map<String, number>();
  return db
    .collection('games')
    .orderBy('timestamp', 'desc')
    .get()
    .then(snapshot => {
      let _games = [];
      snapshot.forEach(game => {
        const { winner, loser } = game.data();
        const playerFound =
          winner.toLowerCase() === name || loser.toLowerCase() === name;
        let consecutiveWins = 0;

        if (playerFound) {
          consecutiveWins =
            name === winner.toLowerCase() ? consecutiveWins + 1 : 0;

          const newRating = rating(
            ratings.get(winner) || 1500,
            ratings.get(loser) || 1500
          )[name === winner.toLowerCase() ? 'winner' : 'loser'];

          _games = _games.concat({
            ...game.data(),
            rating: newRating,
            consecutiveWins
          });
        }
      });

      res.send(_games);
    });
});

export const reportGame = functions.https.onRequest(async (req, res) => {
  const timestamp = new Date();
  const { winner, loser } = req.body;
  return db
    .collection('games')
    .add({
      winner,
      loser,
      timestamp
    })
    .then(match => {
      res.redirect(303, match.path.toString());
    });
});
