const F = "IBM Plex Sans Condensed,sans-serif";
const S = "Fraunces,serif";

function wrap(body) {
  return `<svg viewBox="0 0 600 270" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">${body}</svg>`;
}
function banner(label, key) {
  return `<rect width="600" height="44" fill="#b01c1c"/>
    <text x="12" y="30" font-family="${F}" font-size="24" font-weight="700" fill="#fff" letter-spacing="0.8">${label}</text>
    <text x="586" y="31" text-anchor="end" font-family="${S}" font-size="26" font-weight="700" fill="#fff">${key}</text>`;
}
function candles() {
  const spec = [[430, 78, 34], [474, 100, 46], [518, 128, 58], [562, 156, 52]];
  return spec.map(([x, y, h], i) =>
    `<line x1="${x + 12}" y1="${y - 10}" x2="${x + 12}" y2="${y + h + 8}" stroke="#f0b2a8" stroke-width="2"/>
     <rect x="${x}" y="${y}" width="24" height="${h}" fill="${i > 1 ? "#ff3d32" : "#e45348"}"/>`).join("");
}
function spiral() {
  let d = "";
  for (let i = 0; i <= 60; i++) {
    const t = i / 60;
    const a = t * Math.PI * 6.2;
    const r = 5 + t * 68;
    d += (i ? "L" : "M") + (128 + Math.cos(a) * r).toFixed(1) + "," + (128 + Math.sin(a) * r * 0.58).toFixed(1);
  }
  return `<path d="${d}" fill="none" stroke="#f7fbfe" stroke-width="9" stroke-linecap="round"/>
    <circle cx="128" cy="128" r="7" fill="#eef3f6"/>`;
}

export function leadArt(n) {
  if (n === 1) {
    return wrap(`${banner("NASDAQ PLUNGE", "−5.28%")}
      <rect y="44" width="600" height="226" fill="#121826"/>
      <text x="16" y="150" font-family="${S}" font-size="68" font-weight="700" fill="#ff5346">−5.28%</text>
      <text x="18" y="190" font-family="${F}" font-size="20" font-weight="650" fill="#f3cdc6">S&amp;P 500 −3.7%</text>
      <text x="18" y="218" font-family="${F}" font-size="20" font-weight="650" fill="#ffb0a4">NVIDIA −14%</text>
      <polyline points="360,70 410,92 455,84 510,130 555,158 590,196" fill="none" stroke="#ff4d3c" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>
      ${candles()}`);
  }
  if (n === 2) {
    return wrap(`${banner("KYIV BRIDGES", "8 DEAD")}
      <rect y="44" width="600" height="226" fill="#0e1a2c"/>
      <rect y="196" width="600" height="74" fill="#16324c"/>
      <rect y="178" width="600" height="22" fill="#1b2836"/>
      <rect x="24" y="168" width="140" height="10" fill="#d5dde4"/>
      <rect x="58" y="178" width="8" height="40" fill="#8ea0b0"/><rect x="140" y="178" width="8" height="40" fill="#8ea0b0"/>
      <rect x="210" y="168" width="52" height="10" fill="#b7c3ce"/>
      <rect x="300" y="168" width="78" height="10" fill="#b7c3ce"/>
      <circle cx="284" cy="172" r="12" fill="#ff7a22"/><circle cx="284" cy="172" r="5" fill="#ffe08a"/>
      <rect x="420" y="168" width="156" height="10" fill="#d5dde4"/>
      <rect x="458" y="178" width="8" height="40" fill="#8ea0b0"/><rect x="540" y="178" width="8" height="40" fill="#8ea0b0"/>
      <path d="M500 52 L430 120" stroke="#f2d48a" stroke-width="2.5"/>
      <path d="M545 58 L470 130" stroke="#f2d48a" stroke-width="2.5"/>
      <path d="M580 50 L520 112" stroke="#f2d48a" stroke-width="2.5"/>
      <text x="16" y="118" font-family="${S}" font-size="64" font-weight="700" fill="#fff">8</text>
      <text x="78" y="100" font-family="${F}" font-size="18" font-weight="700" fill="#ffb4a4">KILLED</text>
      <text x="78" y="126" font-family="${F}" font-size="16" font-weight="600" fill="#d5e2ee">3 BRIDGES · 400+ DRONES</text>`);
  }
  return wrap(`${banner("CYCLONE AKVAN", "300,000")}
    <rect y="44" width="600" height="130" fill="#6e8ea6"/>
    <rect y="174" width="600" height="96" fill="#d2c09a"/>
    <path d="M300 210 L600 188 L600 270 L300 270 Z" fill="#2f86a3"/>
    ${spiral()}
    <text x="300" y="130" font-family="${S}" font-size="46" font-weight="700" fill="#10202c">300,000</text>
    <text x="302" y="154" font-family="${F}" font-size="16" font-weight="700" fill="#10202c">EVACUATED</text>
    <rect x="18" y="214" width="52" height="20" rx="2" fill="#f4efe4" stroke="#1a1612"/>
    <rect x="78" y="214" width="52" height="20" rx="2" fill="#efe0b4" stroke="#1a1612"/>
    <circle cx="30" cy="236" r="4" fill="#16130f"/><circle cx="54" cy="236" r="4" fill="#16130f"/>
    <circle cx="90" cy="236" r="4" fill="#16130f"/><circle cx="114" cy="236" r="4" fill="#16130f"/>
    <text x="150" y="230" font-family="${F}" font-size="16" font-weight="700" fill="#1a1612">GOPALPUR</text>
    <text x="318" y="250" font-family="${F}" font-size="14" font-weight="700" fill="#f4fbfe">BAY OF BENGAL</text>`);
}
