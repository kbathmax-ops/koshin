// Build-time generator: bakes BOTH datasets into lib/travel-map-data.ts —
//   WORLD  : full equirectangular world (110m), 9 visited marks — the main animation
//   EUROPE : zoomed Mercator window (50m) for the magnifier lens
// so the client ships static SVG (no d3 in the bundle, no runtime map fetch).
//
//   node scripts/gen-travel-map.mjs
//
// Adapted from the "X Marks The Spot" Claude Design project.

import { readFileSync, writeFileSync } from 'node:fs';
import { geoMercator, geoPath, geoBounds } from 'd3-geo';
import { geoInterruptedHomolosine } from 'd3-geo-projection';
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
  Peru: [-77.03, -12.05],
};
// Order the marks appear (roughly west → east), and which are in the Europe cluster.
const WORLD_MARKS = ['Canada', 'United States', 'Dominican Republic', 'Peru', 'South Korea', 'Spain', 'England', 'France', 'Monaco', 'Italy'];
const EUROPE_MARKS = ['Spain', 'England', 'France', 'Monaco', 'Italy'];
// Standalone marks get a label on the world map; the European cluster is left to the lens.
const WORLD_LABELLED = new Set(['Canada', 'United States', 'Dominican Republic', 'South Korea', 'Peru']);
// Not visited yet — rendered as a slow-flashing X ("next stop") rather than a solid one.
const PENDING = new Set(['Peru']);

/*
 * Goode's lobes, matching d3-geo-projection's own table for
 * geoInterruptedHomolosine: [lon0, lon1] spans per hemisphere.
 *
 * d3's geoPath emits the interrupted sphere as ONE continuous ring that walks
 * every lobe, so filling it bridges the interruptions into a solid blob. Each
 * lobe outline is therefore walked by hand in projected space: along the
 * equator, up the eastern meridian to the pole, back down the western one.
 * The pole is a single point in Mollweide, so the ring closes there with no
 * top edge. EPS keeps the walk just inside the seam, since a point sitting
 * exactly on an interruption can resolve into either neighbouring lobe.
 */
const LOBES = [
  { lon: [-180, -40], pole: 90 },
  { lon: [-40, 180], pole: 90 },
  { lon: [-180, -100], pole: -90 },
  { lon: [-100, -20], pole: -90 },
  { lon: [-20, 80], pole: -90 },
  { lon: [80, 180], pole: -90 },
];
const EPS = 0.35;

function lobeOutline(projection, [lon0, lon1], poleLat) {
  const a = lon0 + EPS, b = lon1 - EPS, N = 180;
  const pts = [];
  for (let i = 0; i <= N; i++) pts.push([a + ((b - a) * i) / N, 0]);
  for (let i = 1; i <= N; i++) pts.push([b, (poleLat * i) / N]);
  for (let i = N - 1; i >= 1; i--) pts.push([a, (poleLat * i) / N]);
  const xy = pts.map((p) => projection(p)).filter(Boolean);
  return `M${xy.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join('L')}Z`;
}

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

/* ── WORLD (110m, Goode interrupted homolosine) ──
   The interrupted projection slices the oceans into lobes, so the frame is
   sized from the projected sphere rather than assumed 2:1. Antarctica is
   dropped: Goode shreds it across every lobe and it carries no marks. */
const world = (() => {
  const W = 2000;
  const topo = JSON.parse(readFileSync('node_modules/world-atlas/countries-110m.json', 'utf8'));
  const geo = feature(topo, topo.objects.countries);
  const features = geo.features.filter((f) => f.properties.name !== 'Antarctica');

  const projection = geoInterruptedHomolosine().fitWidth(W, { type: 'Sphere' });
  // Seat the sphere against the top-left of the viewBox and size H to match.
  let b = geoPath(projection).bounds({ type: 'Sphere' });
  const [tx, ty] = projection.translate();
  projection.translate([tx - b[0][0], ty - b[0][1]]);
  const path = geoPath(projection);
  b = path.bounds({ type: 'Sphere' });
  const H = Math.ceil(b[1][1]);
  const lobes = LOBES.map((l) => lobeOutline(projection, l.lon, l.pole));

  const visited = new Set(['Canada', 'United States of America', 'Dominican Rep.', 'South Korea', 'Spain', 'United Kingdom', 'France', 'Italy']);
  const countries = buildCountries(features, path, W, H, visited, 11);
  const marks = WORLD_MARKS.map((name) => {
    const [x, y] = projection(CAP[name]);
    return {
      name, x: +x.toFixed(1), y: +y.toFixed(1),
      label: WORLD_LABELLED.has(name),
      europe: EUROPE_MARKS.includes(name),
      pending: PENDING.has(name),
    };
  });
  // Anchor + radius of the Europe cluster on the world map (for the lens connector).
  const [ax, ay] = projection([5, 47]);
  const europeMarks = marks.filter((m) => m.europe);
  const r = Math.max(...europeMarks.map((m) => Math.hypot(m.x - ax, m.y - ay))) + 26;
  // Where the magnifier lens parks: open water in the Indian Ocean lobe.
  const [lx, ly] = projection([82, -34]);
  return {
    W, H, lobes, countries, marks,
    europeAnchor: { x: +ax.toFixed(1), y: +ay.toFixed(1), r: +r.toFixed(1) },
    lensAnchor: { x: +lx.toFixed(1), y: +ly.toFixed(1) },
  };
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
  `// WORLD: Goode interrupted homolosine 110m + marks. EUROPE: Mercator window 50m (magnifier lens).\n\n` +
  `export type Country = { name: string; d: string; visited: boolean; dx: number; dy: number; rot: number; delay: number };\n` +
  `export type WorldMark = { name: string; x: number; y: number; label: boolean; europe: boolean; pending: boolean };\n` +
  `export type Mark = { name: string; x: number; y: number };\n\n` +
  `export const WORLD = ${JSON.stringify(world)} as { W: number; H: number; lobes: string[]; countries: Country[]; marks: WorldMark[]; europeAnchor: { x: number; y: number; r: number }; lensAnchor: { x: number; y: number } };\n\n` +
  `export const EUROPE = ${JSON.stringify(europe)} as { W: number; H: number; countries: Country[]; marks: Mark[] };\n`;

writeFileSync('lib/travel-map-data.ts', out);
console.log(`WORLD: ${world.countries.length} countries, ${world.marks.length} marks, anchor ${JSON.stringify(world.europeAnchor)}`);
console.log(`EUROPE: ${europe.countries.length} countries, ${europe.marks.length} marks, viewBox ${europe.W}x${europe.H}`);
