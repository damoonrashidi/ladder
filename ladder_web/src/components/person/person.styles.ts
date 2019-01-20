import { css } from 'glamor';

export const style = css({
  borderBottom: `1px solid #eee`,
  padding: `16px 0`,
  margin: `8px 0`,
  display: `flex`,
  flex: `0 1 auto`,
  justifyContent: `space-between`,
  alignItems: `center`,
}).toString();

export const wrapper = css({
  display: `flex`,
  alignItems: `flex-start`,
  justifyContent: `flex-start`,
  flex: `auto`,
  paddingLeft: 16,
  flexDirection: `column`,
  cursor: `pointer`,
}).toString();

export const name = css({
  display: `inline-flex`,
  justifyContent: `flex-start`,
  alignItems: `flex-start`,
}).toString();

export const number = css({
  fontFamily: 'Montserrat',
}).toString();

export const dropdown = (expanded: boolean) =>
  css({
    transition: `height .3s ease-out`,
    height: expanded ? 60 : 0,
    willChange: `height`,
    overflow: `hidden`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`,
  }).toString();

export const button = css({
  background: `#41a4f4`,
  color: `#fff`,
  border: `none`,
  padding: `8px 16px`,
  borderRadius: 25,
  outline: `none`,
  cursor: `pointer`,
  margin: `8px 8px`,
  transition: `transform .2s ease-out`,
  '&:active': {
    transform: `scaleX(1.05)`,
  },
}).toString();

export const nameColor = (listName: string, me: string) =>
  css({
    display: `inline-flex`,
    alignItems: `center`,
    justifyContent: `center`,
    color: listName === me ? '#00f' : '#000',
    fontWeight: listName === me ? 700 : 500,
    '>img': {
      display: `inline-block`,
      marginLeft: 8,
    },
  }).toString();
