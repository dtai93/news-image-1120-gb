const FALL = {
  Europe: "#1d4e89", Americas: "#c2410c", Asia: "#0f766e",
  "Middle East": "#b42318", Africa: "#8a5a10", Oceania: "#1f7a4d", Global: "#4c3d73"
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

export function drawMap(stories, col) {
  const C = col || FALL;
  const W = 300, H = 168;
  const proj = (lat, lon) => [((+lon + 180) / 360) * W, ((90 - +lat) / 180) * H];
  const eq = ((90 - 0) / 180) * H;
  const grid = `<line x1="0" y1="${eq.toFixed(1)}" x2="${W}" y2="${eq.toFixed(1)}" stroke="#a9c6d8" stroke-width="0.7"/>`;
  const land = LAND.map((s) => `<path d="${ring(s, W, H)}" fill="#e6d2a4" stroke="#8d7349" stroke-width="0.7"/>`).join("");
  const pins = stories.filter((s) => s.n <= 13).map((s) => {
    const [x, y] = proj(s.lat, s.lon);
    return { n: s.n, x, y, ox: x, oy: y, c: C[s.region] };
  });
  for (let k = 0; k < 80; k++) {
    for (let i = 0; i < pins.length; i++) {
      for (let j = i + 1; j < pins.length; j++) {
        let dx = pins[j].x - pins[i].x;
        let dy = pins[j].y - pins[i].y;
        const d = Math.hypot(dx, dy) || 0.01;
        if (d < 16) {
          const push = (16 - d) / 2;
          dx /= d; dy /= d;
          pins[i].x -= dx * push; pins[i].y -= dy * push;
          pins[j].x += dx * push; pins[j].y += dy * push;
        }
      }
    }
  }
  let marks = "";
  for (const p of pins) {
    p.x = Math.max(8, Math.min(W - 8, p.x));
    p.y = Math.max(8, Math.min(H - 8, p.y));
    if (Math.hypot(p.x - p.ox, p.y - p.oy) > 3) {
      marks += `<line x1="${p.ox.toFixed(1)}" y1="${p.oy.toFixed(1)}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}" stroke="#1a1612" stroke-width="0.6"/>`;
      marks += `<circle cx="${p.ox.toFixed(1)}" cy="${p.oy.toFixed(1)}" r="1.3" fill="#1a1612"/>`;
    }
    const fs = p.n >= 10 ? 6.2 : 7;
    marks += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="5.6" fill="${p.c}" stroke="#fff" stroke-width="0.8"/>`;
    marks += `<text x="${p.x.toFixed(1)}" y="${p.y.toFixed(1)}" dy="0.35em" text-anchor="middle" font-size="${fs}" font-family="IBM Plex Sans Condensed,sans-serif" font-weight="700" fill="#fff">${p.n}</text>`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><rect width="${W}" height="${H}" fill="#c5dbed"/>${grid}${land}${marks}</svg>`;
}
