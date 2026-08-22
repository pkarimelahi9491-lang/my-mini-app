import React, { useState, useMemo } from 'react';
import { Project, ContentStatus, AssetStatus } from '../../types';
import { useProjects } from '../../context/ProjectContext';
import { detectDuplicates, DuplicatePair } from '../../utils/readiness';
import { getProjectImage } from '../../data/projectImages';
import { 
  X, Plus, Search, Filter, AlertTriangle, Download, Upload, 
  RefreshCw, Edit3, Trash2, Copy, Eye, Star, CheckCircle, 
  Sparkles, Layers, ArrowUpDown, ChevronRight, FileJson, FileText
} from 'lucide-react';

interface ProjectsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectsDashboard: React.FC<ProjectsDashboardProps> = ({
  isOpen,
  onClose,
  onSelectProject
}) => {
  const { 
    projects, 
    brands, 
    openEditor, 
    duplicateProject, 
    deleteProject, 
    mergeProjects, 
    exportJson, 
    importJson, 
    resetToInitial 
  } = useProjects();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'readiness' | 'featured' | 'newest' | 'oldest' | 'alphabetical' | 'brand'>('featured');
  const [duplicateDismissed, setDuplicateDismissed] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  // Duplicate pairs detection
  const duplicates = useMemo(() => {
    return detectDuplicates(projects);
  }, [projects]);

  // Filtered & Sorted list
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Search query matching Persian name, English name, Original name, brand, tags, type, description
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => {
        const name = (p.name || '').toLowerCase();
        const originalName = (p.originalName || '').toLowerCase();
        const faName = (p.displayNameFa || '').toLowerCase();
        const enName = (p.displayNameEn || '').toLowerCase();
        const brand = (p.brand || '').toLowerCase();
        const desc = (p.description || '').toLowerCase();
        const shortDesc = (p.shortDescription || '').toLowerCase();
        const tags = (p.tags || []).join(' ').toLowerCase();
        const typeStr = Array.isArray(p.type) ? p.type.join(' ') : (p.type || '');

        return (
          name.includes(q) ||
          originalName.includes(q) ||
          faName.includes(q) ||
          enName.includes(q) ||
          brand.includes(q) ||
          desc.includes(q) ||
          shortDesc.includes(q) ||
          tags.includes(q) ||
          typeStr.toLowerCase().includes(q)
        );
      });
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      result = result.filter(p => p.brand === selectedBrand);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      if (selectedStatus === 'featured') {
        result = result.filter(p => p.featured);
      } else if (selectedStatus === 'missing-cover') {
        result = result.filter(p => !p.cover);
      } else if (selectedStatus === 'missing-assets') {
        result = result.filter(p => (p.gallery?.length || 0) === 0 && (p.assets?.length || 0) === 0);
      } else {
        result = result.filter(p => p.contentStatus === selectedStatus);
      }
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (b.caseStudyReadinessScore || 0) - (a.caseStudyReadinessScore || 0);
      }
      if (sortBy === 'readiness') {
        return (b.caseStudyReadinessScore || 0) - (a.caseStudyReadinessScore || 0);
      }
      if (sortBy === 'newest') {
        return (b.year || 0) - (a.year || 0);
      }
      if (sortBy === 'oldest') {
        return (a.year || 0) - (b.year || 0);
      }
      if (sortBy === 'alphabetical') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'brand') {
        return (a.brand || '').localeCompare(b.brand || '');
      }
      return 0;
    });

    return result;
  }, [projects, searchQuery, selectedBrand, selectedStatus, sortBy]);

  if (!isOpen) return null;

  // Counters
  const totalCount = projects.length;
  const draftCount = projects.filter(p => p.contentStatus === 'draft').length;
  const partialCount = projects.filter(p => p.contentStatus === 'partial').length;
  const readyCount = projects.filter(p => p.contentStatus === 'ready' || p.contentStatus === 'featured-ready').length;
  const featuredCount = projects.filter(p => p.featured).length;
  const missingAssetsCount = projects.filter(p => (p.gallery?.length || 0) === 0 && (p.assets?.length || 0) === 0).length;

  const handleExportJson = () => {
    const dataStr = exportJson();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `shadow-projects-registry-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importJson(content);
      if (res.success) {
        setImportError(null);
        alert(`${res.count} پروژه با موفقیت ایمپورت و بارگذاری شد.`);
      } else {
        setImportError(res.error || 'خطا در بارگذاری');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in text-right">
      <div className="w-full max-w-7xl h-[94vh] rounded-3xl bg-[#090a10] border border-white/15 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Management Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF] animate-pulse" />
                <h1 className="text-base sm:text-lg font-black text-white">
                  استودیو مدیریت محتوا و دیتابیس پروژه‌ها (CMS & Architecture)
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-xs font-mono">
                  {totalCount} پروژه
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                معماری یکپارچه محتوا، سنجش آمادگی کیس‌استادی و مدیریت مدیاهای فیگما (۲۰۲۳–۲۰۲۶)
              </p>
            </div>
          </div>

          {/* Quick Actions (Add New Project, Export/Import, Reset) */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Create Project Button */}
            <button
              type="button"
              onClick={() => openEditor()}
              className="px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-[#0066FF]/25 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>پروژه جدید (زیر ۲ دقیقه)</span>
            </button>

            {/* Markdown Spec Template */}
            <a
              href="/uploads/projects/PROJECT_SPEC_TEMPLATE.md"
              download="PROJECT_SPEC_TEMPLATE.md"
              className="px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
              title="دانلود الگوی مارک‌داون استاندارد project.md برای پوشه پروژه‌ها"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">الگوی project.md</span>
            </a>

            {/* Export JSON */}
            <button
              type="button"
              onClick={handleExportJson}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 border border-white/10"
              title="دریافت فایل JSON از تمام دیتابیس پروژه‌ها"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">خروجی JSON</span>
            </button>

            {/* Import JSON */}
            <label className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 border border-white/10 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ایمپورت JSON</span>
              <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
            </label>

            {/* Reset to Default */}
            <button
              type="button"
              onClick={() => {
                if (confirm('آیا از بازنشانی کلی دیتابیس به مقادیر اولیه رجیستری اطمینان دارید؟')) {
                  resetToInitial();
                }
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-rose-400 border border-white/5"
              title="بازنشانی رجیستری به داده‌های پیش‌فرض"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Counter Summary Pills */}
        <div className="px-4 sm:px-6 py-3 border-b border-white/10 bg-black/40 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <button
            type="button"
            onClick={() => setSelectedStatus('all')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              selectedStatus === 'all' ? 'bg-white/15 text-white font-bold' : 'text-slate-400 hover:text-white bg-white/5'
            }`}
          >
            <span>همه پروژه‌ها</span>
            <span className="font-mono text-[10px] opacity-70">({totalCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus('featured')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              selectedStatus === 'featured' ? 'bg-[#0066FF] text-white font-bold' : 'text-slate-400 hover:text-white bg-white/5'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>منتخب (Featured)</span>
            <span className="font-mono text-[10px] opacity-80">({featuredCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus('ready')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              selectedStatus === 'ready' ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30' : 'text-slate-400 hover:text-white bg-white/5'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>آماده انتشار (Ready)</span>
            <span className="font-mono text-[10px] opacity-80">({readyCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus('partial')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              selectedStatus === 'partial' ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30' : 'text-slate-400 hover:text-white bg-white/5'
            }`}
          >
            <span>نیمه‌کامل (Partial)</span>
            <span className="font-mono text-[10px] opacity-80">({partialCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus('draft')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              selectedStatus === 'draft' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white bg-white/5'
            }`}
          >
            <span>پیش‌نویس اولیه (Draft)</span>
            <span className="font-mono text-[10px] opacity-80">({draftCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus('missing-assets')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              selectedStatus === 'missing-assets' ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30' : 'text-slate-400 hover:text-white bg-white/5'
            }`}
          >
            <span>بدون اسکرین (Missing Assets)</span>
            <span className="font-mono text-[10px] opacity-80">({missingAssetsCount})</span>
          </button>
        </div>

        {/* Duplicate Notification Banner */}
        {duplicates.length > 0 && !duplicateDismissed && (
          <div className="mx-4 sm:mx-6 mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5 text-amber-300">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-200">
                  تشخیص {duplicates.length} مورد تشابه یا تکراری احتمالی در پروژه‌ها (مانند Daewoo I Love Daewoo):
                </p>
                <p className="text-[11px] text-amber-300/80 mt-0.5">
                  هیچ داده‌ای به صورت خودکار حذف نمی‌شود. می‌توانید هر دو نسخه را نگه دارید یا اطلاعات آنها را ادغام کنید.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              {duplicates.slice(0, 1).map((dup, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (confirm(`آیا می‌خواهید پروژه «${dup.duplicate.name}» را در پروژه «${dup.original.name}» ادغام کنید؟`)) {
                      mergeProjects(dup.original.id, dup.duplicate.id);
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 font-bold text-[11px]"
                >
                  ادغام مورد اول (Merge)
                </button>
              ))}
              <button
                type="button"
                onClick={() => setDuplicateDismissed(true)}
                className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-[11px]"
              >
                بستن هشدار
              </button>
            </div>
          </div>
        )}

        {/* Search, Filter & Sort Controls */}
        <div className="p-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-white/5">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در نام، برند، تگ و توضیحات..."
              className="w-full pr-9 pl-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#0066FF]"
            />
          </div>

          {/* Brand Filter & Sort Dropdowns */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Brand Dropdown */}
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-[#0066FF]"
            >
              <option value="all">همه برندها ({brands.length})</option>
              {brands.map(b => (
                <option key={b.id} value={b.name}>{b.nameFa} ({b.name})</option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-[#0066FF]"
            >
              <option value="featured">مرتب‌سازی: منتخب → امتیاز</option>
              <option value="readiness">مرتب‌سازی: بیشترین امتیاز آمادگی</option>
              <option value="newest">مرتب‌سازی: جدیدترین سال</option>
              <option value="oldest">مرتب‌سازی: قدیمی‌ترین سال</option>
              <option value="alphabetical">مرتب‌سازی: حروف الفبا</option>
              <option value="brand">مرتب‌سازی: بر اساس برند</option>
            </select>
          </div>
        </div>

        {/* Projects Table / Executive List */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
          <div className="space-y-2">
            
            {/* Table Header */}
            <div className="hidden lg:grid grid-cols-12 gap-4 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] font-mono text-slate-400">
              <div className="col-span-4">پروژه و هویت بصری</div>
              <div className="col-span-2">برند و سال</div>
              <div className="col-span-2">وضعیت محتوا</div>
              <div className="col-span-2 text-center">امتیاز کیس‌استادی</div>
              <div className="col-span-2 text-left">عملیات و ویرایش</div>
            </div>

            {/* Projects Rows */}
            {filteredProjects.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-xs space-y-2">
                <p>هیچ پروژه‌ای با فیلترهای انتخابی یافت نشد.</p>
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setSelectedBrand('all'); setSelectedStatus('all'); }}
                  className="text-[#0066FF] hover:underline"
                >
                  پاکسازی فیلترها
                </button>
              </div>
            ) : (
              filteredProjects.map((p) => {
                const assetCount = (p.assets?.length || 0) + (p.gallery?.length || 0);
                const score = p.caseStudyReadinessScore || 0;

                return (
                  <div
                    key={p.id}
                    className="p-3 sm:p-4 rounded-2xl bg-[#0c0c14] border border-white/5 hover:border-white/20 transition-all flex flex-col lg:grid lg:grid-cols-12 gap-3 lg:gap-4 items-start lg:items-center"
                  >
                    {/* Project Identity */}
                    <div className="lg:col-span-4 flex items-center gap-3 w-full">
                      <div className="relative w-14 h-10 rounded-xl overflow-hidden bg-black/60 border border-white/10 flex-shrink-0">
                        {p.cover || getProjectImage(p.id, p.type, 'cover') ? (
                          <img 
                            src={p.cover || getProjectImage(p.id, p.type, 'cover')} 
                            alt={p.name} 
                            className="w-full h-full object-cover object-top" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-500">
                            بدون کاور
                          </div>
                        )}
                        {p.featured && (
                          <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#0066FF]" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm text-white truncate">{p.name}</span>
                          {p.featured && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/30">
                              Top 10
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {p.displayNameFa || p.shortDescription || '—'}
                        </p>
                      </div>
                    </div>

                    {/* Brand & Year */}
                    <div className="lg:col-span-2 flex items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-medium">
                        {p.brand}
                      </span>
                      <span className="font-mono text-slate-400">{p.year || '—'}</span>
                    </div>

                    {/* Content Status & Assets Count */}
                    <div className="lg:col-span-2 flex items-center gap-2 text-xs">
                      <span className={`px-2 py-0.5 rounded-lg text-[11px] font-medium ${
                        p.contentStatus === 'ready' || p.contentStatus === 'featured-ready'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : p.contentStatus === 'partial'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-white/5 text-slate-400'
                      }`}>
                        {p.contentStatus}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {assetCount} مدیا
                      </span>
                    </div>

                    {/* Case Study Readiness Score Bar */}
                    <div className="lg:col-span-2 w-full flex flex-col items-center gap-1 text-center">
                      <div className="flex items-center justify-between w-full max-w-32 text-[11px] font-mono">
                        <span className="text-slate-400">آمادگی:</span>
                        <span className={`font-bold ${
                          score >= 75 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-slate-400'
                        }`}>
                          {score}%
                        </span>
                      </div>
                      <div className="w-full max-w-32 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            score >= 75 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-[#0066FF]'
                          }`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>

                    {/* Actions Column */}
                    <div className="lg:col-span-2 flex items-center justify-end gap-1.5 w-full">
                      {/* Preview Button */}
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectProject(p);
                        }}
                        className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs flex items-center gap-1 border border-white/5 cursor-pointer"
                        title="مشاهده در قالب کیس‌استادی"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#0066FF]" />
                        <span className="hidden sm:inline">پرزنت</span>
                      </button>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => openEditor(p)}
                        className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-[#0066FF]/20 hover:bg-[#0066FF]/30 text-[#0066FF] hover:text-white text-xs font-bold flex items-center gap-1 border border-[#0066FF]/30 cursor-pointer"
                        title="ویرایش متادیتا و اسکرین‌ها"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">ویرایش</span>
                      </button>

                      {/* Duplicate */}
                      <button
                        type="button"
                        onClick={() => duplicateProject(p.id)}
                        className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200"
                        title="ایجاد کپی"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`آیا از حذف پروژه «${p.name}» اطمینان دارید؟`)) {
                            deleteProject(p.id);
                          }
                        }}
                        className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300"
                        title="حذف پروژه"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })
            )}

          </div>
        </div>

        {/* Bottom Footer Info */}
        <div className="p-4 border-t border-white/10 bg-black/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Shadow Design Architecture:</span>
            <span>تمام تغییرات به صورت بلادرنگ در حافظه مرورگر ذخیره و در ویترین منتشر می‌شود.</span>
          </div>
          <div className="font-mono text-[11px] text-slate-500">
            Phase 2 Data Engine Active • React + TypeScript
          </div>
        </div>

      </div>
    </div>
  );
};
