import { Component, Prop, Listen } from '@stencil/core';
import { css } from 'glamor';

const host = css({
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  height: `100vh`,
  width: `100vw`,
}).toString();

const h2 = css({
  letterSpacing: `-2px`,
  padding: `0 0 50px 0`,
  fontWeight: `600`,
  fontSize: `4em`,
  textShadow: `0 30px 150px rgba(0, 0, 0, .3)`,
}).toString();

@Component({
  tag: 'app-root',
})
export class AppRoot {
  @Prop({ connect: 'ion-toast-controller' })
  toastCtrl: HTMLIonToastControllerElement;

  @Listen('window:swUpdate')
  async onSWUpdate() {
    const toast = await this.toastCtrl.create({
      message: 'New version available',
      showCloseButton: true,
      closeButtonText: 'Reload',
    });
    await toast.present();
    await toast.onWillDismiss();
    window.location.reload();
  }

  render() {
    return (
      <div class={host}>
        <div>
          <h2 class={h2}>King of Pong</h2>
          <app-person-list />
        </div>
      </div>
    );
  }
}
