#!/bin/bash
# PreToolUse hook: 機密ファイルアクセスをブロックする
# stdin: Claude Code が渡す JSON ({ tool_name, tool_input, ... })
# exit 0 = 通過、exit 2 = ブロック（stderr に理由出力）
#
# Fail policy: JSON パース失敗時は fail-open（exit 0 + stderr 警告）。
# fail-closed は開発ワークフローを誤って破壊するリスクがあるため採用せず、
# 運用者が stderr ログを監視して異常を検知する方針。
set -u
set -o pipefail

input=$(cat)

# JSON パース失敗時は fail-open（警告を出して通過）
if ! tool_name=$(printf '%s' "$input" | jq -r '.tool_name // ""' 2>/dev/null); then
  echo "✗ block-secrets.sh: failed to parse tool_name from stdin JSON (fail-open)" >&2
  exit 0
fi
if ! tool_input_json=$(printf '%s' "$input" | jq -c '.tool_input // {}' 2>/dev/null); then
  echo "✗ block-secrets.sh: failed to parse tool_input from stdin JSON (fail-open)" >&2
  exit 0
fi

# ブロックパターン (.env.example は自然に除外される形式)
block_patterns=(
  '\.env($|[^.])'
  '\.env\.local'
  '\.env\.development'
  '\.env\.production'
  '\.env\.staging'
  '\.env\.test'
  '\.pem($|[^a-z])'
  '\.key($|[^a-z])'
  'id_rsa'
  'id_ed25519'
  '/secrets/'
  '/credentials/'
  '(^|/)\.ssh($|/)'
  '(^|/)\.aws($|/)'
)

# 単一フィールドをブロックパターンに照合し、マッチすればブロック（exit 2）する
check_field() {
  local field_value="$1"
  [ -z "$field_value" ] && return 0
  for pattern in "${block_patterns[@]}"; do
    if echo "$field_value" | grep -qE "$pattern"; then
      echo "✗ block-secrets.sh: pattern '$pattern' matched in tool '$tool_name'." >&2
      echo "  target: $field_value" >&2
      echo "  このアクセスは機密情報保護ポリシーによりブロックされました。" >&2
      exit 2
    fi
  done
}

# 検査対象フィールドをツールごとに抽出して個別に検査
case "$tool_name" in
  Read|Edit|Write|NotebookEdit)
    check_field "$(echo "$tool_input_json" | jq -r '.file_path // ""')"
    ;;
  Bash)
    check_field "$(echo "$tool_input_json" | jq -r '.command // ""')"
    ;;
  Grep)
    # path: 検索対象ディレクトリ／ファイル、glob: 検索対象ファイルフィルタ — 両方を検査
    check_field "$(echo "$tool_input_json" | jq -r '.path // ""')"
    check_field "$(echo "$tool_input_json" | jq -r '.glob // ""')"
    ;;
  Glob)
    # pattern: ファイル名パターン、path: ベースディレクトリ — 両方を検査
    check_field "$(echo "$tool_input_json" | jq -r '.pattern // ""')"
    check_field "$(echo "$tool_input_json" | jq -r '.path // ""')"
    ;;
  *)
    exit 0
    ;;
esac

exit 0
