import { Component } from '@stencil/core';

@Component({
  tag: 'app-root',
})
export class AppRoot {
  render() {
    return (
      <div>
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
