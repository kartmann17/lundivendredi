/**
 * SOURCE DE VÉRITÉ pour les créneaux disponibles.
 * Édite ce fichier pour mettre à jour les dispos partout sur le site
 * (Hero, sidebar Réservation, boutons radio du form).
 *
 * Workflow : modifier ce fichier → git commit → git push → Cloudflare
 * Pages redéploie automatiquement en ~1 min.
 *
 * `dispo: 0` = créneau complet (affiché en grisé, non sélectionnable).
 */

export type Creneau = {
  /** ID stable utilisé en valeur de form (ne pas changer après création) */
  value: string;
  /** Libellé affiché à l'utilisateur */
  label: string;
  /** Nombre de places encore disponibles (0 = complet) */
  dispo: number;
  /** Mois pour l'aggrégation du hero ("mai", "juin", etc.) */
  mois: string;
};

export const CRENEAUX: Creneau[] = [
  { value: 'sem-19', label: 'Sem. 19 — 11 mai',  dispo: 2, mois: 'mai'  },
  { value: 'sem-21', label: 'Sem. 21 — 25 mai',  dispo: 0, mois: 'mai'  },
  { value: 'sem-23', label: 'Sem. 23 — 8 juin',  dispo: 1, mois: 'juin' },
  { value: 'sem-26', label: 'Sem. 26 — 29 juin', dispo: 3, mois: 'juin' },
];

/** Créneaux ouverts uniquement (utilisé pour les boutons du form) */
export const CRENEAUX_OUVERTS = CRENEAUX.filter((c) => c.dispo > 0);

/** Map ID → label pour la validation et les emails */
export const CRENEAUX_LABELS: Record<string, string> = Object.fromEntries(
  CRENEAUX.map((c) => [c.value, c.label]),
);

/** Total des places dispo (pour le footer "X places restantes") */
export const TOTAL_DISPO = CRENEAUX.reduce((sum, c) => sum + c.dispo, 0);

/**
 * Phrase aggrégée pour le hero : "2 dispo en mai · 4 en juin"
 * Génère à partir de la data, pas besoin de l'éditer manuellement.
 */
export function disposParMois(): string {
  const parMois = new Map<string, number>();
  for (const c of CRENEAUX_OUVERTS) {
    parMois.set(c.mois, (parMois.get(c.mois) ?? 0) + c.dispo);
  }
  const parts = Array.from(parMois.entries()).map(
    ([mois, n]) => `${n} dispo en ${mois}`,
  );
  return parts.join(' · ');
}
