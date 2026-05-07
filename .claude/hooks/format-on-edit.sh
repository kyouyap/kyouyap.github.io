#!/bin/bash

# JSONから編集されたファイルパスを取得
file_path=$(jq -r '.tool_input.file_path // ""')

# ファイルパスが空の場合は何もしない
if [ -z "$file_path" ] || [ "$file_path" = "null" ]; then
  exit 0
fi

# 対象拡張子かチェック
if [[ "$file_path" =~ \.(ts|tsx|js|jsx|json|css|md)$ ]]; then
  # frontendディレクトリ配下のファイルのみ処理
  if [[ "$file_path" == *"/frontend/"* ]]; then
    cd "$CLAUDE_PROJECT_DIR/frontend" && pnpm prettier --write "$file_path" 2>/dev/null
    echo "✓ Formatted: $file_path" >&2
  fi
fi

exit 0
