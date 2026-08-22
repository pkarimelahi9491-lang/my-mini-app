import React from 'react';
import { Project, MetricSummary } from '../types';
import { toPersianDigits } from '../utils/persian';
import { getProjectImage } from '../data/projectImages';
import { INITIAL_PICTOGRAM_PROJECTS } from '../data/pictogramProjects';
import { INITIAL_CATALOG_PROJECTS } from '../data/catalogProjects';
import { BrandPictogramsSection } from './BrandPictogramsSection';
import { DigitalCatalogsSection } from './DigitalCatalogsSection';
import { 
  Sparkles, 
  ArrowLeft, 
  Layers, 
  Globe, 
  FolderArchive, 
  Star, 
  Monitor, 
  MonitorPlay,
  ArrowUpLeft,
  Grid,
  BookOpen
} from 'lucide-react';

interface OverviewProps {
  metrics: MetricSummary;
  featuredProjects: Project[];
  onSelectProject: (project: Project) => void;
  onNavigateTab: (tab: 'overview' | 'selected' | 'archive') => void;
  onOpenPresentation: () => void;
}

export const Overview: React.FC<OverviewProps> = ({
  metrics,
  featuredProjects,
  onSelectProject,
  onNavigateTab,
  onOpenPresentation
}) => {
  // Exactly 10 Strategic Projects displayed on the main page
  const strategicProjects = featuredProjects.slice(0, 10);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 space-y-16 text-right">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. EXECUTIVE BRIEFING BANNER (VIBRANT MIDNIGHT THEME) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative rounded-3xl bg-gradient-to-br from-[#0c1224] via-[#080c18] to-[#04060d] border border-[#0066FF]/25 p-7 sm:p-10 lg:p-12 overflow-hidden shadow-2xl shadow-[#0066FF]/10">
        
        {/* Subtle Ambient Light Gradients in Background */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#0066FF]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-7">
          
          {/* Executive Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0066FF]/15 border border-[#0066FF]/40 text-xs sm:text-sm font-bold text-[#388bfd] shadow-sm">
            <Sparkles className="w-4 h-4 text-[#0066FF]" />
            <span>گزارش عملکرد و آرشیو استراتژیک تیم طراحی UI/UX (۱۴۰۲ - ۱۴۰۵)</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-relaxed">
              جلسه بازبینی و ارائه راهبردی پروژه‌ها
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-loose max-w-3xl font-normal">
              این پلتفرم به عنوان محیط جامع ارائه به مدیرعامل محترم تدوین شده است تا مروری دقیق بر پورتال‌های ملی، سوپراپ‌های سازمانی، دیزاین‌سیستم‌های اختصاصی و دستاوردهای طراحی تجربه کاربری تیم در ۳ سال اخیر فراهم آورد.
            </p>
          </div>

          {/* Interactive Actions */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={onOpenPresentation}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0066FF] hover:bg-[#1a75ff] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#0066FF]/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <MonitorPlay className="w-4 h-4" />
              <span>شروع ارائه تمام‌صفحه</span>
            </button>

            <button
              onClick={() => onNavigateTab('selected')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/15 transition-all cursor-pointer hover:border-white/30"
            >
              <Star className="w-4 h-4 text-[#0066FF] fill-[#0066FF]" />
              <span>بررسی ۱۰ پروژه شاخص</span>
            </button>

            <button
              onClick={() => onNavigateTab('archive')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-slate-300 hover:text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer hover:bg-white/5"
            >
              <FolderArchive className="w-4 h-4 text-slate-400" />
              <span>کاتالوگ کامل ({toPersianDigits(metrics.totalProjects)} پروژه)</span>
            </button>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. FOUR KEY EXECUTIVE KPI CARDS (COLOR-ACCENTED & REFINED) */}
      {/* ------------------------------------------------------------- */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1 */}
        <div className="p-6 rounded-2xl bg-[#0b0f1d] border border-white/10 hover:border-[#0066FF]/40 transition-all space-y-3 shadow-md hover:shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-slate-400 font-bold">پروژه‌های لانچ‌شده</span>
            <div className="w-8 h-8 rounded-lg bg-[#0066FF]/15 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF]">
              <FolderArchive className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
            {toPersianDigits(metrics.totalProjects)}+
          </div>
          <div className="text-xs text-slate-400 leading-normal">
            پورتال، لندینگ، داشبورد و اپلیکیشن
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-6 rounded-2xl bg-[#0b0f1d] border border-white/10 hover:border-cyan-500/40 transition-all space-y-3 shadow-md hover:shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-slate-400 font-bold">برندها و هلدینگ‌ها</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono tracking-tight">
            {toPersianDigits(10)}+
          </div>
          <div className="text-xs text-slate-400 leading-normal">
            دوو، اسنوا، تکنوگاز، آردزیا و...
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-6 rounded-2xl bg-[#0b0f1d] border border-white/10 hover:border-indigo-500/40 transition-all space-y-3 shadow-md hover:shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-slate-400 font-bold">پوشش پلتفرمی</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Monitor className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
            {toPersianDigits(3)} محیط
          </div>
          <div className="text-xs text-slate-400 leading-normal">
            دسکتاپ سازمانی، تبلت و موبایل
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-6 rounded-2xl bg-[#0b0f1d] border border-white/10 hover:border-emerald-500/40 transition-all space-y-3 shadow-md hover:shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-slate-400 font-bold">دیزاین سیستم اختصاصی</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">
            {toPersianDigits(100)}٪
          </div>
          <div className="text-xs text-slate-400 leading-normal">
            استانداردسازی کامل کامپوننت‌ها
          </div>
        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. TOP 10 STRATEGIC FLAGSHIPS (CLEAN, ELEGANT, UNCLUTTERED) */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-7">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF] shadow-sm shadow-[#0066FF]" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                ۱۰ پروژه شاخص و راهبردی
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              مرور دستاوردهای کلیدی با بالاترین مقیاس و اهمیت در اکوسیستم طراحی
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('selected')}
            className="text-xs sm:text-sm font-bold text-[#0066FF] hover:text-[#3385ff] flex items-center gap-1.5 cursor-pointer transition-colors self-start sm:self-auto group"
          >
            <span>مشاهده ویترین کامل</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 10 Projects Clean Gallery Grid (Spacious 3-column / 2-column) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {strategicProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onSelectProject(proj)}
              className="group rounded-2xl bg-[#0a0e1c] border border-white/10 hover:border-[#0066FF]/60 transition-all duration-300 p-4 space-y-4 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#0066FF]/15 flex flex-col justify-between"
            >
              {/* Standard 16:10 Cinematic Thumbnail */}
              <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#04060d] relative border border-white/5">
                <img
                  src={proj.cover || getProjectImage(proj.id, proj.type, 'cover')}
                  alt={proj.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Floating Clean Brand Pill (No numbers!) */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 text-white text-xs font-bold shadow-md">
                  {proj.clientFa || proj.brand}
                </div>

                {/* Subtle Hover Gradient Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Minimal Clean Details (Uncluttered, High Legibility) */}
              <div className="space-y-2 px-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[#388bfd] font-bold">{proj.typeFa}</span>
                  {proj.year && (
                    <span className="font-mono text-slate-400">سال {toPersianDigits(proj.year)}</span>
                  )}
                </div>

                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#0066FF] transition-colors leading-snug">
                    {proj.displayNameFa || proj.name}
                  </h3>
                  <ArrowUpLeft className="w-5 h-5 text-slate-500 group-hover:text-[#0066FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. BRAND PICTOGRAMS & ICONOGRAPHY SYSTEM (DISTINCT SECTION) */}
      {/* ------------------------------------------------------------- */}
      <BrandPictogramsSection projects={INITIAL_PICTOGRAM_PROJECTS} />

      {/* ------------------------------------------------------------- */}
      {/* 5. DIGITAL CATALOGS & MOBILE-OPTIMIZED PDF (DISTINCT SECTION) */}
      {/* ------------------------------------------------------------- */}
      <DigitalCatalogsSection catalogs={INITIAL_CATALOG_PROJECTS} />

    </div>
  );
};
