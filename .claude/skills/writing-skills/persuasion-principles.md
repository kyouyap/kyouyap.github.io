# スキル設計のための説得原則

## 概要

LLM は人間と同じ説得原則に反応します。この心理学を理解することで、より効果的なスキルを設計できます - 操作するためではなく、プレッシャー下でも重要な慣行が守られるようにするためです。

**研究基盤：** Meincke et al.（2025）は7つの説得原則を N=28,000 の AI 会話でテストしました。説得技術はコンプライアンス率を2倍以上に高めました（33% → 72%、p < .001）。

## 7つの原則

### 1. Authority（権威）
**概要：** 専門知識、資格、または公式ソースへの敬意。

**スキルでの活用：**
- 命令的な言葉遣い：「YOU MUST」「Never」「Always」
- 交渉不可の枠組み：「No exceptions」
- 判断疲労と合理化を排除

**使用タイミング：**
- 規律強制スキル（TDD、検証要件）
- 安全上重要な慣行
- 確立されたベストプラクティス

**例：**
```markdown
GOOD: Write code before test? Delete it. Start over. No exceptions.
BAD: Consider writing tests first when feasible.
```

### 2. Commitment（コミットメント）
**概要：** 過去の行動、発言、または公的宣言との一貫性。

**スキルでの活用：**
- アナウンスの要求：「Announce skill usage」
- 明示的な選択の強制：「Choose A, B, or C」
- 追跡の使用：TodoWrite でチェックリスト

**使用タイミング：**
- スキルが実際に従われることの保証
- 多段階プロセス
- 説明責任メカニズム

**例：**
```markdown
GOOD: When you find a skill, you MUST announce: "I'm using [Skill Name]"
BAD: Consider letting your partner know which skill you're using.
```

### 3. Scarcity（希少性）
**概要：** 時間制限や限られた利用可能性からの緊急性。

**スキルでの活用：**
- 時間制約付き要件：「Before proceeding」
- 逐次的依存関係：「Immediately after X」
- 先延ばしの防止

**使用タイミング：**
- 即時検証要件
- 時間に敏感なワークフロー
- 「後でやる」の防止

**例：**
```markdown
GOOD: After completing a task, IMMEDIATELY request code review before proceeding.
BAD: You can review code when convenient.
```

### 4. Social Proof（社会的証明）
**概要：** 他者が行っていること、または標準とされていることへの同調。

**スキルでの活用：**
- 普遍的パターン：「Every time」「Always」
- 失敗モード：「X without Y = failure」
- 規範の確立

**使用タイミング：**
- 普遍的な慣行のドキュメント化
- よくある失敗の警告
- 標準の強化

**例：**
```markdown
GOOD: Checklists without TodoWrite tracking = steps get skipped. Every time.
BAD: Some people find TodoWrite helpful for checklists.
```

### 5. Unity（一体感）
**概要：** 共有アイデンティティ、「我々意識」、内集団への帰属。

**スキルでの活用：**
- 協調的な言葉遣い：「our codebase」「we're colleagues」
- 共有目標：「we both want quality」

**使用タイミング：**
- 協調的ワークフロー
- チームカルチャーの確立
- 非階層的な慣行

**例：**
```markdown
GOOD: We're colleagues working together. I need your honest technical judgment.
BAD: You should probably tell me if I'm wrong.
```

### 6. Reciprocity（返報性）
**概要：** 受けた利益に対する返礼の義務。

**スキルでの活用：**
- 控えめに使用 - 操作的に感じる可能性がある
- スキルではほとんど必要ない

**避けるべき場合：**
- ほぼ常に（他の原則の方が効果的）

### 7. Liking（好意）
**概要：** 好きな相手に協力する傾向。

**スキルでの活用：**
- **コンプライアンスのために使用しない**
- 正直なフィードバック文化と矛盾する
- 追従性を生む

**避けるべき場合：**
- 規律の強制では常に

## スキル種類別の原則の組み合わせ

| スキル種類 | 使用する | 避ける |
|------------|-----|-------|
| 規律強制 | Authority + Commitment + Social Proof | Liking、Reciprocity |
| ガイダンス/テクニック | 控えめな Authority + Unity | 強い Authority |
| 協調的 | Unity + Commitment | Authority、Liking |
| リファレンス | 明確さのみ | すべての説得技術 |

## なぜ効果的か：心理学

**明確なルールは合理化を減らす：**
- 「YOU MUST」は判断疲労を排除する
- 絶対的な言葉遣いは「これは例外か？」という疑問を排除する
- 明示的な反合理化カウンターが特定の抜け穴を塞ぐ

**Implementation intentions（実行意図）は自動的な行動を生む：**
- 明確なトリガー + 必要なアクション = 自動的な実行
- 「X のとき、Y を行う」は「一般的に Y を行う」より効果的
- コンプライアンスの認知負荷を軽減

**LLM はパラヒューマン（準人間的）である：**
- これらのパターンを含む人間のテキストで訓練されている
- 訓練データでは Authority の言葉遣いの後にコンプライアンスが続く
- Commitment のシーケンス（発言 → 行動）が頻繁にモデル化されている
- Social Proof のパターン（皆が X を行う）が規範を確立する

## 倫理的使用

**正当な使用：**
- 重要な慣行が守られることの保証
- 効果的なドキュメントの作成
- 予測可能な失敗の防止

**不正な使用：**
- 個人的利益のための操作
- 偽りの緊急性の創出
- 罪悪感に基づくコンプライアンス

**判断基準：** この技術を完全に理解した上で、ユーザーの本当の利益に資するか？

## 研究引用

**Cialdini, R. B. (2021).** *Influence: The Psychology of Persuasion (New and Expanded).* Harper Business.
- 説得の7つの原則
- 影響研究の実証的基盤

**Meincke, L., Shapiro, D., Duckworth, A. L., Mollick, E., Mollick, L., & Cialdini, R. (2025).** Call Me A Jerk: Persuading AI to Comply with Objectionable Requests. University of Pennsylvania.
- N=28,000 の LLM 会話で7つの原則をテスト
- 説得技術でコンプライアンスが 33% → 72% に増加
- Authority、Commitment、Scarcity が最も効果的
- LLM 行動のパラヒューマンモデルを検証

## クイックリファレンス

スキルを設計する際に問いかけること：

1. **どの種類のスキルか？**（規律 vs. ガイダンス vs. リファレンス）
2. **どの行動を変えようとしているか？**
3. **どの原則が適用されるか？**（通常、規律には Authority + Commitment）
4. **組み合わせすぎていないか？**（7つすべてを使わない）
5. **倫理的か？**（ユーザーの本当の利益に資するか？）
