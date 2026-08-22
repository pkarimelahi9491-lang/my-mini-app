import React, { useState, useEffect, useRef } from 'react';
import { GalleryItem } from '../types';
import { toPersianDigits } from '../utils/persian';
import { X, ChevronRight, ChevronLeft, ZoomIn, ZoomOut, RotateCcw, Maximize2, Download, Image as ImageIcon } from 'lucide-react';

interface LightboxGalleryProps {
  item: GalleryItem;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (item: GalleryItem) => void;
}

export const LightboxGallery: React.FC<LightboxGalleryProps> = ({
  item,
  items,
  onClose,
  onNavigate
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

  const currentIndex = items.findIndex(i => i.id === item.id);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const nextItem = items[(safeIndex + 1) % items.length];
  const prevItem = items[(safeIndex - 1 + items.length) % items.length];

  // Reset zoom & pan on item change
  useEffect(() => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    setImgLoaded(false);
    setImgError(false);
  }, [item.id]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate(nextItem);
      } else if (e.key === 'ArrowRight') {
        onNavigate(prevItem);
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel(prev => Math.min(prev + 0.25, 3));
      } else if (e.key === '-') {
        setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
      } else if (e.key === '0') {
        setZoomLevel(1);
        setPosition({ x: 0, y: 0 });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextItem, prevItem, onClose, onNavigate]);

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  const resetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsPanning(true);
      setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning && zoomLevel > 1) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const currentImageSrc = item.image || item.imageUrl || '';

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#030305]/95 backdrop-blur-2xl flex flex-col justify-between select-none animate-in fade-in duration-200"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      
      {/* Top Header Controls Bar */}
      <div className="h-16 px-4 sm:px-6 bg-[#07070a]/90 border-b border-white/10 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-[#0066FF]/15 text-[#0066FF] border border-[#0066FF]/30 text-xs font-bold">
            {item.category || 'طراحی رابط کاربری'}
          </span>
          <h3 className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
            {item.title}
          </h3>
        </div>

        {/* Zoom & Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={zoomOut}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10"
            title="بزرگ‌نمایی کمتر (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-slate-300 w-12 text-center">
            {toPersianDigits(Math.round(zoomLevel * 100))}٪
          </span>
          <button
            onClick={zoomIn}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10"
            title="بزرگ‌نمایی بیشتر (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={resetZoom}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10"
            title="بازنشانی اندازه (0)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-white/10 mx-1 sm:mx-2" />

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition-colors cursor-pointer border border-white/10"
            title="بستن (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Canvas View */}
      <div 
        className="flex-1 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden cursor-default"
        onMouseDown={handleMouseDown}
      >
        {/* Navigation Arrows */}
        {items.length > 1 && (
          <>
            <button
              onClick={() => onNavigate(prevItem)}
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-3.5 rounded-2xl bg-[#08080c]/90 hover:bg-[#0066FF] text-white border border-white/10 shadow-2xl transition-all cursor-pointer group"
              title="تصویر قبلی (→)"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate(nextItem)}
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-3.5 rounded-2xl bg-[#08080c]/90 hover:bg-[#0066FF] text-white border border-white/10 shadow-2xl transition-all cursor-pointer group"
              title="تصویر بعدی (←)"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
            </button>
          </>
        )}

        {/* Image Display */}
        <div 
          className={`relative max-w-6xl max-h-[80vh] flex items-center justify-center transition-transform duration-150 ${zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
            transformOrigin: 'center center'
          }}
        >
          {!imgLoaded && !imgError && (
            <div className="absolute inset-0 flex items-center justify-center min-w-[300px] min-h-[300px]">
              <div className="w-8 h-8 border-2 border-[#0066FF] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {currentImageSrc && !imgError ? (
            <img
              src={currentImageSrc}
              alt={item.title}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`max-w-full max-h-[78vh] object-contain rounded-2xl shadow-2xl border border-white/10 transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              draggable={false}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="p-12 rounded-3xl bg-[#08080c] border border-white/10 text-center space-y-4 max-w-md">
              <ImageIcon className="w-12 h-12 text-slate-500 mx-auto" />
              <h4 className="text-base font-bold text-white">{item.title}</h4>
              <p className="text-xs text-slate-400">{item.caption || 'پیش‌نمایش این فریم دیزاین در حال بارگذاری است.'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status Bar & Caption */}
      <div className="h-16 px-4 sm:px-6 bg-[#07070a]/90 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 z-30">
        <div className="flex items-center gap-4">
          <span className="font-bold text-white">
            فریم {toPersianDigits(safeIndex + 1)} از {toPersianDigits(items.length)}
          </span>
          {item.caption && (
            <span className="hidden sm:inline text-slate-400 truncate max-w-md border-r border-white/10 pr-4">
              {item.caption}
            </span>
          )}
        </div>

        <div className="text-slate-500 text-[11px] hidden sm:flex items-center gap-3">
          <span>کلیدهای جهت‌نما: ناوبری</span>
          <span>•</span>
          <span>ESC: بستن</span>
        </div>
      </div>

    </div>
  );
};
