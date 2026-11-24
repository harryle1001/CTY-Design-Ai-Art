import {Composition} from 'remotion';
import {Mockup} from './Mockup';
import {Reel} from './Reel';
import {FPS, TOTAL, fr} from './timing';
export const Root = () => (
  <>
    <Composition id="Reel" component={Reel} durationInFrames={fr(TOTAL)} fps={FPS} width={1080} height={1920} />
    <Composition id="Mockup" component={Mockup} durationInFrames={90} fps={30} width={1080} height={1920}
      defaultProps={{v: 'A' as 'A' | 'B' | 'C'}} />
  </>
);
