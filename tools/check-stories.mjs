import { readFileSync } from "node:fs";

const path = new URL("../data/stories.json", import.meta.url);
const data = JSON.parse(readFileSync(path, "utf8"));
const errors = [];
const regions = ["Europe", "Americas", "Asia-Pacific", "Middle East", "Africa", "Oceania", "World"];
const tiers = ["lead", "main", "also"];
const keys = ["n", "tier", "region", "field", "place", "lat", "lon", "headline", "dek", "source", "scene", "url"];

function words(s) {
  return String(s).trim().split(/\s+/).filter(Boolean);
}

if (data.date !== "Friday 20 November 2026") errors.push("date");
if (!data.tagline || words(data.tagline).length < 3) errors.push("tagline");
if (!Array.isArray(data.figures) || data.figures.length !== 6) errors.push("figures length");
if (!Array.isArray(data.stories)) errors.push("stories");
if (!Array.isArray(data.date_check) || data.date_check.length < 1) errors.push("date_check");
if (!Array.isArray(data.sources) || data.sources.length < 1) errors.push("sources");

const stories = data.stories ?? [];
const counts = { lead: 0, main: 0, also: 0 };
const byRegion = Object.fromEntries(regions.map((r) => [r, 0]));
const nums = new Set();

for (const s of stories) {
  for (const k of keys) if (s[k] === undefined || s[k] === "") errors.push(`story ${s.n} missing ${k}`);
  if (!tiers.includes(s.tier)) errors.push(`story ${s.n} tier`);
  if (!regions.includes(s.region)) errors.push(`story ${s.n} region ${s.region}`);
  if (typeof s.lat !== "number" || typeof s.lon !== "number") errors.push(`story ${s.n} lat/lon`);
  if (words(s.headline).length > 8) errors.push(`headline ${s.n} (${words(s.headline).length}): ${s.headline}`);
  if (words(s.dek).length > 22) errors.push(`dek ${s.n} (${words(s.dek).length}): ${s.dek}`);
  if (!/\d/.test(s.dek)) errors.push(`dek ${s.n} has no number`);
  counts[s.tier] = (counts[s.tier] ?? 0) + 1;
  byRegion[s.region] = (byRegion[s.region] ?? 0) + 1;
  if (nums.has(s.n)) errors.push(`duplicate n ${s.n}`);
  nums.add(s.n);
}

for (let i = 1; i <= stories.length; i++) if (!nums.has(i)) errors.push(`missing n ${i}`);
if (counts.lead !== 3) errors.push(`leads ${counts.lead}`);
if (counts.main !== 10) errors.push(`mains ${counts.main}`);
if (stories.length < 36 || stories.length > 40) errors.push(`count ${stories.length}`);
for (const r of regions) if ((byRegion[r] ?? 0) < 2) errors.push(`region ${r} has ${byRegion[r] ?? 0}`);

for (const f of data.figures ?? []) {
  if (!f.value || !f.label || !nums.has(f.story)) errors.push(`figure ${f.label}`);
}

const leadRegions = new Set(stories.filter((s) => s.tier === "lead").map((s) => s.region));
const leadFields = new Set(stories.filter((s) => s.tier === "lead").map((s) => s.field));
if (leadRegions.size < 2) errors.push("leads share one region");
if (leadFields.size < 2) errors.push("leads share one field");

console.log(JSON.stringify({ stories: stories.length, counts, byRegion, errors }, null, 2));
if (errors.length) process.exit(1);
