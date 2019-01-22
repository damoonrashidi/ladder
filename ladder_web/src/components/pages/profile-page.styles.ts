import { css } from 'glamor';

export const table = css({
  cellSpacing: 0,
  margin: `200px auto 0 auto`,
  '>tr >td': {
    padding: `8px 0`,
    width: 150,
  },
}).toString();

export const title = css({
  position: `absolute`,
  top: 0,
  left: 0,
  fontWeight: 400,
  fontFamily: `VT323`,
  textTransform: `uppercase`,
  fontSize: `10vw`,
  transform: `translate(-20px, -40px)`,
  lineHeight: 1,
  color: `#fff`,
}).toString();

export const tableHeading = css({
  fontWeight: 800,
}).toString();
