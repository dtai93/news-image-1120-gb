import { leadArt } from "./art-leads.js";
import { cardArt } from "./art-cards.js";
import { drawMap } from "./map.js";

const COL = {
  Europe: "#1d4e89", Americas: "#c2410c", "Asia-Pacific": "#0f766e",
  "Middle East": "#b42318", Africa: "#a16207", Oceania: "#1f7a4d", World: "#6d28d9"
};
const FIGC = ["#0f766e", "#1d4e89", "#c81e1e", "#0f766e", "#9a3412", "#1f7a4d"];
const DEK = ("|" + [
  "Gusts of 90 km/h; 300,000 evacuated before landfall.",
  "Three bridges hit; 3 killed and about 15 hurt.",
  "Nikkei fell as much as 4.9%; the Kospi 5.4%.",
  "Thursday's draft drops fossil fuels and a $120 billion goal.",
  "Marches are planned in about 100 squares.",
  "Each side would take up to 100,000 young people a year.",
  "Core CPI rose 2.2% on the year, under a 2.3% forecast.",
  "One-year rate stays 3.0%; the five-year stays 3.5%.",
  "Out for 118, a Test hundred after his ODI and T20I tons.",
  "Selling 3 to 5 submarines would shrink the US fleet.",
  "Grynspan led 7 of 8 straw polls.",
  "Undetectable in 1 of 12 people given the pill.",
  "He would take fresh strikes after the start of 2027."
].join("|")).split("|");
const ALSO = [
  "Night fuel queues; two litres about $17.",
  "Day 12: Africa asks Europe for climate cash.",
  "More than 85% of rescue trucks are out of service.",
  "As many as 400 have protested for two weeks.",
  "China warns climbers; a family offers $75,000.",
  "The fix covered 10,000s of supermarket fridges.",
  "Mercury orbit, after 8 years and nearly 10 billion km.",
  "A noon blast of about 5 tons of lead azide is delayed.",
  "Russell tops rain-hit practice 2.",
  "Rio Tinto pledges $370 million for the mine.",
  "The 19-metre wreck is found after 128 years.",
  "A jury convicts her of killing both parents, aged 94.",
  "A grant cut puts a $600 million incinerator in doubt.",
  "A hunter, 45, is found alive after almost 24 hours.",
  "Police say a raid killed at least 34 gunmen.",
  "One patient's file reached over 100,000 staff.",
  "Police kill a suspect with a 50,000-rupee reward.",
  "Gold falls toward a $3,500 low.",
  "A prequel set 24 years earlier opens today.",
  "A trust will pay after threatening 4 pupils.",
  "The BBC spoke to 7 people inside the siege.",
  "Bitcoin slips below $61,560.",
  "A 2032 venue, and the costs stay secret."
];
const $ = (id) => document.getElementById(id);
const city = (p) => p.split(",")[0].toUpperCase();
const outlet = (s) => s.split(",")[0];

function meta(s) {
  return `<div class="meta"><b style="background:${COL[s.region]}">${s.n}</b>${city(s.place)} · ${s.field.toUpperCase()}</div>`;
}

async function main() {
  const data = await fetch("../data/stories.json").then((r) => r.json());
  const by = Object.fromEntries(data.stories.map((s) => [s.n, s]));
  $("mast").innerHTML = `<div class="kicker-row"><span class="kicker">THE WORLD IN ONE DAY</span><span class="count">${data.stories.length} STORIES · 5 CONTINENTS</span></div><h1>${data.date}</h1><p class="tag">${data.tagline}</p><div class="rules"></div>`;
  $("figures").innerHTML = data.figures.map((f, i) =>
    `<div class="fig"><b style="color:${FIGC[i]}">${f.value}</b><span>${f.label}</span></div>`).join("");
  const order = ["Europe", "Americas", "Asia-Pacific", "Middle East", "Africa", "Oceania", "World"];
  const counts = {};
  for (const s of data.stories) counts[s.region] = (counts[s.region] || 0) + 1;
  $("chips").innerHTML = order.map((r) =>
    `<span class="chip" style="background:${COL[r]}">${r.toUpperCase()} ${counts[r]}</span>`).join("");
  $("leads").innerHTML = [1, 2, 3].map((n) => {
    const s = by[n];
    return `<article class="lead"><div class="art">${leadArt(n)}</div><div class="pad">${meta(s)}<h2>${s.headline}</h2><p class="dek">${DEK[n]}</p><p class="src">${outlet(s.source)}</p></div></article>`;
  }).join("");
  $("cards").innerHTML = Array.from({ length: 10 }, (_, i) => i + 4).map((n) => {
    const s = by[n];
    return `<article class="card" style="--c:${COL[s.region]}"><div class="art">${cardArt(n)}</div><div class="pad">${meta(s)}<h3>${s.headline}</h3><p class="dek">${DEK[n]}</p><p class="src">${outlet(s.source)}</p></div></article>`;
  }).join("");
  $("map").innerHTML = `<h2>WHERE IT HAPPENED</h2><div class="svgwrap">${drawMap(data.stories)}</div><p class="map-note">Pins 1–13 match the cards. Dots sit on the city.</p>`;
  const also = data.stories.filter((s) => s.tier === "also");
  $("also").innerHTML = `<h2><span>ALSO ON FRIDAY 20 NOVEMBER</span><span>${also.length} MORE</span></h2><div class="also-list">${also.map((s, i) =>
    `<p><b style="color:${COL[s.region]}">${s.n} ${city(s.place)}</b> ${ALSO[i]} <i>${outlet(s.source)}</i></p>`).join("")}</div>`;
  $("check").innerHTML = `<strong>DATE CHECK</strong><p>First reported Thursday 19 November, so left off this page: the Trump–Xi–Putin meeting in Shenzhen; Anthropic's Nasdaq debut, up 17% at $97.17; GTA VI's midnight launch; the ICJ Rohingya ruling; the Senate's 48–51 Iran war-powers vote; daytime drones that hit Kyiv embassies; the Senegal capsize, four bodies confirmed Thursday; Colombia's tax marches; Lula's visit to Chief Raoni.</p>`;
  const src = data.sources.filter((s) => !/Wikipedia/.test(s)).join(", ");
  $("foot").textContent = `Every story here happened, or was first reported, on Friday 20 November 2026. Disputed claims are attributed, not stated as fact. Sources: ${src}. Original drawings.`;
  document.body.dataset.ready = "1";
}
main();
