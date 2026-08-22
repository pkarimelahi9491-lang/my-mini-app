import React, { useState, useEffect } from 'react';
import { Project, NormalizedProjectType, NormalizedPlatform, DisciplineType, ServiceType, DesignDecision } from '../../types';
import { useProjects } from '../../context/ProjectContext';
import { validateProject, calculateCaseStudyReadinessScore } from '../../utils/readiness';
import { AssetUploader } from './AssetUploader';
import { SectionBuilder } from './SectionBuilder';
import { 
  X, Save, Eye, CheckCircle2, AlertTriangle, Sparkles, 
  ExternalLink, Layers, FileText, Image as ImageIcon, 
  Sliders, Link2, GitBranch, Search, Star, Plus, Trash2, ArrowRight
} from 'lucide-react';

interface ProjectEditorModalProps {
  project?: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onPreview: (project: Project) => void;
}

type TabType = 'overview' | 'scope' | 'assets' | 'casestudy' | 'sections' | 'links' | 'relations' | 'quality';

const ALL_TYPES: { key: NormalizedProjectType; label: string }[] = [
  { key: 'website', label: 'وب‌سایت مرجع (Website)' },
  { key: 'landing-page', label: 'لندینگ پیج و کمپین (Landing)' },
  { key: 'mobile-app', label: 'اپلیکیشن موبایل (Mobile App)' },
  { key: 'product', label: 'طراحی محصول دیجیتال (Product)' },
  { key: 'ecommerce', label: 'تجارت الکترونیک (E-commerce)' },
  { key: 'design-system', label: 'سیستم دیزاین (Design System)' },
  { key: 'uiux', label: 'رابط و تجربه کاربری (UI/UX)' },
  { key: 'campaign', label: 'کمپین بصری (Campaign)' },
  { key: 'internal-tool', label: 'ابزار داخلی و ماژول (Internal Tool)' }
];

const ALL_PLATFORMS: { key: NormalizedPlatform; label: string }[] = [
  { key: 'desktop', label: 'دسکتاپ (Desktop)' },
  { key: 'mobile', label: 'موبایل (Mobile)' },
  { key: 'tablet', label: 'تبلت (Tablet)' },
  { key: 'responsive', label: 'واکنش‌گرا کامل (Responsive Web)' },
  { key: 'ios', label: 'آی‌او‌اس (iOS App)' },
  { key: 'android', label: 'اندروید (Android App)' }
];

const ALL_DISCIPLINES: { key: DisciplineType; label: string }[] = [
  { key: 'ux-design', label: 'طراحی تجربه کاربری (UX)' },
  { key: 'ui-design', label: 'طراحی رابط کاربری (UI)' },
  { key: 'product-design', label: 'طراحی محصول دیجیتال' },
  { key: 'design-system', label: 'سیستم دیزاین و توکن‌ها' },
  { key: 'interaction-design', label: 'طراحی تعامل و موشن' },
  { key: 'visual-design', label: 'جهت‌دهی بصری (Visual Direction)' },
  { key: 'content', label: 'تولید محتوا و استراتژی متنی' },
  { key: 'art-direction', label: 'مدیریت هنری (Art Direction)' },
  { key: 'graphic-design', label: 'گرافیک دیزاین و هویت' }
];

const ALL_SERVICES: { key: ServiceType; label: string }[] = [
  { key: 'research', label: 'پژوهش و بنچمارک (Research)' },
  { key: 'strategy', label: 'استراتژی محصول (Strategy)' },
  { key: 'information-architecture', label: 'معماری اطلاعات (IA)' },
  { key: 'user-flow', label: 'جریان کاربری (User Flow)' },
  { key: 'wireframing', label: 'وایرفریم و پروتوتایپ' },
  { key: 'ui-design', label: 'طراحی رابط کاربری (UI)' },
  { key: 'responsive-design', label: 'طراحی ریسپانسیو چنددیوایس' },
  { key: 'design-system', label: 'کتابخانه کامپوننت سیستم دیزاین' },
  { key: 'interaction', label: 'میکرواینتراکشن و موشن' },
  { key: 'campaign', label: 'طراحی کمپین تعاملی' },
  { key: 'art-direction', label: 'آرت دایرکشن اختصاصی' }
];

export const ProjectEditorModal: React.FC<ProjectEditorModalProps> = ({
  project,
  isOpen,
  onClose,
  onPreview
}) => {
  const { createProject, updateProject, brands, families, projects, setCover, addAsset, updateAsset, deleteAsset, reorderAssets, addSection, updateSection, deleteSection, reorderSections } = useProjects();
  
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [formData, setFormData] = useState<Partial<Project>>({});
  const [tagInput, setTagInput] = useState('');
  const [scopeInput, setScopeInput] = useState('');

  useEffect(() => {
    if (project) {
      setFormData({ ...project });
    } else {
      // Default blank template for new project
      setFormData({
        id: `project-${Date.now()}`,
        slug: `new-project-${Date.now().toString().slice(-4)}`,
        name: '',
        displayNameFa: '',
        displayNameEn: '',
        brand: 'Daewoo',
        clientFa: 'دوو',
        year: 2025,
        type: ['website'],
        platform: ['desktop', 'mobile', 'responsive'],
        featured: false,
        featuredScore: 60,
        shortDescription: '',
        description: '',
        context: '',
        challenge: '',
        solution: '',
        scope: ['UI/UX Design', 'Responsive Layout'],
        services: ['ui-design', 'responsive-design'],
        disciplines: ['ui-design', 'ux-design'],
        tags: ['UI/UX', 'Digital'],
        gallery: [],
        assets: [],
        sections: [],
        designDecisions: []
      });
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const currentScore = calculateCaseStudyReadinessScore(formData);
  const validation = validateProject(formData);

  const handleFieldChange = (field: keyof Project, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: 'type' | 'platform' | 'disciplines' | 'services', itemKey: string) => {
    const list = Array.isArray(formData[field]) ? [...(formData[field] as string[])] : [];
    const idx = list.indexOf(itemKey);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(itemKey);
    }
    handleFieldChange(field, list);
  };

  const handleSave = () => {
    if (!formData.name?.trim()) {
      alert('لطفاً نام پروژه را وارد کنید.');
      return;
    }

    if (project) {
      updateProject(project.id, formData);
    } else {
      createProject(formData);
    }
    onClose();
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const currentTags = formData.tags || [];
    if (!currentTags.includes(tagInput.trim())) {
      handleFieldChange('tags', [...currentTags, tagInput.trim()]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    handleFieldChange('tags', (formData.tags || []).filter(t => t !== tagToRemove));
  };

  const handleAddScopeItem = () => {
    if (!scopeInput.trim()) return;
    const current = formData.scope || [];
    handleFieldChange('scope', [...current, scopeInput.trim()]);
    setScopeInput('');
  };

  const handleRemoveScopeItem = (idx: number) => {
    const current = [...(formData.scope || [])];
    current.splice(idx, 1);
    handleFieldChange('scope', current);
  };

  const handleAddDesignDecision = () => {
    const current = formData.designDecisions || [];
    const num = (current.length + 1).toString().padStart(2, '۰');
    const newDecision: DesignDecision = {
      number: num,
      title: 'عنوان تصمیم استراتژیک',
      decision: 'شرح تصمیمی که در فرآیند طراحی گرفته شد...',
      rationale: 'چرایی و استدلال انتخاب این الگو...',
      impactArea: 'تجربه کاربری و نرخ تبدیل'
    };
    handleFieldChange('designDecisions', [...current, newDecision]);
  };

  const handleUpdateDecision = (idx: number, updates: Partial<DesignDecision>) => {
    const current = [...(formData.designDecisions || [])];
    current[idx] = { ...current[idx], ...updates };
    handleFieldChange('designDecisions', current);
  };

  const handleRemoveDecision = (idx: number) => {
    const current = [...(formData.designDecisions || [])];
    current.splice(idx, 1);
    handleFieldChange('designDecisions', current);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in text-right">
      <div className="w-full max-w-6xl max-h-[92vh] rounded-3xl bg-[#090a10] border border-white/15 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-4 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-white">
                  {project ? `ویرایش محتوای: ${formData.name || project.name}` : 'افزودن پروژه جدید به آرشیو'}
                </h2>
                {formData.featured && (
                  <span className="px-2 py-0.5 rounded-full bg-[#0066FF]/20 text-[#0066FF] text-[10px] font-bold border border-[#0066FF]/30">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Slug: {formData.slug || '—'} • Brand: {formData.brand || '—'}
              </p>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            {/* Live Readiness Gauge */}
            <div className="hidden md:flex flex-col items-end px-3 py-1.5 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-1.5 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
                <span className="text-slate-300 font-medium">Readiness Score:</span>
                <span className={`font-mono font-bold ${
                  currentScore >= 75 ? 'text-emerald-400' : currentScore >= 50 ? 'text-amber-400' : 'text-slate-400'
                }`}>
                  {currentScore}%
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                {validation.completedCount} / {validation.totalRecommendedCount} فیلد تکمیل‌شده
              </span>
            </div>

            {/* Preview Button */}
            <button
              type="button"
              onClick={() => {
                onPreview(formData as Project);
              }}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4 text-[#0066FF]" />
              <span className="hidden sm:inline">پیش‌نمایش کیس‌استادی</span>
            </button>

            {/* Save Button */}
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-[#0066FF]/30 transition-transform active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>ذخیره تغییرات</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 sm:px-6 border-b border-white/10 bg-black/40 flex items-center gap-1 overflow-x-auto no-scrollbar">
          {[
            { key: 'overview', label: '۱. مشخصات کلی', icon: FileText },
            { key: 'scope', label: '۲. اسکوپ و خدمات', icon: Sliders },
            { key: 'assets', label: '۳. مدیا و اسکرین‌ها', icon: ImageIcon, badge: (formData.assets?.length || 0).toString() },
            { key: 'casestudy', label: '۴. تصمیمات دیزاین', icon: Sparkles },
            { key: 'sections', label: '۵. چیدمان سکشن‌ها', icon: Layers, badge: (formData.sections?.length || 0).toString() },
            { key: 'links', label: '۶. لینک‌های فیگما و وب', icon: Link2 },
            { key: 'relations', label: '۷. اکوسیستم و روابط', icon: GitBranch },
            { key: 'quality', label: '۸. سنجش کیفیت و اعتبارسنجی', icon: CheckCircle2 }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key as TabType)}
                className={`py-3 px-3.5 text-xs font-medium border-b-2 flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.key
                    ? 'border-[#0066FF] text-white font-bold bg-white/[0.02]'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-white/10 text-slate-300">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">نام رسمی پروژه (Name): *</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleFieldChange('name', val);
                      if (!project) {
                        handleFieldChange('slug', val.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                      }
                    }}
                    placeholder="e.g. Daewoo Master Portal"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">نامک یکتا (Slug): *</label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => handleFieldChange('slug', e.target.value)}
                    placeholder="daewoo-website"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs font-mono text-slate-300 focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">عنوان فارسی نمایش:</label>
                  <input
                    type="text"
                    value={formData.displayNameFa || ''}
                    onChange={(e) => handleFieldChange('displayNameFa', e.target.value)}
                    placeholder="پرتال جامع و وب‌سایت مرکزی دوو"
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">نام اصلی/قدیمی (Original Name):</label>
                  <input
                    type="text"
                    value={formData.originalName || ''}
                    onChange={(e) => handleFieldChange('originalName', e.target.value)}
                    placeholder="نام تاریخی در سورس فیگما"
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-400 focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">برند پروژه (Brand):</label>
                  <select
                    value={formData.brand || 'Other'}
                    onChange={(e) => {
                      const b = e.target.value;
                      const brandObj = brands.find(x => x.name === b);
                      handleFieldChange('brand', b);
                      handleFieldChange('client', b);
                      handleFieldChange('clientFa', brandObj?.nameFa || b);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  >
                    {brands.map(b => (
                      <option key={b.id} value={b.name}>{b.nameFa} ({b.name})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">سال انجام پروژه:</label>
                  <input
                    type="number"
                    value={formData.year ?? ''}
                    onChange={(e) => handleFieldChange('year', e.target.value ? parseInt(e.target.value, 10) : null)}
                    placeholder="2025"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs font-mono text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">وضعیت پروژه در ویترین:</label>
                  <label className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(formData.featured)}
                      onChange={(e) => handleFieldChange('featured', e.target.checked)}
                      className="w-4 h-4 accent-[#0066FF] rounded"
                    />
                    <span className="text-xs text-slate-200 font-bold">نمایش در ۱۰ پروژه منتخب</span>
                  </label>
                </div>
              </div>

              {/* Types Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">دسته‌بندی نوع پروژه (چندانتخابی):</label>
                <div className="flex flex-wrap gap-2">
                  {ALL_TYPES.map(t => {
                    const isSelected = Array.isArray(formData.type) ? formData.type.includes(t.key) : formData.type === t.key;
                    return (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => handleArrayToggle('type', t.key)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-[#0066FF] text-white font-bold shadow-sm'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Platforms Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">پلتفرم‌های مقصد (چندانتخابی):</label>
                <div className="flex flex-wrap gap-2">
                  {ALL_PLATFORMS.map(p => {
                    const isSelected = Array.isArray(formData.platform) ? formData.platform.includes(p.key) : formData.platform === p.key;
                    return (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => handleArrayToggle('platform', p.key)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-[#0066FF] text-white font-bold shadow-sm'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Descriptions & Narratives */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">خلاصه یک‌خطی پروژه (Short Description):</label>
                  <input
                    type="text"
                    value={formData.shortDescription || ''}
                    onChange={(e) => handleFieldChange('shortDescription', e.target.value)}
                    placeholder="توضیح فشرده و گویا برای نمایش در کارت‌ها..."
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">شرح تفصیلی و بیانیه پروژه (Description):</label>
                  <textarea
                    rows={3}
                    value={formData.description || ''}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    placeholder="شرح کامل اهداف بازطراحی، دستاوردها و رویکرد اجرایی..."
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">بستر و نیازمندی (Context):</label>
                    <textarea
                      rows={3}
                      value={formData.context || ''}
                      onChange={(e) => handleFieldChange('context', e.target.value)}
                      placeholder="شرایط اولیه کسب‌وکار..."
                      className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">چالش طراحی (Challenge):</label>
                    <textarea
                      rows={3}
                      value={formData.challenge || ''}
                      onChange={(e) => handleFieldChange('challenge', e.target.value)}
                      placeholder="پیچیدگی‌های تجربه کاربری..."
                      className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">راهکار و نتیجه (Solution):</label>
                    <textarea
                      rows={3}
                      value={formData.solution || ''}
                      onChange={(e) => handleFieldChange('solution', e.target.value)}
                      placeholder="خروجی پیاده‌سازی‌شده..."
                      className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SCOPE & SERVICES */}
          {activeTab === 'scope' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              
              {/* Disciplines */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">رشته‌ها و تخصص‌های درگیر (Disciplines):</label>
                <div className="flex flex-wrap gap-2">
                  {ALL_DISCIPLINES.map(d => {
                    const isSelected = (formData.disciplines || []).includes(d.key);
                    return (
                      <button
                        key={d.key}
                        type="button"
                        onClick={() => handleArrayToggle('disciplines', d.key)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-[#0066FF] text-white font-bold shadow-sm'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        {d.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Services */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">خدمات و اقلام تحویلی (Services & Deliverables):</label>
                <div className="flex flex-wrap gap-2">
                  {ALL_SERVICES.map(s => {
                    const isSelected = (formData.services || []).includes(s.key);
                    return (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => handleArrayToggle('services', s.key)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-[#0066FF] text-white font-bold shadow-sm'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Scope Bullet Points */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-slate-300">محدوده وظایف اختصاصی (Scope Items):</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={scopeInput}
                    onChange={(e) => setScopeInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddScopeItem())}
                    placeholder="e.g. Atomic Design System (Figma Tokens)"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  />
                  <button
                    type="button"
                    onClick={handleAddScopeItem}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-semibold"
                  >
                    افزودن
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(formData.scope || []).map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 flex items-center gap-1.5"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveScopeItem(idx)}
                        className="text-slate-500 hover:text-rose-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Team, Role, Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">تیم اجرا (Team):</label>
                  <input
                    type="text"
                    value={formData.team || ''}
                    onChange={(e) => handleFieldChange('team', e.target.value)}
                    placeholder="Shadow Digital Design Team"
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">نقش طراحی (Role):</label>
                  <input
                    type="text"
                    value={formData.role || ''}
                    onChange={(e) => handleFieldChange('role', e.target.value)}
                    placeholder="Lead UX & UI Design"
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">مدت زمان اجرا (Duration):</label>
                  <input
                    type="text"
                    value={formData.duration || ''}
                    onChange={(e) => handleFieldChange('duration', e.target.value)}
                    placeholder="۳ ماه بازطراحی و تست"
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-slate-300">برچسب‌ها و تگ‌های جستجو (Tags):</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    placeholder="تگ جدید و اینتر..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-semibold"
                  >
                    افزودن تگ
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(formData.tags || []).map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-[#0066FF]/10 border border-[#0066FF]/20 text-[11px] text-[#0066FF] flex items-center gap-1.5"
                    >
                      <span>#{t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="text-slate-500 hover:text-rose-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: ASSETS & MEDIA */}
          {activeTab === 'assets' && (
            <div className="max-w-4xl mx-auto">
              <AssetUploader
                projectId={formData.slug || 'project'}
                projectName={formData.originalName || formData.name || formData.displayNameFa || formData.displayNameEn || 'Project'}
                projectFolderName={formData.originalName || formData.name || formData.slug || 'General'}
                assets={formData.assets || []}
                coverUrl={formData.cover}
                onSetCover={(src) => {
                  handleFieldChange('cover', src);
                  handleFieldChange('thumbnail', src);
                }}
                onAddAsset={(asset) => {
                  const current = formData.assets || [];
                  const newAsset = {
                    id: `asset-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                    projectId: formData.id || 'p',
                    ...asset
                  };
                  handleFieldChange('assets', [...current, newAsset]);
                }}
                onUpdateAsset={(assetId, updates) => {
                  const current = (formData.assets || []).map(a => a.id === assetId ? { ...a, ...updates } : a);
                  handleFieldChange('assets', current);
                }}
                onDeleteAsset={(assetId) => {
                  const current = (formData.assets || []).filter(a => a.id !== assetId);
                  handleFieldChange('assets', current);
                }}
                onReorderAssets={(assetIds) => {
                  const current = [...(formData.assets || [])].sort((a, b) => {
                    const idxA = assetIds.indexOf(a.id);
                    const idxB = assetIds.indexOf(b.id);
                    return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
                  }).map((a, i) => ({ ...a, order: i + 1 }));
                  handleFieldChange('assets', current);
                }}
              />
            </div>
          )}

          {/* TAB 4: CASE STUDY & DECISIONS */}
          {activeTab === 'casestudy' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              
              {/* Design Decisions Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white">تصمیمات استراتژیک دیزاین (Design Decisions)</h3>
                  <p className="text-xs text-slate-400">ثبت استدلال‌های طراحی برای نمایش در کیس‌استادی‌های حرفه‌ای</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddDesignDecision}
                  className="px-3.5 py-1.5 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>افزودن تصمیم دیزاین</span>
                </button>
              </div>

              {/* Decisions List */}
              <div className="space-y-3">
                {(formData.designDecisions || []).map((dec, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#0c0c14] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#0066FF] font-bold">#{dec.number || idx + 1}</span>
                        <input
                          type="text"
                          value={dec.title}
                          onChange={(e) => handleUpdateDecision(idx, { title: e.target.value })}
                          placeholder="عنوان تصمیم..."
                          className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white font-bold w-64"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveDecision(idx)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">تصمیم گرفته شده (Decision):</label>
                        <textarea
                          rows={2}
                          value={dec.decision}
                          onChange={(e) => handleUpdateDecision(idx, { decision: e.target.value })}
                          placeholder="چه تغییری در الگو یا کامپوننت ایجاد شد..."
                          className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">استدلال و چرایی (Rationale):</label>
                        <textarea
                          rows={2}
                          value={dec.rationale}
                          onChange={(e) => handleUpdateDecision(idx, { rationale: e.target.value })}
                          placeholder="دلیل و توجیه تجربی یا فنی..."
                          className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-200"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Project Scale Metrics */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <h4 className="text-xs font-bold text-slate-200">مقیاس و حجم تحویلی دیزاین (Project Scale):</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">تعداد اسکرین‌ها:</label>
                    <input
                      type="number"
                      value={formData.projectScale?.screens || ''}
                      onChange={(e) => handleFieldChange('projectScale', { ...formData.projectScale, screens: parseInt(e.target.value, 10) || 0 })}
                      placeholder="e.g. 85"
                      className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">تعداد کامپوننت‌ها:</label>
                    <input
                      type="number"
                      value={formData.projectScale?.components || ''}
                      onChange={(e) => handleFieldChange('projectScale', { ...formData.projectScale, components: parseInt(e.target.value, 10) || 0 })}
                      placeholder="e.g. 240"
                      className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">تعداد واریانت‌ها:</label>
                    <input
                      type="number"
                      value={formData.projectScale?.variants || ''}
                      onChange={(e) => handleFieldChange('projectScale', { ...formData.projectScale, variants: parseInt(e.target.value, 10) || 0 })}
                      placeholder="e.g. 420"
                      className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">تعداد بریک‌پوینت‌ها:</label>
                    <input
                      type="number"
                      value={formData.projectScale?.breakpoints || ''}
                      onChange={(e) => handleFieldChange('projectScale', { ...formData.projectScale, breakpoints: parseInt(e.target.value, 10) || 0 })}
                      placeholder="e.g. 4"
                      className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Impact Statement */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">تاثیر و بازخورد آماری (Impact & Metric):</label>
                <input
                  type="text"
                  value={formData.impact || ''}
                  onChange={(e) => handleFieldChange('impact', e.target.value)}
                  placeholder="e.g. کاهش ۶۲ درصدی زمان رسیدن کاربر به محصول و رشد ۳.۲ برابری نرخ تبدیل"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
                />
              </div>

            </div>
          )}

          {/* TAB 5: SECTIONS BUILDER */}
          {activeTab === 'sections' && (
            <div className="max-w-4xl mx-auto">
              <SectionBuilder
                sections={formData.sections || []}
                onAddSection={(sec) => {
                  const current = formData.sections || [];
                  const newSec = {
                    id: `sec-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                    ...sec
                  };
                  handleFieldChange('sections', [...current, newSec]);
                }}
                onUpdateSection={(secId, updates) => {
                  const current = (formData.sections || []).map(s => s.id === secId ? { ...s, ...updates } : s);
                  handleFieldChange('sections', current);
                }}
                onDeleteSection={(secId) => {
                  const current = (formData.sections || []).filter(s => s.id !== secId);
                  handleFieldChange('sections', current);
                }}
                onReorderSections={(secIds) => {
                  const current = [...(formData.sections || [])].sort((a, b) => {
                    const idxA = secIds.indexOf(a.id);
                    const idxB = secIds.indexOf(b.id);
                    return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
                  }).map((s, i) => ({ ...s, order: i + 1 }));
                  handleFieldChange('sections', current);
                }}
              />
            </div>
          )}

          {/* TAB 6: LINKS & EXTERNAL */}
          {activeTab === 'links' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>آدرس فایل طراحی در Figma (Figma URL):</span>
                </label>
                <input
                  type="url"
                  value={formData.figmaUrl || ''}
                  onChange={(e) => handleFieldChange('figmaUrl', e.target.value)}
                  placeholder="https://figma.com/file/... یا https://figma.com/@shadow/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-200 focus:outline-none focus:border-[#0066FF]"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  در صورت درج این لینک، دکمه «مشاهده پروژه در فیگما» در صفحه جزئیات فعال می‌شود.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                  <span>آدرس وب‌سایت زنده (Live URL):</span>
                </label>
                <input
                  type="url"
                  value={formData.liveUrl || ''}
                  onChange={(e) => handleFieldChange('liveUrl', e.target.value)}
                  placeholder="https://daewoo.ir"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-200 focus:outline-none focus:border-[#0066FF]"
                />
              </div>
            </div>
          )}

          {/* TAB 7: RELATIONS & ECOSYSTEM */}
          {activeTab === 'relations' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">انتساب به خانواده / اکوسیستم پروژه‌ها (Project Family):</label>
                <select
                  value={formData.family || ''}
                  onChange={(e) => {
                    const famId = e.target.value;
                    const fam = families.find(f => f.id === famId);
                    handleFieldChange('family', famId || undefined);
                    handleFieldChange('familyNameFa', fam?.name || undefined);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
                >
                  <option value="">بدون خانواده مستقل (پروژه مستقل)</option>
                  {families.map(fam => (
                    <option key={fam.id} value={fam.id}>
                      {fam.name} ({fam.client})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">پروژه‌های مرتبط (Related Projects):</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-3 rounded-xl bg-black/40 border border-white/10">
                  {projects.filter(p => p.id !== formData.id).map(p => {
                    const isRelated = (formData.relatedProjects || []).includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          const current = formData.relatedProjects || [];
                          if (isRelated) {
                            handleFieldChange('relatedProjects', current.filter(id => id !== p.id));
                          } else {
                            handleFieldChange('relatedProjects', [...current, p.id]);
                          }
                        }}
                        className={`p-2.5 rounded-xl text-xs text-right transition-all flex items-center justify-between ${
                          isRelated ? 'bg-[#0066FF]/20 border border-[#0066FF]/40 text-white font-bold' : 'bg-white/5 border border-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <span className="truncate">{p.name}</span>
                        <span className="font-mono text-[10px] text-slate-500">{p.brand}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: QUALITY & VALIDATION */}
          {activeTab === 'quality' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              
              {/* Quality Checklist Summary */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-right">
                  <h3 className="text-base font-extrabold text-white flex items-center justify-center sm:justify-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>سنجش آمادگی کیس‌استادی (Case Study Readiness)</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    امتیاز این پروژه بر اساس متادیتا، تصاویر واکنش‌گرا، دیاگرام‌های UX و تصمیمات طراحی
                  </p>
                </div>

                <div className="text-center px-6 py-3 rounded-2xl bg-white/5 border border-white/10 min-w-40">
                  <div className={`font-mono text-3xl font-extrabold ${
                    currentScore >= 75 ? 'text-emerald-400' : currentScore >= 50 ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {currentScore} <span className="text-sm text-slate-400">/ ۱۰۰</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">امتیاز آمادگی نهایی</span>
                </div>
              </div>

              {/* Internal Quality Warnings */}
              {validation.warnings.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span>هشدارهای کیفیت داخلی (فقط در پنل مدیریت):</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-amber-300/80">
                    {validation.warnings.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Missing Fields Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300">چک‌لیست فیلدهای توصیه‌شده ({validation.completedCount} از {validation.totalRecommendedCount}):</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { label: 'برند پروژه مشخص شده', check: Boolean(formData.brand && formData.brand !== 'Other') },
                    { label: 'سال انجام مشخص شده', check: Boolean(formData.year) },
                    { label: 'تصویر کاور اصلی انتخاب شده', check: Boolean(formData.cover) },
                    { label: 'شرح کوتاه یا متن پروژه', check: Boolean(formData.shortDescription || formData.description) },
                    { label: 'سرویس‌ها و اسکوپ وظایف', check: Boolean(formData.services && formData.services.length > 0) },
                    { label: 'حداقل ۲ اسکرین در گالری/مدیا', check: Boolean((formData.assets?.length || 0) >= 2 || (formData.gallery?.length || 0) >= 2) },
                    { label: 'اسکرین یا پیش‌نمایش نسخه موبایل', check: Boolean(formData.assets?.some(a => a.category === 'mobile') || (formData.gallery || []).some(g => g.category === 'Mobile')) },
                    { label: 'مستندات UX یا فلوچارت', check: Boolean(formData.assets?.some(a => a.category === 'ux') || (formData.uxArtifacts || []).length > 0) },
                    { label: 'لینک فایل رسمی در Figma', check: Boolean(formData.figmaUrl) },
                    { label: 'ثبت تصمیمات کلیدی دیزاین', check: Boolean((formData.designDecisions || []).length > 0) },
                    { label: 'آمار مقیاس و کامپوننت‌ها', check: Boolean(formData.projectScale) },
                    { label: 'شرح مسئله و کانتکست (Challenge/Context)', check: Boolean(formData.context || formData.challenge) }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                        item.check ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-300' : 'bg-white/[0.02] border-white/5 text-slate-500'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span>{item.check ? '✓ تکمیل' : '— ناقص'}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Sticky Footer */}
        <div className="p-4 border-t border-white/10 bg-black/60 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
          >
            انصراف
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPreview(formData as Project)}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>پیش‌نمایش زنده کیس‌استادی</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-[#0066FF]/30"
            >
              <Save className="w-4 h-4" />
              <span>ذخیره و اعمال در آرشیو</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
