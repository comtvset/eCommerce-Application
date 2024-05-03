import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: 'comtvset/eCommerce/',
  plugins: [tsconfigPaths(), react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
