#!/bin/bash

# JSONから実行するコマンドを取得
command=$(jq -r '.tool_input.command // ""')

# git commitコマンドを検出
if echo "$command" | grep -q "git commit"; then
  # --no-verifyフラグが含まれている場合はスキップ
  if echo "$command" | grep -q -- "--no-verify"; then
    exit 0
  fi

  # git worktree 対応: コミット対象ファイルがどのworktreeに属するか検出する
  # git add コマンドから最初のファイルを抽出し、変更が存在するworktreeを特定する
  FRONTEND_DIR="$CLAUDE_PROJECT_DIR/frontend"
  FIRST_ADDED=$(echo "$command" | grep -oE 'git add [^ &]+' | sed 's/git add //' | head -1)

  if [ -n "$FIRST_ADDED" ]; then
    while IFS= read -r wt_line; do
      if [[ "$wt_line" == worktree\ * ]]; then
        WT_PATH="${wt_line#worktree }"
        if [[ -f "$WT_PATH/$FIRST_ADDED" ]] && [[ -d "$WT_PATH/frontend" ]]; then
          # working tree または index に変更があるworktreeを使う
          if ! git -C "$WT_PATH" diff --quiet -- "$FIRST_ADDED" 2>/dev/null || \
             ! git -C "$WT_PATH" diff --cached --quiet -- "$FIRST_ADDED" 2>/dev/null; then
            FRONTEND_DIR="$WT_PATH/frontend"
            break
          fi
        fi
      fi
    done < <(git -C "$CLAUDE_PROJECT_DIR" worktree list --porcelain 2>/dev/null)
  fi

  echo "Detected frontend dir: $FRONTEND_DIR" >&2

  # テスト実行（変更ファイルに関連するテストのみ）
  # NOTE: --changed HEAD は git diff ベース。ステージング後にworking treeで元に戻した場合、
  # 差分なしと判定される可能性あり。Claude Code pre-commitフックでは実用上問題なし。
  echo "Running tests for changed files before commit..." >&2

  # ロックファイルで複数セッションの同時テスト実行を防止
  LOCK_FILE="/tmp/pair_settlement_test.lock"
  exec 200>"$LOCK_FILE"
  if ! flock -w 300 200; then
    echo "✗ Another test session is running. Timed out waiting for lock." >&2
    exit 2
  fi

  if ! (cd "$FRONTEND_DIR" && NODE_OPTIONS="--max-old-space-size=1024" pnpm vitest run --changed HEAD 2>&1); then
    echo "✗ Tests failed. Commit blocked." >&2
    echo "Tip: Use git commit --no-verify to skip this check if needed." >&2
    exit 2  # ブロック
  fi

  echo "✓ Tests passed." >&2
fi

exit 0
