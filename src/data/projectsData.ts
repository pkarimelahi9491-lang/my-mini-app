import { Project, ProjectFamily, MetricSummary } from '../types';
import { initialProjectsList, initialExecutiveMetrics } from './initialProjects';

export interface TimelineItem {
  year: number;
  badge: string;
  title: string;
  focus: string;
  keyDeliverables: string[];
  deliverablesCount?: string | number;
  keyProjects?: string[];
}

export const executiveTimeline: TimelineItem[] = [
  {
    year: 2023,
    badge: 'تثبیت زیرساخت',
    title: 'تثبیت زبان بصری و پورتال‌های پایه',
    focus: 'تمرکز بر ساختاربندی اولیه پورتال‌های اصلی دوو، اسنوا و معماری وب‌سایت‌های چندزبانه بین‌المللی تکنوگاز و اسمالویک.',
    keyDeliverables: ['پرتال مرکزی دوو', 'وب‌سایت چندزبانه تکنوگاز', 'پلتفرم مرجع اسنوا'],
    deliverablesCount: '۱۲ پروژه تحویل‌شده',
    keyProjects: ['daewoo-website', 'snowa-website', 'tecnogas-website-intl']
  },
  {
    year: 2024,
    badge: 'جهش لندینگ و IoT',
    title: 'انفجار کمپین‌ها و لندینگ‌های اینترنت اشیاء (IoT)',
    focus: 'توسعه بیش از ۳۰ لندینگ تخصصی لوازم خانگی متصل (ساید RF، ظرفشویی DW، هانا و تی‌اف‌تی) به همراه کمپین‌های فصلی گسترده.',
    keyDeliverables: ['پکیج لندینگ‌های اینترنت اشیاء دوو', 'کمپین‌های سراسری تابستانه اسنوا', 'پورتال لوکس آردزیا'],
    deliverablesCount: '۲۸ لندینگ و کمپین',
    keyProjects: ['daewoo-hana-landing', 'snowa-summer-1405-landing', 'ardesia-website']
  },
  {
    year: 2025,
    badge: 'یکپارچه‌سازی دیزاین سیستم',
    title: 'دیزاین سیستم ماژولار و بهینه‌سازی نرخ تبدیل',
    focus: 'یکپارچه‌سازی کامپوننت‌های مشترک برندها، پیاده‌سازی تایپوگرافی مهندسی‌شده، سیستم فیلترینگ و ابزارهای مقایسه هوشمند محصول.',
    keyDeliverables: ['ماژول مقایسه هوشمند دوو و آردزیا', 'سیستم کاتالوگ دینامیک', 'اپلیکیشن و وب‌اپ اسنوا ۱۴۰۵'],
    deliverablesCount: '۱۸ ماژول و پورتال',
    keyProjects: ['daewoo-compare-pages', 'snowa-summer-1405-app', 'ardesia-nemayandegan-page']
  },
  {
    year: 2026,
    badge: 'مقیاس‌پذیری هوشمند',
    title: 'پلتفرم‌های نسل بعد و اکوسیستم دیجیتال',
    focus: 'حرکت به سمت تجربیات تعاملی پیشرفته، میکرواینتراکشن‌های عمیق، پلتفرم‌های پرچمدار و توسعه رابط‌های کاربردی منطقه‌ای (GCC).',
    keyDeliverables: ['پرتال GCC دوو', 'معماری مدرن آردزیا ایتالیا', 'پورتال سازمانی منتخب'],
    deliverablesCount: '۱۰ پلتفرم پیشرو',
    keyProjects: ['daewoo-website-gcc', 'tecnogas-website-persian', 'snowa-sharayet-jamjahani']
  }
];

export const projectFamilies: ProjectFamily[] = [
  {
    id: 'daewoo-ecosystem',
    name: 'اکوسیستم جامع وب‌سایت دوو',
    client: 'Daewoo',
    description: 'معماری و بازطراحی کلان پرتال مرکزی برند دوو شامل پورتال اصلی، مگامنو، ساختار کاتالوگ و فیلترینگ، صفحات تفصیلی محصول، صفحات مقایسه هوشمند و رابط‌های اختصاصی قطعات.',
    leadProjectId: 'daewoo-website',
    projectIds: [
      'daewoo-website',
      'daewoo-home-page',
      'daewoo-menu',
      'daewoo-category-page',
      'daewoo-single-product',
      'daewoo-category-filter',
      'daewoo-compare-pages',
      'daewoo-ui-products',
      'daewoo-category-single-edit',
      'cta-single-product'
    ]
  },
  {
    id: 'daewoo-campaigns-iot',
    name: 'کمپین‌ها و پلتفرم‌های اینترنت اشیاء (IoT) دوو',
    client: 'Daewoo',
    description: 'طراحی مجموعه‌ای از لندینگ‌های نسل جدید اینترنت اشیاء، خطوط تولید هوشمند (سایدبای‌ساید RF، ماشین ظرفشویی DW، لباسشویی WM)، معرفی فناوری‌های صفحه نمایش TFT و لیدجنریشن.',
    leadProjectId: 'daewoo-hana-landing',
    projectIds: [
      'daewoo-rf-iot-landing',
      'daewoo-dw-iot-landing',
      'daewoo-wm-iot-landing',
      'daewoo-iot-general-landing',
      'daewoo-hana-landing',
      'daewoo-hana-dw-landing',
      'daewoo-senior-tft-landing',
      'daewoo-senior-tft-wm-catalog',
      'daewoo-yasou-landing',
      'daewoo-nemayandegi-landing',
      'daewoo-lead-generation',
      'daewoo-i-love-daewoo-1',
      'daewoo-i-love-daewoo-2',
      'daewoo-website-gcc'
    ]
  },
  {
    id: 'snowa-ecosystem',
    name: 'اکوسیستم وب‌سایت و کمپین‌های اسنوا',
    client: 'Snowa',
    description: 'توسعه وب‌سایت مرجع اسنوا و پکیج کمپین‌های تعاملی ملی شامل جشنواره‌های فصلی، اپلیکیشن کمپین تابستانه ۱۴۰۵، طرح فرهنگیان و ابزارهای خرید اقساطی.',
    leadProjectId: 'snowa-website',
    projectIds: [
      'snowa-website',
      'snowa-summer-1405-landing',
      'snowa-summer-1405-app',
      'snowa-winter-time-is-gold',
      'snowa-az-sharayet-khabar-dari',
      'snowa-farhangian-landing',
      'snowa-vaghteshe-ke-no-beshe',
      'snowa-sharayet-jamjahani',
      'snowa-entekhab-sabz'
    ]
  },
  {
    id: 'ardesia-ecosystem',
    name: 'اکوسیستم برند لوکس آردزیا ایتالیا',
    client: 'Ardesia',
    description: 'طراحی وب‌سایت پریمیوم برند ایتالیایی آردزیا با زبان بصری مینیمال اروپایی، ماژول تغییر زبان بین‌المللی، روایت برند (Our Story)، بخش مقایسه و سیستم نمایش نمایندگی‌ها.',
    leadProjectId: 'ardesia-website',
    projectIds: [
      'ardesia-website',
      'landing-iot-ardesia',
      'switcher-lang-ardesia',
      'our-story-ardesia',
      'compare-wishlist-ardesia',
      'loader-ardesia-website',
      'ardesia-nemayandegan-page'
    ]
  },
  {
    id: 'tecnogas-ecosystem',
    name: 'اکوسیستم وب‌سایت‌های چندزبانه تکنوگاز',
    client: 'Tecnogas',
    description: 'طراحی رابط‌های کاربری بین‌المللی و نسخه فارسی برند تکنوگاز ایتالیا به همراه لندینگ‌های تخصصی معرفی شاخص‌ترین محصولات توکار و آشپزخانه.',
    leadProjectId: 'tecnogas-website-intl',
    projectIds: [
      'tecnogas-website-intl',
      'tecnogas-website-persian',
      'tecnogas-landing-2-products'
    ]
  },
  {
    id: 'smalvic-ecosystem',
    name: 'اکوسیستم وب‌سایت و کاتالوگ اسمالویک',
    client: 'Smalvic',
    description: 'طراحی تجربه کاربری و بصری برند بااصالت اسمالویک (لوازم خانگی توکار ایتالیا) شامل لندینگ‌های لانچ سری Zero و ساختار کاتالوگ دیجیتال.',
    leadProjectId: 'smalvic-website-uiux',
    projectIds: [
      'smalvic-website-uiux',
      'smalvic-uiux-website',
      'smalvic-landing-zero'
    ]
  }
];

export const allProjects: Project[] = initialProjectsList;
export const executiveMetrics: MetricSummary = initialExecutiveMetrics;
