import { Component, State } from '@stencil/core';
import '@stencil/router';

@Component({
  tag: 'app-root',
})
export class AppRoot {
  @State() name: string;

  componentWillLoad() {
    if (localStorage.getItem('name') === null) {
      this.name = window.prompt('Greetings challenger, what is your name?');
      localStorage.setItem('name', this.name);
    } else {
      this.name = localStorage.getItem('name');
    }
  }

  render() {
    return (
      <stencil-router>
        <stencil-route
          url="/"
          component="rankings-page"
          componentProps={{ name: this.name }}
        />

        <stencil-route url="/profile/:name" component="profile-page" />
      </stencil-router>
    );
  }
}
