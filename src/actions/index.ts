import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';
import { SITE } from '../lib/seo';
import { CRENEAUX_LABELS } from '../data/creneaux';

const reservationSchema = z.object({
  prenom: z.string().trim().min(2, 'Prénom trop court').max(60, 'Prénom trop long'),
  nom: z.string().trim().min(2, 'Nom trop court').max(60, 'Nom trop long'),
  email: z.string().trim().toLowerCase().email('Email invalide').max(180),
  telephone: z
    .string()
    .trim()
    .min(8, 'Téléphone trop court')
    .max(30, 'Téléphone trop long')
    .regex(/^[0-9+\s.\-()]+$/, 'Téléphone invalide'),
  activite: z.string().trim().min(2, 'Précise ton activité').max(160),
  semaine: z
    .string()
    .trim()
    .refine((v) => v === 'autre' || v in CRENEAUX_LABELS, 'Choisis une semaine'),
  message: z.string().trim().max(2000, 'Message trop long').optional().default(''),
  consentement: z
    .union([z.literal('on'), z.literal('true'), z.boolean()])
    .optional()
    .transform((v) => v === 'on' || v === 'true' || v === true)
    .refine((v) => v === true, "Coche la case pour accepter d'être recontacté"),
  // Honeypot — accepte n'importe quoi (chaîne, undefined, vide). On checke
  // juste la truthiness côté handler.
  company: z.unknown().optional(),
});

export const server = {
  reservation: defineAction({
    accept: 'form',
    input: reservationSchema,
    handler: async (data, ctx) => {
      // Honeypot
      if (typeof data.company === 'string' && data.company.length > 0) {
        return { ok: true, honeypot: true };
      }

      const apiKey = import.meta.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
      const contactEmail =
        import.meta.env.CONTACT_EMAIL ?? process.env.CONTACT_EMAIL ?? SITE.contact.email;

      if (!apiKey) {
        console.error('[reservation] RESEND_API_KEY missing');
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Service email non configuré.',
        });
      }

      const resend = new Resend(apiKey);
      const semaineLabel =
        data.semaine === 'autre'
          ? "Une autre semaine — à discuter"
          : CRENEAUX_LABELS[data.semaine] ?? data.semaine;
      const fullName = `${data.prenom} ${data.nom}`.trim();
      const subject = `[lundivendredi] Réservation — ${fullName} (${data.activite})`;

      const text = [
        `Nouvelle demande de réservation reçue depuis ${SITE.url}`,
        '',
        `Nom : ${fullName}`,
        `Email : ${data.email}`,
        `Téléphone : ${data.telephone}`,
        `Activité : ${data.activite}`,
        `Semaine souhaitée : ${semaineLabel}`,
        '',
        `Message :`,
        data.message || '(aucun)',
        '',
        '---',
        `IP : ${ctx.clientAddress ?? 'inconnue'}`,
        `User-Agent : ${ctx.request.headers.get('user-agent') ?? 'inconnu'}`,
        `Reçu : ${new Date().toISOString()}`,
      ].join('\n');

      const html = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; padding: 24px; color: #0F0E0C;">
          <h2 style="margin: 0 0 16px; font-size: 18px;">Nouvelle demande de réservation</h2>
          <p style="margin: 0 0 8px; color: #5C544A; font-size: 13px;">Reçue depuis ${SITE.url}</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #5C544A; width: 140px;">Nom</td><td><strong>${escapeHtml(fullName)}</strong></td></tr>
            <tr><td style="padding: 6px 0; color: #5C544A;">Email</td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #5C544A;">Téléphone</td><td><a href="tel:${escapeHtml(data.telephone)}">${escapeHtml(data.telephone)}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #5C544A;">Activité</td><td>${escapeHtml(data.activite)}</td></tr>
            <tr><td style="padding: 6px 0; color: #5C544A;">Semaine</td><td>${escapeHtml(semaineLabel)}</td></tr>
          </table>
          ${data.message ? `<div style="margin-top: 16px; padding: 12px; background: #F5F1EA; border-left: 3px solid #D4541C;"><strong>Message&nbsp;:</strong><br/>${escapeHtml(data.message).replace(/\n/g, '<br/>')}</div>` : ''}
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;"/>
          <p style="font-size: 12px; color: #999; margin: 0;">
            IP : ${escapeHtml(ctx.clientAddress ?? 'inconnue')}<br/>
            Reçu : ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}
          </p>
        </div>
      `;

      try {
        const { error } = await resend.emails.send({
          from: 'lundivendredi <reservation@lundivendredi.fr>',
          to: contactEmail,
          replyTo: data.email,
          subject,
          text,
          html,
        });
        if (error) {
          console.error('[reservation] Resend error', error);
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: "Erreur d'envoi. Réessaie ou écris-moi directement.",
          });
        }
      } catch (err) {
        if (err instanceof ActionError) throw err;
        console.error('[reservation] unexpected error', err);
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: "Erreur d'envoi. Réessaie ou écris-moi directement.",
        });
      }

      return { ok: true };
    },
  }),
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
