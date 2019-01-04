import { Component } from '@stencil/core';
import { Game } from './game.interface';
import { css } from 'glamor';
const gameRow = css({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `space-between`,
  width: 300,
  padding: `16px 0`,
  '> span': {
    display: `inline-block`,
    width: 100,
    textAlign: `center`,
  },
}).toString();

@Component({
  tag: 'app-history-list',
})
export class HistoryListComponent {
  games: Game[] = [];

  async componentWillLoad() {
    this.games = await (await fetch(
      'https://us-central1-ladder-41a39.cloudfunctions.net/games'
    )).json();
  }

  render() {
    return (
      <div>
        {this.games.map(game => (
          <div class={gameRow}>
            <span>{game.winner}</span>
            <span>won vs</span>
            <span>{game.loser}</span>
          </div>
        ))}
      </div>
    );
  }
}
