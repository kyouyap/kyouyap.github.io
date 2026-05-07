# Codex ツールマッピング

スキルは Claude Code のツール名を使用します。スキル内でこれらのツール名を見かけた場合は、プラットフォームの対応するツールを使用してください:

| スキルでの参照                                  | Codex での対応ツール                                                                             |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `Task` ツール（サブエージェントのディスパッチ） | `spawn_agent`（[名前付きエージェントのディスパッチ](#名前付きエージェントのディスパッチ)を参照） |
| 複数の `Task` 呼び出し（並列）                  | 複数の `spawn_agent` 呼び出し                                                                    |
| Task が結果を返す                               | `wait`                                                                                           |
| Task が自動的に完了する                         | `close_agent` でスロットを解放                                                                   |
| `TodoWrite`（タスク追跡）                       | `update_plan`                                                                                    |
| `Skill` ツール（スキルの呼び出し）              | スキルはネイティブにロードされる — 指示に従うだけ                                                |
| `Read`, `Write`, `Edit`（ファイル）             | ネイティブのファイルツールを使用                                                                 |
| `Bash`（コマンド実行）                          | ネイティブのシェルツールを使用                                                                   |

## サブエージェントのディスパッチにはマルチエージェントサポートが必要

Codex の設定（`~/.codex/config.toml`）に追加:

```toml
[features]
multi_agent = true
```

これにより `spawn_agent`、`wait`、`close_agent` が有効になり、`dispatching-parallel-agents` や `subagent-driven-development` などのスキルが使えるようになります。

## 名前付きエージェントのディスパッチ

Claude Code のスキルは `code-reviewer` のような名前付きエージェントタイプを参照します。
Codex には名前付きエージェントレジストリがありません — `spawn_agent` は組み込みロール（`default`、`explorer`、`worker`）から汎用エージェントを作成します。

スキルが名前付きエージェントタイプのディスパッチを指示している場合:

1. エージェントのプロンプトファイルを見つける（例: `agents/code-reviewer.md` またはスキルのローカルプロンプトテンプレート `code-quality-reviewer-prompt.md`）
2. プロンプトの内容を読む
3. テンプレートのプレースホルダー（`{BASE_SHA}`、`{WHAT_WAS_IMPLEMENTED}` など）を埋める
4. 埋めた内容を `message` として `worker` エージェントを spawn する

| スキルの指示                                         | Codex での対応                                                                     |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `Task tool (code-reviewer)`                          | `spawn_agent(agent_type="worker", message=...)` に `code-reviewer.md` の内容を使用 |
| `Task tool (general-purpose)` にインラインプロンプト | `spawn_agent(message=...)` に同じプロンプトを使用                                  |

### メッセージのフレーミング

`message` パラメータはユーザーレベルの入力であり、システムプロンプトではありません。指示の遵守を最大化するための構造:

```
Your task is to perform the following. Follow the instructions below exactly.

<agent-instructions>
[エージェントの .md ファイルから埋めたプロンプト内容]
</agent-instructions>

Execute this now. Output ONLY the structured response following the format
specified in the instructions above.
```

- ペルソナフレーミング（"You are..."）ではなく、タスク委任フレーミング（"Your task is..."）を使用する
- 指示を XML タグで囲む — モデルはタグ付きブロックを権威あるものとして扱う
- 指示の要約を防ぐため、明示的な実行指示で終わる

### この回避策が不要になるとき

このアプローチは、Codex のプラグインシステムが `plugin.json` の `agents` フィールドをまだサポートしていないことを補うものです。`RawPluginManifest` に `agents` フィールドが追加されれば、プラグインは `agents/` へのシンボリックリンク（既存の `skills/` シンボリックリンクと同様）を作成でき、スキルは名前付きエージェントタイプを直接ディスパッチできるようになります。

## 環境検出

worktree を作成したりブランチを完了したりするスキルは、処理を進める前に読み取り専用の git コマンドで環境を検出する必要があります:

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
BRANCH=$(git branch --show-current)
```

- `GIT_DIR != GIT_COMMON` → 既にリンクされた worktree 内（作成をスキップ）
- `BRANCH` が空 → detached HEAD（サンドボックスからブランチ/プッシュ/PR 不可）

各スキルがこれらのシグナルをどう使うかは、`using-git-worktrees` Step 0 と `finishing-a-development-branch` Step 1 を参照してください。

## Codex App でのブランチ完了

サンドボックスがブランチ/プッシュ操作をブロックする場合（外部管理の worktree 内の detached HEAD）、エージェントはすべての作業をコミットし、App のネイティブコントロールを使用するようユーザーに通知します:

- **"Create branch"** — ブランチに名前を付け、App UI 経由でコミット/プッシュ/PR
- **"Hand off to local"** — 作業をユーザーのローカルチェックアウトに転送

エージェントは引き続きテストの実行、ファイルのステージング、ユーザーがコピーするためのブランチ名、コミットメッセージ、PR の説明の出力が可能です。
