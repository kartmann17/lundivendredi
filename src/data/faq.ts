import type { FaqItem } from '../lib/schema';

export const FAQ: FaqItem[] = [
  {
    question: 'Concrètement, on commence quand ?',
    answer:
      "Tu réserves un créneau, je te recontacte sous 4 h ouvrées pour caler la visio de lancement. Versement de l'acompte (275 €), et le lundi suivant à 9h on démarre. Si tu réserves vendredi, on attaque lundi prochain.",
  },
  {
    question: "Et si je n'ai pas de textes ni de photos ?",
    answer:
      "Je rédige tes textes (entretien téléphonique de 45 min lundi matin), et je sors une banque de photos pro adaptées à ton métier. Sans surcoût. Si tu veux des photos de toi, je te recommande un photographe de mon réseau.",
  },
  {
    question: 'Et le nom de domaine et hébergement ?',
    answer:
      "Ils ne sont pas dans l'offre, mais tu n'as pas à les gérer seul. Pendant le sprint, je te conseille sur le choix (5 min de discussion), tu commandes via OVH (~12 €/an pour un .fr) ou tu utilises Cloudflare Pages (gratuit). Le code source est à toi, donc tu héberges où tu veux. Aucun vendor lock-in.",
  },
  {
    question: 'Et si je veux changer 3 trucs après vendredi ?',
    answer:
      "Tu as 1 mois de retouches gratuites inclus après la livraison. Textes, couleurs, sections, c'est compris. Au-delà du mois, tu modifies seul (la formation 30 min sert à ça), ou tu me prends en maintenance à 60 €/h, sans engagement.",
  },
  {
    question: 'Pourquoi pas WordPress / Wix / Webflow ?',
    answer:
      "Trois raisons. (1) SEO max : site léger, HTML propre, données structurées, vitesse au top — exactement ce que Google récompense. WordPress avec ses plugins est lourd et lent par nature. (2) Pas d'abonnement : Wix et Webflow te facturent 20-40 €/mois à vie. Ici 0 €/mois après le paiement unique. (3) Code source à toi : aucun vendor lock-in. Tu changes de prestataire ou d'hébergeur sans rien perdre.",
  },
  {
    question: 'Je veux plusieurs pages, c\'est possible ?',
    answer:
      "550 € couvre une landing page complète (longue, qui présente tout) et une page contact dédiée. Pas plus. Si tu as besoin de pages additionnelles (services détaillés, à propos, FAQ étendue, mentions séparées), on ajoute à 80 €/page. Pour un site complet de 6 à 10 pages, on planifie un sprint étendu sur 2 semaines (1100 € total).",
  },
  {
    question: 'Et le référencement Google ?',
    answer:
      "Le site est livré 100 % optimisé pour Google : HTML sémantique, données structurées schema.org, sitemap XML, Search Console inscrit, balises title et description ciblées, vitesse Lighthouse 95+. La technique est blindée. Pour le ranking effectif, ça dépend aussi de ton contenu et de ta fiche Google Business Profile — je te montre comment optimiser tout ça pendant la formation.",
  },
  {
    question: 'Je suis à Strasbourg, ça marche aussi ?',
    answer:
      "Tout se fait en visio, partout en France métropolitaine et DOM-TOM. La carte SEPA fonctionne, la facture est en France, le café se prend par écran interposé. Pas de surcoût géographique.",
  },
  {
    question: '"Pas livré → remboursé", c\'est sérieux ?',
    answer:
      "Très. Vendredi 17 h, soit ton site est en ligne sur ton URL réelle (pas une preview, pas un staging), soit tu récupères ton acompte sous 7 jours. C'est dans le bon de commande, signé numériquement le lundi matin. Aucune petite ligne, aucun astérisque.",
  },
];
