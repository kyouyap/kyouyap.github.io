# Condition-Based Waiting

## 概要

不安定なテストは、任意の遅延でタイミングを推測していることが多い。これにより、高速なマシンでは通るが、高負荷時や CI では失敗する race condition が生まれる。

**基本原則:** 所要時間の推測ではなく、実際に関心のある条件を待つ。

## いつ使うか

```dot
digraph when_to_use {
    "Test uses setTimeout/sleep?" [shape=diamond];
    "Testing timing behavior?" [shape=diamond];
    "Document WHY timeout needed" [shape=box];
    "Use condition-based waiting" [shape=box];

    "Test uses setTimeout/sleep?" -> "Testing timing behavior?" [label="yes"];
    "Testing timing behavior?" -> "Document WHY timeout needed" [label="yes"];
    "Testing timing behavior?" -> "Use condition-based waiting" [label="no"];
}
```

**使用する場面:**
- テストに任意の遅延がある（`setTimeout`、`sleep`、`time.sleep()`）
- テストが不安定（通ったり、高負荷時に失敗したりする）
- 並列実行時にテストがタイムアウトする
- 非同期操作の完了を待つ

**使わない場面:**
- 実際のタイミング動作をテストする場合（debounce、throttle interval）
- 任意のタイムアウトを使う場合は、その理由を必ずドキュメントする

## 基本パターン

```typescript
// BAD: タイミングの推測
await new Promise(r => setTimeout(r, 50));
const result = getResult();
expect(result).toBeDefined();

// GOOD: 条件を待つ
await waitFor(() => getResult() !== undefined);
const result = getResult();
expect(result).toBeDefined();
```

## クイックパターン

| シナリオ | パターン |
|----------|---------|
| イベントを待つ | `waitFor(() => events.find(e => e.type === 'DONE'))` |
| 状態を待つ | `waitFor(() => machine.state === 'ready')` |
| 個数を待つ | `waitFor(() => items.length >= 5)` |
| ファイルを待つ | `waitFor(() => fs.existsSync(path))` |
| 複合条件 | `waitFor(() => obj.ready && obj.value > 10)` |

## 実装

汎用ポーリング関数:
```typescript
async function waitFor<T>(
  condition: () => T | undefined | null | false,
  description: string,
  timeoutMs = 5000
): Promise<T> {
  const startTime = Date.now();

  while (true) {
    const result = condition();
    if (result) return result;

    if (Date.now() - startTime > timeoutMs) {
      throw new Error(`Timeout waiting for ${description} after ${timeoutMs}ms`);
    }

    await new Promise(r => setTimeout(r, 10)); // 10ms ごとにポーリング
  }
}
```

実際のデバッグセッションで使われたドメイン固有のヘルパー（`waitForEvent`、`waitForEventCount`、`waitForEventMatch`）を含む完全な実装は、このディレクトリの `condition-based-waiting-example.ts` を参照。

## よくある間違い

**BAD: ポーリングが速すぎる:** `setTimeout(check, 1)` - CPU を浪費する
**GOOD:** 10ms ごとにポーリング

**BAD: タイムアウトなし:** 条件が満たされなければ永久ループ
**GOOD:** 明確なエラーメッセージ付きのタイムアウトを必ず含める

**BAD: 古いデータ:** ループの前に状態をキャッシュ
**GOOD:** 新鮮なデータを得るためにループ内で getter を呼び出す

## 任意のタイムアウトが正しい場合

```typescript
// ツールは100msごとにtickする - 部分出力を検証するのに2 tick必要
await waitForEvent(manager, 'TOOL_STARTED'); // まず: 条件を待つ
await new Promise(r => setTimeout(r, 200));   // 次に: タイミング動作を待つ
// 200ms = 100ms間隔で2 tick - ドキュメントされ正当化されている
```

**要件:**
1. まずトリガー条件を待つ
2. 既知のタイミングに基づく（推測ではない）
3. 理由を説明するコメント

## 実際の効果

デバッグセッション（2025-10-03）からの実績:
- 3ファイルにまたがる15の不安定なテストを修正
- 通過率: 60% → 100%
- 実行時間: 40%高速化
- race condition がゼロに
