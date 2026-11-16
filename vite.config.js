import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The sandbox preview reaches the dev server through a proxy hostname whose
// sandbox id rotates, so allow the whole sandbox domain only while the platform
// preview flag is on. Outside preview mode the allowlist stays empty (default).
const allowedHosts = [];
if (process.env.BASE44_PREVIEW_MODE === '1' && process.env.BASE44_SANDBOX_HOST_DOMAIN) {
  allowedHosts.push(`.${process.env.BASE44_SANDBOX_HOST_DOMAIN}`);
}

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts,
    watch: { usePolling: true, interval: 300 },
  },
});
