import React, { useState, useEffect } from 'react';
import { BrandPictogramProject } from '../types';
import { toPersianDigits } from '../utils/persian';
import { 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  Layers, 
  Grid, 
  Maximize2, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  X,
  Image as ImageIcon
} from 'lucide-react';

interface PictogramDetailPageProps {
  project: BrandPictogramProject;
  allProjects: BrandPictogramProject[];
  onBack: () => void;
  onSelectProject: (project: BrandPictogramProject) => void;
}

export const PictogramDetailPage: React.FC<PictogramDetailPageProps> = ({
  project,
  allProjects,
  onBack,
  onSelectProject
}) => {
  const mockups = project.mockups || [];
  const keyTokens = project.keyTokens || [];
  const icons = project.icons || [];
  const guidelines = project.guidelines || [];

  const [selectedMockup, setSelectedMockup] = useState(mockups[0] || null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const nextProject = allProjects.length > 1 ? allProjects[(safeIndex + 1) % allProjects.length] : null;
  const prevProject = allProjects.length > 1 ? allProjects[(safeIndex - 1 + allProjects.length) % allProjects.length] : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'Escape') {
        if (fullscreenImage) setFullscreenImage(null);
        else onBack();
      } else if (e.key === 'ArrowLeft' && nextProject && !fullscreenImage) {
        onSelectProject(nextProject);
      } else if (e.key === 'ArrowRight' && prevProject && !fullscreenImage) {
        onSelectProject(prevProject);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextProject, prevProject, onBack, onSelectProject, fullscreenImage]);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-24 space-y-12 text-right">
      
      {/* Top Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          <span>بازگشت به بخش پیکتوگرام</span>
        </button>
        {(nextProject || prevProject) && (
          <div className="flex items-center gap-1 border-r border-white/10 pr-2">
            {prevProject && (
              <button
                onClick={() => onSelectProject(prevProject)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="پروژه قبلی"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            {nextProject && (
              <button
                onClick={() => onSelectProject(nextProject)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="پروژه بعدی"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Project Header */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <span className="px-3.5 py-1 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-bold">
                {project.clientFa}
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/10">
                {project.categoryFa}
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/5 text-slate-400 border border-white/10 font-mono">
                سال {toPersianDigits(project.year)}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-snug">
              {project.titleFa}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-loose max-w-3xl pt-1">
              {project.descriptionFa}
            </p>
          </div>

          {/* Specs Card */}
          <div className="lg:col-span-4 rounded-2xl bg-[#0a0e1c] border border-white/10 p-5 space-y-3.5 shadow-xl">
            <div className="text-xs sm:text-sm font-bold text-white border-b border-white/5 pb-2.5 flex items-center justify-between">
              <span>شناسنامه پیکتوگرام</span>
              <Layers className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">تعداد آیکون‌ها:</span>
                <span className="text-white font-bold">{toPersianDigits(project.iconCount || icons.length)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">سیستم گرید:</span>
                <span className="text-white font-mono text-[11px]">{project.gridSystem}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">رنگ اصلی:</span>
                <span className="text-white font-mono">{project.accentColor}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Tokens */}
      {keyTokens.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">توکن‌های کلیدی طراحی</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {keyTokens.map((token, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#0a0e1c] border border-white/10 flex items-center gap-3 text-sm text-slate-300 hover:border-cyan-500/50 transition-all">
                <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
                <span>{token}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hero Mockup */}
      {selectedMockup && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <ImageIcon className="w-4 h-4 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">موکاپ اجرایی</h2>
          </div>
          <div className="rounded-2xl overflow-hidden bg-[#0c0e1a] border border-white/10 p-3 shadow-2xl">
            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-black/60 relative border border-white/5 cursor-pointer" onClick={() => setFullscreenImage(selectedMockup.imageUrl)}>
              <img
                src={selectedMockup.imageUrl}
                alt={selectedMockup.title}
                className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-[10px] font-bold text-cyan-400 border border-white/10">
                {selectedMockup.tag || 'موکاپ'}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mockup Gallery */}
      {mockups.length > 1 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <ImageIcon className="w-4 h-4 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">گالری موکاپ‌ها ({toPersianDigits(mockups.length)})</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mockups.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedMockup(m)}
                className={`group rounded-2xl bg-[#0a0e1c] border transition-all p-3 space-y-3 cursor-pointer ${
                  selectedMockup?.id === m.id ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' : 'border-white/10 hover:border-cyan-500/50'
                }`}
              >
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-black/40 border border-white/5">
                  <img
                    src={m.imageUrl}
                    alt={m.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <div className="px-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors truncate">{m.title}</h4>
                  {m.description && <p className="text-[11px] text-slate-400 mt-0.5 truncate">{m.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Icons Gallery */}
      {icons.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <Grid className="w-4 h-4 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">گالری پیکتوگرام‌ها ({toPersianDigits(icons.length)} آیکون)</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {icons.map((icon) => (
              <div
                key={icon.id}
                className="group rounded-xl bg-[#0a0e1c] border border-white/10 hover:border-cyan-500/50 p-3 space-y-2 cursor-pointer transition-all"
                onClick={() => icon.pngUrl && setFullscreenImage(icon.pngUrl)}
              >
                <div className="aspect-square rounded-lg bg-white flex items-center justify-center overflow-hidden">
                  {(icon.pngUrl || icon.svgUrl) ? (
                    <img
                      src={icon.pngUrl || icon.svgUrl}
                      alt={icon.nameFa}
                      className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  ) : (
                    <Sparkles className="w-8 h-8 text-slate-300" />
                  )}
                </div>
                <div className="text-center">
                  <h4 className="text-[11px] font-bold text-white group-hover:text-cyan-400 transition-colors truncate">{icon.nameFa}</h4>
                  <p className="text-[9px] text-slate-500 truncate">{icon.name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Guidelines */}
      {guidelines.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">راهنمای استفاده</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {guidelines.map((g, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#0a0e1c] border border-white/10 text-sm text-slate-300 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {toPersianDigits(i + 1)}
                </span>
                <span>{g}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Previous / Next Footer */}
      {(nextProject || prevProject) && (
        <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevProject && (
            <button
              onClick={() => onSelectProject(prevProject)}
              className="p-5 rounded-2xl bg-[#0a0e1c] border border-white/10 hover:border-cyan-500 text-right space-y-2 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center gap-2 text-xs text-slate-400 group-hover:text-cyan-400 transition-colors">
                <ArrowRight className="w-4 h-4" />
                <span>پروژه قبلی</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                {prevProject.titleFa}
              </div>
            </button>
          )}
          {nextProject && (
            <button
              onClick={() => onSelectProject(nextProject)}
              className="p-5 rounded-2xl bg-[#0a0e1c] border border-white/10 hover:border-cyan-500 text-left space-y-2 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-end gap-2 text-xs text-slate-400 group-hover:text-cyan-400 transition-colors">
                <span>پروژه بعدی</span>
                <ArrowLeft className="w-4 h-4" />
              </div>
              <div className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                {nextProject.titleFa}
              </div>
            </button>
          )}
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center cursor-pointer"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-6 left-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={fullscreenImage}
            alt={project.titleFa}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
};
