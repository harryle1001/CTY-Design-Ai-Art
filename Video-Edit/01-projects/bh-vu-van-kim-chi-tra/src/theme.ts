import {loadFont} from '@remotion/google-fonts/BeVietnamPro';
export const {fontFamily} = loadFont('normal', {weights: ['500', '700', '800', '900'], subsets: ['vietnamese', 'latin']});
export const PHI = 1.61803;
export const T = {
  blue: '#1D4ED8', navy: '#0B2A7A', red: '#E11D2E', green: '#16A34A', ink: '#0F1B3D', white: '#FFFFFF',
  glass: 'rgba(255,255,255,0.78)',
  fs: [16, 26, 42, 68, 110], // thang φ
  sp: [6, 10, 16, 26, 42, 68, 110],
  spring: {damping: 14, stiffness: 120, mass: 0.8},
};
