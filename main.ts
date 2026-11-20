// Friday 20 November 2026, one page: masthead date, six figures, three drawn leads,
// ten numbered cards, a lat/lon pin map, an also-list and a Thursday date check.
// Copies entry.png to MAKEFUN_OUTPUT_DIR (or /output) after checking the PNG header.

import { copyFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const src = new URL('./entry.png', import.meta.url);
const buf = readFileSync(src);
if (buf.length >= 1048576) throw new Error('entry.png is 1 MiB or larger');
const png = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
if (!buf.subarray(0, 8).equals(png)) throw new Error('entry.png is not a PNG');
if (buf.toString('ascii', 12, 16) !== 'IHDR') throw new Error('missing IHDR');
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
if (width !== 1024 || height !== 1024) throw new Error(`expected 1024x1024, got ${width}x${height}`);
const bitDepth = buf[24];
const colorType = buf[25];
if (bitDepth !== 8 || (colorType !== 2 && colorType !== 6)) {
  throw new Error(`expected a 24-bit PNG, depth ${bitDepth} type ${colorType}`);
}
copyFileSync(src, join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png'));
