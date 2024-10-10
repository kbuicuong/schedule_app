import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV),
    },
    plugins: [react()],
  };
});
