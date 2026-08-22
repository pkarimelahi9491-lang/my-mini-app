import { Brand } from '../types';

export const initialBrands: Brand[] = [
  {
    id: 'daewoo',
    name: 'Daewoo',
    nameFa: 'دوو',
    slug: 'daewoo',
    description: 'برند بین‌المللی لوازم خانگی و صوتی‌تصویری با تمرکز بر اینترنت اشیاء و فناوری پیشرفته',
    color: '#0066FF',
    isRecognized: true,
    projectCount: 22
  },
  {
    id: 'snowa',
    name: 'Snowa',
    nameFa: 'اسنوا',
    slug: 'snowa',
    description: 'بزرگترین تولیدکننده لوازم خانگی هوشمند در ایران با کمپین‌های ملی و اپلیکیشن‌های تعاملی',
    color: '#00A3FF',
    isRecognized: true,
    projectCount: 11
  },
  {
    id: 'ardesia',
    name: 'Ardesia',
    nameFa: 'آردزیا',
    slug: 'ardesia',
    description: 'برند لوکس و اصیل ایتالیایی در حوزه تجهیزات پخت‌وپز و لوازم خانگی توکار',
    color: '#D4AF37',
    isRecognized: true,
    projectCount: 7
  },
  {
    id: 'entekhab',
    name: 'Entekhab',
    nameFa: 'انتخاب',
    slug: 'entekhab',
    description: 'گروه صنعتی انتخاب، هلدینگ ساختمانی، انرژی سبز و زیرساخت‌های فناوری',
    color: '#10B981',
    isRecognized: true,
    projectCount: 3
  },
  {
    id: 'smalvic',
    name: 'Smalvic',
    nameFa: 'اسمالویک',
    slug: 'smalvic',
    description: 'برند باسابقه ایتالیایی لوازم خانگی توکار با طراحی مینیمال و سری اختصاصی Zero',
    color: '#E11D48',
    isRecognized: true,
    projectCount: 3
  },
  {
    id: 'tecnogas',
    name: 'Tecnogas',
    nameFa: 'تکنوگاز',
    slug: 'tecnogas',
    description: 'برند پیشرو ایتالیایی در تجهیزات آشپزخانه با پورتال‌های چندزبانه بین‌المللی',
    color: '#F59E0B',
    isRecognized: true,
    projectCount: 3
  },
  {
    id: 'shadow',
    name: 'Shadow',
    nameFa: 'سایه',
    slug: 'shadow',
    description: 'استودیوی تخصصی طراحی محصول دیجیتال، سیستم دیزاین و تحول تجربه کاربری',
    color: '#6366F1',
    isRecognized: true,
    projectCount: 5
  },
  {
    id: 'digisun',
    name: 'Digisun',
    nameFa: 'دیجی‌سان',
    slug: 'digisun',
    description: 'پلتفرم تجارت الکترونیک و سرویس‌های دیجیتال',
    color: '#EC4899',
    isRecognized: true,
    projectCount: 2
  },
  {
    id: 'metrino',
    name: 'Metrino',
    nameFa: 'مترینو',
    slug: 'metrino',
    description: 'سامانه و خدمات املاک و ارزیابی هوشمند متراژ و مستغلات',
    color: '#14B8A6',
    isRecognized: true,
    projectCount: 1
  },
  {
    id: 'soroush-sehat',
    name: 'Soroush Sehat',
    nameFa: 'سروش صحت',
    slug: 'soroush-sehat',
    description: 'پلتفرم فرهنگی، انتشاراتی و پرتال معرفی آثار و کارگاه‌های ادبی',
    color: '#8B5CF6',
    isRecognized: true,
    projectCount: 1
  },
  {
    id: 'barani-silver',
    name: 'Barani Silver',
    nameFa: 'نقره بارانی',
    slug: 'barani-silver',
    description: 'برند لوکس زیورآلات و نقره‌جات دست‌ساز با طراحی مدرن',
    color: '#94A3B8',
    isRecognized: true,
    projectCount: 1
  },
  {
    id: 'macsa',
    name: 'Macsa',
    nameFa: 'مکسا',
    slug: 'macsa',
    description: 'موسسه نیکوکاری و مراقبت‌های تسکینی سرطان',
    color: '#06B6D4',
    isRecognized: true,
    projectCount: 1
  },
  {
    id: 'mk-refrigeration',
    name: 'MK Refrigeration',
    nameFa: 'ام‌کی ریفریجریشن',
    slug: 'mk-refrigeration',
    description: 'تجهیزات تخصصی سرمایشی صنعتی و تجاری',
    color: '#3B82F6',
    isRecognized: true,
    projectCount: 1
  },
  {
    id: 'other',
    name: 'Other',
    nameFa: 'سایر برندها',
    slug: 'other',
    description: 'پروژه‌های سفارشی، مفهومی و مستقل',
    color: '#64748B',
    isRecognized: false,
    projectCount: 0
  }
];

export function detectBrandFromProjectName(projectName: string): { brandName: string; brandFa: string } {
  const lower = projectName.toLowerCase();
  
  if (lower.includes('daewoo') || lower.includes('دوو')) {
    return { brandName: 'Daewoo', brandFa: 'دوو' };
  }
  if (lower.includes('snowa') || lower.includes('اسنوا')) {
    return { brandName: 'Snowa', brandFa: 'اسنوا' };
  }
  if (lower.includes('ardesia') || lower.includes('آردزیا')) {
    return { brandName: 'Ardesia', brandFa: 'آردزیا' };
  }
  if (lower.includes('smalvic') || lower.includes('اسمالویک')) {
    return { brandName: 'Smalvic', brandFa: 'اسمالویک' };
  }
  if (lower.includes('tecnogas') || lower.includes('تکنوگاز')) {
    return { brandName: 'Tecnogas', brandFa: 'تکنوگاز' };
  }
  if (lower.includes('shadow') || lower.includes('شدو') || lower.includes('سایه')) {
    return { brandName: 'Shadow', brandFa: 'سایه' };
  }
  if (lower.includes('entekhab') || lower.includes('انتخاب')) {
    return { brandName: 'Entekhab', brandFa: 'انتخاب' };
  }
  if (lower.includes('digisun') || lower.includes('دیجی‌سان')) {
    return { brandName: 'Digisun', brandFa: 'دیجی‌سان' };
  }
  if (lower.includes('metrino') || lower.includes('مترینو')) {
    return { brandName: 'Metrino', brandFa: 'مترینو' };
  }
  if (lower.includes('soroush') || lower.includes('سروش')) {
    return { brandName: 'Soroush Sehat', brandFa: 'سروش صحت' };
  }
  if (lower.includes('barani') || lower.includes('بارانی')) {
    return { brandName: 'Barani Silver', brandFa: 'نقره بارانی' };
  }
  if (lower.includes('macsa') || lower.includes('مکسا')) {
    return { brandName: 'Macsa', brandFa: 'مکسا' };
  }
  if (lower.includes('mkrefrigeration') || lower.includes('mk')) {
    return { brandName: 'MK Refrigeration', brandFa: 'ام‌کی ریفریجریشن' };
  }

  return { brandName: 'Other', brandFa: 'سایر برندها' };
}
