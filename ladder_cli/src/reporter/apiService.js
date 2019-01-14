const axios = require('axios');
const cachios = require('cachios');
const format = require('date-fns').format;
const differenceInDays = require('date-fns').differenceInDays;

module.exports = {
  getPeople(exclude, filter = undefined) {
    return cachios
      .get('https://us-central1-ladder-41a39.cloudfunctions.net/people', {
        ttl: 300,
      })
      .then(response =>
        response.data
          .filter(person => person.name !== exclude)
          .filter(person => {
            if (filter === undefined) {
              return true;
            }

            return person.name.toLowerCase().includes(filter.toLowerCase());
          })
          .map(person => person.name)
      );
  },

  getRankings() {
    return cachios
      .get('https://us-central1-ladder-41a39.cloudfunctions.net/people', {
        ttl: 300,
      })
      .then(response => response.data.sort((a, b) => b.points - a.points));
  },

  getProfile(name) {
    return cachios
      .get(
        `https://us-central1-ladder-41a39.cloudfunctions.net/person?name=${name}`,
        {
          ttl: 300,
        }
      )
      .then(res => res.data);
  },

  getHistory() {
    return cachios
      .get('https://us-central1-ladder-41a39.cloudfunctions.net/games', {
        ttl: 300,
      })
      .then(response =>
        response.data
          .sort(
            (a, b) =>
              Date.parse(b.timestamp.seconds) - Date.parse(a.timestamp.seconds)
          )
          .filter(
            game =>
              differenceInDays(Date.now(), game.timestamp.seconds * 1000) <= 2
          )
          .map(game => {
            return `${format(game.timestamp.seconds * 1000, 'YYYY MMM dd', {
              awareOfUnicodeTokens: true,
            })} - ${game.winner} beat ${game.loser}`;
          })
      );
  },

  reportGame(answers) {
    const loser =
      answers.winner === answers.name ? answers.opponent : answers.name;

    return axios.post(
      'https://us-central1-ladder-41a39.cloudfunctions.net/reportGame',
      {
        winner: answers.winner,
        loser,
      }
    );
  },
};
