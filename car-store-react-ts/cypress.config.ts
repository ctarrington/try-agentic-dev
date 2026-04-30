import { defineConfig } from 'cypress';
import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    screenshotsFolder: 'test-output/diff',
    viewportWidth: 1280,
    viewportHeight: 800,
    setupNodeEvents(on) {
      addMatchImageSnapshotPlugin(on);
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium' && process.env.CYPRESS_IN_CONTAINER) {
          launchOptions.args.push('--no-sandbox');
          launchOptions.args.push('--disable-dev-shm-usage');
        }
        return launchOptions;
      });
    },
  },
});
