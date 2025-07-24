export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  gradient: string;
  demoUrl: string | null;
  codeUrl: string | null;
  category: string;
  featured: boolean;
  period?: string; // プロジェクト期間（オプショナル）
}

export type ProjectCategory = 'Machine Learning' | 'Web Development' | 'Data Science' | 'JavaScript' | 'Mobile Development' | 'AI/ML';
