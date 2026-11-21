import { leadArt } from "./art-leads.js";
import { cardArt } from "./art-cards.js";
import { drawMap } from "./map.js";

const COL = {
  Europe: "#1d4e89", "Middle East": "#b42318", Africa: "#8a5a10",
  Asia: "#0f766e", Americas: "#c2410c", Oceania: "#1f7a4d", Global: "#4c3d73"
};
const ORDER = ["Europe", "Middle East", "Africa", "Asia", "Americas", "Oceania", "Global"];
const ST = { official: "OFFICIAL", confirmed: "CONFIRMED", reported: "REPORTED" };
const UTC = ["Akvan landfall", "Jurf deployment", "Kyiv bridges hit", "Missile in Poland", "Nikkei −5.1%", "Bayelsa boat", "Nasdaq −5.28%"];
const DEK = {
  4: "3 weapons landed at 05:30. Reuters",
  5: "Yemen says 193 killed or hurt. AP",
  6: "One tanker on fire off Khasab. UKMTO",
  7: "Police: 4 dead, 24 rescued. Reuters",
  8: "Fossil fuels still absent. Guardian",
  9: "Marches in about 100 squares. Adnkronos",
  10: "Jurf entered, 60 km out. Al Jazeera",
  11: "At least 34 killed in the raid. Al Jazeera",
  12: "Core CPI 2.2%, under 2.3%. RTT",
  13: "3–5 subs would shrink the fleet. Guardian"
};
const ALSO = [
  "Each side would take up to 100,000 a year.",
  "Two drones crossed, then turned back.",
  "Nears Mercury after almost 10 billion km.",
  "Two litres cost about $17.31.",
  "8 million children lack formal school.",
  "New adaptation pledges: $50.2 million.",
  "Loan rates stay at 3.0% and 3.5%.",
  "Sensex closed up 2.3% at 83,920.",
  "Benchmark fell 6.63% to 35,878.",
  "Winter warning; family offers $75,000.",
  "In 61 patients, clear in 1 of 12.",
  "3 soldiers killed, 1 injured.",
  "Large strikes discussed after 2027.",
  "Protections may end for 100,000+.",
  "Agreed to build 3 prisons.",
  "More than 85% of rescue trucks are out.",
  "Up to 400 women protested for 2 weeks.",
  "Nabhan, 11, died of his wounds.",
  "Phillips made 118 in all three formats.",
  "Rio Tinto pledged $370 million.",
  "ASX 200 fell 2.60% to 8,593.",
  "Grynspan led 7 of 8 straw polls.",
  "1 in 4 children live in conflict."
];
const $ = (id) => document.getElementById(id);
const city = (p) => p.split(",")[0].toUpperCase();
const SHORT = {
  "Institute for the Study of War": "ISW",
  "People's Bank of China": "PBOC",
  "Economy Middle East": "Econ. ME",
  "La Prensa Gráfica": "La Prensa",
  "Democracy Now": "Dem. Now",
  "Associated Press": "AP",
  "ABC Australia": "ABC",
  "The Guardian": "Guardian",
  "Daily Nation": "Nation",
  "Yahoo Finance": "Yahoo"
};
const outlet = (src) => SHORT[src.split(",")[0]] || src.split(",")[0];

function figColor(v) {
  const s = String(v);
  if (s.startsWith("-")) return "#b42318";
  if (s === "300,000") return "#0f766e";
  if (s === "8" || s === "193") return "#9a1b1b";
  return "#16130f";
}
function meta(s, region) {
  const mid = region ? `${s.region.toUpperCase()} · ${city(s.place)}` : city(s.place);
  return `<div class="meta"><b style="background:${COL[s.region]}">${s.n}</b>${mid} · ${s.field.toUpperCase()}</div>`;
}

async function main() {
  const data = await fetch("../data/stories.json").then((r) => r.json());
  const by = Object.fromEntries(data.stories.map((s) => [s.n, s]));
  const n = data.stories.length;
  $("mast").innerHTML =
    `<div class="kicker-row"><span class="kicker">THE WORLD IN ONE DAY</span><span class="count">${n} STORIES · 7 REGIONS · EVERY ONE DATED FRIDAY 20 NOVEMBER 2026</span></div>` +
    `<h1>${data.date}</h1><p class="tag">${data.tagline}</p><div class="rules"></div>`;
  $("utc").innerHTML = `<div class="band">THE DAY<br>IN UTC</div>` +
    data.timeline.map((t, i) => `<div class="tick"><b>${t.utc}</b><span>${UTC[i]}</span></div>`).join("");
  $("figures").innerHTML = `<div class="band">THE DAY<br>IN NUMBERS</div>` +
    data.figures.map((f) => `<div class="fig"><b style="color:${figColor(f.value)}">${String(f.value).replace("-", "−")}</b><span>${f.label}</span></div>`).join("");
  const counts = {};
  for (const s of data.stories) counts[s.region] = (counts[s.region] || 0) + 1;
  $("chips").innerHTML = ORDER.map((r) =>
    `<span class="chip" style="background:${COL[r]}">${r.toUpperCase()} ${counts[r] || 0}</span>`).join("");
  $("leads").innerHTML = [1, 2, 3].map((i) => {
    const s = by[i];
    return `<article class="lead"><div class="art">${leadArt(i)}<span class="st st-${s.status}">${ST[s.status]}</span></div><div class="pad">${meta(s, true)}<h2>${s.headline}</h2><p class="dek">${s.dek}</p><p class="src">${s.source}</p></div></article>`;
  }).join("");
  $("cards").innerHTML = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => {
    const s = by[i];
    return `<article class="card" style="--c:${COL[s.region]}"><div class="art">${cardArt(i)}</div><div class="pad"><div class="row">${meta(s, false)}<span class="st st-${s.status}">${ST[s.status]}</span></div><h3>${s.headline}</h3><p class="dek">${DEK[i]}</p></div></article>`;
  }).join("");
  const legend = ORDER.map((r) => `<span><i style="background:${COL[r]}"></i>${r} ${counts[r]}</span>`).join("");
  $("map").innerHTML = `<h2>WHERE IT HAPPENED</h2><div class="svgwrap">${drawMap(data.stories, COL)}</div><div class="legend">${legend}</div>`;
  const also = data.stories.filter((s) => s.tier === "also");
  $("also").innerHTML = `<h2>ALSO ON FRIDAY 20 NOVEMBER — ${also.length} MORE STORIES</h2><div class="also-list">${also.map((s, i) =>
    `<p><b style="color:${COL[s.region]}">${s.n} ${city(s.place)}</b> ${ALSO[i]} <i>${outlet(s.source)}</i></p>`).join("")}</div>`;
  $("check").innerHTML = `<strong>DATE CHECK</strong><p>Left off as before Friday: the Shenzhen Trump–Xi–Putin meeting, Anthropic’s debut up 17% at $97.17, GTA VI’s launch, the ICJ Rohingya ruling, the Senate Iran war-powers vote, and daytime drones on Kyiv embassies. Huang resigned on 12 November; Friday’s Nvidia fact is the 14% drop. Bayelsa uses the police toll, 4 dead and 24 rescued, not a 30-dead claim.</p>`;
  $("foot").innerHTML = `<span><i class="st st-official">OFFICIAL</i> on the record</span><span><i class="st st-confirmed">CONFIRMED</i> named outlets</span><span><i class="st st-reported">REPORTED</i> one outlet</span><span>Every story happened, or was first reported, on Friday 20 November 2026. Original drawings.</span>`;
  document.body.dataset.ready = "1";
}
main();
