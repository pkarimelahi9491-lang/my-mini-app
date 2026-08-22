import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'overview' | 'selected' | 'archive') => void;
  onOpenPresentation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#030305] border-t border-white/10 text-slate-400 mt-16 py-8">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        
        {/* Brand & Note */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#0066FF] text-white flex items-center justify-center font-black text-xs font-display shadow-md shadow-[#0066FF]/30">
            S
          </div>
          <div>
            <span className="text-white font-bold">SHADOW / استودیو سایه</span>
            <span className="mx-2 text-slate-600">•</span>
            <span className="font-mono text-slate-400">2023–2026 ARCHIVE</span>
          </div>
        </div>

        {/* Navigation & Back to Top */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onSelectTab('overview')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            خلاصه مدیریتی
          </button>
          <button 
            onClick={() => onSelectTab('selected')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            ۱۰ پروژه ویژه
          </button>
          <button 
            onClick={() => onSelectTab('archive')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            کاتالوگ کامل
          </button>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer pr-2 border-r border-white/10"
          >
            <span>بازگشت به بالا</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mt-3 text-center sm:text-right text-[11px] text-slate-600 font-mono">
        تمامی داده‌ها، ساختارها و مستندات مبتنی بر پروژه‌های واقعی طراحی شده توسط تیم UI/UX استودیو سایه است.
      </div>
    </footer>
  );
};
