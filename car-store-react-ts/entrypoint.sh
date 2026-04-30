#!/bin/sh
set -e

# Signal Cypress config to add --no-sandbox / --disable-dev-shm-usage for Chrome
export CYPRESS_IN_CONTAINER=1

npm run dev -- --host &
DEV_PID=$!

echo "Waiting for dev server on :5173..."
until curl -sf http://localhost:5173 >/dev/null 2>&1; do
  sleep 1
done
echo "Dev server ready."

xvfb-run --auto-servernum npx cypress run --browser chrome --e2e
EXIT_CODE=$?

kill "$DEV_PID" 2>/dev/null || true
exit "$EXIT_CODE"
