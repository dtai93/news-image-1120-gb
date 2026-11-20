const F = "IBM Plex Sans Condensed,sans-serif";
const S = "Fraunces,serif";
const svg = (body) =>
  `<svg viewBox="0 0 400 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${body}</svg>`;

const ART = {
  4: svg(`<rect width="400" height="80" fill="#f0d7ad"/>
    <rect y="50" width="400" height="30" fill="#e2c49a"/>
    <rect x="12" y="14" width="118" height="26" fill="#9a3412"/>
    <text x="20" y="33" font-family="${F}" font-size="16" font-weight="700" fill="#fff">COP31</text>
    <text x="140" y="32" font-family="${F}" font-size="14" font-weight="700" fill="#7a3412">FINAL DAY</text>
    <circle cx="250" cy="20" r="10" fill="#e8941a"/>
    <rect x="300" y="12" width="78" height="40" fill="#fff" stroke="#1a1612"/>
    <line x1="308" y1="26" x2="370" y2="26" stroke="#1a1612" stroke-width="2"/>
    <line x1="308" y1="38" x2="360" y2="38" stroke="#c81e1e" stroke-width="3"/>
    <g fill="#3d342c"><circle cx="28" cy="64" r="5"/><circle cx="46" cy="64" r="5"/><circle cx="64" cy="64" r="5"/><circle cx="82" cy="64" r="5"/></g>`),
  5: svg(`<rect width="400" height="80" fill="#f6f1e6"/>
    <rect width="12" height="80" fill="#1f7a3a"/><rect x="12" width="12" height="80" fill="#fff"/><rect x="24" width="12" height="80" fill="#c81e1e"/>
    <rect x="52" y="12" width="168" height="22" fill="#c81e1e"/>
    <text x="62" y="29" font-family="${F}" font-size="16" font-weight="700" fill="#fff">SCIOPERO</text>
    <g fill="#1a1612"><circle cx="64" cy="58" r="7"/><circle cx="86" cy="56" r="7"/><circle cx="108" cy="58" r="7"/><circle cx="130" cy="55" r="7"/><circle cx="152" cy="58" r="7"/></g>
    <rect x="250" y="30" width="78" height="26" rx="3" fill="#2457a6"/>
    <rect x="258" y="38" width="22" height="10" fill="#f2e2b0"/>
    <line x1="246" y1="26" x2="334" y2="62" stroke="#c81e1e" stroke-width="4"/>`),
  6: svg(`<rect width="400" height="80" fill="#eef3f8"/>
    <rect x="14" y="16" width="72" height="48" fill="#1d4e89"/>
    <g fill="#f2c14e"><circle cx="32" cy="30" r="2.5"/><circle cx="50" cy="30" r="2.5"/><circle cx="68" cy="30" r="2.5"/><circle cx="41" cy="42" r="2.5"/><circle cx="59" cy="42" r="2.5"/><circle cx="50" cy="52" r="2.5"/></g>
    <rect x="100" y="16" width="72" height="48" fill="#1d4e89"/>
    <rect x="100" y="34" width="72" height="12" fill="#fff"/><rect x="130" y="16" width="12" height="48" fill="#fff"/>
    <rect x="100" y="37" width="72" height="6" fill="#c81e1e"/><rect x="133" y="16" width="6" height="48" fill="#c81e1e"/>
    <text x="188" y="52" font-family="${S}" font-size="32" font-weight="700" fill="#1d4e89">100,000</text>`),
  7: svg(`<rect width="400" height="80" fill="#f7f4ec"/>
    <g fill="#0f766e"><rect x="16" y="50" width="18" height="22"/><rect x="40" y="40" width="18" height="32"/><rect x="64" y="30" width="18" height="42"/><rect x="88" y="18" width="18" height="54"/></g>
    <text x="124" y="54" font-family="${S}" font-size="36" font-weight="700" fill="#0f766e">2.2%</text>
    <text x="270" y="36" font-family="${F}" font-size="16" font-weight="700" fill="#3f3a34">RICE</text>
    <text x="270" y="58" font-family="${F}" font-size="16" font-weight="700" fill="#3f3a34">FUEL</text>`),
  8: svg(`<rect width="400" height="80" fill="#f6f1e6"/>
    <rect x="18" y="24" width="70" height="42" fill="#9a3412"/>
    <rect x="30" y="10" width="8" height="16" fill="#9a3412"/><rect x="48" y="10" width="8" height="16" fill="#9a3412"/><rect x="66" y="10" width="8" height="16" fill="#9a3412"/>
    <text x="108" y="36" font-family="${S}" font-size="26" font-weight="700" fill="#9a3412">3.0%</text>
    <text x="108" y="56" font-family="${F}" font-size="12" fill="#5c564e">1-YEAR</text>
    <text x="196" y="36" font-family="${S}" font-size="26" font-weight="700" fill="#9a3412">3.5%</text>
    <text x="196" y="56" font-family="${F}" font-size="12" fill="#5c564e">5-YEAR</text>
    <rect x="300" y="22" width="78" height="30" fill="none" stroke="#c81e1e" stroke-width="2"/>
    <text x="314" y="43" font-family="${F}" font-size="16" font-weight="700" fill="#c81e1e">HOLD</text>`),
  9: svg(`<rect width="400" height="80" fill="#1f7a4d"/>
    <rect y="58" width="400" height="22" fill="#18663f"/>
    <rect x="36" y="34" width="6" height="28" fill="#f4efe4"/><rect x="70" y="34" width="6" height="28" fill="#f4efe4"/>
    <rect x="28" y="32" width="56" height="4" fill="#f4efe4"/>
    <path d="M100 18 l6 36 h-5 l8 8" fill="#f2e2b8"/>
    <circle cx="128" cy="30" r="6" fill="#e23b2f"/>
    <text x="168" y="54" font-family="${S}" font-size="40" font-weight="700" fill="#f4efe4">118</text>`),
  10: svg(`<rect width="400" height="80" fill="#d5e8f2"/>
    <rect y="46" width="400" height="34" fill="#1d4e89"/>
    <ellipse cx="120" cy="48" rx="90" ry="16" fill="#243044"/>
    <rect x="150" y="26" width="26" height="16" rx="2" fill="#243044"/>
    <rect x="160" y="16" width="5" height="12" fill="#243044"/>
    <text x="230" y="40" font-family="${S}" font-size="28" font-weight="700" fill="#123056">3–5</text>
    <text x="230" y="60" font-family="${F}" font-size="13" font-weight="600" fill="#e7f1f8">VIRGINIA CLASS</text>`),
  11: svg(`<rect width="400" height="80" fill="#f3f0f8"/>
    <path d="M30 62 A80 36 0 0 1 190 62" fill="none" stroke="#6d28d9" stroke-width="8"/>
    <g fill="#6d28d9"><circle cx="48" cy="40" r="5"/><circle cx="78" cy="28" r="5"/><circle cx="110" cy="24" r="5"/><circle cx="142" cy="28" r="5"/><circle cx="172" cy="40" r="5"/></g>
    <rect x="220" y="14" width="160" height="50" fill="#fff" stroke="#6d28d9" stroke-width="2"/>
    <text x="234" y="42" font-family="${S}" font-size="24" font-weight="700" fill="#6d28d9">7 of 8</text>
    <text x="234" y="58" font-family="${F}" font-size="12" fill="#5c564e">GRYNSPAN</text>`),
  12: svg(`<rect width="400" height="80" fill="#f7f4ec"/>
    <rect x="18" y="22" width="100" height="36" rx="18" fill="#c2410c"/>
    <rect x="68" y="22" width="50" height="36" fill="#f3e2c0"/>
    <rect x="100" y="22" width="18" height="36" rx="8" fill="#f3e2c0"/>
    <circle cx="190" cy="40" r="24" fill="none" stroke="#1a1612" stroke-width="2"/>
    <circle cx="190" cy="40" r="7" fill="#c2410c" opacity="0.45"/>
    <text x="230" y="50" font-family="${S}" font-size="28" font-weight="700" fill="#c2410c">1 in 12</text>`),
  13: svg(`<rect width="400" height="80" fill="#e7eef6"/>
    <polygon points="24,38 78,14 132,38" fill="#f7f4ec" stroke="#1a1612"/>
    <rect x="36" y="38" width="84" height="30" fill="#f7f4ec" stroke="#1a1612"/>
    <rect x="68" y="48" width="16" height="20" fill="#1d4e89"/>
    <rect x="160" y="20" width="72" height="26" fill="none" stroke="#c81e1e" stroke-width="2"/>
    <text x="172" y="39" font-family="${F}" font-size="15" font-weight="700" fill="#c81e1e">HOLD</text>
    <text x="250" y="52" font-family="${S}" font-size="28" font-weight="700" fill="#1d4e89">2027</text>`)
};

export function cardArt(n) { return ART[n] || ""; }
