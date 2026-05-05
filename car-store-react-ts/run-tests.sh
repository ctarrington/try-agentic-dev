#!/bin/bash
set -e
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IMAGE=car-store-cypress

podman build \
  --storage-opt ignore_chown_errors=true \
  -t "$IMAGE" \
  "$DIR"

# --network host lets the container reach the dev server running on the host
podman run --rm \
  --network host \
  -v "$DIR/cypress:/app/cypress:Z" \
  -v "$DIR/cypress.config.ts:/app/cypress.config.ts:Z" \
  -v "$DIR/tsconfig.json:/app/tsconfig.json:Z" \
  -v "$DIR/tsconfig.app.json:/app/tsconfig.app.json:Z" \
  -v "$DIR/tsconfig.node.json:/app/tsconfig.node.json:Z" \
  -v "$DIR/test-output:/app/test-output:Z" \
  "$IMAGE"
