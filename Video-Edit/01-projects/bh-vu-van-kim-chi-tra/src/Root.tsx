import {Composition} from 'remotion';
import {Mockup} from './Mockup';
export const Root = () => (
  <Composition id="Mockup" component={Mockup} durationInFrames={90} fps={30} width={1080} height={1920}
    defaultProps={{v: 'A' as 'A' | 'B' | 'C'}} />
);
