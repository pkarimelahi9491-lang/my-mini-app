import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { ScrollableBrowserFrame } from './ScrollableBrowserFrame';
import { toPersianDigits } from '../utils/persian';
import { 
  Star, 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft, 
  Maximize2 
} from 'lucide-react';

interface SelectedWorkProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenPresentation?: () => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({
  projects,
  onSelectProject,
  onOpenPresentation
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Top 10 featured projects
  const topProjects = projects.filter(p => p.featured).slice(0, 10);
  const activeProject = topProjects[selectedIndex] || topProjects[0];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowLeft') {
        setSelectedIndex(prev => (prev + 1) % topProjects.length);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex(prev => (prev - 1 + topProjects.length) % topProjects.length);
      } else if (e.key >= '1' && e.key <= '9') {
        const num = parseInt(e.key, 10) - 1;
        if (num < topProjects.length) {
          setSelectedIndex(num);
        }
      } else if (e.key === '0' && topProjects.length >= 10) {
        setSelectedIndex(9);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [topProjects.length]);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20 text-right space-y-8">
      
      {/* ------------------------------------------------------------- */}
      {/* TOP EXECUTIVE BANNER */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0066FF]">
            <Star className="w-4 h-4 fill-[#0066FF]" />
            <span>ویترین پروژه‌های شاخص</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-relaxed">
            ۱۰ پروژه برگزیده
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            مهم‌ترین نمونه‌کارهای تیم طراحی با بالاترین اثرگذاری
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          {onOpenPresentation && (
            <button
              onClick={onOpenPresentation}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0066FF] hover:bg-[#1a75ff] text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-[#0066FF]/25 cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
              <span>ارائه تمام‌صفحه</span>
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TWO-COLUMN EXECUTIVE WORKSPACE (RIGHT SIDEBAR + MAIN AREA) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        
        {/* ============================================================= */}
        {/* RIGHT SIDEBAR: INDEX OF 10 FEATURED PROJECTS */}
        {/* ============================================================= */}
        <div className="lg:col-span-4 xl:col-span-3 order-2 lg:order-1 bg-[#0a0e1c] rounded-2xl border border-white/10 p-4 sm:p-5 space-y-3 sticky top-28 shadow-xl">
          <div className="flex items-center justify-between px-1 pb-3 border-b border-white/5">
            <span className="text-xs sm:text-sm font-bold text-white">فهرست ۱۰ پروژه برتر</span>
            <span className="text-[11px] font-mono text-slate-400">کلیدهای ۱ تا ۰</span>
          </div>

          <div className="space-y-1.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
            {topProjects.map((proj, idx) => {
              const isCurrent = selectedIndex === idx;
              return (
                <button
                  key={proj.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`w-full text-right p-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 border ${
                    isCurrent
                      ? 'bg-[#0066FF] border-[#0066FF] text-white shadow-lg shadow-[#0066FF]/25'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04] text-slate-300'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs sm:text-sm font-bold truncate ${isCurrent ? 'text-white' : 'text-slate-200'}`}>
                      {proj.displayNameFa || proj.name}
                    </div>
                    <div className={`text-[11px] truncate flex items-center gap-1.5 mt-1 ${
                      isCurrent ? 'text-white/80' : 'text-slate-400'
                    }`}>
                      <span>{proj.clientFa || proj.brand}</span>
                      <span>•</span>
                      <span className="font-mono">{toPersianDigits(proj.year || '—')}</span>
                    </div>
                  </div>
                  
                  {isCurrent && (
                    <div className="w-2 h-2 rounded-full bg-white shadow-sm" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================= */}
        {/* LEFT MAIN AREA: ACTIVE PROJECT PRESENTATION VIEW */}
        {/* ============================================================= */}
        {activeProject && (
          <div className="lg:col-span-8 xl:col-span-9 order-1 lg:order-2 space-y-6">
            
            {/* Clean Project Header & Actions */}
            <div className="bg-[#0a0e1c] rounded-2xl border border-white/10 p-6 sm:p-7 space-y-5 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Title & Tags */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-xs text-[#0066FF] font-bold">
                    <span className="px-3 py-1 rounded-lg bg-[#0066FF]/15 border border-[#0066FF]/30">
                      {activeProject.clientFa || activeProject.brand}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-300 font-semibold">{activeProject.typeFa}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400 font-mono">{toPersianDigits(activeProject.year || '—')}</span>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                    {activeProject.displayNameFa || activeProject.name}
                  </h2>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onSelectProject(activeProject)}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0066FF] hover:bg-[#1a75ff] text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-[#0066FF]/20 cursor-pointer"
                  >
                    <span>بررسی کامل و مستندات</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  {/* Prev / Next controls */}
                  <div className="flex items-center gap-1 bg-black/40 p-1.5 rounded-xl border border-white/10">
                    <button
                      onClick={() => setSelectedIndex(prev => (prev - 1 + topProjects.length) % topProjects.length)}
                      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      title="پروژه قبلی (→)"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedIndex(prev => (prev + 1) % topProjects.length)}
                      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      title="پروژه بعدی (←)"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Browser Frame */}
            <div className="bg-[#0a0e1c] rounded-2xl border border-white/10 p-4 sm:p-6 space-y-4 shadow-xl">
              <ScrollableBrowserFrame
                project={activeProject}
              />
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
