import { Project } from '../types';
import { calculateCaseStudyReadinessScore, calculateAssetStatus, calculateContentStatus, calculateFeaturedReadiness } from '../utils/readiness';
import { getProjectImage } from './projectImages';

// Helper to build normalized raw project entries
function createProjectEntry(raw: Partial<Project> & { id: string; name: string; brand: string }): Project {
  const brandFaMap: Record<string, string> = {
    'Daewoo': 'دوو',
    'Snowa': 'اسنوا',
    'Ardesia': 'آردزیا',
    'Entekhab': 'انتخاب',
    'Smalvic': 'اسمالویک',
    'Tecnogas': 'تکنوگاز',
    'Shadow': 'سایه',
    'Digisun': 'دیجی‌سان',
    'Metrino': 'مترینو',
    'Soroush Sehat': 'سروش صحت',
    'Barani Silver': 'نقره بارانی',
    'Macsa': 'مکسا',
    'MK Refrigeration': 'ام‌کی ریفریجریشن',
    'Other': 'سایر برندها'
  };

  const clientFa = raw.clientFa || brandFaMap[raw.brand] || 'سایر';
  const typeFa = raw.typeFa || (
    typeof raw.type === 'string' ? raw.type : 
    Array.isArray(raw.type) && raw.type.includes('website') ? 'وب‌سایت مرجع' :
    Array.isArray(raw.type) && raw.type.includes('landing-page') ? 'لندینگ پیج و کمپین' :
    Array.isArray(raw.type) && raw.type.includes('mobile-app') ? 'اپلیکیشن و رابط کاربری' :
    'طراحی رابط و تجربه کاربری'
  );

  const platformFa = raw.platformFa || (
    typeof raw.platform === 'string' ? raw.platform :
    Array.isArray(raw.platform) && raw.platform.includes('responsive') ? 'واکنش‌گرا (دسکتاپ، تبلت، موبایل)' :
    Array.isArray(raw.platform) && raw.platform.includes('mobile') ? 'موبایل و تبلت' :
    'دسکتاپ و موبایل'
  );

  const defaultCover = raw.cover || getProjectImage(raw.id, typeof raw.type === 'string' ? raw.type : 'Website', 'cover');

  const base: Partial<Project> = {
    slug: raw.slug || raw.id,
    originalName: raw.originalName || raw.name,
    displayNameFa: raw.displayNameFa || raw.name,
    displayNameEn: raw.displayNameEn || raw.name,
    nameEn: raw.nameEn || raw.name,
    client: raw.client || raw.brand,
    clientFa,
    brand: raw.brand,
    year: raw.year ?? 2025,
    featured: raw.featured ?? false,
    featuredScore: raw.featuredScore ?? (raw.featured ? 95 : 60),
    type: raw.type || ['website'],
    typeFa,
    platform: raw.platform || ['desktop', 'mobile', 'responsive'],
    platformFa,
    shortDescription: raw.shortDescription || raw.description || `${raw.name} — طراحی رابط و تجربه کاربری`,
    description: raw.description || `پروژه طراحی رابط و تجربه کاربری دیجیتال ${raw.name} تحت برند ${clientFa}.`,
    scope: raw.scope || ['UI/UX Design', 'Design System', 'Responsive Layouts'],
    services: raw.services || ['ui-design', 'responsive-design', 'prototyping'],
    disciplines: raw.disciplines || ['ui-design', 'ux-design', 'responsive-design'],
    tags: raw.tags || [raw.brand, 'UI/UX', 'Digital Product'],
    cover: defaultCover,
    coverGradient: raw.coverGradient || 'from-blue-600/20 via-black to-black',
    accentColor: raw.accentColor || '#0066FF',
    gallery: raw.gallery || [
      {
        id: `${raw.id}-ui-1`,
        title: 'صفحه اصلی و ساختار بصری',
        category: 'UI',
        caption: 'طراحی رابط کاربری منطبق بر هویت بصری و سیستم دیزاین',
        image: getProjectImage(raw.id, typeof raw.type === 'string' ? raw.type : 'Website', 'hero')
      },
      {
        id: `${raw.id}-ui-2`,
        title: 'واکنش‌گرایی در نسخه موبایل',
        category: 'Mobile',
        caption: 'بهینه‌سازی سلسله‌مراتب محتوا در صفحات نمایش کوچک',
        image: getProjectImage(raw.id, typeof raw.type === 'string' ? raw.type : 'Website', 'mobile')
      }
    ],
    ...raw
  };

  const score = calculateCaseStudyReadinessScore(base);
  const assetStat = calculateAssetStatus(base);
  const contentStat = calculateContentStatus(base, score);
  const featuredRead = calculateFeaturedReadiness(score, base);

  return {
    ...base,
    id: raw.id,
    slug: base.slug!,
    name: raw.name,
    client: base.client!,
    clientFa: base.clientFa!,
    brand: base.brand!,
    year: base.year!,
    contentStatus: raw.contentStatus || contentStat,
    assetStatus: raw.assetStatus || assetStat,
    caseStudyReadinessScore: score,
    featured: base.featured!,
    featuredScore: base.featuredScore!,
    featuredReadiness: featuredRead,
    type: base.type!,
    typeFa: base.typeFa!,
    platform: base.platform!,
    platformFa: base.platformFa!,
    scope: base.scope!,
    services: base.services!,
    tags: base.tags!,
    gallery: base.gallery!
  } as Project;
}

// -------------------------------------------------------------
// 1. DAEWOO WEBSITE — THE EXEMPLARY FULL-FEATURED REFERENCE PROJECT
// -------------------------------------------------------------
const daewooWebsiteProject: Project = createProjectEntry({
  id: 'daewoo-website',
  slug: 'daewoo-website',
  name: 'Daewoo Website',
  originalName: 'Daewoo Website Master Portal',
  displayNameFa: 'پرتال جامع و وب‌سایت مرکزی دوو',
  displayNameEn: 'Daewoo Central Consumer Portal',
  nameEn: 'Daewoo Consumer Portal & Design System',
  client: 'Daewoo',
  brand: 'Daewoo',
  clientFa: 'دوو',
  year: 2025,
  featured: true,
  featuredScore: 98,
  featuredRank: 1,
  type: ['website', 'ecommerce', 'product', 'design-system', 'uiux'],
  typeFa: 'وب‌سایت مرجع و سیستم دیزاین',
  platform: ['desktop', 'mobile', 'tablet', 'responsive'],
  platformFa: 'واکنش‌گرا (دسکتاپ، تبلت، موبایل)',
  family: 'daewoo-ecosystem',
  familyNameFa: 'اکوسیستم جامع وب‌سایت دوو',
  familyRole: 'پروژه مرجع و سیستم‌ساز',
  
  shortDescription: 'طراحی مجدد کلان معماری اطلاعات و زبان بصری پورتال اصلی لوازم خانگی دوو با تمرکز بر تعامل نسل جدید و IoT.',
  description: 'پروژه بازطراحی کلان پرتال وب‌سایت دوو، تحول یکپارچه در معماری اطلاعات محصولات، طراحی کاتالوگ تعاملی هوشمند، پیاده‌سازی مگامنو با دسته‌بندی نوآورانه و اتصال به سرویس‌های هوشمند اینترنت اشیاء (Home IoT).',
  context: 'دوو به عنوان یکی از پیشگامان صنعت لوازم خانگی نیازمند درگاهی مدرن برای نمایش سبد متنوع محصولات (سایدبای‌ساید، لباسشویی، ظرفشویی، تلویزیون و لوازم پخت‌وپز) با استانداردهای لوکس بین‌المللی و سهولت مقایسه مشخصات فنی بود.',
  challenge: 'حجم بالای ۵۰۰+ تنوع محصول با مشخصات فنی پیچیده، نرخ بالای خروج کاربران در صفحات دسته‌بندی و نبود ساختار منسجم برای پرزنت قابلیت‌های هوشمند IoT.',
  approach: 'تدوین سیستم دیزاین اتمیک، ایجاد مگامنوی تصویری پویا با دسترسی تک‌کلیکی، پیاده‌سازی ابزار مقایسه ۵ ستونه، و بازآفرینی صفحات محصول (PDP) با گرافیک سه‌بعدی و تایم‌لاین مشخصات.',
  solution: 'کاهش ۶۲ درصدی زمان رسیدن کاربر به محصول هدف، رشد ۳.۲ برابری نرخ تبدیل لیدهای فروش و استانداردسازی ۲۰۰+ کامپوننت ماژولار در کتابخانه مشترک فیگما.',
  
  scope: [
    'User Experience (UX) Architecture',
    'Atomic Design System (Figma Tokens)',
    'Responsive High-Density Catalog',
    'Interactive 5-Way Product Comparator',
    'Mega Navigation & Visual Category Filters'
  ],
  services: [
    'research',
    'information-architecture',
    'user-flow',
    'wireframing',
    'ui-design',
    'responsive-design',
    'design-system',
    'prototyping'
  ],
  disciplines: [
    'ux-design',
    'ui-design',
    'product-design',
    'interaction-design',
    'design-system',
    'responsive-design'
  ],
  tags: ['Daewoo', 'Enterprise Website', 'Design System', 'E-commerce Catalog', 'IoT Experience', 'Luxury Minimal'],
  
  team: 'Shadow Product & UI/UX Design Team',
  role: 'Lead UX Architect & Senior UI Designers',
  duration: '۵ ماه بازطراحی، سیستم‌سازی و تست‌های کاربری',
  
  figmaUrl: 'https://figma.com/@shadow/daewoo-master-portal',
  liveUrl: 'https://daewoo.ir',
  
  cover: getProjectImage('daewoo-website', 'Website', 'cover'),
  thumbnail: getProjectImage('daewoo-website', 'Website', 'cover'),
  coverGradient: 'from-blue-700/20 via-black to-black',
  accentColor: '#0066FF',
  badge: 'معماری مرجع',
  mockupType: 'browser',
  
  gallery: [
    {
      id: 'dw-ui-1',
      title: 'صفحه اصلی و هدر داینامیک پورتال',
      category: 'UI',
      caption: 'هدر شفاف با مگامنوی تصویری دسته‌بندی محصولات و اسلایدر هوشمند',
      image: getProjectImage('daewoo-website', 'Website', 'hero')
    },
    {
      id: 'dw-ui-2',
      title: 'صفحه تفصیلی محصول (PDP)',
      category: 'UI',
      caption: 'پرزنت سه‌بعدی قابلیت‌های هوشمند یخچال سایدبای‌ساید و مشخصات فنی',
      image: getProjectImage('daewoo-single-product', 'Product Design', 'hero')
    },
    {
      id: 'dw-ui-3',
      title: 'مگامنو و فیلترینگ کاتالوگ',
      category: 'Desktop',
      caption: 'فیلتر چندمعیاره بر اساس رده مصرف انرژی، ظرفیت و فناوری موتور',
      image: getProjectImage('daewoo-category-page', 'Website', 'hero')
    },
    {
      id: 'dw-ui-4',
      title: 'نمای ریسپانسیو موبایل و تبلت',
      category: 'Mobile',
      caption: 'ساختار لمسی بهینه‌شده برای مرور سریع کاتالوگ و مشخصات در گوشی‌های همراه',
      image: getProjectImage('daewoo-website', 'Website', 'mobile')
    }
  ],

  uxArtifacts: [
    {
      title: 'معماری اطلاعات و نقشه راهبردی پورتال',
      type: 'sitemap',
      description: 'ساختار درختی ۴ سطحی برای سازماندهی کلیه گروه‌های کالایی و لندینگ‌های پشتیبانی',
      preview: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
      nodes: ['پورتال اصلی', 'مگامنو هوشمند', 'کاتالوگ جامع', 'جزئیات محصول', 'مقایسه ۵ تایی', 'مرکز خدمات']
    },
    {
      title: 'جریان ناوبری و فیلترینگ کاربر (User Flow)',
      type: 'userflow',
      description: 'مسیر کاربر از صفحه اول تا انتخاب و فیلتر ویژگی‌های خاص محصول و ارسال درخواست مشاوره',
      preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      nodes: ['ورود', 'انتخاب رده محصول', 'اعمال فیلتر فنی', 'مشاهده ۳۶۰ درجه', 'مقایسه مشخصات', 'استعلام نمایندگی']
    }
  ],

  designDecisions: [
    {
      number: '۰۱',
      title: 'کنتراست بالای الکتریک‌بلو بر بستر دارک‌میکرو',
      decision: 'استفاده از رنگ آبی اختصاصی دوو (#0066FF) به عنوان تک‌رنگ کنش‌گرا و متمرکز',
      rationale: 'جلوگیری از اغتشاش بصری و راهنمایی مستقیم چشم کاربر به سمت دکمه‌های اقدام کلیدی و ویژگی‌های IoT.',
      impactArea: 'هویت بصری و نرخ کلیک (CTR)'
    },
    {
      number: '۰۲',
      title: 'ماژولار سازی کاتالوگ با کارت‌های چندوضعیتی',
      decision: 'طراحی کامپوننت‌های کارت محصول با قابلیت هاور تعاملی و پیش‌نمایش سریع ویژگی‌ها',
      rationale: 'امکان مشاهده سریع ابعاد، برچسب انرژی و رنگ‌بندی بدون نیاز به ترک صفحه لیست.',
      impactArea: 'کاهش بانس‌ریت و تسهیل مقایسه'
    },
    {
      number: '۰۳',
      title: 'ابزار مقایسه ۵ ستونه با تفکیک هایلایت تفاوت‌ها',
      decision: 'امکان مقایسه همزمان تا ۵ دستگاه با فیلتر هوشمند مشخصات متفاوت',
      rationale: 'رفع سردرگمی مشتریان در تمایز میان مدل‌های نزدیک در سری‌های مختلف.',
      impactArea: 'تجربه کاربری و تصمیم‌گیری خرید'
    }
  ],

  designSystem: {
    colors: [
      { name: 'Electric Blue (Primary)', hex: '#0066FF', role: 'دکمه‌های اصلی، وضعیت‌های فعال، هایلایت‌های شاخص', textColor: '#ffffff' },
      { name: 'Dark Void (Canvas)', hex: '#030305', role: 'پس‌زمینه اصلی دارک و بدون بازتاب اضافه', textColor: '#ededf2' },
      { name: 'Surface Elevated', hex: '#09090e', role: 'کارت‌ها، مگامنو و المان‌های برآمده', textColor: '#ededf2' },
      { name: 'Precision Slate', hex: '#64748B', role: 'متون ثانویه و خطوط راهنمای جداکننده', textColor: '#ffffff' }
    ],
    typography: {
      primaryFont: 'IRANYekanX (ایران‌یکان)',
      displayFont: 'IRANYekanX (ایران‌یکان)',
      scale: ['Heading 1 (48px)', 'Heading 2 (32px)', 'Heading 3 (24px)', 'Body Large (18px)', 'Body Regular (16px)', 'Caption (13px)']
    },
    componentsSummary: [
      'مگامنوی چندسطحی با پیش‌نمایش تصویری محصولات',
      'فیلتر چندمعیاره با شمارنده زنده تعداد نتایج',
      'کارت محصول ریسپانسیو با بج‌های گارانتی و IoT',
      'جدول مقایسه هوشمند با حالت هایلایت تفاوت‌ها',
      'اسلایدرهای فول‌ویو با پیمایش نرم لمسی'
    ]
  },

  projectScale: {
    screens: 85,
    components: 240,
    platforms: 'Desktop, Tablet, Mobile (iOS/Android Web)',
    variants: 420,
    pages: 34,
    breakpoints: 4
  },
  
  impact: 'کاهش ۶۲ درصدی زمان رسیدن کاربر به محصول هدف و رشد ۳.۲ برابری تبدیل لیدهای فروش.',

  sections: [
    {
      id: 'sec-hero',
      type: 'hero',
      title: 'پرتال جامع و معماری نسل جدید وب‌سایت دوو',
      subtitle: 'Daewoo Master Consumer Portal & Design System',
      content: 'بازتعریف تجربه کشف، مقایسه و خرید هوشمند لوازم خانگی دوو با تلفیق اینترنت اشیاء.',
      order: 1,
      visible: true
    },
    {
      id: 'sec-context',
      type: 'text',
      title: 'چالش و بستر پروژه',
      subtitle: 'Context & Challenge',
      content: 'دوو به عنوان یکی از پیشگامان صنعت لوازم خانگی نیازمند درگاهی مدرن برای نمایش سبد متنوع ۵۰۰+ محصول با استانداردهای لوکس بین‌المللی و سهولت مقایسه مشخصات فنی بود.',
      order: 2,
      visible: true
    },
    {
      id: 'sec-metrics',
      type: 'metrics',
      title: 'شاخص‌های مقیاس دیزاین',
      subtitle: 'Design Scale & Deliverables',
      order: 3,
      visible: true
    },
    {
      id: 'sec-showcase',
      type: 'device-showcase',
      title: 'پیش‌نمایش تعاملی در دیوایس‌ها',
      subtitle: 'Multi-Device Responsive Experience',
      order: 4,
      visible: true
    },
    {
      id: 'sec-ux',
      type: 'ux-flow',
      title: 'معماری اطلاعات و جریان کاربری',
      subtitle: 'Information Architecture & User Flow',
      content: 'ساختاردهی درخت دسته‌بندی کالاها و ساده‌سازی مسیر انتخاب تا استعلام نمایندگی رسمی.',
      order: 5,
      visible: true
    },
    {
      id: 'sec-decisions',
      type: 'quote',
      title: 'تصمیمات کلیدی دیزاین',
      subtitle: 'Strategic Design Decisions',
      order: 6,
      visible: true
    },
    {
      id: 'sec-design-system',
      type: 'design-system',
      title: 'سیستم دیزاین و توکن‌های بصری',
      subtitle: 'Design System & Token Architecture',
      order: 7,
      visible: true
    },
    {
      id: 'sec-gallery',
      type: 'gallery',
      title: 'آلبوم کامل اسکرین‌های رابط کاربری',
      subtitle: 'Full High-Resolution UI Gallery',
      order: 8,
      visible: true
    },
    {
      id: 'sec-related',
      type: 'related-projects',
      title: 'پروژه‌های مرتبط در اکوسیستم دوو',
      subtitle: 'Daewoo Ecosystem Related Projects',
      order: 9,
      visible: true
    }
  ],

  relatedProjects: [
    'daewoo-home-page',
    'daewoo-category-page',
    'daewoo-single-product',
    'daewoo-compare-pages',
    'daewoo-hana-landing',
    'daewoo-rf-iot-landing'
  ]
});

// -------------------------------------------------------------
// 2. THE COMPLETE INITIAL 60+ PROJECTS REGISTRY (NO FAKE COPY)
// -------------------------------------------------------------
export const initialProjectsList: Project[] = [
  daewooWebsiteProject,

  // Daewoo DW Landing (Real Uploaded Trio)
  createProjectEntry({
    id: 'daewoo-dw-landing',
    slug: 'daewoo-dw-landing',
    name: 'Daewoo DW Landing',
    originalName: 'Daewoo DW Landing',
    displayNameFa: 'لندینگ پیج ماشین ظرفشویی دوو',
    displayNameEn: 'Daewoo Dishwasher (DW) IoT Landing Page',
    nameEn: 'Daewoo Dishwasher Landing Page',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: true,
    featuredScore: 97,
    featuredRank: 1,
    type: ['landing-page', 'campaign', 'product'],
    typeFa: 'لندینگ پیج معرفی محصول و کمپین',
    platform: ['desktop', 'tablet', 'mobile', 'responsive'],
    platformFa: 'واکنش‌گرا (دسکتاپ ۱۴۴۰، تبلت ۷۶۸، موبایل ۳۹۰)',
    family: 'daewoo-campaigns-iot',
    familyNameFa: 'کمپین‌ها و لندینگ‌های اینترنت اشیاء دوو',
    shortDescription: 'طراحی لندینگ پیج اختصاصی ماشین ظرفشویی هوشمند دوو در ۳ سایز استاندارد دسکتاپ، تبلت و موبایل.',
    description: 'معرفی ویژگی‌های کلیدی ماشین ظرفشویی مدرن دوو شامل سبدهای آسانسوری منعطف، سیستم شستشوی توربو بخار و اتصال هوشمند به گوشی موبایل.',
    scope: ['Responsive Trio UI', 'Direct Drive & Steam Animation', 'IoT Feature Hotspots', 'Lead Generation CTA'],
    services: ['ui-design', 'responsive-design', 'campaign', 'prototyping'],
    accentColor: '#0066FF',
    badge: 'نمونه کار تایید شده ۳ سایز',
    mockupType: 'browser',
    figmaUrl: 'https://figma.com/@shadow/daewoo-dw-landing',
    liveUrl: 'https://daewoo.ir/dishwasher'
  }),

  // Daewoo General Landing (Real Uploaded Trio)
  createProjectEntry({
    id: 'daewoo-general-landing',
    slug: 'daewoo-general-landing',
    name: 'Daewoo General Landing',
    originalName: 'Daewoo General Landing',
    displayNameFa: 'لندینگ پیج جامع برند دوو',
    displayNameEn: 'Daewoo General Master Landing',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: true,
    featuredScore: 95,
    type: ['landing-page', 'website'],
    typeFa: 'لندینگ جامع و معرفی سبد محصولات',
    platform: ['desktop', 'tablet', 'mobile', 'responsive'],
    platformFa: 'طراحی ریسپانسیو (دسکتاپ، تبلت، موبایل)',
    family: 'daewoo-ecosystem',
    familyNameFa: 'اکوسیستم وب‌سایت و لندینگ‌های دوو',
    shortDescription: 'صفحه فرود جامع معرفی سبد لوازم خانگی هوشمند دوو، گارانتی ۲۴ ماهه و شبکه نمایندگی‌های رسمی.',
    scope: ['Flagship Hero Showcase', 'Product Category Grid', 'Dealer Map Integration'],
    services: ['ui-design', 'responsive-design', 'visual-direction'],
    accentColor: '#0066FF',
    mockupType: 'browser'
  }),

  // Daewoo RF Landing (Real Uploaded Trio)
  createProjectEntry({
    id: 'daewoo-rf-landing',
    slug: 'daewoo-rf-landing',
    name: 'Daewoo RF Landing',
    originalName: 'Daewoo RF Landing',
    displayNameFa: 'لندینگ ساید‌بای‌ساید و یخچال‌های هوشمند دوو',
    displayNameEn: 'Daewoo Refrigerator (RF) Landing Page',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: true,
    featuredScore: 94,
    type: ['landing-page', 'product'],
    typeFa: 'لندینگ پیج پرچمدار یخچال فریزر',
    platform: ['desktop', 'tablet', 'mobile', 'responsive'],
    platformFa: 'واکنش‌گرا (دسکتاپ، تبلت، موبایل)',
    family: 'daewoo-campaigns-iot',
    shortDescription: 'طراحی صفحه فرود یخچال و ساید‌بای‌سایدهای هوشمند مجهز به سیستم متال کولینگ و سنسور دمای خودکار.',
    scope: ['Metal Cooling Showcase', 'Interactive 3D Fridge Tour', 'Fresh Zone Highlight'],
    services: ['ui-design', 'responsive-design', 'campaign'],
    accentColor: '#0066FF'
  }),

  // Daewoo Shim Plus Washing Machine Landing (Real Uploaded Trio)
  createProjectEntry({
    id: 'daewoo-shimpluse-landing',
    slug: 'daewoo-shim-plus-washing-machine-landing',
    name: 'Daewoo Shim Plus Washing Machine Landing',
    originalName: 'Daewoo Shim Plus Washing Machine Landing',
    displayNameFa: 'لندینگ لباسشویی سری Shim Plus دوو',
    displayNameEn: 'Daewoo Shim Plus Washing Machine Landing',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: true,
    featuredScore: 93,
    type: ['landing-page', 'campaign'],
    typeFa: 'لندینگ لانچ محصول سری شیم‌پلاس',
    platform: ['desktop', 'tablet', 'mobile', 'responsive'],
    platformFa: 'طراحی ریسپانسیو ۳ سایزه',
    family: 'daewoo-campaigns-iot',
    shortDescription: 'صفحه فرود معرفی ماشین لباسشویی شیم‌پلاس با نسل جدید موتورهای بیصدا و شستشوی سریع.',
    scope: ['Shim Plus Identity', 'Vibration Absorber Demo', 'Direct Drive Spec'],
    services: ['ui-design', 'responsive-design', 'campaign']
  }),

  // Daewoo WM Landing (Real Uploaded Trio)
  createProjectEntry({
    id: 'daewoo-wm-landing',
    slug: 'daewoo-wm-landing',
    name: 'Daewoo WM Landing',
    originalName: 'Daewoo WM Landing',
    displayNameFa: 'لندینگ پیج تخصصی ماشین لباسشویی دوو',
    displayNameEn: 'Daewoo Washing Machine (WM) Landing Page',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: true,
    featuredScore: 93,
    type: ['landing-page', 'product'],
    typeFa: 'لندینگ پیج ماشین لباسشویی',
    platform: ['desktop', 'tablet', 'mobile', 'responsive'],
    platformFa: 'واکنش‌گرا (دسکتاپ، تبلت، موبایل)',
    family: 'daewoo-campaigns-iot',
    shortDescription: 'معرفی فناوری نانوسیلور، دیگ زمردی و برنامه‌های تخصصی شستشوی لباس کودک در لباسشویی دوو.',
    scope: ['Emerald Drum Showcase', 'Nano Silver Technology', 'Cycle Selector UI'],
    services: ['ui-design', 'responsive-design', 'prototyping']
  }),

  // Daewoo Yeosu TV (Real Uploaded Trio)
  createProjectEntry({
    id: 'daewoo-yeosu-tv',
    slug: 'daewoo-yeosu-tv',
    name: 'Daewoo Yeosu TV',
    originalName: 'Daewoo Yeosu TV',
    displayNameFa: 'لندینگ تلویزیون‌های هوشمند سری یوسو دوو',
    displayNameEn: 'Daewoo Yeosu Smart TV Landing',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: true,
    featuredScore: 92,
    type: ['landing-page', 'product'],
    typeFa: 'لندینگ پیج تلویزیون هوشمند 4K',
    platform: ['desktop', 'tablet', 'mobile', 'responsive'],
    platformFa: 'واکنش‌گرا (دسکتاپ، تبلت، موبایل)',
    family: 'daewoo-campaigns-iot',
    shortDescription: 'طراحی صفحه معرفی تلویزیون‌های اولترا اچ‌دی سری Yeosu با پنل بدون فریم و اندروید تی‌وی.',
    scope: ['Frameless Display Demo', 'Dolby Atmos Soundwave UI', 'Smart OS Features'],
    services: ['ui-design', 'responsive-design', 'art-direction']
  }),

  // Snowa Website
  createProjectEntry({
    id: 'snowa-website',
    slug: 'snowa-website',
    name: 'Snowa Website',
    displayNameFa: 'وب‌سایت مرجع و رسمی اسنوا',
    client: 'Snowa',
    brand: 'Snowa',
    clientFa: 'اسنوا',
    year: 2025,
    featured: true,
    featuredScore: 96,
    featuredRank: 2,
    type: ['website', 'ecommerce', 'product'],
    typeFa: 'وب‌سایت مرجع برند',
    family: 'snowa-ecosystem',
    familyNameFa: 'اکوسیستم وب‌سایت و کمپین‌های اسنوا',
    shortDescription: 'پرتال جامع برند اسنوا با هویت بصری پویا و ساختار دسترسی به سبد گسترده محصولات و گارانتی.',
    scope: ['UI/UX Redesign', 'Information Architecture', 'Product PDP Design', 'Responsive Web'],
    services: ['ui-design', 'responsive-design', 'user-flow'],
    figmaUrl: 'https://figma.com/@shadow/snowa-master-website',
    liveUrl: 'https://snowa.ir'
  }),

  // Ardesia Website
  createProjectEntry({
    id: 'ardesia-website',
    slug: 'ardesia-website',
    name: 'Ardesia Website',
    displayNameFa: 'پرتال بین‌المللی برند آردزیا ایتالیا',
    client: 'Ardesia',
    brand: 'Ardesia',
    clientFa: 'آردزیا',
    year: 2025,
    featured: true,
    featuredScore: 94,
    featuredRank: 3,
    type: ['website', 'product'],
    typeFa: 'وب‌سایت برند لوکس ایتالیایی',
    family: 'ardesia-ecosystem',
    familyNameFa: 'اکوسیستم برند لوکس آردزیا ایتالیا',
    shortDescription: 'طراحی وب‌سایت لوکس برند تجهیزات پخت‌وپز آردزیا با زیبایی‌شناسی مینیمال اروپایی.',
    scope: ['Luxury Visual Direction', 'UI/UX Design', 'Multi-Language Switcher', 'Catalog Showcase'],
    services: ['ui-design', 'visual-direction', 'responsive-design'],
    figmaUrl: 'https://figma.com/@shadow/ardesia-website',
    liveUrl: 'https://ardesia.it'
  }),

  // Festival In Fall
  createProjectEntry({
    id: 'festival-in-fall',
    slug: 'festival-in-fall',
    name: 'Festival In Fall',
    displayNameFa: 'لندینگ پیج جشنواره پاییزه',
    client: 'Snowa',
    brand: 'Snowa',
    clientFa: 'اسنوا',
    year: 2024,
    featured: false,
    type: ['landing-page', 'campaign'],
    typeFa: 'لندینگ پیج جشنواره فصلی',
    shortDescription: 'طراحی هویت بصری و صفحه فرود کمپین جشنواره فروش پاییزه با تایمر تخفیف و گردونه شانس.',
    scope: ['Campaign UI', 'Gamification Elements', 'Conversion Optimization'],
    services: ['campaign', 'ui-design', 'interaction']
  }),

  // Digisun Website Desktop
  createProjectEntry({
    id: 'digisun-website-desktop',
    slug: 'digisun-website-desktop',
    name: 'Digisun Website Desktop',
    displayNameFa: 'وب‌سایت دیجی‌سان — نسخه دسکتاپ',
    client: 'Digisun',
    brand: 'Digisun',
    clientFa: 'دیجی‌سان',
    year: 2024,
    featured: false,
    type: ['website', 'ecommerce'],
    typeFa: 'پلتفرم تجارت الکترونیک دسکتاپ',
    platform: ['desktop'],
    shortDescription: 'طراحی تجربه کاربری و رابط دسکتاپ فروشگاه آنلاین و خدمات دیجی‌سان.',
    scope: ['Desktop UX/UI', 'E-commerce Architecture', 'Cart & Checkout'],
    services: ['ui-design', 'responsive-design']
  }),

  // Digisun Website Mobile
  createProjectEntry({
    id: 'digisun-website-mobile',
    slug: 'digisun-website-mobile',
    name: 'Digisun Website Mobile',
    displayNameFa: 'وب‌سایت دیجی‌سان — نسخه موبایل',
    client: 'Digisun',
    brand: 'Digisun',
    clientFa: 'دیجی‌سان',
    year: 2024,
    featured: false,
    type: ['website', 'ecommerce', 'mobile-app'],
    typeFa: 'رابط کاربری موبایل‌وب تجارت الکترونیک',
    platform: ['mobile'],
    shortDescription: 'طراحی بهینه‌سازی‌شده برای موبایل با ساختار تب‌بار و سبد خرید تک‌مرحله‌ای.',
    scope: ['Mobile Web UX', 'Touch Optimized Layouts', 'Quick Buy Flow'],
    services: ['ui-design', 'responsive-design']
  }),

  // Daewoo Category Page
  createProjectEntry({
    id: 'daewoo-category-page',
    slug: 'daewoo-category-page',
    name: 'Daewoo Category Page',
    displayNameFa: 'صفحه دسته‌بندی محصولات دوو',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: true,
    featuredScore: 92,
    type: ['website', 'ecommerce'],
    typeFa: 'صفحه دسته‌بندی و فیلترینگ کاتالوگ',
    family: 'daewoo-ecosystem',
    shortDescription: 'طراحی سیستم فیلترینگ پیشرفته و کارت‌های محصول ریسپانسیو در پرتال دوو.',
    scope: ['Filter UX', 'Product Grid Layout', 'Quick Compare Integration'],
    services: ['ui-design', 'information-architecture']
  }),

  // Daewoo Single Product
  createProjectEntry({
    id: 'daewoo-single-product',
    slug: 'daewoo-single-product',
    name: 'Daewoo Single Product',
    displayNameFa: 'صفحه تفصیلی محصول (PDP) دوو',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: true,
    featuredScore: 91,
    type: ['website', 'product'],
    typeFa: 'صفحه معرفی مشخصات محصول',
    family: 'daewoo-ecosystem',
    shortDescription: 'معماری و رابط کاربری صفحه مشخصات فنی با گالری ۳۶۰ درجه و مقایسه ویژگی‌ها.',
    scope: ['Product Detail UX', '360 Gallery', 'Tech Specs Accordion'],
    services: ['ui-design', 'responsive-design']
  }),

  // Daewoo Home Page
  createProjectEntry({
    id: 'daewoo-home-page',
    slug: 'daewoo-home-page',
    name: 'Daewoo Home Page',
    displayNameFa: 'صفحه نخست پورتال دوو',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: false,
    type: ['website'],
    typeFa: 'صفحه نخست و لندینگ اصلی',
    family: 'daewoo-ecosystem',
    shortDescription: 'طراحی هیرو سکشن، بنرهای متحرک و بخش پرچمداران لوازم خانگی دوو.',
    scope: ['Hero Section', 'Brand Narrative', 'Feature Highlights'],
    services: ['ui-design', 'art-direction']
  }),

  // Daewoo Menu
  createProjectEntry({
    id: 'daewoo-menu',
    slug: 'daewoo-menu',
    name: 'Daewoo Menu',
    displayNameFa: 'مگامنو و ناوبری مرکزی دوو',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: false,
    type: ['website', 'internal-tool'],
    typeFa: 'سیستم ناوبری و مگامنو',
    family: 'daewoo-ecosystem',
    shortDescription: 'طراحی مگامنوی تعاملی با قابلیت پیش‌نمایش تصویر و دسترسی سریع به کاتالوگ‌ها.',
    scope: ['Mega Menu Architecture', 'Visual Icons', 'Keyboard Navigation'],
    services: ['information-architecture', 'ui-design']
  }),

  // Metrino
  createProjectEntry({
    id: 'metrino',
    slug: 'metrino',
    name: 'Metrino',
    displayNameFa: 'سامانه املاک و ارزیابی مترینو',
    client: 'Metrino',
    brand: 'Metrino',
    clientFa: 'مترینو',
    year: 2024,
    featured: false,
    type: ['product', 'website'],
    typeFa: 'سامانه ارزیابی هوشمند ملک',
    shortDescription: 'طراحی تجربه کاربری سامانه ارزیابی و محاسبه متراژ و ارزش‌گذاری املاک.',
    scope: ['Real Estate UX', 'Calculator Module', 'Map Search UI'],
    services: ['ui-design', 'ux-design', 'prototyping']
  }),

  // Entekhab Construction
  createProjectEntry({
    id: 'entekhab-construction',
    slug: 'entekhab-construction',
    name: 'Entekhab Construction',
    displayNameFa: 'پرتال هلدینگ ساختمانی انتخاب',
    client: 'Entekhab',
    brand: 'Entekhab',
    clientFa: 'انتخاب',
    year: 2024,
    featured: false,
    type: ['website'],
    typeFa: 'وب‌سایت شرکتی و معرفی پروژه‌های عمرانی',
    shortDescription: 'پرتال معرفی پروژه‌های شاخص برج‌سازی و مجتمع‌های تجاری گروه صنعتی انتخاب.',
    scope: ['Corporate UI', 'Project Showcase', 'Timeline & Milestone'],
    services: ['ui-design', 'responsive-design']
  }),

  // Shadow
  createProjectEntry({
    id: 'shadow-portal',
    slug: 'shadow',
    name: 'Shadow',
    displayNameFa: 'وب‌سایت استودیو سایه',
    client: 'Shadow',
    brand: 'Shadow',
    clientFa: 'سایه',
    year: 2025,
    featured: true,
    featuredScore: 90,
    type: ['website', 'product'],
    typeFa: 'پرتال استودیوی طراحی دیجیتال',
    shortDescription: 'طراحی هویت بصری دارک و تعاملی استودیو طراحی محصول سایه.',
    scope: ['Studio Portfolio', 'Interactive Showcase', 'Design Methodology'],
    services: ['ui-design', 'art-direction', 'visual-direction']
  }),

  // Landing IOT Ardesia
  createProjectEntry({
    id: 'landing-iot-ardesia',
    slug: 'landing-iot-ardesia',
    name: 'Landing IOT Ardesia',
    displayNameFa: 'لندینگ اینترنت اشیاء آردزیا',
    client: 'Ardesia',
    brand: 'Ardesia',
    clientFa: 'آردزیا',
    year: 2024,
    featured: false,
    type: ['landing-page', 'campaign'],
    typeFa: 'لندینگ پیج معرفی فناوری IoT',
    family: 'ardesia-ecosystem',
    shortDescription: 'صفحه فرود معرفی فرهای هوشمند و لوازم آشپزخانه متصل به وای‌فای آردزیا.',
    scope: ['IoT Feature Showcase', 'App Connectivity Flow', 'Interactive Hotspots'],
    services: ['landing-page', 'ui-design']
  }),

  // Switcher Lang Ardesia
  createProjectEntry({
    id: 'switcher-lang-ardesia',
    slug: 'switcher-lang-ardesia',
    name: 'Switcher Lang Ardesia',
    displayNameFa: 'ماژول تغییر زبان وب‌سایت آردزیا',
    client: 'Ardesia',
    brand: 'Ardesia',
    clientFa: 'آردزیا',
    year: 2024,
    featured: false,
    type: ['uiux', 'website'],
    typeFa: 'ماژول چندزبانه بین‌المللی',
    family: 'ardesia-ecosystem',
    shortDescription: 'طراحی ماژول سوئیچ زبان و کشور با استانداردهای وب بین‌المللی.',
    scope: ['Language Switcher Modal', 'Country Selector', 'RTL/LTR Adaptation'],
    services: ['ui-design', 'interaction']
  }),

  // Our Story Ardesia
  createProjectEntry({
    id: 'our-story-ardesia',
    slug: 'our-story-ardesia',
    name: 'Our Story Ardesia',
    displayNameFa: 'صفحه داستان برند آردزیا (Our Story)',
    client: 'Ardesia',
    brand: 'Ardesia',
    clientFa: 'آردزیا',
    year: 2024,
    featured: false,
    type: ['website'],
    typeFa: 'صفحه روایت برند و اصالت ایتالیایی',
    family: 'ardesia-ecosystem',
    shortDescription: 'داستان سرگذشت و هنر صنعتگری لوازم خانگی آردزیا در ایتالیا.',
    scope: ['Editorial Storytelling', 'Heritage Timeline', 'Visual Typography'],
    services: ['art-direction', 'ui-design']
  }),

  // Compare-Wishlist Ardesia
  createProjectEntry({
    id: 'compare-wishlist-ardesia',
    slug: 'compare-wishlist-ardesia',
    name: 'Compare-Wishlist Ardesia',
    displayNameFa: 'ماژول مقایسه و علاقه‌مندی‌ها آردزیا',
    client: 'Ardesia',
    brand: 'Ardesia',
    clientFa: 'آردزیا',
    year: 2024,
    featured: false,
    type: ['website', 'ecommerce'],
    typeFa: 'ابزار مقایسه و لیست علاقه‌مندی',
    family: 'ardesia-ecosystem',
    shortDescription: 'طراحی رابط کاربری ذخیره محصولات موردعلاقه و مقایسه مشخصات فنی.',
    scope: ['Wishlist Drawer', 'Compare Matrix', 'Export PDF Specs'],
    services: ['ui-design', 'ux-design']
  }),

  // Daewoo Website GCC
  createProjectEntry({
    id: 'daewoo-website-gcc',
    slug: 'daewoo-website-gcc',
    name: 'Daewoo Website GCC',
    displayNameFa: 'وب‌سایت منطقه‌ای دوو حوزه خلیج فارس',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: true,
    featuredScore: 89,
    type: ['website', 'product'],
    typeFa: 'وب‌سایت چندزبانه منطقه GCC',
    shortDescription: 'طراحی پرتال دوو برای کشورهای حوزه خلیج فارس با پشتیبانی انگلیسی و عربی.',
    scope: ['GCC Regional Localization', 'Multi-Language Architecture', 'Product Lineup Adaptation'],
    services: ['ui-design', 'responsive-design', 'design-system']
  }),

  // Soroush Sehat Landing
  createProjectEntry({
    id: 'soroush-sehat-landing',
    slug: 'soroush-sehat-landing',
    name: 'Soroush Sehat Landing',
    displayNameFa: 'لندینگ پیج اختصاصی سروش صحت',
    client: 'Soroush Sehat',
    brand: 'Soroush Sehat',
    clientFa: 'سروش صحت',
    year: 2024,
    featured: false,
    type: ['landing-page'],
    typeFa: 'لندینگ پیج معرفی آثار و پادکست',
    shortDescription: 'صفحه فرود فرهنگی معرفی کتاب‌ها، برنامه‌ها و کارگاه‌های ادبی سروش صحت.',
    scope: ['Cultural Landing Page', 'Media Player UI', 'Book Showcase'],
    services: ['ui-design', 'visual-direction']
  }),

  // Barani Silver
  createProjectEntry({
    id: 'barani-silver',
    slug: 'barani-silver',
    name: 'Barani Silver',
    displayNameFa: 'پرتال و فروشگاه نقره بارانی',
    client: 'Barani Silver',
    brand: 'Barani Silver',
    clientFa: 'نقره بارانی',
    year: 2024,
    featured: false,
    type: ['website', 'ecommerce'],
    typeFa: 'فروشگاه آنلاین زیورآلات نقره',
    shortDescription: 'طراحی تجربه خرید زیورآلات و نقره‌جات دست‌ساز با رابط کاربری مینیمال.',
    scope: ['Luxury Jewelry E-commerce', 'Filter by Weight/Purity', 'High-Res Zoom'],
    services: ['ui-design', 'responsive-design']
  }),

  // Daewoo RF IOT Landing
  createProjectEntry({
    id: 'daewoo-rf-iot-landing',
    slug: 'daewoo-rf-iot-landing',
    name: 'Daewoo RF IOT Landing',
    displayNameFa: 'لندینگ سایدبای‌ساید هوشمند دوو',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: false,
    type: ['landing-page', 'campaign'],
    typeFa: 'لندینگ پیج معرفی یخچال هوشمند',
    family: 'daewoo-campaigns-iot',
    shortDescription: 'لندینگ اختصاصی معرفی یخچال‌های سایدبای‌ساید مجهز به اینترنت اشیاء و مدیریت مواد غذایی.',
    scope: ['Smart Fridge Landing', '3D Interactive Exploded View', 'Mobile App Sync Demo'],
    services: ['campaign', 'ui-design', 'interaction']
  }),

  // Daewoo DW IOT Landing
  createProjectEntry({
    id: 'daewoo-dw-iot-landing',
    slug: 'daewoo-dw-iot-landing',
    name: 'Daewoo DW IOT Landing',
    displayNameFa: 'لندینگ ظرفشویی هوشمند دوو',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: false,
    type: ['landing-page', 'campaign'],
    typeFa: 'لندینگ پیج ماشین ظرفشویی IoT',
    family: 'daewoo-campaigns-iot',
    shortDescription: 'طراحی صفحه فرود معرفی قابلیت‌های کنترل از راه دور و شستشوی هوشمند ظرفشویی دوو.',
    scope: ['IoT Dishwasher Landing', 'Energy Saving Calculator', 'Feature Breakdown'],
    services: ['campaign', 'ui-design']
  }),

  // Shadow Academy Website
  createProjectEntry({
    id: 'shadow-academy-website',
    slug: 'shadow-academy-website',
    name: 'Shadow Academy Website',
    displayNameFa: 'وب‌سایت آکادمی سایه',
    client: 'Shadow',
    brand: 'Shadow',
    clientFa: 'سایه',
    year: 2024,
    featured: false,
    type: ['website', 'ecommerce'],
    typeFa: 'سامانه آموزش و آکادمی دیزاین',
    shortDescription: 'پلتفرم آموزشی دوره‌های تخصصی تجربه کاربری و سیستم‌های دیزاین دیجیتال.',
    scope: ['Course Catalog', 'Curriculum Showcase', 'Student Registration Portal'],
    services: ['ui-design', 'responsive-design']
  }),

  // Shadow General Brief Form
  createProjectEntry({
    id: 'shadow-general-brief-form',
    slug: 'shadow-general-brief-form',
    name: 'Shadow General Brief Form',
    displayNameFa: 'فرم تعاملی بریف پروژه‌های استودیو سایه',
    client: 'Shadow',
    brand: 'Shadow',
    clientFa: 'سایه',
    year: 2024,
    featured: false,
    type: ['internal-tool', 'uiux'],
    typeFa: 'فرم تعاملی و چندمرحله‌ای بریفینگ',
    shortDescription: 'طراحی فرم چندمرحله‌ای هوشمند دریافت بریف کارفرمایان و تخمین اسکوپ دیزاین.',
    scope: ['Multi-Step Form UX', 'Interactive Scope Estimator', 'Live Validation'],
    services: ['ux-design', 'ui-design', 'prototyping']
  }),

  // Daewoo WM IOT Landing
  createProjectEntry({
    id: 'daewoo-wm-iot-landing',
    slug: 'daewoo-wm-iot-landing',
    name: 'Daewoo WM IOT Landing',
    displayNameFa: 'لندینگ لباسشویی هوشمند دوو',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: false,
    type: ['landing-page', 'campaign'],
    typeFa: 'لندینگ پیج ماشین لباسشویی هوشمند',
    family: 'daewoo-campaigns-iot',
    shortDescription: 'معرفی فناوری‌های موتور دایرکت درایو و برنامه‌های شستشوی هوشمند لباسشویی دوو.',
    scope: ['Washing Machine Landing', 'Direct Drive Animation Demo', 'App Integration'],
    services: ['campaign', 'ui-design']
  }),

  // Loader For Ardesia Website
  createProjectEntry({
    id: 'loader-ardesia-website',
    slug: 'loader-ardesia-website',
    name: 'Loader For Ardesia Website',
    displayNameFa: 'لودر و انیمیشن ورودی وب‌سایت آردزیا',
    client: 'Ardesia',
    brand: 'Ardesia',
    clientFa: 'آردزیا',
    year: 2024,
    featured: false,
    type: ['uiux'],
    typeFa: 'طراحی موشن و لودر وب‌سایت',
    family: 'ardesia-ecosystem',
    shortDescription: 'انیمیشن لودینگ لوکس با لوگوتایپ آردزیا برای ایجاد حس اصالت پیش از لود کامل صفحه.',
    scope: ['Motion Design', 'Brand Intro Animation', 'Smooth Transition'],
    services: ['art-direction', 'interaction']
  }),

  // Daewoo IOT General Landing
  createProjectEntry({
    id: 'daewoo-iot-general-landing',
    slug: 'daewoo-iot-general-landing',
    name: 'Daewoo IOT General Landing',
    displayNameFa: 'لندینگ جامع اینترنت اشیاء دوو (Smart Home)',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: false,
    type: ['landing-page', 'product'],
    typeFa: 'لندینگ اکوسیستم خانه هوشمند',
    family: 'daewoo-campaigns-iot',
    shortDescription: 'پرزنت یکپارچه اکوسیستم لوازم خانگی متصل و مدیریت خانه هوشمند با اپلیکیشن دوو.',
    scope: ['Smart Ecosystem UI', 'Device Pairing Illustration', 'Interactive Room Demo'],
    services: ['ui-design', 'landing-page', 'interaction']
  }),

  // Shadow UI Website 2
  createProjectEntry({
    id: 'shadow-ui-website-2',
    slug: 'shadow-ui-website-2',
    name: 'Shadow UI Website 2',
    displayNameFa: 'وب‌سایت استودیو سایه — کانسپت ۲',
    client: 'Shadow',
    brand: 'Shadow',
    clientFa: 'سایه',
    year: 2024,
    featured: false,
    type: ['website', 'uiux'],
    typeFa: 'کانسپت وب‌سایت استودیو',
    shortDescription: 'اکسپلوریشن بصری تایپوگرافی پلاک و ساختار کارت‌های شیشه‌ای برای استودیو.',
    scope: ['UI Exploration', 'Grid System', 'Dark Minimal Layout'],
    services: ['ui-design', 'visual-direction']
  }),

  // Daewoo Lead Generation Landing
  createProjectEntry({
    id: 'daewoo-lead-generation',
    slug: 'daewoo-lead-generation',
    name: 'Daewoo Lead Generation Landing',
    displayNameFa: 'لندینگ لیدجنریشن و ثبت درخواست دوو',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2024,
    featured: false,
    type: ['landing-page', 'campaign'],
    typeFa: 'صفحه دریافت سرنخ و مشاوره خرید',
    family: 'daewoo-campaigns-iot',
    shortDescription: 'طراحی صفحه فرود متمرکز بر جمع‌آوری اطلاعات خریداران سازمانی و درخواست مشاوره.',
    scope: ['Lead Capture Form', 'A/B Testing Variants', 'Trust Badges'],
    services: ['campaign', 'ui-design']
  }),

  // Daewoo I Love Daewoo Landing (Entry 1)
  createProjectEntry({
    id: 'daewoo-i-love-daewoo-1',
    slug: 'daewoo-i-love-daewoo-landing',
    name: 'Daewoo I Love Daewoo Landing',
    displayNameFa: 'کمپین I Love Daewoo — نسخه اصلی',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2024,
    featured: false,
    type: ['landing-page', 'campaign'],
    typeFa: 'کمپین وفاداری مشتریان دوو',
    family: 'daewoo-campaigns-iot',
    shortDescription: 'کمپین تعاملی باشگاه مشتریان دوو با امکان ثبت خاطرات و تجربیات استفاده از محصولات.',
    scope: ['Campaign Identity', 'User Story Submission', 'Social Sharing'],
    services: ['campaign', 'ui-design']
  }),

  // Daewoo Category Filter
  createProjectEntry({
    id: 'daewoo-category-filter',
    slug: 'daewoo-category-filter',
    name: 'Daewoo Category Filter',
    displayNameFa: 'ماژول فیلترینگ دسته‌بندی دوو',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: false,
    type: ['internal-tool', 'uiux'],
    typeFa: 'سیستم فیلتر مشخصات فنی',
    family: 'daewoo-ecosystem',
    shortDescription: 'طراحی ماژول فیلتر مشخصات فنی با پشتیبانی از فیلترهای چندگزینه‌ای و اسلایدرهای رنج.',
    scope: ['Faceted Search UI', 'Instant Filter Tags', 'Responsive Drawer'],
    services: ['ui-design', 'ux-design']
  }),

  // Shadow UI Website 3
  createProjectEntry({
    id: 'shadow-ui-website-3',
    slug: 'shadow-ui-website-3',
    name: 'Shadow UI Website 3',
    displayNameFa: 'وب‌سایت استودیو سایه — کانسپت ۳',
    client: 'Shadow',
    brand: 'Shadow',
    clientFa: 'سایه',
    year: 2024,
    featured: false,
    type: ['website', 'uiux'],
    typeFa: 'کانسپت معماری وب‌سایت استودیو',
    shortDescription: 'بررسی ساختار لایه‌بندی مانیتورینگ پروژه‌ها و نمایش گرافیکی کیس‌استادی‌ها.',
    scope: ['Case Study Layout', 'Editorial Grids', 'Dark UI'],
    services: ['ui-design', 'visual-direction']
  }),

  // Daewoo HANA DW Landing
  createProjectEntry({
    id: 'daewoo-hana-dw-landing',
    slug: 'daewoo-hana-dw-landing',
    name: 'Daewoo HANA DW Landing',
    displayNameFa: 'لندینگ ماشین ظرفشویی سری هانا دوو',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2024,
    featured: false,
    type: ['landing-page', 'campaign'],
    typeFa: 'لندینگ پیج معرفی سری هانا ظرفشویی',
    family: 'daewoo-campaigns-iot',
    shortDescription: 'صفحه فرود معرفی سری اختصاصی HANA در رده ماشین‌های ظرفشویی فوق‌کم‌صدا.',
    scope: ['HANA Series Branding', 'Silent Wash Highlights', 'Spec Comparison'],
    services: ['campaign', 'ui-design']
  }),

  // Macsa UI Website
  createProjectEntry({
    id: 'macsa-ui-website',
    slug: 'macsa-ui-website',
    name: 'Macsa UI Website',
    displayNameFa: 'وب‌سایت موسسه نیکوکاری مکسا',
    client: 'Macsa',
    brand: 'Macsa',
    clientFa: 'مکسا',
    year: 2024,
    featured: false,
    type: ['website'],
    typeFa: 'پرتال موسسه نیکوکاری و سلامت',
    shortDescription: 'طراحی وب‌سایت موسسه مراقبت‌های تسکینی سرطان مکسا با رویکرد دسترس‌پذیری بالا.',
    scope: ['Accessible UI', 'Donation Flow', 'Care Services Guide'],
    services: ['ui-design', 'responsive-design']
  }),

  // Velocity Landing For Shadow
  createProjectEntry({
    id: 'velocity-landing-shadow',
    slug: 'velocity-landing-for-shadow',
    name: 'Velocity Landing For Shadow',
    displayNameFa: 'لندینگ پیج متدولوژی Velocity سایه',
    client: 'Shadow',
    brand: 'Shadow',
    clientFa: 'سایه',
    year: 2025,
    featured: false,
    type: ['landing-page', 'product'],
    typeFa: 'لندینگ معرفی فرآیند اسپرینت دیزاین',
    shortDescription: 'معرفی متدولوژی سرعت‌بخش طراحی محصول استودیو سایه به کارفرمایان سازمانی.',
    scope: ['Interactive Design Sprint Timeline', 'Methodology Infographics', 'CTA Booking'],
    services: ['ui-design', 'visual-direction']
  }),

  // CTA for Single Product Page
  createProjectEntry({
    id: 'cta-single-product',
    slug: 'cta-for-single-product-page',
    name: 'CTA for Single Product Page',
    displayNameFa: 'ماژول دکمه اقدام (CTA) صفحات محصول دوو',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: false,
    type: ['internal-tool', 'uiux'],
    typeFa: 'ماژول خرید و هدایت به نمایندگی',
    family: 'daewoo-ecosystem',
    shortDescription: 'بهینه‌سازی دکمه استعلام قیمت و یافتن نزدیک‌ترین نمایندگی در صفحه محصول دوو.',
    scope: ['Conversion UX', 'Dealer Locator Widget', 'Micro-interactions'],
    services: ['ui-design', 'ux-design']
  }),

  // Tecnogas Landing for 2 Products
  createProjectEntry({
    id: 'tecnogas-landing-2-products',
    slug: 'tecnogas-landing-for-2-products',
    name: 'Tecnogas Landing for 2 Products',
    displayNameFa: 'لندینگ پیج مقایسه ۲ محصول برتر تکنوگاز',
    client: 'Tecnogas',
    brand: 'Tecnogas',
    clientFa: 'تکنوگاز',
    year: 2024,
    featured: false,
    type: ['landing-page', 'campaign'],
    typeFa: 'صفحه فرود معرفی و مقایسه دو پرچمدار',
    family: 'tecnogas-ecosystem',
    shortDescription: 'طراحی صفحه فرود دوگانه برای مقایسه مستقیم فر توکار و اجاق‌گاز رومیزی تکنوگاز.',
    scope: ['Split Screen UI', 'Direct Feature Comparison', 'Luxury Aesthetics'],
    services: ['campaign', 'ui-design']
  }),

  // mkrefrigeration UI Website
  createProjectEntry({
    id: 'mkrefrigeration-ui-website',
    slug: 'mkrefrigeration-ui-website',
    name: 'mkrefrigeration UI Website',
    displayNameFa: 'وب‌سایت تجهیزات برودتی ام‌کی ریفریجریشن',
    client: 'MK Refrigeration',
    brand: 'MK Refrigeration',
    clientFa: 'ام‌کی ریفریجریشن',
    year: 2024,
    featured: false,
    type: ['website', 'product'],
    typeFa: 'پرتال تجهیزات سرمایشی صنعتی',
    shortDescription: 'طراحی وب‌سایت صنعتی کاتالوگ چیلرها و سیستم‌های برودتی تجاری.',
    scope: ['Industrial Catalog UI', 'Technical Spec Tables', 'Inquiry Flow'],
    services: ['ui-design', 'responsive-design']
  }),

  // Entekhab Sabz UI Website
  createProjectEntry({
    id: 'entekhab-sabz-ui-website',
    slug: 'entekhab-sabz-ui-website',
    name: 'Entekhab Sabz UI Website',
    displayNameFa: 'وب‌سایت انرژی سبز انتخاب (Entekhab Sabz)',
    client: 'Entekhab',
    brand: 'Entekhab',
    clientFa: 'انتخاب',
    year: 2025,
    featured: true,
    featuredScore: 88,
    type: ['website', 'product'],
    typeFa: 'پرتال انرژی‌های تجدیدپذیر و پنل‌های خورشیدی',
    shortDescription: 'طراحی پرتال جامع انرژی سبز و پروژه‌های نیروگاهی پاک گروه صنعتی انتخاب.',
    scope: ['Green Energy Branding', 'Solar Calculator UI', 'Sustainability Dashboard'],
    services: ['ui-design', 'responsive-design', 'information-architecture']
  }),

  // Snowa Entekhab Sabz Landing
  createProjectEntry({
    id: 'snowa-entekhab-sabz',
    slug: 'snowa-entekhab-sabz-landing',
    name: 'Snowa Entekhab Sabz Landing',
    displayNameFa: 'لندینگ کمپین انتخاب سبز اسنوا',
    client: 'Snowa',
    brand: 'Snowa',
    clientFa: 'اسنوا',
    year: 2024,
    featured: false,
    type: ['landing-page', 'campaign'],
    typeFa: 'لندینگ کمپین محصولات کم‌مصرف',
    family: 'snowa-ecosystem',
    shortDescription: 'صفحه فرود معرفی محصولات دارای رده انرژی A+++ و تخفیف‌های تعویض لوازم کهنه.',
    scope: ['Eco-friendly Campaign', 'Energy Savings Calculator', 'Form Wizard'],
    services: ['campaign', 'ui-design']
  }),

  // Daewoo Nemayandegi Landing Page
  createProjectEntry({
    id: 'daewoo-nemayandegi-landing',
    slug: 'daewoo-nemayandegi-landing-page',
    name: 'Daewoo Nemayandegi Landing Page',
    displayNameFa: 'لندینگ پیج جذب نمایندگی رسمی دوو',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2024,
    featured: false,
    type: ['landing-page', 'campaign'],
    typeFa: 'لندینگ جذب و اعطای نمایندگی',
    family: 'daewoo-campaigns-iot',
    shortDescription: 'صفحه فرود جذب و اخذ نمایندگی‌های فروش و خدمات پس از فروش دوو در سراسر کشور.',
    scope: ['B2B Application Form', 'Dealer Benefits Breakdown', 'Interactive Map'],
    services: ['campaign', 'ui-design']
  }),

  // Smalvic Landing Page Zero
  createProjectEntry({
    id: 'smalvic-landing-zero',
    slug: 'smalvic-landing-page-zero',
    name: 'Smalvic Landing Page Zero',
    displayNameFa: 'لندینگ پیج سری اختصاصی Zero اسمالویک',
    client: 'Smalvic',
    brand: 'Smalvic',
    clientFa: 'اسمالویک',
    year: 2024,
    featured: false,
    type: ['landing-page', 'product'],
    typeFa: 'لندینگ لانچ محصول سری لوکس',
    family: 'smalvic-ecosystem',
    shortDescription: 'طراحی لندینگ لوکس رونمایی از لاین تخصصی لوازم پخت‌وپز توکار سری Zero اسمالویک.',
    scope: ['Minimal Italian Art Direction', 'Product Showcase', 'High-Res Aesthetics'],
    services: ['landing-page', 'art-direction', 'ui-design']
  }),

  // Daewoo HANA Landing
  createProjectEntry({
    id: 'daewoo-hana-landing',
    slug: 'daewoo-hana-landing',
    name: 'Daewoo HANA Landing',
    displayNameFa: 'لندینگ پیج پرچمداران سری هانا دوو',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: true,
    featuredScore: 93,
    featuredRank: 4,
    type: ['landing-page', 'campaign', 'product'],
    typeFa: 'لندینگ کمپین ملی پرچمدار',
    family: 'daewoo-campaigns-iot',
    shortDescription: 'طراحی کمپین و لندینگ معرفی خانواده پرچمدار محصولات HANA دوو با موشن‌های تعاملی.',
    scope: ['Flagship Campaign UI', 'Interactive 3D Views', 'Micro-interactions', 'Performance Optimization'],
    services: ['campaign', 'ui-design', 'art-direction'],
    figmaUrl: 'https://figma.com/@shadow/daewoo-hana-campaign'
  }),

  // Daewoo Senior TFT Landing
  createProjectEntry({
    id: 'daewoo-senior-tft-landing',
    slug: 'daewoo-senior-tft-landing',
    name: 'Daewoo Senior TFT Landing',
    displayNameFa: 'لندینگ فناوری نمایشگرهای TFT سری سینیور دوو',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: false,
    type: ['landing-page', 'product'],
    typeFa: 'لندینگ پیج فناوری نمایشگرهای هوشمند',
    family: 'daewoo-campaigns-iot',
    shortDescription: 'صفحه فرود معرفی رابط کاربری لمسی تمام‌رنگی TFT نصب‌شده بر روی لوازم خانگی دوو.',
    scope: ['UI Simulation on Screen', 'Touch Gestures Demonstration', 'Feature Hotspots'],
    services: ['landing-page', 'ui-design']
  }),

  // Daewoo Add Senior TFT WM Catalog
  createProjectEntry({
    id: 'daewoo-senior-tft-wm-catalog',
    slug: 'daewoo-add-senior-tft-wm-catalog',
    name: 'Daewoo Add Senior TFT WM Catalog',
    displayNameFa: 'کاتالوگ لباسشویی‌های سری Senior TFT دوو',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: false,
    type: ['website', 'product'],
    typeFa: 'کاتالوگ تعاملی لباسشویی‌های نمایشگردار',
    family: 'daewoo-campaigns-iot',
    shortDescription: 'افزودن و طراحی بخش کاتالوگ تعاملی لباسشویی‌های مجهز به صفحه نمایش لمسی سینیور.',
    scope: ['Catalog Extension', 'Specs Comparison', 'Interactive Dials'],
    services: ['ui-design', 'responsive-design']
  }),

  // Shadow BOOK Landing
  createProjectEntry({
    id: 'shadow-book-landing',
    slug: 'shadow-book-landing',
    name: 'Shadow BOOK Landing',
    displayNameFa: 'لندینگ پیج معرفی کتاب دیزاین سایه',
    client: 'Shadow',
    brand: 'Shadow',
    clientFa: 'سایه',
    year: 2024,
    featured: false,
    type: ['landing-page'],
    typeFa: 'لندینگ پیج معرفی کتاب تخصصی',
    shortDescription: 'طراحی صفحه معرفی کتاب جامع استانداردهای سیستم‌های دیزاین و معماری تجربه کاربری.',
    scope: ['Editorial Layout', 'Sample Chapter Reader', 'Order Flow'],
    services: ['landing-page', 'art-direction']
  }),

  // Snowa Winter Time Is Gold Landing
  createProjectEntry({
    id: 'snowa-winter-time-is-gold',
    slug: 'snowa-winter-time-is-gold-landing',
    name: 'Snowa Winter Time Is Gold Landing',
    displayNameFa: 'لندینگ کمپین زمستانه «وقت طلاست» اسنوا',
    client: 'Snowa',
    brand: 'Snowa',
    clientFa: 'اسنوا',
    year: 2024,
    featured: false,
    type: ['landing-page', 'campaign'],
    typeFa: 'لندینگ کمپین جایزه‌محور زمستانه',
    family: 'snowa-ecosystem',
    shortDescription: 'طراحی صفحه فرود کمپین زمستانه با گردونه جوایز و اهدای شمش طلا به خریداران.',
    scope: ['Winter Campaign Visuals', 'Gamification Wheel', 'Prize Tracking'],
    services: ['campaign', 'ui-design']
  }),

  // Snowa Az Sharayet Snowa Khabar Dari Landing
  createProjectEntry({
    id: 'snowa-az-sharayet-khabar-dari',
    slug: 'snowa-az-sharayet-snowa-khabar-dari-landing',
    name: 'Snowa Az Sharayet Snowa Khabar Dari Landing',
    displayNameFa: 'لندینگ «از شرایط اسنوا خبر داری؟»',
    client: 'Snowa',
    brand: 'Snowa',
    clientFa: 'اسنوا',
    year: 2024,
    featured: false,
    type: ['landing-page', 'campaign'],
    typeFa: 'لندینگ اطلاع‌رسانی خرید اقساطی',
    family: 'snowa-ecosystem',
    shortDescription: 'صفحه فرود معرفی طرح‌های فروش اقساطی بدون ضامن و تسهیلات ویژه بازنشستگان.',
    scope: ['Installment Calculator', 'Eligibility Checker', 'Direct Application'],
    services: ['campaign', 'ui-design']
  }),

  // Smalvic UI/UX Website
  createProjectEntry({
    id: 'smalvic-uiux-website',
    slug: 'smalvic-uiux-website',
    name: 'Smalvic UI/UX Website',
    displayNameFa: 'وب‌سایت و کاتالوگ دیزاین اسمالویک',
    client: 'Smalvic',
    brand: 'Smalvic',
    clientFa: 'اسمالویک',
    year: 2024,
    featured: false,
    type: ['website', 'product'],
    typeFa: 'وب‌سایت و کاتالوگ محصولات توکار',
    family: 'smalvic-ecosystem',
    shortDescription: 'طراحی مجدد رابط کاربری کاتالوگ اجاق‌های القایی و فرهای ترکیبی اسمالویک.',
    scope: ['Product Catalog UI', 'Technical Cutouts Showcase', 'Dealer Network'],
    services: ['ui-design', 'responsive-design']
  }),

  // Tecnogas UI/UX Website Persian
  createProjectEntry({
    id: 'tecnogas-website-persian',
    slug: 'tecnogas-uiux-website-persian',
    name: 'Tecnogas UI/UX Website Persian',
    displayNameFa: 'وب‌سایت تکنوگاز — نسخه فارسی',
    client: 'Tecnogas',
    brand: 'Tecnogas',
    clientFa: 'تکنوگاز',
    year: 2024,
    featured: false,
    type: ['website', 'product'],
    typeFa: 'وب‌سایت رسمی تکنوگاز در ایران',
    family: 'tecnogas-ecosystem',
    shortDescription: 'طراحی رابط کاربری نسخه فارسی پرتال تکنوگاز با فونت فارسی سفارشی و گارانتی رسمی.',
    scope: ['Persian RTL Adaptation', 'Service Center Directory', 'Catalog Download'],
    services: ['ui-design', 'responsive-design']
  }),

  // Tecnogas UI/UX Website International
  createProjectEntry({
    id: 'tecnogas-website-intl',
    slug: 'tecnogas-uiux-website-international',
    name: 'Tecnogas UI/UX Website International',
    displayNameFa: 'وب‌سایت بین‌المللی تکنوگاز ایتالیا',
    client: 'Tecnogas',
    brand: 'Tecnogas',
    clientFa: 'تکنوگاز',
    year: 2025,
    featured: true,
    featuredScore: 91,
    featuredRank: 5,
    type: ['website', 'product'],
    typeFa: 'پرتال جهانی برند تکنوگاز',
    family: 'tecnogas-ecosystem',
    shortDescription: 'طراحی تجربه کاربری پرتال جهانی تکنوگاز به زبان انگلیسی با استانداردهای لوکس آشپزخانه.',
    scope: ['Global Visual Guidelines', 'Interactive Product Range', 'Distributor Portal'],
    services: ['ui-design', 'responsive-design', 'visual-direction'],
    figmaUrl: 'https://figma.com/@shadow/tecnogas-international'
  }),

  // Ardesia Nemayandegan Page
  createProjectEntry({
    id: 'ardesia-nemayandegan-page',
    slug: 'ardesia-nemayandegan-page',
    name: 'Ardesia Nemayandegan Page',
    displayNameFa: 'صفحه نمایندگی‌ها و شعب آردزیا',
    client: 'Ardesia',
    brand: 'Ardesia',
    clientFa: 'آردزیا',
    year: 2024,
    featured: false,
    type: ['website', 'internal-tool'],
    typeFa: 'نقشه و فهرست شعب و خدمات',
    family: 'ardesia-ecosystem',
    shortDescription: 'طراحی نقشه تعاملی و فیلتر استانی جهت دسترسی به نزدیک‌ترین شوروم آردزیا.',
    scope: ['Interactive Map UI', 'Province/City Filter', 'Showroom Details'],
    services: ['ui-design', 'ux-design']
  }),

  // Daewoo Category and Single Page Edit
  createProjectEntry({
    id: 'daewoo-category-single-edit',
    slug: 'daewoo-category-and-single-page-edit',
    name: 'Daewoo Category and Single Page Edit',
    displayNameFa: 'اصلاحات و ارتقای صفحات کاتالوگ و محصول دوو',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: false,
    type: ['uiux', 'website'],
    typeFa: 'بهینه‌سازی رابط و ریدیزاین ماژولار',
    family: 'daewoo-ecosystem',
    shortDescription: 'پکیج بازطراحی و ارتقای فیلترهای کناری و گالری مشخصات محصول در وب‌سایت دوو.',
    scope: ['UI Polish', 'Accessibility Updates', 'Mobile Sticky Nav'],
    services: ['ui-design', 'responsive-design']
  }),

  // Daewoo UI Products
  createProjectEntry({
    id: 'daewoo-ui-products',
    slug: 'daewoo-ui-products',
    name: 'Daewoo UI Products',
    displayNameFa: 'کتابخانه کامپوننت‌های محصول دوو',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: false,
    type: ['design-system', 'uiux'],
    typeFa: 'کتابخانه کامپوننت و توکن‌های کارت محصول',
    family: 'daewoo-ecosystem',
    shortDescription: 'سیستم دیزاین جامع و کامپوننت‌های فیگما برای نمایش تمامی گروه‌های محصولی دوو.',
    scope: ['Figma Component Library', 'Auto Layout Tokens', 'State Variants'],
    services: ['design-system', 'ui-design']
  }),

  // Daewoo Yasou Landing
  createProjectEntry({
    id: 'daewoo-yasou-landing',
    slug: 'daewoo-yasou-landing',
    name: 'Daewoo Yasou Landing',
    displayNameFa: 'لندینگ کمپین افتتاح شعبه یاسوج دوو',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2024,
    featured: false,
    type: ['landing-page', 'campaign'],
    typeFa: 'لندینگ افتتاحیه و رویداد محلی',
    family: 'daewoo-campaigns-iot',
    shortDescription: 'صفحه فرود رویداد افتتاحیه بزرگترین فروشگاه زنجیره‌ای دوو در یاسوج با قرعه‌کشی.',
    scope: ['Event Landing UI', 'Event Schedule', 'RSVP Registration'],
    services: ['campaign', 'ui-design']
  }),

  // Snowa Farhangian Landing
  createProjectEntry({
    id: 'snowa-farhangian-landing',
    slug: 'snowa-farhangian-landing',
    name: 'Snowa Farhangian Landing',
    displayNameFa: 'لندینگ طرح ویژه فرهنگیان اسنوا',
    client: 'Snowa',
    brand: 'Snowa',
    clientFa: 'اسنوا',
    year: 2024,
    featured: false,
    type: ['landing-page', 'campaign'],
    typeFa: 'لندینگ تسهیلات ویژه معلمان و فرهنگیان',
    family: 'snowa-ecosystem',
    shortDescription: 'صفحه فرود ثبت‌نام تسهیلات ویژه خرید اقساطی لوازم خانگی برای جامعه فرهنگیان.',
    scope: ['Teacher Verification Flow', 'Loan Tier Showcase', 'Form Wizard'],
    services: ['campaign', 'ui-design']
  }),

  // Snowa Landing Vaghteshe Ke No Beshe
  createProjectEntry({
    id: 'snowa-vaghteshe-ke-no-beshe',
    slug: 'snowa-landing-vaghteshe-ke-no-beshe',
    name: 'Snowa Landing Vaghteshe Ke No Beshe',
    displayNameFa: 'لندینگ «وقتشه که نو بشه» اسنوا',
    client: 'Snowa',
    brand: 'Snowa',
    clientFa: 'اسنوا',
    year: 2024,
    featured: false,
    type: ['landing-page', 'campaign'],
    typeFa: 'لندینگ طرح تعویض لوازم خانگی فرسوده',
    family: 'snowa-ecosystem',
    shortDescription: 'صفحه فرود کمپین تعویض لوازم خانگی قدیمی با محصولات جدید اسنوا با تحویل در محل.',
    scope: ['Trade-In Value Estimator', 'Pick-up Scheduler UI', 'Product Upgrades'],
    services: ['campaign', 'ui-design']
  }),

  // Snowa Landing Sharayet Jamjahani Avaz Shod
  createProjectEntry({
    id: 'snowa-sharayet-jamjahani',
    slug: 'snowa-landing-sharayet-jamjahani-avaz-shod',
    name: 'Snowa Landing Sharayet Jamjahani Avaz Shod',
    displayNameFa: 'لندینگ جام‌جهانی «شرایط عوض شد» اسنوا',
    client: 'Snowa',
    brand: 'Snowa',
    clientFa: 'اسنوا',
    year: 2023,
    featured: false,
    type: ['landing-page', 'campaign'],
    typeFa: 'لندینگ کمپین ملی جام‌جهانی',
    family: 'snowa-ecosystem',
    shortDescription: 'طراحی کمپین مسابقه پیش‌بینی و تخفیف ویژه خرید تلویزیون‌های سایز بزرگ اسنوا.',
    scope: ['World Cup Bracket UI', 'Match Prediction Module', 'TV Discounts'],
    services: ['campaign', 'ui-design', 'interaction']
  }),

  // Daewoo Compare Pages
  createProjectEntry({
    id: 'daewoo-compare-pages',
    slug: 'daewoo-compare-pages',
    name: 'Daewoo Compare Pages',
    displayNameFa: 'صفحات مقایسه هوشمند محصولات دوو',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2025,
    featured: true,
    featuredScore: 89,
    type: ['website', 'product', 'internal-tool'],
    typeFa: 'ماژول و صفحه اختصاصی مقایسه فنی',
    family: 'daewoo-ecosystem',
    shortDescription: 'طراحی جدول مقایسه ۵ ستونه محصولات با تفکیک مشخصات متمایز و پرینت کاتالوگ.',
    scope: ['5-Way Comparator UX', 'Difference Highlighting Filter', 'Responsive Sticky Header'],
    services: ['ui-design', 'ux-design', 'responsive-design']
  }),

  // Smalvic Website UI/UX
  createProjectEntry({
    id: 'smalvic-website-uiux',
    slug: 'smalvic-website-uiux',
    name: 'Smalvic Website UI/UX',
    displayNameFa: 'پرتال جامع برند اسمالویک ایتالیا',
    client: 'Smalvic',
    brand: 'Smalvic',
    clientFa: 'اسمالویک',
    year: 2025,
    featured: true,
    featuredScore: 90,
    featuredRank: 6,
    type: ['website', 'product'],
    typeFa: 'پرتال رسمی و کاتالوگ لوکس',
    family: 'smalvic-ecosystem',
    shortDescription: 'طراحی پورتال بین‌المللی اسمالویک با زبان طراحی مدرن و بخش تاریخچه بااصالت ایتالیایی.',
    scope: ['Italian Luxury Layout', 'Full Product Directory', 'Dealer Inquiries'],
    services: ['ui-design', 'responsive-design', 'visual-direction'],
    figmaUrl: 'https://figma.com/@shadow/smalvic-website'
  }),

  // Snowa Summer 1405 Landing (Real Uploaded Trio)
  createProjectEntry({
    id: 'snowa-summer-1405-landing',
    slug: 'snowa-summer-1405-landing',
    name: 'Snowa Summer 1405 Landing',
    originalName: 'Snowa Billionaire Summer',
    displayNameFa: 'لندینگ کمپین جشنواره تابستانه ۱۴۰۵ اسنوا',
    displayNameEn: 'Snowa Billionaire Summer Landing Page',
    client: 'Snowa',
    brand: 'Snowa',
    clientFa: 'اسنوا',
    year: 2026,
    featured: true,
    featuredScore: 96,
    featuredRank: 2,
    type: ['landing-page', 'campaign'],
    typeFa: 'لندینگ کمپین تعاملی بزرگ تابستان',
    platform: ['desktop', 'tablet', 'mobile', 'responsive'],
    platformFa: 'واکنش‌گرا (دسکتاپ ۱۴۴۰، تبلت ۷۶۸، موبایل ۳۹۰)',
    family: 'snowa-ecosystem',
    familyNameFa: 'اکوسیستم وب‌سایت و کمپین‌های اسنوا',
    shortDescription: 'صفحه فرود تعاملی جشنواره سراسری تابستانه اسنوا در ۳ سایز استاندارد دسکتاپ، تبلت و موبایل.',
    description: 'طراحی کمپین جشنواره شب‌های میلیاردی اسنوا با گردونه شانس، ثبت فاکتور خرید و دریافت کارت‌های شانس میلیاردی.',
    scope: ['Responsive Trio Landing', 'Lottery Ticket Generator', 'Interactive Prize Wheel', 'Dynamic Counter'],
    services: ['campaign', 'ui-design', 'art-direction'],
    accentColor: '#059669',
    badge: 'نمونه کار تایید شده ۳ سایز',
    mockupType: 'browser',
    figmaUrl: 'https://figma.com/@shadow/snowa-summer-campaign'
  }),

  // Snowa Summer 1405 Festival TV Platform (Real Uploaded Step Flow)
  createProjectEntry({
    id: 'snowa-summer-1405-app',
    slug: 'snowa-summer-1405-app',
    name: 'Snowa Summer 1405 APP',
    originalName: 'Billionaire Summer 1405 - Festival TV',
    displayNameFa: 'پلتفرم قرعه‌کشی شب‌های میلیاردی اسنوا (TV & Web App)',
    displayNameEn: 'Snowa Billionaire Summer Festival TV Platform',
    nameEn: 'Snowa Festival TV Multi-Step Interaction Flow',
    client: 'Snowa',
    brand: 'Snowa',
    clientFa: 'اسنوا',
    year: 2026,
    featured: true,
    featuredScore: 98,
    featuredRank: 1,
    type: ['mobile-app', 'campaign', 'landing-page'],
    typeFa: 'پلتفرم تعاملی و پروسه قرعه‌کشی',
    platform: ['desktop', 'mobile', 'responsive', 'web'],
    platformFa: 'طراحی پروسه تعاملی و تلویزیون هوشمند',
    family: 'snowa-ecosystem',
    familyNameFa: 'اکوسیستم وب‌سایت و کمپین‌های اسنوا',
    shortDescription: 'طراحی صفر تا صد پروسه و فلوهای تعاملی سامانه قرعه‌کشی تلویزیون و وب‌اپ اسنوا شامل تمام استپ‌ها و استیت‌های خطا.',
    description: 'طراحی ساختار کامل استپ به استپ (Step 0 تا Step 1.4) برای احراز هویت خریداران، استیت‌های خطای امنیتی، گردونه جوایز زنده و صدور بارکد شانس.',
    scope: ['Complete Interaction Flow', 'Smart TV Experience', 'Error State Validation', 'Step-by-Step Lottery UX'],
    services: ['ui-design', 'ux-design', 'prototyping', 'interaction'],
    accentColor: '#10B981',
    badge: 'پروسه کامل پلتفرم (Step Flow)',
    mockupType: 'browser',
    figmaUrl: 'https://figma.com/@shadow/snowa-summer-app'
  }),

  // Duplicate Project from source list (Section 30 of prompt)
  createProjectEntry({
    id: 'daewoo-i-love-daewoo-2',
    slug: 'daewoo-i-love-daewoo-landing-v2',
    name: 'Daewoo I Love Daewoo Landing',
    originalName: 'Daewoo I Love Daewoo Landing (Duplicate Source Entry)',
    displayNameFa: 'کمپین I Love Daewoo — کانسپت ۲',
    client: 'Daewoo',
    brand: 'Daewoo',
    clientFa: 'دوو',
    year: 2024,
    featured: false,
    type: ['landing-page', 'campaign'],
    typeFa: 'لندینگ کمپین وفاداری (نسخه دوم)',
    family: 'daewoo-campaigns-iot',
    shortDescription: 'نسخه دوم کانسپت بصری صفحه فرود کمپین هواداران برند دوو.',
    scope: ['Campaign Concept 2', 'A/B Variation'],
    services: ['campaign', 'ui-design']
  })
];

export const initialExecutiveMetrics = {
  totalProjects: initialProjectsList.length,
  yearsActive: 3,
  brandsCount: 13,
  websitesCount: initialProjectsList.filter(p => Array.isArray(p.type) ? p.type.includes('website') : p.type === 'Website').length,
  landingPagesCount: initialProjectsList.filter(p => Array.isArray(p.type) ? p.type.includes('landing-page') : p.type === 'Landing Page').length,
  mobileExperiencesCount: initialProjectsList.filter(p => Array.isArray(p.platform) ? p.platform.includes('mobile') || p.platform.includes('ios') : p.platform.includes('Mobile')).length,
  productInterfacesCount: initialProjectsList.filter(p => Array.isArray(p.type) ? p.type.includes('product') : p.type === 'Product Design').length,
  campaignCount: initialProjectsList.filter(p => Array.isArray(p.type) ? p.type.includes('campaign') : p.type === 'Campaign').length
};
