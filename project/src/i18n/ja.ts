// project/src/i18n/ja.ts
export const ja = {
  meta: {
    title: "Takuya Ogata — Applied Research Engineer",
    description:
      "AI プロダクトを、研究から現場へ運ぶ Applied Research Engineer。Accenture Japan で生成AI・マルチエージェントを中心に活動。",
  },
  hero: {
    name: "takuya-ogata",
    role: "Applied Research Engineer",
    tagline: "AI プロダクトを、研究から現場へ運ぶ。",
  },
  about: {
    title: "about",
    body: [
      "Accenture Japan / Data Science Consultant (2021— · 2023.12 昇進)。",
      "要件定義 → モデル検証 → フロント／バックエンド実装 → デプロイ → 運用まで一気通貫。",
      "LangChain · LangGraph · RAG · マルチエージェントの領域でチームをリード。",
      "副業的に Web サービス pairkan.com を個人開発・運用中。",
      "",
      "「何を作るか」の段階から関わりたい — Applied Research の文脈で動ける環境を探しています。",
    ],
  },
  now: {
    title: "now",
    items: [
      "Data Science Consultant @ Accenture Japan",
      "Building   pairkan.com  (Next.js 16 + Supabase + Cloudflare Workers, solo)",
      "Working on multi-agent LLM workflow with the strategy team (LangGraph · Next.js · FastAPI · Azure AI Foundry)",
    ],
  },
  experience: { title: "experience" },
  selected:   { title: "selected_work" },
  archive:    { title: "archive", summary: "click to expand · 9 items" },
  github:     { title: "github" },
  skills:     { title: "skills" },
  contact:    {
    title: "contact",
    cmd: "$ ./connect",
    githubLabel: "github",
    twitterLabel: "twitter",
    emailLabel: "email",
  },
};
export type Dict = typeof ja;
