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
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
exports.rating = (winner, loser) => {
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
exports.games = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
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
}));
exports.people = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET');
    return db
        .collection('games')
        .orderBy('timestamp', 'desc')
        .get()
        .then(snapshot => {
        const _people = new Map();
        snapshot.forEach(match => {
            const { winner, loser } = match.data();
            const newRatings = exports.rating(_people.get(winner) || 1500, _people.get(loser) || 1500);
            _people.set(winner, newRatings.winner);
            _people.set(loser, newRatings.loser);
        });
        res.send([..._people].map(([name, points]) => ({ name, points })));
    });
}));
exports.person = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET');
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
            if (winner === name || loser === name) {
                consecutiveWins = name === winner ? consecutiveWins + 1 : 0;
                const newRatings = exports.rating(ratings.get(winner) || 1500, ratings.get(loser) || 1500);
                ratings.set(winner, newRatings.winner);
                ratings.set(loser, newRatings.loser);
                _games = _games.concat(Object.assign({}, game.data(), { rating: newRatings[name === winner ? 'winner' : 'loser'], consecutiveWins }));
            }
        });
        res.send(_games);
    });
}));
exports.reportGame = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
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
}));
//# sourceMappingURL=index.js.map