import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {T, fontFamily} from './theme';
import {CTA_AT, HAS_VIDEO, HOOK_END, KEYWORDS, S2_ZOOM, S3, SCENES, TOTAL, VOICE, VOICE_FILE, fr} from './timing';
import REAL from './words.json';
import {Grade, Grain, Vignette} from './components';
import {Scene1, Scene2, Scene3, Scene4, Scene5} from './scenes';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const MAP: Record<string, React.FC<{from: number; dur: number}>> = {s1: Scene1, s2: Scene2, s3: Scene3, s4: Scene4, s5: Scene5};

// ——— Phụ đề theo từng chữ (thời gian ước lượng theo độ dài chữ; thay bằng words.json khi có video) ———
type W = {w: string; s: number; e: number};
const EST: W[] = VOICE.flatMap((v) => {
  const ws = v.text.split(/\s+/).filter(Boolean);
  const wt = ws.map((w) => w.length + 2 + (/[.,:?!]$/.test(w) ? 4 : 0));
  const tot = wt.reduce((a, b) => a + b, 0);
  const span = v.end - v.start - 0.4;
  let t = v.start + 0.15;
  return ws.map((w, i) => {const d = (wt[i] / tot) * span; const o = {w, s: t, e: t + d}; t += d; return o;});
});
// Ưu tiên thời gian thật đã căn theo giọng đọc
const WORDS: W[] = (REAL as W[]).length ? (REAL as W[]) : EST;
type Page = {words: W[]; s: number; e: number};
const PAGES: Page[] = (() => {
  const out: Page[] = []; let cur: W[] = [];
  WORDS.forEach((w, i) => {
    cur.push(w);
    const next = WORDS[i + 1];
    if (cur.length >= 4 || /[.,:?!]$/.test(w.w) || !next || next.s - w.e > 0.3) {out.push({words: cur, s: cur[0].s, e: w.e}); cur = [];}
  });
  return out.map((p, i) => ({...p, e: out[i + 1] ? Math.min(out[i + 1].s, p.e + 0.4) : p.e + 0.4}));
})();
const isKey = (w: string) => KEYWORDS.some((k) => w.replace(/[.,:?!"]/g, '').toLowerCase() === k.toLowerCase());

const Captions: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  if (t < HOOK_END) return null;
  if (t >= CTA_AT) return null; // thẻ kêu gọi thay chỗ phụ đề
  const sc = SCENES.find((s) => t >= s.start && t < s.end);
  const p = PAGES.find((pg) => t >= pg.s && t < pg.e);
  if (!p || !sc) return null;
  const pop = spring({frame: f - fr(p.s), fps, config: {damping: 12, stiffness: 200, mass: 0.6}});
  const full = sc.kind === 'full';
  const top = full ? 1420 : sc.kind === 'cta' ? 1080 : 1330; // 1187 = 61.8% chiều cao
  return (
    <div style={{position: 'absolute', top, left: 68, right: 68, display: 'flex', justifyContent: 'center'}}>
      <div style={{fontSize: full ? 62 : 48, fontWeight: 900, textAlign: 'center', lineHeight: 1.25, opacity: pop,
        transform: `scale(${0.85 + 0.15 * pop}) translateY(${(1 - pop) * 16}px)`,
        ...(full ? {color: '#fff', textShadow: '0 4px 0 #0B2A7A, 0 0 16px rgba(0,0,0,.45)'} :
          {color: '#fff', background: 'rgba(11,42,122,.86)', padding: '10px 26px', borderRadius: 26, boxShadow: T.shadow})}}>
        {p.words.map((w, i) => {
          const on = t >= w.s && t < w.e + 0.05;
          const k = isKey(w.w);
          return <span key={i} style={{color: on ? T.yellow : k ? (full ? '#FFE98A' : '#9CC3FF') : '#fff',
            display: 'inline-block', transform: `scale(${on ? 1.08 : 1})`, marginRight: 14}}>{w.w}</span>;
        })}
      </div>
    </div>
  );
};

// ——— Chuyển cảnh: tấm xanh quét chéo, cắt nằm giữa ———
const CUTS = SCENES.slice(1).map((s) => s.start);
const Wipes: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {CUTS.map((c) => {
        const at = fr(c), len = T.beat.c;
        if (f < at - len / 2 || f > at + len / 2) return null;
        const x = interpolate(f, [at - len / 2, at + len / 2], [-1700, 1700], {...clamp, easing: T.ease});
        return (
          <div key={c} style={{position: 'absolute', top: -300, left: x, width: 1400, height: 2520, transform: 'skewX(-14deg)',
            background: `linear-gradient(90deg, ${T.sky}, ${T.blue} 30%, ${T.navy} 70%, ${T.blue})`, boxShadow: `0 0 110px ${T.blue}`}} />);
      })}
    </AbsoluteFill>
  );
};

// ——— Âm thanh: SFX vào 2–3 khung TRƯỚC hình ———
const Sfx: React.FC = () => {
  const hits: [string, number, number][] = [
    ['pop', 2, 0.5], ['pop', 2 + T.beat.a, 0.4], ['pop', 2 + T.beat.b + T.beat.a, 0.4], ['ding', 2 + T.beat.d, 0.45],
    ['whoosh', fr(HOOK_END) - 8, 0.5],
    ['stamp', fr(SCENES[1].start) + T.beat.c - 2, 0.6], ['whoosh', fr(S2_ZOOM) - 3, 0.35],
    ...CUTS.map((c) => ['whoosh', fr(c) - 8, 0.55] as [string, number, number]),
    ...(['i1', 'i2', 'i3'] as const).map((k) => ['pop', fr(S3[k][0]) - 2, 0.45] as [string, number, number]),
    ['ding', fr(SCENES[3].start) + T.beat.c * 4 + T.beat.b - 2, 0.55], ['cash', fr(SCENES[3].start) + T.beat.c * 4 + T.beat.b + 3, 0.5],
    ['ding', fr(CTA_AT) - 2, 0.5],
  ];
  return <>{hits.map(([n, at, v], i) => <Sequence key={i} from={Math.max(0, at)} durationInFrames={45}><Audio src={staticFile(`sfx/${n}.wav`)} volume={v} /></Sequence>)}</>;
};

export const Reel: React.FC = () => (
  <AbsoluteFill style={{fontFamily, background: T.base}}>
    {SCENES.map((s) => {
      const C = MAP[s.id];
      return <Sequence key={s.id} from={fr(s.start)} durationInFrames={fr(s.end - s.start)}><C from={fr(s.start)} dur={fr(s.end - s.start)} /></Sequence>;
    })}
    <Captions />
    <Wipes />
    <Grade />
    <Grain />
    <Vignette />
    {HAS_VIDEO ? <Audio src={staticFile('talk.mp4')} /> : <Audio src={staticFile(VOICE_FILE)} />}
    <Audio loop src={staticFile('sfx/pad.wav')} volume={(f) => interpolate(f, [0, 30, fr(TOTAL) - 45, fr(TOTAL)], [0, 0.1, 0.1, 0], clamp)} />
    <Sfx />
  </AbsoluteFill>
);
