---
name: using-git-worktrees
description: 現在のワークスペースから分離が必要な機能開発を始めるとき、または実装計画を実行する前に使う。安全確認と賢いディレクトリ選択を伴う git worktree を作成する
---

# Git Worktree の使用

## 概要

Git worktree は同じリポジトリを共有する隔離されたワークスペースを作成し、切り替えなしで複数のブランチで同時に作業できるようにします。

**基本原則:** 体系的なディレクトリ選択 + 安全性の検証 = 信頼できる隔離。

**開始時の宣言:** "using-git-worktrees スキルを使用して隔離されたワークスペースをセットアップします。"

## ディレクトリ選択プロセス

以下の優先順位に従う:

### 1. 既存のディレクトリを確認

```bash
# 優先順位で確認
ls -d .worktrees 2>/dev/null     # 推奨（隠しディレクトリ）
ls -d worktrees 2>/dev/null      # 代替
```

**見つかった場合:** そのディレクトリを使用する。両方存在する場合は `.worktrees` を優先。

### 2. CLAUDE.md を確認

```bash
grep -i "worktree.*director" CLAUDE.md 2>/dev/null
```

**設定が指定されている場合:** 確認せずにそれを使用する。

### 3. ユーザーに確認

ディレクトリが存在せず、CLAUDE.md にも設定がない場合:

```
worktree ディレクトリが見つかりません。どこに作成しますか?

1. .worktrees/ （プロジェクトローカル、隠しディレクトリ）
2. ~/.config/superpowers/worktrees/<project-name>/ （グローバルな場所）

どちらがよいですか?
```

## 安全性の検証

### プロジェクトローカルディレクトリの場合（.worktrees または worktrees）

**worktree を作成する前に、ディレクトリが ignore されていることを必ず確認する:**

```bash
# ディレクトリが ignore されているか確認（ローカル、グローバル、システムの gitignore を考慮）
git check-ignore -q .worktrees 2>/dev/null || git check-ignore -q worktrees 2>/dev/null
```

**ignore されていない場合:**

Jesse のルール「壊れているものは即座に修正する」に従い:
1. .gitignore に適切な行を追加する
2. 変更をコミットする
3. worktree の作成に進む

**なぜ重要か:** worktree の内容を誤ってリポジトリにコミットすることを防ぐ。

### グローバルディレクトリの場合（~/.config/superpowers/worktrees）

.gitignore の検証は不要 — プロジェクトの完全に外部にある。

## 作成手順

### 1. プロジェクト名の検出

```bash
project=$(basename "$(git rev-parse --show-toplevel)")
```

### 2. worktree の作成

```bash
# フルパスを決定
case $LOCATION in
  .worktrees|worktrees)
    path="$LOCATION/$BRANCH_NAME"
    ;;
  ~/.config/superpowers/worktrees/*)
    path="~/.config/superpowers/worktrees/$project/$BRANCH_NAME"
    ;;
esac

# 新しいブランチで worktree を作成
git worktree add "$path" -b "$BRANCH_NAME"
cd "$path"
```

### 3. プロジェクトセットアップの実行

自動検出して適切なセットアップを実行する:

```bash
# Node.js
if [ -f package.json ]; then npm install; fi

# Rust
if [ -f Cargo.toml ]; then cargo build; fi

# Python
if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
if [ -f pyproject.toml ]; then poetry install; fi

# Go
if [ -f go.mod ]; then go mod download; fi
```

### 4. クリーンなベースラインの検証

worktree がクリーンな状態で開始されることをテストで確認する:

```bash
# 例 - プロジェクトに適したコマンドを使用
npm test
cargo test
pytest
go test ./...
```

**テストが失敗した場合:** 失敗を報告し、続行するか調査するかを確認する。

**テストが通った場合:** 準備完了を報告する。

### 5. 場所の報告

```
worktree の準備完了: <full-path>
テスト通過（<N> テスト、0 失敗）
<feature-name> の実装準備完了
```

## クイックリファレンス

| 状況 | アクション |
|-----------|--------|
| `.worktrees/` が存在する | 使用する（ignore を確認） |
| `worktrees/` が存在する | 使用する（ignore を確認） |
| 両方存在する | `.worktrees/` を使用する |
| どちらも存在しない | CLAUDE.md を確認 → ユーザーに確認 |
| ディレクトリが ignore されていない | .gitignore に追加 + コミット |
| ベースライン中にテスト失敗 | 失敗を報告 + 確認 |
| package.json/Cargo.toml がない | 依存関係のインストールをスキップ |

## よくある間違い

### ignore の検証をスキップ

- **問題:** worktree の内容が追跡され、git status を汚染する
- **対策:** プロジェクトローカルの worktree を作成する前に必ず `git check-ignore` を使用する

### ディレクトリの場所を仮定する

- **問題:** 不整合が生じ、プロジェクトの慣習に違反する
- **対策:** 優先順位に従う: 既存 > CLAUDE.md > ユーザーに確認

### テスト失敗のまま進める

- **問題:** 新しいバグと既存の問題を区別できない
- **対策:** 失敗を報告し、続行の明示的な許可を得る

### セットアップコマンドのハードコーディング

- **問題:** 異なるツールを使うプロジェクトで壊れる
- **対策:** プロジェクトファイル（package.json など）から自動検出する

## ワークフロー例

```
あなた: using-git-worktrees スキルを使用して隔離されたワークスペースをセットアップします。

[.worktrees/ を確認 - 存在する]
[ignore を確認 - git check-ignore で .worktrees/ が ignore されていることを確認]
[worktree を作成: git worktree add .worktrees/auth -b feature/auth]
[npm install を実行]
[npm test を実行 - 47 通過]

worktree の準備完了: /Users/jesse/myproject/.worktrees/auth
テスト通過（47 テスト、0 失敗）
auth 機能の実装準備完了
```

## 危険信号

**絶対にしないこと:**
- ignore されていることを確認せずに worktree を作成する（プロジェクトローカル）
- ベースラインのテスト検証をスキップする
- テスト失敗のまま確認なしで進める
- 曖昧な状況でディレクトリの場所を仮定する
- CLAUDE.md の確認をスキップする

**必ず行うこと:**
- ディレクトリの優先順位に従う: 既存 > CLAUDE.md > ユーザーに確認
- プロジェクトローカルではディレクトリが ignore されていることを確認する
- プロジェクトセットアップを自動検出して実行する
- クリーンなテストベースラインを検証する

## 連携

**呼び出し元:**
- **brainstorming**（Phase 4） - 設計が承認され実装に進む場合に必須
- **subagent-driven-development** - タスク実行前に必須
- **executing-plans** - タスク実行前に必須
- 隔離されたワークスペースが必要なすべてのスキル

**ペアとなるスキル:**
- **finishing-a-development-branch** - 作業完了後のクリーンアップに必須
