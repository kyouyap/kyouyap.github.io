---
name: writing-plans
description: 複数ステップのタスクに対する仕様や要件があり、コードに触れる前に使用する
---

# Writing Plans

## 概要

コードベースのコンテキストがゼロで、センスが怪しいエンジニアを想定した包括的な実装計画を書く。各タスクでどのファイルに触れるか、コード、テスト、確認すべきドキュメント、テスト方法など、必要なすべてを文書化する。計画全体を一口サイズのタスクとして提供する。DRY。YAGNI。TDD。頻繁なコミット。

エンジニアは熟練した開発者だが、ツールセットや問題領域についてほぼ何も知らないと想定する。良いテスト設計にあまり詳しくないと想定する。

**開始時に宣言:** 「writing-plans スキルを使用して実装計画を作成します。」

**コンテキスト:** これは専用の worktree で実行すべき（brainstorming スキルで作成）。

**計画の保存先:** `docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md`

- （計画の保存場所についてのユーザーの設定はこのデフォルトを上書きする）

## スコープ確認

仕様が複数の独立したサブシステムをカバーしている場合、brainstorming でサブプロジェクト仕様に分割されているべきである。されていない場合、サブシステムごとに別々の計画に分割することを提案する。各計画は単独で動作する、テスト可能なソフトウェアを生成すべきである。

## ファイル構成

タスクを定義する前に、作成・修正するファイルとそれぞれの責務をマッピングする。ここで分解の判断が確定する。

- 明確な境界と well-defined なインターフェースを持つユニットを設計する。各ファイルは明確な責務を1つ持つべき。
- 一度にコンテキストに収まるコードについて最も良い判断ができ、ファイルが焦点を絞っていると編集の信頼性が高まる。多くのことをする大きなファイルより、小さく焦点を絞ったファイルを推奨する。
- 一緒に変更されるファイルは一緒に配置する。技術レイヤーではなく責務で分割する。
- 既存のコードベースでは確立されたパターンに従う。コードベースが大きなファイルを使用している場合、一方的に再構築しない。ただし、修正対象のファイルが扱いにくくなっている場合、計画に分割を含めるのは合理的。

この構成がタスク分解の基盤となる。各タスクは独立して意味のある自己完結した変更を生成すべきである。

## 一口サイズのタスク粒度

**各ステップは1つのアクション（2-5分）:**

- 「失敗するテストを書く」- ステップ
- 「実行して失敗することを確認する」- ステップ
- 「テストをパスさせる最小限のコードを実装する」- ステップ
- 「テストを実行してパスすることを確認する」- ステップ
- 「コミット」- ステップ

## 計画ドキュメントヘッダー

**すべての計画はこのヘッダーで始めること（必須）:**

```markdown
# [機能名] Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** [何を構築するかを1文で説明]

**Architecture:** [アプローチについて2-3文]

**Tech Stack:** [主要な技術/ライブラリ]

---
```

## タスク構造

````markdown
### Task N: [コンポーネント名]

**Files:**

- Create: `exact/path/to/file.py`
- Modify: `exact/path/to/existing.py:123-145`
- Test: `tests/exact/path/to/test.py`

- [ ] **Step 1: 失敗するテストを書く**

```python
def test_specific_behavior():
    result = function(input)
    assert result == expected
```

- [ ] **Step 2: テストを実行して失敗を確認**

Run: `pytest tests/path/test.py::test_name -v`
Expected: FAIL with "function not defined"

- [ ] **Step 3: 最小限の実装を書く**

```python
def function(input):
    return expected
```

- [ ] **Step 4: テストを実行してパスを確認**

Run: `pytest tests/path/test.py::test_name -v`
Expected: PASS

- [ ] **Step 5: コミット**

```bash
git add tests/path/test.py src/path/file.py
git commit -m "feat: add specific feature"
```
````

## プレースホルダー禁止

すべてのステップにエンジニアが必要とする実際の内容を含めること。以下は**計画の失敗**であり、絶対に書かないこと:

- "TBD"、"TODO"、"implement later"、"fill in details"
- "Add appropriate error handling" / "add validation" / "handle edge cases"
- "Write tests for the above"（実際のテストコードなし）
- "Similar to Task N"（コードを繰り返す -- エンジニアはタスクを順不同で読む可能性がある）
- 方法を示さずに何をすべきかだけ記述するステップ（コードステップにはコードブロック必須）
- どのタスクでも定義されていない型、関数、メソッドへの参照

## 注意事項

- 常に正確なファイルパス
- すべてのステップに完全なコード -- ステップがコードを変更するならコードを示す
- 正確なコマンドと期待される出力
- DRY、YAGNI、TDD、頻繁なコミット

## セルフレビュー

計画の完成後、新鮮な目で仕様を見て計画と照合する。これはサブエージェントへのディスパッチではなく、自分自身で実行するチェックリスト。

**1. 仕様カバレッジ:** 仕様の各セクション/要件をざっと確認する。それを実装するタスクを指し示せるか？ギャップをリストする。

**2. プレースホルダースキャン:** 計画内で上記「プレースホルダー禁止」セクションのパターンを検索する。修正する。

**3. 型の一貫性:** 後のタスクで使用した型、メソッドシグネチャ、プロパティ名は、前のタスクで定義したものと一致しているか？ タスク 3 で `clearLayers()` と呼んでいたのにタスク 7 で `clearFullLayers()` になっていたらバグである。

問題を見つけたらインラインで修正する。再レビューは不要 -- 修正して先に進む。仕様の要件にタスクがない場合、タスクを追加する。

## 実行の引き継ぎ

計画を保存した後、実行方法の選択肢を提示する:

**「計画が完成し `docs/superpowers/plans/<filename>.md` に保存しました。2つの実行オプションがあります:**

**1. Subagent-Driven（推奨）** - タスクごとに新しいサブエージェントをディスパッチ、タスク間にレビュー、高速イテレーション

**2. Inline Execution** - このセッションで executing-plans を使用してタスクを実行、チェックポイント付きバッチ実行

**どちらのアプローチにしますか？」**

**Subagent-Driven を選択した場合:**

- **必須サブスキル:** subagent-driven-development を使用
- タスクごとに新しいサブエージェント + 2段階レビュー

**Inline Execution を選択した場合:**

- **必須サブスキル:** executing-plans を使用
- チェックポイント付きバッチ実行
