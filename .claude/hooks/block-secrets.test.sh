#!/bin/bash
# block-secrets.sh の動作テスト
# 各 case で JSON を pipe し、exit code を assert する。
set -u

HOOK="$(dirname "$0")/block-secrets.sh"
PASSED=0
FAILED=0

assert_exit() {
  local name="$1"
  local expected="$2"
  local input="$3"
  local actual
  actual=$(echo "$input" | "$HOOK" >/dev/null 2>&1; echo $?)
  if [ "$actual" = "$expected" ]; then
    echo "✓ PASS: $name (exit=$actual)"
    PASSED=$((PASSED + 1))
  else
    echo "✗ FAIL: $name (expected=$expected, actual=$actual)"
    FAILED=$((FAILED + 1))
  fi
}

# --- Read ツール ---
assert_exit "Read .env ブロック"          2 '{"tool_name":"Read","tool_input":{"file_path":"/workspaces/pair_settlement/.env"}}'
assert_exit "Read .env.local ブロック"    2 '{"tool_name":"Read","tool_input":{"file_path":"frontend/.env.local"}}'
assert_exit "Read .env.production ブロック" 2 '{"tool_name":"Read","tool_input":{"file_path":".env.production"}}'
assert_exit "Read .env.example 通過"       0 '{"tool_name":"Read","tool_input":{"file_path":"frontend/.env.example"}}'
assert_exit "Read 通常ファイル 通過"        0 '{"tool_name":"Read","tool_input":{"file_path":"frontend/src/app/page.tsx"}}'
assert_exit "Read *.pem ブロック"          2 '{"tool_name":"Read","tool_input":{"file_path":"certs/server.pem"}}'
assert_exit "Read *.key ブロック"          2 '{"tool_name":"Read","tool_input":{"file_path":"certs/server.key"}}'
assert_exit "Read id_rsa ブロック"         2 '{"tool_name":"Read","tool_input":{"file_path":"/home/node/.ssh/id_rsa"}}'
assert_exit "Read .ssh/ ディレクトリ ブロック" 2 '{"tool_name":"Read","tool_input":{"file_path":"/home/node/.ssh/config"}}'

# --- Bash ツール ---
assert_exit "Bash cat .env ブロック"           2 '{"tool_name":"Bash","tool_input":{"command":"cat .env"}}'
assert_exit "Bash head .env.local ブロック"    2 '{"tool_name":"Bash","tool_input":{"command":"head frontend/.env.local"}}'
assert_exit "Bash bash -c cat .env ブロック"   2 '{"tool_name":"Bash","tool_input":{"command":"bash -c \"cat .env\""}}'
assert_exit "Bash cat .env.example 通過"       0 '{"tool_name":"Bash","tool_input":{"command":"cat frontend/.env.example"}}'
assert_exit "Bash pnpm dev 通過"               0 '{"tool_name":"Bash","tool_input":{"command":"pnpm dev"}}'
assert_exit "Bash env NODE_ENV=prod pnpm build 通過" 0 '{"tool_name":"Bash","tool_input":{"command":"env NODE_ENV=prod pnpm build"}}'
assert_exit "Bash ls -la 通過"                 0 '{"tool_name":"Bash","tool_input":{"command":"ls -la"}}'

# --- Edit / Write ツール ---
assert_exit "Edit .env ブロック"               2 '{"tool_name":"Edit","tool_input":{"file_path":".env"}}'
assert_exit "Write .env ブロック"              2 '{"tool_name":"Write","tool_input":{"file_path":".env"}}'
assert_exit "Write .env.example 通過"          0 '{"tool_name":"Write","tool_input":{"file_path":"frontend/.env.example"}}'

# --- Grep ツール ---
assert_exit "Grep .env を対象 ブロック"        2 '{"tool_name":"Grep","tool_input":{"path":".env","pattern":"SECRET"}}'
assert_exit "Grep src/ 対象 通過"              0 '{"tool_name":"Grep","tool_input":{"path":"frontend/src","pattern":"useState"}}'
assert_exit "Grep glob に **/.env 指定 ブロック" 2 '{"tool_name":"Grep","tool_input":{"path":".","glob":"**/.env","pattern":"SECRET"}}'
assert_exit "Grep glob に .env.local 指定 ブロック" 2 '{"tool_name":"Grep","tool_input":{"path":".","glob":"**/.env.local","pattern":"KEY"}}'
assert_exit "Grep glob に *.ts 指定 通過"       0 '{"tool_name":"Grep","tool_input":{"path":"frontend/src","glob":"*.ts","pattern":"useState"}}'

# --- Glob ツール ---
assert_exit "Glob **/.env.local ブロック"      2 '{"tool_name":"Glob","tool_input":{"pattern":"**/.env.local"}}'
assert_exit "Glob **/*.ts 通過"                0 '{"tool_name":"Glob","tool_input":{"pattern":"**/*.ts"}}'
assert_exit "Glob path に .ssh/ 指定 ブロック"  2 '{"tool_name":"Glob","tool_input":{"pattern":"*","path":".ssh/"}}'
assert_exit "Glob path に .aws/ 指定 ブロック"  2 '{"tool_name":"Glob","tool_input":{"pattern":"*","path":".aws/"}}'
assert_exit "Glob **/.env ブロック"             2 '{"tool_name":"Glob","tool_input":{"pattern":"**/.env"}}'
assert_exit "Glob path に src/ 指定 通過"       0 '{"tool_name":"Glob","tool_input":{"pattern":"**/*.ts","path":"frontend/src"}}'

# --- NotebookEdit ツール ---
assert_exit "NotebookEdit .env ブロック"        2 '{"tool_name":"NotebookEdit","tool_input":{"file_path":".env"}}'
assert_exit "NotebookEdit 通常ファイル 通過"    0 '{"tool_name":"NotebookEdit","tool_input":{"file_path":"frontend/src/app/page.ipynb"}}'

# --- Grep pattern 側の .env を含む正当なケース（修正で通過するようになる） ---
assert_exit "Grep pattern に process.env (ファイル検索) 通過" 0 '{"tool_name":"Grep","tool_input":{"path":"frontend/src","pattern":"process\\.env\\.NODE_ENV"}}'
assert_exit "Grep pattern に .env.local (コード検索) 通過"     0 '{"tool_name":"Grep","tool_input":{"path":"frontend/src","pattern":".env.local"}}'

# --- .envrc / .env/ディレクトリ等のエッジケース ---
assert_exit "Read .envrc (direnv) ブロック"                   2 '{"tool_name":"Read","tool_input":{"file_path":".envrc"}}'
assert_exit "Read .env/cached ディレクトリ配下 ブロック"        2 '{"tool_name":"Read","tool_input":{"file_path":".env/cached"}}'

# --- 壊れた JSON で fail-open（通過）になることを確認 ---
assert_exit "壊れた JSON で fail-open 通過"                    0 'not-json'

# --- サマリ ---
echo ""
echo "Results: $PASSED passed, $FAILED failed"
[ $FAILED -eq 0 ]
