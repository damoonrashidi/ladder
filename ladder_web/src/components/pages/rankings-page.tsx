import { Component, Prop } from '@stencil/core';
import * as css from './rankings-page.styles';

@Component({
  tag: 'rankings-page',
})
export class RankingsPage {
  @Prop() name: string;

  render() {
    return (
      <div class={css.main}>
        <div>
          <h2 class={css.h2}>King of Pong</h2>
          <app-rankings
            name={this.name}
            style={{ perspective: `1000px`, display: `block` }}
          />
        </div>
      </div>
    );
  }
}
