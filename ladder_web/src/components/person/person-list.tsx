import { Component, State, Prop } from '@stencil/core';
import { css } from 'glamor';
import { Person } from './person.interface';

const list = css({
  width: 300,
}).toString();

@Component({
  tag: 'app-rankings',
})
export class PersonListComponent {
  @State() people: Person[] = [];
  @Prop() name: string = '';

  async componentWillLoad() {
    this.people = await (await fetch(
      'https://us-central1-ladder-41a39.cloudfunctions.net/people'
    )).json();
  }

  toPerson() {
    return this.people
      .sort((a, b) => b.points - a.points)
      .map(person => <app-person person={person} name={this.name} />);
  }

  render() {
    return <div class={list}>{this.toPerson()}</div>;
  }
}
