# スキル作成のベストプラクティス

> Claude が発見し、効果的に使用できるスキルの書き方を学びましょう。

優れたスキルは簡潔で、構造が整っており、実際の使用でテストされています。このガイドでは、Claude が発見して効果的に使用できるスキルを書くための実用的な作成判断を提供します。

スキルの仕組みに関する概念的な背景は [Skills overview](/en/docs/agents-and-tools/agent-skills/overview) を参照してください。

## 核心原則

### 簡潔さが鍵

[context window](https://platform.claude.com/docs/en/build-with-claude/context-windows) は公共財です。あなたのスキルは、Claude が知る必要のあるすべてのものとコンテキストウィンドウを共有しています：

* system prompt
* 会話履歴
* 他のスキルのメタデータ
* あなたの実際のリクエスト

スキル内のすべてのトークンに即座のコストがあるわけではありません。起動時にはすべてのスキルのメタデータ（name と description）のみがプリロードされます。Claude は SKILL.md をスキルが関連する場合にのみ読み込み、追加ファイルは必要に応じて読み込みます。ただし、SKILL.md でも簡潔さは重要です：一度ロードされると、すべてのトークンが会話履歴や他のコンテキストと競合します。

**デフォルトの前提：** Claude はすでに非常に賢い

Claude がまだ持っていないコンテキストのみを追加してください。各情報を検討しましょう：

* 「Claude は本当にこの説明を必要としているか？」
* 「Claude はこれを知っていると仮定できるか？」
* 「この段落はトークンコストに見合うか？」

**良い例：簡潔**（約50トークン）：

````markdown  theme={null}
## PDF テキスト抽出

テキスト抽出には pdfplumber を使用：

```python
import pdfplumber

with pdfplumber.open("file.pdf") as pdf:
    text = pdf.pages[0].extract_text()
```
````

**悪い例：冗長すぎる**（約150トークン）：

```markdown  theme={null}
## PDF テキスト抽出

PDF（Portable Document Format）ファイルは、テキスト、画像、その他のコンテンツを含む
一般的なファイル形式です。PDF からテキストを抽出するには、ライブラリを使用する
必要があります。PDF 処理には多くのライブラリがありますが、使いやすく
ほとんどのケースをうまく処理する pdfplumber を推奨します。
まず pip でインストールする必要があります。その後、以下のコードを使用できます...
```

簡潔な版は、Claude が PDF とライブラリの動作を知っていることを前提としています。

### 適切な自由度を設定する

タスクの脆弱性と変動性に応じて具体性のレベルを合わせます。

**高い自由度**（テキストベースの指示）：

以下の場合に使用：

* 複数のアプローチが有効
* 判断がコンテキストに依存
* ヒューリスティクスがアプローチを導く

例：

```markdown  theme={null}
## コードレビュープロセス

1. コードの構造と組織を分析する
2. 潜在的なバグやエッジケースを確認する
3. 可読性と保守性の改善を提案する
4. プロジェクト慣習への準拠を確認する
```

**中程度の自由度**（疑似コードまたはパラメータ付きスクリプト）：

以下の場合に使用：

* 推奨パターンが存在する
* ある程度のバリエーションが許容される
* 設定が動作に影響する

例：

````markdown  theme={null}
## レポート生成

このテンプレートを使用し、必要に応じてカスタマイズ：

```python
def generate_report(data, format="markdown", include_charts=True):
    # データを処理
    # 指定形式で出力を生成
    # オプションで可視化を含める
```
````

**低い自由度**（特定のスクリプト、パラメータ少ない/なし）：

以下の場合に使用：

* 操作が脆弱でエラーが起きやすい
* 一貫性が重要
* 特定の手順に従う必要がある

例：

````markdown  theme={null}
## データベースマイグレーション

このスクリプトを正確に実行：

```bash
python scripts/migrate.py --verify --backup
```

コマンドを変更したり、追加フラグを付けたりしないでください。
````

**アナロジー**：Claude を道を探索するロボットと考えてください：

* **両側が崖の狭い橋**：安全な道は1つだけ。具体的なガードレールと正確な指示を提供（低い自由度）。例：正確な順序で実行する必要があるデータベースマイグレーション。
* **障害物のない開けた野原**：多くの道が成功につながる。大まかな方向を示し、Claude に最適なルートを見つけてもらう（高い自由度）。例：コンテキストが最適なアプローチを決定するコードレビュー。

### 使用予定のすべてのモデルでテストする

スキルはモデルへの追加として機能するため、効果は基盤モデルに依存します。使用予定のすべてのモデルでスキルをテストしてください。

**モデル別テスト考慮事項：**

* **Claude Haiku**（高速、経済的）：スキルは十分なガイダンスを提供しているか？
* **Claude Sonnet**（バランス型）：スキルは明確で効率的か？
* **Claude Opus**（強力な推論）：スキルは過度な説明をしていないか？

Opus で完璧に動作するものでも、Haiku にはより詳細な説明が必要かもしれません。複数モデルでスキルを使用する場合は、すべてで適切に動作する指示を目指してください。

## スキルの構造

<Note>
  **YAML Frontmatter**：SKILL.md の frontmatter には2つのフィールドが必要です：

  * `name` - スキルの人間が読める名前（最大64文字）
  * `description` - スキルの内容と使用タイミングの一行説明（最大1024文字）

  完全なスキル構造の詳細は [Skills overview](/en/docs/agents-and-tools/agent-skills/overview#skill-structure) を参照してください。
</Note>

### 命名規則

スキルの参照と議論を容易にするため、一貫した命名パターンを使用します。スキル名には**動名詞形**（動詞 + -ing）を推奨します。これにより、スキルが提供するアクティビティや能力が明確に記述されます。

**良い命名例（動名詞形）：**

* "Processing PDFs"
* "Analyzing spreadsheets"
* "Managing databases"
* "Testing code"
* "Writing documentation"

**許容される代替：**

* 名詞句："PDF Processing"、"Spreadsheet Analysis"
* アクション指向："Process PDFs"、"Analyze Spreadsheets"

**避けるべき：**

* 曖昧な名前："Helper"、"Utils"、"Tools"
* 過度に汎用的："Documents"、"Data"、"Files"
* スキルコレクション内での一貫性のないパターン

一貫した命名により：

* ドキュメントや会話でスキルを参照しやすくなる
* スキルの内容が一目でわかる
* 複数のスキルを整理・検索しやすくなる
* プロフェッショナルで統一感のあるスキルライブラリを維持できる

### 効果的な description の書き方

`description` フィールドはスキルの発見を可能にし、スキルの内容と使用タイミングの両方を含むべきです。

<Warning>
  **常に三人称で書いてください。** description は system prompt に注入されるため、視点の不整合は発見の問題を引き起こす可能性があります。

  * **良い：** "Processes Excel files and generates reports"
  * **避ける：** "I can help you process Excel files"
  * **避ける：** "You can use this to process Excel files"
</Warning>

**具体的にキーワードを含める。** スキルの内容と、使用すべき具体的なトリガー/コンテキストの両方を含めます。

各スキルには description フィールドが1つだけあります。description はスキル選択に不可欠です：Claude は100以上のスキルから適切なものを選ぶためにこれを使用します。description は Claude がこのスキルを選択するタイミングを知るのに十分な詳細を提供する必要があり、SKILL.md の残りは実装の詳細を提供します。

効果的な例：

**PDF Processing スキル：**

```yaml  theme={null}
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
```

**Excel Analysis スキル：**

```yaml  theme={null}
description: Analyze Excel spreadsheets, create pivot tables, generate charts. Use when analyzing Excel files, spreadsheets, tabular data, or .xlsx files.
```

**Git Commit Helper スキル：**

```yaml  theme={null}
description: Generate descriptive commit messages by analyzing git diffs. Use when the user asks for help writing commit messages or reviewing staged changes.
```

曖昧な description は避けてください：

```yaml  theme={null}
description: Helps with documents
```

```yaml  theme={null}
description: Processes data
```

```yaml  theme={null}
description: Does stuff with files
```

### Progressive disclosure パターン

SKILL.md は、オンボーディングガイドの目次のように、Claude を詳細な資料に誘導する概要として機能します。progressive disclosure の仕組みについては、概要の [How Skills work](/en/docs/agents-and-tools/agent-skills/overview#how-skills-work) を参照してください。

**実用的なガイダンス：**

* SKILL.md 本文は最適なパフォーマンスのために500行以内に保つ
* この制限に近づいたらコンテンツを別ファイルに分割
* 以下のパターンを使用して指示、コード、リソースを効果的に整理

#### 視覚的概要：シンプルからコンプレックスへ

基本的なスキルは、メタデータと指示を含む SKILL.md ファイルだけで始まります：

<img src="https://mintcdn.com/anthropic-claude-docs/4Bny2bjzuGBK7o00/images/agent-skills-simple-file.png?fit=max&auto=format&n=4Bny2bjzuGBK7o00&q=85&s=87782ff239b297d9a9e8e1b72ed72db9" alt="Simple SKILL.md file showing YAML frontmatter and markdown body" data-og-width="2048" width="2048" data-og-height="1153" height="1153" data-path="images/agent-skills-simple-file.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/anthropic-claude-docs/4Bny2bjzuGBK7o00/images/agent-skills-simple-file.png?w=280&fit=max&auto=format&n=4Bny2bjzuGBK7o00&q=85&s=c61cc33b6f5855809907f7fda94cd80e 280w, https://mintcdn.com/anthropic-claude-docs/4Bny2bjzuGBK7o00/images/agent-skills-simple-file.png?w=560&fit=max&auto=format&n=4Bny2bjzuGBK7o00&q=85&s=90d2c0c1c76b36e8d485f49e0810dbfd 560w, https://mintcdn.com/anthropic-claude-docs/4Bny2bjzuGBK7o00/images/agent-skills-simple-file.png?w=840&fit=max&auto=format&n=4Bny2bjzuGBK7o00&q=85&s=ad17d231ac7b0bea7e5b4d58fb4aeabb 840w, https://mintcdn.com/anthropic-claude-docs/4Bny2bjzuGBK7o00/images/agent-skills-simple-file.png?w=1100&fit=max&auto=format&n=4Bny2bjzuGBK7o00&q=85&s=f5d0a7a3c668435bb0aee9a3a8f8c329 1100w, https://mintcdn.com/anthropic-claude-docs/4Bny2bjzuGBK7o00/images/agent-skills-simple-file.png?w=1650&fit=max&auto=format&n=4Bny2bjzuGBK7o00&q=85&s=0e927c1af9de5799cfe557d12249f6e6 1650w, https://mintcdn.com/anthropic-claude-docs/4Bny2bjzuGBK7o00/images/agent-skills-simple-file.png?w=2500&fit=max&auto=format&n=4Bny2bjzuGBK7o00&q=85&s=46bbb1a51dd4c8202a470ac8c80a893d 2500w" />

スキルが成長するにつれて、Claude が必要なときにのみロードする追加コンテンツをバンドルできます：

<img src="https://mintcdn.com/anthropic-claude-docs/4Bny2bjzuGBK7o00/images/agent-skills-bundling-content.png?fit=max&auto=format&n=4Bny2bjzuGBK7o00&q=85&s=a5e0aa41e3d53985a7e3e43668a33ea3" alt="Bundling additional reference files like reference.md and forms.md." data-og-width="2048" width="2048" data-og-height="1327" height="1327" data-path="images/agent-skills-bundling-content.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/anthropic-claude-docs/4Bny2bjzuGBK7o00/images/agent-skills-bundling-content.png?w=280&fit=max&auto=format&n=4Bny2bjzuGBK7o00&q=85&s=f8a0e73783e99b4a643d79eac86b70a2 280w, https://mintcdn.com/anthropic-claude-docs/4Bny2bjzuGBK7o00/images/agent-skills-bundling-content.png?w=560&fit=max&auto=format&n=4Bny2bjzuGBK7o00&q=85&s=dc510a2a9d3f14359416b706f067904a 560w, https://mintcdn.com/anthropic-claude-docs/4Bny2bjzuGBK7o00/images/agent-skills-bundling-content.png?w=840&fit=max&auto=format&n=4Bny2bjzuGBK7o00&q=85&s=82cd6286c966303f7dd914c28170e385 840w, https://mintcdn.com/anthropic-claude-docs/4Bny2bjzuGBK7o00/images/agent-skills-bundling-content.png?w=1100&fit=max&auto=format&n=4Bny2bjzuGBK7o00&q=85&s=56f3be36c77e4fe4b523df209a6824c6 1100w, https://mintcdn.com/anthropic-claude-docs/4Bny2bjzuGBK7o00/images/agent-skills-bundling-content.png?w=1650&fit=max&auto=format&n=4Bny2bjzuGBK7o00&q=85&s=d22b5161b2075656417d56f41a74f3dd 1650w, https://mintcdn.com/anthropic-claude-docs/4Bny2bjzuGBK7o00/images/agent-skills-bundling-content.png?w=2500&fit=max&auto=format&n=4Bny2bjzuGBK7o00&q=85&s=3dd4bdd6850ffcc96c6c45fcb0acd6eb 2500w" />

完全なスキルディレクトリ構造はこのようになります：

```
pdf/
├── SKILL.md              # メイン指示（トリガー時にロード）
├── FORMS.md              # フォーム記入ガイド（必要時にロード）
├── reference.md          # API リファレンス（必要時にロード）
├── examples.md           # 使用例（必要時にロード）
└── scripts/
    ├── analyze_form.py   # ユーティリティスクリプト（実行用、ロードしない）
    ├── fill_form.py      # フォーム記入スクリプト
    └── validate.py       # バリデーションスクリプト
```

#### パターン 1：リファレンス付き高レベルガイド

````markdown  theme={null}
---
name: PDF Processing
description: Extracts text and tables from PDF files, fills forms, and merges documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
---

# PDF Processing

## クイックスタート

pdfplumber でテキスト抽出：
```python
import pdfplumber
with pdfplumber.open("file.pdf") as pdf:
    text = pdf.pages[0].extract_text()
```

## 高度な機能

**フォーム記入**：完全ガイドは [FORMS.md](FORMS.md) を参照
**API リファレンス**：全メソッドは [REFERENCE.md](REFERENCE.md) を参照
**例**：一般的なパターンは [EXAMPLES.md](EXAMPLES.md) を参照
````

Claude は必要なときだけ FORMS.md、REFERENCE.md、または EXAMPLES.md をロードします。

#### パターン 2：ドメイン固有の整理

複数のドメインを持つスキルでは、無関係なコンテキストのロードを避けるため、ドメインごとにコンテンツを整理します。ユーザーが営業指標について質問した場合、Claude は営業関連のスキーマだけを読めばよく、財務やマーケティングデータは不要です。これによりトークン使用量が低く保たれ、コンテキストが集中します。

```
bigquery-skill/
├── SKILL.md (概要とナビゲーション)
└── reference/
    ├── finance.md (売上、請求指標)
    ├── sales.md (商談、パイプライン)
    ├── product.md (API 使用状況、機能)
    └── marketing.md (キャンペーン、アトリビューション)
```

````markdown SKILL.md theme={null}
# BigQuery データ分析

## 利用可能なデータセット

**Finance**：売上、ARR、請求 → [reference/finance.md](reference/finance.md) を参照
**Sales**：商談、パイプライン、アカウント → [reference/sales.md](reference/sales.md) を参照
**Product**：API 使用状況、機能、導入率 → [reference/product.md](reference/product.md) を参照
**Marketing**：キャンペーン、アトリビューション、メール → [reference/marketing.md](reference/marketing.md) を参照

## クイック検索

grep で特定の指標を検索：

```bash
grep -i "revenue" reference/finance.md
grep -i "pipeline" reference/sales.md
grep -i "api usage" reference/product.md
```
````

#### パターン 3：条件付き詳細

基本コンテンツを表示し、高度なコンテンツにリンク：

```markdown  theme={null}
# DOCX Processing

## ドキュメント作成

新規ドキュメントには docx-js を使用。[DOCX-JS.md](DOCX-JS.md) を参照。

## ドキュメント編集

シンプルな編集には XML を直接変更。

**変更追跡の場合**：[REDLINING.md](REDLINING.md) を参照
**OOXML の詳細**：[OOXML.md](OOXML.md) を参照
```

Claude はユーザーがその機能を必要とするときだけ REDLINING.md や OOXML.md を読みます。

### 深いネストの参照を避ける

Claude は、他の参照ファイルから参照されたファイルを部分的にしか読まない場合があります。ネストされた参照に遭遇すると、Claude は完全なファイルを読む代わりに `head -100` のようなコマンドでコンテンツをプレビューする場合があり、情報が不完全になります。

**SKILL.md から1階層の深さに参照を保つ。** すべてのリファレンスファイルは SKILL.md から直接リンクし、Claude が必要なときに完全なファイルを読めるようにします。

**悪い例：深すぎる：**

```markdown  theme={null}
# SKILL.md
See [advanced.md](advanced.md)...

# advanced.md
See [details.md](details.md)...

# details.md
Here's the actual information...
```

**良い例：1階層の深さ：**

```markdown  theme={null}
# SKILL.md

**基本的な使い方**：[SKILL.md 内の指示]
**高度な機能**：[advanced.md](advanced.md) を参照
**API リファレンス**：[reference.md](reference.md) を参照
**例**：[examples.md](examples.md) を参照
```

### 長いリファレンスファイルには目次を付ける

100行を超えるリファレンスファイルには、先頭に目次を含めます。これにより、部分的な読み取りでプレビューする場合でも、Claude が利用可能な情報の全体像を把握できます。

**例：**

```markdown  theme={null}
# API リファレンス

## 目次
- 認証とセットアップ
- コアメソッド（create、read、update、delete）
- 高度な機能（バッチ操作、webhook）
- エラーハンドリングパターン
- コード例

## 認証とセットアップ
...

## コアメソッド
...
```

Claude は完全なファイルを読むか、必要に応じて特定のセクションにジャンプできます。

ファイルシステムベースのアーキテクチャが progressive disclosure をどのように可能にするかの詳細は、以下の上級セクションの [Runtime environment](#runtime-environment) を参照してください。

## ワークフローとフィードバックループ

### 複雑なタスクにはワークフローを使用する

複雑な操作を明確で順序立ったステップに分割します。特に複雑なワークフローでは、Claude がレスポンスにコピーして進捗を確認できるチェックリストを提供します。

**例 1：研究統合ワークフロー**（コードなしのスキル向け）：

````markdown  theme={null}
## 研究統合ワークフロー

このチェックリストをコピーして進捗を追跡：

```
研究進捗：
- [ ] ステップ 1：すべてのソースドキュメントを読む
- [ ] ステップ 2：主要テーマを特定する
- [ ] ステップ 3：主張を相互参照する
- [ ] ステップ 4：構造化されたサマリーを作成する
- [ ] ステップ 5：引用を検証する
```

**ステップ 1：すべてのソースドキュメントを読む**

`sources/` ディレクトリ内の各ドキュメントを確認。主要な論点と裏付けとなる証拠をメモ。

**ステップ 2：主要テーマを特定する**

ソース間のパターンを探す。どのテーマが繰り返し現れるか？ソース間で一致または不一致の箇所は？

**ステップ 3：主張を相互参照する**

各主要な主張について、ソース資料に記載されていることを確認。各ポイントを裏付けるソースをメモ。

**ステップ 4：構造化されたサマリーを作成する**

テーマごとに発見事項を整理。以下を含める：
- 主要な主張
- ソースからの裏付け証拠
- 対立する見解（ある場合）

**ステップ 5：引用を検証する**

すべての主張が正しいソースドキュメントを参照していることを確認。引用が不完全な場合は、ステップ 3 に戻る。
````

この例は、コードを必要としない分析タスクにワークフローがどのように適用されるかを示しています。チェックリストパターンはあらゆる複雑な多段階プロセスに使えます。

**例 2：PDF フォーム記入ワークフロー**（コード付きスキル向け）：

````markdown  theme={null}
## PDF フォーム記入ワークフロー

このチェックリストをコピーして、完了した項目にチェック：

```
タスク進捗：
- [ ] ステップ 1：フォームを分析（analyze_form.py を実行）
- [ ] ステップ 2：フィールドマッピングを作成（fields.json を編集）
- [ ] ステップ 3：マッピングを検証（validate_fields.py を実行）
- [ ] ステップ 4：フォームに記入（fill_form.py を実行）
- [ ] ステップ 5：出力を検証（verify_output.py を実行）
```

**ステップ 1：フォームを分析する**

実行：`python scripts/analyze_form.py input.pdf`

フォームフィールドとその位置を抽出し、`fields.json` に保存。

**ステップ 2：フィールドマッピングを作成する**

`fields.json` を編集して各フィールドに値を追加。

**ステップ 3：マッピングを検証する**

実行：`python scripts/validate_fields.py fields.json`

続行前にバリデーションエラーを修正。

**ステップ 4：フォームに記入する**

実行：`python scripts/fill_form.py input.pdf fields.json output.pdf`

**ステップ 5：出力を検証する**

実行：`python scripts/verify_output.py output.pdf`

検証が失敗した場合は、ステップ 2 に戻る。
````

明確なステップにより、Claude が重要なバリデーションをスキップするのを防ぎます。チェックリストは Claude とあなたの両方が多段階ワークフローの進捗を追跡するのに役立ちます。

### フィードバックループを実装する

**一般的なパターン**：バリデーター実行 → エラー修正 → 繰り返し

このパターンは出力品質を大幅に向上させます。

**例 1：スタイルガイド準拠**（コードなしのスキル向け）：

```markdown  theme={null}
## コンテンツレビュープロセス

1. STYLE_GUIDE.md のガイドラインに従ってコンテンツを下書き
2. チェックリストに対してレビュー：
   - 用語の一貫性を確認
   - 例が標準形式に従っているか確認
   - すべての必須セクションが含まれているか確認
3. 問題が見つかった場合：
   - 各問題を具体的なセクション参照と共にメモ
   - コンテンツを修正
   - チェックリストを再度レビュー
4. すべての要件を満たした場合のみ続行
5. ドキュメントを最終化して保存
```

このパターンは、スクリプトの代わりにリファレンスドキュメントを使用したバリデーションループです。「バリデーター」は STYLE_GUIDE.md であり、Claude が読み取りと比較で確認を行います。

**例 2：ドキュメント編集プロセス**（コード付きスキル向け）：

```markdown  theme={null}
## ドキュメント編集プロセス

1. `word/document.xml` を編集
2. **即座にバリデーション**：`python ooxml/scripts/validate.py unpacked_dir/`
3. バリデーションが失敗した場合：
   - エラーメッセージを注意深く確認
   - XML の問題を修正
   - バリデーションを再実行
4. **バリデーションが通った場合のみ続行**
5. 再構築：`python ooxml/scripts/pack.py unpacked_dir/ output.docx`
6. 出力ドキュメントをテスト
```

バリデーションループはエラーを早期にキャッチします。

## コンテンツガイドライン

### 時間依存の情報を避ける

古くなる情報を含めないでください：

**悪い例：時間依存**（間違いになる）：

```markdown  theme={null}
If you're doing this before August 2025, use the old API.
After August 2025, use the new API.
```

**良い例**（「旧パターン」セクションを使用）：

```markdown  theme={null}
## 現在のメソッド

v2 API エンドポイントを使用：`api.example.com/v2/messages`

## 旧パターン

<details>
<summary>レガシー v1 API（2025-08 に廃止）</summary>

v1 API は以下を使用：`api.example.com/v1/messages`

このエンドポイントはサポートされていません。
</details>
```

旧パターンセクションは、メインコンテンツを散らかすことなく歴史的なコンテキストを提供します。

### 一貫した用語を使用する

1つの用語を選び、スキル全体で使用：

**良い - 一貫性あり：**

* 常に「API endpoint」
* 常に「field」
* 常に「extract」

**悪い - 一貫性なし：**

* 「API endpoint」「URL」「API route」「path」を混在
* 「field」「box」「element」「control」を混在
* 「extract」「pull」「get」「retrieve」を混在

一貫性は Claude が指示を理解し従うのに役立ちます。

## 一般的なパターン

### テンプレートパターン

出力形式のテンプレートを提供します。厳密さのレベルをニーズに合わせます。

**厳格な要件の場合**（API レスポンスやデータ形式など）：

````markdown  theme={null}
## レポート構造

常にこの正確なテンプレート構造を使用：

```markdown
# [分析タイトル]

## エグゼクティブサマリー
[主要な発見の概要（1段落）]

## 主要な発見
- 裏付けデータ付きの発見 1
- 裏付けデータ付きの発見 2
- 裏付けデータ付きの発見 3

## 推奨事項
1. 具体的で実行可能な推奨事項
2. 具体的で実行可能な推奨事項
```
````

**柔軟なガイダンスの場合**（適応が有用な場合）：

````markdown  theme={null}
## レポート構造

妥当なデフォルト形式ですが、分析に基づいて最善の判断を使用：

```markdown
# [分析タイトル]

## エグゼクティブサマリー
[概要]

## 主要な発見
[発見に基づいてセクションを適応]

## 推奨事項
[特定のコンテキストに合わせてカスタマイズ]
```

特定の分析タイプに応じてセクションを調整。
````

### 例パターン

出力品質が例を見ることに依存するスキルでは、通常のプロンプティングと同様に入出力ペアを提供：

````markdown  theme={null}
## コミットメッセージ形式

以下の例に従ってコミットメッセージを生成：

**例 1：**
入力：Added user authentication with JWT tokens
出力：
```
feat(auth): implement JWT-based authentication

Add login endpoint and token validation middleware
```

**例 2：**
入力：Fixed bug where dates displayed incorrectly in reports
出力：
```
fix(reports): correct date formatting in timezone conversion

Use UTC timestamps consistently across report generation
```

**例 3：**
入力：Updated dependencies and refactored error handling
出力：
```
chore: update dependencies and refactor error handling

- Upgrade lodash to 4.17.21
- Standardize error response format across endpoints
```

このスタイルに従う：type(scope): 簡潔な説明、次に詳細な説明。
````

例は、説明だけよりも望ましいスタイルと詳細レベルを Claude に理解させるのに役立ちます。

### 条件付きワークフローパターン

判断ポイントを通じて Claude をガイド：

```markdown  theme={null}
## ドキュメント変更ワークフロー

1. 変更の種類を判断：

   **新規コンテンツの作成？** → 以下の「作成ワークフロー」に従う
   **既存コンテンツの編集？** → 以下の「編集ワークフロー」に従う

2. 作成ワークフロー：
   - docx-js ライブラリを使用
   - ドキュメントをゼロから構築
   - .docx 形式にエクスポート

3. 編集ワークフロー：
   - 既存ドキュメントを展開
   - XML を直接変更
   - 各変更後にバリデーション
   - 完了したら再パック
```

<Tip>
  ワークフローが多くのステップで大規模または複雑になった場合は、別ファイルに分割し、タスクに応じて適切なファイルを読むよう Claude に指示することを検討してください。
</Tip>

## 評価とイテレーション

### まず評価を作成する

**広範なドキュメントを書く前に評価を作成してください。** これにより、スキルが想像上の問題ではなく、実際の問題を解決することを保証します。

**評価駆動開発：**

1. **ギャップの特定**：スキルなしで代表的なタスクに Claude を使用。具体的な失敗や不足しているコンテキストをドキュメント化
2. **評価の作成**：これらのギャップをテストする3つのシナリオを構築
3. **ベースラインの確立**：スキルなしでの Claude のパフォーマンスを測定
4. **最小限の指示を書く**：ギャップに対処し評価に合格するために必要十分なコンテンツを作成
5. **イテレーション**：評価を実行し、ベースラインと比較し、改善

このアプローチにより、実現しないかもしれない要件を予測するのではなく、実際の問題を解決していることを保証します。

**評価の構造：**

```json  theme={null}
{
  "skills": ["pdf-processing"],
  "query": "Extract all text from this PDF file and save it to output.txt",
  "files": ["test-files/document.pdf"],
  "expected_behavior": [
    "Successfully reads the PDF file using an appropriate PDF processing library or command-line tool",
    "Extracts text content from all pages in the document without missing any pages",
    "Saves the extracted text to a file named output.txt in a clear, readable format"
  ]
}
```

<Note>
  この例は、シンプルなテスト基準を持つデータ駆動評価を示しています。現在、これらの評価を実行するための組み込み方法は提供していません。ユーザーは独自の評価システムを作成できます。評価はスキルの効果を測定するための信頼できる情報源です。
</Note>

### Claude と反復的にスキルを開発する

最も効果的なスキル開発プロセスには Claude 自体が関わります。1つの Claude インスタンス（「Claude A」）と共にスキルを作成し、他のインスタンス（「Claude B」）がそれを使用します。Claude A がデザインと改善を手伝い、Claude B が実際のタスクでテストします。これが機能するのは、Claude モデルが効果的なエージェント指示の書き方と、エージェントが必要とする情報の両方を理解しているためです。

**新しいスキルの作成：**

1. **スキルなしでタスクを完了する**：通常のプロンプティングで Claude A と問題に取り組む。作業中に自然とコンテキストを提供し、好みを説明し、手続き的知識を共有する。繰り返し提供する情報に注目する。

2. **再利用可能なパターンを特定する**：タスク完了後、将来の類似タスクに有用なコンテキストを特定。

   **例**：BigQuery 分析に取り組んだ場合、テーブル名、フィールド定義、フィルタリングルール（「テストアカウントは常に除外」など）、一般的なクエリパターンを提供した可能性がある。

3. **Claude A にスキル作成を依頼する**：「使用した BigQuery 分析パターンを捕捉するスキルを作成してください。テーブルスキーマ、命名規則、テストアカウントフィルタリングのルールを含めてください。」

   <Tip>
     Claude モデルはスキルの形式と構造をネイティブに理解しています。Claude にスキル作成を手伝わせるために特別な system prompt や「スキル作成スキル」は必要ありません。単に Claude にスキルの作成を依頼すれば、適切な frontmatter とボディコンテンツを持つ正しく構造化された SKILL.md コンテンツが生成されます。
   </Tip>

4. **簡潔さをレビューする**：Claude A が不必要な説明を追加していないか確認。質問する：「win rate の意味の説明は削除してください - Claude はそれを既に知っています。」

5. **情報アーキテクチャを改善する**：Claude A にコンテンツをより効果的に整理するよう依頼。例：「テーブルスキーマを別のリファレンスファイルに整理してください。後でテーブルを追加するかもしれません。」

6. **類似タスクでテストする**：スキルを Claude B（スキルがロードされた新しいインスタンス）で関連するユースケースに使用。Claude B が正しい情報を見つけ、ルールを正しく適用し、タスクを成功裏に処理するかを観察。

7. **観察に基づいてイテレーションする**：Claude B が苦戦したり何かを見落としたりした場合は、具体的な内容を Claude A に伝える：「Claude がこのスキルを使ったとき、Q4 の日付フィルタリングを忘れました。日付フィルタリングパターンのセクションを追加すべきでしょうか？」

**既存スキルのイテレーション：**

スキル改善でも同じ階層パターンが続きます。以下を交互に行います：

* **Claude A と作業する**（スキルの改善を手伝う専門家）
* **Claude B でテストする**（スキルを使って実作業を行うエージェント）
* **Claude B の動作を観察し**、洞察を Claude A に持ち帰る

1. **実際のワークフローでスキルを使用する**：Claude B（スキルがロードされた状態）に実際のタスクを与える（テストシナリオではなく）

2. **Claude B の動作を観察する**：苦戦、成功、予想外の選択を記録

   **観察例**：「Claude B にリージョナル売上レポートを依頼したところ、スキルにこのルールが記載されているにもかかわらず、テストアカウントのフィルタリングを忘れてクエリを書きました。」

3. **Claude A に戻って改善する**：現在の SKILL.md を共有し、観察した内容を説明。質問する：「Claude B がリージョナルレポートを依頼されたときにテストアカウントのフィルタリングを忘れたことに気づきました。スキルにはフィルタリングについて記載されていますが、目立ち方が足りないのかもしれません？」

4. **Claude A の提案をレビューする**：Claude A はルールをより目立たせる再構成、「always filter」の代わりに「MUST filter」のような強い言葉遣い、ワークフローセクションの再構成を提案するかもしれません。

5. **変更を適用してテストする**：Claude A の改善でスキルを更新し、類似リクエストで再度 Claude B でテスト

6. **使用に基づいて繰り返す**：新しいシナリオに遭遇するたびにこの観察-改善-テストサイクルを続ける。各イテレーションが仮定ではなく実際のエージェント動作に基づいてスキルを改善。

**チームフィードバックの収集：**

1. スキルをチームメイトと共有し、使用状況を観察
2. 質問する：スキルは期待通りに起動するか？指示は明確か？何が不足しているか？
3. 自分の使用パターンの盲点に対処するためにフィードバックを取り込む

**このアプローチが機能する理由：** Claude A がエージェントのニーズを理解し、あなたがドメインの専門知識を提供し、Claude B が実際の使用を通じてギャップを明らかにし、反復的な改善が仮定ではなく観察された動作に基づいてスキルを改善します。

### Claude がスキルをどのようにナビゲートするか観察する

スキルをイテレーションする際に、Claude が実際にどのようにスキルを使用するかに注意を払ってください。以下を観察：

* **予想外の探索パス**：Claude が予期しない順序でファイルを読んでいないか？構造が想定ほど直感的でない可能性がある
* **見落とされた接続**：Claude が重要なファイルへの参照に従わない？リンクをより明示的または目立つようにする必要があるかもしれない
* **特定セクションへの過度な依存**：Claude が同じファイルを繰り返し読む場合、そのコンテンツをメインの SKILL.md に移すべきか検討
* **無視されるコンテンツ**：Claude がバンドルされたファイルにアクセスしない場合、そのファイルは不要か、メイン指示でのシグナルが不十分な可能性がある

仮定ではなく、これらの観察に基づいてイテレーションしてください。スキルのメタデータの `name` と `description` は特に重要です。Claude は現在のタスクに応じてスキルをトリガーするかどうかを決定する際にこれらを使用します。スキルの内容と使用タイミングを明確に記述してください。

## 避けるべきアンチパターン

### Windows スタイルのパスを避ける

Windows でもファイルパスには常にフォワードスラッシュを使用：

* 良い：`scripts/helper.py`、`reference/guide.md`
* 避ける：`scripts\helper.py`、`reference\guide.md`

Unix スタイルのパスはすべてのプラットフォームで動作しますが、Windows スタイルのパスは Unix システムでエラーを起こします。

### 選択肢を多く提示しすぎない

必要でない限り複数のアプローチを提示しない：

````markdown  theme={null}
**悪い例：選択肢が多すぎる**（混乱を招く）：
"pypdf、pdfplumber、PyMuPDF、pdf2image、どれかを使えます..."

**良い例：デフォルトを提供**（エスケープハッチ付き）：
"テキスト抽出には pdfplumber を使用：
```python
import pdfplumber
```

OCR が必要なスキャン PDF には、代わりに pdf2image と pytesseract を使用。"
````

## 上級：実行可能コード付きスキル

以下のセクションは、実行可能スクリプトを含むスキルに焦点を当てています。Markdown 指示のみのスキルの場合は、[効果的なスキルのチェックリスト](#効果的なスキルのチェックリスト) にスキップしてください。

### 問題を解決する、投げ出さない

スキル用スクリプトを書く際は、Claude に投げ出すのではなくエラー条件を処理してください。

**良い例：エラーを明示的に処理：**

```python  theme={null}
def process_file(path):
    """ファイルを処理し、存在しない場合は作成する。"""
    try:
        with open(path) as f:
            return f.read()
    except FileNotFoundError:
        # 失敗する代わりにデフォルトコンテンツでファイルを作成
        print(f"File {path} not found, creating default")
        with open(path, 'w') as f:
            f.write('')
        return ''
    except PermissionError:
        # 失敗する代わりに代替を提供
        print(f"Cannot access {path}, using default")
        return ''
```

**悪い例：Claude に投げ出す：**

```python  theme={null}
def process_file(path):
    # 失敗させて Claude に任せる
    return open(path).read()
```

設定パラメータも「ブードゥー定数」を避けるために正当化しドキュメント化すべきです（Ousterhout の法則）。正しい値がわからないなら、Claude にもわかりません。

**良い例：自己文書化：**

```python  theme={null}
# HTTP リクエストは通常30秒以内に完了
# 長いタイムアウトは遅い接続に対応
REQUEST_TIMEOUT = 30

# 3回のリトライで信頼性と速度のバランスを取る
# ほとんどの断続的障害は2回目のリトライで解決
MAX_RETRIES = 3
```

**悪い例：マジックナンバー：**

```python  theme={null}
TIMEOUT = 47  # なぜ47？
RETRIES = 5   # なぜ5？
```

### ユーティリティスクリプトを提供する

Claude がスクリプトを書けるとしても、事前作成スクリプトには利点があります：

**ユーティリティスクリプトの利点：**

* 生成コードより信頼性が高い
* トークンを節約（コンテキストにコードを含める必要がない）
* 時間を節約（コード生成が不要）
* 使用間の一貫性を保証

<img src="https://mintcdn.com/anthropic-claude-docs/4Bny2bjzuGBK7o00/images/agent-skills-executable-scripts.png?fit=max&auto=format&n=4Bny2bjzuGBK7o00&q=85&s=4bbc45f2c2e0bee9f2f0d5da669bad00" alt="Bundling executable scripts alongside instruction files" data-og-width="2048" width="2048" data-og-height="1154" height="1154" data-path="images/agent-skills-executable-scripts.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/anthropic-claude-docs/4Bny2bjzuGBK7o00/images/agent-skills-executable-scripts.png?w=280&fit=max&auto=format&n=4Bny2bjzuGBK7o00&q=85&s=9a04e6535a8467bfeea492e517de389f 280w, https://mintcdn.com/anthropic-claude-docs/4Bny2bjzuGBK7o00/images/agent-skills-executable-scripts.png?w=560&fit=max&auto=format&n=4Bny2bjzuGBK7o00&q=85&s=e49333ad90141af17c0d7651cca7216b 560w, https://mintcdn.com/anthropic-claude-docs/4Bny2bjzuGBK7o00/images/agent-skills-executable-scripts.png?w=840&fit=max&auto=format&n=4Bny2bjzuGBK7o00&q=85&s=954265a5df52223d6572b6214168c428 840w, https://mintcdn.com/anthropic-claude-docs/4Bny2bjzuGBK7o00/images/agent-skills-executable-scripts.png?w=1100&fit=max&auto=format&n=4Bny2bjzuGBK7o00&q=85&s=2ff7a2d8f2a83ee8af132b29f10150fd 1100w, https://mintcdn.com/anthropic-claude-docs/4Bny2bjzuGBK7o00/images/agent-skills-executable-scripts.png?w=1650&fit=max&auto=format&n=4Bny2bjzuGBK7o00&q=85&s=48ab96245e04077f4d15e9170e081cfb 1650w, https://mintcdn.com/anthropic-claude-docs/4Bny2bjzuGBK7o00/images/agent-skills-executable-scripts.png?w=2500&fit=max&auto=format&n=4Bny2bjzuGBK7o00&q=85&s=0301a6c8b3ee879497cc5b5483177c90 2500w" />

上の図は、実行可能スクリプトが指示ファイルとどのように連携するかを示しています。指示ファイル（forms.md）がスクリプトを参照し、Claude はコンテンツをコンテキストにロードせずに実行できます。

**重要な区別**：指示で Claude が以下のどちらをすべきか明確にしてください：

* **スクリプトを実行する**（最も一般的）：「`analyze_form.py` を実行してフィールドを抽出」
* **リファレンスとして読む**（複雑なロジックの場合）：「フィールド抽出アルゴリズムは `analyze_form.py` を参照」

ほとんどのユーティリティスクリプトでは、実行の方が信頼性が高く効率的です。スクリプト実行の仕組みについては、以下の [Runtime environment](#runtime-environment) セクションを参照してください。

**例：**

````markdown  theme={null}
## ユーティリティスクリプト

**analyze_form.py**：PDF からすべてのフォームフィールドを抽出

```bash
python scripts/analyze_form.py input.pdf > fields.json
```

出力形式：
```json
{
  "field_name": {"type": "text", "x": 100, "y": 200},
  "signature": {"type": "sig", "x": 150, "y": 500}
}
```

**validate_boxes.py**：バウンディングボックスの重複を確認

```bash
python scripts/validate_boxes.py fields.json
# 戻り値："OK" またはコンフリクト一覧
```

**fill_form.py**：フィールド値を PDF に適用

```bash
python scripts/fill_form.py input.pdf fields.json output.pdf
```
````

### ビジュアル分析を使用する

入力を画像としてレンダリングできる場合、Claude に分析させる：

````markdown  theme={null}
## フォームレイアウト分析

1. PDF を画像に変換：
   ```bash
   python scripts/pdf_to_images.py form.pdf
   ```

2. 各ページ画像を分析してフォームフィールドを特定
3. Claude はフィールドの位置とタイプを視覚的に確認可能
````

<Note>
  この例では、`pdf_to_images.py` スクリプトを自分で書く必要があります。
</Note>

Claude のビジョン機能はレイアウトや構造の理解に役立ちます。

### 検証可能な中間出力を作成する

Claude が複雑でオープンエンドなタスクを実行する際にミスをする可能性があります。「計画-検証-実行」パターンは、構造化された形式で計画を作成し、実行前にスクリプトで検証することで、エラーを早期にキャッチします。

**例**：スプレッドシートに基づいて PDF の50のフォームフィールドを更新するよう Claude に依頼することを想像してください。検証なしでは、Claude は存在しないフィールドを参照したり、矛盾する値を作成したり、必須フィールドを見落としたり、更新を誤って適用する可能性があります。

**解決策**：上記のワークフローパターン（PDF フォーム記入）を使用しますが、変更を適用する前に検証される中間 `changes.json` ファイルを追加します。ワークフローは：分析 → **計画ファイル作成** → **計画検証** → 実行 → 検証 となります。

**このパターンが機能する理由：**

* **エラーの早期発見**：変更が適用される前にバリデーションが問題を検出
* **機械的に検証可能**：スクリプトが客観的な検証を提供
* **可逆的な計画**：Claude はオリジナルに触れずに計画をイテレーション可能
* **明確なデバッグ**：エラーメッセージが具体的な問題を指摘

**使用タイミング**：バッチ操作、破壊的変更、複雑なバリデーションルール、ハイステークス操作。

**実装のヒント**：バリデーションスクリプトを「Field 'signature\_date' not found. Available fields: customer\_name, order\_total, signature\_date\_signed」のような具体的なエラーメッセージで冗長にして、Claude が問題を修正しやすくします。

### 依存関係のパッケージング

スキルはプラットフォーム固有の制限を持つコード実行環境で実行されます：

* **claude.ai**：npm と PyPI からパッケージをインストールでき、GitHub リポジトリからプルできる
* **Anthropic API**：ネットワークアクセスなし、ランタイムパッケージインストールなし

必要なパッケージを SKILL.md にリストし、[コード実行ツールのドキュメント](/en/docs/agents-and-tools/tool-use/code-execution-tool)で利用可能か確認してください。

### Runtime environment

スキルはファイルシステムアクセス、bash コマンド、コード実行機能を持つコード実行環境で実行されます。このアーキテクチャの概念的な説明は、概要の [The Skills architecture](/en/docs/agents-and-tools/agent-skills/overview#the-skills-architecture) を参照してください。

**作成への影響：**

**Claude がスキルにアクセスする方法：**

1. **メタデータのプリロード**：起動時にすべてのスキルの YAML frontmatter の name と description が system prompt にロード
2. **ファイルのオンデマンド読み込み**：Claude は必要に応じて bash Read ツールでファイルシステムから SKILL.md や他のファイルにアクセス
3. **スクリプトの効率的な実行**：ユーティリティスクリプトはコンテンツ全体をコンテキストにロードせず bash 経由で実行可能。スクリプトの出力のみがトークンを消費
4. **大きなファイルのコンテキストペナルティなし**：リファレンスファイル、データ、ドキュメントは実際に読み取られるまでコンテキストトークンを消費しない

* **ファイルパスが重要**：Claude はスキルディレクトリをファイルシステムとしてナビゲート。フォワードスラッシュ（`reference/guide.md`）を使用し、バックスラッシュは使わない
* **ファイルに説明的な名前を付ける**：コンテンツを示す名前を使用：`form_validation_rules.md`（`doc2.md` ではなく）
* **発見しやすい構成にする**：ドメインまたは機能ごとにディレクトリを構造化
  * 良い：`reference/finance.md`、`reference/sales.md`
  * 悪い：`docs/file1.md`、`docs/file2.md`
* **包括的なリソースをバンドル**：完全な API ドキュメント、豊富な例、大きなデータセットを含める；アクセスされるまでコンテキストペナルティなし
* **確定的な操作にはスクリプトを優先**：Claude にバリデーションコードを生成させるのではなく `validate_form.py` を書く
* **実行意図を明確にする**：
  * 「`analyze_form.py` を実行してフィールドを抽出」（実行）
  * 「抽出アルゴリズムは `analyze_form.py` を参照」（リファレンスとして読む）
* **ファイルアクセスパターンをテスト**：実際のリクエストでテストして、Claude がディレクトリ構造をナビゲートできることを確認

**例：**

```
bigquery-skill/
├── SKILL.md (概要、リファレンスファイルへのポインタ)
└── reference/
    ├── finance.md (売上指標)
    ├── sales.md (パイプラインデータ)
    └── product.md (利用状況分析)
```

ユーザーが売上について質問すると、Claude は SKILL.md を読み、`reference/finance.md` への参照を見て、bash でそのファイルだけを読みます。sales.md と product.md はファイルシステム上に残り、必要になるまでコンテキストトークンをゼロ消費します。このファイルシステムベースのモデルが progressive disclosure を可能にしています。Claude は各タスクに必要なものだけをナビゲートして選択的にロードできます。

技術アーキテクチャの完全な詳細は、Skills overview の [How Skills work](/en/docs/agents-and-tools/agent-skills/overview#how-skills-work) を参照してください。

### MCP ツール参照

スキルが MCP（Model Context Protocol）ツールを使用する場合、「tool not found」エラーを避けるため、常に完全修飾ツール名を使用してください。

**形式**：`ServerName:tool_name`

**例：**

```markdown  theme={null}
Use the BigQuery:bigquery_schema tool to retrieve table schemas.
Use the GitHub:create_issue tool to create issues.
```

ここで：

* `BigQuery` と `GitHub` は MCP サーバー名
* `bigquery_schema` と `create_issue` はそれらのサーバー内のツール名

サーバープレフィックスなしでは、特に複数の MCP サーバーが利用可能な場合に Claude がツールを見つけられない可能性があります。

### ツールがインストール済みだと仮定しない

パッケージが利用可能だと仮定しない：

````markdown  theme={null}
**悪い例：インストール済みを仮定**：
"pdf ライブラリを使ってファイルを処理してください。"

**良い例：依存関係を明示**：
"必要なパッケージをインストール：`pip install pypdf`

次に使用：
```python
from pypdf import PdfReader
reader = PdfReader("file.pdf")
```"
````

## 技術的な注意事項

### YAML frontmatter の要件

SKILL.md の frontmatter には `name`（最大64文字）と `description`（最大1024文字）フィールドが必要です。完全な構造の詳細は [Skills overview](/en/docs/agents-and-tools/agent-skills/overview#skill-structure) を参照してください。

### トークンバジェット

最適なパフォーマンスのために SKILL.md 本文を500行以内に保ちます。コンテンツがこれを超える場合は、前述の progressive disclosure パターンを使用して別ファイルに分割します。アーキテクチャの詳細は [Skills overview](/en/docs/agents-and-tools/agent-skills/overview#how-skills-work) を参照してください。

## 効果的なスキルのチェックリスト

スキルを共有する前に確認：

### コア品質

* [ ] description が具体的でキーワードを含む
* [ ] description がスキルの内容と使用タイミングの両方を含む
* [ ] SKILL.md 本文が500行以内
* [ ] 追加の詳細が別ファイルにある（必要な場合）
* [ ] 時間依存の情報がない（または「旧パターン」セクションにある）
* [ ] 全体で一貫した用語
* [ ] 例が抽象的でなく具体的
* [ ] ファイル参照が1階層の深さ
* [ ] progressive disclosure が適切に使用されている
* [ ] ワークフローに明確なステップがある

### コードとスクリプト

* [ ] スクリプトが Claude に投げ出さず問題を解決する
* [ ] エラーハンドリングが明示的で役に立つ
* [ ] 「ブードゥー定数」がない（すべての値が正当化されている）
* [ ] 必要なパッケージが指示にリストされ利用可能であることを確認
* [ ] スクリプトに明確なドキュメントがある
* [ ] Windows スタイルのパスがない（すべてフォワードスラッシュ）
* [ ] 重要な操作にバリデーション/検証ステップがある
* [ ] 品質重視のタスクにフィードバックループが含まれている

### テスト

* [ ] 少なくとも3つの評価が作成されている
* [ ] Haiku、Sonnet、Opus でテスト済み
* [ ] 実際の使用シナリオでテスト済み
* [ ] チームフィードバックが取り込まれている（該当する場合）

## 次のステップ

<CardGroup cols={2}>
  <Card title="Get started with Agent Skills" icon="rocket" href="/en/docs/agents-and-tools/agent-skills/quickstart">
    Create your first Skill
  </Card>

  <Card title="Use Skills in Claude Code" icon="terminal" href="/en/docs/claude-code/skills">
    Create and manage Skills in Claude Code
  </Card>

  <Card title="Use Skills with the API" icon="code" href="/en/api/skills-guide">
    Upload and use Skills programmatically
  </Card>
</CardGroup>
