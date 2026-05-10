/**
 * Génère favicon-32.png + apple-touch-icon.png à partir d'un SVG identique
 * au favicon.svg (mais en plus haute déf pour le rendu PNG).
 *
 * Usage : `node scripts/generate-favicons.mjs` (ou `npm run favicons`)
 */

import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const PUNCH = '#D4541C';
const CREAM = '#F7F3EA';

// Pour le rendu PNG, on travaille dans un viewBox plus grand pour avoir un
// rendu net après rasterisation.
const svg = (size = 512) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${size * 0.125}" fill="${PUNCH}"/>
  <text
    x="${size / 2}" y="${size * 0.78}"
    text-anchor="middle"
    font-family="serif"
    font-size="${size * 0.82}"
    font-weight="700"
    font-style="italic"
    fill="${CREAM}"
  >5</text>
</svg>`;

function render(svgString, outName, width) {
  const resvg = new Resvg(svgString, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: true, defaultFontFamily: 'serif' },
  });
  const png = resvg.render().asPng();
  const out = path.join(ROOT, 'public', outName);
  fs.writeFileSync(out, png);
  console.log(`✓ ${outName} (${(png.length / 1024).toFixed(1)} KB · ${width}×${width})`);
}

render(svg(), 'favicon-32.png', 32);
render(svg(), 'favicon-192.png', 192);
render(svg(), 'apple-touch-icon.png', 180);
