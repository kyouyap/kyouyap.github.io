import type { Project } from '../types/Project';

/**
 * プロジェクトデータを管理するためのユーティリティ関数
 */
export class ProjectManager {
  private projects: Project[] = [];

  constructor(projects: Project[]) {
    this.projects = projects;
  }

  /**
   * 新しいプロジェクトを追加
   */
  addProject(project: Project): void {
    this.projects.push(project);
  }

  /**
   * プロジェクトを更新
   */
  updateProject(id: string, updates: Partial<Project>): boolean {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    this.projects[index] = { ...this.projects[index], ...updates };
    return true;
  }

  /**
   * プロジェクトを削除
   */
  removeProject(id: string): boolean {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    this.projects.splice(index, 1);
    return true;
  }

  /**
   * プロジェクトデータをJSON形式で出力
   */
  exportToJSON(): string {
    return JSON.stringify(this.projects, null, 2);
  }

  /**
   * プロジェクトを人気順でソート
   */
  sortByPopularity(): Project[] {
    return [...this.projects].sort((a, b) => {
      // フィーチャープロジェクトを優先
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      return 0;
    });
  }

  /**
   * 技術スタック別の統計を取得
   */
  getTechStats(): Record<string, number> {
    const techCount: Record<string, number> = {};
    
    this.projects.forEach(project => {
      project.tags.forEach(tag => {
        techCount[tag] = (techCount[tag] || 0) + 1;
      });
    });
    
    return techCount;
  }


  /**
   * 最新のプロジェクトを取得（IDベース）
   */
  getLatestProjects(count: number = 3): Project[] {
    return this.projects
      .sort((a, b) => b.id.localeCompare(a.id))
      .slice(0, count);
  }
}
