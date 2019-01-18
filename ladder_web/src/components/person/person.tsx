import { Component, Prop } from '@stencil/core';
import { Person } from './person.interface';
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

const nameStyle = css({
  display: `inline-flex`,
  justifyContent: `center`,
  alignItems: `center`,
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
  @Prop() person: Person;

  gotBeat() {
    const loser = this.person.name;
    fetch('https://us-central1-ladder-41a39.cloudfunctions.net/reportGame', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ winner: this.name, loser }),
    });
  }

  render() {
    return (
      <div class={style}>
        <span class={nameStyle}>
          {this.person.consecutiveWins >= 3 ? (
            <div>
              <img src="/assets/whatshot.svg" />{' '}
              <span> x {this.person.consecutiveWins}</span>
            </div>
          ) : (
            <span />
          )}
          {this.person.name}
        </span>
        <span class={numberStyle}>{this.person.points}</span>
        <button class={button} onClick={() => this.gotBeat()}>
          Gottem!
        </button>
      </div>
    );
  }
}
