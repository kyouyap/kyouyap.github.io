---
name: delete-all-worktrees
description: Use when ユーザーが全ての worktree を一括で削除・クリーンアップしたいとき、worktree が溜まって整理が必要なとき
---

# 全 Worktree の一括クリーンアップ

## 概要

溜まった git worktree を安全に一括削除する。

**中核原則:** 一覧と状態確認 → ユーザー確認 → 安全な削除 → 結果報告。

**開始時に宣言:** 「cleaning-all-worktrees スキルを使って worktree を一括クリーンアップします。」

## プロセス

### ステップ 1: 一覧取得と分析

```bash
# メイン worktree を特定（絶対に除外する）
main_wt=$(git worktree list | head -1 | awk '{print $1}')

# メイン以外の worktree を取得
git worktree list | tail -n +2
```

**worktree が 0 個の場合:**

```
メイン以外の worktree はありません。クリーンアップ不要です。
```

停止する。ステップ 2 に進まない。

**worktree がある場合:** 各 worktree の状態を確認:

```bash
# 各 worktree について
for wt_path in $(git worktree list | tail -n +2 | awk '{print $1}'); do
  branch=$(git -C "$wt_path" branch --show-current 2>/dev/null)

  # 未コミット変更の確認
  git -C "$wt_path" status --porcelain 2>/dev/null

  # メインブランチにマージ済みか確認
  git branch --merged main 2>/dev/null | grep -q "$branch"
done
```

### ステップ 2: 確認の提示

テーブル形式で一覧と状態を表示:

```
| # | パス | ブランチ | マージ状態 | 未コミット変更 |
|---|------|----------|------------|----------------|
| 1 | .worktrees/feature-a | feature/a | マージ済み | なし |
| 2 | .worktrees/feature-b | feature/b | 未マージ | あり ⚠️ |
```

**未コミット変更がある worktree には ⚠️ 警告を表示。**

次に、ブランチ削除について 3 つの選択肢を提示:

```
ブランチの削除方針を選んでください:

1. マージ済みブランチのみ削除（安全）
2. 全ブランチを削除（未マージ含む）
3. ブランチは残す（worktree のみ削除）

どの選択肢にしますか?
```

**説明は追加しない** - 選択肢は簡潔に保つ。

### ステップ 3: 削除の実行

**未コミット変更がある worktree について:**

削除前に再度確認:

```
⚠️ <path> に未コミット変更があります。削除すると失われます。
続行しますか? (yes/no)
```

**削除手順:**

```bash
# 1. 各 worktree を削除（メインは絶対に除外）
git worktree remove <worktree-path>

# 強制削除が必要な場合（未コミット変更ありで確認済み）
git worktree remove --force <worktree-path>

# 2. 残骸をクリーンアップ
git worktree prune

# 3. 選択に応じてブランチを削除
# 選択肢 1: マージ済みのみ
git branch -d <branch-name>

# 選択肢 2: 全ブランチ（未マージ含む - 明示的確認済み）
git branch -D <branch-name>

# 選択肢 3: ブランチ削除なし
```

### ステップ 4: 結果の報告

```
クリーンアップ完了:
- 削除した worktree: N 個
- 削除したブランチ: N 個
- スキップ: N 個
- 残っている worktree: (git worktree list の結果)
```

## クイックリファレンス

| 状況                      | 対応                         |
| ------------------------- | ---------------------------- |
| worktree が 0 個          | 「クリーンアップ不要」で終了 |
| 未コミット変更あり        | ⚠️ 警告 + 個別確認           |
| 選択肢 1 (マージ済みのみ) | `git branch -d` で安全に削除 |
| 選択肢 2 (全ブランチ)     | `git branch -D` で強制削除   |
| 選択肢 3 (ブランチ残す)   | worktree のみ削除            |
| メイン worktree           | 絶対に除外                   |

## よくあるミス

### `rm -rf` で worktree を削除

- **問題:** git の worktree 管理情報が壊れ、`.git/worktrees/` に残骸が残る
- **対策:** 必ず `git worktree remove` を使用し、その後 `git worktree prune` で整合性を確保

### メイン worktree の誤削除

- **問題:** メインの作業ディレクトリが消える
- **対策:** `git worktree list | head -1` で特定し、処理対象から必ず除外

### 確認なしの一括削除

- **問題:** 未コミット作業や未マージブランチが失われる
- **対策:** 状態テーブルを提示し、選択肢を確認してから実行

### 未マージブランチの暗黙的な force delete

- **問題:** 重要な未マージ作業が失われる
- **対策:** `git branch -D` は選択肢 2 で明示的に確認された場合のみ

## レッドフラグ

**絶対にしない:**

- メイン worktree を削除対象に含める
- 確認なしに worktree を削除する
- `rm -rf` で worktree を削除する
- 未コミット変更のある worktree を警告なしに削除する
- 未マージブランチを暗黙的に `git branch -D` する

**必ず行う:**

- メイン worktree を最初に特定して除外する
- 各 worktree の状態（未コミット変更・マージ状態）を確認する
- テーブル形式で一覧を提示する
- ブランチ削除の方針をユーザーに選ばせる
- 削除後に `git worktree prune` を実行する
- 結果を報告する

## 連携

**関連 skill:**

- **using-git-worktrees** - worktree の作成（本スキルはその逆操作）
- **finishing-a-development-branch** - 単一 worktree のクリーンアップ（本スキルはその一括版）
