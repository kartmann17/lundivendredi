/**
 * Génère public/og-image.png (1200x630) à partir du SVG inline ci-dessous.
 *
 * Usage : `node scripts/generate-og.mjs`
 *
 * À relancer manuellement quand on change le visuel ou le copy.
 * Le PNG résultant est commité dans le repo (pas régénéré au build CF).
 */

import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Palette synchronisée avec global.css
const INK = '#0F0E0C';
const CREAM = '#F5F1EA';
const PUNCH = '#D4541C';
const RULE = '#2A2622';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <!-- Fond -->
  <rect width="1200" height="630" fill="${INK}" />

  <!-- Marge rouge cahier (verticale gauche) -->
  <line x1="120" y1="0" x2="120" y2="630" stroke="#C5413B" stroke-width="1" stroke-opacity="0.85"/>

  <!-- Lignes de cahier subtiles -->
  ${Array.from({ length: 12 }, (_, i) => {
    const y = 90 + i * 38;
    return `<line x1="120" y1="${y}" x2="1200" y2="${y}" stroke="${CREAM}" stroke-opacity="0.05" stroke-width="1"/>`;
  }).join('\n  ')}

  <!-- Filigrane "5" en haut à droite -->
  <text
    x="1100" y="490"
    text-anchor="end"
    font-family="serif"
    font-style="italic"
    font-size="540"
    font-weight="600"
    fill="none"
    stroke="${CREAM}"
    stroke-opacity="0.10"
    stroke-width="2"
  >5</text>

  <!-- Wordmark en haut à gauche -->
  <text
    x="90" y="84"
    font-family="serif"
    font-size="40"
    font-weight="500"
    fill="${CREAM}"
    letter-spacing="-1"
  >lundi<tspan font-style="italic" fill="${PUNCH}">vendredi</tspan></text>

  <!-- № 01 — petite ligne mono -->
  <text
    x="90" y="120"
    font-family="ui-monospace, 'SF Mono', monospace"
    font-size="14"
    fill="${CREAM}"
    fill-opacity="0.55"
    letter-spacing="3"
  >№ 01 — L'OFFRE</text>

  <!-- Titre principal -->
  <text
    x="160" y="240"
    font-family="serif"
    font-size="84"
    font-weight="500"
    fill="${CREAM}"
    letter-spacing="-2"
  >Site web pro</text>
  <text
    x="160" y="320"
    font-family="serif"
    font-style="italic"
    font-size="84"
    font-weight="400"
    fill="${CREAM}"
    fill-opacity="0.85"
    letter-spacing="-2"
  >livré en 5 jours.</text>

  <!-- Prix punch -->
  <text
    x="160" y="500"
    font-family="serif"
    font-size="200"
    font-weight="700"
    fill="${PUNCH}"
    letter-spacing="-8"
  >550<tspan font-style="italic" font-size="100" dy="-50">€</tspan></text>

  <!-- Underline orange du prix -->
  <line x1="160" y1="520" x2="640" y2="520" stroke="${PUNCH}" stroke-width="3"/>

  <!-- Ligne du bas : signature + ville -->
  <line x1="120" y1="570" x2="1110" y2="570" stroke="${CREAM}" stroke-opacity="0.15" stroke-width="1"/>
  <text
    x="160" y="600"
    font-family="ui-monospace, 'SF Mono', monospace"
    font-size="16"
    fill="${CREAM}"
    fill-opacity="0.7"
    letter-spacing="2"
  >LUNDIVENDREDI.FR · ROCHEFORT (17) · LIVRAISON FRANCE</text>

  <!-- Tampon « 5 JOURS » en bas-droite -->
  <g transform="translate(950, 470) rotate(-8)">
    <rect x="0" y="0" width="180" height="64" fill="none" stroke="${PUNCH}" stroke-width="3"/>
    <rect x="4" y="4" width="172" height="56" fill="none" stroke="${PUNCH}" stroke-width="1"/>
    <text
      x="90" y="40"
      text-anchor="middle"
      font-family="ui-monospace, 'SF Mono', monospace"
      font-size="20"
      fill="${PUNCH}"
      letter-spacing="3"
      font-weight="500"
    >★ 5 JOURS ★</text>
  </g>
</svg>`;

const resvg = new Resvg(svg, {
  background: INK,
  fitTo: { mode: 'width', value: 1200 },
  font: {
    loadSystemFonts: true,
    defaultFontFamily: 'serif',
  },
});

const png = resvg.render().asPng();
const out = path.join(ROOT, 'public', 'og-image.png');
fs.writeFileSync(out, png);

const sizeKB = (png.length / 1024).toFixed(1);
console.log(`✓ Generated ${out} (${sizeKB} KB · 1200×630)`);
