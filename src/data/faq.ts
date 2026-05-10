import type { FaqItem } from '../lib/schema';

export const FAQ: FaqItem[] = [
  {
    question: 'Concrètement, on commence quand ?',
    answer:
      "Tu réserves un créneau, je te recontacte sous 4 h ouvrées pour caler la visio de lancement. Versement de l'acompte (275 €), et le lundi suivant 9h matin on démarre. Si tu réserves vendredi, on attaque lundi prochain.",
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
      "Sites codés en Astro (HTML/CSS moderne). Plus rapides, plus sécurisés, pas de plugin qui casse en mise à jour, pas d'abonnement mensuel. Et surtout : tu pars avec le code source. Aucun vendor lock-in. Tu peux changer de prestataire ou d'hébergeur sans rien perdre.",
  },
  {
    question: 'Je veux 15 pages, c\'est possible ?',
    answer:
      "550 € couvre une landing page complète + 5 pages secondaires (à propos, services, réalisations, contact, mentions). Au-delà : on prend une 2e semaine (550 € supplémentaires) ou on planifie un sprint de 10 jours sur 2 semaines. C'est volontairement carré pour tenir l'engagement vendredi 17h.",
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
