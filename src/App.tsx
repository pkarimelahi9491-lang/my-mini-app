/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Project, GalleryItem } from './types';
import { ProjectProvider, useProjects } from './context/ProjectContext';
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

function PortfolioApp() {
  const { 
    projects, 
    metrics, 
    isManagementDashboardOpen, 
    openManagementDashboard, 
    closeManagementDashboard,
    isEditorOpen, 
    editingProject, 
    closeEditor 
  } = useProjects();

  const [activeTab, setActiveTab] = useState<'overview' | 'selected' | 'archive'>('overview');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [presentationOpen, setPresentationOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [lightboxData, setLightboxData] = useState<{ item: GalleryItem; items: GalleryItem[] } | null>(null);

  // Sync with URL Hash for Deep Linking & Browser History Navigation
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash.startsWith('project/')) {
        const slug = hash.replace('project/', '');
        const target = projects.find(p => p.slug === slug || p.id === slug);
        if (target) {
          setSelectedProject(target);
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
        setActiveTab('overview');
        setTimeout(() => {
          document.getElementById('pictograms-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      } else if (hash === 'catalogs') {
        setSelectedProject(null);
        setActiveTab('overview');
        setTimeout(() => {
          document.getElementById('catalogs-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      } else if (hash === 'presentation') {
        setPresentationOpen(true);
        return;
      } else if (hash === '' || hash === 'overview') {
        setSelectedProject(null);
        setActiveTab('overview');
        return;
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, [projects]);

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

  const handleTabChange = (tab: 'overview' | 'selected' | 'archive') => {
    setSelectedProject(null);
    setActiveTab(tab);
    window.location.hash = tab === 'overview' ? '' : tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredProjects = projects.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-[#090a0f] text-[#e4e4e9] flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Global Executive Header */}
      <Header
        activeTab={selectedProject ? 'selected' : activeTab}
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
        {selectedProject ? (
          /* Unified Single Case Study / Project Detail View */
          <ProjectDetail
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

      {/* CMS Management Dashboard Modal */}
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
