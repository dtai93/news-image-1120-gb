const F = "IBM Plex Sans Condensed,sans-serif";

function wrap(body) {
  return `<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${body}</svg>`;
}

function spiral(cx, cy) {
  let d = "";
  for (let i = 0; i <= 64; i++) {
    const t = i / 64;
    const a = t * Math.PI * 2 * 3.2;
    const r = 7 + t * 74;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r * 0.7;
    d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
  }
  return `<path d="${d}" fill="none" stroke="#f7fbfe" stroke-width="10" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="8" fill="#f4efe4" stroke="#d5e1ea" stroke-width="2"/>`;
}

function candles() {
  const rows = [[36, 48, 28], [78, 58, 34], [120, 70, 40], [162, 84, 46], [204, 102, 50], [246, 122, 48], [288, 140, 36]];
  return rows.map(([x, y, h], i) =>
    `<line x1="${x + 9}" y1="${y - 12}" x2="${x + 9}" y2="${y + h + 10}" stroke="#f3b2a8" stroke-width="2"/>
     <rect x="${x}" y="${y}" width="18" height="${h}" fill="${i > 4 ? "#ff4d3a" : "#e0362c"}"/>`
  ).join("");
}

export function leadArt(n) {
  if (n === 1) return wrap(`
    <rect width="640" height="200" fill="#8ec4e4"/>
    <rect y="92" width="640" height="108" fill="#1b6e98"/>
    <path d="M0 64 C70 88 130 128 210 114 C270 104 300 146 330 156 L0 200 Z" fill="#e6d3a4"/>
    <path d="M0 64 C70 88 130 128 210 114 C270 104 300 146 330 156" fill="none" stroke="#c2a86e" stroke-width="4"/>
    <path d="M8 158 C80 168 150 148 240 164" fill="none" stroke="#6b5738" stroke-width="6"/>
    <rect x="36" y="144" width="40" height="18" rx="2" fill="#d85a2a"/>
    <rect x="40" y="147" width="12" height="7" fill="#f6e4b8"/>
    <rect x="92" y="150" width="40" height="18" rx="2" fill="#f3e6c8"/>
    <path d="M22 156 L28 116" stroke="#2c6a34" stroke-width="4"/>
    <path d="M28 116 Q10 106 12 126 M28 116 Q48 100 54 120 M28 116 Q12 96 2 110" fill="none" stroke="#2c6a34" stroke-width="4" stroke-linecap="round"/>
    <path d="M168 160 L174 122" stroke="#2c6a34" stroke-width="4"/>
    <path d="M174 122 Q156 110 160 132 M174 122 Q196 106 202 126 M174 122 Q158 100 142 114" fill="none" stroke="#2c6a34" stroke-width="4" stroke-linecap="round"/>
    ${spiral(478, 108)}
    <circle cx="318" cy="150" r="8" fill="#d0122d" stroke="#fff" stroke-width="2"/>
    <text x="332" y="146" font-family="${F}" font-size="18" font-weight="700" fill="#1a1612">GOPALPUR</text>
    <text x="392" y="34" font-family="${F}" font-size="20" font-weight="700" fill="#102838">AKVAN · 90 km/h</text>
    <text x="470" y="188" font-family="${F}" font-size="14" font-weight="600" fill="#e7f4fb">BAY OF BENGAL</text>`);
  if (n === 2) return wrap(`
    <rect width="640" height="200" fill="#0e1b33"/>
    <circle cx="590" cy="28" r="13" fill="#f3e6c4"/>
    <path fill="#1a2d4e" d="M0 122 L0 74 L20 74 L20 48 L40 48 L40 36 L58 36 L58 70 L86 70 L86 44 L108 44 L108 122 L190 122 L190 58 L210 58 L210 36 L232 36 L232 66 L258 66 L258 48 L280 48 L280 122 L420 122 L420 54 L442 54 L442 32 L466 32 L466 60 L494 60 L494 42 L516 42 L516 122 L560 122 L560 50 L584 50 L584 70 L640 70 L640 122 Z"/>
    <g fill="#f2c14e"><rect x="26" y="58" width="5" height="6"/><rect x="46" y="44" width="5" height="6"/><rect x="92" y="56" width="5" height="6"/><rect x="198" y="48" width="5" height="6"/><rect x="450" y="42" width="5" height="6"/><rect x="568" y="58" width="5" height="6"/></g>
    <rect y="116" width="640" height="40" fill="#16324f"/>
    <rect x="64" y="110" width="84" height="12" fill="#d5dee8"/>
    <path d="M64 110 Q106 84 148 110" fill="none" stroke="#f4f7fb" stroke-width="3"/>
    <rect x="248" y="110" width="36" height="12" fill="#d5dee8"/>
    <rect x="312" y="110" width="42" height="12" fill="#d5dee8"/>
    <ellipse cx="296" cy="96" rx="20" ry="11" fill="#8b93a1"/>
    <ellipse cx="304" cy="82" rx="12" ry="8" fill="#6e7684"/>
    <rect x="468" y="110" width="92" height="12" fill="#d5dee8"/>
    <path d="M468 110 Q514 82 560 110" fill="none" stroke="#f4f7fb" stroke-width="3"/>
    <path d="M30 10 Q110 46 106 108" fill="none" stroke="#ffb020" stroke-width="3"/>
    <path d="M170 6 Q240 48 296 92" fill="none" stroke="#ff7a18" stroke-width="3"/>
    <path d="M400 8 Q470 40 514 104" fill="none" stroke="#ffb020" stroke-width="3"/>
    <circle cx="106" cy="108" r="4" fill="#ffd56a"/><circle cx="296" cy="94" r="5" fill="#ff9a2e"/><circle cx="514" cy="104" r="4" fill="#ffd56a"/>
    <text x="14" y="24" font-family="${F}" font-size="16" font-weight="700" fill="#f4efe2">KYIV · THREE BRIDGES</text>`);
  return wrap(`
    <rect width="640" height="200" fill="#10241c"/>
    <g stroke="#1d3d30" stroke-width="1"><line x1="24" y1="40" x2="340" y2="40"/><line x1="24" y1="84" x2="340" y2="84"/><line x1="24" y1="128" x2="340" y2="128"/><line x1="24" y1="172" x2="340" y2="172"/></g>
    ${candles()}
    <text x="378" y="46" font-family="${F}" font-size="16" font-weight="600" fill="#b7c9be">NIKKEI</text>
    <text x="378" y="92" font-family="Fraunces,serif" font-size="42" font-weight="700" fill="#ff5a4a">−4.9%</text>
    <text x="378" y="126" font-family="${F}" font-size="16" font-weight="600" fill="#b7c9be">KOSPI</text>
    <text x="378" y="172" font-family="Fraunces,serif" font-size="42" font-weight="700" fill="#ff5a4a">−5.4%</text>`);
}
