import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { ProxyOptions } from "vite";

/** Browser newsletter calls use `/api/mailchimp` (see `src/lib/mailchimp.ts`). Mailchimp has no CORS, so the dev/preview server must proxy and attach `MAILCHIMP_API_KEY`. */
function mailchimpProxyConfig(env: Record<string, string>): Record<string, ProxyOptions> | undefined {
  const dc = (env.VITE_MAILCHIMP_SERVER_PREFIX || env.MAILCHIMP_SERVER_PREFIX || "").trim();
  const apiKey = (env.MAILCHIMP_API_KEY || "").trim();
  if (!dc || !apiKey) return undefined;

  return {
    "/api/mailchimp": {
      target: `https://${dc}.api.mailchimp.com`,
      changeOrigin: true,
      secure: true,
      rewrite: (p) => p.replace(/^\/api\/mailchimp/, ""),
      configure: (proxy) => {
        proxy.on("proxyReq", (proxyReq) => {
          proxyReq.setHeader("Authorization", `apikey ${apiKey}`);
        });
      },
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const proxy = mailchimpProxyConfig(env);

  return {
    server: {
      host: "::",
      port: 8080,
      ...(proxy ? { proxy } : {}),
    },
    preview: {
      ...(proxy ? { proxy } : {}),
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
