import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'app-avatar',
})
export class AvatarComponent {
  @Prop() user: string = '';
  @Prop() points: number = 0;

  render() {
    return (
      <div>
        <h3>{this.user}</h3>
        <p>{this.points}</p>
      </div>
    );
  }
}
