import { Component } from '@stencil/core';
import { css } from 'glamor';

const main = css({
  width: `100vw`,
  height: `100vh`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  '>div:first-child': {
    margin: `0 80px 0 0`,
  },
}).toString();

@Component({
  tag: 'app-root',
})
export class AppRoot {
  render() {
    return (
      <div class={main}>
        <div>
          <h2>King of Pong</h2>
          <app-person-list />
        </div>
        <div>
          <h2>History</h2>
          <app-history-list />
        </div>
      </div>
    );
  }
}
