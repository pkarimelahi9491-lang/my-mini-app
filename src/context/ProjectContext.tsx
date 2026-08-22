import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Brand, ProjectFamily, MetricSummary, ProjectAsset, ProjectSection } from '../types';
import { initialProjectsList } from '../data/initialProjects';
import { initialBrands } from '../data/brands';
import { projectFamilies } from '../data/projectsData';
import { calculateCaseStudyReadinessScore, calculateAssetStatus, calculateContentStatus, calculateFeaturedReadiness } from '../utils/readiness';

interface ProjectContextType {
  projects: Project[];
  brands: Brand[];
  families: ProjectFamily[];
  metrics: MetricSummary;
  
  // Project CRUD
  createProject: (data: Partial<Project>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => void;
  mergeProjects: (targetId: string, sourceId: string) => void;
  
  // Asset Management
  setCover: (projectId: string, assetSrc: string) => void;
  addAsset: (projectId: string, asset: Omit<ProjectAsset, 'id' | 'projectId'>) => void;
  updateAsset: (projectId: string, assetId: string, updates: Partial<ProjectAsset>) => void;
  deleteAsset: (projectId: string, assetId: string) => void;
  reorderAssets: (projectId: string, assetIds: string[]) => void;
  
  // Section Management
  addSection: (projectId: string, section: Omit<ProjectSection, 'id'>) => void;
  updateSection: (projectId: string, sectionId: string, updates: Partial<ProjectSection>) => void;
  deleteSection: (projectId: string, sectionId: string) => void;
  reorderSections: (projectId: string, sectionIds: string[]) => void;
  
  // Data Portability & Storage
  exportJson: () => string;
  importJson: (jsonData: string) => { success: boolean; count: number; error?: string };
  resetToInitial: () => void;
  
  // CMS Modal State
  isManagementDashboardOpen: boolean;
  openManagementDashboard: () => void;
  closeManagementDashboard: () => void;
  
  isEditorOpen: boolean;
  editingProject: Project | null;
  openEditor: (project?: Project) => void;
  closeEditor: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const STORAGE_KEY = 'shadow_design_review_projects_v2';

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load projects from localStorage', e);
    }
    return initialProjectsList;
  });

  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [families] = useState<ProjectFamily[]>(projectFamilies);
  
  // CMS Dialog states
  const [isManagementDashboardOpen, setIsManagementDashboardOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.warn('Failed to persist projects to localStorage', e);
    }
  }, [projects]);

  // Recalculate metrics whenever projects change
  const metrics: MetricSummary = {
    totalProjects: projects.length,
    yearsActive: 3,
    brandsCount: new Set(projects.map(p => p.brand).filter(Boolean)).size || 13,
    websitesCount: projects.filter(p => Array.isArray(p.type) ? p.type.includes('website') : p.type === 'Website').length,
    landingPagesCount: projects.filter(p => Array.isArray(p.type) ? p.type.includes('landing-page') : p.type === 'Landing Page').length,
    mobileExperiencesCount: projects.filter(p => Array.isArray(p.platform) ? p.platform.includes('mobile') || p.platform.includes('ios') : (p.platform || '').includes('Mobile')).length,
    productInterfacesCount: projects.filter(p => Array.isArray(p.type) ? p.type.includes('product') : p.type === 'Product Design').length,
    campaignCount: projects.filter(p => Array.isArray(p.type) ? p.type.includes('campaign') : p.type === 'Campaign').length
  };

  // Helper to re-score a project
  const recomputeProject = (p: Partial<Project>): Project => {
    const score = calculateCaseStudyReadinessScore(p);
    const assetStat = calculateAssetStatus(p);
    const contentStat = calculateContentStatus(p, score);
    const featuredRead = calculateFeaturedReadiness(score, p);

    return {
      ...p,
      caseStudyReadinessScore: score,
      assetStatus: assetStat,
      contentStatus: p.contentStatus || contentStat,
      featuredReadiness: featuredRead
    } as Project;
  };

  // CRUD Operations
  const createProject = (data: Partial<Project>): Project => {
    const id = data.id || `project-${Date.now()}`;
    const slug = data.slug || id;
    const name = data.name || 'New Project';
    
    const newProject = recomputeProject({
      id,
      slug,
      name,
      originalName: name,
      displayNameFa: data.displayNameFa || name,
      displayNameEn: data.displayNameEn || name,
      client: data.client || data.brand || 'Shadow',
      clientFa: data.clientFa || 'سایه',
      brand: data.brand || 'Shadow',
      year: data.year ?? new Date().getFullYear(),
      featured: Boolean(data.featured),
      featuredScore: data.featuredScore ?? 50,
      type: data.type || ['website'],
      typeFa: data.typeFa || 'وب‌سایت و رابط کاربری',
      platform: data.platform || ['desktop', 'mobile', 'responsive'],
      platformFa: data.platformFa || 'دسکتاپ و موبایل',
      shortDescription: data.shortDescription || `${name} — پروژه دیزاین دیجیتال`,
      description: data.description || '',
      scope: data.scope || ['UI/UX Design'],
      services: data.services || ['ui-design', 'responsive-design'],
      disciplines: data.disciplines || ['ui-design'],
      tags: data.tags || [data.brand || 'Digital', 'UI/UX'],
      cover: data.cover || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      gallery: data.gallery || [],
      assets: data.assets || [],
      sections: data.sections || [],
      ...data
    });

    setProjects(prev => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        const merged = { ...p, ...updates };
        return recomputeProject(merged);
      }
      return p;
    }));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const duplicateProject = (id: string) => {
    const target = projects.find(p => p.id === id);
    if (!target) return;

    const cloned: Project = recomputeProject({
      ...target,
      id: `${target.id}-copy-${Date.now().toString().slice(-4)}`,
      slug: `${target.slug}-copy`,
      name: `${target.name} (نسخه کپی)`,
      featured: false,
      featuredScore: Math.max(40, target.featuredScore - 10)
    });

    setProjects(prev => [cloned, ...prev]);
  };

  const mergeProjects = (targetId: string, sourceId: string) => {
    const target = projects.find(p => p.id === targetId);
    const source = projects.find(p => p.id === sourceId);
    if (!target || !source) return;

    // Combine gallery, assets, tags, notes
    const combinedGallery = [...(target.gallery || []), ...(source.gallery || [])];
    const combinedAssets = [...(target.assets || []), ...(source.assets || [])];
    const combinedTags = Array.from(new Set([...(target.tags || []), ...(source.tags || [])]));

    const merged = recomputeProject({
      ...target,
      gallery: combinedGallery,
      assets: combinedAssets,
      tags: combinedTags,
      notes: `${target.notes || ''}\n[ادغام شده از ${source.name}]: ${source.shortDescription || ''}`.trim()
    });

    setProjects(prev => prev.filter(p => p.id !== sourceId).map(p => p.id === targetId ? merged : p));
  };

  // Asset actions
  const setCover = (projectId: string, assetSrc: string) => {
    updateProject(projectId, { cover: assetSrc, thumbnail: assetSrc });
  };

  const addAsset = (projectId: string, assetData: Omit<ProjectAsset, 'id' | 'projectId'>) => {
    const newAsset: ProjectAsset = {
      id: `asset-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      projectId,
      ...assetData
    };

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const assets = [...(p.assets || []), newAsset];
        return recomputeProject({ ...p, assets });
      }
      return p;
    }));
  };

  const updateAsset = (projectId: string, assetId: string, updates: Partial<ProjectAsset>) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const assets = (p.assets || []).map(a => a.id === assetId ? { ...a, ...updates } : a);
        return recomputeProject({ ...p, assets });
      }
      return p;
    }));
  };

  const deleteAsset = (projectId: string, assetId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const assets = (p.assets || []).filter(a => a.id !== assetId);
        return recomputeProject({ ...p, assets });
      }
      return p;
    }));
  };

  const reorderAssets = (projectId: string, assetIds: string[]) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId && p.assets) {
        const sorted = [...p.assets].sort((a, b) => {
          const idxA = assetIds.indexOf(a.id);
          const idxB = assetIds.indexOf(b.id);
          return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
        }).map((a, i) => ({ ...a, order: i + 1 }));

        return recomputeProject({ ...p, assets: sorted });
      }
      return p;
    }));
  };

  // Section actions
  const addSection = (projectId: string, sectionData: Omit<ProjectSection, 'id'>) => {
    const newSection: ProjectSection = {
      id: `sec-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      ...sectionData
    };

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const sections = [...(p.sections || []), newSection];
        return { ...p, sections };
      }
      return p;
    }));
  };

  const updateSection = (projectId: string, sectionId: string, updates: Partial<ProjectSection>) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const sections = (p.sections || []).map(s => s.id === sectionId ? { ...s, ...updates } : s);
        return { ...p, sections };
      }
      return p;
    }));
  };

  const deleteSection = (projectId: string, sectionId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const sections = (p.sections || []).filter(s => s.id !== sectionId);
        return { ...p, sections };
      }
      return p;
    }));
  };

  const reorderSections = (projectId: string, sectionIds: string[]) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId && p.sections) {
        const sorted = [...p.sections].sort((a, b) => {
          const idxA = sectionIds.indexOf(a.id);
          const idxB = sectionIds.indexOf(b.id);
          return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
        }).map((s, i) => ({ ...s, order: i + 1 }));

        return { ...p, sections: sorted };
      }
      return p;
    }));
  };

  // Import / Export / Reset
  const exportJson = (): string => {
    return JSON.stringify(projects, null, 2);
  };

  const importJson = (jsonData: string): { success: boolean; count: number; error?: string } => {
    try {
      const parsed = JSON.parse(jsonData);
      if (!Array.isArray(parsed)) {
        return { success: false, count: 0, error: 'فرمت فایل معتبر نیست (باید آرایه‌ای از پروژه‌ها باشد).' };
      }

      const validProjects = parsed.map(item => recomputeProject(item));
      setProjects(validProjects);
      return { success: true, count: validProjects.length };
    } catch (e: any) {
      return { success: false, count: 0, error: e.message || 'خطا در پارس داده‌های JSON' };
    }
  };

  const resetToInitial = () => {
    setProjects(initialProjectsList);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  };

  // Modal Handlers
  const openManagementDashboard = () => setIsManagementDashboardOpen(true);
  const closeManagementDashboard = () => setIsManagementDashboardOpen(false);

  const openEditor = (project?: Project) => {
    setEditingProject(project || null);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setEditingProject(null);
    setIsEditorOpen(false);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        brands,
        families,
        metrics,
        createProject,
        updateProject,
        deleteProject,
        duplicateProject,
        mergeProjects,
        setCover,
        addAsset,
        updateAsset,
        deleteAsset,
        reorderAssets,
        addSection,
        updateSection,
        deleteSection,
        reorderSections,
        exportJson,
        importJson,
        resetToInitial,
        isManagementDashboardOpen,
        openManagementDashboard,
        closeManagementDashboard,
        isEditorOpen,
        editingProject,
        openEditor,
        closeEditor
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
