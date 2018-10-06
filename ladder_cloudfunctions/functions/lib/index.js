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
exports.games = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
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
}));
exports.person = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const name = req.query.name.toLowerCase();
    const ratings = new Map();
    return db
        .collection('games')
        .orderBy('timestamp', 'desc')
        .get()
        .then(snapshot => {
        let _games = [];
        snapshot.forEach(game => {
            const { winner, loser } = game.data();
            const playerFound = winner.toLowerCase() === name || loser.toLowerCase() === name;
            let consecutiveWins = 0;
            if (playerFound) {
                consecutiveWins =
                    name === winner.toLowerCase() ? consecutiveWins + 1 : 0;
                const newRating = exports.rating(ratings.get(winner) || 1500, ratings.get(loser) || 1500)[name === winner.toLowerCase() ? 'winner' : 'loser'];
                _games = _games.concat(Object.assign({}, game.data(), { rating: newRating, consecutiveWins }));
            }
        });
        res.send(_games);
    });
}));
exports.reportGame = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
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
}));
//# sourceMappingURL=index.js.map