/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';

import '@stencil/router';
import '@ionic/core';
import 'ionicons';
import {
  MatchResults,
} from '@stencil/router';
import {
  Person,
} from './components/person/person.interface';


export namespace Components {

  interface AppRoot {}
  interface AppRootAttributes extends StencilHTMLAttributes {}

  interface AppAvatar {
    'name': string;
    'points': number;
  }
  interface AppAvatarAttributes extends StencilHTMLAttributes {
    'name'?: string;
    'points'?: number;
  }

  interface AppHistoryList {
    'name': string;
  }
  interface AppHistoryListAttributes extends StencilHTMLAttributes {
    'name'?: string;
  }

  interface ProfilePage {
    'match': MatchResults;
  }
  interface ProfilePageAttributes extends StencilHTMLAttributes {
    'match'?: MatchResults;
  }

  interface RankingsPage {
    'name': string;
  }
  interface RankingsPageAttributes extends StencilHTMLAttributes {
    'name'?: string;
  }

  interface AppPerson {
    'name': string;
    'person': Person;
    'points': number;
    'rank': number;
  }
  interface AppPersonAttributes extends StencilHTMLAttributes {
    'name'?: string;
    'person'?: Person;
    'points'?: number;
    'rank'?: number;
  }

  interface AppRankings {
    'name': string;
  }
  interface AppRankingsAttributes extends StencilHTMLAttributes {
    'name'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'AppRoot': Components.AppRoot;
    'AppAvatar': Components.AppAvatar;
    'AppHistoryList': Components.AppHistoryList;
    'ProfilePage': Components.ProfilePage;
    'RankingsPage': Components.RankingsPage;
    'AppPerson': Components.AppPerson;
    'AppRankings': Components.AppRankings;
  }

  interface StencilIntrinsicElements {
    'app-root': Components.AppRootAttributes;
    'app-avatar': Components.AppAvatarAttributes;
    'app-history-list': Components.AppHistoryListAttributes;
    'profile-page': Components.ProfilePageAttributes;
    'rankings-page': Components.RankingsPageAttributes;
    'app-person': Components.AppPersonAttributes;
    'app-rankings': Components.AppRankingsAttributes;
  }


  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLAppAvatarElement extends Components.AppAvatar, HTMLStencilElement {}
  var HTMLAppAvatarElement: {
    prototype: HTMLAppAvatarElement;
    new (): HTMLAppAvatarElement;
  };

  interface HTMLAppHistoryListElement extends Components.AppHistoryList, HTMLStencilElement {}
  var HTMLAppHistoryListElement: {
    prototype: HTMLAppHistoryListElement;
    new (): HTMLAppHistoryListElement;
  };

  interface HTMLProfilePageElement extends Components.ProfilePage, HTMLStencilElement {}
  var HTMLProfilePageElement: {
    prototype: HTMLProfilePageElement;
    new (): HTMLProfilePageElement;
  };

  interface HTMLRankingsPageElement extends Components.RankingsPage, HTMLStencilElement {}
  var HTMLRankingsPageElement: {
    prototype: HTMLRankingsPageElement;
    new (): HTMLRankingsPageElement;
  };

  interface HTMLAppPersonElement extends Components.AppPerson, HTMLStencilElement {}
  var HTMLAppPersonElement: {
    prototype: HTMLAppPersonElement;
    new (): HTMLAppPersonElement;
  };

  interface HTMLAppRankingsElement extends Components.AppRankings, HTMLStencilElement {}
  var HTMLAppRankingsElement: {
    prototype: HTMLAppRankingsElement;
    new (): HTMLAppRankingsElement;
  };

  interface HTMLElementTagNameMap {
    'app-root': HTMLAppRootElement
    'app-avatar': HTMLAppAvatarElement
    'app-history-list': HTMLAppHistoryListElement
    'profile-page': HTMLProfilePageElement
    'rankings-page': HTMLRankingsPageElement
    'app-person': HTMLAppPersonElement
    'app-rankings': HTMLAppRankingsElement
  }

  interface ElementTagNameMap {
    'app-root': HTMLAppRootElement;
    'app-avatar': HTMLAppAvatarElement;
    'app-history-list': HTMLAppHistoryListElement;
    'profile-page': HTMLProfilePageElement;
    'rankings-page': HTMLRankingsPageElement;
    'app-person': HTMLAppPersonElement;
    'app-rankings': HTMLAppRankingsElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
