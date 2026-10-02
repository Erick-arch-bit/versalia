import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['3000-ie8axug42vgri7kbwxeip-6feedd02.us4.manus.computer']
  }
});
