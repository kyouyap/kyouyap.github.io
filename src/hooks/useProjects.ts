import { useState, useEffect } from 'react';
import type { Project, ProjectCategory } from '../types/Project';
import projectsData from '../data/projects.json';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const loadProjects = async () => {
        try {
          // JSONファイルからプロジェクトデータを読み込み
          setProjects(projectsData as Project[]);
          setLoading(false);
        } catch {
          setError('プロジェクトデータの読み込みに失敗しました');
          setLoading(false);
        }
      };

    loadProjects();
  }, []);

  // フィルタリング関数
  const filterByCategory = (category: ProjectCategory): Project[] => {
    return projects.filter(project => project.category === category);
  };


  const getFeaturedProjects = (): Project[] => {
    return projects.filter(project => project.featured);
  };

  const getProjectById = (id: string): Project | undefined => {
    return projects.find(project => project.id === id);
  };

  // 検索関数
  const searchProjects = (query: string): Project[] => {
    const lowercaseQuery = query.toLowerCase();
    return projects.filter(project => 
      project.title.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      project.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  // カテゴリ一覧を取得
  const getCategories = (): ProjectCategory[] => {
    const categories = projects.map(project => project.category as ProjectCategory);
    return Array.from(new Set(categories));
  };

  return {
    projects,
    loading,
    error,
    filterByCategory,
    getFeaturedProjects,
    getProjectById,
    searchProjects,
    getCategories,
  };
};
