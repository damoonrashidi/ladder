import { Component, Prop } from '@stencil/core';
import { css } from 'glamor';

const style = css({
  display: `flex`,
  flexDirection: `row`,
  justifyContent: `space-between`,
  alignItems: `center`,
  padding: `10px 0`,
});

const numberStyle = css({
  fontFamily: 'Montserrat',
}).toString();

@Component({
  tag: 'app-person',
})
export class PersonComponent {
  @Prop() name: string;
  @Prop() points: number;

  render() {
    return (
      <div class={`${style}`}>
        <span>{this.name}</span>
        <span class={numberStyle}>{this.points}</span>
      </div>
    );
  }
}
