#!/bin/sh
set -e

# Signal Cypress config to add --no-sandbox / --disable-dev-shm-usage for Chrome
export CYPRESS_IN_CONTAINER=1

echo "Waiting for dev server on :5173..."
until curl -sf http://localhost:8080 >/dev/null 2>&1; do
  sleep 1
done
echo "Dev server ready."

xvfb-run --auto-servernum npx cypress run --browser chrome --e2e
