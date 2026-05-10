import { SITE } from './seo';

const BUSINESS_ID = `${SITE.url}#business`;
const PERSON_ID = `${SITE.url}#person`;
const SERVICE_ID = `${SITE.url}#service`;
const OFFER_ID = `${SITE.url}#offer`;
const WEBSITE_ID = `${SITE.url}#website`;

export type FaqItem = { question: string; answer: string };

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: SITE.legalName,
    alternateName: SITE.name,
    description:
      "Création de sites web professionnels livrés en 5 jours pour 550€ TTC. Freelance basé à Rochefort, intervention France entière.",
    url: SITE.url,
    logo: `${SITE.url}/og-image.png`,
    image: `${SITE.url}/og-image.png`,
    telephone: SITE.contact.phone,
    email: SITE.contact.email,
    priceRange: SITE.business.priceRange,
    foundingDate: SITE.business.foundingDate,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.business.streetAddress,
      addressLocality: SITE.business.addressLocality,
      postalCode: SITE.business.postalCode,
      addressRegion: SITE.business.addressRegion,
      addressCountry: SITE.business.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.business.latitude,
      longitude: SITE.business.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    areaServed: {
      '@type': 'Country',
      name: 'France',
    },
    sameAs: [SITE.social.linkedin, SITE.social.github],
    // NB: AggregateRating volontairement absent — ne pas l'ajouter tant
    // qu'il n'y a pas de vrais avis vérifiables (Google Business Profile
    // ou plateforme tierce). Un faux AggregateRating viole les guidelines
    // Google Review Snippet et risque une manual action.
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Lionel Blanchet',
    alternateName: 'Kreyatik',
    jobTitle: 'Développeur web freelance',
    worksFor: { '@id': BUSINESS_ID },
    url: SITE.url,
    sameAs: [SITE.social.linkedin, SITE.social.github],
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.business.addressLocality,
      addressCountry: SITE.business.addressCountry,
    },
  };
}

export function serviceSchema() {
  const priceValidUntil = new Date();
  priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SERVICE_ID,
    name: 'Site web pro livré en 5 jours',
    serviceType: 'Création de site internet',
    description:
      "Création d'un site web professionnel sur-mesure livré en 5 jours ouvrés. Hébergement et nom de domaine 1 an offerts.",
    provider: { '@id': BUSINESS_ID },
    areaServed: { '@type': 'Country', name: 'France' },
    offers: {
      '@type': 'Offer',
      '@id': OFFER_ID,
      price: '550',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: priceValidUntil.toISOString().split('T')[0],
      url: `${SITE.url}#reserver`,
      eligibleRegion: { '@type': 'Country', name: 'France' },
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    inLanguage: SITE.defaultLanguage,
    publisher: { '@id': BUSINESS_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqPageSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
