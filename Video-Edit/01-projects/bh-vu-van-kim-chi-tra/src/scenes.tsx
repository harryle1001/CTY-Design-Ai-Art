import React from 'react';
import {AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {T} from './theme';
import {CTA_AT, HOOK_END, S2_ZOOM, S3, fr} from './timing';
import {
  BgMesh, Bill, BottomStrip, Contract, IBan, ICheck, IChat, IGift, IKey, IWarn, IX, LogoBadge, Talent,
  enter, exitStyle, useBreathe, useExit, useSpring,
} from './components';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
type SP = {from: number; dur: number};

const Pill: React.FC<{bg?: string; children: React.ReactNode; size?: number; style?: React.CSSProperties}> = ({bg = T.red, children, size = T.fs.s, style}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 10, background: bg, color: T.white, fontWeight: 800, fontSize: size,
    padding: '10px 26px', borderRadius: 16, boxShadow: T.shadow, lineHeight: 1.2, ...style}}>{children}</div>
);

// ——— Thẻ mở đầu (hook) trên ảnh 2 — cũng là ảnh bìa ———
const HookCard: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const a = useSpring(2), b = useSpring(2 + T.beat.a), c = useSpring(2 + T.beat.b + T.beat.a), q = useSpring(2 + T.beat.d, {damping: 8, stiffness: 160, mass: 0.6});
  const out = interpolate(f, [dur - T.beat.b, dur], [0, 1], {...clamp, easing: T.easeIn});
  const kb = interpolate(f, [0, dur], [1, 1.04], clamp);
  return (
    <AbsoluteFill style={{opacity: 1 - out, transform: `scale(${1 + out * 0.15})`}}>
      <Img src={staticFile('frame.jpg')} style={{width: 1080, height: 1920, transform: `scale(${kb})`}} />
      <div style={{position: 'absolute', top: 520, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
        <div style={enter(a)}><Pill size={T.fs.m}>CÓ BẢO HIỂM</Pill></div>
        <div style={{...enter(b), fontSize: T.fs.l, fontWeight: 900, color: T.navy, lineHeight: 1.05, letterSpacing: -2}}>= CHẮC CHẮN</div>
        <div style={{...enter(c), fontSize: T.fs.l, fontWeight: 900, color: T.navy, lineHeight: 1.05, letterSpacing: -2}}>ĐƯỢC CHI TRẢ</div>
        <div style={{fontSize: 170, fontWeight: 900, color: T.red, lineHeight: 1, opacity: q, transform: `scale(${0.4 + 0.6 * q}) rotate(${(1 - q) * -20}deg)`,
          textShadow: `0 0 42px ${T.red}55`}}>?</div>
      </div>
    </AbsoluteFill>
  );
};

// ——— Cảnh 1: giơ hợp đồng ———
export const Scene1: React.FC<SP> = ({from, dur}) => {
  const hook = fr(HOOK_END);
  const t = useSpring(hook + T.beat.a);
  const e = useExit(dur);
  return (
    <AbsoluteFill>
      <Talent from={from} style={{inset: 0}} />
      <LogoBadge delay={hook} />
      <div style={{position: 'absolute', top: 300, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, ...enter(t), ...exitStyle(e)}}>
        <Pill>CÓ BẢO HIỂM = CHẮC CHẮN</Pill>
        <Pill bg={T.navy}>ĐƯỢC CHI TRẢ?</Pill>
      </div>
      <Sequence durationInFrames={hook}><HookCard dur={hook} /></Sequence>
    </AbsoluteFill>
  );
};

// ——— Cảnh 2: chỉ vào chữ nhỏ ———
export const Scene2: React.FC<SP> = ({from, dur}) => {
  const f = useCurrentFrame();
  const zAt = fr(S2_ZOOM) - from;
  const zoom = interpolate(f, [zAt, zAt + T.beat.c], [1, 1.14], {...clamp, easing: T.ease});
  const stampAt = T.beat.c, chipsAt = Math.round(dur * 0.62);
  const stamp = useSpring(stampAt, {damping: 9, stiffness: 180, mass: 0.7});
  const stampOut = interpolate(f, [chipsAt - T.beat.b, chipsAt], [1, 0], clamp);
  const title = useSpring(T.beat.a);
  const chips = [0, 1, 2].map((i) => useSpring(chipsAt + i * T.beat.a)); // eslint-disable-line react-hooks/rules-of-hooks
  const e = useExit(dur);
  const names: [string, string][] = [['Quyền lợi', T.blue], ['Điều kiện chi trả', T.green], ['Điều khoản loại trừ', T.red]];
  return (
    <AbsoluteFill>
      <Talent from={from} zoom={zoom} style={{inset: 0}} />
      <LogoBadge />
      <div style={{position: 'absolute', top: 300, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, ...enter(title), ...exitStyle(e)}}>
        <Pill><IWarn size={42} /> NHẦM LẪN 3 KHÁI NIỆM CỐT LÕI</Pill>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
          {names.map(([n, c], i) => (
            <div key={n} style={{...enter(chips[i], 26), background: T.glass, color: c, fontWeight: 800, fontSize: T.fs.s, padding: '6px 26px',
              borderRadius: 42, borderLeft: `10px solid ${c}`, boxShadow: T.shadow}}>{i + 1}. {n}</div>))}
        </div>
      </div>
      <div style={{position: 'absolute', top: 900, width: '100%', display: 'flex', justifyContent: 'center', opacity: stamp * stampOut}}>
        <div style={{transform: `rotate(-8deg) scale(${2 - stamp})`, border: `8px solid ${T.red}`, color: T.red, background: 'rgba(255,255,255,.9)',
          fontSize: T.fs.m, fontWeight: 900, padding: '10px 26px', borderRadius: 16, textAlign: 'center', lineHeight: 1.1}}>
          KHÔNG PHẢI LÚC NÀO<br />CŨNG ĐƯỢC CHI TRẢ</div>
      </div>
    </AbsoluteFill>
  );
};

// ——— Cảnh 3: vé vào cửa + 3 khái niệm ———
type Item = {n: number; title: string; sub: string; color: string; Icon: React.FC<{size?: number; color?: string}>; ex: {t: string; no?: boolean}[]};
const ITEMS: Item[] = [
  {n: 1, title: 'Quyền lợi', sub: 'Bạn được bảo vệ gì?', color: T.blue, Icon: IGift,
    ex: [{t: 'Chi trả tiền nằm viện'}, {t: 'Nhận 500 triệu khi mắc bệnh hiểm nghèo'}]},
  {n: 2, title: 'Điều kiện chi trả', sub: 'Cần thỏa mãn gì để nhận tiền?', color: T.green, Icon: IKey,
    ex: [{t: 'Hắt hơi sổ mũi, khám xong đi về', no: true}, {t: 'Nằm viện nội trú từ 24 giờ trở lên'}, {t: 'Có kết quả xét nghiệm chuẩn y khoa'}]},
  {n: 3, title: 'Điều khoản loại trừ', sub: 'Trường hợp KHÔNG chi trả', color: T.red, Icon: IBan,
    ex: [{t: 'Bệnh có sẵn nhưng giấu không khai', no: true}, {t: 'Tự gây thương tích cho bản thân', no: true}, {t: 'Tai nạn do rượu bia, chất cấm', no: true}]},
];

const Progress: React.FC<{active: number}> = ({active}) => (
  <div style={{position: 'absolute', top: 340, width: '100%', display: 'flex', justifyContent: 'center', gap: 16}}>
    {ITEMS.map((it) => {
      const done = it.n < active, on = it.n === active;
      return (
        <div key={it.n} style={{display: 'flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 42, fontSize: T.fs.xs, fontWeight: 800,
          background: on ? it.color : done ? T.glass : 'rgba(255,255,255,.5)', color: on ? '#fff' : done ? it.color : T.mute,
          boxShadow: on ? T.shadow : 'none', transform: `scale(${on ? 1.08 : 1})`}}>
          {done ? <ICheck size={26} color={it.color} /> : <span>{it.n}</span>} {it.title}
        </div>);
    })}
  </div>
);

const ItemCard: React.FC<{it: Item; dur: number}> = ({it, dur}) => {
  const f = useCurrentFrame();
  const s = useSpring(0);
  const e = useExit(dur);
  const br = useBreathe();
  const Icon = it.Icon;
  return (
    <AbsoluteFill>
      <Progress active={it.n} />
      <div style={{position: 'absolute', top: 470, left: 68, right: 68, opacity: e, transform: `translateX(${(1 - e) * -110}px)`}}>
        <div style={{...enter(s, 68), background: T.glass, borderRadius: 42, padding: 42, boxShadow: T.shadow, borderTop: `10px solid ${it.color}`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 26}}>
            <div style={{width: 128, height: 128, borderRadius: 64, background: it.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: `scale(${br})`, boxShadow: `0 0 42px ${it.color}55`}}><Icon size={68} /></div>
            <div>
              <div style={{fontSize: T.fs.s, fontWeight: 800, color: it.color}}>KHÁI NIỆM {it.n}</div>
              <div style={{fontSize: T.fs.m, fontWeight: 900, color: T.ink, lineHeight: 1.05, letterSpacing: -1}}>{it.title}</div>
            </div>
          </div>
          <div style={{fontSize: T.fs.s, fontWeight: 700, color: T.mute, marginTop: 26}}>{it.sub}</div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 16, marginTop: 26}}>
            {it.ex.map((x, i) => {
              const at = Math.round(dur * (0.28 + (i * 0.5) / it.ex.length));
              const es = Math.max(0, Math.min(1, (f - at) / T.beat.b));
              const pop = es > 0 ? 1 : 0;
              return (
                <div key={x.t} style={{display: 'flex', alignItems: 'center', gap: 16, opacity: es, transform: `translateX(${(1 - es) * 42}px)`,
                  background: x.no ? '#FFF1F2' : '#F0F6FF', borderRadius: 16, padding: '10px 16px'}}>
                  <div style={{width: 52, height: 52, borderRadius: 26, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: x.no ? T.red : it.color, transform: `scale(${pop})`}}>
                    {x.no ? <IX size={30} /> : <ICheck size={30} />}</div>
                  <div style={{fontSize: 38, fontWeight: 700, color: x.no ? '#9F1239' : T.ink, lineHeight: 1.25}}>{x.t}</div>
                </div>);
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Ticket: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const h = useSpring(0), tk = useSpring(T.beat.b);
  const rows = [0, 1, 2].map((i) => useSpring(Math.round(dur * 0.3) + i * T.beat.c)); // eslint-disable-line react-hooks/rules-of-hooks
  const e = useExit(dur);
  const float = Math.sin(f / 30) * 6;
  return (
    <AbsoluteFill style={{opacity: e}}>
      <div style={{position: 'absolute', top: 340, width: '100%', textAlign: 'center', ...enter(h)}}>
        <div style={{fontSize: T.fs.s, fontWeight: 800, color: T.blue}}>HỢP ĐỒNG BẢO HIỂM</div>
        <div style={{fontSize: T.fs.m, fontWeight: 900, color: T.navy, letterSpacing: -1}}>= TẤM VÉ VÀO CỬA</div>
      </div>
      <div style={{position: 'absolute', top: 560, left: 110, right: 110, ...enter(tk, 68), transform: `${enter(tk, 68).transform} translateY(${float}px) rotate(-2deg)`}}>
        <div style={{position: 'relative', background: `linear-gradient(135deg, ${T.blue}, ${T.navy})`, borderRadius: 42, padding: '42px 42px 42px 68px', boxShadow: T.shadow, color: '#fff'}}>
          {[-26, 'calc(100% - 26px)'].map((l, i) => (
            <div key={i} style={{position: 'absolute', top: '50%', left: l as any, width: 52, height: 52, marginTop: -26, borderRadius: 26, background: T.base}} />))}
          <div style={{fontSize: T.fs.xs, fontWeight: 800, letterSpacing: 6, opacity: 0.8}}>VÉ NHẬN TIỀN BẢO HIỂM</div>
          <div style={{borderTop: '4px dashed rgba(255,255,255,.4)', margin: '16px 0'}} />
          {ITEMS.map((it, i) => (
            <div key={it.n} style={{...enter(rows[i], 26), display: 'flex', alignItems: 'center', gap: 16, margin: '16px 0'}}>
              <div style={{width: 68, height: 68, borderRadius: 34, background: it.color, border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <it.Icon size={36} /></div>
              <div style={{fontSize: T.fs.s, fontWeight: 800}}>{it.title}</div>
            </div>))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Scene3: React.FC<SP> = ({from, dur}) => {
  const seg = (k: keyof typeof S3) => ({from: fr(S3[k][0]) - from, d: fr(S3[k][1] - S3[k][0])});
  const parts = [seg('i1'), seg('i2'), seg('i3')];
  const intro = seg('intro');
  return (
    <AbsoluteFill>
      <BgMesh />
      <BottomStrip />
      <LogoBadge top={130} />
      <Sequence from={intro.from} durationInFrames={intro.d}><Ticket dur={intro.d} /></Sequence>
      {parts.map((p, i) => <Sequence key={i} from={p.from} durationInFrames={p.d}><ItemCard it={ITEMS[i]} dur={p.d} /></Sequence>)}
      <TalentBubble from={from} left={760} top={1560} size={280} />
    </AbsoluteFill>
  );
};

const TalentBubble: React.FC<{from: number; left: number; top: number; size: number; delay?: number}> = ({from, left, top, size, delay = T.beat.b}) => {
  const s = useSpring(delay);
  return (
    <div style={{position: 'absolute', left, top, width: size, height: size, borderRadius: size / 2, overflow: 'hidden', border: '8px solid #fff',
      boxShadow: T.shadow, transform: `scale(${s})`}}>
      <Talent from={from} style={{inset: 0}} />
    </div>
  );
};

// ——— Cảnh 4: công thức được chi trả ———
export const Scene4: React.FC<SP> = ({from, dur}) => {
  const f = useCurrentFrame();
  const kb = interpolate(f, [0, dur], [1, 1.05], clamp);
  const head = useSpring(0);
  const rows = [0, 1, 2].map((i) => useSpring(T.beat.c + i * T.beat.c)); // eslint-disable-line react-hooks/rules-of-hooks
  const eqAt = T.beat.c * 4 + T.beat.b;
  const eq = useSpring(eqAt, {damping: 9, stiffness: 170, mass: 0.7});
  const e = useExit(dur);
  const br = useBreathe(18, 0.02);
  const items: [string, string, string][] = [['', 'Đúng quyền lợi', T.blue], ['+', 'Đủ điều kiện', T.green], ['−', 'Không loại trừ', T.red]];
  return (
    <AbsoluteFill>
      <Img src={staticFile('frame.jpg')} style={{width: 1080, height: 1920, transform: `scale(${kb})`, transformOrigin: '50% 100%'}} />
      <div style={{position: 'absolute', top: 470, width: '100%', textAlign: 'center', ...enter(head), opacity: e}}>
        <Pill bg={T.navy} size={T.fs.s}>TÓM LẠI: CÔNG THỨC ĐƯỢC CHI TRẢ</Pill>
      </div>
      <div style={{position: 'absolute', top: 600, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, opacity: e}}>
        {items.map(([op, t, c], i) => (
          <div key={t} style={{...enter(rows[i], 42), display: 'flex', alignItems: 'center', gap: 16}}>
            <span style={{fontSize: T.fs.m, fontWeight: 900, color: T.navy, width: 52, textAlign: 'center'}}>{op}</span>
            <div style={{background: c, color: '#fff', fontSize: 52, fontWeight: 900, padding: '16px 42px', borderRadius: 26, width: 620, textAlign: 'center', boxShadow: T.shadow}}>{t}</div>
            <span style={{width: 52}} />
          </div>))}
        <div style={{display: 'flex', alignItems: 'center', gap: 26, marginTop: 16, opacity: eq, transform: `scale(${(0.5 + 0.5 * eq) * br})`}}>
          <Contract size={110} />
          <div style={{fontSize: T.fs.l, fontWeight: 900, color: T.navy, lineHeight: 1, letterSpacing: -3, textShadow: `0 0 42px ${T.green}55`}}>= CHI TRẢ</div>
          <div style={{width: 110, height: 110, borderRadius: 55, background: T.green, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 42px ${T.green}88`}}>
            <ICheck size={68} /></div>
        </div>
      </div>
      <MoneyRain at={eqAt + T.beat.a} />
      <TalentBubble from={from} left={42} top={1440} size={300} delay={T.beat.a} />
    </AbsoluteFill>
  );
};

const MoneyRain: React.FC<{at: number}> = ({at}) => {
  const f = useCurrentFrame() - at;
  if (f < 0) return null;
  const bills = Array.from({length: 13}, (_, i) => ({x: (i * 397) % 1000 + 40, d: (i * 7) % 13, r: ((i * 53) % 60) - 30, sp: 15 + (i % 5) * 3}));
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {bills.map((b, i) => {
        const t = f - b.d;
        if (t < 0) return null;
        const y = -120 + t * b.sp + t * t * 0.12;
        const o = interpolate(y, [1300, 1700], [1, 0], clamp);
        return <div key={i} style={{position: 'absolute', left: b.x, top: y, opacity: o, transform: `rotate(${b.r + Math.sin(t / 6) * 20}deg)`}}><Bill w={120} /></div>;
      })}
    </AbsoluteFill>
  );
};

// ——— Cảnh 5: kêu gọi ———
export const Scene5: React.FC<SP> = ({from, dur}) => {
  const f = useCurrentFrame();
  const box = useSpring(0);
  const ctaAt = fr(CTA_AT) - from;
  const cta = useSpring(ctaAt);
  const btn = useSpring(ctaAt + T.beat.b, {damping: 9, stiffness: 160, mass: 0.7});
  const pulse = 1 + Math.max(0, Math.sin((f - ctaAt) / 8)) * 0.05;
  return (
    <AbsoluteFill>
      <Img src={staticFile('frame.jpg')} style={{width: 1080, height: 1920}} />
      <div style={{position: 'absolute', top: 440, left: 162, width: 756, height: 600, borderRadius: 42, overflow: 'hidden', border: '8px solid #fff', boxShadow: T.shadow, ...enter(box, 68)}}>
        <Talent from={from} style={{inset: 0}} />
      </div>
      <div style={{position: 'absolute', top: 1070, left: 68, right: 68, ...enter(cta, 42)}}>
        <div style={{background: T.glass, borderRadius: 26, padding: 26, boxShadow: T.shadow, textAlign: 'center'}}>
          <div style={{fontSize: 38, fontWeight: 700, color: T.ink}}>Nhắn tin hoặc để lại SĐT để được</div>
          <div style={{fontSize: T.fs.m, fontWeight: 900, color: T.red, letterSpacing: -1}}>TƯ VẤN MIỄN PHÍ</div>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 16, marginTop: 16, background: T.blue, color: '#fff', fontSize: T.fs.s, fontWeight: 900,
            padding: '16px 42px', borderRadius: 68, transform: `scale(${btn * pulse})`, boxShadow: `0 0 42px ${T.blue}77`}}>
            <IChat size={42} /> NHẮN TIN NGAY</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
