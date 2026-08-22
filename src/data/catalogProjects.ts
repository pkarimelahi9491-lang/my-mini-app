import { DigitalCatalogProject } from '../types';

export const INITIAL_CATALOG_PROJECTS: DigitalCatalogProject[] = [
  {
    id: 'daewoo-smart-living-catalog-2025',
    slug: 'daewoo-smart-living-catalog-2025',
    titleFa: 'کاتالوگ دیجیتال و تعاملی لوازم خانگی هوشمند دوو (نسخه موبایل)',
    titleEn: 'Daewoo Smart Living 2025 Mobile Interactive Catalog',
    client: 'Daewoo',
    clientFa: 'لوازم خانگی دوو',
    brand: 'Daewoo',
    year: 1403,
    category: 'mobile-catalog',
    categoryFa: 'کاتالوگ تعاملی موبایل (Flipbook)',
    descriptionFa: 'کاتالوگ اختصاصی با قطع عمودی استاندارد موبایل (۹:۱۶) بهینه‌شده برای مرور سریع در گوشی‌های هوشمند، ورق‌زدن روان، مشاهده مشخصات فنی محصولات نسل جدید دوو و دکمه‌های اقدام به خرید.',
    cover: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSizeMb: 4.8,
    pageCount: 6,
    aspectRatio: 'mobile-portrait',
    accentColor: '#0066FF',
    isMobileOptimized: true,
    highlights: [
      'طراحی در نسبت ۹:۱۶ جهت تجربه تمام‌صفحه بدون حاشیه در گوشی‌های آیفون و اندروید',
      'امکان ورق‌زدن انیمیشنی صفحات و بررسی مشخصات مدل‌های یخچال، لباسشویی و ظرفشویی',
      'لینک‌دهی مستقیم از هر صفحه به صفحه محصول در وبسایت رسمی دوو',
      'حجم سبک و فشرده‌سازی شده برای بارگذاری فوق‌العاده سریع با اینترنت موبایل'
    ],
    pages: [
      {
        pageNumber: 1,
        title: 'کاور اصلی - نسل جدید خانه هوشمند دوو ۲۰۲۵',
        subtitle: 'معرفی فناوری‌های هوشمند، کنترل با موبایل و سبک زندگی مدرن',
        imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=85',
        summaryBullets: ['طراحی اختصاصی برای اینستاگرام و پیام‌رسان‌ها', 'معرفی زبان طراحی جدید دوو']
      },
      {
        pageNumber: 2,
        title: 'یخچال و فریزرهای هوشمند سری پرایم (Prime Series)',
        subtitle: 'فناوری متال کولینگ، سامانه سرمایش هوشمند و کمپرسور دیجیتال اینورتر',
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=85',
        summaryBullets: ['کاهش ۳۵ درصدی مصرف انرژی', 'سامانه تصفیه هوای نانو سیلور']
      },
      {
        pageNumber: 3,
        title: 'ماشین‌های لباسشویی سری Pro Care',
        subtitle: 'شستشوی ضدعفونی با بخار، فناوری حباب‌ساز و موتور بدون تسمه Direct Drive',
        imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=900&q=85',
        summaryBullets: ['۱۴ برنامه هوشمند اختصاصی', 'گرید انرژی +++A']
      },
      {
        pageNumber: 4,
        title: 'ماشین ظرفشویی‌های ۱۴ نفره Ultra Clean',
        subtitle: 'سه سبد شستشو، بازوی آبپاش ۳۶۰ درجه و سیستم خشک‌کن زئولیت',
        imageUrl: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=900&q=85',
        summaryBullets: ['شستشوی پرقدرت با نصف ظرفیت', 'صدای فوق‌العاده بی‌صدا ۴۲ دسی‌بل']
      },
      {
        pageNumber: 5,
        title: 'اکوسیستم کنترل با اپلیکیشن Daewoo Home',
        subtitle: 'مدیریت یکپارچه تمامی تجهیزات آشپزخانه از هر کجای دنیا با گوشی هوشمند',
        imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=85',
        summaryBullets: ['اتصال مستقیم از طریق وای‌فای', 'گزارش‌گیری لحظه‌ای از مصرف برق و آب']
      },
      {
        pageNumber: 6,
        title: 'خدمات انتخاب سرویس و تماس با ما',
        subtitle: 'ضمانت ۱۲۴ ماهه کمپرسور، نصب رایگان سراسری و پشتیبانی ۲۴ ساعته',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=85',
        summaryBullets: ['مرکز تماس ۱۶۹۹', 'شبکه سراسری نمایندگی‌های رسمی دوو']
      }
    ]
  },
  {
    id: 'snowa-campaign-lookbook-summer',
    slug: 'snowa-campaign-lookbook-summer',
    titleFa: 'لوک‌بوک و راهنمای دیجیتال کمپین تابستانه میلیاردر اسنوا',
    titleEn: 'Snowa Billionaire Summer Campaign Digital Lookbook',
    client: 'Snowa',
    clientFa: 'اسنوا',
    brand: 'Snowa',
    year: 1403,
    category: 'campaign-lookbook',
    categoryFa: 'لوک‌بوک دیجیتال و پروموشن',
    descriptionFa: 'سند دیجیتال ویژه شبکه‌های اجتماعی و فروشندگان جهت معرفی جوایز، مکانیسم قرعه‌کشی، بسته‌های تخفیف ویژه و راهنمای کاربری قرعه‌کشی.',
    cover: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=85',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSizeMb: 3.6,
    pageCount: 5,
    aspectRatio: 'mobile-portrait',
    accentColor: '#10B981',
    isMobileOptimized: true,
    highlights: [
      'صفحه‌آرایی پویا و شاداب با رنگ‌های هویت بصری کمپین تابستانه',
      'توضیح مرحله به مرحله فرآیند ثبت‌نام و دریافت شانس قرعه‌کشی',
      'نمایش لیست جوایز به همراه تصاویر باکیفیت و تایپوگرافی جذاب'
    ],
    pages: [
      {
        pageNumber: 1,
        title: 'کاور کمپین میلیاردر شو با اسنوا',
        subtitle: 'جشنواره خرید تابستانه با جوایز ۱۰۰ میلیون تا ۱ میلیارد تومانی',
        imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=85',
        summaryBullets: ['آغاز جشنواره از اول تیرماه', 'فرصت شرکت برای تمامی خریداران']
      },
      {
        pageNumber: 2,
        title: 'مکانیسم گیمیفیکیشن و کسب امتیاز',
        subtitle: 'با خرید هر محصول، کارت شانس دیجیتال در اپلیکیشن فعال می‌شود',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85',
        summaryBullets: ['اسکن بارکد گارانتی', 'دریافت فوری پیامک تایید']
      },
      {
        pageNumber: 3,
        title: 'بسته‌های برگزیده تلویزیون و صوتی تصویری',
        subtitle: 'تلویزیون‌های هوشمند 4K اسنوا به همراه ساندبار اختصاصی',
        imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=85',
        summaryBullets: ['پنل IPS ضدضربه', 'سیستم عامل اندروید ۱۱']
      },
      {
        pageNumber: 4,
        title: 'ساید بای سایدهای اختصاصی تابستانه اسنوا',
        subtitle: 'جشنواره تخفیف نقدی به همراه بسته‌های هدیه لوازم پخت و پز',
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=85',
        summaryBullets: ['تخفیف تا سقف ۲۰ میلیون تومان', 'تحویل فوری و رایگان درب منزل']
      },
      {
        pageNumber: 5,
        title: 'جدول زمان‌بندی قرعه‌کشی‌های هفتگی و لایو',
        subtitle: 'پخش زنده هر جمعه ساعت ۲۱ در صفحه رسمی اینستاگرام و آپارات اسنوا',
        imageUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=900&q=85',
        summaryBullets: ['شفافیت کامل نتایج', 'اعلام اسامی برندگان در وبسایت']
      }
    ]
  },
  {
    id: 'entekhab-brand-design-handbook-pdf',
    slug: 'entekhab-brand-design-handbook-pdf',
    titleFa: 'سند استانداردهای برند و دیزاین‌سیستم گروه انتخاب (PDF استاندارد)',
    titleEn: 'Entekhab Group Brand Standards & UX Design Playbook',
    client: 'Entekhab Group',
    clientFa: 'گروه صنعتی انتخاب',
    brand: 'Entekhab',
    year: 1402,
    category: 'brand-guideline',
    categoryFa: 'کتابچه استاندارد برند و دیزاین (PDF)',
    descriptionFa: 'سند مرجع ۳۲ صفحه‌ای شامل راهنمای استفاده از لوگو، پالت رنگ، گریدبندی تایپوگرافی فارسی، کامپوننت‌های دیجیتال و قواعد بصری برندهای تابعه.',
    cover: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=85',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSizeMb: 8.2,
    pageCount: 4,
    aspectRatio: 'standard-a4',
    accentColor: '#6366F1',
    isMobileOptimized: false,
    highlights: [
      'تدوین دقیق تایپوگرافی، مقیاس‌های ماژولار و پالت رنگی رسمی هلدینگ',
      'استانداردهای طراحی ست اداری، وب‌سایت‌های شرکتی و بنرهای محیطی',
      'کتابچه جامع برای طراحان، آژانس‌های همکار و تیم‌های فنی'
    ],
    pages: [
      {
        pageNumber: 1,
        title: 'کاور مستندات دیزاین‌سیستم و راهنمای برند انتخاب',
        subtitle: 'Corporate Brand Identity & Digital Design Tokens 2024-2025',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85',
        summaryBullets: ['سند محرمانه و رسمی سازمانی', 'نسخه ۲.۴ به‌روزرسانی پاییز ۱۴۰۲']
      },
      {
        pageNumber: 2,
        title: 'پالت رنگی سازمانی، نسبت‌های کنتراست و دسترسی‌پذیری',
        subtitle: 'کدهای رنگی RGB, CMYK, Pantone و استانداردهای وب WCAG AAA',
        imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=85',
        summaryBullets: ['رنگ‌های Primary, Secondary و Neutral', 'جدول رنگ‌های مجاز در پس‌زمینه تیره']
      },
      {
        pageNumber: 3,
        title: 'گرید سیستم، تایپوگرافی فارسی و فاصله‌گذاری‌ها',
        subtitle: 'فونت سازمانی یکان بخ و مقیاس‌های ماژولار ۱.۲۵ در انواع رزولوشن‌ها',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=85',
        summaryBullets: ['تعیین Line-height استاندارد', 'قواعد استفاده از فونت بولد و رگولار']
      },
      {
        pageNumber: 4,
        title: 'کامپوننت‌های رابط کاربری و پترن‌های تعاملی پورتال',
        subtitle: 'طراحی دکمه‌ها، فیلدهای ورودی، تب‌ها، کارت‌ها و استیت‌های خطا',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85',
        summaryBullets: ['کتابخانه مشترک در فیگما', 'توکن‌های یکسان برای فرانت‌اند']
      }
    ]
  }
];
