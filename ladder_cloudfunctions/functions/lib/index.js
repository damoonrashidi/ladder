"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const firebase = require("firebase");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
firebase.initializeApp(Object.assign({}, functions.config().firebase, { projectId: 'ladder-41a39' }));
const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true,
});
exports.rating = (winner, loser) => {
    const K = 32;
    const pWinner = 1 / (1 + Math.pow(10, (loser - winner) / 400));
    const pLoser = 1 / (1 + Math.pow(10, (winner - loser) / 400));
    const rWinner = winner + K * (1 - pWinner);
    const rLoser = loser + K * (0 - pLoser);
    return {
        winner: Math.ceil(rWinner),
        loser: Math.ceil(rLoser),
    };
};
exports.simulate = functions.https.onRequest((req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.send(exports.rating(+req.query.winner, +req.query.loser));
});
exports.games = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    return db
        .collection('games')
        .orderBy('timestamp', 'desc')
        .get()
        .then(snapshot => {
        let _games = [];
        snapshot.forEach(game => (_games = _games.concat(game.data())));
        res.send(_games);
    });
}));
exports.people = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    const consecutiveWins = new Map();
    return db
        .collection('games')
        .orderBy('timestamp', 'asc')
        .get()
        .then(snapshot => {
        const rankings = new Map();
        snapshot.forEach(match => {
            const { winner, loser } = match.data();
            const newRatings = exports.rating(rankings.get(winner) || 1500, rankings.get(loser) || 1500);
            consecutiveWins.set(winner, (consecutiveWins.get(winner) || 0) + 1);
            consecutiveWins.set(loser, 0);
            rankings.set(winner, newRatings.winner);
            rankings.set(loser, newRatings.loser);
        });
        res.send([...rankings].map(([name, points]) => ({
            name,
            points,
            consecutiveWins: consecutiveWins.get(name),
        })));
    });
}));
exports.person = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    const name = req.query.name.toLowerCase();
    const ratings = new Map();
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
            if (name === winner) {
                consecutiveWins += 1;
            }
            else if (name === loser) {
                consecutiveWins = 0;
            }
            const newRatings = exports.rating(ratings.get(winner) || 1500, ratings.get(loser) || 1500);
            ratings.set(winner, newRatings.winner);
            ratings.set(loser, newRatings.loser);
            if ([winner, loser].includes(name)) {
                _games = _games.concat(Object.assign({}, game.data(), { rating: newRatings[name === winner ? 'winner' : 'loser'], consecutiveWins }));
            }
        });
        res.send(_games);
    });
}));
exports.reportGame = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    const timestamp = new Date();
    const { winner, loser } = req.body;
    if (winner === '' || loser === '') {
        throw new Error('Both winner and loser must be defined');
    }
    return db
        .collection('games')
        .add({
        winner: winner.trim(),
        loser: loser.trim(),
        timestamp,
    })
        .then(match => {
        res.redirect(303, match.path.toString());
    })
        .catch(console.log);
}));
//# sourceMappingURL=index.js.map