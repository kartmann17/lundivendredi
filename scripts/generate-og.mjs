/**
 * Génère public/og-image.png (1200x630).
 *
 * Usage : `npm run og`
 *
 * Design : magazine éditorial cahier d'écolier — promesse en 3 temps,
 * 550€ qui pop, tampon « 5 JOURS · GARANTI », sceau remboursé,
 * USPs sous le prix pour qualifier l'offre dès la preview.
 */

import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Palette synchronisée avec global.css
const PAPER = '#F7F3EA';
const PAPER_DARK = '#EFE9DC';
const INK = '#1A1714';
const PUNCH = '#D4541C';
const PUNCH_DARK = '#A53E10';
const MARGIN_RED = '#C5413B';

const W = 1200;
const H = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <!-- Fond papier crème -->
  <rect width="${W}" height="${H}" fill="${PAPER}" />

  <!-- Marge rouge cahier (verticale gauche) -->
  <line x1="100" y1="0" x2="100" y2="${H}" stroke="${MARGIN_RED}" stroke-width="1" stroke-opacity="0.85"/>

  <!-- Lignes de cahier subtiles (en arrière-plan) -->
  ${Array.from({ length: 14 }, (_, i) => {
    const y = 70 + i * 38;
    return `<line x1="100" y1="${y}" x2="${W}" y2="${y}" stroke="${INK}" stroke-opacity="0.05" stroke-width="1"/>`;
  }).join('\n  ')}

  <!-- Filigrane « 5 » géant à droite -->
  <text
    x="${W - 110}" y="${H - 110}"
    text-anchor="end"
    font-family="serif"
    font-style="italic"
    font-size="640"
    font-weight="600"
    fill="none"
    stroke="${PUNCH}"
    stroke-opacity="0.18"
    stroke-width="2"
  >5</text>

  <!-- Header strip ───────────────────────────────────────────── -->

  <!-- Wordmark top-left -->
  <text
    x="74" y="64"
    font-family="serif"
    font-size="32"
    font-weight="500"
    fill="${INK}"
    letter-spacing="-1"
  >lundi<tspan font-style="italic" fill="${PUNCH}">vendredi</tspan></text>

  <!-- Pill « SPRINT DISPO » en haut à droite -->
  <g transform="translate(${W - 320}, 38)">
    <rect x="0" y="0" width="270" height="32" rx="16" fill="none" stroke="${PUNCH}" stroke-width="1.5" stroke-opacity="0.5"/>
    <circle cx="20" cy="16" r="4" fill="${PUNCH}"/>
    <text
      x="36" y="22"
      font-family="ui-monospace, 'SF Mono', monospace"
      font-size="13"
      fill="${PUNCH_DARK}"
      letter-spacing="2"
      font-weight="500"
    >SPRINT DISPO · LUN. PROCHAIN</text>
  </g>

  <!-- № — petite ligne mono -->
  <text
    x="74" y="92"
    font-family="ui-monospace, 'SF Mono', monospace"
    font-size="12"
    fill="${INK}"
    fill-opacity="0.55"
    letter-spacing="3"
  >№ 01 — L'OFFRE</text>

  <!-- Headline ───────────────────────────────────────────────── -->

  <text
    x="140" y="220"
    font-family="serif"
    font-size="78"
    font-weight="500"
    fill="${INK}"
    letter-spacing="-2"
  >Commandez lundi.</text>
  <text
    x="140" y="298"
    font-family="serif"
    font-style="italic"
    font-size="78"
    font-weight="400"
    fill="${INK}"
    fill-opacity="0.9"
    letter-spacing="-2"
  >Livré <tspan fill="${PUNCH}">vendredi 17h</tspan>.</text>

  <!-- Mini sub-line -->
  <text
    x="140" y="336"
    font-family="ui-monospace, 'SF Mono', monospace"
    font-size="13"
    fill="${INK}"
    fill-opacity="0.55"
    letter-spacing="3"
  >SITE WEB PRO · LANDING PAGE + PAGE CONTACT · 5 JOURS OUVRÉS</text>

  <!-- Pricing block ──────────────────────────────────────────── -->

  <text
    x="140" y="500"
    font-family="serif"
    font-size="170"
    font-weight="700"
    fill="${PUNCH}"
    letter-spacing="-6"
  >550<tspan font-style="italic" font-size="86" dy="-42">€</tspan></text>

  <!-- Underline orange du prix -->
  <line x1="140" y1="520" x2="540" y2="520" stroke="${PUNCH}" stroke-width="3"/>

  <!-- USPs sous le prix -->
  <text
    x="140" y="554"
    font-family="ui-monospace, 'SF Mono', monospace"
    font-size="14"
    fill="${INK}"
    fill-opacity="0.75"
    letter-spacing="2.5"
    font-weight="500"
  >TOUT COMPRIS · CODE SOURCE À TOI · 1 MOIS DE RETOUCHES</text>

  <!-- Tampon « ★ 5 JOURS · GARANTI ★ » en haut-droite (avant filigrane) -->
  <g transform="translate(870, 215) rotate(-8)">
    <rect x="0" y="0" width="252" height="80" fill="${PAPER}" stroke="${PUNCH}" stroke-width="3.5"/>
    <rect x="5" y="5" width="242" height="70" fill="none" stroke="${PUNCH}" stroke-width="1.2"/>
    <text
      x="126" y="36"
      text-anchor="middle"
      font-family="ui-monospace, 'SF Mono', monospace"
      font-size="20"
      fill="${PUNCH}"
      letter-spacing="3.5"
      font-weight="600"
    >★ 5 JOURS ★</text>
    <text
      x="126" y="60"
      text-anchor="middle"
      font-family="ui-monospace, 'SF Mono', monospace"
      font-size="13"
      fill="${PUNCH}"
      letter-spacing="2.5"
      font-weight="500"
    >GARANTI · REMBOURSÉ</text>
  </g>

  <!-- Bottom strip ───────────────────────────────────────────── -->
  <line x1="74" y1="588" x2="${W - 74}" y2="588" stroke="${INK}" stroke-opacity="0.18" stroke-width="1"/>
  <text
    x="74" y="612"
    font-family="ui-monospace, 'SF Mono', monospace"
    font-size="14"
    fill="${INK}"
    fill-opacity="0.65"
    letter-spacing="2.5"
    font-weight="500"
  >LUNDIVENDREDI.FR</text>
  <text
    x="${W - 74}" y="612"
    text-anchor="end"
    font-family="ui-monospace, 'SF Mono', monospace"
    font-size="14"
    fill="${INK}"
    fill-opacity="0.65"
    letter-spacing="2.5"
    font-weight="500"
  >ROCHEFORT (17) · LIVRAISON FRANCE ENTIÈRE</text>
</svg>`;

const resvg = new Resvg(svg, {
  background: PAPER,
  fitTo: { mode: 'width', value: W },
  font: {
    loadSystemFonts: true,
    defaultFontFamily: 'serif',
  },
});

const png = resvg.render().asPng();
const out = path.join(ROOT, 'public', 'og-image.png');
fs.writeFileSync(out, png);

const sizeKB = (png.length / 1024).toFixed(1);
console.log(`✓ Generated ${out} (${sizeKB} KB · ${W}×${H})`);
