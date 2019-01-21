import { Component, Prop, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { format } from 'date-fns';
import * as css from './profile-page.styles';

interface Game {
  winner: string;
  loser: string;
  timestamp: {
    nanoseconds: number;
    seconds: number;
  };
  rating: number;
  consecutiveWins: number;
}

@Component({
  tag: 'profile-page',
})
export class ProfilePageComponent {
  @State() games: Game[] = [];
  @State() name: string = '';
  @Prop() match: MatchResults;

  async componentWillLoad() {
    this.name = this.match.params.name;
    this.games = await (await fetch(
      `https://us-central1-ladder-41a39.cloudfunctions.net/person\?name\=${
        this.name
      }`
    )).json();
  }

  gameList() {
    return this.games.map(game => (
      <tr>
        <td>{game.winner}</td>
        <td>{game.loser}</td>
        <td>
          {format(game.timestamp.seconds * 1000, 'MMM Do HH:mm', {
            awareOfUnicodeTokens: true,
          })}
        </td>
        <td>{game.rating}</td>
      </tr>
    ));
  }

  render() {
    return (
      <div>
        <h1 class={css.title}>{this.name}</h1>
        <table class={css.table}>
          <tr class={css.tableHeading}>
            <td>Winner</td>
            <td>Loser</td>
            <td>Time</td>
            <td>Rating</td>
          </tr>
          {this.gameList()}
        </table>
      </div>
    );
  }
}
