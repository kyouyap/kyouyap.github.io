# ビジュアルコンパニオンガイド

モックアップ、図、選択肢を表示するためのブラウザベースのビジュアルブレインストーミングコンパニオン。

## 使用タイミング

セッション単位ではなく、質問単位で判断する。判断基準: **ユーザーはこれを読むより見た方が理解しやすいか?**

**ブラウザを使う** -- コンテンツ自体がビジュアルである場合:

- **UIモックアップ** -- ワイヤーフレーム、レイアウト、ナビゲーション構造、コンポーネントデザイン
- **アーキテクチャ図** -- システムコンポーネント、データフロー、関係マップ
- **ビジュアルの並列比較** -- 2つのレイアウト、2つの配色、2つのデザイン方向の比較
- **デザインの仕上げ** -- 見た目、スペーシング、ビジュアルヒエラルキーに関する質問
- **空間的な関係** -- 状態マシン、フローチャート、ER図を図として描画

**ターミナルを使う** -- コンテンツがテキストまたは表形式の場合:

- **要件とスコープの質問** -- 「Xとはどういう意味ですか?」「どの機能がスコープ内ですか?」
- **概念的なA/B/C選択** -- 言葉で記述されたアプローチ間の選択
- **トレードオフリスト** -- メリット/デメリット、比較表
- **技術的な決定** -- API設計、データモデリング、アーキテクチャアプローチの選択
- **明確化の質問** -- 答えが言葉であり、ビジュアルの好みではないすべてのもの

UIトピック*についての*質問が自動的にビジュアルな質問になるわけではない。「どんなウィザードが欲しいですか?」は概念的 -- ターミナルを使う。「これらのウィザードレイアウトのどれがしっくりきますか?」はビジュアル -- ブラウザを使う。

## 仕組み

サーバーはディレクトリ内のHTMLファイルを監視し、最新のものをブラウザに配信する。HTMLコンテンツを `screen_dir` に書き込むと、ユーザーはブラウザでそれを見て、クリックして選択肢を選べる。選択内容は `state_dir/events` に記録され、次のターンで読み取る。

**コンテンツフラグメント vs 完全なドキュメント:** HTMLファイルが `<!DOCTYPE` または `<html` で始まる場合、サーバーはそのまま配信する（ヘルパースクリプトのみ注入）。それ以外の場合、サーバーは自動的にフレームテンプレートでコンテンツをラップする -- ヘッダー、CSSテーマ、選択インジケーター、すべてのインタラクティブなインフラストラクチャを追加する。**デフォルトではコンテンツフラグメントを書くこと。** ページ全体を完全に制御する必要がある場合のみ、完全なドキュメントを書く。

## セッションの開始

```bash
# 永続化付きでサーバーを開始（モックアップをプロジェクトに保存）
scripts/start-server.sh --project-dir /path/to/project

# 返却値: {"type":"server-started","port":52341,"url":"http://localhost:52341",
#           "screen_dir":"/path/to/project/.superpowers/brainstorm/12345-1706000000/content",
#           "state_dir":"/path/to/project/.superpowers/brainstorm/12345-1706000000/state"}
```

レスポンスから `screen_dir` と `state_dir` を保存する。ユーザーにURLを開くよう伝える。

**接続情報の取得:** サーバーは起動時のJSONを `$STATE_DIR/server-info` に書き込む。サーバーをバックグラウンドで起動して stdout をキャプチャできなかった場合は、そのファイルを読んでURLとポートを取得する。`--project-dir` を使用している場合は、`<project>/.superpowers/brainstorm/` でセッションディレクトリを確認する。

**注意:** モックアップが `.superpowers/brainstorm/` に永続化されサーバー再起動後も残るよう、プロジェクトルートを `--project-dir` として渡す。指定しない場合、ファイルは `/tmp` に保存されクリーンアップされる。`.superpowers/` がまだ `.gitignore` に含まれていない場合は、追加するようユーザーに伝える。

**プラットフォーム別のサーバー起動:**

**Claude Code (macOS / Linux):**
```bash
# デフォルトモードで動作 -- スクリプト自体がサーバーをバックグラウンド化する
scripts/start-server.sh --project-dir /path/to/project
```

**Claude Code (Windows):**
```bash
# Windowsは自動検出してフォアグラウンドモードを使用し、ツールコールをブロックする。
# サーバーが会話のターンをまたいで生存するよう、Bash ツールコールで
# run_in_background: true を設定する。
scripts/start-server.sh --project-dir /path/to/project
```
Bash ツールでこれを呼び出す際は、`run_in_background: true` を設定する。次のターンで `$STATE_DIR/server-info` を読んでURLとポートを取得する。

**Codex:**
```bash
# Codex はバックグラウンドプロセスを刈り取る。スクリプトは CODEX_CI を自動検出し
# フォアグラウンドモードに切り替える。そのまま実行すればよい -- 追加フラグは不要。
scripts/start-server.sh --project-dir /path/to/project
```

**Gemini CLI:**
```bash
# --foreground を使い、シェルツールコールで is_background: true を設定して
# プロセスがターンをまたいで生存するようにする
scripts/start-server.sh --project-dir /path/to/project --foreground
```

**その他の環境:** サーバーは会話のターンをまたいでバックグラウンドで実行し続ける必要がある。環境がデタッチされたプロセスを刈り取る場合は、`--foreground` を使い、プラットフォームのバックグラウンド実行メカニズムでコマンドを起動する。

ブラウザからURLに到達できない場合（リモート/コンテナ環境で一般的）、非ループバックホストをバインドする:

```bash
scripts/start-server.sh \
  --project-dir /path/to/project \
  --host 0.0.0.0 \
  --url-host localhost
```

`--url-host` を使用して、返却されるURL JSONに出力されるホスト名を制御する。

## ループ

1. **サーバーが生存しているか確認**し、`screen_dir` 内の新しいファイルに**HTMLを書き込む**:
   - 書き込みのたびに、`$STATE_DIR/server-info` が存在するか確認する。存在しない場合（または `$STATE_DIR/server-stopped` が存在する場合）、サーバーはシャットダウンしている -- 続行する前に `start-server.sh` で再起動する。サーバーは30分間の非アクティブ後に自動終了する。
   - セマンティックなファイル名を使う: `platform.html`、`visual-style.html`、`layout.html`
   - **ファイル名を再利用しない** -- 各画面には新しいファイルを使う
   - Write ツールを使う -- **cat/heredoc は使わない**（ターミナルにノイズが出力される）
   - サーバーは自動的に最新のファイルを配信する

2. **ユーザーに何を期待すべきか伝え、ターンを終了する:**
   - URLを毎ステップ通知する（最初だけでなく）
   - 画面に表示されている内容の簡潔なテキスト要約を提供する（例: 「ホームページの3つのレイアウトオプションを表示しています」）
   - ターミナルで応答するよう依頼する: 「ご覧になって感想をお聞かせください。選択肢をクリックして選ぶこともできます。」

3. **次のターンで** -- ユーザーがターミナルで応答した後:
   - `$STATE_DIR/events` が存在する場合は読み取る -- ここにはユーザーのブラウザインタラクション（クリック、選択）がJSON行として含まれる
   - ユーザーのターミナルテキストとマージして全体像を把握する
   - ターミナルメッセージが主要なフィードバック; `state_dir/events` は構造化されたインタラクションデータを提供する

4. **反復または進行** -- フィードバックが現在の画面を変更する場合は、新しいファイルを書く（例: `layout-v2.html`）。現在のステップが検証されてから次の質問に進む。

5. **ターミナルに戻る際にアンロード** -- 次のステップでブラウザが不要な場合（例: 明確化の質問、トレードオフの議論）、古いコンテンツをクリアするために待機画面をプッシュする:

   ```html
   <!-- filename: waiting.html (or waiting-2.html, etc.) -->
   <div style="display:flex;align-items:center;justify-content:center;min-height:60vh">
     <p class="subtitle">ターミナルで続行中...</p>
   </div>
   ```

   これにより、会話が先に進んでいるのに、ユーザーが解決済みの選択肢を見続けることを防ぐ。次のビジュアルな質問が来たら、通常通り新しいコンテンツファイルをプッシュする。

6. 完了まで繰り返す。

## コンテンツフラグメントの書き方

ページ内に入るコンテンツだけを書く。サーバーが自動的にフレームテンプレートでラップする（ヘッダー、テーマCSS、選択インジケーター、すべてのインタラクティブインフラストラクチャ）。

**最小限の例:**

```html
<h2>どちらのレイアウトが良いですか?</h2>
<p class="subtitle">可読性とビジュアルヒエラルキーを考慮してください</p>

<div class="options">
  <div class="option" data-choice="a" onclick="toggleSelect(this)">
    <div class="letter">A</div>
    <div class="content">
      <h3>Single Column</h3>
      <p>Clean, focused reading experience</p>
    </div>
  </div>
  <div class="option" data-choice="b" onclick="toggleSelect(this)">
    <div class="letter">B</div>
    <div class="content">
      <h3>Two Column</h3>
      <p>Sidebar navigation with main content</p>
    </div>
  </div>
</div>
```

これだけで完了。`<html>` も CSS も `<script>` タグも不要。サーバーがすべて提供する。

## 利用可能なCSSクラス

フレームテンプレートは、コンテンツ用に以下のCSSクラスを提供する:

### Options（A/B/C選択肢）

```html
<div class="options">
  <div class="option" data-choice="a" onclick="toggleSelect(this)">
    <div class="letter">A</div>
    <div class="content">
      <h3>Title</h3>
      <p>Description</p>
    </div>
  </div>
</div>
```

**複数選択:** コンテナに `data-multiselect` を追加すると、ユーザーが複数のオプションを選択できる。各クリックで項目がトグルされる。インジケーターバーに選択数が表示される。

```html
<div class="options" data-multiselect>
  <!-- 同じオプションマークアップ -- ユーザーは複数の選択/選択解除が可能 -->
</div>
```

### Cards（ビジュアルデザイン）

```html
<div class="cards">
  <div class="card" data-choice="design1" onclick="toggleSelect(this)">
    <div class="card-image"><!-- mockup content --></div>
    <div class="card-body">
      <h3>Name</h3>
      <p>Description</p>
    </div>
  </div>
</div>
```

### モックアップコンテナ

```html
<div class="mockup">
  <div class="mockup-header">Preview: Dashboard Layout</div>
  <div class="mockup-body"><!-- your mockup HTML --></div>
</div>
```

### Split view（並列表示）

```html
<div class="split">
  <div class="mockup"><!-- left --></div>
  <div class="mockup"><!-- right --></div>
</div>
```

### メリット/デメリット

```html
<div class="pros-cons">
  <div class="pros"><h4>Pros</h4><ul><li>Benefit</li></ul></div>
  <div class="cons"><h4>Cons</h4><ul><li>Drawback</li></ul></div>
</div>
```

### モック要素（ワイヤーフレームの構成部品）

```html
<div class="mock-nav">Logo | Home | About | Contact</div>
<div style="display: flex;">
  <div class="mock-sidebar">Navigation</div>
  <div class="mock-content">Main content area</div>
</div>
<button class="mock-button">Action Button</button>
<input class="mock-input" placeholder="Input field">
<div class="placeholder">Placeholder area</div>
```

### タイポグラフィとセクション

- `h2` -- ページタイトル
- `h3` -- セクション見出し
- `.subtitle` -- タイトル下の補足テキスト
- `.section` -- 下マージン付きのコンテンツブロック
- `.label` -- 小さな大文字のラベルテキスト

## ブラウザイベントの形式

ユーザーがブラウザで選択肢をクリックすると、そのインタラクションが `$STATE_DIR/events` に記録される（1行につき1つのJSONオブジェクト）。新しい画面をプッシュすると、ファイルは自動的にクリアされる。

```jsonl
{"type":"click","choice":"a","text":"Option A - Simple Layout","timestamp":1706000101}
{"type":"click","choice":"c","text":"Option C - Complex Grid","timestamp":1706000108}
{"type":"click","choice":"b","text":"Option B - Hybrid","timestamp":1706000115}
```

完全なイベントストリームはユーザーの探索パスを示す -- 最終的に落ち着く前に複数のオプションをクリックすることがある。最後の `choice` イベントが通常最終選択だが、クリックのパターンから迷いや好みが読み取れることがあり、質問する価値がある。

`$STATE_DIR/events` が存在しない場合、ユーザーはブラウザでインタラクションしていない -- ターミナルテキストのみを使用する。

## デザインのヒント

- **質問に合わせて忠実度を調整する** -- レイアウトの質問にはワイヤーフレーム、仕上げの質問にはポリッシュ
- **各ページで質問を説明する** -- 「どちらのレイアウトがよりプロフェッショナルに感じますか?」であって、単に「一つ選んでください」ではない
- **進む前に反復する** -- フィードバックが現在の画面を変更する場合は、新しいバージョンを書く
- 1画面あたり**最大2-4のオプション**
- **重要な場合は実際のコンテンツを使う** -- フォトグラフィーポートフォリオなら、実際の画像を使う（Unsplash）。プレースホルダーコンテンツはデザインの問題を隠す。
- **モックアップはシンプルに** -- レイアウトと構造に集中し、ピクセルパーフェクトなデザインは目指さない

## ファイル命名

- セマンティックな名前を使う: `platform.html`、`visual-style.html`、`layout.html`
- ファイル名を再利用しない -- 各画面は新しいファイルでなければならない
- イテレーション時: `layout-v2.html`、`layout-v3.html` のようにバージョンサフィックスを付ける
- サーバーは変更日時が最新のファイルを配信する

## クリーンアップ

```bash
scripts/stop-server.sh $SESSION_DIR
```

セッションで `--project-dir` を使用した場合、モックアップファイルは `.superpowers/brainstorm/` に残り、後で参照できる。`/tmp` セッションのみ停止時に削除される。

## リファレンス

- フレームテンプレート（CSSリファレンス）: `scripts/frame-template.html`
- ヘルパースクリプト（クライアントサイド）: `scripts/helper.js`
