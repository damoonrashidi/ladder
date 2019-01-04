import { Component, Prop } from '@stencil/core';
import { css } from 'glamor';

const style = css({
  display: `flex`,
  flexDirection: `row`,
  justifyContent: `space-between`,
  alignItems: `center`,
  padding: `10px 0`,
  '&:not(:hover)': {
    '> button': {
      display: `none`,
    },
  },
}).toString();

const button = css({
  background: `#41a4f4`,
  color: `#fff`,
  border: `none`,
  padding: `8px 16px`,
  borderRadius: 25,
  outline: `none`,
  cursor: `pointer`,
  transition: `transform .2s ease-out`,
  position: `absolute`,
  transform: `translateX(250px)`,
  '&:active': {
    transform: `translate(250px, 3px) scaleX(1.05)`,
  },
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
  @Prop() user: string;

  gotBeat() {
    fetch('https://us-central1-ladder-41a39.cloudfunctions.net/reportGame', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ winner: this.user, loser: this.name }),
    });
  }

  render() {
    return (
      <div class={style}>
        <span>{this.name}</span>
        <span class={numberStyle}>{this.points}</span>
        <button class={button} onClick={() => this.gotBeat()}>
          Gottem!
        </button>
      </div>
    );
  }
}
