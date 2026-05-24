// SVG イラスト生成

const COLORS = {
  red:    '#e94e4e',
  blue:   '#3a8fd8',
  green:  '#4caf50',
  yellow: '#ffd23f',
};
const SKIN = '#ffd9b3';
const HAIR = '#3d2617';
const OUTLINE = '#2b2b2b';
const SW = 2; // stroke width

// ---- 各モチーフ（viewBox 0 0 100 100 の中に描く）----

function ball(fill = '#ff6b6b') {
  return `
    <circle cx="50" cy="55" r="30" fill="${fill}" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <path d="M22 48 Q50 38 78 48" fill="none" stroke="${OUTLINE}" stroke-width="1.5"/>
    <path d="M22 62 Q50 72 78 62" fill="none" stroke="${OUTLINE}" stroke-width="1.5"/>
    <path d="M50 25 Q42 55 50 85" fill="none" stroke="${OUTLINE}" stroke-width="1.5"/>
    <ellipse cx="40" cy="44" rx="6" ry="4" fill="white" opacity="0.6"/>
  `;
}

function cake() {
  return `
    <rect x="20" y="55" width="60" height="30" rx="2" fill="#ffc8d6" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <path d="M20 55 Q30 48 40 55 Q50 48 60 55 Q70 48 80 55" fill="#fff5f9" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <circle cx="32" cy="70" r="3" fill="#e94e4e"/>
    <circle cx="50" cy="75" r="3" fill="#e94e4e"/>
    <circle cx="68" cy="70" r="3" fill="#e94e4e"/>
    <rect x="48" y="35" width="4" height="20" fill="#fff59d" stroke="${OUTLINE}" stroke-width="1"/>
    <path d="M50 33 Q46 28 50 22 Q54 28 50 33 Z" fill="#ff9800"/>
  `;
}

function cap() {
  return `
    <path d="M20 60 Q50 28 80 60 Z" fill="#4ea5d9" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <ellipse cx="50" cy="62" rx="32" ry="6" fill="#3a8bbf" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <path d="M50 62 Q52 72 75 70 L80 68 Q60 72 50 62 Z" fill="#3a8bbf" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <circle cx="50" cy="35" r="3" fill="#ffd23f"/>
  `;
}

function house() {
  return `
    <rect x="22" y="48" width="56" height="38" fill="#ffe082" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <path d="M18 50 L50 22 L82 50 Z" fill="#e94e4e" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <rect x="44" y="64" width="12" height="22" fill="#8d5524" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <circle cx="53" cy="75" r="1.5" fill="${OUTLINE}"/>
    <rect x="28" y="54" width="10" height="10" fill="#b3e5fc" stroke="${OUTLINE}" stroke-width="1.5"/>
    <rect x="62" y="54" width="10" height="10" fill="#b3e5fc" stroke="${OUTLINE}" stroke-width="1.5"/>
    <path d="M28 59 L38 59 M33 54 L33 64" stroke="${OUTLINE}" stroke-width="1"/>
    <path d="M62 59 L72 59 M67 54 L67 64" stroke="${OUTLINE}" stroke-width="1"/>
  `;
}

function dress(length) {
  // long: bottom y=90, short: y=60
  const by = length === 'long' ? 90 : 60;
  const bw = length === 'long' ? 45 : 30;
  return `
    <path d="M40 25 L60 25 L60 38 L${50+bw/2} ${by} L${50-bw/2} ${by} L40 38 Z"
          fill="#ff8ba7" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <circle cx="44" cy="32" r="1.5" fill="${OUTLINE}"/>
    <circle cx="50" cy="32" r="1.5" fill="${OUTLINE}"/>
    <circle cx="56" cy="32" r="1.5" fill="${OUTLINE}"/>
    <path d="M40 28 Q50 33 60 28" fill="none" stroke="${OUTLINE}" stroke-width="1"/>
  `;
}

function skirt(length) {
  const by = length === 'long' ? 88 : 58;
  const bw = length === 'long' ? 50 : 34;
  return `
    <path d="M35 32 L65 32 L${50+bw/2} ${by} L${50-bw/2} ${by} Z"
          fill="#c792ea" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <path d="M35 32 L65 32" stroke="${OUTLINE}" stroke-width="3"/>
  `;
}

function coat(length) {
  const by = length === 'long' ? 88 : 62;
  return `
    <path d="M28 32 L50 28 L72 32 L72 ${by} L28 ${by} Z"
          fill="#8d6e63" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <path d="M50 28 L50 ${by}" stroke="${OUTLINE}" stroke-width="1.5"/>
    <path d="M28 32 L40 42 L50 28" fill="#6d4c41" stroke="${OUTLINE}" stroke-width="1.5"/>
    <path d="M72 32 L60 42 L50 28" fill="#6d4c41" stroke="${OUTLINE}" stroke-width="1.5"/>
    <circle cx="47" cy="50" r="2" fill="#ffd23f" stroke="${OUTLINE}" stroke-width="1"/>
    <circle cx="47" cy="62" r="2" fill="#ffd23f" stroke="${OUTLINE}" stroke-width="1"/>
    <circle cx="47" cy="74" r="2" fill="#ffd23f" stroke="${OUTLINE}" stroke-width="1"/>
  `;
}

function socks(length) {
  const topY = length === 'long' ? 18 : 48;
  // two socks
  const makeSock = (x) => `
    <path d="M${x-7} ${topY} L${x+7} ${topY} L${x+7} 78 L${x+15} 78 L${x+15} 88 L${x-7} 88 Z"
          fill="#fff" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <rect x="${x-7}" y="${topY}" width="14" height="4" fill="#ff8ba7" stroke="${OUTLINE}" stroke-width="1"/>
    <path d="M${x-7} ${topY+10} L${x+7} ${topY+10}" stroke="#ff8ba7" stroke-width="2"/>
  `;
  return makeSock(30) + makeSock(60);
}

function bag() {
  return `
    <path d="M30 45 Q30 30 50 30 Q70 30 70 45" fill="none" stroke="${OUTLINE}" stroke-width="3"/>
    <rect x="22" y="45" width="56" height="40" rx="4" fill="#e57373" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <rect x="46" y="60" width="8" height="5" fill="#ffd23f" stroke="${OUTLINE}" stroke-width="1"/>
    <circle cx="50" cy="68" r="1.5" fill="${OUTLINE}"/>
  `;
}

function boots() {
  const makeBoot = (x) => `
    <path d="M${x-8} 28 L${x+8} 28 L${x+8} 70 L${x+18} 70 L${x+18} 82 L${x-8} 82 Z"
          fill="#ffeb3b" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <rect x="${x-8}" y="28" width="16" height="5" fill="#fbc02d" stroke="${OUTLINE}" stroke-width="1"/>
    <path d="M${x-8} 72 L${x+18} 72" stroke="${OUTLINE}" stroke-width="1"/>
  `;
  return makeBoot(30) + makeBoot(55);
}

function cup() {
  return `
    <path d="M28 35 L28 75 Q28 85 40 85 L60 85 Q72 85 72 75 L72 35 Z"
          fill="#fff" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <path d="M72 45 Q85 45 85 58 Q85 71 72 71"
          fill="none" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <rect x="28" y="35" width="44" height="6" fill="#4ea5d9" stroke="${OUTLINE}" stroke-width="1"/>
    <path d="M38 50 Q42 46 46 50 Q50 54 54 50 Q58 46 62 50"
          fill="none" stroke="#4ea5d9" stroke-width="2"/>
    <path d="M38 60 Q42 56 46 60 Q50 64 54 60 Q58 56 62 60"
          fill="none" stroke="#4ea5d9" stroke-width="2"/>
  `;
}

function watch() {
  return `
    <rect x="20" y="45" width="60" height="10" fill="#8d6e63" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <circle cx="50" cy="50" r="18" fill="#eceff1" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <circle cx="50" cy="50" r="14" fill="#fff" stroke="${OUTLINE}" stroke-width="1"/>
    <path d="M50 50 L50 40" stroke="${OUTLINE}" stroke-width="2" stroke-linecap="round"/>
    <path d="M50 50 L58 55" stroke="${OUTLINE}" stroke-width="2" stroke-linecap="round"/>
    <circle cx="50" cy="50" r="1.5" fill="${OUTLINE}"/>
    <text x="50" y="41" text-anchor="middle" font-size="5" font-family="sans-serif">12</text>
    <text x="62" y="53" text-anchor="middle" font-size="5" font-family="sans-serif">3</text>
    <text x="50" y="62" text-anchor="middle" font-size="5" font-family="sans-serif">6</text>
    <text x="38" y="53" text-anchor="middle" font-size="5" font-family="sans-serif">9</text>
  `;
}

function egg() {
  return `
    <ellipse cx="50" cy="55" rx="22" ry="28" fill="#fff3e0" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <ellipse cx="42" cy="45" rx="5" ry="3" fill="white" opacity="0.8"/>
  `;
}

function apple() {
  return `
    <path d="M50 30 Q60 25 62 20" fill="none" stroke="#6d4c41" stroke-width="2.5"/>
    <path d="M55 25 Q65 20 70 28 Q62 30 55 25 Z" fill="#66bb6a" stroke="${OUTLINE}" stroke-width="1.5"/>
    <path d="M50 30 Q25 28 25 55 Q25 85 50 85 Q75 85 75 55 Q75 28 50 30 Z"
          fill="#e94e4e" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <ellipse cx="38" cy="45" rx="5" ry="8" fill="white" opacity="0.4"/>
  `;
}

function flower() {
  const petal = (angle) => `
    <ellipse cx="50" cy="30" rx="8" ry="14"
             fill="#ff8ba7" stroke="${OUTLINE}" stroke-width="1.5"
             transform="rotate(${angle} 50 50)"/>
  `;
  return `
    ${[0, 72, 144, 216, 288].map(petal).join('')}
    <circle cx="50" cy="50" r="8" fill="#ffd23f" stroke="${OUTLINE}" stroke-width="1.5"/>
    <path d="M50 58 Q50 75 50 90" stroke="#4caf50" stroke-width="3" fill="none"/>
    <path d="M50 75 Q55 70 60 72 Q55 77 50 75" fill="#4caf50" stroke="${OUTLINE}" stroke-width="1"/>
  `;
}

function tree() {
  return `
    <rect x="44" y="55" width="12" height="35" fill="#6d4c41" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <circle cx="50" cy="35" r="25" fill="#4caf50" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <circle cx="38" cy="45" r="14" fill="#66bb6a" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <circle cx="62" cy="45" r="14" fill="#66bb6a" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <circle cx="45" cy="28" r="3" fill="#81c784" opacity="0.7"/>
    <circle cx="58" cy="33" r="3" fill="#81c784" opacity="0.7"/>
  `;
}

function bird(color = 'red') {
  const fill = COLORS[color] || COLORS.red;
  return `
    <ellipse cx="50" cy="55" rx="25" ry="18" fill="${fill}" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <circle cx="30" cy="40" r="12" fill="${fill}" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <circle cx="28" cy="38" r="2" fill="${OUTLINE}"/>
    <circle cx="28" cy="38" r="0.8" fill="white"/>
    <path d="M20 42 L10 42 L18 47 Z" fill="#ff9800" stroke="${OUTLINE}" stroke-width="1.5"/>
    <path d="M60 55 Q70 50 80 55 Q72 60 60 58 Z" fill="${fill}" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <path d="M45 60 Q55 68 45 70" fill="${fill}" stroke="${OUTLINE}" stroke-width="1.5"/>
    <path d="M40 72 L38 82 M50 72 L48 82" stroke="#ff9800" stroke-width="2" stroke-linecap="round"/>
  `;
}

function fish(color = 'red') {
  const fill = COLORS[color] || COLORS.red;
  return `
    <path d="M20 50 Q35 30 60 35 Q75 40 75 50 Q75 60 60 65 Q35 70 20 50 Z"
          fill="${fill}" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <path d="M75 50 L90 35 L88 50 L90 65 Z" fill="${fill}" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <circle cx="32" cy="47" r="3" fill="white" stroke="${OUTLINE}" stroke-width="1.5"/>
    <circle cx="32" cy="47" r="1.5" fill="${OUTLINE}"/>
    <path d="M45 40 Q50 50 45 60" fill="none" stroke="${OUTLINE}" stroke-width="1.5"/>
    <path d="M55 42 Q60 50 55 58" fill="none" stroke="${OUTLINE}" stroke-width="1.5"/>
    <path d="M38 60 Q42 65 38 70" fill="${fill}" stroke="${OUTLINE}" stroke-width="1.5"/>
  `;
}

function banana() {
  return `
    <path d="M25 70 Q20 40 50 25 Q60 22 70 25 Q65 30 55 30 Q30 42 35 70 Q35 78 40 80 Q30 78 25 70 Z"
          fill="#ffeb3b" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <path d="M65 27 L72 22" stroke="${OUTLINE}" stroke-width="2"/>
    <path d="M30 72 Q32 75 38 77" fill="none" stroke="${OUTLINE}" stroke-width="1"/>
  `;
}

function monkey() {
  return `
    <ellipse cx="50" cy="58" rx="26" ry="22" fill="#8d6e63" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <circle cx="28" cy="48" r="8" fill="#8d6e63" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <circle cx="28" cy="48" r="4" fill="#ffd9b3"/>
    <circle cx="72" cy="48" r="8" fill="#8d6e63" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <circle cx="72" cy="48" r="4" fill="#ffd9b3"/>
    <ellipse cx="50" cy="62" rx="18" ry="15" fill="#ffd9b3" stroke="${OUTLINE}" stroke-width="1.5"/>
    <circle cx="42" cy="54" r="2.5" fill="${OUTLINE}"/>
    <circle cx="58" cy="54" r="2.5" fill="${OUTLINE}"/>
    <ellipse cx="50" cy="65" rx="3" ry="2" fill="${OUTLINE}"/>
    <path d="M44 70 Q50 74 56 70" fill="none" stroke="${OUTLINE}" stroke-width="1.5"/>
  `;
}

// 子供キャラクター（I am ... 用）
function child(opts = {}) {
  const { girl = true, extras = '', shirtColor: shirtOverride = null, hairOverride = null, hideFace = false } = opts;
  const hairColor = hairOverride || (girl ? '#5d4037' : '#3d2617');
  const shirtColor = shirtOverride || (girl ? '#ff8ba7' : '#4ea5d9');
  return `
    ${girl ? `
      <path d="M30 38 Q30 18 50 18 Q70 18 70 38 L72 55 L65 55 L65 42 L35 42 L35 55 L28 55 Z"
            fill="${hairColor}" stroke="${OUTLINE}" stroke-width="${SW}"/>
    ` : `
      <path d="M32 30 Q32 18 50 18 Q68 18 68 30 L68 40 L32 40 Z"
            fill="${hairColor}" stroke="${OUTLINE}" stroke-width="${SW}"/>
    `}
    <circle cx="50" cy="38" r="16" fill="${SKIN}" stroke="${OUTLINE}" stroke-width="${SW}"/>
    ${girl ? `<path d="M34 28 Q34 20 50 20 Q66 20 66 28 Q66 32 62 34 L38 34 Q34 32 34 28 Z" fill="${hairColor}" stroke="${OUTLINE}" stroke-width="1.5"/>` : ''}
    <circle cx="44" cy="38" r="1.8" fill="${OUTLINE}"/>
    <circle cx="56" cy="38" r="1.8" fill="${OUTLINE}"/>
    <path d="M45 44 Q50 47 55 44" fill="none" stroke="${OUTLINE}" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M38 54 L62 54 L66 88 L34 88 Z" fill="${shirtColor}" stroke="${OUTLINE}" stroke-width="${SW}"/>
    ${extras}
  `;
}

// ---- 組み合わせ・レンダラ ----

// モチーフ描画関数（thing名 → 内側SVG）
function drawThing(thing, params = {}) {
  switch (thing) {
    case 'ball':   return ball(params.color);
    case 'cake':   return cake();
    case 'cap':    return cap();
    case 'house':  return house();
    case 'dress':  return dress(params.length);
    case 'skirt':  return skirt(params.length);
    case 'coat':   return coat(params.length);
    case 'socks':  return socks(params.length);
    case 'bag':    return bag();
    case 'boots':  return boots();
    case 'cup':    return cup();
    case 'watch':  return watch();
    case 'egg':    return egg();
    case 'apple':  return apple();
    case 'flower': return flower();
    case 'tree':   return tree();
    case 'bird':   return bird(params.color);
    case 'fish':   return fish(params.color);
    case 'banana': return banana();
    case 'monkey': return monkey();
    default:       return '';
  }
}

// 複数個をグリッドに並べる
function layoutGrid(count, innerFn) {
  let cols;
  if (count <= 2) cols = count;
  else if (count <= 4) cols = 2;
  else if (count <= 6) cols = 3;
  else if (count <= 9) cols = 3;
  else cols = 4;
  const rows = Math.ceil(count / cols);
  const cellW = 100 / cols;
  const cellH = 100 / rows;
  const scale = Math.min(cellW, cellH) / 100 * 0.95;
  let out = '';
  for (let i = 0; i < count; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;
    const cx = cellW * c + cellW / 2;
    const cy = cellH * r + cellH / 2;
    out += `<g transform="translate(${cx - 50 * scale},${cy - 50 * scale}) scale(${scale})">${innerFn()}</g>`;
  }
  return out;
}

// 大きさを示すために big/small を並べて比較（該当する方を強調）
function sizeCompare(thing, size) {
  const bigScale = 0.9;
  const smallScale = 0.45;
  const dimmed = 'opacity="0.25"';
  const bigAttr = size === 'big' ? '' : dimmed;
  const smallAttr = size === 'small' ? '' : dimmed;
  // big は左、small は右
  return `
    <g ${bigAttr} transform="translate(0,10) scale(${bigScale})">${drawThing(thing)}</g>
    <g ${smallAttr} transform="translate(55,35) scale(${smallScale})">${drawThing(thing)}</g>
    <g font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">
      <text x="23" y="98" fill="${size === 'big' ? '#e94e4e' : '#888'}">BIG</text>
      <text x="77" y="98" fill="${size === 'small' ? '#e94e4e' : '#888'}">small</text>
    </g>
  `;
}

// 長さを示すために long/short を並べて比較
function lengthCompare(thing, length) {
  const dimmed = 'opacity="0.25"';
  const longAttr = length === 'long' ? '' : dimmed;
  const shortAttr = length === 'short' ? '' : dimmed;
  return `
    <g ${longAttr} transform="translate(-5,0) scale(0.55)">${drawThing(thing, {length: 'long'})}</g>
    <g ${shortAttr} transform="translate(50,0) scale(0.55)">${drawThing(thing, {length: 'short'})}</g>
    <g font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">
      <text x="22" y="98" fill="${length === 'long' ? '#e94e4e' : '#888'}">LONG</text>
      <text x="78" y="98" fill="${length === 'short' ? '#e94e4e' : '#888'}">short</text>
    </g>
  `;
}

// my / your：持ってる人と物
function possession(thing, poss) {
  // me（女の子・ピンク）/ you（別の人、矢印で指す）
  const arrow = `
    <path d="M35 50 L25 50 L28 47 M25 50 L28 53" stroke="${OUTLINE}" stroke-width="2" fill="none"/>
  `;
  if (poss === 'my') {
    return `
      <g transform="translate(5,15) scale(0.55)">${child({girl: true})}</g>
      <g transform="translate(55,25) scale(0.5)">${drawThing(thing)}</g>
      <text x="50" y="15" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#e94e4e">MY</text>
    `;
  } else {
    return `
      <g transform="translate(55,15) scale(0.55)">${child({girl: false})}</g>
      <g transform="translate(5,25) scale(0.5)">${drawThing(thing)}</g>
      <text x="50" y="15" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#3a8fd8">YOUR</text>
    `;
  }
}

// 形容詞な「I am ...」
function iamAdj(adj) {
  let extras = '';
  let accessory = '';
  const base = (opts = {}) => child({girl: true, ...opts});
  switch (adj) {
    case 'big':
      return `
        <g transform="translate(0,-5) scale(1.05)">${base()}</g>
        <text x="92" y="20" text-anchor="end" font-family="sans-serif" font-size="14" font-weight="bold" fill="#e94e4e">BIG!</text>
      `;
    case 'small':
      return `
        <g transform="translate(30,30) scale(0.45)">${base()}</g>
        <text x="8" y="88" font-family="sans-serif" font-size="11" font-weight="bold" fill="#888">small</text>
      `;
    case 'fast':
      extras = `
        <path d="M25 60 L15 60 M25 68 L10 68 M25 76 L18 76" stroke="#ff9800" stroke-width="2.5" stroke-linecap="round"/>
      `;
      return base({extras}) + `<text x="85" y="90" text-anchor="end" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ff9800">FAST</text>`;
    case 'slow':
      extras = `
        <path d="M68 88 Q72 82 80 82 Q85 82 85 86 Q85 90 80 90 L72 90 Z" fill="#81c784" stroke="${OUTLINE}" stroke-width="1.5"/>
        <circle cx="83" cy="85" r="2" fill="${OUTLINE}"/>
      `;
      return base({extras}) + `<text x="8" y="88" font-family="sans-serif" font-size="10" font-weight="bold" fill="#4caf50">slow...</text>`;
    case 'hot':
      extras = `
        <circle cx="80" cy="22" r="8" fill="#ffb300" stroke="${OUTLINE}" stroke-width="1.5"/>
        <path d="M80 10 L80 6 M80 38 L80 34 M92 22 L96 22 M64 22 L68 22 M88 14 L91 11 M88 30 L91 33 M72 14 L69 11 M72 30 L69 33" stroke="#ffb300" stroke-width="2" stroke-linecap="round"/>
        <path d="M40 50 Q42 55 40 58 Q38 55 40 50 Z" fill="#4ea5d9"/>
        <path d="M60 50 Q62 55 60 58 Q58 55 60 50 Z" fill="#4ea5d9"/>
      `;
      return base({extras}) + `<text x="85" y="90" text-anchor="end" font-family="sans-serif" font-size="11" font-weight="bold" fill="#e94e4e">HOT</text>`;
    case 'cold':
      extras = `
        <g fill="#4ea5d9" stroke="${OUTLINE}" stroke-width="0.8">
          <path d="M15 25 L15 35 M12 28 L18 32 M12 32 L18 28" />
          <path d="M85 25 L85 35 M82 28 L88 32 M82 32 L88 28" />
          <path d="M80 75 L80 85 M77 78 L83 82 M77 82 L83 78" />
          <path d="M20 70 L20 80 M17 73 L23 77 M17 77 L23 73" />
        </g>
      `;
      return base({extras}) + `<text x="85" y="90" text-anchor="end" font-family="sans-serif" font-size="11" font-weight="bold" fill="#3a8fd8">COLD</text>`;
    case 'sick':
      // 口を波線、頭に冷えピタ風
      extras = `
        <rect x="42" y="22" width="16" height="5" fill="#b3e5fc" stroke="${OUTLINE}" stroke-width="1"/>
      `;
      // 上書き：笑顔の代わりに波線口
      return `
        <g>${base({extras})}</g>
        <path d="M45 45 Q48 43 51 45 Q54 47 57 45" stroke="white" stroke-width="2.5" fill="none"/>
        <path d="M45 45 Q48 43 51 45 Q54 47 57 45" stroke="${OUTLINE}" stroke-width="1.5" fill="none"/>
        <text x="85" y="90" text-anchor="end" font-family="sans-serif" font-size="11" font-weight="bold" fill="#9c27b0">SICK</text>
      `;
    case 'fine':
      extras = `
        <text x="80" y="70" font-family="sans-serif" font-size="22">👍</text>
      `;
      return base({extras}) + `<text x="15" y="90" font-family="sans-serif" font-size="11" font-weight="bold" fill="#4caf50">FINE!</text>`;
    case 'hungry':
      extras = `
        <circle cx="70" cy="70" r="10" fill="none" stroke="${OUTLINE}" stroke-width="1.5" stroke-dasharray="2,2"/>
        <text x="70" y="74" text-anchor="middle" font-family="sans-serif" font-size="12">🍽️</text>
      `;
      return base({extras}) + `<text x="15" y="90" font-family="sans-serif" font-size="10" font-weight="bold" fill="#ff9800">HUNGRY</text>`;
  }
  return base();
}

// I am [age]
function iamAge(age) {
  return `
    <g transform="translate(0,5) scale(0.95)">${child({girl: age === 5 || age === 7})}</g>
    <g transform="translate(70,10)">
      <circle cx="12" cy="12" r="14" fill="#ffd23f" stroke="${OUTLINE}" stroke-width="${SW}"/>
      <text x="12" y="18" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="bold" fill="${OUTLINE}">${age}</text>
    </g>
  `;
}

// ---- 家具 / 場所 ----
function bed() {
  return `
    <rect x="10" y="78" width="6" height="10" fill="${OUTLINE}"/>
    <rect x="84" y="78" width="6" height="10" fill="${OUTLINE}"/>
    <rect x="14" y="58" width="72" height="22" fill="#fff" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <rect x="14" y="50" width="24" height="14" rx="3" fill="#ffb3ba" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <rect x="14" y="66" width="72" height="5" fill="#ffb3ba"/>
  `;
}

function sofa() {
  return `
    <rect x="12" y="55" width="76" height="28" rx="4" fill="#a1887f" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <rect x="12" y="38" width="76" height="22" rx="3" fill="#8d6e63" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <rect x="10" y="42" width="10" height="42" rx="3" fill="#8d6e63" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <rect x="80" y="42" width="10" height="42" rx="3" fill="#8d6e63" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <rect x="12" y="82" width="76" height="4" fill="${OUTLINE}"/>
  `;
}

function chair() {
  return `
    <rect x="30" y="30" width="40" height="32" rx="2" fill="#8d6e63" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <rect x="26" y="58" width="48" height="8" fill="#a1887f" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <rect x="28" y="66" width="5" height="22" fill="${OUTLINE}"/>
    <rect x="67" y="66" width="5" height="22" fill="${OUTLINE}"/>
  `;
}

function bridge() {
  return `
    <path d="M8 72 Q50 32 92 72 L92 82 L8 82 Z" fill="#bcaaa4" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <path d="M8 72 Q50 32 92 72" fill="none" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <path d="M20 70 L20 82 M35 58 L35 82 M50 52 L50 82 M65 58 L65 82 M80 70 L80 82" stroke="${OUTLINE}" stroke-width="1"/>
    <path d="M0 82 L100 82" stroke="#3a8fd8" stroke-width="3" opacity="0.5"/>
  `;
}

function tableShape() {
  return `
    <rect x="14" y="44" width="72" height="10" fill="#a1887f" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <rect x="22" y="54" width="6" height="34" fill="#8d6e63" stroke="${OUTLINE}" stroke-width="1"/>
    <rect x="72" y="54" width="6" height="34" fill="#8d6e63" stroke="${OUTLINE}" stroke-width="1"/>
  `;
}

function slide() {
  return `
    <rect x="62" y="18" width="30" height="8" fill="#f44336" stroke="${OUTLINE}" stroke-width="1.5"/>
    <path d="M68 26 L88 26 L88 88 L68 88 Z" fill="#90caf9" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <path d="M68 70 L12 88 L28 88 L68 80 Z" fill="#64b5f6" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <rect x="88" y="30" width="4" height="58" fill="${OUTLINE}"/>
    <rect x="60" y="30" width="4" height="58" fill="${OUTLINE}"/>
  `;
}

// ---- 食べもの（あらう・きる用）----
function carrot() {
  return `
    <path d="M44 32 L56 32 L62 80 L38 80 Z" fill="#ff9800" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <path d="M40 72 L60 72 M40 60 L60 60 M42 48 L58 48" stroke="${OUTLINE}" stroke-width="1"/>
    <path d="M44 32 Q38 14 28 10 Q42 16 44 32 Z" fill="#4caf50" stroke="${OUTLINE}" stroke-width="1.5"/>
    <path d="M50 32 Q50 8 55 5 Q56 20 52 32 Z" fill="#4caf50" stroke="${OUTLINE}" stroke-width="1.5"/>
    <path d="M56 32 Q62 14 72 10 Q58 16 56 32 Z" fill="#4caf50" stroke="${OUTLINE}" stroke-width="1.5"/>
  `;
}

function potato() {
  return `
    <ellipse cx="50" cy="55" rx="30" ry="25" fill="#c6a57b" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <circle cx="35" cy="48" r="2" fill="#6d4c41"/>
    <circle cx="55" cy="42" r="2" fill="#6d4c41"/>
    <circle cx="62" cy="60" r="2" fill="#6d4c41"/>
    <circle cx="42" cy="66" r="2" fill="#6d4c41"/>
    <ellipse cx="40" cy="46" rx="7" ry="4" fill="#e0c89a" opacity="0.7"/>
  `;
}

function lemon() {
  return `
    <ellipse cx="50" cy="55" rx="28" ry="22" fill="#ffeb3b" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <path d="M22 55 Q12 55 8 50" fill="#ffeb3b" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <path d="M78 55 Q88 55 92 50" fill="#ffeb3b" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <ellipse cx="40" cy="45" rx="7" ry="3" fill="white" opacity="0.7"/>
    <path d="M30 60 L45 65 M55 65 L70 60" stroke="#e0c36a" stroke-width="1" opacity="0.6"/>
  `;
}

function cabbage() {
  return `
    <circle cx="50" cy="55" r="30" fill="#8bc34a" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <path d="M28 42 Q40 32 50 38 Q60 32 72 42" fill="#9ccc65" stroke="${OUTLINE}" stroke-width="1.5"/>
    <path d="M24 55 Q36 50 50 54 Q64 50 76 55" fill="none" stroke="${OUTLINE}" stroke-width="1.5"/>
    <path d="M26 65 Q40 60 50 64 Q60 60 74 65" fill="none" stroke="${OUTLINE}" stroke-width="1.5"/>
    <path d="M34 74 Q45 70 50 74 Q55 70 66 74" fill="none" stroke="${OUTLINE}" stroke-width="1.5"/>
    <circle cx="50" cy="55" r="6" fill="#558b2f" opacity="0.35"/>
  `;
}

// ---- コンテナ（あける・しめる状態）----
function boxCont(open) {
  if (open) {
    return `
      <path d="M20 85 L12 50 L88 50 L80 85 Z" fill="#b8845c" stroke="${OUTLINE}" stroke-width="${SW}"/>
      <path d="M25 50 L18 20 L48 18 L42 48 Z" fill="#d4a373" stroke="${OUTLINE}" stroke-width="${SW}"/>
      <path d="M58 48 L52 18 L82 20 L75 50 Z" fill="#d4a373" stroke="${OUTLINE}" stroke-width="${SW}"/>
      <rect x="40" y="58" width="20" height="6" fill="#ff9800" stroke="${OUTLINE}" stroke-width="1"/>
      <text x="85" y="14" text-anchor="end" font-family="sans-serif" font-size="9" font-weight="bold" fill="#4caf50">OPEN!</text>
    `;
  }
  return `
    <rect x="20" y="40" width="60" height="48" fill="#b8845c" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <rect x="20" y="34" width="60" height="10" fill="#d4a373" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <rect x="46" y="34" width="8" height="14" fill="#ff9800" stroke="${OUTLINE}" stroke-width="1"/>
    <path d="M20 56 L80 56 M20 72 L80 72" stroke="${OUTLINE}" stroke-width="0.8" opacity="0.5"/>
    <text x="85" y="14" text-anchor="end" font-family="sans-serif" font-size="9" font-weight="bold" fill="#3a8fd8">CLOSE</text>
  `;
}

function doorCont(open) {
  if (open) {
    return `
      <rect x="15" y="15" width="70" height="75" fill="#263238" stroke="${OUTLINE}" stroke-width="${SW}"/>
      <path d="M15 15 L58 20 L58 85 L15 90 Z" fill="#8d6e63" stroke="${OUTLINE}" stroke-width="${SW}"/>
      <rect x="22" y="25" width="30" height="20" fill="#a1887f" stroke="${OUTLINE}" stroke-width="1.5"/>
      <rect x="22" y="55" width="30" height="20" fill="#a1887f" stroke="${OUTLINE}" stroke-width="1.5"/>
      <circle cx="52" cy="55" r="2.5" fill="#ffd23f"/>
      <text x="90" y="14" text-anchor="end" font-family="sans-serif" font-size="9" font-weight="bold" fill="#4caf50">OPEN!</text>
    `;
  }
  return `
    <rect x="18" y="12" width="64" height="78" fill="#8d6e63" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <rect x="26" y="20" width="48" height="28" fill="#a1887f" stroke="${OUTLINE}" stroke-width="1.5"/>
    <rect x="26" y="54" width="48" height="28" fill="#a1887f" stroke="${OUTLINE}" stroke-width="1.5"/>
    <circle cx="70" cy="55" r="2.5" fill="#ffd23f" stroke="${OUTLINE}" stroke-width="0.8"/>
    <text x="90" y="14" text-anchor="end" font-family="sans-serif" font-size="9" font-weight="bold" fill="#3a8fd8">CLOSE</text>
  `;
}

function windowCont(open) {
  if (open) {
    return `
      <rect x="12" y="18" width="76" height="68" fill="#e3f2fd" stroke="${OUTLINE}" stroke-width="${SW}"/>
      <g transform="translate(12,18) rotate(-15)">
        <rect x="0" y="0" width="36" height="68" fill="#b3e5fc" stroke="${OUTLINE}" stroke-width="1.5"/>
        <path d="M18 0 L18 68" stroke="${OUTLINE}" stroke-width="0.8"/>
      </g>
      <g transform="translate(88,86) rotate(195)">
        <rect x="0" y="0" width="36" height="68" fill="#b3e5fc" stroke="${OUTLINE}" stroke-width="1.5"/>
        <path d="M18 0 L18 68" stroke="${OUTLINE}" stroke-width="0.8"/>
      </g>
      <path d="M50 25 Q45 35 50 45 Q55 55 50 65" stroke="#81d4fa" stroke-width="2" fill="none" opacity="0.6"/>
      <text x="85" y="14" text-anchor="end" font-family="sans-serif" font-size="9" font-weight="bold" fill="#4caf50">OPEN!</text>
    `;
  }
  return `
    <rect x="12" y="18" width="76" height="68" fill="#b3e5fc" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <path d="M50 18 L50 86 M12 52 L88 52" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <rect x="8" y="86" width="84" height="6" fill="#8d6e63" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <text x="85" y="14" text-anchor="end" font-family="sans-serif" font-size="9" font-weight="bold" fill="#3a8fd8">CLOSE</text>
  `;
}

function fridgeCont(open) {
  if (open) {
    return `
      <rect x="32" y="12" width="40" height="76" fill="#eceff1" stroke="${OUTLINE}" stroke-width="${SW}"/>
      <rect x="34" y="18" width="36" height="24" fill="#cfd8dc" stroke="${OUTLINE}" stroke-width="1"/>
      <rect x="34" y="46" width="36" height="38" fill="#cfd8dc" stroke="${OUTLINE}" stroke-width="1"/>
      <circle cx="45" cy="30" r="3" fill="#ffeb3b" stroke="${OUTLINE}" stroke-width="1"/>
      <circle cx="58" cy="32" r="2.5" fill="#ffeb3b" stroke="${OUTLINE}" stroke-width="1"/>
      <ellipse cx="50" cy="60" rx="10" ry="4" fill="#e94e4e" stroke="${OUTLINE}" stroke-width="1"/>
      <rect x="40" y="72" width="16" height="6" fill="#81c784" stroke="${OUTLINE}" stroke-width="1"/>
      <g transform="translate(32,12) rotate(-35)">
        <rect x="0" y="0" width="40" height="76" fill="#f5f5f5" stroke="${OUTLINE}" stroke-width="${SW}"/>
        <rect x="4" y="30" width="3" height="20" fill="#bdbdbd" stroke="${OUTLINE}" stroke-width="0.5"/>
      </g>
      <text x="92" y="16" text-anchor="end" font-family="sans-serif" font-size="9" font-weight="bold" fill="#4caf50">OPEN!</text>
    `;
  }
  return `
    <rect x="32" y="12" width="40" height="76" fill="#eceff1" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <path d="M32 38 L72 38" stroke="${OUTLINE}" stroke-width="${SW}"/>
    <rect x="62" y="20" width="3" height="10" fill="#bdbdbd" stroke="${OUTLINE}" stroke-width="0.5"/>
    <rect x="62" y="48" width="3" height="10" fill="#bdbdbd" stroke="${OUTLINE}" stroke-width="0.5"/>
    <text x="92" y="16" text-anchor="end" font-family="sans-serif" font-size="9" font-weight="bold" fill="#3a8fd8">CLOSE</text>
  `;
}

// ---- 職業 ----
function profession(job) {
  switch (job) {
    case 'doctor': {
      const extras = `
        <path d="M42 58 Q38 68 44 74 Q50 76 56 74 Q62 68 58 58" fill="none" stroke="${OUTLINE}" stroke-width="1.5"/>
        <circle cx="50" cy="77" r="3" fill="#9e9e9e" stroke="${OUTLINE}" stroke-width="1.5"/>
        <rect x="60" y="70" width="8" height="8" fill="white" stroke="${OUTLINE}" stroke-width="1"/>
        <path d="M64 71 L64 77 M61 74 L67 74" stroke="#e94e4e" stroke-width="1.5"/>
      `;
      return child({girl: true, shirtColor: '#fff', extras}) +
        `<text x="5" y="18" font-family="sans-serif" font-size="10" font-weight="bold" fill="#e94e4e">DOCTOR</text>`;
    }
    case 'nurse': {
      const extras = `
        <rect x="38" y="18" width="24" height="8" fill="white" stroke="${OUTLINE}" stroke-width="1.5"/>
        <path d="M50 19 L50 25 M46 22 L54 22" stroke="#e94e4e" stroke-width="2"/>
        <rect x="60" y="70" width="8" height="8" fill="white" stroke="${OUTLINE}" stroke-width="1"/>
        <path d="M64 71 L64 77 M61 74 L67 74" stroke="#e94e4e" stroke-width="1.5"/>
      `;
      return child({girl: true, shirtColor: '#fff', extras}) +
        `<text x="5" y="18" font-family="sans-serif" font-size="10" font-weight="bold" fill="#3a8fd8">NURSE</text>`;
    }
    case 'teacher': {
      const extras = `
        <circle cx="44" cy="38" r="4" fill="none" stroke="${OUTLINE}" stroke-width="1.5"/>
        <circle cx="56" cy="38" r="4" fill="none" stroke="${OUTLINE}" stroke-width="1.5"/>
        <path d="M48 38 L52 38" stroke="${OUTLINE}" stroke-width="1.5"/>
        <rect x="68" y="68" width="22" height="16" fill="#e94e4e" stroke="${OUTLINE}" stroke-width="1.5"/>
        <path d="M71 72 L87 72 M71 76 L87 76 M71 80 L87 80" stroke="white" stroke-width="1"/>
      `;
      return child({girl: true, extras}) +
        `<text x="5" y="18" font-family="sans-serif" font-size="10" font-weight="bold" fill="#7e57c2">TEACHER</text>`;
    }
    case 'student': {
      const extras = `
        <rect x="12" y="55" width="22" height="28" rx="3" fill="#3a8fd8" stroke="${OUTLINE}" stroke-width="1.5"/>
        <rect x="16" y="60" width="14" height="6" fill="#1976d2" stroke="${OUTLINE}" stroke-width="1"/>
        <path d="M34 60 Q42 58 46 60" stroke="${OUTLINE}" stroke-width="1.5" fill="none"/>
        <rect x="18" y="12" width="64" height="5" fill="#ffd23f" stroke="${OUTLINE}" stroke-width="1"/>
      `;
      return child({girl: true, extras}) +
        `<text x="5" y="18" font-family="sans-serif" font-size="10" font-weight="bold" fill="#ff9800">STUDENT</text>`;
    }
    case 'cook': {
      const extras = `
        <rect x="40" y="16" width="20" height="12" fill="white" stroke="${OUTLINE}" stroke-width="1.5"/>
        <ellipse cx="50" cy="12" rx="16" ry="9" fill="white" stroke="${OUTLINE}" stroke-width="1.5"/>
        <rect x="38" y="54" width="24" height="30" fill="white" stroke="${OUTLINE}" stroke-width="1.5"/>
      `;
      return child({girl: false, shirtColor: '#fff', extras}) +
        `<text x="5" y="98" font-family="sans-serif" font-size="10" font-weight="bold" fill="#e94e4e">COOK</text>`;
    }
    case 'pilot': {
      const extras = `
        <path d="M28 26 Q28 16 50 16 Q72 16 72 26 L72 33 L28 33 Z" fill="#1a237e" stroke="${OUTLINE}" stroke-width="1.5"/>
        <circle cx="50" cy="26" r="3" fill="#ffd23f" stroke="${OUTLINE}" stroke-width="1"/>
        <path d="M28 33 L72 33" stroke="${OUTLINE}" stroke-width="1.5"/>
        <rect x="36" y="36" width="28" height="6" rx="2" fill="${OUTLINE}"/>
        <circle cx="44" cy="39" r="3" fill="#222"/>
        <circle cx="56" cy="39" r="3" fill="#222"/>
      `;
      return child({girl: false, shirtColor: '#3a8fd8', extras}) +
        `<text x="5" y="98" font-family="sans-serif" font-size="10" font-weight="bold" fill="#1a237e">PILOT</text>`;
    }
    case 'baker': {
      const extras = `
        <ellipse cx="50" cy="12" rx="16" ry="9" fill="white" stroke="${OUTLINE}" stroke-width="1.5"/>
        <rect x="40" y="17" width="20" height="10" fill="white" stroke="${OUTLINE}" stroke-width="1.5"/>
        <ellipse cx="70" cy="72" rx="14" ry="8" fill="#ffb74d" stroke="${OUTLINE}" stroke-width="1.5"/>
        <path d="M58 70 L82 70 M62 76 L78 76" stroke="${OUTLINE}" stroke-width="1"/>
        <path d="M38 54 L62 54 L66 88 L34 88 Z" fill="#fff9c4" stroke="${OUTLINE}" stroke-width="1.5"/>
      `;
      return child({girl: true, shirtColor: '#fff', extras}) +
        `<text x="5" y="18" font-family="sans-serif" font-size="10" font-weight="bold" fill="#d4a373">BAKER</text>`;
    }
    case 'pianist': {
      return `
        <g transform="translate(0,-6) scale(0.85)">${child({girl: true})}</g>
        <rect x="8" y="78" width="84" height="14" fill="white" stroke="${OUTLINE}" stroke-width="1.5"/>
        <path d="M18 78 L18 92 M28 78 L28 92 M38 78 L38 92 M48 78 L48 92 M58 78 L58 92 M68 78 L68 92 M78 78 L78 92 M88 78 L88 92" stroke="${OUTLINE}" stroke-width="0.8"/>
        <rect x="22" y="78" width="4" height="8" fill="${OUTLINE}"/>
        <rect x="32" y="78" width="4" height="8" fill="${OUTLINE}"/>
        <rect x="52" y="78" width="4" height="8" fill="${OUTLINE}"/>
        <rect x="62" y="78" width="4" height="8" fill="${OUTLINE}"/>
        <rect x="72" y="78" width="4" height="8" fill="${OUTLINE}"/>
        <text x="5" y="18" font-family="sans-serif" font-size="10" font-weight="bold" fill="#7e57c2">PIANIST 🎹</text>
      `;
    }
  }
  return child({girl: true});
}

// ---- 場所（on/under）----
function placeScene(place, prep) {
  const placeFns = {
    bed, sofa, chair, bridge, tree, table: tableShape, slide
  };
  const placeSvg = (placeFns[place] || (() => ''))();

  let childTransform = '';
  if (prep === 'on') {
    const positions = {
      bed:    'translate(38,22) scale(0.32)',
      sofa:   'translate(38,8)  scale(0.32)',
      chair:  'translate(38,2)  scale(0.3)',
      bridge: 'translate(38,6)  scale(0.3)',
    };
    childTransform = positions[place] || 'translate(38,10) scale(0.32)';
  } else {
    const positions = {
      tree:   'translate(22,48) scale(0.35)',
      bridge: 'translate(30,56) scale(0.3)',
      table:  'translate(30,56) scale(0.32)',
      slide:  'translate(4,56)  scale(0.3)',
    };
    childTransform = positions[place] || 'translate(30,56) scale(0.32)';
  }

  const labelText = prep === 'on' ? '↑ ON' : '↓ UNDER';
  const labelColor = prep === 'on' ? '#4caf50' : '#3a8fd8';

  return `
    ${placeSvg}
    <g transform="${childTransform}">${child({girl: true})}</g>
    <text x="5" y="98" font-family="sans-serif" font-size="11" font-weight="bold" fill="${labelColor}">${labelText}</text>
  `;
}

// ---- 命令文（〜して）----
function command(verb, obj) {
  const foodFns = { carrot, potato, lemon, cabbage };
  const containerFns = {
    box: () => boxCont(verb === 'open'),
    door: () => doorCont(verb === 'open'),
    window: () => windowCont(verb === 'open'),
    fridge: () => fridgeCont(verb === 'open'),
  };

  let objSvg = '';
  if (foodFns[obj]) objSvg = `<g transform="translate(10,5) scale(0.85)">${foodFns[obj]()}</g>`;
  else if (containerFns[obj]) objSvg = containerFns[obj]();

  let overlay = '';
  if (verb === 'wash') {
    overlay = `
      <g fill="#64b5f6" stroke="${OUTLINE}" stroke-width="1">
        <ellipse cx="20" cy="22" rx="2.5" ry="4.5"/>
        <ellipse cx="80" cy="22" rx="2.5" ry="4.5"/>
        <ellipse cx="12" cy="45" rx="2" ry="3.5"/>
        <ellipse cx="88" cy="45" rx="2" ry="3.5"/>
        <ellipse cx="18" cy="72" rx="2.5" ry="4.5"/>
        <ellipse cx="82" cy="72" rx="2.5" ry="4.5"/>
      </g>
      <text x="5" y="14" font-family="sans-serif" font-size="10" font-weight="bold" fill="#1976d2">WASH 💧</text>
    `;
  } else if (verb === 'cut') {
    overlay = `
      <path d="M86 8 L92 2 L80 48 L74 44 Z" fill="#bdbdbd" stroke="${OUTLINE}" stroke-width="1.5"/>
      <rect x="70" y="44" width="10" height="12" fill="#6d4c41" stroke="${OUTLINE}" stroke-width="1"/>
      <path d="M20 55 L80 55" stroke="#e94e4e" stroke-width="1.5" stroke-dasharray="3,2"/>
      <text x="5" y="14" font-family="sans-serif" font-size="10" font-weight="bold" fill="#d84315">CUT ✂</text>
    `;
  } else if (verb === 'open') {
    overlay = `<text x="50" y="98" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#4caf50">⇆ OPEN</text>`;
  } else if (verb === 'close') {
    overlay = `<text x="50" y="98" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#3a8fd8">→|← CLOSE</text>`;
  }

  return `${objSvg}${overlay}`;
}

// ---- Q&A シーン ----
function qaScene(scene) {
  switch (scene) {
    case 'car':
      return `
        <rect x="8" y="52" width="84" height="28" rx="5" fill="#e94e4e" stroke="${OUTLINE}" stroke-width="${SW}"/>
        <path d="M18 52 L30 32 L70 32 L82 52 Z" fill="#d32f2f" stroke="${OUTLINE}" stroke-width="${SW}"/>
        <rect x="32" y="35" width="36" height="15" fill="#b3e5fc" stroke="${OUTLINE}" stroke-width="1"/>
        <circle cx="50" cy="43" r="5" fill="${SKIN}" stroke="${OUTLINE}" stroke-width="1"/>
        <circle cx="48" cy="42" r="0.9" fill="${OUTLINE}"/>
        <circle cx="52" cy="42" r="0.9" fill="${OUTLINE}"/>
        <path d="M48 45 Q50 47 52 45" stroke="${OUTLINE}" stroke-width="0.8" fill="none"/>
        <circle cx="25" cy="80" r="8" fill="#424242" stroke="${OUTLINE}" stroke-width="1.5"/>
        <circle cx="75" cy="80" r="8" fill="#424242" stroke="${OUTLINE}" stroke-width="1.5"/>
        <circle cx="25" cy="80" r="3" fill="#9e9e9e"/>
        <circle cx="75" cy="80" r="3" fill="#9e9e9e"/>
        <text x="50" y="14" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#e94e4e">🚗 IN THE CAR</text>
      `;
    case 'yard':
      return `
        <rect x="0" y="65" width="100" height="25" fill="#8bc34a"/>
        <rect x="0" y="85" width="100" height="6" fill="#7cb342"/>
        <path d="M0 65 L100 65" stroke="${OUTLINE}" stroke-width="1.5"/>
        <g transform="translate(-5,30) scale(0.45)">${tree()}</g>
        <g transform="translate(55,48) scale(0.22)">${flower()}</g>
        <g transform="translate(68,52) scale(0.22)">${flower()}</g>
        <g transform="translate(82,48) scale(0.22)">${flower()}</g>
        <g transform="translate(40,38) scale(0.32)">${child({girl: true})}</g>
        <text x="50" y="13" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#388e3c">🌼 IN THE YARD</text>
      `;
    case 'kitchen':
      return `
        <rect x="0" y="60" width="100" height="30" fill="#ffcc80" stroke="${OUTLINE}" stroke-width="1"/>
        <rect x="0" y="60" width="100" height="3" fill="#8d6e63"/>
        <rect x="8" y="34" width="28" height="26" fill="#fff" stroke="${OUTLINE}" stroke-width="${SW}"/>
        <circle cx="16" cy="48" r="3" fill="#424242" stroke="${OUTLINE}" stroke-width="1"/>
        <circle cx="28" cy="48" r="3" fill="#424242" stroke="${OUTLINE}" stroke-width="1"/>
        <rect x="12" y="55" width="20" height="3" fill="#bdbdbd"/>
        <rect x="60" y="38" width="30" height="22" fill="#eceff1" stroke="${OUTLINE}" stroke-width="${SW}"/>
        <path d="M60 48 L90 48" stroke="${OUTLINE}" stroke-width="1"/>
        <circle cx="85" cy="43" r="1.5" fill="${OUTLINE}"/>
        <g transform="translate(38,28) scale(0.32)">${child({girl: true})}</g>
        <text x="50" y="14" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#f57c00">🍳 IN THE KITCHEN</text>
      `;
    case 'bathroom':
      return `
        <rect x="0" y="60" width="100" height="30" fill="#b3e5fc"/>
        <rect x="8" y="50" width="42" height="30" rx="5" fill="#fff" stroke="${OUTLINE}" stroke-width="${SW}"/>
        <rect x="13" y="55" width="32" height="22" rx="3" fill="#81d4fa" stroke="${OUTLINE}" stroke-width="1"/>
        <rect x="60" y="40" width="30" height="42" rx="2" fill="#fff" stroke="${OUTLINE}" stroke-width="${SW}"/>
        <rect x="66" y="46" width="18" height="12" fill="#b3e5fc" stroke="${OUTLINE}" stroke-width="1"/>
        <circle cx="75" cy="72" r="2.5" fill="${OUTLINE}"/>
        <g transform="translate(16,22) scale(0.3)">${child({girl: true})}</g>
        <text x="50" y="13" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#1976d2">🚽 IN THE BATHROOM</text>
      `;
    case 'tree':
      return `
        <g transform="translate(0,-2) scale(1.0)">${tree()}</g>
        <g transform="translate(22,55) scale(0.3)">${child({girl: true})}</g>
        <text x="50" y="98" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#388e3c">↓ UNDER THE TREE</text>
      `;
    case 'box':
      return `
        <rect x="12" y="32" width="76" height="56" fill="#d4a373" stroke="${OUTLINE}" stroke-width="${SW}"/>
        <path d="M12 32 L22 18 L88 18 L88 32" fill="#b8845c" stroke="${OUTLINE}" stroke-width="${SW}"/>
        <path d="M12 32 L88 32" stroke="${OUTLINE}" stroke-width="1.5"/>
        <circle cx="38" cy="52" r="7" fill="${SKIN}" stroke="${OUTLINE}" stroke-width="1.5"/>
        <circle cx="35" cy="50" r="1.2" fill="${OUTLINE}"/>
        <circle cx="41" cy="50" r="1.2" fill="${OUTLINE}"/>
        <path d="M35 55 Q38 57 41 55" stroke="${OUTLINE}" stroke-width="1" fill="none"/>
        <path d="M30 45 Q33 40 35 42" fill="#3d2617" stroke="${OUTLINE}" stroke-width="1"/>
        <text x="60" y="55" font-family="sans-serif" font-size="11" font-weight="bold" fill="#e94e4e">IN THE</text>
        <text x="60" y="68" font-family="sans-serif" font-size="11" font-weight="bold" fill="#e94e4e">BOX!</text>
        <text x="50" y="13" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#8d6e63">📦</text>
      `;
    case 'help-box':
      return `
        <rect x="6" y="40" width="42" height="48" fill="#d4a373" stroke="${OUTLINE}" stroke-width="${SW}"/>
        <path d="M6 40 L14 28 L54 28 L54 40" fill="#b8845c" stroke="${OUTLINE}" stroke-width="${SW}" opacity="0.5"/>
        <circle cx="24" cy="56" r="6" fill="${SKIN}" stroke="${OUTLINE}" stroke-width="1.5"/>
        <circle cx="22" cy="55" r="1" fill="${OUTLINE}"/>
        <circle cx="26" cy="55" r="1" fill="${OUTLINE}"/>
        <path d="M22 60 Q24 58 26 60" stroke="${OUTLINE}" stroke-width="1" fill="none"/>
        <text x="27" y="22" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#e94e4e">HELP!</text>
        <g transform="translate(58,38) scale(0.45)">${child({girl: true})}</g>
        <text x="82" y="92" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#4caf50">OK!</text>
        <text x="50" y="98" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold" fill="#888">❤ ありがとう！</text>
      `;
    default:
      return `<text x="50" y="55" text-anchor="middle" font-size="14">?</text>`;
  }
}

// メインレンダラ
function renderIllustration(card) {
  let content = '';
  switch (card.type) {
    case 'size_thing':
      content = sizeCompare(card.thing, card.size);
      break;
    case 'length_thing':
      content = lengthCompare(card.thing, card.length);
      break;
    case 'poss_thing':
      content = possession(card.thing, card.poss);
      break;
    case 'count_thing':
      content = layoutGrid(card.count, () => drawThing(card.thing));
      break;
    case 'color_thing':
      content = `<g transform="translate(5,5) scale(0.9)">${drawThing(card.thing, { color: card.color })}</g>`;
      break;
    case 'i_am_age':
      content = iamAge(card.age);
      break;
    case 'i_am_adj':
      content = iamAdj(card.adj);
      break;
    case 'size_count_thing':
      // big trees! など
      content = layoutGrid(card.count, () => drawThing(card.thing))
        + `<text x="50" y="98" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#e94e4e">BIG!</text>`;
      break;
    case 'color_count_thing':
      content = layoutGrid(card.count, () => drawThing(card.thing, { color: card.color }));
      break;
    case 'profession':
      content = profession(card.job);
      break;
    case 'location':
      content = placeScene(card.place, card.prep);
      break;
    case 'command':
      content = command(card.verb, card.obj);
      break;
    case 'qa':
      content = qaScene(card.scene);
      break;
    default:
      content = `<text x="50" y="55" text-anchor="middle" font-size="14">${card.en}</text>`;
  }
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="illust">${content}</svg>`;
}
