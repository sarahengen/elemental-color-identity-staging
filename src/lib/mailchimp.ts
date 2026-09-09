import { supabase } from '@/lib/supabase';

export type MailchimpSubscribeResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly message: string };

/**
 * Subscribes / updates a contact in the Mailchimp audience via a Supabase
 * edge function. All fields are optional except `email`; send as many as you
 * have so Mailchimp merge tags can personalise the automated result email.
 *
 * Merge fields used in the automation email:
 *   FNAME       → First name
 *   LNAME       → Last name
 *   ELEMENT     → Elemental type id  (e.g. "fire")
 *   SUBTYPE     → Subtype archetype name  (e.g. "Pure Fire")
 *   SUBSHORT    → Subtype short name  (e.g. "Fire-Fire")
 *   SUBDESC     → Subtype description paragraph
 *
 * After a successful subscribe/update the edge function adds the Mailchimp
 * tag "quiz-complete", which triggers the automation email.
 */
export async function subscribeToMailchimp(params: {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  elementalType?: string | null;
  subtypeName?: string | null;
  subtypeShortName?: string | null;
  subtypeDescription?: string | null;
  /** Tags to set active on the contact (for campaign segments). */
  tags?: string[];
  /** Tags to set inactive (removed) on the contact. */
  inactiveTags?: string[];
  /** When true, only upsert + tag the contact — skip the transactional email. */
  skipEmail?: boolean;
  /** `quiz` sends the subtype result email; `workshop` sends workshop-confirmation. */
  emailType?: 'quiz' | 'workshop';
  /** Product label for workshop confirmation merge tag PRODUCT. */
  productName?: string;
}): Promise<MailchimpSubscribeResult> {
  try {
    const { data, error } = await supabase.functions.invoke('mailchimp-subscribe', {
      body: {
        email: params.email,
        firstName: params.firstName || '',
        lastName: params.lastName || '',
        elementalType: params.elementalType || '',
        subtypeName: params.subtypeName || '',
        subtypeShortName: params.subtypeShortName || '',
        subtypeDescription: params.subtypeDescription || '',
        tags: params.tags ?? [],
        inactiveTags: params.inactiveTags ?? [],
        skipEmail: params.skipEmail === true,
        emailType: params.emailType ?? 'quiz',
        productName: params.productName,
      },
    });

    if (error) {
      console.error('Mailchimp edge function error:', error);
      return { ok: false, message: 'Subscription is temporarily unavailable. Please try again later.' };
    }

    if (data?.ok === true) return { ok: true };

    return { ok: false, message: data?.message || 'Subscription failed. Please try again.' };
  } catch (err) {
    console.error('subscribeToMailchimp error:', err);
    return { ok: false, message: 'Something went wrong. Please try again later.' };
  }
}

/** Mailchimp tag for a subtype id like "fire-water" → "subtype_fire_water". */
export function subtypeMailchimpTag(subtypeId: string): string {
  return `subtype_${subtypeId.replace(/-/g, '_')}`;
}

/**
 * Tags an existing contact without sending the result email. Fire-and-forget;
 * used by the profile-purchase flow to mark buyers for Mailchimp campaigns.
 */
export async function tagMailchimpContact(params: {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  elementalType?: string | null;
  subtypeName?: string | null;
  tags?: string[];
  inactiveTags?: string[];
}): Promise<MailchimpSubscribeResult> {
  return subscribeToMailchimp({ ...params, skipEmail: true });
}
