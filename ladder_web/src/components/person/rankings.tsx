import { Component, State, Prop } from '@stencil/core';
import { Person } from './person.interface';
import * as css from './rankings.styles';

@Component({
  tag: 'app-rankings',
})
export class RankingsComponent {
  @State() people: Person[] = [];
  @State() query: string = '';
  @Prop() name: string = '';

  async componentWillLoad() {
    this.people = await (await fetch(
      'https://us-central1-ladder-41a39.cloudfunctions.net/people'
    )).json();
  }

  setQuery(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    this.query = target.value.toLowerCase();
  }

  toPerson() {
    let elements = this.people
      .sort((a, b) => b.points - a.points)
      .filter(
        person =>
          this.query === '' ||
          person.name.toLowerCase().match(this.query) ||
          (person.consecutiveWins >= 3 &&
            ['hot', 'lit', 'fire', 'eld'].includes(this.query))
      )
      .map((person, rank) => (
        <app-person person={person} name={this.name} rank={rank + 1} />
      ));
    return [
      elements.slice(0, 5),
      <hr class={css.hr} />,
      elements.slice(5, elements.length - 1),
    ];
  }

  render() {
    return (
      <div class={css.list}>
        <div>
          <input
            class={css.input}
            onKeyUp={this.setQuery.bind(this)}
            placeholder="Find a player"
          />
        </div>
        {this.toPerson()}
      </div>
    );
  }
}
