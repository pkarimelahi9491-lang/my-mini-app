import React, { useState } from 'react';
import { 
  Play, 
  Search, 
  Compass, 
  Star, 
  FolderArchive, 
  Menu, 
  X, 
  SlidersHorizontal, 
  Briefcase,
  MonitorPlay,
  Layers,
  ChevronLeft
} from 'lucide-react';
import { toPersianDigits } from '../utils/persian';

interface HeaderProps {
  activeTab: 'overview' | 'selected' | 'archive';
  setActiveTab: (tab: 'overview' | 'selected' | 'archive') => void;
  onOpenPresentation: () => void;
  onOpenSearch: () => void;
  onOpenCMS: () => void;
  totalProjectsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenPresentation,
  onOpenSearch,
  onOpenCMS,
  totalProjectsCount
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Executive Briefing Console Top Bar */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#07080d]/95 backdrop-blur-xl border-b border-white/10 shadow-xl transition-all">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3">
          
          {/* Left: Brand Identity & Executive Meeting Indicator */}
          <div className="flex items-center gap-3.5 sm:gap-5">
            <button 
              onClick={() => setActiveTab('overview')}
              className="flex items-center gap-3 group focus:outline-none cursor-pointer text-right"
              title="صفحه نخست و خلاصه مدیریتی"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0066FF] flex items-center justify-center text-white font-black text-sm sm:text-base tracking-tight shadow-lg shadow-[#0066FF]/30 group-hover:scale-105 transition-transform border border-white/10">
                S
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-sm sm:text-base tracking-wider text-white uppercase leading-none">
                    SHADOW
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/30">
                    ارائه راهبردی
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-400 tracking-wider mt-1 hidden sm:inline">
                  EXECUTIVE PORTFOLIO & DESIGN REVIEW
                </span>
              </div>
            </button>
          </div>

          {/* Center: Executive Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-[#10121c] p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#0066FF] text-white shadow-md shadow-[#0066FF]/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>خلاصه مدیریتی</span>
            </button>

            <button
              onClick={() => setActiveTab('selected')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'selected'
                  ? 'bg-[#0066FF] text-white shadow-md shadow-[#0066FF]/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>۱۰ پروژه ویژه</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 text-white font-mono">
                {toPersianDigits(10)}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('archive')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'archive'
                  ? 'bg-[#0066FF] text-white shadow-md shadow-[#0066FF]/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <FolderArchive className="w-3.5 h-3.5" />
              <span>کاتالوگ جامع پروژه‌ها</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono">
                {toPersianDigits(totalProjectsCount)}
              </span>
            </button>

            <a
              href="#pictograms"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 transition-all cursor-pointer"
              title="مشاهده بخش پیکتوگرام‌های برندها"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>پیکتوگرام‌ها</span>
            </a>

            <a
              href="#catalogs"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-emerald-400 hover:bg-white/5 transition-all cursor-pointer"
              title="مشاهده بخش کاتالوگ‌های دیجیتال و PDF"
            >
              <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
              <span>کاتالوگ‌های دیجیتال</span>
            </a>
          </nav>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-2 text-xs"
              title="جستجوی سریع پروژه‌ها"
              aria-label="جستجوی پروژه‌ها"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden lg:inline text-xs font-medium">جستجو</span>
            </button>

            {/* CMS / Content Editor Trigger */}
            <button
              onClick={onOpenCMS}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
              title="مدیریت و ویرایش پروژه‌ها"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#0066FF]" />
              <span className="hidden xl:inline">مدیریت (CMS)</span>
            </button>

            {/* Main Presentation Trigger */}
            <button
              onClick={onOpenPresentation}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052cc] hover:from-[#0052cc] hover:to-[#004099] text-white font-bold text-xs shadow-lg shadow-[#0066FF]/30 transition-all cursor-pointer hover:scale-[1.02] border border-white/20"
              title="شروع حالت ارائه تمام‌صفحه"
            >
              <MonitorPlay className="w-4 h-4 text-white" />
              <span className="text-xs sm:text-sm">ارائه تمام‌صفحه</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
              aria-label="منوی موبایل"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed top-16 inset-x-0 z-40 md:hidden bg-[#0a0b12]/98 backdrop-blur-2xl border-b border-white/10 p-4 space-y-2 shadow-2xl text-right">
          <button
            onClick={() => {
              setActiveTab('overview');
              setMobileOpen(false);
            }}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold ${
              activeTab === 'overview' ? 'bg-[#0066FF] text-white' : 'bg-white/5 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4" />
              <span>خلاصه مدیریتی</span>
            </div>
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setActiveTab('selected');
              setMobileOpen(false);
            }}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold ${
              activeTab === 'selected' ? 'bg-[#0066FF] text-white' : 'bg-white/5 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>۱۰ پروژه ویژه</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-white/20 text-white font-mono text-[10px]">
              {toPersianDigits(10)}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('archive');
              setMobileOpen(false);
            }}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold ${
              activeTab === 'archive' ? 'bg-[#0066FF] text-white' : 'bg-white/5 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <FolderArchive className="w-4 h-4" />
              <span>کاتالوگ جامع پروژه‌ها</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-white/10 text-slate-300 font-mono text-[10px]">
              {toPersianDigits(totalProjectsCount)}
            </span>
          </button>

          <a
            href="#pictograms"
            onClick={() => setMobileOpen(false)}
            className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold bg-white/5 text-slate-300 hover:text-cyan-400"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>پیکتوگرام‌ها و آیکونوگرافی برند</span>
            </div>
            <ChevronLeft className="w-4 h-4 text-slate-500" />
          </a>

          <a
            href="#catalogs"
            onClick={() => setMobileOpen(false)}
            className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold bg-white/5 text-slate-300 hover:text-emerald-400"
          >
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span>کاتالوگ‌های دیجیتال و PDF موبایل</span>
            </div>
            <ChevronLeft className="w-4 h-4 text-slate-500" />
          </a>
        </div>
      )}
    </>
  );
};
