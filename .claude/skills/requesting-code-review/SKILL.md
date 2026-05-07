---
name: requesting-code-review
description: タスク完了時、主要機能の実装時、またはマージ前に、作業が要件を満たしているか検証するために使用する
---

# コードレビューの依頼

code-reviewer サブエージェントをディスパッチして、問題が連鎖する前に検出する。レビュアーには評価のために精密に構成されたコンテキストを渡す -- セッションの履歴は渡さない。これによりレビュアーは思考プロセスではなく成果物に集中でき、自分のコンテキストも継続作業のために保持される。

**基本原則:** 早くレビュー、頻繁にレビュー。

## レビューを依頼するタイミング

**必須:**

- subagent-driven development での各タスク完了後
- 主要機能の完了後
- main へのマージ前

**任意だが有益:**

- 行き詰まった時（新鮮な視点）
- リファクタリング前（ベースラインの確認）
- 複雑なバグ修正後

## 依頼方法

**1. git SHA を取得:**

```bash
BASE_SHA=$(git rev-parse HEAD~1)  # or origin/main
HEAD_SHA=$(git rev-parse HEAD)
```

**1.5. サブエージェントモデルの選択:**

```bash
# diff の行数を取得
DIFF_LINES=$(git diff --stat ${BASE_SHA}..${HEAD_SHA} | tail -1 | grep -oP '\d+ insertion' | grep -oP '\d+')
DEL_LINES=$(git diff --stat ${BASE_SHA}..${HEAD_SHA} | tail -1 | grep -oP '\d+ deletion' | grep -oP '\d+')
TOTAL=$((${DIFF_LINES:-0} + ${DEL_LINES:-0}))
```

```
ユーザーが明示的にモデルを指定
  → その指定を使用
diff 100行未満 (TOTAL < 100)
  → haiku
diff 100行以上 (TOTAL >= 100)
  → sonnet
```

Agent tool の `model` パラメータに選択したモデルを指定してサブエージェントをディスパッチする。

**2. code-reviewer サブエージェントをディスパッチ:**

Task ツールで code-reviewer タイプを使用し、`code-reviewer.md` のテンプレートを埋める

**プレースホルダー:**

- `{WHAT_WAS_IMPLEMENTED}` - 実装した内容
- `{PLAN_OR_REQUIREMENTS}` - あるべき仕様
- `{BASE_SHA}` - 開始コミット
- `{HEAD_SHA}` - 終了コミット
- `{DESCRIPTION}` - 簡潔なサマリー

**3. フィードバックへの対応:**

- Critical の問題は即座に修正
- Important の問題は次に進む前に修正
- Minor の問題は後で対応としてメモ
- レビュアーが間違っている場合は理由を添えて反論

## 例

```
[タスク 2 完了: 検証関数の追加]

あなた: 次に進む前にコードレビューを依頼しよう。

BASE_SHA=$(git log --oneline | grep "Task 1" | head -1 | awk '{print $1}')
HEAD_SHA=$(git rev-parse HEAD)

[code-reviewer サブエージェントをディスパッチ]
  WHAT_WAS_IMPLEMENTED: 会話インデックスの検証・修復関数
  PLAN_OR_REQUIREMENTS: docs/superpowers/plans/deployment-plan.md のタスク 2
  BASE_SHA: a7981ec
  HEAD_SHA: 3df7661
  DESCRIPTION: 4種類の問題に対応する verifyIndex() と repairIndex() を追加

[サブエージェントの戻り値]:
  強み: クリーンなアーキテクチャ、本物のテスト
  問題:
    Important: 進捗インジケーターの欠如
    Minor: レポート間隔のマジックナンバー (100)
  評価: 次に進んで良い

あなた: [進捗インジケーターを修正]
[タスク 3 へ続行]
```

## ワークフローとの統合

**Subagent-Driven Development:**

- 各タスク後にレビュー
- 問題が複合化する前に検出
- 次のタスクに移る前に修正

**Executing Plans:**

- 各バッチ（3タスク）後にレビュー
- フィードバックを受けて適用し、続行

**アドホック開発:**

- マージ前にレビュー
- 行き詰まった時にレビュー

## 危険信号

**禁止事項:**

- 「シンプルだから」レビューをスキップする
- Critical の問題を無視する
- 未修正の Important の問題を残して進む
- 妥当な技術的フィードバックに対して反論する

**レビュアーが間違っている場合:**

- 技術的な根拠で反論する
- 動作を証明するコード/テストを示す
- 明確化を求める

テンプレートは requesting-code-review/code-reviewer.md を参照。
