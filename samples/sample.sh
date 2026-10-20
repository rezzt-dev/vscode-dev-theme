#!/usr/bin/env bash
# muestra de shell: genera y empaqueta el tema
set -euo pipefail

THEME_DIR="${1:-themes}"
count=0
for file in "$THEME_DIR"/*.json; do
  echo "tema: $(basename "$file" .json)"
  count=$((count + 1))
done
[[ $count -eq 2 ]] && npm run package || exit 1
