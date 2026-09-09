
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAILCHIMP_SERVER_PREFIX?: string;
  readonly VITE_MAILCHIMP_AUDIENCE_ID?: string;
  readonly VITE_MAILCHIMP_ELEMENTAL_MERGE_TAG?: string;
  readonly MAILCHIMP_SERVER_PREFIX?: string;
  readonly MAILCHIMP_AUDIENCE_ID?: string;
  readonly MAILCHIMP_API_KEY?: string;
  /** Merge tag for elemental type (default: ELEMENTAL). Must exist in Mailchimp audience fields. */
  readonly MAILCHIMP_ELEMENTAL_MERGE_TAG?: string;
  /**
   * Optional override for Mailchimp API base in the browser (same-origin path proxied to Mailchimp).
   * Defaults to `/api/mailchimp` so Vite can proxy and avoid CORS.
   */
  readonly VITE_MAILCHIMP_API_BASE?: string;
  /** Supabase Storage bucket for avatars / forum images (default: user-uploads). */
  readonly VITE_SUPABASE_STORAGE_BUCKET?: string;
  /** Launch phase: entry (default) | workshop | full — controls public nav visibility. */
  readonly VITE_LAUNCH_PHASE?: string;
  /** Calendly event URL for Virtual Elemental Color Consultation (embedded booking). */
  readonly VITE_CALENDLY_CONSULT_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
