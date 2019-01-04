import { Component, Prop } from '@stencil/core';
import { css } from 'glamor';

const style = css({
  display: `flex`,
  flexDirection: `row`,
  justifyContent: `space-between`,
  alignItems: `center`,
  padding: `10px 0`,
}).toString();

const numberStyle = css({
  fontFamily: 'Montserrat',
}).toString();

@Component({
  tag: 'app-person',
})
export class PersonComponent {
  @Prop() name: string;
  @Prop() points: number;

  gotBeat() {
    fetch('https://us-central1-ladder-41a39.cloudfunctions.net/reportGame', {
      method: 'POST',
      body: JSON.stringify({ winner: 'Damoon', loser: this.name }),
    });
  }

  render() {
    return (
      <div class={style}>
        <span>{this.name}</span>
        <span class={numberStyle}>{this.points}</span>
        <button onClick={() => this.gotBeat()}>Gottem!</button>
      </div>
    );
  }
}
