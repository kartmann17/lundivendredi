# lundivendredi

Landing page de **Kreyatik Studio** — offre signature « site web pro livré
en 5 jours, 550€ TTC, paiement unique ».

> Tagline : sites web livrés en 5 jours · 550€

## Stack

- **Astro 6** (output `static`, adapter Cloudflare pour les Astro Actions)
- **TypeScript strict**
- **Tailwind CSS 4** (intégration Vite officielle)
- **React 19** islands hydratées en `client:visible` uniquement (formulaire)
- **Astro Actions** + **Zod** + **Resend** pour le formulaire de réservation
- **@astrojs/sitemap** pour la génération automatique
- **@fontsource-variable** (Fraunces + Inter) — fonts auto-hébergées
- **Cloudflare Pages** pour l'hébergement

## Pré-requis

- Node ≥ 22.12
- npm (pnpm équivalent — convertissez si pnpm est dispo localement)

## Démarrage

```bash
npm install
cp .env.example .env       # remplir RESEND_API_KEY pour tester le form
npm run dev                # http://localhost:4321
npm run build              # build production → dist/
npm run preview            # preview local du build
```

## Variables d'environnement

| Clé | Usage |
|-----|-------|
| `RESEND_API_KEY` | Clé API Resend pour l'envoi des emails de réservation |
| `CONTACT_EMAIL` | Email recevant les demandes (défaut : `kreyatik@gmail.com`) |
| `PUBLIC_SITE_URL` | URL canonique (défaut : `https://lundivendredi.fr`) |

## Architecture

```
src/
├── components/
│   ├── astro/          # composants serveur (.astro)
│   │   ├── Hero.astro / PourQui.astro / CeQuiEstInclus.astro
│   │   ├── ProcessusTimeline.astro / Pourquoi5Jours.astro
│   │   ├── Temoignages.astro / FAQ.astro / Reservation.astro / Footer.astro
│   │   └── seo/        # BaseHead, JsonLd, SchemaFAQ
│   └── react/          # islands React (formulaire uniquement)
├── layouts/BaseLayout.astro
├── pages/              # index, merci, mentions-legales, confidentialite
├── actions/index.ts    # Astro Action `reservation`
├── lib/                # seo.ts (constantes) + schema.ts (JSON-LD)
├── data/faq.ts         # 10 Q/R FAQ
├── styles/global.css   # tokens design + reset
└── env.d.ts
```

## SEO — checklist

- [x] `<html lang="fr">`, métadonnées complètes (title 60ch, description 150ch)
- [x] OpenGraph + Twitter Card (image 1200×630)
- [x] Canonical absolue par page
- [x] `robots: index, follow, max-image-preview:large` (sauf `/merci` en `noindex`)
- [x] JSON-LD : LocalBusiness, Service, Offer, FAQPage, BreadcrumbList,
      AggregateRating, Person, WebSite (avec SearchAction)
- [x] Sitemap auto via `@astrojs/sitemap` (exclut `/merci`)
- [x] `robots.txt` qui pointe vers `/sitemap-index.xml`
- [x] Headers de sécurité + cache long pour les assets `_astro/*`
- [x] Hiérarchie H1 unique par page, H2/H3 stricte

## Visuel

⚠️ **Le visuel final est en cours de production par Claude Design.**
Le design actuel est une base fonctionnelle propre (palette/typo/tokens en
place dans [src/styles/global.css](src/styles/global.css)). Les composants
sont structurés pour faciliter un remplacement section par section sans
toucher aux schémas SEO ni à la structure sémantique.

Tokens design (modifiables dans `@theme` de `global.css`) :

| Token | Valeur | Usage |
|-------|--------|-------|
| `--color-ink` | `#0A0A0A` | Texte principal, fond sombre |
| `--color-paper` | `#F5F1EA` | Fond clair |
| `--color-punch` | `#E63946` | Prix, CTA, accents |
| `--font-serif` | Fraunces | Titres |
| `--font-sans` | Inter | Texte courant |

## Déploiement Cloudflare Pages

1. Pousser le repo sur GitHub.
2. Cloudflare Pages → **Create project** → connecter le repo.
3. Build settings :
   - Framework preset : **Astro**
   - Build command : `npm run build`
   - Build output : `dist`
   - Node version : `22`
4. Environment variables (Production + Preview) :
   - `RESEND_API_KEY`, `CONTACT_EMAIL`, `PUBLIC_SITE_URL`
5. Custom domain : `lundivendredi.fr`.
6. Activer **Cloudflare Web Analytics** (gratuit, sans cookie).

### Domaine secondaire

Configurer une redirection 301 de `site-en-5-jours.fr` → `lundivendredi.fr`
chez le registrar ou via une Cloudflare Page Rule (pas dans le code).

## Checklist post-déploiement

- [ ] Tester le formulaire réel (production) → vérifier réception email
- [ ] Soumettre `https://lundivendredi.fr/sitemap-index.xml` à Google Search Console
- [ ] Vérifier rich snippets via [Rich Results Test](https://search.google.com/test/rich-results) (FAQPage, LocalBusiness, Offer)
- [ ] PageSpeed Insights mobile + desktop ≥ 95 sur les 4 axes
- [ ] Créer manuellement `/og-image.png` (1200×630) et le placer dans `/public`
- [ ] Compléter SIRET dans [src/pages/mentions-legales.astro](src/pages/mentions-legales.astro)
- [ ] Configurer le DNS Resend (SPF, DKIM) pour `lundivendredi.fr`

## Anti-spam formulaire

- Honeypot (champ `company` invisible)
- Validation Zod stricte côté serveur
- Consentement RGPD obligatoire
- Resend `replyTo` → email du prospect, `from` → `reservation@lundivendredi.fr`

## Licence

© Kreyatik Studio — Tous droits réservés.
