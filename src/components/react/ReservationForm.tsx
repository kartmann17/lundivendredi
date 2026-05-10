import { useEffect, useRef, useState, useId, type FormEvent } from 'react';
import { actions, isInputError } from 'astro:actions';
import { navigate } from 'astro:transitions/client';
import { CRENEAUX_OUVERTS } from '../../data/creneaux';

const FIELD_LABELS: Record<string, string> = {
  prenom: 'Prénom',
  nom: 'Nom',
  email: 'Email',
  telephone: 'Téléphone',
  activite: 'Activité',
  semaine: 'Semaine souhaitée',
  message: 'Message',
  consentement: 'Consentement RGPD',
};

const SEMAINES = [
  ...CRENEAUX_OUVERTS.map((c) => ({ value: c.value, label: c.label, dispo: c.dispo })),
  { value: 'autre', label: "Une autre — qu'on en parle", dispo: -1 },
];

type FieldErrors = Partial<Record<
  | 'prenom'
  | 'nom'
  | 'email'
  | 'telephone'
  | 'activite'
  | 'semaine'
  | 'message'
  | 'consentement',
  string[]
>>;

export default function ReservationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [semaine, setSemaine] = useState<string>('');
  const summaryRef = useRef<HTMLDivElement | null>(null);

  const hasErrors = Object.keys(errors).length > 0 || !!serverError;

  useEffect(() => {
    if (hasErrors && summaryRef.current) {
      summaryRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [hasErrors]);

  const prenomId = useId();
  const nomId = useId();
  const emailId = useId();
  const telId = useId();
  const activId = useId();
  const messageId = useId();
  const consentId = useId();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    setServerError(null);

    const fd = new FormData(e.currentTarget);
    fd.set('semaine', semaine);

    const { error } = await actions.reservation(fd);

    if (error) {
      if (isInputError(error)) {
        setErrors(error.fields as FieldErrors);
      } else {
        setServerError(
          "Une erreur est survenue. Réessayez ou écris-moi à kreyatik@gmail.com.",
        );
      }
      setSubmitting(false);
      return;
    }

    await navigate('/merci');
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8 mt-4">
      {/* Error summary — visible quand validation foire */}
      <div ref={summaryRef} aria-live="polite">
        {hasErrors && (
          <div role="alert" className="border-2 border-punch bg-punch/10 p-5 rounded-sm">
            <p className="display text-lg leading-snug mb-3">
              <span className="text-punch font-medium">↳</span> Quelques champs à corriger&nbsp;:
            </p>
            <ul className="space-y-1.5 mono text-[12px] text-ink/85 uppercase tracking-[0.08em]">
              {serverError && <li>· {serverError}</li>}
              {Object.entries(errors).map(([field, msgs]) => (
                <li key={field}>
                  · <strong className="text-ink">{FIELD_LABELS[field] ?? field}</strong> — {msgs?.[0]}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label
            htmlFor={prenomId}
            className="mono text-[11px] uppercase tracking-[0.22em] text-ink/55 block mb-1"
          >
            Prénom
          </label>
          <input
            id={prenomId}
            name="prenom"
            className="field"
            type="text"
            placeholder="Marie"
            required
            autoComplete="given-name"
            aria-invalid={!!errors.prenom}
          />
          {errors.prenom && <p className="mt-2 text-punch text-sm">{errors.prenom[0]}</p>}
        </div>
        <div>
          <label
            htmlFor={nomId}
            className="mono text-[11px] uppercase tracking-[0.22em] text-ink/55 block mb-1"
          >
            Nom
          </label>
          <input
            id={nomId}
            name="nom"
            className="field"
            type="text"
            placeholder="Dubois"
            required
            autoComplete="family-name"
            aria-invalid={!!errors.nom}
          />
          {errors.nom && <p className="mt-2 text-punch text-sm">{errors.nom[0]}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label
            htmlFor={emailId}
            className="mono text-[11px] uppercase tracking-[0.22em] text-ink/55 block mb-1"
          >
            Email
          </label>
          <input
            id={emailId}
            name="email"
            className="field"
            type="email"
            placeholder="marie@boulangerie-dubois.fr"
            required
            autoComplete="email"
            inputMode="email"
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="mt-2 text-punch text-sm">{errors.email[0]}</p>}
        </div>
        <div>
          <label
            htmlFor={telId}
            className="mono text-[11px] uppercase tracking-[0.22em] text-ink/55 block mb-1"
          >
            Téléphone
          </label>
          <input
            id={telId}
            name="telephone"
            className="field"
            type="tel"
            placeholder="06 12 34 56 78"
            required
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={!!errors.telephone}
          />
          {errors.telephone && <p className="mt-2 text-punch text-sm">{errors.telephone[0]}</p>}
        </div>
      </div>

      <div>
        <label
          htmlFor={activId}
          className="mono text-[11px] uppercase tracking-[0.22em] text-ink/55 block mb-1"
        >
          Activité / métier
        </label>
        <input
          id={activId}
          name="activite"
          className="field"
          type="text"
          placeholder="Boulangerie artisanale, 2 personnes, Saintes"
          required
          aria-invalid={!!errors.activite}
        />
        {errors.activite && <p className="mt-2 text-punch text-sm">{errors.activite[0]}</p>}
      </div>

      <fieldset>
        <legend className="mono text-[11px] uppercase tracking-[0.22em] text-ink/55 block mb-1">
          Semaine souhaitée
        </legend>
        <div className="flex flex-wrap gap-2 mt-2" role="radiogroup" aria-label="Semaine souhaitée">
          {SEMAINES.map((s) => {
            const selected = semaine === s.value;
            return (
              <button
                key={s.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setSemaine(s.value)}
                className={
                  'mono text-[12px] uppercase tracking-[0.16em] border px-4 py-2 transition-colors ' +
                  (selected
                    ? 'border-punch bg-punch text-cream'
                    : 'border-ink/30 hover:bg-ink hover:text-cream')
                }
              >
                {s.label}
              </button>
            );
          })}
        </div>
        {errors.semaine && <p className="mt-2 text-punch text-sm">{errors.semaine[0]}</p>}
      </fieldset>

      <div>
        <label
          htmlFor={messageId}
          className="mono text-[11px] uppercase tracking-[0.22em] text-ink/55 block mb-1"
        >
          3 lignes sur ton projet (libre)
        </label>
        <textarea
          id={messageId}
          name="message"
          className="field"
          rows={3}
          placeholder="Je veux remplacer mon site WordPress qui rame…"
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="mt-2 text-punch text-sm">{errors.message[0]}</p>}
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="company">Société</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex items-center gap-3">
        <input
          id={consentId}
          name="consentement"
          type="checkbox"
          required
          className="accent-punch"
          aria-invalid={!!errors.consentement}
        />
        <label htmlFor={consentId} className="text-sm text-ink/65 leading-relaxed">
          J'accepte d'être recontacté au sujet de ma demande. Aucun envoi commercial.
        </label>
      </div>
      {errors.consentement && <p className="-mt-4 text-punch text-sm">{errors.consentement[0]}</p>}

      <div className="flex flex-col md:flex-row md:items-center gap-6 pt-6">
        <button
          type="submit"
          disabled={submitting}
          className="cta inline-flex items-center gap-3 px-7 py-5 text-lg disabled:opacity-60 disabled:cursor-progress"
        >
          {submitting ? 'Envoi…' : 'Réserver mon créneau'}
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M1 7 H 19" />
            <path d="M14 1 L 21 7 L 14 13" />
          </svg>
          <span className="stamp-on-hover">
            <span className="stamp text-xs">5 jours · garanti</span>
          </span>
        </button>
        <p className="mono text-[11px] uppercase tracking-[0.18em] text-ink/45 max-w-[36ch] leading-relaxed">
          Aucun engagement à ce stade. Tu reçois un mail dans les 4 h, on cale une visio, et seulement après tu décides.
        </p>
      </div>
    </form>
  );
}
