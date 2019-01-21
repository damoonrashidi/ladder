import { Component, Prop, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';

@Component({
  tag: 'profile-page',
})
export class ProfilePageComponent {
  @State() games: any[] = [];
  @State() name: string = '';
  @Prop() match: MatchResults;

  componentWillLoad() {
    this.name = this.match.params.name;
  }

  componentWillUpdate() {
    this.name = this.match.params.name;
  }

  render() {
    return <div>This is the profile for {this.name}</div>;
  }
}
