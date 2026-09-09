import { createClient } from '@supabase/supabase-js';
import { getViteEnv, isDevMode } from '@/lib/env';

/** Prefer Vite env (famous.ai / Deploypad inject these); fall back for local dev. */
const supabaseUrl =
  getViteEnv('VITE_SUPABASE_URL') ||
  'https://nixjxykxmfrfdzjyvqcy.supabase.co';

const supabaseKey =
  getViteEnv('VITE_SUPABASE_ANON_KEY') ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5peGp4eWt4bWZyZmR6anl2cWN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzMDQ0MTMsImV4cCI6MjA4MTg4MDQxM30.OS39nUTK6Uq3YnrMnC7Cws3kLJdoejrse-CjAfqw6ik';

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase config. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in famous.ai / .env'
  );
}

const FETCH_TIMEOUT_MS = 15000;

/** Abort hung REST calls so AuthContext does not wait forever on preview hosts. */
const fetchWithTimeout: typeof fetch = (input, init) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  return fetch(input, { ...init, signal: controller.signal }).finally(() =>
    clearTimeout(timeoutId)
  );
};

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: window.localStorage,
    storageKey: 'elemental-color-auth',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
  global: {
    fetch: fetchWithTimeout,
    headers: {
      'X-Client-Info': 'elemental-color-app',
    },
  },
});

if (isDevMode()) {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('🔔 Supabase Auth Event:', event, session?.user?.email ?? '(no user)');
  });
}

export const debugSession = async () => {
  if (!isDevMode()) return { session: null, error: null };

  const { data: { session }, error } = await supabase.auth.getSession();
  console.log('🔍 SESSION DEBUG', { hasSession: !!session, email: session?.user?.email, error });
  return { session, error };
};

export { supabase, supabaseUrl, supabaseKey };
