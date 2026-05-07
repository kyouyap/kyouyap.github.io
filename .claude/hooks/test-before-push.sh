#!/bin/bash

# JSONから実行するコマンドを取得
command=$(jq -r '.tool_input.command // ""')

# git pushコマンドを検出
if echo "$command" | grep -q "git push"; then
  # --no-verifyフラグが含まれている場合はスキップ
  if echo "$command" | grep -q -- "--no-verify"; then
    exit 0
  fi

  # git worktree 対応: push 対象のブランチが属するworktreeを検出する
  FRONTEND_DIR="$CLAUDE_PROJECT_DIR/frontend"

  # git push [options] <remote> <branch> からブランチ名を抽出
  # フラグ (-u, -f, --set-upstream, --no-verify, --force, --force-with-lease) を除去してパース
  PUSH_BRANCH=$(echo "$command" | grep -oE 'git push[^&;|]*' | head -1 \
    | sed 's/ -[uf]//g; s/ --set-upstream//g; s/ --no-verify//g; s/ --force-with-lease//g; s/ --force//g' \
    | awk '{print $4}')

  if [ -n "$PUSH_BRANCH" ]; then
    while IFS= read -r wt_line; do
      if [[ "$wt_line" == worktree\ * ]]; then
        WT_PATH="${wt_line#worktree }"
      elif [[ "$wt_line" == branch\ * ]] && [ -n "$WT_PATH" ]; then
        WT_BRANCH="${wt_line#branch refs/heads/}"
        if [[ "$WT_BRANCH" == "$PUSH_BRANCH" ]] && [[ -d "$WT_PATH/frontend" ]]; then
          FRONTEND_DIR="$WT_PATH/frontend"
          break
        fi
      fi
    done < <(git -C "$CLAUDE_PROJECT_DIR" worktree list --porcelain 2>/dev/null)
  fi

  echo "Detected frontend dir: $FRONTEND_DIR" >&2
  echo "Running tests before push..." >&2

  # ロックファイルで複数セッションの同時テスト実行を防止
  LOCK_FILE="/tmp/pair_settlement_test.lock"
  exec 200>"$LOCK_FILE"
  if ! flock -w 300 200; then
    echo "✗ Another test session is running. Timed out waiting for lock." >&2
    exit 2
  fi

  # frontendディレクトリでテストを実行（OOM防止: ヒープサイズを1GBに制限）
  if ! (cd "$FRONTEND_DIR" && NODE_OPTIONS="--max-old-space-size=1024" pnpm test:ci 2>&1); then
    echo "✗ Tests failed. Push blocked." >&2
    echo "Tip: Use git push --no-verify to skip this check if needed." >&2
    exit 2  # ブロック
  fi

  echo "✓ All tests passed." >&2
fi

exit 0
