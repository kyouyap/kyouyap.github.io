---
name: pr-code-review
description: Code review a pull request. Use when given a PR number to review, when asked to review a pull request, or when checking code quality of a PR before merge. Fetches diff via GitHub CLI, analyzes changes, and posts inline review comments directly on the PR.
---

# GitHub PR コードレビュー

PR 番号を受け取り、diff を分析し、GitHub にインラインコメント付き PR Review を投稿する。
2 つの専門レビュアー（仕様準拠 + コード品質）を常に並行起動する。

**中核原則:** diff だけでなくファイル全体を読んで文脈を理解し、具体的かつ実用的な指摘をする。

**開始時に宣言:** "code-review スキルを使って PR #{NUMBER} をレビューします。"

## プロセス

### ステップ 1: PR 情報の取得

```bash
# リポジトリ情報
REPO=$(gh repo view --json owner,name --jq '"\(.owner.login)/\(.name)"')

# PR メタ情報
gh pr view {NUMBER} --json title,body,baseRefName,headRefName,additions,deletions,author

# 変更ファイル一覧 + patch
gh api repos/${REPO}/pulls/{NUMBER}/files --jq '.[] | {filename, status, additions, deletions, patch}'
```

PR の目的（title, body）を把握してからコードを読む。目的が不明なら diff から推測する。

### ステップ 1.5: サブレビュアーのモデル選択

以下の優先順位でサブレビュアーに使用するモデルを決定する:

```
1. ユーザーが明示的にモデルを指定（--model sonnet, --model haiku 等）
   → その指定を優先

2. codex:rescue スキルが利用可能 AND rate 制限に達していない
   → codex:rescue（GPT-5.3-codex）を使用
   → 実行時にエラーまたはタイムアウトが発生した場合は 3 にフォールバック

3. 上記以外（Codex CLI 未導入、rate 制限中、エラー等）
   → Claude サブエージェント（sonnet）を使用
```

**宣言に追加:** 「モデル: {選択されたモデル}」

### ステップ 2: コンテキスト準備

ステップ 1 で取得した情報を**共通コンテキストブロック**にまとめる:

```
## PR コンテキスト

**リポジトリ:** {REPO}
**PR番号:** #{NUMBER}
**タイトル:** {TITLE}
**説明:** {BODY}
**著者:** {AUTHOR}
**ベースブランチ:** {BASE_REF}

### 変更ファイル一覧

{各ファイルの filename, status, additions, deletions, patch}
```

このコンテキストブロックは、各サブレビュアーに渡す共通情報となる。

### ステップ 3: 2 つの並行サブレビュアーのディスパッチ

以下の 2 つの専門レビュアーを**読み取り専用サブエージェント**として**並行で**ディスパッチする:

| 観点 | テンプレート | category | 集中領域 |
|------|-------------|----------|----------|
| 仕様準拠・正しさ・安全性 | `./reviewer-spec-compliance.md` | `spec-compliance` | ロジックの正しさ、回帰リスク、エッジケース、セキュリティ |
| 設計品質・保守性 | `./reviewer-code-quality.md` | `code-quality` | アーキテクチャ、コンポーネント設計、テスト充足度 |

**ディスパッチ手順:**

1. 各テンプレートの `{SHARED_CONTEXT}` をステップ 2 で準備した共通コンテキストに置換する
2. 2 つの**読み取り専用**サブエージェントを並行でディスパッチする
   - ステップ 1.5 で選択したモデル/スキルを使用する
3. 各サブエージェントはファイルの読み取りのみを行い、**GitHub への投稿は絶対に行わない**
4. 各サブエージェントは構造化された所見リストを返す

**重要な制約:**
- サブエージェントは読み取り専用（ファイル編集・GitHub 投稿は禁止）
- 各サブエージェントは自分の専門領域に集中する

### ステップ 4: 結果の収集・重複排除・統合

**成功判定:**
- 構造化された所見リストを返した → 成功
- エラー、タイムアウト、パース不能な出力 → 失敗
- 「所見なし」と報告 → 成功（所見 0 件として扱う）

**失敗時の処理:**

```
1 つ失敗 → もう 1 つの結果のみで続行
            レビューサマリに「{perspective} レビューは実行できませんでした」と注記
2 つ失敗 → レビュー実行不可としてユーザーにエラー報告
```

**重複排除手順:**

1. 全所見をフラットリストに集約し、`(path, line)` でソート
2. **同一 path** かつ **行番号差 ≤ 3** の所見をグループ化
3. グループ内で統合:
   - **severity**: 最高重大度を採用（`Critical` > `Important` > `Minor` > `Question` > `Praise`）
   - **reason**: 各レビュアーの指摘を観点ラベル付きで統合
     ```
     [spec-compliance] ループの終了条件に off-by-one エラーがある
     [code-quality] ループ変数の扱いがコンポーネント設計の慣例と異なる
     ```
   - **suggestion**: 最高重大度の所見の修正案を採用
   - **path / line**: 最高重大度の所見のものを採用
4. 単独の所見はそのまま保持

**コメント数上限: 30件**

上限を超えた場合の優先順位:
1. `Critical` の所見を全て含める
2. `Important` の所見を含める
3. `Minor` / `Question` / `Praise` を残り枠に収める
4. 同一重大度内は、**両レビュアーが指摘した箇所**を優先する

### ステップ 5: レビューの投稿

**ステータス自動判定:**

```
Critical or Important がある → REQUEST_CHANGES
Minor or Question のみ → COMMENT
問題なし（Praise のみ） → APPROVE
```

**投稿コマンド:**

```bash
gh api repos/${REPO}/pulls/{NUMBER}/reviews \
  --method POST --input - <<'EOF'
{
  "event": "REQUEST_CHANGES",
  "body": "## Review Summary\n\n### Reviewers\n- ✅ Spec Compliance: N findings\n- ✅ Code Quality: N findings\n\n### Strengths\n- ...\n\n### Issues\n\n**Critical:** N件\n**Important:** N件\n**Minor:** N件\n\n### Assessment\n\n**判定:** Changes Requested\n**理由:** ...",
  "comments": [
    {
      "path": "src/app/page.tsx",
      "line": 15,
      "side": "RIGHT",
      "body": "[Critical] 説明\n\n詳細..."
    }
  ]
}
EOF
```

**コメントの `line` パラメータ:**

- `line`: HEAD 側のファイル内の実際の行番号
- `side`: `"RIGHT"` = 追加・変更行（ほとんどの場合これ）、`"LEFT"` = 削除行
- `start_line` + `start_side`: 複数行コメント（任意）

**JSON 構築の注意:**

- body 内の改行は `\n` でエスケープ
- コメント本文内のダブルクォートは `\"` でエスケープ
- suggestion ブロック内のバッククォートはエスケープ不要

### ステップ 6: 結果の報告

投稿完了後、ユーザーにサマリを提示:

```
PR #{NUMBER} のレビューを投稿しました。

レビュアー:
- ✅ Spec Compliance: N findings
- ✅ Code Quality: N findings

ステータス: REQUEST_CHANGES
コメント: N件（Critical: X, Important: Y, Minor: Z, 重複排除: K件統合）

Strengths:
- ...

Issues:
- [Critical] file.tsx:15 - 概要 [spec-compliance]
- [Important] utils.ts:42 - 概要 [code-quality]

PR URL: https://github.com/{owner}/{repo}/pull/{NUMBER}
```

---

## レビュー品質のルール

**DO:**

- 具体的に書く（file:line を必ず含む）
- なぜ問題かを説明する（根拠を示す）
- 修正案を提示する（suggestion 構文を活用）
- 良い点も指摘する（Praise コメント）
- PR の目的を理解した上で評価する

**DON'T:**

- 変更されていない行にコメントしない
- diff を読まずにファイル全体にスタイル指摘しない
- 些細な指摘を Critical にしない
- 曖昧な指摘をしない（「improve error handling」→ 具体的にどこでどう）
- パフォーマンス的な賞賛をしない（"Looks good!" → 具体的に何が良いか）

## エッジケース

**diff が空の場合:**

- `gh pr view {NUMBER} --json files` で確認
- ファイル変更がなければレビュー不要と報告

**巨大 PR（50+ ファイル、1000+ 行）:**

- 全ファイルをレビューするが、変更量の多いファイルを優先
- GitHub API の comments 上限に注意（30件以内に制限）

**レビュー権限がない場合:**

- `gh api` がエラーを返す → エラー内容をユーザーに報告
- ローカルレビューに切り替え提案

**サブレビュアーが一部失敗:**

- 1 つ失敗: 残りの結果で続行。レビューサマリに失敗を注記
- 2 つ失敗: レビュー実行不可としてエラー報告

## よくあるミス

| Mistake               | Fix                                            |
| --------------------- | ---------------------------------------------- |
| diff だけ見てレビュー | ファイル全体を Read ツールで読む               |
| line 番号の間違い     | patch の行番号と実ファイルの行番号を正確に対応 |
| JSON エスケープ忘れ   | body 内の特殊文字を正しくエスケープ            |
| 全件 Critical         | 実際の重大度で分類する                         |
| 目的を無視した指摘    | PR の title/body をまず読む                    |
| サブエージェントが GitHub に投稿 | テンプレートで「GitHub に投稿してはいけません」を明記 |
| 重複排除をせずに投稿  | ステップ 4 の手順に従い、近接行の所見を統合する |
