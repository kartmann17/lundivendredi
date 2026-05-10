/**
 * SOURCE DE VÉRITÉ pour les créneaux disponibles.
 *
 * Workflow : modifier ce fichier → git commit → git push → Cloudflare
 * Pages redéploie automatiquement en ~2 min.
 *
 * Les semaines sont générées automatiquement entre START_DATE et END_DATE.
 * Pour fermer une semaine spécifique (complet), ajoute-la dans OVERRIDES.
 */

// ─────────────────────────────────────────────────────────────────
// 🔧 CONFIG — c'est ICI qu'on touche pour faire évoluer les dispos
// ─────────────────────────────────────────────────────────────────

/** Premier lundi proposé (au format YYYY-MM-DD) */
const START_DATE = '2026-05-11';

/** Dernier lundi proposé (jusqu'à fin 2027) */
const END_DATE = '2027-12-27';

/** Nombre de places par défaut sur chaque semaine */
const DEFAULT_DISPO = 4;

/**
 * Combien de prochaines semaines on affiche dans le site
 * (sidebar Réservation + boutons du form). Au-delà, c'est dans la
 * base mais pas montré tout de suite — évite le mur de 80 boutons.
 */
const DISPLAY_LIMIT = 6;

/**
 * Dispos manuelles différentes du défaut.
 * Clé = `sem-{numéro}-{année}` (ex. 'sem-21-2026').
 * Mets `0` pour marquer une semaine complet.
 */
const OVERRIDES: Record<string, number> = {
  // 'sem-21-2026': 0,  // ← exemple : sem 21 fermée
  // 'sem-32-2026': 2,  // ← exemple : sem 32 a déjà 2 ventes
};

// ─────────────────────────────────────────────────────────────────
// 🛠 INTERNAL — pas besoin de toucher en dessous
// ─────────────────────────────────────────────────────────────────

export type Creneau = {
  /** ID stable utilisé en valeur de form */
  value: string;
  /** Libellé affiché à l'utilisateur */
  label: string;
  /** Nombre de places encore disponibles (0 = complet) */
  dispo: number;
  /** Mois pour l'aggrégation du hero ("mai", "juin", etc.) */
  mois: string;
};

const MOIS_FR = [
  'janv.', 'févr.', 'mars', 'avril', 'mai', 'juin',
  'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.',
] as const;

const MOIS_FR_LONG = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
] as const;

/** ISO 8601 week number (avec année ISO si bordure d'année) */
function isoWeek(date: Date): { week: number; year: number } {
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  target.setDate(target.getDate() + 3 - ((target.getDay() + 6) % 7));
  const week1 = new Date(target.getFullYear(), 0, 4);
  const week =
    1 +
    Math.round(
      ((target.getTime() - week1.getTime()) / 86_400_000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7,
    );
  return { week, year: target.getFullYear() };
}

function* mondaysBetween(startISO: string, endISO: string): Generator<Date> {
  const start = new Date(startISO + 'T00:00:00Z');
  const end = new Date(endISO + 'T00:00:00Z');
  const d = new Date(start);
  while (d <= end) {
    yield new Date(d);
    d.setUTCDate(d.getUTCDate() + 7);
  }
}

function buildCreneau(monday: Date): Creneau {
  const { week, year } = isoWeek(monday);
  const value = `sem-${week}-${year}`;
  const day = monday.getUTCDate();
  const monthIdx = monday.getUTCMonth();
  const label = `Sem. ${week} — ${day} ${MOIS_FR[monthIdx]}`;
  const mois = MOIS_FR_LONG[monthIdx];
  const dispo = OVERRIDES[value] ?? DEFAULT_DISPO;
  return { value, label, dispo, mois };
}

/** Toutes les semaines entre START et END (utilisé pour validation côté serveur) */
export const CRENEAUX: Creneau[] = Array.from(mondaysBetween(START_DATE, END_DATE)).map(
  buildCreneau,
);

/** Sous-ensemble affiché dans l'UI (sidebar + form) */
export const CRENEAUX_DISPLAY: Creneau[] = CRENEAUX.slice(0, DISPLAY_LIMIT);

/** Créneaux ouverts uniquement parmi les affichés — pour les boutons radio du form */
export const CRENEAUX_OUVERTS: Creneau[] = CRENEAUX_DISPLAY.filter((c) => c.dispo > 0);

/** Map ID → label pour la validation et les emails (toutes les semaines) */
export const CRENEAUX_LABELS: Record<string, string> = Object.fromEntries(
  CRENEAUX.map((c) => [c.value, c.label]),
);

/** Total des places dispo dans le sous-ensemble affiché (pour le footer) */
export const TOTAL_DISPO: number = CRENEAUX_DISPLAY.reduce((sum, c) => sum + c.dispo, 0);

/** Phrase aggrégée pour le hero — basée sur les semaines affichées */
export function disposParMois(): string {
  const parMois = new Map<string, number>();
  for (const c of CRENEAUX_DISPLAY) {
    if (c.dispo === 0) continue;
    parMois.set(c.mois, (parMois.get(c.mois) ?? 0) + c.dispo);
  }
  if (parMois.size === 0) return 'créneaux complets ces prochaines semaines';
  const parts = Array.from(parMois.entries()).map(
    ([mois, n]) => `${n} dispo en ${mois}`,
  );
  return parts.join(' · ');
}
