/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Project, GalleryItem, BrandPictogramProject, DigitalCatalogProject } from './types';
import { PictogramDetailPage } from './components/PictogramDetailPage';
import { CatalogDetailPage } from './components/CatalogDetailPage';
import { ProjectProvider, useProjects } from './context/ProjectContext';

// Error Boundary to prevent black screens
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError?: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch() { this.props.onError?.(); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[60vh] text-center px-4">
          <div className="space-y-4">
            <p className="text-lg text-white font-bold">مشکلی پیش آمد</p>
            <button
              onClick={() => { this.setState({ hasError: false }); window.location.hash = ''; window.location.reload(); }}
              className="px-6 py-3 rounded-xl bg-[#0066FF] text-white font-bold cursor-pointer hover:bg-[#1a75ff] transition-all"
            >
              بازگشت به صفحه اصلی
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Overview } from './components/Overview';
import { SelectedWork } from './components/SelectedWork';
import { AllProjectsArchive } from './components/AllProjectsArchive';
import { ProjectDetail } from './components/ProjectDetail';
import { PresentationMode } from './components/PresentationMode';
import { LightboxGallery } from './components/LightboxGallery';
import { SearchModal } from './components/SearchModal';
import { ProjectsDashboard } from './components/cms/ProjectsDashboard';
import { ProjectEditorModal } from './components/cms/ProjectEditorModal';
import { PictogramEditorModal } from './components/cms/PictogramEditorModal';
import { CatalogEditorModal } from './components/cms/CatalogEditorModal';

function PortfolioApp() {
  const { 
    projects, 
    metrics, 
    siteSettings,
    pictogramProjects,
    catalogProjects,
    isManagementDashboardOpen, 
    openManagementDashboard, 
    closeManagementDashboard,
    isEditorOpen, 
    editingProject, 
    closeEditor,
    isPictogramEditorOpen,
    editingPictogram: editingPictogramProject,
    closePictogramEditor,
    isCatalogEditorOpen,
    editingCatalog: editingCatalogProject,
    closeCatalogEditor
  } = useProjects();

  // Reset all detail views on error
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    if (hasError) {
      setSelectedProject(null);
      setSelectedPictogram(null);
      setSelectedCatalog(null);
      setActiveTab('overview');
      window.location.hash = '';
      setHasError(false);
    }
  }, [hasError]);

  const [activeTab, setActiveTab] = useState<'overview' | 'selected' | 'archive'>('overview');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [presentationOpen, setPresentationOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [lightboxData, setLightboxData] = useState<{ item: GalleryItem; items: GalleryItem[] } | null>(null);
  const [selectedPictogram, setSelectedPictogram] = useState<BrandPictogramProject | null>(null);
  const [selectedCatalog, setSelectedCatalog] = useState<DigitalCatalogProject | null>(null);

  // Sync with URL Hash for Deep Linking & Browser History Navigation
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash.startsWith('project/')) {
        const slug = hash.replace('project/', '');
        const target = projects.find(p => p.slug === slug || p.id === slug);
        if (target) {
          setSelectedProject(target);
          setSelectedPictogram(null);
          setSelectedCatalog(null);
          return;
        }
      } else if (hash.startsWith('pictogram/')) {
        const slug = hash.replace('pictogram/', '');
        const target = pictogramProjects.find(p => p.slug === slug || p.id === slug);
        if (target) {
          setSelectedPictogram(target);
          setSelectedProject(null);
          setSelectedCatalog(null);
          return;
        }
      } else if (hash.startsWith('catalog/')) {
        const slug = hash.replace('catalog/', '');
        const target = catalogProjects.find(c => c.slug === slug || c.id === slug);
        if (target) {
          setSelectedCatalog(target);
          setSelectedProject(null);
          setSelectedPictogram(null);
          return;
        }
      } else if (hash === 'selected' || hash === 'work') {
        setSelectedProject(null);
        setActiveTab('selected');
        return;
      } else if (hash === 'archive' || hash === 'projects') {
        setSelectedProject(null);
        setActiveTab('archive');
        return;
      } else if (hash === 'pictograms') {
        setSelectedProject(null);
        setSelectedPictogram(null);
        setSelectedCatalog(null);
        setActiveTab('overview');
        setTimeout(() => {
          document.getElementById('pictograms-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      } else if (hash === 'catalogs') {
        setSelectedProject(null);
        setSelectedPictogram(null);
        setSelectedCatalog(null);
        setActiveTab('overview');
        setTimeout(() => {
          document.getElementById('catalogs-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      } else if (hash === 'top10') {
        setSelectedProject(null);
        setActiveTab('overview');
        setTimeout(() => {
          document.getElementById('top10-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      } else if (hash === 'presentation') {
        setPresentationOpen(true);
        return;
      } else if (hash === '' || hash === 'overview') {
        setSelectedProject(null);
        setSelectedPictogram(null);
        setSelectedCatalog(null);
        setActiveTab('overview');
        return;
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, [projects, pictogramProjects, catalogProjects]);

  // Keep selectedProject updated if project data changes in context
  useEffect(() => {
    if (selectedProject) {
      const updated = projects.find(p => p.id === selectedProject.id);
      if (updated) {
        setSelectedProject(updated);
      }
    }
  }, [projects]);

  // Global keyboard shortcuts (Search '/', Presentation 'P')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === '/') {
        e.preventDefault();
        setSearchModalOpen(true);
      } else if (e.key.toLowerCase() === 'p' && !presentationOpen && !searchModalOpen && !lightboxData) {
        e.preventDefault();
        setPresentationOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [presentationOpen, searchModalOpen, lightboxData]);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    window.location.hash = `project/${project.slug || project.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromDetail = () => {
    setSelectedProject(null);
    window.location.hash = activeTab === 'overview' ? '' : activeTab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPictogram = (project: BrandPictogramProject) => {
    setSelectedPictogram(project);
    setSelectedProject(null);
    setSelectedCatalog(null);
    window.location.hash = `pictogram/${project.slug || project.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromPictogram = () => {
    setSelectedPictogram(null);
    setSelectedCatalog(null);
    setSelectedProject(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      document.getElementById('pictograms-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectCatalog = (catalog: DigitalCatalogProject) => {
    setSelectedCatalog(catalog);
    setSelectedProject(null);
    setSelectedPictogram(null);
    window.location.hash = `catalog/${catalog.slug || catalog.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromCatalog = () => {
    setSelectedCatalog(null);
    setSelectedPictogram(null);
    setSelectedProject(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      document.getElementById('catalogs-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleTabChange = (tab: 'overview' | 'selected' | 'archive') => {
    setSelectedProject(null);
    setSelectedPictogram(null);
    setSelectedCatalog(null);
    setActiveTab(tab);
    window.location.hash = tab === 'overview' ? '' : tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredProjects = projects.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-[#090a0f] text-[#e4e4e9] flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Global Executive Header */}
      <Header
        activeTab={selectedProject || selectedPictogram || selectedCatalog ? 'selected' : activeTab}
        setActiveTab={handleTabChange}
        onOpenPresentation={() => {
          setPresentationOpen(true);
          window.location.hash = 'presentation';
        }}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenCMS={openManagementDashboard}
        totalProjectsCount={projects.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <ErrorBoundary onError={() => setHasError(true)}>
        {selectedPictogram ? (
          <PictogramDetailPage
            key={selectedPictogram.id}
            project={selectedPictogram}
            allProjects={pictogramProjects}
            onBack={handleBackFromPictogram}
            onSelectProject={handleSelectPictogram}
          />
        ) : selectedCatalog ? (
          <CatalogDetailPage
            key={selectedCatalog.id}
            catalog={selectedCatalog}
            allCatalogs={catalogProjects}
            onBack={handleBackFromCatalog}
            onSelectCatalog={handleSelectCatalog}
          />
        ) : selectedProject ? (
          /* Unified Single Case Study / Project Detail View */
          <ProjectDetail
            key={selectedProject.id}
            project={selectedProject}
            allProjects={projects}
            onBack={handleBackFromDetail}
            onSelectProject={handleSelectProject}
            onOpenLightbox={(item, galleryList) => setLightboxData({ item, items: galleryList })}
          />
        ) : (
          /* Primary Navigation Views */
          <>
            {activeTab === 'overview' && (
              <Overview
                metrics={metrics}
                featuredProjects={featuredProjects}
                onSelectProject={handleSelectProject}
                onSelectPictogram={handleSelectPictogram}
                onSelectCatalog={handleSelectCatalog}
                onNavigateTab={handleTabChange}
                onOpenPresentation={() => {
                  setPresentationOpen(true);
                  window.location.hash = 'presentation';
                }}
              />
            )}

            {activeTab === 'selected' && (
              <SelectedWork
                projects={projects}
                onSelectProject={handleSelectProject}
                onOpenPresentation={() => {
                  setPresentationOpen(true);
                  window.location.hash = 'presentation';
                }}
              />
            )}

            {activeTab === 'archive' && (
              <AllProjectsArchive
                projects={projects}
                onSelectProject={handleSelectProject}
              />
            )}
          </>
        )}
        </ErrorBoundary>
      </main>

      {/* Global Executive Footer */}
      <Footer
        onSelectTab={handleTabChange}
        onOpenPresentation={() => {
          setPresentationOpen(true);
          window.location.hash = 'presentation';
        }}
      />

      {/* Presentation Mode Fullscreen Experience */}
      {presentationOpen && (
        <PresentationMode
          metrics={metrics}
          featuredProjects={featuredProjects}
          allProjects={projects}
          presentationSettings={siteSettings.presentation}
          onClose={() => {
            setPresentationOpen(false);
            window.location.hash = selectedProject ? `project/${selectedProject.slug}` : (activeTab === 'overview' ? '' : activeTab);
          }}
          onSelectProject={(p) => {
            setPresentationOpen(false);
            handleSelectProject(p);
          }}
        />
      )}

      {/* Lightbox Image / Frame Viewer */}
      {lightboxData && (
        <LightboxGallery
          item={lightboxData.item}
          items={lightboxData.items}
          onClose={() => setLightboxData(null)}
          onNavigate={(newItem) => setLightboxData({ item: newItem, items: lightboxData.items })}
        />
      )}

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        projects={projects}
        onClose={() => setSearchModalOpen(false)}
        onSelectProject={handleSelectProject}
      />

      {/* Universal Unified CMS Management Dashboard Modal */}
      <ProjectsDashboard
        isOpen={isManagementDashboardOpen}
        onClose={closeManagementDashboard}
        onSelectProject={(project) => {
          closeManagementDashboard();
          handleSelectProject(project);
        }}
      />

      {/* CMS Project Editor Modal */}
      <ProjectEditorModal
        isOpen={isEditorOpen}
        project={editingProject}
        onClose={closeEditor}
        onPreview={(project) => {
          closeEditor();
          handleSelectProject(project);
        }}
      />

      {/* CMS Brand Pictogram Editor Modal */}
      <PictogramEditorModal
        isOpen={isPictogramEditorOpen}
        project={editingPictogramProject}
        onClose={closePictogramEditor}
      />

      {/* CMS Digital Catalog Editor Modal */}
      <CatalogEditorModal
        isOpen={isCatalogEditorOpen}
        catalog={editingCatalogProject}
        onClose={closeCatalogEditor}
      />

    </div>
  );
}

export default function App() {
  return (
    <ProjectProvider>
      <PortfolioApp />
    </ProjectProvider>
  );
}
