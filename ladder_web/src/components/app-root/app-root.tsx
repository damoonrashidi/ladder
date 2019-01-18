import { Component, State } from '@stencil/core';
import { css } from 'glamor';

const main = css({}).toString();

@Component({
  tag: 'app-root',
})
export class AppRoot {
  @State() name: string;

  componentWillLoad() {
    if (localStorage.getItem('name') === null) {
      this.name = window.prompt('Greetings challenger, what is your name?');
      localStorage.setItem('name', this.name);
    }
    this.name = localStorage.getItem('name');
  }

  render() {
    return (
      <div class={main}>
        <div>
          <h2>King of Pong</h2>
          <app-person-list name={this.name} />
        </div>
        <div>
          <h2>History</h2>
          <app-history-list name={this.name} />
        </div>
      </div>
    );
  }
}
