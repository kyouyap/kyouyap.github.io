---
name: creating-github-issues
description: Use when ユーザーがGitHub issueを作成したいとき、バグ報告・機能要望・タスク・Epicを登録するとき
---

# GitHub Issue 作成

## 概要

対話式でissueタイプを確認し、適切なテンプレートでGitHub issueを作成する。

## 使うべき場面

- バグを報告したい
- 新機能を要望したい
- 作業タスクを登録したい
- Epic（大きな機能計画）を作成したい

## プロセス

```
1. Issueタイプを確認
   ↓
2. タイプ別に必要情報を収集
   ↓
3. gh issue create で作成
```

### 1. Issueタイプの確認

ユーザーに以下から選択してもらう:
- Bug - バグ報告
- Feature - 機能要望
- Task - 作業タスク
- Epic - 大きな機能やプロジェクト

### 2. タイプ別の情報収集

**Bug:**
- バグの説明
- 再現手順
- 期待される動作
- 実際の動作
- 実行環境
- 修正の受け入れ条件 → 2.5で構造化

**Feature:**
- 解決したい問題
- 提案する解決策
- 受け入れ条件 → 2.5で構造化
- 優先度

**Task:**
- タスクの内容
- 完了条件 → 2.5で構造化
- 優先度

**Epic:**
- 概要
- 目的・背景
- 含まれるタスク
- 成功基準 → 2.5で構造化（各サブタスクの受け入れ条件も含む）

### 2.5. 受け入れ条件の整理

セクション2で収集した情報をもとに、受け入れ条件を構造化・補完する。以下の質問で不足を確認する:

1. 「この機能/修正が完了したとき、ユーザーから見てどう変わりますか？」（振る舞い）
2. 「正常系以外に、エラーや境界ケースで確認すべきことはありますか？」
3. 「テストシナリオ（Given/When/Then）も追加しますか？」（任意）

**Epicの場合:** 質問1は Epic 全体の成功基準として扱い、サブタスクごとの受け入れ条件の記載も促す。

質問は1つずつ行い、ユーザーの回答から受け入れ条件を構成してIssue本文に含める。

### 3. Issue作成コマンド

```bash
# Bug
gh issue create --template bug_report.yml --title "[Bug]: タイトル"

# Feature
gh issue create --template feature_request.yml --title "[Feature]: タイトル"

# Task
gh issue create --template task.yml --title "[Task]: タイトル"

# Epic
gh issue create --template epic.yml --title "[Epic]: タイトル"
```

## ラベル対応表

| タイプ | ラベル |
|--------|--------|
| Bug | `bug`, `triage` |
| Feature | `enhancement`, `triage` |
| Task | `task` |
| Epic | `epic`, `enhancement` |

## CLIコマンドリファレンス

```bash
# テンプレート一覧を確認
ls .github/ISSUE_TEMPLATE/

# Issue作成（対話式）
gh issue create

# テンプレート指定で作成
gh issue create --template <template.yml>

# ラベル追加
gh issue create --label "bug,urgent"

# 担当者追加
gh issue create --assignee @me

# Issue一覧
gh issue list

# Issue詳細
gh issue view <number>
```

## よくあるミス

| ミス | 対策 |
|------|------|
| テンプレートを使わない | 必ず `--template` で指定 |
| ラベルの付け忘れ | テンプレートに設定済みのラベルを確認 |
| タイトルの接頭辞忘れ | `[Bug]:`, `[Feature]:` 等を付ける |
| 情報不足のまま作成 | 対話で必須情報を収集してから作成 |
