import { Component } from '@stencil/core';
import { Game } from './game.interface';

@Component({
  tag: 'app-history-list',
})
export class HistoryListComponent {
  games: Game[];

  async componentWillLoad() {
    this.games = await (await fetch(
      'https://us-central1-ladder-41a39.cloudfunctions.net/history'
    )).json();
  }

  render() {
    return <div>Hello</div>;
  }
}
