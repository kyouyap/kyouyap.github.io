# Defense-in-Depth バリデーション

## 概要

不正なデータに起因するバグを修正するとき、1箇所にバリデーションを追加すれば十分に思える。しかし、その単一のチェックは別のコードパス、リファクタリング、mock によってバイパスされる可能性がある。

**基本原則:** データが通過するすべてのレイヤーでバリデーションを行う。バグを構造的に不可能にする。

## なぜ複数レイヤーが必要か

単一のバリデーション: 「バグを修正した」
複数レイヤー: 「バグを不可能にした」

異なるレイヤーが異なるケースを捕捉する:
- エントリーバリデーションはほとんどのバグを捕捉
- ビジネスロジックはエッジケースを捕捉
- 環境ガードはコンテキスト固有の危険を防止
- デバッグログは他のレイヤーが失敗したときに役立つ

## 4つのレイヤー

### Layer 1: エントリーポイントバリデーション
**目的:** API 境界で明らかに不正な入力を拒否する

```typescript
function createProject(name: string, workingDirectory: string) {
  if (!workingDirectory || workingDirectory.trim() === '') {
    throw new Error('workingDirectory cannot be empty');
  }
  if (!existsSync(workingDirectory)) {
    throw new Error(`workingDirectory does not exist: ${workingDirectory}`);
  }
  if (!statSync(workingDirectory).isDirectory()) {
    throw new Error(`workingDirectory is not a directory: ${workingDirectory}`);
  }
  // ... proceed
}
```

### Layer 2: ビジネスロジックバリデーション
**目的:** この操作にとってデータが妥当であることを保証する

```typescript
function initializeWorkspace(projectDir: string, sessionId: string) {
  if (!projectDir) {
    throw new Error('projectDir required for workspace initialization');
  }
  // ... proceed
}
```

### Layer 3: 環境ガード
**目的:** 特定のコンテキストで危険な操作を防止する

```typescript
async function gitInit(directory: string) {
  // テストでは、temp ディレクトリ外での git init を拒否
  if (process.env.NODE_ENV === 'test') {
    const normalized = normalize(resolve(directory));
    const tmpDir = normalize(resolve(tmpdir()));

    if (!normalized.startsWith(tmpDir)) {
      throw new Error(
        `Refusing git init outside temp dir during tests: ${directory}`
      );
    }
  }
  // ... proceed
}
```

### Layer 4: デバッグ計装
**目的:** フォレンジックのためにコンテキストをキャプチャする

```typescript
async function gitInit(directory: string) {
  const stack = new Error().stack;
  logger.debug('About to git init', {
    directory,
    cwd: process.cwd(),
    stack,
  });
  // ... proceed
}
```

## パターンの適用方法

バグを見つけたら:

1. **データフローをたどる** - 不正な値はどこで発生し、どこで使われるか？
2. **すべてのチェックポイントをマッピングする** - データが通過するすべてのポイントをリストアップ
3. **各レイヤーにバリデーションを追加する** - エントリー、ビジネス、環境、デバッグ
4. **各レイヤーをテストする** - Layer 1 のバイパスを試みて、Layer 2 が捕捉することを確認

## セッションからの実例

バグ: 空の `projectDir` が原因で、ソースコード内で `git init` が実行された

**データフロー:**
1. テストセットアップ → 空文字列
2. `Project.create(name, '')`
3. `WorkspaceManager.createWorkspace('')`
4. `git init` が `process.cwd()` で実行される

**4つのレイヤーを追加:**
- Layer 1: `Project.create()` が空でない/存在する/書き込み可能を検証
- Layer 2: `WorkspaceManager` が projectDir が空でないことを検証
- Layer 3: `WorktreeManager` がテスト時に tmpdir 外での git init を拒否
- Layer 4: git init 前の stack trace ログ出力

**結果:** 全1847テスト通過、バグの再現が不可能に

## 重要な知見

4つのレイヤーすべてが必要だった。テスト中、各レイヤーが他のレイヤーでは見逃されたバグを捕捉した:
- 異なるコードパスがエントリーバリデーションをバイパスした
- mock がビジネスロジックチェックをバイパスした
- 異なるプラットフォームのエッジケースに環境ガードが必要だった
- デバッグログが構造的な誤用を特定した

**1箇所のバリデーションで満足しないこと。** すべてのレイヤーにチェックを追加する。
