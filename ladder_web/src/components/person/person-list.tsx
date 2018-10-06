import { Component, State } from '@stencil/core';
import { Person } from './person.interface';

@Component({
  tag: 'app-person-list'
})
export class PersonList {
  @State() people: Person[] = [];

  async componentWillLoad() {
    try {
      this.people = await (await fetch(
        'https://us-central1-ladder-41a39.cloudfunctions.net/people'
      )).json();
    } catch (e) {
      console.log(e);
    }
  }

  toPerson() {
    return this.people.map(person => (
      <app-person name={person.name} points={person.points} />
    ));
  }

  render() {
    return (
      <div>
        <h2>King of Pong</h2>
        {this.toPerson()}
      </div>
    );
  }
}
