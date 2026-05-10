import type { FaqItem } from '../lib/schema';

export const FAQ: FaqItem[] = [
  {
    question: "Et si je n'ai pas de textes ni de photos ?",
    answer:
      "Je rédige tes textes (entretien téléphonique de 45 min lundi matin), et je sors une banque de photos pro adaptées à ton métier. Sans surcoût. Si tu veux des photos de toi, je te recommande un photographe de mon réseau.",
  },
  {
    question: "Et si je veux changer 3 trucs après vendredi ?",
    answer:
      "La 1re semaine post-livraison : retouches gratuites (textes, couleurs, ajout d'une section). Au-delà : tu modifies seul (la formation 30 min sert à ça), ou tu me prends en maintenance à 60 €/h, sans engagement.",
  },
  {
    question: "Pourquoi pas WordPress / Wix / Webflow ?",
    answer:
      "Sites codés en Astro (HTML/CSS moderne). Plus rapides, plus sécurisés, pas de plugin qui casse en mise à jour. Tu gardes tes fichiers, tu peux changer de prestataire sans rien perdre.",
  },
  {
    question: "Je veux 15 pages, c'est possible ?",
    answer:
      "550 € couvre 6 pages : accueil, à propos, services, réalisations, contact + une page bonus. Au-delà : on prend une 2e semaine (550 € de plus). C'est volontairement carré.",
  },
  {
    question: "Je suis à Strasbourg, ça marche aussi ?",
    answer:
      "Tout se fait en visio, partout en France métropolitaine et DOM-TOM. La carte SEPA fonctionne, la facture est en France, le café se prend par écran interposé.",
  },
  {
    question: '"Pas livré → remboursé", c\'est sérieux ?',
    answer:
      "Très. Vendredi 17 h, soit ton site est en ligne (URL réelle, pas une preview), soit tu récupères ton acompte sous 7 jours. C'est dans le bon de commande, signé numériquement le lundi matin.",
  },
];
