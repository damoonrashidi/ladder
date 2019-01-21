import { css } from 'glamor';

export const main = css({
  display: `flex`,
  justifyContent: `center`,
  margin: `300px 0 0 0`,
}).toString();

export const h2 = css({
  position: `absolute`,
  top: 0,
  left: 0,
  fontWeight: 800,
  fontFamily: `Roboto`,
  textTransform: `uppercase`,
  fontSize: `10vw`,
  transform: `translate(-20px, -40px)`,
  lineHeight: 1,
  color: `#f00`,
}).toString();
