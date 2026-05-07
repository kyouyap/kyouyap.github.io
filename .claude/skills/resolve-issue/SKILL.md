---
name: resolve-issue
description: "GitHub issue 番号が与えられて、その issue を解決するための設計・実装を行うときに使用する。issue の内容を自動取得し、対話型ワークフローの起点とする。"
---

# GitHub Issue を起点とした対話型ワークフロー

## 概要

GitHub issue 番号を受け取り、issue の内容を自動取得してコンテキストとし、通常の対話型ワークフロー (brainstorming → worktree → plans → implementation → finishing) で issue を解決する。

**中核原則:** issue コンテキストを自動取得 → brainstorming で設計 → 通常ワークフローで実装。

**開始時に宣言:** 「resolve-issue の skill を使って Issue #\<NUMBER\> を解決します。」

## 使用タイミング

**使うとき:**
- ユーザーが GitHub issue 番号を指定して解決を依頼したとき
- 「#42 をやって」「issue 15 を解決して」のような指示があったとき

**使わないとき:**
- issue 番号が指定されていない一般的な機能追加 → `brainstorming` を使う
- PR コメントへの対応 → 別のワークフローを使う
- issue の作成 → `creating-github-issues` を使う

## プロセス

### フェーズ 0: Issue コンテキスト取得 (自動)

Issue 番号を受け取ったら、ユーザーの代わりに以下を自動取得・分析する:

```bash
# Issue の全情報を取得
gh issue view <NUMBER> --json title,body,labels,assignees,milestone,comments
```

取得した情報から以下を分析・提示する:

1. **Issue タイトルと要件サマリ** - 本文を要約
2. **Issue タイプ** - ラベルから判定 (bug / enhancement / task / epic)
3. **完了条件（Acceptance Criteria）**
   - Issueに記載されている受け入れ条件を抽出
   - 振る舞い記述とテストシナリオを分類
   - 不足している場合はユーザーに提案:
     「Issueに受け入れ条件が不足しています。以下を追加しますか？」
     - 正常系で不足しているケース
     - 異常系・境界ケースの候補
   - ユーザーの回答に基づいて受け入れ条件を確定する（提案を修正・追加・削除して最終版を合意）
   - 確定した受け入れ条件をIssueにコメントとして追記:
     ```bash
     gh issue comment <NUMBER> --body "$(cat <<'EOF'
     ## 受け入れ条件（確定）

     ### 振る舞い
     - ...

     ### テストシナリオ
     - Given: ... When: ... Then: ...
     EOF
     )"
     ```
4. **推奨アプローチ** - Issue タイプ別の初期アプローチを提示

提示後、brainstorming の「アイデアを理解する」フェーズに移行:
- 要件の理解が正しいか確認
- 不明点を 1 つずつ質問
- アプローチの選択肢を提示

### フェーズ 1: 設計 → `brainstorming`

Issue コンテキストが取得済みの状態で brainstorming を開始する。

- アイデアを理解する (Issue の要件が起点)
- アプローチを探る (2〜3 案をトレードオフ付きで提示)
- 設計を提示する (200〜300 語のセクションに分けて検証)
- 設計ドキュメントを `docs/plans/YYYY-MM-DD-<topic>-design.md` に保存

### フェーズ 2: 環境準備 → `using-git-worktrees`

worktree で作業ブランチを分離する。

**ブランチ名の形式:**
```
feature/issue-<NUMBER>-<slug>
```

例: `feature/issue-42-add-recurring-template`

### フェーズ 3: 計画作成 → `writing-plans`

実装計画を作成する。計画には以下を必ず含める:
- Issue 番号と Issue タイトルへの参照
- フェーズ 0 で確定した受け入れ条件の全文引用
- 各受け入れ条件に対応するテストタスクの明示的なマッピング:
  「受け入れ条件1 → タスクN のテストで検証」
  「受け入れ条件2 → タスクM のテストで検証」
- 受け入れ条件がすべてテストでカバーされていることの確認
- TDD に基づく一口サイズのタスク分解

### フェーズ 4: 実装 → `subagent-driven-development` / `executing-plans`

計画に基づいて実装する。

- `subagent-driven-development` - このセッションで実装する場合
- `executing-plans` - 別セッションで実装する場合

### フェーズ 5: 完了 → `finishing-a-development-branch`

実装完了後、作業を統合する。

PR を作成する場合は以下のルールに従う:
- `.github/PULL_REQUEST_TEMPLATE.md` に準拠
- 「関連Issue」セクションに `Closes #<NUMBER>` を必ず含める
- PR 作成後に Issue にコメントを追加する:

```bash
gh issue comment <NUMBER> --body "PR #<PR_NUMBER> を作成しました。"
```

## Issue タイプ別の初期アプローチ

| ラベル | 推奨アプローチ |
|--------|--------------|
| `bug` | 再現確認 → 原因特定 → 修正 → 回帰テスト |
| `enhancement` | 要件深掘り → 設計 → 実装 → テスト |
| `task` | タスク内容確認 → 実装 → テスト |
| `epic` | サブ issue への分解を提案 |

## コミット・PR のルール

**コミットプレフィックス (Issue タイプに応じて):**
- bug → `fix:`
- enhancement → `feat:`
- task → `chore:`

**PR 本文:**
- `.github/PULL_REQUEST_TEMPLATE.md` に準拠
- 必ず `Closes #<NUMBER>` を含める

## よくあるミス

| ミス | 対策 |
|------|------|
| Issue を読まずに実装開始 | フェーズ 0 を必ず実行 |
| brainstorming をスキップ | フェーズ 1 は必須 |
| PR に issue リンクを忘れる | `Closes #<NUMBER>` 必須 |
| ブランチ名に issue 番号がない | `feature/issue-<N>-<slug>` 形式 |
| Epic を 1 PR で解決しようとする | 分解を提案 |
| 受け入れ条件を確認しない | フェーズ 0 で抽出し、計画に含める |
| 受け入れ条件が不足したまま実装開始 | フェーズ0で不足を検知し、ユーザーに提案して補完 |
| 受け入れ条件とテストのマッピング漏れ | フェーズ3で全条件がテストでカバーされていることを確認 |

## 連携

**このスキルが使用するスキル:**
- `brainstorming` - フェーズ 1 で使用
- `using-git-worktrees` - フェーズ 2 で使用
- `writing-plans` - フェーズ 3 で使用
- `subagent-driven-development` / `executing-plans` - フェーズ 4 で使用
- `finishing-a-development-branch` - フェーズ 5 で使用

**常時適用スキル:**
- `test-driven-development` - 全実装フェーズで必須
- `verification-before-completion` - コミット・PR 作成前に必須
