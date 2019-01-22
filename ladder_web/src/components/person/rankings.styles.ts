import { css, keyframes } from 'glamor';

export const listAnimation = keyframes({
  '0%': {
    transform: `rotate3d(1, 1, 1, 1.5deg)`,
  },
  '100%': {
    transform: `rotate3d(1, 1, 1, 1.5deg) translateY(-20px)`,
  },
});

export const list = css({
  width: 500,
  display: `block`,
  background: `#f00`,
  boxShadow: `10px 10px 0 #b00`,
  padding: 40,
  animation: `${listAnimation} 2s ease-in-out infinite alternate`,
}).toString();

export const input = css({
  outline: `none`,
  padding: 8,
  border: `2px solid #fff`,
  margin: `8px 0`,
  font: `500 24px/1em 'VT323'`,
  background: `#000`,
  color: `#fff`,
  textShadow: `1px 3px 0 #000`,
  boxShadow: `6px 6px 0 #000`,
  width: `100%`,
}).toString();

export const hr = css({
  border: `none`,
  height: `4px`,
  background: `linear-gradient(90deg, #f00, #0f0, #00f)`,
}).toString();
