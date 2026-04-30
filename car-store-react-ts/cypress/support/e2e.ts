import { addMatchImageSnapshotCommand } from '@simonsmith/cypress-image-snapshot/command';
import './commands';

addMatchImageSnapshotCommand({
  customSnapshotsDir: 'test-output/snapshots',
  customDiffDir: 'test-output/diff',
  failureThreshold: 0.03,
  failureThresholdType: 'percent',
});

beforeEach(() => {
  cy.clearLocalStorage();
});
