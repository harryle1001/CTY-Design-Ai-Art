// Tổng hợp bộ SFX nhỏ (WAV 16-bit) — không cần tải về
import fs from 'node:fs';
const SR = 44100;
const wav = (name, samples) => {
  const n = samples.length, b = Buffer.alloc(44 + n * 2);
  b.write('RIFF', 0); b.writeUInt32LE(36 + n * 2, 4); b.write('WAVEfmt ', 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22);
  b.writeUInt32LE(SR, 24); b.writeUInt32LE(SR * 2, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34); b.write('data', 36); b.writeUInt32LE(n * 2, 40);
  samples.forEach((s, i) => b.writeInt16LE(Math.max(-1, Math.min(1, s)) * 32767 | 0, 44 + i * 2));
  fs.writeFileSync(`public/sfx/${name}.wav`, b);
};
let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
const gen = (dur, fn) => Array.from({length: Math.round(dur * SR)}, (_, i) => fn(i / SR, i));
// whoosh: nhiễu lọc thông thấp, biên độ lên-xuống
let lp = 0; wav('whoosh', gen(0.42, (t) => { const env = Math.sin(Math.PI * Math.min(1, t / 0.42)) ** 2; const a = 0.04 + 0.25 * env; lp += a * (rnd() - lp); return lp * 1.6 * env; }));
// pop: sin hạ cao độ
let ph = 0; wav('pop', gen(0.14, (t) => { ph += 2 * Math.PI * (900 - 3500 * t) / SR; return Math.sin(ph) * Math.exp(-t * 30) * 0.8; }));
// ding: chuông 2 họa âm
wav('ding', gen(0.9, (t) => (Math.sin(2 * Math.PI * 1318 * t) + 0.5 * Math.sin(2 * Math.PI * 2637 * t)) * Math.exp(-t * 5) * 0.45));
// stamp: thump trầm + tiếng gõ
let p2 = 0; wav('stamp', gen(0.35, (t) => { p2 += 2 * Math.PI * (140 - 200 * t) / SR; return (Math.sin(p2) * Math.exp(-t * 14) + rnd() * Math.exp(-t * 60) * 0.5) * 0.9; }));
// cash: ting-ting + xào giấy
wav('cash', gen(0.8, (t) => { const a = Math.sin(2 * Math.PI * 1760 * t) * Math.exp(-t * 7); const b = t > 0.09 ? Math.sin(2 * Math.PI * 2349 * (t - 0.09)) * Math.exp(-(t - 0.09) * 6) : 0; return (a + b) * 0.35 + rnd() * Math.exp(-t * 18) * 0.15; }));
// pad: hợp âm Cmaj9 êm, vòng lặp 16 s liền mạch
const notes = [130.81, 196.0, 246.94, 293.66, 329.63];
wav('pad', gen(16, (t) => notes.reduce((s, f, k) => s + Math.sin(2 * Math.PI * f * t) * (0.5 + 0.5 * Math.sin(2 * Math.PI * t / 16 * (k % 2 ? 1 : 2) + k)), 0) * 0.09));
console.log('sfx ok', fs.readdirSync('public/sfx'));
