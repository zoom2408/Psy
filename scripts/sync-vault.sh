#!/usr/bin/env bash
# Đồng bộ một chiều: vault Obsidian trong iCloud -> vault/ của repo.
# Bỏ qua Archive (ghi chú cá nhân), .obsidian (cấu hình riêng từng máy) và file tạm.
set -euo pipefail
SRC="${OBSIDIAN_VAULT:-$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents/Psy}/"
DST="$(cd "$(dirname "$0")/.." && pwd)/vault/"
[ -d "$SRC" ] || { echo "Không thấy vault: $SRC" >&2; exit 1; }
rsync -a --delete \
  --exclude='Archive/' --exclude='.obsidian/' --exclude='.trash/' --exclude='.DS_Store' --exclude='*.icloud' \
  "$SRC" "$DST"
echo "Đã đồng bộ: $SRC -> $DST"
