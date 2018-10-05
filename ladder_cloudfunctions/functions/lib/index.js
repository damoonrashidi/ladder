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
exports.allMatches = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    return db
        .collection('matches')
        .orderBy('timestamp', 'desc')
        .get()
        .then(snapshot => {
        let matches = [];
        snapshot.forEach(match => (matches = matches.concat(match.data())));
        res.send(matches);
    });
}));
exports.allPeople = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
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
}));
exports.reportMatch = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
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
}));
//# sourceMappingURL=index.js.map