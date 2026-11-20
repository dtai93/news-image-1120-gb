const COL = {
  Europe: "#1d4e89", Americas: "#c2410c", "Asia-Pacific": "#0f766e",
  "Middle East": "#b42318", Africa: "#a16207", Oceania: "#1f7a4d", World: "#6d28d9"
};
const LAND = [
  "-166,68 -160,66 -153,59 -142,60 -136,56 -130,54 -125,49 -124,40 -122,36 -117,32 -114,28 -110,24 -106,22 -97,16 -90,16 -87,13 -83,9 -80,8 -77,8 -84,13 -90,18 -97,22 -97,26 -94,30 -88,30 -82,29 -81,25 -80,26 -81,31 -76,35 -74,39 -73.2,40.8 -70,42 -67,45 -60,47 -56,53 -64,59 -78,63 -90,66 -105,72 -128,71 -150,71 -166,68",
  "-68,76 -60,81 -45,83 -25,78 -22,70 -44,61 -55,65 -68,73 -68,76",
  "-80,9 -71,12 -62,8 -51,4 -46,-2 -38,-8 -35,-15 -40,-22 -48,-28 -54,-34 -62,-40 -68,-55 -74,-50 -74,-36 -76,-16 -80,1 -80,9",
  "-17,21 -16,14 -10,5 -5,5 9,4 12,-6 12,-18 18,-34 26,-34 32,-28 35,-20 42,-12 51,11 43,12 38,15 32,31 20,32 10,37 -2,35 -9,32 -17,21",
  "-9.5,37 -9.2,42 -8,43.5 -2,43.2 -1,46 -4.5,48.5 -1,49.5 1.5,51 3,51.3 5,53 8,54.5 7,58 10,59 12,55.5 15,58 18,62 22,65 26,68 25,63 22,56 20,52 24,51 28,52 33,50.5 36,48 32,45 26,43 22,41 18,40.2 15.2,41 12.2,39.8 10.5,42 8,44 4,43 0,41 -2,37 -6,36.2 -9.5,37",
  "43,12 51,15 56,26 66,25 70,23 73,16 77,8 80,13 86,19 88,22 95,16 102,2 109,2 109,14 108,21 120,23 122,31 126,34 129,35 132,43 140,45 145,50 158,58 170,66 140,70 100,72 70,66 50,54 44,48 40,45 36,42 32,41 28,41 26,40.2 26,36.3 30,36 33,36.2 36,36.5 39,36 42,37 40,33 36,31 34,28 36,24 40,18 43,12",
  "113,-22 128,-14 136,-12 142,-11 149,-18 153,-27 150,-37 141,-38 128,-33 115,-34 113,-26 113,-22",
  "172.8,-34.4 175.2,-36.2 178.2,-37.8 178,-39.5 176.2,-41.4 174.2,-42.1 172.2,-39.2 172.8,-34.4",
  "166,-45.5 171,-46.6 170,-43.6 166.5,-44.5 166,-45.5",
  "131,31.5 134,33.4 138,34.6 140.6,35.2 142,38 145,43 141,39 139.2,36.2 136,34.6 132,33 131,31.5",
  "-7.8,50.2 -5.2,49.9 -3,50.4 -1.2,50.7 1.3,51.2 1.4,52.8 0.2,54 -1.5,55.2 -2.2,56.5 -1.2,58.2 -4.2,58.6 -5.8,57.5 -6.5,55 -5,53.5 -6.2,52 -7.8,50.2",
  "95,5 105,0 114,-4 125,-8 138,-4 147,-8 135,-8 120,-7 105,-2 95,5",
  "43,-12 50,-16 47,-25 44,-25 43,-12"
];

function ring(spec, W, H) {
  const pts = spec.trim().split(/\s+/).map(p => {
    const [lon, lat] = p.split(",").map(Number);
    const x = ((lon + 180) / 360) * W;
    const y = ((90 - lat) / 180) * H;
    return x.toFixed(1) + "," + y.toFixed(1);
  });
  return "M" + pts.join("L") + "Z";
}

export function drawMap(stories) {
  const W = 360, H = 180;
  const proj = (lat, lon) => [((+lon + 180) / 360) * W, ((90 - +lat) / 180) * H];
  let grid = "";
  for (let lon = -180; lon <= 180; lon += 30) {
    const x = ((lon + 180) / 360) * W;
    grid += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="#a9c3d4" stroke-width="0.25"/>`;
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    const y = ((90 - lat) / 180) * H;
    const sw = lat === 0 ? 0.6 : 0.25;
    grid += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#a9c3d4" stroke-width="${sw}"/>`;
  }
  const land = LAND.map(s => `<path d="${ring(s, W, H)}" fill="#e7d7b4" stroke="#b7a27c" stroke-width="0.35"/>`).join("");
  const pins = stories.filter(s => s.n <= 13).map(s => {
    const [x, y] = proj(s.lat, s.lon);
    return { n: s.n, x, y, c: COL[s.region] };
  });
  const used = new Set();
  let marks = "";
  for (const a of pins) {
    if (used.has(a.n)) continue;
    const g = [a];
    used.add(a.n);
    for (const b of pins) {
      if (!used.has(b.n) && Math.hypot(a.x - b.x, a.y - b.y) < 3.5) {
        g.push(b); used.add(b.n);
      }
    }
    const x = g.reduce((s, p) => s + p.x, 0) / g.length;
    const y = g.reduce((s, p) => s + p.y, 0) / g.length;
    g.sort((p, q) => p.n - q.n);
    if (g.length === 1) {
      const fs = a.n >= 10 ? 5.1 : 6.1;
      marks += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.4" fill="${a.c}" stroke="#fff" stroke-width="0.7"/>`;
      marks += `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" dy="0.34em" text-anchor="middle" font-size="${fs}" font-family="IBM Plex Sans Condensed,sans-serif" font-weight="700" fill="#fff">${a.n}</text>`;
    } else {
      marks += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.3" fill="#1a1612"/>`;
      g.forEach((p, i) => {
        const dx = (i - (g.length - 1) / 2) * 8.2;
        const fs = p.n >= 10 ? 4.8 : 5.6;
        marks += `<circle cx="${(x + dx).toFixed(1)}" cy="${(y - 5.2).toFixed(1)}" r="4" fill="${p.c}" stroke="#fff" stroke-width="0.6"/>`;
        marks += `<text x="${(x + dx).toFixed(1)}" y="${(y - 5.2).toFixed(1)}" dy="0.34em" text-anchor="middle" font-size="${fs}" font-family="IBM Plex Sans Condensed,sans-serif" font-weight="700" fill="#fff">${p.n}</text>`;
      });
    }
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <rect width="${W}" height="${H}" fill="#c5d9ea"/>${grid}${land}${marks}</svg>`;
}
