import { Component, Prop, State } from '@stencil/core';
import '@stencil/router';
import { Person } from './person.interface';
import * as css from './person.styles';

@Component({
  tag: 'app-person',
})
export class PersonComponent {
  @Prop() name: string = '';
  @Prop() points: number;
  @Prop() person: Person;
  @Prop() rank: number;
  @State() expanded = false;

  async gotBeat() {
    const loser = this.person.name;
    console.log(JSON.stringify({ winner: this.name, loser }));
    const response = await fetch(
      'https://us-central1-ladder-41a39.cloudfunctions.net/reportGame',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ winner: this.name, loser }),
      }
    );
    console.log(response);
  }

  toggle() {
    this.expanded = !this.expanded;
  }

  listName(name: string, consecutiveWins: number) {
    if (consecutiveWins >= 3) {
      return (
        <div class={css.wrapper}>
          <div class={css.nameColor(name, this.name)}>
            {name}
            <img src="/assets/whatshot.svg" /> x {this.person.consecutiveWins}
          </div>
        </div>
      );
    }
    return (
      <div class={css.wrapper}>
        <div class={css.nameColor(name, this.name)}>{name}</div>
      </div>
    );
  }

  render() {
    return (
      <div onClick={this.toggle.bind(this)}>
        <div class={css.style}>
          <span>{this.rank}.</span>
          {this.listName(this.person.name, this.person.consecutiveWins)}
          <span class={css.number}>{this.person.points}</span>
        </div>
        <div class={css.dropdown(this.expanded)}>
          <div>
            <button class={css.button}>Gottem!</button>
            <button class={css.button}>Got got :(</button>
          </div>
          <stencil-route-link
            url={`/profile/${this.person.name}`}
            class={css.profile}
          >
            Profile
          </stencil-route-link>
        </div>
      </div>
    );
  }
}
