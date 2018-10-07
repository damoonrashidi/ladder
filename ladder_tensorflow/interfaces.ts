export interface Game {
  winner: string;
  loser: string;
  timestamp: string;
  rating: number;
  consecutiveWins: number;
}

export default [
  {
    timestamp: '2018-09-13T10:31:00.000Z',
    winner: 'Damoon',
    loser: 'Freddy',
    rating: 1513,
    consecutiveWins: 1,
  },
  {
    winner: 'Arvid',
    loser: 'Damoon',
    timestamp: '2018-09-16T22:00:00.000Z',
    rating: 1499,
    consecutiveWins: 0,
  },
  {
    loser: 'Elias',
    timestamp: '2018-09-26T22:00:00.000Z',
    winner: 'Damoon',
    rating: 1512,
    consecutiveWins: 1,
  },
  {
    winner: 'Pablo',
    loser: 'Damoon',
    timestamp: '2018-10-01T22:00:00.000Z',
    rating: 1498,
    consecutiveWins: 0,
  },
  {
    winner: 'Damoon',
    loser: 'Christian',
    timestamp: '2018-10-03T16:55:00.000Z',
    rating: 1511,
    consecutiveWins: 1,
  },
  {
    timestamp: '2018-10-04T22:00:00.000Z',
    winner: 'Mange',
    loser: 'Damoon',
    rating: 1497,
    consecutiveWins: 0,
  },
  {
    winner: 'Damoon',
    loser: 'Johannes',
    timestamp: '2018-10-05T22:00:00.000Z',
    rating: 1510,
    consecutiveWins: 1,
  },
];
