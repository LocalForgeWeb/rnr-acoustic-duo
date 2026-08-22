#!/usr/bin/env bash
set -euo pipefail

# Downloads the public media currently served by Manus into the Cloudflare
# Pages asset directory. Run while the Manus preview is available.
SITE_URL="${SITE_URL:-http://localhost:3000}"
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ASSET_DIR="$PROJECT_ROOT/cloudflare-public/manus-storage"

mkdir -p "$ASSET_DIR"

assets=(
  "C5D4D096-E8E3-4C44-A96A-965C24E643FB_0493c1fe.png"
  "hero_mobile_4ec86e03.png"
  "rnr-logo-light-yellow-correct_6223c147.png"
  "A0BEAFAF-F3BC-4C21-A12A-FA6A984F6A96_534bfe0c.png"
  "IMG_6942_3ffdc999.JPG"
  "IMG_6925_cd3cc598.PNG"
  "IMG_6926_2afdcad9.JPG"
  "IMG_6927_f6e6eecf.JPG"
  "IMG_8782_028fdee9.JPG"
  "IMG_8782_3b7ea25b.JPG"
  "IMG_6969_4af8c8a2.PNG"
  "IMG_6964_c58d397c.PNG"
  "rnr-performance-dates-flyer_4cd8c3e4.png"
  "rnr_performance_0ae357d6.mp4"
)

for asset in "${assets[@]}"; do
  echo "Downloading $asset"
  curl --fail --location --silent --show-error "$SITE_URL/manus-storage/$asset" --output "$ASSET_DIR/$asset"
done

echo "Cloudflare media export complete: $ASSET_DIR"
