import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  Project, 
  Brand, 
  ProjectFamily, 
  MetricSummary, 
  ProjectAsset, 
  ProjectSection,
  BrandPictogramProject,
  DigitalCatalogProject,
  SiteSettings,
  SiteHeroSettings,
  SiteKpiCard,
  SiteSectionVisibility,
  SiteProfileSettings,
  SitePresentationSettings
} from '../types';
import { initialProjectsList } from '../data/initialProjects';
import { initialBrands } from '../data/brands';
import { projectFamilies } from '../data/projectsData';
import { INITIAL_PICTOGRAM_PROJECTS } from '../data/pictogramProjects';
import { INITIAL_CATALOG_PROJECTS } from '../data/catalogProjects';
import { INITIAL_SITE_SETTINGS } from '../data/siteSettings';
import { calculateCaseStudyReadinessScore, calculateAssetStatus, calculateContentStatus, calculateFeaturedReadiness } from '../utils/readiness';

interface FullBackupData {
  version: string;
  exportDate: string;
  projects: Project[];
  pictogramProjects: BrandPictogramProject[];
  catalogProjects: DigitalCatalogProject[];
  siteSettings: SiteSettings;
  brands: Brand[];
}

interface ProjectContextType {
  // Datasets
  projects: Project[];
  pictogramProjects: BrandPictogramProject[];
  catalogProjects: DigitalCatalogProject[];
  siteSettings: SiteSettings;
  brands: Brand[];
  families: ProjectFamily[];
  metrics: MetricSummary;
  
  // Project CRUD
  createProject: (data: Partial<Project>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => void;
  mergeProjects: (targetId: string, sourceId: string) => void;
  toggleFeatured: (id: string) => void;
  
  // Pictogram CRUD
  createPictogramProject: (data: Partial<BrandPictogramProject>) => BrandPictogramProject;
  updatePictogramProject: (id: string, updates: Partial<BrandPictogramProject>) => void;
  deletePictogramProject: (id: string) => void;
  duplicatePictogramProject: (id: string) => void;

  // Catalog CRUD
  createCatalogProject: (data: Partial<DigitalCatalogProject>) => DigitalCatalogProject;
  updateCatalogProject: (id: string, updates: Partial<DigitalCatalogProject>) => void;
  deleteCatalogProject: (id: string) => void;
  duplicateCatalogProject: (id: string) => void;

  // Site Settings & Sections
  updateSiteSettings: (updates: Partial<SiteSettings>) => void;
  updateHeroSettings: (updates: Partial<SiteHeroSettings>) => void;
  updateKpiCards: (kpis: SiteKpiCard[]) => void;
  updateSectionVisibility: (updates: Partial<SiteSectionVisibility>) => void;
  updateProfileSettings: (updates: Partial<SiteProfileSettings>) => void;
  updatePresentationSettings: (updates: Partial<SitePresentationSettings>) => void;

  // Brand Management
  createBrand: (brand: Brand) => void;
  updateBrand: (id: string, updates: Partial<Brand>) => void;
  deleteBrand: (id: string) => void;
  
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
  
  // Universal Import / Export & Storage
  exportJson: () => string;
  exportFullBackupJson: () => string;
  exportTypeScriptData: (type?: 'projects' | 'pictograms' | 'catalogs' | 'settings' | 'brands') => string;
  importJson: (jsonData: string) => { success: boolean; count: number; error?: string };
  importFullBackupJson: (jsonData: string) => { success: boolean; error?: string };
  resetToInitial: () => void;
  resetAllToInitial: () => void;
  
  // CMS Modals State
  isManagementDashboardOpen: boolean;
  openManagementDashboard: () => void;
  closeManagementDashboard: () => void;
  
  isEditorOpen: boolean;
  editingProject: Project | null;
  openEditor: (project?: Project) => void;
  closeEditor: () => void;

  isPictogramEditorOpen: boolean;
  editingPictogram: BrandPictogramProject | null;
  openPictogramEditor: (project?: BrandPictogramProject) => void;
  closePictogramEditor: () => void;

  isCatalogEditorOpen: boolean;
  editingCatalog: DigitalCatalogProject | null;
  openCatalogEditor: (catalog?: DigitalCatalogProject) => void;
  closeCatalogEditor: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const STORAGE_KEY_PROJECTS = 'shadow_portfolio_projects_v9';
const STORAGE_KEY_PICTOGRAMS = 'shadow_portfolio_pictograms_v8';
const STORAGE_KEY_CATALOGS = 'shadow_portfolio_catalogs_v6';
const STORAGE_KEY_SETTINGS = 'shadow_portfolio_settings_v6';
const STORAGE_KEY_BRANDS = 'shadow_portfolio_brands_v6';

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Projects State
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load projects from localStorage', e);
    }
    return initialProjectsList;
  });

  // 2. Pictogram Projects State
  const [pictogramProjects, setPictogramProjects] = useState<BrandPictogramProject[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PICTOGRAMS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load pictograms from localStorage', e);
    }
    return INITIAL_PICTOGRAM_PROJECTS;
  });

  // 3. Digital Catalog Projects State
  const [catalogProjects, setCatalogProjects] = useState<DigitalCatalogProject[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CATALOGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load catalogs from localStorage', e);
    }
    return INITIAL_CATALOG_PROJECTS;
  });

  // 4. Site Settings State
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.hero) {
          return { ...INITIAL_SITE_SETTINGS, ...parsed };
        }
      }
    } catch (e) {
      console.warn('Failed to load site settings from localStorage', e);
    }
    return INITIAL_SITE_SETTINGS;
  });

  // 5. Brands State
  const [brands, setBrands] = useState<Brand[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BRANDS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load brands from localStorage', e);
    }
    return initialBrands;
  });

  const [families] = useState<ProjectFamily[]>(projectFamilies);
  
  // CMS Dialog States
  const [isManagementDashboardOpen, setIsManagementDashboardOpen] = useState(false);
  
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [isPictogramEditorOpen, setIsPictogramEditorOpen] = useState(false);
  const [editingPictogram, setEditingPictogram] = useState<BrandPictogramProject | null>(null);

  const [isCatalogEditorOpen, setIsCatalogEditorOpen] = useState(false);
  const [editingCatalog, setEditingCatalog] = useState<DigitalCatalogProject | null>(null);

  // Sync states to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.warn('Failed to persist projects to localStorage', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PICTOGRAMS, JSON.stringify(pictogramProjects));
    } catch (e) {
      console.warn('Failed to persist pictograms to localStorage', e);
    }
  }, [pictogramProjects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CATALOGS, JSON.stringify(catalogProjects));
    } catch (e) {
      console.warn('Failed to persist catalogs to localStorage', e);
    }
  }, [catalogProjects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(siteSettings));
    } catch (e) {
      console.warn('Failed to persist site settings to localStorage', e);
    }
  }, [siteSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BRANDS, JSON.stringify(brands));
    } catch (e) {
      console.warn('Failed to persist brands to localStorage', e);
    }
  }, [brands]);

  // Recalculate metrics whenever collections change
  const metrics: MetricSummary = useMemo(() => {
    const allYears = projects.map(p => p.year).filter(Boolean) as number[];
    const minYear = Math.min(...allYears);
    const maxYear = Math.max(...allYears);
    const yearsActive = allYears.length > 0 ? maxYear - minYear + 1 : 3;

    return {
      totalProjects: projects.length,
      yearsActive,
      brandsCount: new Set([...projects.map(p => p.brand), ...pictogramProjects.map(p => p.brand), ...catalogProjects.map(p => p.brand)].filter(Boolean)).size,
      websitesCount: projects.filter(p => Array.isArray(p.type) ? p.type.includes('website') : p.type === 'Website').length,
      landingPagesCount: projects.filter(p => Array.isArray(p.type) ? p.type.includes('landing-page') : p.type === 'Landing Page').length,
      mobileExperiencesCount: projects.filter(p => Array.isArray(p.platform) ? p.platform.includes('mobile') || p.platform.includes('ios') : (p.platform || '').includes('Mobile')).length,
      productInterfacesCount: projects.filter(p => Array.isArray(p.type) ? p.type.includes('product') : p.type === 'Product Design').length,
      campaignCount: projects.filter(p => Array.isArray(p.type) ? p.type.includes('campaign') : p.type === 'Campaign').length,
      pictogramsCount: pictogramProjects.length,
      catalogsCount: catalogProjects.length
    };
  }, [projects, pictogramProjects, catalogProjects]);

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
      contentStatus: contentStat,
      featuredReadiness: featuredRead
    } as Project;
  };

  // -------------------------------------------------------------
  // Project CRUD Operations
  // -------------------------------------------------------------
  const createProject = (data: Partial<Project>): Project => {
    const id = data.id || `project-${Date.now()}`;
    const slug = data.slug || id;
    const name = data.name || 'پروژه جدید';
    
    const newProject = recomputeProject({
      id,
      slug,
      name,
      originalName: name,
      displayNameFa: data.displayNameFa || name,
      displayNameEn: data.displayNameEn || name,
      client: data.client || data.brand || 'Daewoo',
      clientFa: data.clientFa || 'دوو',
      brand: data.brand || 'Daewoo',
      year: data.year ?? 1403,
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
      cover: data.cover || '/uploads/uiux/Daewoo General Landing/cover.webp',
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
      slug: `${target.slug}-copy-${Date.now().toString().slice(-4)}`,
      name: `${target.name} (نسخه کپی)`,
      displayNameFa: target.displayNameFa ? `${target.displayNameFa} (کپی)` : `${target.name} (کپی)`,
      featured: false,
      featuredScore: Math.max(40, (target.featuredScore || 50) - 10)
    });

    setProjects(prev => [cloned, ...prev]);
  };

  const mergeProjects = (targetId: string, sourceId: string) => {
    const target = projects.find(p => p.id === targetId);
    const source = projects.find(p => p.id === sourceId);
    if (!target || !source) return;

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

  const toggleFeatured = (id: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        const nextFeatured = !p.featured;
        return recomputeProject({
          ...p,
          featured: nextFeatured,
          featuredScore: nextFeatured ? Math.max(75, p.featuredScore || 80) : Math.min(50, p.featuredScore || 40)
        });
      }
      return p;
    }));
  };

  // -------------------------------------------------------------
  // Pictogram CRUD Operations
  // -------------------------------------------------------------
  const createPictogramProject = (data: Partial<BrandPictogramProject>): BrandPictogramProject => {
    const id = data.id || `pictogram-${Date.now()}`;
    const slug = data.slug || id;
    const newPictogram: BrandPictogramProject = {
      id,
      slug,
      titleFa: data.titleFa || 'سیستم جدید آیکونوگرافی و پیکتوگرام',
      titleEn: data.titleEn || 'New Brand Pictogram & Iconography System',
      client: data.client || 'Daewoo',
      clientFa: data.clientFa || 'دوو',
      brand: data.brand || 'Daewoo',
      year: data.year || 1403,
      category: data.category || 'smart-home',
      categoryFa: data.categoryFa || 'پیکتوگرام و آیکونوگرافی',
      descriptionFa: data.descriptionFa || 'طراحی سیستم آیکونوگرافی اختصاصی هماهنگ با دیزاین سیستم برند.',
      cover: data.cover || '/uploads/uiux/Daewoo RF Landing/cover.webp',
      accentColor: data.accentColor || '#0066FF',
      iconCount: data.iconCount || (data.icons?.length || 24),
      gridSystem: data.gridSystem || '24×24dp Optical Pixel Grid / 2.0px Stroke Weight',
      keyTokens: data.keyTokens || ['گرید ۲۴ پیکسلی استاندارد', 'ضخامت خطوط ثابت اپتیکال'],
      mockups: data.mockups || [],
      icons: data.icons || [],
      downloadVectorUrl: data.downloadVectorUrl || '',
      guidelines: data.guidelines || []
    };

    setPictogramProjects(prev => [newPictogram, ...prev]);
    return newPictogram;
  };

  const updatePictogramProject = (id: string, updates: Partial<BrandPictogramProject>) => {
    setPictogramProjects(prev => prev.map(p => {
      if (p.id === id) {
        return { 
          ...p, 
          ...updates,
          iconCount: updates.icons ? updates.icons.length : (updates.iconCount ?? p.iconCount)
        };
      }
      return p;
    }));
  };

  const deletePictogramProject = (id: string) => {
    setPictogramProjects(prev => prev.filter(p => p.id !== id));
  };

  const duplicatePictogramProject = (id: string) => {
    const target = pictogramProjects.find(p => p.id === id);
    if (!target) return;
    const cloned: BrandPictogramProject = {
      ...target,
      id: `${target.id}-copy-${Date.now().toString().slice(-4)}`,
      slug: `${target.slug}-copy-${Date.now().toString().slice(-4)}`,
      titleFa: `${target.titleFa} (کپی)`
    };
    setPictogramProjects(prev => [cloned, ...prev]);
  };

  // -------------------------------------------------------------
  // Digital Catalog CRUD Operations
  // -------------------------------------------------------------
  const createCatalogProject = (data: Partial<DigitalCatalogProject>): DigitalCatalogProject => {
    const id = data.id || `catalog-${Date.now()}`;
    const slug = data.slug || id;
    const newCatalog: DigitalCatalogProject = {
      id,
      slug,
      titleFa: data.titleFa || 'کاتالوگ دیجیتال و تعاملی جدید',
      titleEn: data.titleEn || 'New Mobile Digital Catalog',
      client: data.client || 'Daewoo',
      clientFa: data.clientFa || 'دوو',
      brand: data.brand || 'Daewoo',
      year: data.year || 1403,
      category: data.category || 'mobile-catalog',
      categoryFa: data.categoryFa || 'کاتالوگ تعاملی موبایل (Flipbook)',
      descriptionFa: data.descriptionFa || 'طراحی کاتالوگ با قطع عمودی استاندارد موبایل و ورق‌زدن روان.',
      cover: data.cover || '/uploads/uiux/Daewoo General Landing/cover.webp',
      pdfUrl: data.pdfUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileSizeMb: data.fileSizeMb || 4.2,
      pageCount: data.pages?.length || data.pageCount || 4,
      aspectRatio: data.aspectRatio || 'mobile-portrait',
      accentColor: data.accentColor || '#0066FF',
      isMobileOptimized: data.isMobileOptimized ?? true,
      pages: data.pages || [],
      highlights: data.highlights || ['طراحی اختصاصی نسبت ۹:۱۶ برای موبایل']
    };

    setCatalogProjects(prev => [newCatalog, ...prev]);
    return newCatalog;
  };

  const updateCatalogProject = (id: string, updates: Partial<DigitalCatalogProject>) => {
    setCatalogProjects(prev => prev.map(c => {
      if (c.id === id) {
        return { 
          ...c, 
          ...updates,
          pageCount: updates.pages ? updates.pages.length : (updates.pageCount ?? c.pageCount)
        };
      }
      return c;
    }));
  };

  const deleteCatalogProject = (id: string) => {
    setCatalogProjects(prev => prev.filter(c => c.id !== id));
  };

  const duplicateCatalogProject = (id: string) => {
    const target = catalogProjects.find(c => c.id === id);
    if (!target) return;
    const cloned: DigitalCatalogProject = {
      ...target,
      id: `${target.id}-copy-${Date.now().toString().slice(-4)}`,
      slug: `${target.slug}-copy-${Date.now().toString().slice(-4)}`,
      titleFa: `${target.titleFa} (کپی)`
    };
    setCatalogProjects(prev => [cloned, ...prev]);
  };

  // -------------------------------------------------------------
  // Site Settings Operations
  // -------------------------------------------------------------
  const updateSiteSettings = (updates: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...updates }));
  };

  const updateHeroSettings = (updates: Partial<SiteHeroSettings>) => {
    setSiteSettings(prev => ({
      ...prev,
      hero: { ...prev.hero, ...updates }
    }));
  };

  const updateKpiCards = (kpis: SiteKpiCard[]) => {
    setSiteSettings(prev => ({ ...prev, kpis }));
  };

  const updateSectionVisibility = (updates: Partial<SiteSectionVisibility>) => {
    setSiteSettings(prev => ({
      ...prev,
      sections: { ...prev.sections, ...updates }
    }));
  };

  const updateProfileSettings = (updates: Partial<SiteProfileSettings>) => {
    setSiteSettings(prev => ({
      ...prev,
      profile: { ...prev.profile, ...updates }
    }));
  };

  const updatePresentationSettings = (updates: Partial<SitePresentationSettings>) => {
    setSiteSettings(prev => ({
      ...prev,
      presentation: { ...prev.presentation, ...updates }
    }));
  };

  // -------------------------------------------------------------
  // Brand Management
  // -------------------------------------------------------------
  const createBrand = (brand: Brand) => {
    setBrands(prev => [...prev, brand]);
  };

  const updateBrand = (id: string, updates: Partial<Brand>) => {
    setBrands(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const deleteBrand = (id: string) => {
    setBrands(prev => prev.filter(b => b.id !== id));
  };

  // -------------------------------------------------------------
  // Asset Management
  // -------------------------------------------------------------
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

  // -------------------------------------------------------------
  // Section Management
  // -------------------------------------------------------------
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

  // -------------------------------------------------------------
  // Universal Import / Export / GitHub Sync
  // -------------------------------------------------------------
  const exportJson = (): string => {
    return JSON.stringify(projects, null, 2);
  };

  const exportFullBackupJson = (): string => {
    const fullBundle: FullBackupData = {
      version: '4.0.0',
      exportDate: new Date().toISOString(),
      projects,
      pictogramProjects,
      catalogProjects,
      siteSettings,
      brands
    };
    return JSON.stringify(fullBundle, null, 2);
  };

  const exportTypeScriptData = (type: 'projects' | 'pictograms' | 'catalogs' | 'settings' | 'brands' = 'projects'): string => {
    if (type === 'pictograms') {
      return `import { BrandPictogramProject } from '../types';\n\nexport const INITIAL_PICTOGRAM_PROJECTS: BrandPictogramProject[] = ${JSON.stringify(pictogramProjects, null, 2)};\n`;
    }
    if (type === 'catalogs') {
      return `import { DigitalCatalogProject } from '../types';\n\nexport const INITIAL_CATALOG_PROJECTS: DigitalCatalogProject[] = ${JSON.stringify(catalogProjects, null, 2)};\n`;
    }
    if (type === 'settings') {
      return `import { SiteSettings } from '../types';\n\nexport const INITIAL_SITE_SETTINGS: SiteSettings = ${JSON.stringify(siteSettings, null, 2)};\n`;
    }
    if (type === 'brands') {
      return `import { Brand } from '../types';\n\nexport const initialBrands: Brand[] = ${JSON.stringify(brands, null, 2)};\n`;
    }
    return `import { Project } from '../types';\n\nexport const initialProjectsList: Project[] = ${JSON.stringify(projects, null, 2)};\n`;
  };

  const importJson = (jsonData: string): { success: boolean; count: number; error?: string } => {
    try {
      const parsed = JSON.parse(jsonData);
      if (!Array.isArray(parsed)) {
        // Check if it's a full bundle
        if (parsed && typeof parsed === 'object' && parsed.projects && Array.isArray(parsed.projects)) {
          const result = importFullBackupJson(jsonData);
          return { ...result, count: result.success ? parsed.projects.length : 0 };
        }
        return { success: false, count: 0, error: 'فرمت فایل معتبر نیست (باید آرایه‌ای از پروژه‌ها یا پکیج جامع CMS باشد).' };
      }

      const validProjects = parsed
        .filter((item: any) => item && typeof item === 'object' && item.id && item.name)
        .map(item => recomputeProject(item));
      if (validProjects.length === 0) {
        return { success: false, count: 0, error: 'هیچ پروژه معتبری در فایل یافت نشد (هر پروژه به id و name نیاز دارد).' };
      }
      setProjects(validProjects);
      return { success: true, count: validProjects.length };
    } catch (e: any) {
      return { success: false, count: 0, error: e.message || 'خطا در پارس داده‌های JSON' };
    }
  };

  const importFullBackupJson = (jsonData: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.projects && Array.isArray(parsed.projects)) {
        setProjects(parsed.projects
          .filter((p: any) => p && typeof p === 'object' && p.id && p.name)
          .map((p: any) => recomputeProject(p)));
      }
      if (parsed.pictogramProjects && Array.isArray(parsed.pictogramProjects)) {
        setPictogramProjects(parsed.pictogramProjects);
      }
      if (parsed.catalogProjects && Array.isArray(parsed.catalogProjects)) {
        setCatalogProjects(parsed.catalogProjects);
      }
      if (parsed.siteSettings && typeof parsed.siteSettings === 'object') {
        setSiteSettings(prev => ({ ...prev, ...parsed.siteSettings }));
      }
      if (parsed.brands && Array.isArray(parsed.brands)) {
        setBrands(parsed.brands);
      }
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'خطا در بارگذاری پکیج پشتیبان' };
    }
  };

  const resetToInitial = () => {
    setProjects(initialProjectsList);
    try {
      localStorage.removeItem(STORAGE_KEY_PROJECTS);
    } catch (e) {
      // ignore
    }
  };

  const resetAllToInitial = () => {
    setProjects(initialProjectsList);
    setPictogramProjects(INITIAL_PICTOGRAM_PROJECTS);
    setCatalogProjects(INITIAL_CATALOG_PROJECTS);
    setSiteSettings(INITIAL_SITE_SETTINGS);
    setBrands(initialBrands);
    try {
      localStorage.removeItem(STORAGE_KEY_PROJECTS);
      localStorage.removeItem(STORAGE_KEY_PICTOGRAMS);
      localStorage.removeItem(STORAGE_KEY_CATALOGS);
      localStorage.removeItem(STORAGE_KEY_SETTINGS);
      localStorage.removeItem(STORAGE_KEY_BRANDS);
    } catch (e) {
      // ignore
    }
  };

  // CMS Modal Handlers
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

  const openPictogramEditor = (project?: BrandPictogramProject) => {
    setEditingPictogram(project || null);
    setIsPictogramEditorOpen(true);
  };
  const closePictogramEditor = () => {
    setEditingPictogram(null);
    setIsPictogramEditorOpen(false);
  };

  const openCatalogEditor = (catalog?: DigitalCatalogProject) => {
    setEditingCatalog(catalog || null);
    setIsCatalogEditorOpen(true);
  };
  const closeCatalogEditor = () => {
    setEditingCatalog(null);
    setIsCatalogEditorOpen(false);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        pictogramProjects,
        catalogProjects,
        siteSettings,
        brands,
        families,
        metrics,
        createProject,
        updateProject,
        deleteProject,
        duplicateProject,
        mergeProjects,
        toggleFeatured,
        createPictogramProject,
        updatePictogramProject,
        deletePictogramProject,
        duplicatePictogramProject,
        createCatalogProject,
        updateCatalogProject,
        deleteCatalogProject,
        duplicateCatalogProject,
        updateSiteSettings,
        updateHeroSettings,
        updateKpiCards,
        updateSectionVisibility,
        updateProfileSettings,
        updatePresentationSettings,
        createBrand,
        updateBrand,
        deleteBrand,
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
        exportFullBackupJson,
        exportTypeScriptData,
        importJson,
        importFullBackupJson,
        resetToInitial,
        resetAllToInitial,
        isManagementDashboardOpen,
        openManagementDashboard,
        closeManagementDashboard,
        isEditorOpen,
        editingProject,
        openEditor,
        closeEditor,
        isPictogramEditorOpen,
        editingPictogram,
        openPictogramEditor,
        closePictogramEditor,
        isCatalogEditorOpen,
        editingCatalog,
        openCatalogEditor,
        closeCatalogEditor
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
