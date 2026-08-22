import React, { useState } from 'react';
import { DigitalCatalogProject } from '../types';
import { toPersianDigits } from '../utils/persian';
import { 
  BookOpen, 
  Smartphone, 
  Download, 
  ArrowUpLeft, 
  Layers, 
  Eye, 
  FileText, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { InteractiveCatalogViewer } from './InteractiveCatalogViewer';

interface DigitalCatalogsSectionProps {
  catalogs: DigitalCatalogProject[];
  onOpenCMS?: () => void;
}

export const DigitalCatalogsSection: React.FC<DigitalCatalogsSectionProps> = ({
  catalogs,
  onOpenCMS
}) => {
  const [activeCatalog, setActiveCatalog] = useState<DigitalCatalogProject | null>(null);

  return (
    <section className="space-y-8 text-right" id="catalogs-section">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              کاتالوگ‌های دیجیتال، اسناد تعاملی و نسخه موبایل (PDF & Flipbook)
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              {toPersianDigits(catalogs.length)} سند تعاملی
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            طراحی کاتالوگ با قطع عمودی استاندارد موبایل (۹:۱۶)، قابلیت ورق‌زدن تعاملی، دانلود PDF و مطالعه سریع روی انواع گوشی‌ها
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono hidden md:block">
            Mobile-First PDF • Interactive Flipbook
          </span>
        </div>
      </div>

      {/* Catalogs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {catalogs.map((catalog) => {
          const isMobile = catalog.aspectRatio === 'mobile-portrait';
          
          return (
            <div
              key={catalog.id}
              className="group rounded-3xl bg-[#090e1a] border border-white/10 hover:border-emerald-500/50 transition-all duration-300 p-5 space-y-4 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-between"
            >
              {/* Cover / First Spread Display */}
              <div 
                onClick={() => setActiveCatalog(catalog)}
                className="aspect-[16/10] rounded-2xl overflow-hidden bg-[#04060d] relative border border-white/5 cursor-pointer shadow-inner"
              >
                <img
                  src={catalog.pages[0]?.imageUrl || catalog.cover}
                  alt={catalog.titleFa}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Badges: Brand & Mobile Optimized Tag */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-white text-xs font-bold">
                    {catalog.clientFa}
                  </span>
                  {catalog.isMobileOptimized ? (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-black text-xs font-bold flex items-center gap-1 shadow-md">
                      <Smartphone className="w-3 h-3" />
                      <span>قطع موبایل</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-500/90 text-white text-xs font-bold flex items-center gap-1 shadow-md">
                      <FileText className="w-3 h-3" />
                      <span>سند A4</span>
                    </span>
                  )}
                </div>

                {/* Page count pill */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[11px] font-mono text-slate-200 border border-white/10">
                  {toPersianDigits(catalog.pageCount)} صفحه ورق‌خور
                </div>

                {/* Interactive Flipbook Trigger Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>ورق‌زدن و مطالعه تعاملی (Flipbook)</span>
                </div>
              </div>

              {/* Information & Actions */}
              <div className="space-y-3 px-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="text-emerald-400 font-bold">{catalog.categoryFa}</span>
                  <span className="font-mono text-slate-400">سال {toPersianDigits(catalog.year)}</span>
                </div>

                <div 
                  onClick={() => setActiveCatalog(catalog)}
                  className="flex items-start justify-between gap-2 cursor-pointer"
                >
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                    {catalog.titleFa}
                  </h3>
                  <ArrowUpLeft className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-normal">
                  {catalog.descriptionFa}
                </p>

                {/* Interactive Action Buttons */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveCatalog(catalog)}
                    className="flex-1 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>ورق‌زدن صفحات</span>
                  </button>

                  {catalog.pdfUrl && (
                    <a
                      href={catalog.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-medium flex items-center gap-1 transition-colors"
                      title="دانلود نسخه PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">PDF</span>
                    </a>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Interactive Flipbook Viewer Modal */}
      {activeCatalog && (
        <InteractiveCatalogViewer
          catalog={activeCatalog}
          onClose={() => setActiveCatalog(null)}
        />
      )}

    </section>
  );
};
