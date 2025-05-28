import { defineConfig } from "cypress";
import { createHero, deleteHero } from './dist-cypress/cypress/support/data.js';

export default defineConfig({
  projectId: 'nd8nd1',
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      on('task', {
        createHero,
        deleteHero,
      });
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});