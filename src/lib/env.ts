/** Safe Vite env access — famous.ai preview may not define `import.meta.env`. */
type ViteEnv = Record<string, string | boolean | undefined> & {
  DEV?: boolean;
  MODE?: string;
  VITE_SUPABASE_URL?: string;
  VITE_SUPABASE_ANON_KEY?: string;
};

function readViteEnv(): ViteEnv {
  try {
    return import.meta.env ?? {};
  } catch {
    return {};
  }
}

const viteEnv = readViteEnv();

export function isDevMode(): boolean {
  return viteEnv.DEV === true || viteEnv.MODE === 'development';
}

export function getViteEnv(key: string): string | undefined {
  const value = viteEnv[key];
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

export { viteEnv };
