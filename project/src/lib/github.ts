export interface LangShare {
  name: string;
  pct: number;
}

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLangs: LangShare[];
  fetchedAt: string;
}

interface GhUser {
  public_repos: number;
  followers: number;
}

interface GhRepo {
  name: string;
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
  language: string | null;
  size: number;
}

const NOISY_LANGS = new Set([
  "Jupyter Notebook",
  "TeX",
  "HTML",
  "Roff",
  "Smalltalk",
]);

const buildHeaders = (): Record<string, string> => {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "kyouyap.github.io/build",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
};

const fetchAllRepos = async (
  username: string,
  headers: Record<string, string>,
): Promise<GhRepo[]> => {
  const all: GhRepo[] = [];
  for (let page = 1; page <= 5; page++) {
    const url = `https://api.github.com/users/${username}/repos?per_page=100&page=${page}&type=owner&sort=updated`;
    const res = await fetch(url, { headers });
    if (!res.ok) {
      throw new Error(`GitHub repos fetch failed: ${res.status} ${res.statusText}`);
    }
    const batch = (await res.json()) as GhRepo[];
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all;
};

const fetchRepoLangs = async (
  username: string,
  repoName: string,
  headers: Record<string, string>,
): Promise<Record<string, number>> => {
  const res = await fetch(
    `https://api.github.com/repos/${username}/${repoName}/languages`,
    { headers },
  );
  if (!res.ok) return {};
  return (await res.json()) as Record<string, number>;
};

export const aggregateLangs = (
  perRepoLangs: Record<string, number>[],
  topN = 6,
  exclude: ReadonlySet<string> = NOISY_LANGS,
): LangShare[] => {
  const total = new Map<string, number>();
  for (const langs of perRepoLangs) {
    for (const [name, bytes] of Object.entries(langs)) {
      if (exclude.has(name)) continue;
      total.set(name, (total.get(name) ?? 0) + bytes);
    }
  }
  const sumBytes = Array.from(total.values()).reduce((a, b) => a + b, 0);
  if (sumBytes === 0) return [];
  return Array.from(total.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([name, bytes]) => ({
      name,
      pct: Math.round((bytes / sumBytes) * 1000) / 10,
    }));
};

export const fetchGitHubStats = async (username: string): Promise<GitHubStats> => {
  const headers = buildHeaders();

  const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
  if (!userRes.ok) {
    throw new Error(`GitHub user fetch failed: ${userRes.status} ${userRes.statusText}`);
  }
  const user = (await userRes.json()) as GhUser;

  const allRepos = await fetchAllRepos(username, headers);
  const ownRepos = allRepos.filter((r) => !r.fork && !r.archived);
  const totalStars = ownRepos.reduce((acc, r) => acc + r.stargazers_count, 0);

  const perRepoLangs = await Promise.all(
    ownRepos.map((r) => fetchRepoLangs(username, r.name, headers)),
  );

  return {
    publicRepos: user.public_repos,
    followers: user.followers,
    totalStars,
    topLangs: aggregateLangs(perRepoLangs),
    fetchedAt: new Date().toISOString().slice(0, 10),
  };
};
