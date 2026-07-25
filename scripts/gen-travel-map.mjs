// Build-time generator: bakes BOTH datasets into lib/travel-map-data.ts —
//   WORLD  : full equirectangular world (110m), 9 visited marks — the main animation
//   EUROPE : zoomed Mercator window (50m) for the magnifier lens
// so the client ships static SVG (no d3 in the bundle, no runtime map fetch).
//
//   node scripts/gen-travel-map.mjs
//
// Adapted from the "X Marks The Spot" Claude Design project.

import { readFileSync, writeFileSync } from 'node:fs';
import { geoEquirectangular, geoMercator, geoPath, geoBounds } from 'd3-geo';
import { feature } from 'topojson-client';

// Capitals for the X-marks.
const CAP = {
  Canada: [-75.7, 45.4],
  'United States': [-77.0, 38.9],
  'Dominican Republic': [-69.9, 18.5],
  'South Korea': [127.0, 37.5],
  Spain: [-3.7, 40.42],
  England: [-0.13, 51.51],
  France: [2.35, 48.85],
  Monaco: [7.42, 43.73],
  Italy: [12.5, 41.9],
};
// Order the marks appear (roughly west → east), and which are in the Europe cluster.
const WORLD_MARKS = ['Canada', 'United States', 'Dominican Republic', 'South Korea', 'Spain', 'England', 'France', 'Monaco', 'Italy'];
const EUROPE_MARKS = ['Spain', 'England', 'France', 'Monaco', 'Italy'];
// Standalone marks get a label on the world map; the European cluster is left to the lens.
const WORLD_LABELLED = new Set(['Canada', 'United States', 'Dominican Republic', 'South Korea']);

const seedRand = (s0) => {
  let seed = s0;
  return () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
};

function buildCountries(features, path, W, H, visitedNames, s0) {
  const rand = seedRand(s0);
  const cx = W / 2, cy = H / 2;
  const out = [];
  for (const f of features) {
    const d = path(f);
    if (!d) continue;
    const c = path.centroid(f);
    const vx = (c[0] - cx) || (rand() - 0.5);
    const vy = (c[1] - cy) || (rand() - 0.5);
    const len = Math.hypot(vx, vy) || 1;
    const dist = 0.28 * Math.max(W, H) + rand() * 0.34 * Math.max(W, H);
    out.push({
      name: f.properties.name,
      d,
      visited: visitedNames.has(f.properties.name),
      dx: +((vx / len) * dist).toFixed(1),
      dy: +((vy / len) * dist).toFixed(1),
      rot: +((rand() - 0.5) * 55).toFixed(1),
      delay: +rand().toFixed(3),
    });
  }
  return out;
}

/* ── WORLD (110m, equirectangular) ── */
const world = (() => {
  const W = 2000, H = 1000;
  const topo = JSON.parse(readFileSync('node_modules/world-atlas/countries-110m.json', 'utf8'));
  const geo = feature(topo, topo.objects.countries);
  const projection = geoEquirectangular().fitSize([W, H], { type: 'Sphere' });
  const path = geoPath(projection);
  const visited = new Set(['Canada', 'United States of America', 'Dominican Rep.', 'South Korea', 'Spain', 'United Kingdom', 'France', 'Italy']);
  const countries = buildCountries(geo.features, path, W, H, visited, 11);
  const marks = WORLD_MARKS.map((name) => {
    const [x, y] = projection(CAP[name]);
    return { name, x: +x.toFixed(1), y: +y.toFixed(1), label: WORLD_LABELLED.has(name), europe: EUROPE_MARKS.includes(name) };
  });
  // Anchor + radius of the Europe cluster on the world map (for the lens connector).
  const [ax, ay] = projection([5, 47]);
  const europeMarks = marks.filter((m) => m.europe);
  const r = Math.max(...europeMarks.map((m) => Math.hypot(m.x - ax, m.y - ay))) + 26;
  return { W, H, countries, marks, europeAnchor: { x: +ax.toFixed(1), y: +ay.toFixed(1), r: +r.toFixed(1) } };
})();

/* ── EUROPE (50m, Mercator window) — the magnifier lens ── */
const europe = (() => {
  const EUROPE_NAMES = new Set([
    'Portugal', 'Spain', 'France', 'Ireland', 'United Kingdom', 'Belgium', 'Netherlands',
    'Luxembourg', 'Germany', 'Switzerland', 'Italy', 'Austria', 'Czechia', 'Slovenia', 'Croatia', 'Denmark', 'Bosnia and Herz.',
  ]);
  const VISITED = new Set(['Spain', 'United Kingdom', 'France', 'Italy']);
  const PAD = 12, W = 1000;
  const LON = [-10.5, 20], LAT = [36, 56.5];
  // Ring wound so d3-geo reads the small rectangle as interior, not its global complement.
  const WINDOW = { type: 'Polygon', coordinates: [[[LON[0], LAT[0]], [LON[0], LAT[1]], [LON[1], LAT[1]], [LON[1], LAT[0]], [LON[0], LAT[0]]]] };
  if (geoBounds(WINDOW)[0][0] < -170) throw new Error('Europe window winding is inverted');

  const topo = JSON.parse(readFileSync('node_modules/world-atlas/countries-50m.json', 'utf8'));
  const geo = feature(topo, topo.objects.countries);
  const features = geo.features.filter((f) => EUROPE_NAMES.has(f.properties.name));

  const projection = geoMercator().fitWidth(W - 2 * PAD, WINDOW);
  let b = geoPath(projection).bounds(WINDOW);
  const [tx, ty] = projection.translate();
  projection.translate([tx - b[0][0] + PAD, ty - b[0][1] + PAD]);
  const path = geoPath(projection);
  b = path.bounds(WINDOW);
  const H = Math.ceil(b[1][1] + PAD);

  const countries = buildCountries(features, path, W, H, VISITED, 7);
  const marks = EUROPE_MARKS.map((name) => {
    const [x, y] = projection(CAP[name]);
    return { name, x: +x.toFixed(1), y: +y.toFixed(1) };
  });
  return { W, H, countries, marks };
})();

const out =
  `// GENERATED by scripts/gen-travel-map.mjs — do not edit by hand.\n` +
  `// WORLD: equirectangular 110m + 9 visited marks. EUROPE: Mercator window 50m (magnifier lens).\n\n` +
  `export type Country = { name: string; d: string; visited: boolean; dx: number; dy: number; rot: number; delay: number };\n` +
  `export type WorldMark = { name: string; x: number; y: number; label: boolean; europe: boolean };\n` +
  `export type Mark = { name: string; x: number; y: number };\n\n` +
  `export const WORLD = ${JSON.stringify(world)} as { W: number; H: number; countries: Country[]; marks: WorldMark[]; europeAnchor: { x: number; y: number; r: number } };\n\n` +
  `export const EUROPE = ${JSON.stringify(europe)} as { W: number; H: number; countries: Country[]; marks: Mark[] };\n`;

writeFileSync('lib/travel-map-data.ts', out);
console.log(`WORLD: ${world.countries.length} countries, ${world.marks.length} marks, anchor ${JSON.stringify(world.europeAnchor)}`);
console.log(`EUROPE: ${europe.countries.length} countries, ${europe.marks.length} marks, viewBox ${europe.W}x${europe.H}`);
