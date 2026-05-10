export const SITE = {
  name: 'lundivendredi',
  legalName: 'Kreyatik Studio',
  tagline: 'sites web livrés en 5 jours · 550€',
  url: 'https://lundivendredi.fr',
  defaultLocale: 'fr-FR',
  defaultLanguage: 'fr',
  ogImage: '/og-image.png',
  themeColor: '#0F0E0C',
  twitter: '@kreyatik',
  contact: {
    email: 'kreyatik@gmail.com',
    emailDisplay: 'bonjour@lundivendredi.fr',
    phone: '+33695800663',
    phoneDisplay: '06 95 80 06 63',
  },
  business: {
    streetAddress: 'Rochefort',
    addressLocality: 'Rochefort',
    postalCode: '17300',
    addressRegion: 'Charente-Maritime',
    addressCountry: 'FR',
    latitude: 45.9408,
    longitude: -0.9596,
    openingHours: 'Mo-Fr 09:00-18:00',
    foundingDate: '2023',
    priceRange: '€€',
  },
  social: {
    linkedin: 'https://www.linkedin.com/in/lionel-blanchet-kreyatik',
    github: 'https://github.com/kreyatik',
  },
} as const;

export const PAGE_DEFAULTS = {
  // 58 chars — sous la limite de troncature Google mobile (~60 chars)
  title: 'Landing page SEO · 5 jours · 550€ — Rochefort | lundivendredi',
  // 159 chars — dans la fenêtre Google, avec "SEO" + "Rochefort" + "Charente-Maritime"
  description:
    'Landing page pro optimisée SEO, livrée vendredi prochain pour 550€ TTC. Code source à toi, 1 mois de retouches inclus. Freelance Rochefort, France entière.',
  keywords: [
    'landing page 5 jours',
    'landing page pas cher',
    'site web 5 jours',
    'création site internet rapide',
    'site internet pas cher Rochefort',
    'site web 550 euros',
    'site web pas cher',
    'landing page SEO',
    'développeur web freelance livraison rapide',
    'site web Charente-Maritime',
    'freelance Rochefort',
  ],
} as const;

export type SeoProps = {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  ogImage?: string;
  ogType?: 'website' | 'article';
};
