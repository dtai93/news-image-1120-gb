const F = "IBM Plex Sans Condensed,sans-serif";
const S = "Fraunces,serif";
const ban = (t, k) =>
  `<rect width="340" height="30" fill="#b01c1c"/>
   <text x="8" y="21" font-family="${F}" font-size="16" font-weight="700" fill="#fff">${t}</text>
   <text x="332" y="21" text-anchor="end" font-family="${F}" font-size="16" font-weight="700" fill="#fff">${k}</text>`;
const svg = (b) =>
  `<svg viewBox="0 0 340 124" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">${b}</svg>`;

const SCENE = {
  4: `${ban("POLAND STRIKE", "3 WEAPONS")}
    <rect y="30" width="340" height="94" fill="#efe2c4"/>
    <ellipse cx="150" cy="96" rx="46" ry="16" fill="#6a5236"/>
    <ellipse cx="150" cy="90" rx="18" ry="7" fill="#241c14"/>
    <path d="M230 40 L300 84" stroke="#e23b2f" stroke-width="4"/>
    <polygon points="292,74 318,92 286,94" fill="#e23b2f"/>`,
  5: `${ban("YEMEN STRIKES", "193 HURT")}
    <rect y="30" width="340" height="94" fill="#142033"/>
    <rect x="16" y="78" width="78" height="36" fill="#24344a"/>
    <rect x="104" y="64" width="22" height="50" fill="#2c3e56"/>
    <circle cx="180" cy="70" r="12" fill="#ff7a22"/>
    <circle cx="214" cy="58" r="9" fill="#ffb020"/>
    <circle cx="246" cy="78" r="7" fill="#ff5a2a"/>
    <text x="268" y="96" font-family="${S}" font-size="32" font-weight="700" fill="#fff">193</text>`,
  6: `${ban("HORMUZ TANKER", "TANKER FIRE")}
    <rect y="30" width="340" height="50" fill="#d7e8f2"/>
    <rect y="80" width="340" height="44" fill="#3d88a8"/>
    <path d="M70 86 L210 86 L196 108 L86 108 Z" fill="#c45a2a"/>
    <rect x="168" y="68" width="22" height="18" fill="#8a3a22"/>
    <ellipse cx="150" cy="58" rx="14" ry="18" fill="#5a5a5a"/>
    <ellipse cx="168" cy="48" rx="10" ry="14" fill="#8a8a8a"/>`,
  7: `${ban("BAYELSA BOAT", "4 DEAD")}
    <rect y="30" width="340" height="44" fill="#d7ecf2"/>
    <rect y="74" width="340" height="50" fill="#2f6f86"/>
    <path d="M36 78 L150 78 L132 108 L54 108 Z" fill="#e8d7b0"/>
    <rect x="168" y="58" width="10" height="28" fill="#1a1612"/>
    <circle cx="173" cy="54" r="6" fill="#1a1612"/>
    <rect x="200" y="96" width="40" height="8" fill="#f4efe4"/>
    <text x="210" y="70" font-family="${S}" font-size="28" font-weight="700" fill="#16324a">4</text>`,
  8: `${ban("COP31 OVERTIME", "NO DEAL")}
    <rect y="30" width="340" height="94" fill="#f6f1e6"/>
    <circle cx="78" cy="82" r="28" fill="none" stroke="#1a1612" stroke-width="4"/>
    <line x1="78" y1="82" x2="78" y2="64" stroke="#1a1612" stroke-width="3"/>
    <line x1="78" y1="82" x2="96" y2="90" stroke="#b01c1c" stroke-width="3"/>
    <text x="124" y="90" font-family="${S}" font-size="32" font-weight="700" fill="#b01c1c">NO DEAL</text>`,
  9: `${ban("ITALY STRIKE", "100 SQUARES")}
    <rect y="30" width="340" height="94" fill="#f7f3ea"/>
    <rect x="0" y="30" width="14" height="94" fill="#1f7a3a"/>
    <rect x="14" y="30" width="14" height="94" fill="#fff"/>
    <rect x="28" y="30" width="14" height="94" fill="#c81e1e"/>
    <circle cx="90" cy="78" r="10" fill="#1a1612"/><circle cx="118" cy="82" r="10" fill="#1a1612"/>
    <circle cx="146" cy="76" r="10" fill="#1a1612"/><circle cx="174" cy="84" r="10" fill="#1a1612"/>
    <rect x="210" y="86" width="100" height="24" fill="#c5ccd4"/>
    <text x="214" y="78" font-family="${F}" font-size="16" font-weight="700" fill="#1a1612">SCIOPERO</text>`,
  10: `${ban("JURF DEPLOYMENT", "60 KM")}
    <rect y="30" width="340" height="94" fill="#efe6d4"/>
    <rect x="200" y="52" width="70" height="62" fill="#c4b49a"/>
    <rect x="280" y="70" width="44" height="44" fill="#b7a48a"/>
    <rect x="16" y="88" width="52" height="18" fill="#3d6b3a"/>
    <circle cx="28" cy="108" r="5" fill="#1a1612"/><circle cx="54" cy="108" r="5" fill="#1a1612"/>
    <rect x="80" y="92" width="52" height="18" fill="#2f5a30"/>
    <text x="148" y="100" font-family="${S}" font-size="26" font-weight="700" fill="#1a1612">60 KM</text>`,
  11: `${ban("HAITI RAID", "34 KILLED")}
    <rect y="30" width="340" height="94" fill="#1c2430"/>
    <rect x="14" y="70" width="36" height="44" fill="#3a4654"/>
    <rect x="56" y="56" width="24" height="58" fill="#2c3642"/>
    <rect x="100" y="86" width="96" height="22" fill="#6d7c4a"/>
    <circle cx="118" cy="110" r="6" fill="#111"/><circle cx="176" cy="110" r="6" fill="#111"/>
    <text x="214" y="100" font-family="${S}" font-size="36" font-weight="700" fill="#fff">34</text>`,
  12: `${ban("JAPAN PRICES", "2.2%")}
    <rect y="30" width="340" height="94" fill="#f7f4ec"/>
    <rect x="24" y="88" width="22" height="22" fill="#0f766e"/>
    <rect x="54" y="70" width="22" height="40" fill="#0f766e"/>
    <rect x="84" y="52" width="22" height="58" fill="#b01c1c"/>
    <text x="130" y="100" font-family="${S}" font-size="40" font-weight="700" fill="#9a3412">2.2%</text>`,
  13: `${ban("AUKUS SUBS", "3–5 SUBS")}
    <rect y="30" width="340" height="94" fill="#d5e4f2"/>
    <ellipse cx="130" cy="86" rx="90" ry="18" fill="#1d4e89"/>
    <rect x="196" y="62" width="22" height="18" fill="#1d4e89"/>
    <polygon points="40,86 70,76 70,96" fill="#1d4e89"/>
    <text x="230" y="98" font-family="${S}" font-size="32" font-weight="700" fill="#123056">3–5</text>`
};

export function cardArt(n) {
  return svg(SCENE[n]);
}
