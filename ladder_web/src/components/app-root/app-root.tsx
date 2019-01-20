import { Component, State } from '@stencil/core';
import * as css from './app-root.styles';

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
      <div class={css.main}>
        <div>
          <h2 class={css.h2}>King of Pong</h2>
          <app-rankings name={this.name} />
        </div>
      </div>
    );
  }
}
