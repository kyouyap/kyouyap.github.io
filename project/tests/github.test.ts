import { describe, expect, it } from "vitest";
import { aggregateLangs } from "@/lib/github";

describe("aggregateLangs", () => {
  it("returns empty array for no repos", () => {
    expect(aggregateLangs([])).toEqual([]);
  });

  it("excludes noisy languages by default (Jupyter Notebook etc.)", () => {
    const repos: Record<string, number>[] = [
      { "Jupyter Notebook": 1_000_000 },
      { TypeScript: 5000, Python: 5000 },
    ];
    expect(aggregateLangs(repos)).toEqual([
      { name: "TypeScript", pct: 50 },
      { name: "Python", pct: 50 },
    ]);
  });

  it("aggregates bytes across repos and sorts descending", () => {
    const repos: Record<string, number>[] = [
      { Python: 200, Shell: 50 },
      { TypeScript: 600 },
      { Python: 100, Shell: 50 },
    ];
    expect(aggregateLangs(repos)).toEqual([
      { name: "TypeScript", pct: 60 },
      { name: "Python", pct: 30 },
      { name: "Shell", pct: 10 },
    ]);
  });

  it("respects topN cap", () => {
    const langs = aggregateLangs(
      [{ A: 10, B: 9, C: 8, D: 7 }],
      2,
    );
    expect(langs.map((l) => l.name)).toEqual(["A", "B"]);
  });

  it("supports custom exclude list", () => {
    const langs = aggregateLangs(
      [{ TypeScript: 100, Markdown: 100 }],
      6,
      new Set(["Markdown"]),
    );
    expect(langs).toEqual([{ name: "TypeScript", pct: 100 }]);
  });
});
