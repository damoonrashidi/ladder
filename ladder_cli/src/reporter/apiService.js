const axios = require("axios");

module.exports = {
  getPeople(exclude, filter = undefined) {
    return axios
      .get("https://us-central1-ladder-41a39.cloudfunctions.net/people")
      .then(response => {
        return response.data
          .filter(person => person.name !== exclude)
          .filter(person => {
            if (filter === undefined) {
              return true;
            }

            return person.name.toLowerCase().includes(filter.toLowerCase());
          })
          .map(person => person.name);
      });
  },

  reportGame(answers) {
    const loser =
      answers.winner === answers.name ? answers.opponent : answers.name;

    return axios.post(
      "https://us-central1-ladder-41a39.cloudfunctions.net/reportGame",
      {
        winner: answers.winner,
        loser
      }
    );
  }
};
