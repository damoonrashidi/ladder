import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'app-person'
})
export class PersonComponent {
  @Prop() name: string;
  @Prop() points: number;

  render() {
    return (
      <div>
        {this.name} - {this.points}
      </div>
    );
  }
}
