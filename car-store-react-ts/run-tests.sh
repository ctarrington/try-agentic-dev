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
  -v "$DIR/test-output:/app/test-output:Z" \
  "$IMAGE"
