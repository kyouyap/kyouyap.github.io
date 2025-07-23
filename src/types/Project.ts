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
  status: '完成' | '開発中' | '計画中';
  featured: boolean;
  period?: string; // プロジェクト期間（オプショナル）
}

export type ProjectCategory = 'Machine Learning' | 'Web Development' | 'Data Science' | 'JavaScript' | 'Mobile Development' | 'AI/ML';

export type ProjectStatus = '完成' | '開発中' | '計画中';
