import {loadFont} from '@remotion/google-fonts/BeVietnamPro';
import {Easing} from 'remotion';
export const {fontFamily} = loadFont('normal', {weights: ['500', '700', '800', '900'], subsets: ['vietnamese', 'latin']});
export const PHI = 1.61803;
// Thang φ: chữ 16·26·42·68·110 — khoảng cách 6·10·16·26·42·68·110 — nhịp 5·8·13·21 khung (≈162·262·424·700ms)
export const T = {
  blue: '#1D4ED8', sky: '#60A5FA', navy: '#0B2A7A', red: '#E11D2E', green: '#16A34A', yellow: '#FFD93D',
  ink: '#0F1B3D', mute: '#4A5878', white: '#FFFFFF', base: '#EEF3FC', glass: 'rgba(255,255,255,0.86)',
  fs: {xs: 26, s: 42, m: 68, l: 110},
  sp: {a: 6, b: 10, c: 16, d: 26, e: 42, f: 68, g: 110},
  beat: {a: 5, b: 8, c: 13, d: 21},
  spring: {damping: 14, stiffness: 120, mass: 0.8},
  springSoft: {damping: 20, stiffness: 90, mass: 1},
  ease: Easing.bezier(0.22, 1, 0.36, 1),
  easeIn: Easing.bezier(0.55, 0, 0.75, 0.2),
  shadow: '0 16px 42px rgba(11,42,122,.18)',
};
