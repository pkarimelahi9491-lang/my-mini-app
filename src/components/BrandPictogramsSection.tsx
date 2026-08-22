import React, { useState } from 'react';
import { BrandPictogramProject } from '../types';
import { toPersianDigits } from '../utils/persian';
import { 
  Sparkles, 
  Layers, 
  Grid, 
  ArrowLeft, 
  Eye, 
  ShieldCheck, 
  ArrowUpLeft, 
  Maximize2 
} from 'lucide-react';
import { PictogramDetailModal } from './PictogramDetailModal';

interface BrandPictogramsSectionProps {
  projects: BrandPictogramProject[];
  onOpenCMS?: () => void;
}

export const BrandPictogramsSection: React.FC<BrandPictogramsSectionProps> = ({
  projects,
  onOpenCMS
}) => {
  const [selectedProject, setSelectedProject] = useState<BrandPictogramProject | null>(null);

  return (
    <section className="space-y-8 text-right" id="pictograms-section">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              طراحی پیکتوگرام و سیستم آیکونوگرافی برندها
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              {toPersianDigits(projects.length)} سیستم جامع
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            طراحی زبان بصری اختصاصی، سمبل‌های نمایشگرهای سخت‌افزاری IoT، سوپراپ‌ها و دیزاین‌توکن‌های هلدینگ
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-400 font-mono hidden md:block">
            Optical Grid • Vector Tokens
          </div>
        </div>
      </div>

      {/* Projects Showcase Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {projects.map((proj) => {
          return (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="group rounded-3xl bg-[#0a0e1e] border border-white/10 hover:border-cyan-500/50 transition-all duration-300 p-5 space-y-4 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between"
            >
              {/* Featured Mockup / Cover */}
              <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-[#04060d] relative border border-white/5 shadow-inner">
                <img
                  src={proj.mockups[0]?.imageUrl || proj.cover}
                  alt={proj.titleFa}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Floating Brand & Count Badges */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-white text-xs font-bold">
                    {proj.clientFa}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-500/90 text-black text-xs font-mono font-black shadow-md">
                    {toPersianDigits(proj.iconCount)}+ آیکون
                  </span>
                </div>

                {/* Mockup Overlay on Hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span>مشاهده موکاپ‌ها و ماتریس آیکون‌ها</span>
                </div>
              </div>

              {/* Information & Key Features */}
              <div className="space-y-3 px-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="text-cyan-400 font-bold">{proj.categoryFa}</span>
                  <span className="font-mono text-slate-400">گرید ۲۴dp</span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {proj.titleFa}
                  </h3>
                  <ArrowUpLeft className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-normal">
                  {proj.descriptionFa}
                </p>

                {/* Mini Preview Tokens */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Grid className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{toPersianDigits(proj.mockups.length)} موکاپ واقعی</span>
                  </div>
                  <span className="text-cyan-400 font-semibold group-hover:underline">
                    بررسی سیستم وکتوری ←
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Full Modal Viewer */}
      {selectedProject && (
        <PictogramDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </section>
  );
};
