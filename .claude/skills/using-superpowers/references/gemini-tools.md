# Gemini CLI ツールマッピング

スキルは Claude Code のツール名を使用します。スキル内でこれらのツール名を見かけた場合は、プラットフォームの対応するツールを使用してください:

| スキルでの参照 | Gemini CLI での対応ツール |
|-----------------|----------------------|
| `Read`（ファイル読み取り） | `read_file` |
| `Write`（ファイル作成） | `write_file` |
| `Edit`（ファイル編集） | `replace` |
| `Bash`（コマンド実行） | `run_shell_command` |
| `Grep`（ファイル内容の検索） | `grep_search` |
| `Glob`（ファイル名での検索） | `glob` |
| `TodoWrite`（タスク追跡） | `write_todos` |
| `Skill` ツール（スキルの呼び出し） | `activate_skill` |
| `WebSearch` | `google_web_search` |
| `WebFetch` | `web_fetch` |
| `Task` ツール（サブエージェントのディスパッチ） | 対応ツールなし — Gemini CLI はサブエージェントをサポートしていない |

## サブエージェントサポートなし

Gemini CLI には Claude Code の `Task` ツールに相当するものがありません。サブエージェントのディスパッチに依存するスキル（`subagent-driven-development`、`dispatching-parallel-agents`）は、`executing-plans` によるシングルセッション実行にフォールバックします。

## Gemini CLI 追加ツール

以下のツールは Gemini CLI で利用可能ですが、Claude Code には対応するものがありません:

| ツール | 用途 |
|------|---------|
| `list_directory` | ファイルとサブディレクトリの一覧表示 |
| `save_memory` | セッション間で GEMINI.md に事実を永続化 |
| `ask_user` | ユーザーからの構造化された入力を要求 |
| `tracker_create_task` | リッチなタスク管理（作成、更新、一覧、可視化） |
| `enter_plan_mode` / `exit_plan_mode` | 変更を加える前に読み取り専用のリサーチモードに切り替え |
