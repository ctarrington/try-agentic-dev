import { defineConfig } from 'cypress';
import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    screenshotsFolder: 'test-output/diff',
    setupNodeEvents(on) {
      addMatchImageSnapshotPlugin(on);
    },
  },
});
