import React, { useState, useMemo } from 'react';
import { Project } from '../types';
import { useProjects } from '../context/ProjectContext';
import { toPersianDigits } from '../utils/persian';
import { getProjectImage } from '../data/projectImages';
import { 
  Search, 
  LayoutGrid, 
  List, 
  ArrowLeft, 
  X, 
  FolderArchive,
  Star,
  Plus,
  ArrowUpLeft
} from 'lucide-react';

interface AllProjectsArchiveProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const AllProjectsArchive: React.FC<AllProjectsArchiveProps> = ({
  projects,
  onSelectProject
}) => {
  const { openEditor } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Available brands
  const brands = useMemo(() => {
    const set = new Set(projects.map(p => p.brand || p.client).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [projects]);

  // Available years
  const years = ['all', '۱۴۰۵', '۱۴۰۴', '۱۴۰۳', '۱۴۰۲'];

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = (p.name || '').toLowerCase().includes(q);
        const matchOriginal = (p.originalName || '').toLowerCase().includes(q);
        const matchFa = (p.displayNameFa || '').toLowerCase().includes(q);
        const matchEn = (p.displayNameEn || '').toLowerCase().includes(q);
        const matchBrand = (p.brand || p.client || '').toLowerCase().includes(q) || (p.clientFa || '').toLowerCase().includes(q);
        const matchDesc = (p.description || '').toLowerCase().includes(q) || (p.shortDescription || '').toLowerCase().includes(q);
        const matchTags = (p.tags || []).some(t => t.toLowerCase().includes(q));

        if (!matchName && !matchOriginal && !matchFa && !matchEn && !matchBrand && !matchDesc && !matchTags) {
          return false;
        }
      }

      if (selectedBrand !== 'all' && (p.brand !== selectedBrand && p.client !== selectedBrand)) {
        return false;
      }

      if (selectedType !== 'all') {
        const pTypes = Array.isArray(p.type) ? p.type : [p.type];
        if (!pTypes.includes(selectedType as any)) return false;
      }

      if (selectedYear !== 'all' && toPersianDigits(p.year?.toString() || '') !== selectedYear) {
        return false;
      }

      return true;
    });
  }, [projects, searchQuery, selectedBrand, selectedType, selectedYear]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('all');
    setSelectedType('all');
    setSelectedYear('all');
  };

  const hasActiveFilters = searchQuery !== '' || selectedBrand !== 'all' || selectedType !== 'all' || selectedYear !== 'all';

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20 text-right space-y-8">
      
      {/* ------------------------------------------------------------- */}
      {/* TOP HEADER */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-white/10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0066FF]">
            <FolderArchive className="w-4 h-4" />
            <span>آرشیو کامل پروژه‌ها</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-relaxed">
            کلیه نمونه‌کارها ({toPersianDigits(filteredProjects.length)})
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            فهرست تمام وب‌سایت‌ها، داشبوردها، اپلیکیشن‌ها و دیزاین‌سیستم‌ها
          </p>
        </div>

        {/* Top Controls: Search Bar & View Mode */}
        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          {/* Direct Add New Project Button (CMS) */}
          <button
            onClick={() => openEditor()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/10 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#0066FF]" />
            <span>افزودن پروژه جدید</span>
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-[#0a0e1c] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-[#0066FF] text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="نمای گرید بصری"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-[#0066FF] text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="نمای جدولی فشرده"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* FILTER BAR & SEARCH INPUT */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#0a0e1c] rounded-2xl border border-white/10 p-4 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-3">
          
          {/* Live Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در نام پروژه، برند، توضیحات یا دسته‌بندی..."
              className="w-full bg-black/40 border border-white/10 focus:border-[#0066FF] rounded-xl pr-10 pl-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Reset */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-rose-400 hover:text-rose-300 font-medium px-3 py-2 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer whitespace-nowrap"
            >
              پاک کردن همه فیلترها
            </button>
          )}

        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MAIN TWO-COLUMN LAYOUT (SIDEBAR FILTERS + PROJECTS GRID) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        
        {/* RIGHT SIDEBAR: BRAND & YEAR FILTERS */}
        <div className="lg:col-span-4 xl:col-span-3 order-2 lg:order-1 bg-[#0a0e1c] rounded-2xl border border-white/10 p-5 space-y-5 sticky top-28 shadow-xl">
          
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <span className="text-xs sm:text-sm font-bold text-white">فیلترهای طبقه‌بندی</span>
            <span className="text-[11px] text-slate-400 font-mono">{toPersianDigits(filteredProjects.length)} نتیجه</span>
          </div>

          {/* Brand Filter */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-slate-300">برند و کارفرما</label>
            <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
              {brands.map(brand => {
                const isSelected = selectedBrand === brand;
                const count = brand === 'all' 
                  ? projects.length 
                  : projects.filter(p => p.brand === brand || p.client === brand).length;
                return (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`w-full text-right px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#0066FF] text-white font-bold'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{brand === 'all' ? 'همه برندها' : brand}</span>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400'
                    }`}>
                      {toPersianDigits(count)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Year Filter */}
          <div className="space-y-2.5 pt-3 border-t border-white/5">
            <label className="text-xs font-semibold text-slate-300">سال طراحی</label>
            <div className="grid grid-cols-2 gap-2">
              {years.map(yr => {
                const isSelected = selectedYear === yr;
                return (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-center cursor-pointer ${
                      isSelected
                        ? 'bg-[#0066FF] text-white font-bold'
                        : 'bg-white/[0.02] text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    {yr === 'all' ? 'همه سال‌ها' : toPersianDigits(yr)}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* LEFT MAIN AREA: GRID / TABLE */}
        <div className="lg:col-span-8 xl:col-span-9 order-1 lg:order-2 space-y-5">
          
          {filteredProjects.length === 0 ? (
            <div className="p-12 text-center bg-[#0a0e1c] rounded-2xl border border-white/10 space-y-4">
              <FolderArchive className="w-10 h-10 text-slate-500 mx-auto" />
              <div className="text-base font-bold text-white">هیچ پروژه‌ای با این فیلترها یافت نشد</div>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-[#0066FF] text-white text-xs font-bold cursor-pointer"
              >
                پاک کردن فیلترها
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* CLEANEST SIMPLIFIED GRID VIEW (ONLY IMAGE + TITLE) */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className="bg-[#0a0e1c] border border-white/10 hover:border-[#0066FF] rounded-2xl p-3.5 transition-all duration-300 cursor-pointer group flex flex-col justify-between space-y-3 shadow-lg hover:shadow-2xl hover:shadow-[#0066FF]/20"
                >
                  {/* Standard Crisp Image Preview */}
                  <div className="rounded-xl overflow-hidden bg-[#04060d] aspect-[16/10] relative border border-white/5">
                    <img
                      src={project.cover || getProjectImage(project.id, project.type, 'cover')}
                      alt={project.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>

                  {/* Only Project Title */}
                  <div className="px-1 py-1">
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#0066FF] transition-colors line-clamp-1 leading-snug">
                      {project.displayNameFa || project.name}
                    </h3>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            /* CLEAN EXECUTIVE TABLE VIEW */
            <div className="bg-[#0a0e1c] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs sm:text-sm">
                  <thead className="bg-[#0f1428] text-slate-300 border-b border-white/10">
                    <tr>
                      <th className="p-4 font-bold">نام پروژه</th>
                      <th className="p-4 font-bold">برند / کارفرما</th>
                      <th className="p-4 font-bold">دسته‌بندی</th>
                      <th className="p-4 font-bold">سال</th>
                      <th className="p-4 font-bold text-center">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredProjects.map(project => (
                      <tr 
                        key={project.id}
                        onClick={() => onSelectProject(project)}
                        className="hover:bg-white/[0.04] transition-colors cursor-pointer text-slate-300"
                      >
                        <td className="p-4 font-bold text-white">
                          <div className="flex items-center gap-2">
                            {project.featured && (
                              <Star className="w-4 h-4 text-[#0066FF] fill-[#0066FF] flex-shrink-0" />
                            )}
                            <span className="truncate">{project.displayNameFa || project.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-slate-300">{project.clientFa || project.brand}</td>
                        <td className="p-4 text-slate-400">{project.typeFa || project.type || 'پورتال'}</td>
                        <td className="p-4 font-mono">{toPersianDigits(project.year || '—')}</td>
                        <td className="p-4 text-center">
                          <span className="text-xs text-[#0066FF] font-bold group-hover:underline">
                            مشاهده
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
