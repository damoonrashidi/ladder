const axios = require('axios');
const cachios = require('cachios');

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

  getHistory() {
    return cachios
      .get('https://us-central1-ladder-41a39.cloudfunctions.net/games', {
        ttl: 300,
      })
      .then(response =>
        response.data.sort((a, b) => b.timestamp - a.timestamp).map(
          game =>
            `${new Date(Date.parse(game.timestamp))
              .toISOString()
              .substr(0, 19)
              .replace('T', ' ')} - ${game.winner} beat ${game.loser}`
        )
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
