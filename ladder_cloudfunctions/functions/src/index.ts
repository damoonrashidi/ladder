import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

export const allMatches = functions.https.onRequest(async (req, res) => {
  return db
    .collection('matches')
    .orderBy('timestamp', 'desc')
    .get()
    .then(snapshot => {
      let matches = [];
      snapshot.forEach(match => (matches = matches.concat(match.data())));
      res.send(matches);
    });
});

export const allPeople = functions.https.onRequest(async (req, res) => {
  return db
    .collection('matches')
    .orderBy('timestamp', 'desc')
    .get()
    .then(snapshot => {
      const people = new Set();
      snapshot.forEach((match) => {
        people.add(match.data().winner);
        people.add(match.data().loser);
      });
      res.send([...people].sort((a, b) => a < b ? -1 : 1));
    });
});

export const reportMatch = functions.https.onRequest(async (req, res) => {
  const now = new Date();
  const { winner, loser } = req.body;
  return db
    .collection('matches')
    .add({
      winner,
      loser,
      timestamp: now,
    })
    .then(match => {
      res.redirect(303, match.path.toString());
    });
});
