import { BrandPictogramProject } from '../types';

export const INITIAL_PICTOGRAM_PROJECTS: BrandPictogramProject[] = [
  {
    id: 'daewoo-iot-pictograms',
    slug: 'daewoo-iot-pictograms',
    titleFa: 'سیستم جامع پیکتوگرام‌های اینترنت اشیاء و لوازم خانگی دوو',
    titleEn: 'Daewoo Smart IoT & Appliance Iconography System',
    client: 'Daewoo',
    clientFa: 'لوازم خانگی دوو',
    brand: 'Daewoo',
    year: 1403,
    category: 'smart-home',
    categoryFa: 'پیکتوگرام خانه هوشمند و IoT',
    descriptionFa: 'طراحی بیش از ۱۲۰ آیکون و پیکتوگرام مینیمال و یکپارچه بر پایه گرید ۲۴dp برای نمایشگرهای لمسی لوازم خانگی، اپلیکیشن کنترل هوشمند Daewoo Home و بسته‌بندی محصولات با ضخامت اپتیکال ثابت.',
    cover: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85',
    accentColor: '#0066FF',
    iconCount: 128,
    gridSystem: '24×24dp Optical Pixel Grid / 2.0px Stroke Weight / 4px Corner Radii',
    keyTokens: [
      'یکپارچگی ضخامت خطوط در نمایشگرهای OLED و چاپی',
      'گرید هندسی ۲۴ پیکسلی با نقاط کانونی اپتیکال',
      'سازگاری کامل با مد تیره و روشن (Dark / Light UI)',
      'پوشش کامل سناریوهای دما، تایمر، اکو، توربو و اتصال WiFi'
    ],
    mockups: [
      {
        id: 'm1',
        title: 'موکاپ پنل لمسی یخچال ساید بای ساید دوو',
        description: 'نمایش پیکتوگرام‌های دما، انجماد سریع، تصفیه آب و فیلتر هوای فعال بر روی پنل OLED یخچال هوشمند.',
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
        tag: 'Hardware Display Mockup'
      },
      {
        id: 'm2',
        title: 'موکاپ اپلیکیشن موبایل Daewoo Smart Home',
        description: 'کاربرد پیکتوگرام‌ها در کارت‌های مانیتورینگ مصرف انرژی و وضعیت لحظه‌ای ماشین لباسشویی در گوشی موبایل.',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=85',
        tag: 'Mobile App Mockup'
      },
      {
        id: 'm3',
        title: 'گرید سیستم و شیت وکتوری خطوط اپتیکال',
        description: 'رعایت استاندارد فاصله‌ها، زوایای ۴۵ درجه و کنترل فضای منفی (Negative Space) در تمامی سایزها.',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
        tag: 'Vector Grid Spec'
      }
    ],
    guidelines: [
      'حداقل فاصله ایمن (Safe Margin) معادل ۲ پیکسل از هر چهار طرف گرید ۲۴dp',
      'شعاع گوشه‌ها (Corner Radius) همواره ۴dp برای فرم‌های بیرونی و ۲dp برای فرم‌های درونی',
      'رنگ اصلی برند #0066FF در وضعیت فعال و خاکستری خنثی #94A3B8 در وضعیت غیرفعال',
      'ارائه به فرمت SVG استاندارد با خروجی‌های بهینه‌سازی‌شده برای React و Flutter'
    ],
    icons: [
      { id: 'i1', name: 'smart-refrigerator', nameFa: 'یخچال هوشمند', category: 'Appliances', iconName: 'Refrigerator' },
      { id: 'i2', name: 'smart-washing-machine', nameFa: 'ماشین لباسشویی', category: 'Appliances', iconName: 'WashingMachine' },
      { id: 'i3', name: 'eco-energy-saver', nameFa: 'حالت مصرف بهینه (Eco)', category: 'Smart Functions', iconName: 'Leaf' },
      { id: 'i4', name: 'turbo-cooling', nameFa: 'سرمایش سریع توربو', category: 'Smart Functions', iconName: 'Zap' },
      { id: 'i5', name: 'iot-wifi-connected', nameFa: 'اتصال وای‌فای و کلود', category: 'Connectivity', iconName: 'Wifi' },
      { id: 'i6', name: 'child-lock-safety', nameFa: 'قفل کودک هوشمند', category: 'Security', iconName: 'Lock' },
      { id: 'i7', name: 'temp-dual-zone', nameFa: 'تنظیم زون دوگانه دما', category: 'Thermostat', iconName: 'Thermometer' },
      { id: 'i8', name: 'water-filter-status', nameFa: 'فیلتر نانو تصفیه آب', category: 'Maintenance', iconName: 'Droplets' },
      { id: 'i9', name: 'smart-timer-clock', nameFa: 'تایمر شروع با تاخیر', category: 'Smart Functions', iconName: 'Clock' },
      { id: 'i10', name: 'audio-chime-alert', nameFa: 'هشدار صوتی هوشمند', category: 'Notifications', iconName: 'Bell' },
      { id: 'i11', name: 'cloud-firmware-update', nameFa: 'به‌روزرسانی نرم‌افزار (OTA)', category: 'Connectivity', iconName: 'CloudDownload' },
      { id: 'i12', name: 'flame-safety-sensor', nameFa: 'سنسور شعله و حرارت', category: 'Security', iconName: 'Flame' }
    ]
  },
  {
    id: 'snowa-app-symbols',
    slug: 'snowa-app-symbols',
    titleFa: 'آیکونوگرافی و سیستم سمبل‌های برند اسنوا',
    titleEn: 'Snowa Brand & SuperApp Symbol System',
    client: 'Snowa',
    clientFa: 'اسنوا',
    brand: 'Snowa',
    year: 1403,
    category: 'app-icons',
    categoryFa: 'سمبل‌ها و آیکون‌های اپلیکیشن',
    descriptionFa: 'زبان تصویری یکدست و مدرن برای اپلیکیشن‌های باشگاه مشتریان، خدمات پس از فروش و کمپین‌های اسنوا با الهام از خطوط منحنی لوگوی اسنوا و فرم‌های ارگانیک و دوستانه.',
    cover: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=85',
    accentColor: '#10B981',
    iconCount: 96,
    gridSystem: '32×32dp Friendly Rounded Geometry / 2.5px Line Stroke',
    keyTokens: [
      'فرم‌های نرم و گرد متناسب با هویت برند گرم و صمیمی اسنوا',
      'استفاده از شیب ملایم طیف سبز و لیمویی در استیت‌های فعال',
      'طراحی دو حالت خطی (Linear) و توپر (Solid) برای وضعیت‌های مختلف تب‌بار',
      'بهینه‌سازی کامل جهت کنتراست بالای نمایش روی انواع گوشی‌ها'
    ],
    mockups: [
      {
        id: 'sm1',
        title: 'موکاپ تب‌بار و ناوبری اپلیکیشن Snowa Club',
        description: 'استفاده از آیکون‌های دوحالته برای نمایش تب‌های فعال و غیرفعال در سوپراپ مشتریان.',
        imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=85',
        tag: 'App Navigation'
      },
      {
        id: 'sm2',
        title: 'موکاپ بسته‌بندی و نشان‌های راهنمای کاربری اسنوا',
        description: 'چاپ پیکتوگرام‌های خدمات نصب رایگان، گارانتی طلایی و تست صدا بر روی جعبه و بروشور محصولات.',
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
        tag: 'Packaging & Print'
      }
    ],
    guidelines: [
      'تمامی انحناها از زاویه گردی ۶dp بهره می‌برند تا حس صمیمیت برند اسنوا منتقل شود.',
      'تراکم بصری آیکون‌ها با تست اپتیکال در اندازه ۱۶ پیکسل بررسی و بالانس شده است.'
    ],
    icons: [
      { id: 's1', name: 'club-rewards-gift', nameFa: 'جوایز و هدایای باشگاه', category: 'Loyalty', iconName: 'Gift' },
      { id: 's2', name: 'warranty-shield-gold', nameFa: 'ضمانت طلایی انتخاب سرویس', category: 'Service', iconName: 'ShieldCheck' },
      { id: 's3', name: 'service-technician', nameFa: 'درخواست تکنسین در محل', category: 'Support', iconName: 'Wrench' },
      { id: 's4', name: 'smart-shopping-cart', nameFa: 'سبد خرید و سفارش آنلاین', category: 'E-commerce', iconName: 'ShoppingBag' },
      { id: 's5', name: 'voice-assistance-mic', nameFa: 'دستیار صوتی فارسی', category: 'AI Tools', iconName: 'Mic' },
      { id: 's6', name: 'lottery-lucky-wheel', nameFa: 'گردونه شانس و جشنواره', category: 'Campaigns', iconName: 'Sparkles' },
      { id: 's7', name: 'location-service-center', nameFa: 'نقشه مراکز خدمات و شعب', category: 'Navigation', iconName: 'MapPin' },
      { id: 's8', name: 'customer-chat-online', nameFa: 'پشتیبانی آنلاین و چت ۲۴ ساعته', category: 'Support', iconName: 'MessageSquare' }
    ]
  },
  {
    id: 'entekhab-group-design-tokens',
    slug: 'entekhab-group-design-tokens',
    titleFa: 'کیت نشان‌های هویت سازمانی گروه انتخاب',
    titleEn: 'Entekhab Group Master Enterprise Symbols',
    client: 'Entekhab Group',
    clientFa: 'گروه صنعتی انتخاب',
    brand: 'Entekhab',
    year: 1402,
    category: 'system-icons',
    categoryFa: 'نشان‌های سیستم سازمانی و اداری',
    descriptionFa: 'مجموعه پیکتوگرام‌های سازمانی، لجستیک، منابع انسانی و پورتال‌های B2B هلدینگ با استایل رسمی، شیک و دقیق بر پایه هویت بصری یکپارچه گروه.',
    cover: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    accentColor: '#6366F1',
    iconCount: 84,
    gridSystem: '20×20dp Enterprise Compact Grid / 1.5px Precision Stroke',
    keyTokens: [
      'ساختار دقیق و متناسب با سیستم‌های داشبورد اداری و ERP',
      'کاهش نویز بصری در داده‌های متراکم مالی و مدیریتی',
      'پوشش دسته‌بندی‌های لجستیک، زنجیره تأمین، منابع انسانی و مالی'
    ],
    mockups: [
      {
        id: 'em1',
        title: 'موکاپ داشبورد مانیتورینگ لجستیک و انبارداری هلدینگ',
        description: 'استفاده از آیکون‌های متراکم در جدول‌های سفارشات، ناوگان توزیع و ردیابی کالا.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
        tag: 'Dashboard System'
      }
    ],
    icons: [
      { id: 'e1', name: 'supply-chain-truck', nameFa: 'لجستیک و ناوگان توزیع', category: 'Supply Chain', iconName: 'Truck' },
      { id: 'e2', name: 'warehouse-inventory', nameFa: 'مدیریت انبار مرکزی', category: 'Logistics', iconName: 'Package' },
      { id: 'e3', name: 'financial-analytics-growth', nameFa: 'گزارش‌های مالی و سودآوری', category: 'Finance', iconName: 'TrendingUp' },
      { id: 'e4', name: 'hr-corporate-team', nameFa: 'مدیریت سرمایه‌های انسانی', category: 'HR', iconName: 'Users' },
      { id: 'e5', name: 'b2b-contract-deal', nameFa: 'قراردادها و فروش سازمانی', category: 'B2B', iconName: 'FileCheck' },
      { id: 'e6', name: 'factory-production-line', nameFa: 'خطوط تولید و اتوماسیون', category: 'Manufacturing', iconName: 'Factory' }
    ]
  }
];
