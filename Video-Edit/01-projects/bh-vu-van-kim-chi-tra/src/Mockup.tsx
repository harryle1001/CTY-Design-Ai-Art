import {AbsoluteFill, Img, staticFile, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {T, fontFamily} from './theme';
const useIn = (delay: number) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const s = spring({frame: f - delay, fps, config: T.spring});
  return {opacity: s, transform: `translateY(${(1 - s) * 40}px) scale(${0.94 + 0.06 * s})`};
};
const Pill = ({children, bg = T.red}: any) => (
  <div style={{background: bg, color: T.white, fontWeight: 800, fontSize: 42, padding: '10px 26px', borderRadius: 16,
    boxShadow: '0 10px 26px rgba(11,42,122,.25)'}}>{children}</div>
);
const Person = ({style}: any) => (
  <div style={{background: 'linear-gradient(160deg,#c9d6ee,#8fa6cf)', borderRadius: 42, overflow: 'hidden', display: 'flex',
    alignItems: 'flex-end', justifyContent: 'center', border: '6px solid #fff', boxShadow: '0 26px 68px rgba(11,42,122,.3)', ...style}}>
    <svg viewBox="0 0 200 220" style={{width: '62%'}}><circle cx="100" cy="70" r="42" fill="#5b739e"/><path d="M20 220c0-55 36-90 80-90s80 35 80 90z" fill="#5b739e"/></svg>
    <div style={{position: 'absolute', marginBottom: 16, fontSize: 26, color: '#fff', fontWeight: 700}}>▶ VIDEO ANH KIM QUAY</div>
  </div>
);
const Caption = ({words, hi}: {words: string; hi: string}) => (
  <div style={{fontSize: 52, fontWeight: 900, color: T.white, textAlign: 'center', lineHeight: 1.3,
    textShadow: '0 4px 0 #0B2A7A, 0 0 18px rgba(0,0,0,.35)'}}>
    {words.split(' ').map((w, i) => <span key={i} style={{color: w === hi ? '#FFE14D' : T.white}}>{w} </span>)}
  </div>
);
export const Mockup = ({v}: {v: 'A' | 'B' | 'C'}) => {
  const a = useIn(0), b = useIn(6), c = useIn(12), d = useIn(18);
  if (v === 'A') return (
    <AbsoluteFill style={{fontFamily}}>
      <Img src={staticFile('frame.jpg')} style={{width: 1080, height: 1920}} />
      <div style={{position: 'absolute', top: 430, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
        <div style={a}><Pill>CÓ BẢO HIỂM</Pill></div>
        <div style={{...b, fontSize: 68, fontWeight: 900, color: T.navy, textAlign: 'center', lineHeight: 1.1}}>= CHẮC CHẮN<br/>ĐƯỢC CHI TRẢ?</div>
      </div>
      <Person style={{...c, position: 'absolute', top: 680, left: 110, width: 520, height: 650}} />
      <div style={{position: 'absolute', top: 1360, left: 60, width: 520, ...d}}><Caption words="liệu cứ nằm viện là 100% được chi trả?" hi="100%" /></div>
    </AbsoluteFill>
  );
  if (v === 'B') {
    const items = [['1', 'Quyền lợi', 'Bạn được bảo vệ gì?', T.blue], ['2', 'Điều kiện chi trả', 'Cần thỏa mãn gì để nhận tiền?', T.green], ['3', 'Điều khoản loại trừ', 'Trường hợp KHÔNG chi trả', T.red]];
    const st = [b, c, d];
    return (
      <AbsoluteFill style={{fontFamily, background: '#EAF1FD'}}>
        <Img src={staticFile('bg.jpg')} style={{position: 'absolute', width: 1080 * 1.7, height: 1131 * 1.7, left: -459, top: 0}} />
        <div style={{position: 'absolute', top: 470, width: '100%', textAlign: 'center', ...a}}>
          <div style={{fontSize: 42, fontWeight: 800, color: T.red}}>⚠ ĐỪNG NHẦM LẪN</div>
          <div style={{fontSize: 68, fontWeight: 900, color: T.navy, lineHeight: 1.15}}>3 KHÁI NIỆM<br/>CỐT LÕI</div>
        </div>
        <div style={{position: 'absolute', top: 760, left: 68, right: 68, display: 'flex', flexDirection: 'column', gap: 26}}>
          {items.map(([n, t, s, col], i) => (
            <div key={n} style={{...st[i], display: 'flex', alignItems: 'center', gap: 26, background: T.glass, borderRadius: 26, padding: 26,
              boxShadow: '0 16px 42px rgba(11,42,122,.15)', borderLeft: `10px solid ${col}`}}>
              <div style={{width: 110, height: 110, borderRadius: 55, background: col, color: '#fff', fontSize: 68, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{n}</div>
              <div><div style={{fontSize: 52, fontWeight: 900, color: T.ink}}>{t}</div><div style={{fontSize: 34, fontWeight: 500, color: '#3b4a6b'}}>{s}</div></div>
            </div>))}
        </div>
        <div style={{position: 'absolute', bottom: 150, width: '100%', textAlign: 'center', fontSize: 30, color: T.navy, fontWeight: 700}}>🎙 Giọng đọc AI tiếng Việt · không cần quay</div>
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill style={{fontFamily}}>
      <Img src={staticFile('frame.jpg')} style={{width: 1080, height: 1920}} />
      <Person style={{position: 'absolute', top: 0, left: 0, width: 1080, height: 1920, borderRadius: 0, border: 'none', opacity: 0.0}} />
      <div style={{position: 'absolute', top: 470, width: '100%', textAlign: 'center', ...a}}>
        <div style={{fontSize: 42, fontWeight: 800, color: T.blue}}>CÔNG THỨC ĐƯỢC CHI TRẢ</div>
      </div>
      <div style={{position: 'absolute', top: 580, left: 68, right: 68, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center'}}>
        {[['Đúng quyền lợi', T.blue, '', b], ['Đủ điều kiện', T.green, '+', c], ['Không loại trừ', T.red, '−', d]].map(([t, col, op, s]: any) => (
          <div key={t} style={{...s, display: 'flex', alignItems: 'center', gap: 16}}>
            <span style={{fontSize: 68, fontWeight: 900, color: T.navy, width: 60}}>{op}</span>
            <div style={{background: col, color: '#fff', fontSize: 52, fontWeight: 900, padding: '16px 42px', borderRadius: 26, minWidth: 560, textAlign: 'center'}}>{t}</div>
          </div>))}
        <div style={{...d, marginTop: 16, fontSize: 110, fontWeight: 900, color: T.navy, lineHeight: 1}}>= CHI TRẢ ✅</div>
      </div>
      <Person style={{position: 'absolute', top: 1180, left: 60, width: 300, height: 380, ...d}} />
    </AbsoluteFill>
  );
};
