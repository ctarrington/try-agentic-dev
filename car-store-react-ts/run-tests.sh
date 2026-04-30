#!/bin/bash
set -e
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IMAGE=car-store-cypress

podman build \
  --storage-opt ignore_chown_errors=true \
  -t "$IMAGE" \
  "$DIR"

podman run --rm \
  -v "$DIR/test-output:/app/test-output:Z" \
  "$IMAGE"
