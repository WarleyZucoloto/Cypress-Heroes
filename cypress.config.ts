import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
          supportFile: 'client/cypress/support/e2e.ts'
      // implement node event listeners here
    },
  },
});
