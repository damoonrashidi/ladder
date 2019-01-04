import { Component } from '@stencil/core';
import { css } from 'glamor';

const main = css({
  width: `100vw`,
  height: `100vh`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  '>div:first-child': {
    margin: `0 200px 0 0`,
  },
}).toString();

const me = css({
  position: `fixed`,
  top: 0,
  right: 0,
  background: `#4F7BE8`,
  width: 300,
  height: 300,
  padding: `80px 80px 60px 60px`,
  color: `#fff`,
  display: `flex`,
  transform: `translate(100px, -140px)`,
  alignItems: `flex-end`,
  justifyContent: `flex-start`,
  borderRadius: `50%`,
}).toString();

@Component({
  tag: 'app-root',
})
export class AppRoot {
  render() {
    return (
      <div class={main}>
        <app-avatar user={'Damoon'} points={1500} class={me} />
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
