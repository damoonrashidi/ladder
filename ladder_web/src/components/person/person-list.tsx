import { Component, State } from "@stencil/core";
import { css } from "glamor";
import { Person } from "./person.interface";

const list = css({
  width: `300px`
}).toString();

@Component({
  tag: "app-person-list"
})
export class PersonList {
  @State() people: Person[] = [];

  async componentWillLoad() {
    this.people = await (await fetch(
      "https://us-central1-ladder-41a39.cloudfunctions.net/people"
    )).json();
  }

  toPerson() {
    return this.people
      .sort((a, b) => b.points - a.points)
      .map(person => <app-person name={person.name} points={person.points} />);
  }

  render() {
    return <div class={list}>{this.toPerson()}</div>;
  }
}
