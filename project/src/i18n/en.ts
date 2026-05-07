// project/src/i18n/en.ts
import type { Dict } from "./ja";
export const en: Dict = {
  meta: {
    title: "Takuya Ogata — FDE / Applied Research Engineer",
    description:
      "Forward Deployed / Applied Research Engineer bringing AI products from research to production. Currently at Accenture Japan, focused on generative AI and multi-agent systems.",
  },
  hero: {
    name: "takuya-ogata",
    role: "Forward Deployed / Applied Research Engineer",
    tagline: "Bringing AI products from research to production.",
  },
  about: {
    title: "about",
    body: [
      "Data Science Consultant at Accenture Japan (2021— · promoted 2023.12).",
      "End-to-end ownership: requirements → modeling → full-stack build → deploy → ops.",
      "Lead teams in LangChain · LangGraph · RAG · multi-agent territory.",
      "Building and running pairkan.com as a personal product on the side.",
      "",
      "Looking for FDE / Applied Research roles where I can engage from the “what to build” stage.",
    ],
  },
  now: {
    title: "now",
    items: [
      "Data Science Consultant @ Accenture Japan",
      "Building   pairkan.com  (Next.js 16 + Supabase + Cloudflare Workers, solo)",
      "Working on a multi-agent LLM workflow with the strategy team (LangGraph · Next.js · FastAPI · Azure AI Foundry)",
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
