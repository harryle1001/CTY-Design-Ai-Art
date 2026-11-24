import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {T} from './theme';
import {HAS_VIDEO, LIP, VOICE_FILE, fr} from './timing';
import {useAudioData, visualizeAudio} from '@remotion/media-utils';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const useSpring = (delay = 0, cfg = T.spring) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - delay, fps, config: cfg});
};
// Vào: opacity + trượt lên + phóng nhẹ (3 thuộc tính)
export const enter = (s: number, dist = 42): React.CSSProperties => ({
  opacity: Math.min(1, s * 1.3),
  transform: `translateY(${(1 - s) * dist}px) scale(${0.9 + 0.1 * s})`,
});
// Ra: nhanh hơn vào (8 khung)
export const useExit = (dur: number, len = T.beat.b) => {
  const f = useCurrentFrame();
  return interpolate(f, [dur - len, dur], [1, 0], {...clamp, easing: T.easeIn});
};
export const exitStyle = (e: number): React.CSSProperties => ({opacity: e, transform: `translateY(${(1 - e) * -26}px)`});
export const useBreathe = (speed = 22, amt = 0.015) => 1 + Math.sin(useCurrentFrame() / speed) * amt;

export const BgMesh: React.FC = () => {
  const f = useCurrentFrame();
  const d1 = Math.sin(f / 55) * 50, d2 = Math.cos(f / 70) * 42;
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #F6F9FF 0%, ${T.base} 61.8%, #DCE8FB 100%)`}}>
      <div style={{position: 'absolute', width: 1200, height: 1200, borderRadius: '50%', top: -450, left: -300 + d1, filter: 'blur(60px)',
        background: `radial-gradient(circle, ${T.sky}40, transparent 62%)`}} />
      <div style={{position: 'absolute', width: 900, height: 900, borderRadius: '50%', bottom: -300, right: -250 - d2, filter: 'blur(70px)',
        background: `radial-gradient(circle, ${T.blue}26, transparent 65%)`}} />
    </AbsoluteFill>
  );
};

// Dải trang trí cắt từ ảnh nền (sóng, ô dù, tim, bóng gia đình)
export const BottomStrip: React.FC = () => {
  const f = useCurrentFrame();
  const drift = Math.sin(f / 60) * 10;
  return (
    <div style={{position: 'absolute', left: -20 + drift, bottom: 0, width: 1120, height: 600, overflow: 'hidden',
      WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 34%)', maskImage: 'linear-gradient(180deg, transparent 0%, #000 34%)'}}>
      <Img src={staticFile('bg.jpg')} style={{position: 'absolute', width: 1120, top: -573}} />
    </div>
  );
};

// Logo cắt từ khung (ảnh 2)
export const LogoBadge: React.FC<{top?: number; scale?: number; delay?: number; right?: boolean}> = ({top = 130, scale = 0.72, delay = 0, right = false}) => {
  const s = useSpring(delay);
  return (
    <div style={{position: 'absolute', top, width: '100%', display: 'flex', justifyContent: right ? 'flex-end' : 'center', paddingRight: right ? 26 : 0, boxSizing: 'border-box', ...enter(s, 26)}}>
      <div style={{background: T.glass, borderRadius: 26, padding: '10px 26px', boxShadow: T.shadow, backdropFilter: 'blur(10px)'}}>
        <div style={{width: 600 * scale, height: 152 * scale, backgroundImage: `url(${staticFile('frame.jpg')})`,
          backgroundSize: `${1080 * scale}px ${1920 * scale}px`, backgroundPosition: `${-238 * scale}px ${-247 * scale}px`}} />
      </div>
    </div>
  );
};

const Placeholder: React.FC<{zoom: number}> = ({zoom}) => {
  const f = useCurrentFrame();
  const bob = Math.sin(f / 9) * 4; // giả lập đang nói
  return (
    <AbsoluteFill style={{background: 'linear-gradient(165deg,#D7E2F5,#8FA6CF)', alignItems: 'center', justifyContent: 'flex-end',
      transform: `scale(${zoom})`, transformOrigin: '50% 30%'}}>
      <svg viewBox="0 0 200 230" style={{width: '72%', transform: `translateY(${bob}px)`}}>
        <circle cx="100" cy="72" r="44" fill="#5B739E" />
        <path d="M14 230c0-62 38-98 86-98s86 36 86 98z" fill="#5B739E" />
        <rect x="118" y="150" width="54" height="70" rx="4" fill="#fff" opacity=".9" transform="rotate(-12 145 185)" />
      </svg>
      <div style={{position: 'absolute', top: '42%', fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: 2, textAlign: 'center',
        background: 'rgba(11,42,122,.45)', padding: '6px 16px', borderRadius: 10}}>▶ VIDEO ANH KIM</div>
    </AbsoluteFill>
  );
};

// Người nói: video thật (tắt tiếng, âm thanh phát từ track chung) hoặc khung giữ chỗ
export const Talent: React.FC<{from: number; style?: React.CSSProperties; zoom?: number}> = ({from, style, zoom = 1}) => (
  <div style={{position: 'absolute', overflow: 'hidden', ...style}}>
    {HAS_VIDEO ? (
      <OffthreadVideo src={staticFile('talk.mp4')} startFrom={from} muted
        style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${zoom})`, transformOrigin: '50% 30%'}} />
    ) : (() => {
      const lip = LIP.find(([, a, b]) => from >= fr(a) && from < fr(b));
      return lip ? (
        <OffthreadVideo src={staticFile(lip[0])} startFrom={from - fr(lip[1])} muted
          style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 20%', transform: `scale(${zoom})`, transformOrigin: '50% 32%'}} />
      ) : <Presenter from={from} zoom={zoom} />;
    })()}
  </div>
);

// Người dẫn từ ảnh tĩnh: Ken Burns + nhịp gật nhẹ theo âm lượng giọng đọc (không giả khẩu hình)
export const useVoiceLevel = (from: number) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const data = useAudioData(staticFile(VOICE_FILE));
  if (!data) return 0;
  const g = from + f;
  const s = visualizeAudio({fps, frame: g, audioData: data, numberOfSamples: 16});
  return Math.min(1, (s.slice(0, 6).reduce((a, b) => a + b, 0) / 6) * 6);
};
const Presenter: React.FC<{from: number; zoom: number}> = ({from, zoom}) => {
  const f = useCurrentFrame();
  const lv = useVoiceLevel(from);
  const kb = 1.02 + ((from + f) % 900) / 900 * 0.06; // phóng chậm, liền mạch qua các cảnh
  const sway = Math.sin((from + f) / 47) * 6;
  return (
    <AbsoluteFill style={{background: '#1b2540'}}>
      <Img src={staticFile('talent.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 20%',
        transform: `scale(${kb * zoom}) translate(${sway}px, ${-lv * 5}px) rotate(${lv * 0.35}deg)`, transformOrigin: '50% 32%'}} />
    </AbsoluteFill>
  );
};

// Sóng âm nhỏ: báo hiệu người dẫn đang nói
export const VoiceBars: React.FC<{from: number; style?: React.CSSProperties}> = ({from, style}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const data = useAudioData(staticFile(VOICE_FILE));
  const vals = data ? visualizeAudio({fps, frame: from + f, audioData: data, numberOfSamples: 32}).slice(1, 8) : [0, 0, 0, 0, 0, 0, 0];
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 6, height: 42, padding: '0 16px', borderRadius: 26, background: 'rgba(11,42,122,.8)', ...style}}>
      {vals.map((v, i) => <div key={i} style={{width: 6, borderRadius: 3, background: '#fff', height: 8 + Math.min(1, v * 9) * 26}} />)}
    </div>
  );
};

export const Grade: React.FC = () => (
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    <AbsoluteFill style={{backgroundColor: T.blue, mixBlendMode: 'soft-light', opacity: 0.1}} />
  </AbsoluteFill>
);
export const Grain: React.FC = () => {
  const f = useCurrentFrame();
  const noise = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;
  return <AbsoluteFill style={{pointerEvents: 'none', backgroundImage: noise, backgroundSize: '220px',
    backgroundPosition: `${(f * 7) % 220}px ${(f * 13) % 220}px`, opacity: 0.04, mixBlendMode: 'multiply'}} />;
};
export const Vignette: React.FC = () => (
  <AbsoluteFill style={{pointerEvents: 'none', background: 'radial-gradient(ellipse at center, transparent 58%, rgba(11,42,122,0.16) 100%)'}} />
);

// ——— Icon SVG (không dùng emoji) ———
type IP = {size?: number; color?: string};
export const IGift = ({size = 68, color = '#fff'}: IP) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5" /></svg>);
export const IKey = ({size = 68, color = '#fff'}: IP) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="4.5" /><path d="M10.7 12.3 21 2M16 7l3 3M18.5 4.5l2 2" /></svg>);
export const IBan = ({size = 68, color = '#fff'}: IP) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round">
    <circle cx="12" cy="12" r="9" /><path d="M5.6 5.6l12.8 12.8" /></svg>);
export const ICheck = ({size = 68, color = '#fff'}: IP) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12.5l5 5L20 6.5" /></svg>);
export const IX = ({size = 42, color = '#fff'}: IP) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={3} strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const IWarn = ({size = 42, color = '#fff'}: IP) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3 2 20h20z" /><path d="M12 10v4M12 17.5v.01" /></svg>);
export const IChat = ({size = 42, color = '#fff'}: IP) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg>);
export const Contract: React.FC<{size?: number}> = ({size = 160}) => (
  <svg width={size} height={size * 1.25} viewBox="0 0 80 100">
    <rect x="4" y="4" width="72" height="92" rx="8" fill="#fff" stroke={T.blue} strokeWidth="4" />
    <rect x="12" y="12" width="56" height="16" rx="4" fill={T.blue} />
    <text x="40" y="24" fontSize="8" fontWeight="800" fill="#fff" textAnchor="middle" fontFamily="sans-serif">HỢP ĐỒNG</text>
    {[38, 50, 62, 74].map((y) => <rect key={y} x="14" y={y} width={y === 74 ? 30 : 52} height="5" rx="2.5" fill="#C9D6EE" />)}
    <circle cx="62" cy="80" r="9" fill={T.red} opacity=".9" />
  </svg>
);
export const Bill: React.FC<{w?: number}> = ({w = 130}) => (
  <svg width={w} height={w * 0.5} viewBox="0 0 100 50">
    <rect x="1" y="1" width="98" height="48" rx="6" fill="#2BB673" stroke="#178A52" strokeWidth="2" />
    <circle cx="50" cy="25" r="13" fill="#178A52" />
    <text x="50" y="31" fontSize="16" fontWeight="900" fill="#E9FFF3" textAnchor="middle" fontFamily="sans-serif">₫</text>
  </svg>
);
