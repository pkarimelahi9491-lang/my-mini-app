// Curated high-resolution UI/UX design mockups & screenshot images
// Maps project IDs directly to real uploaded assets or high-fidelity design prototypes

export interface ProjectImageMeta {
  cover: string;
  hero: string;
  mobile: string;
  tablet?: string;
  gallery: string[];
}

export const defaultProjectImages: Record<string, ProjectImageMeta> = {
  // 1. DAEWOO DISHWASHER (DW) LANDING
  'daewoo-dw-landing': {
    cover: '/uploads/projects/Daewoo DW Landing/Daewoo DW Landing - Desktop.png',
    hero: '/uploads/projects/Daewoo DW Landing/Daewoo DW Landing - Desktop.png',
    tablet: '/uploads/projects/Daewoo DW Landing/Daewoo DW Landing - Tablet.png',
    mobile: '/uploads/projects/Daewoo DW Landing/Daewoo DW Landing - Mobile.png',
    gallery: [
      '/uploads/projects/Daewoo DW Landing/Daewoo DW Landing - Desktop.png',
      '/uploads/projects/Daewoo DW Landing/Daewoo DW Landing - Tablet.png',
      '/uploads/projects/Daewoo DW Landing/Daewoo DW Landing - Mobile.png'
    ]
  },

  // 2. DAEWOO GENERAL LANDING
  'daewoo-general-landing': {
    cover: '/uploads/projects/Daewoo General Landing/Daewoo General Landing - Desktop.png',
    hero: '/uploads/projects/Daewoo General Landing/Daewoo General Landing - Desktop.png',
    tablet: '/uploads/projects/Daewoo General Landing/Daewoo General Landing - Tablet.png',
    mobile: '/uploads/projects/Daewoo General Landing/Daewoo General Landing - Mobile.png',
    gallery: [
      '/uploads/projects/Daewoo General Landing/Daewoo General Landing - Desktop.png',
      '/uploads/projects/Daewoo General Landing/Daewoo General Landing - Tablet.png',
      '/uploads/projects/Daewoo General Landing/Daewoo General Landing - Mobile.png'
    ]
  },

  // 3. DAEWOO HANA DW LANDING (IOT)
  'daewoo-hana-landing': {
    cover: '/uploads/projects/Daewoo HANA DW Landing/Daewoo HANA DW Landing - Desktop.png',
    hero: '/uploads/projects/Daewoo HANA DW Landing/Daewoo HANA DW Landing - Desktop.png',
    tablet: '/uploads/projects/Daewoo HANA DW Landing/Daewoo HANA DW Landing - Tablet.png',
    mobile: '/uploads/projects/Daewoo HANA DW Landing/Daewoo HANA DW Landing - Mobile.png',
    gallery: [
      '/uploads/projects/Daewoo HANA DW Landing/Daewoo HANA DW Landing - Desktop.png',
      '/uploads/projects/Daewoo HANA DW Landing/Daewoo HANA DW Landing - Tablet.png',
      '/uploads/projects/Daewoo HANA DW Landing/Daewoo HANA DW Landing - Mobile.png'
    ]
  },

  // 4. DAEWOO REFRIGERATOR (RF) LANDING
  'daewoo-rf-landing': {
    cover: '/uploads/projects/Daewoo RF Landing/Daewoo RF Landing - Desktop.png',
    hero: '/uploads/projects/Daewoo RF Landing/Daewoo RF Landing - Desktop.png',
    tablet: '/uploads/projects/Daewoo RF Landing/Daewoo RF Landing - Tablet.png',
    mobile: '/uploads/projects/Daewoo RF Landing/Daewoo RF Landing - Mobile.png',
    gallery: [
      '/uploads/projects/Daewoo RF Landing/Daewoo RF Landing - Desktop.png',
      '/uploads/projects/Daewoo RF Landing/Daewoo RF Landing - Tablet.png',
      '/uploads/projects/Daewoo RF Landing/Daewoo RF Landing - Mobile.png'
    ]
  },
  'daewoo-rf-iot-landing': {
    cover: '/uploads/projects/Daewoo RF Landing/Daewoo RF Landing - Desktop.png',
    hero: '/uploads/projects/Daewoo RF Landing/Daewoo RF Landing - Desktop.png',
    tablet: '/uploads/projects/Daewoo RF Landing/Daewoo RF Landing - Tablet.png',
    mobile: '/uploads/projects/Daewoo RF Landing/Daewoo RF Landing - Mobile.png',
    gallery: [
      '/uploads/projects/Daewoo RF Landing/Daewoo RF Landing - Desktop.png',
      '/uploads/projects/Daewoo RF Landing/Daewoo RF Landing - Tablet.png',
      '/uploads/projects/Daewoo RF Landing/Daewoo RF Landing - Mobile.png'
    ]
  },

  // 5. DAEWOO SHIM PLUS WASHING MACHINE LANDING
  'daewoo-shimpluse-landing': {
    cover: '/uploads/projects/Daewoo Shim Plus Washing Machine Landing/Daewoo Shim Plus Washing Machine Landing - Desktop.png',
    hero: '/uploads/projects/Daewoo Shim Plus Washing Machine Landing/Daewoo Shim Plus Washing Machine Landing - Desktop.png',
    tablet: '/uploads/projects/Daewoo Shim Plus Washing Machine Landing/Daewoo Shim Plus Washing Machine Landing - Tablet.png',
    mobile: '/uploads/projects/Daewoo Shim Plus Washing Machine Landing/Daewoo Shim Plus Washing Machine Landing - Mobile.png',
    gallery: [
      '/uploads/projects/Daewoo Shim Plus Washing Machine Landing/Daewoo Shim Plus Washing Machine Landing - Desktop.png',
      '/uploads/projects/Daewoo Shim Plus Washing Machine Landing/Daewoo Shim Plus Washing Machine Landing - Tablet.png',
      '/uploads/projects/Daewoo Shim Plus Washing Machine Landing/Daewoo Shim Plus Washing Machine Landing - Mobile.png'
    ]
  },

  // 6. DAEWOO WASHING MACHINE (WM) LANDING
  'daewoo-wm-landing': {
    cover: '/uploads/projects/Daewoo WM Landing/Daewoo WM Landing - Desktop.png',
    hero: '/uploads/projects/Daewoo WM Landing/Daewoo WM Landing - Desktop.png',
    tablet: '/uploads/projects/Daewoo WM Landing/Daewoo WM Landing - Tablet.png',
    mobile: '/uploads/projects/Daewoo WM Landing/Daewoo WM Landing - Mobile.png',
    gallery: [
      '/uploads/projects/Daewoo WM Landing/Daewoo WM Landing - Desktop.png',
      '/uploads/projects/Daewoo WM Landing/Daewoo WM Landing - Tablet.png',
      '/uploads/projects/Daewoo WM Landing/Daewoo WM Landing - Mobile.png'
    ]
  },

  // 7. DAEWOO YEOSU SMART TV LANDING
  'daewoo-yeosu-tv': {
    cover: '/uploads/projects/Daewoo Yeosu TV/Daewoo Yeosu TV - Desktop.png',
    hero: '/uploads/projects/Daewoo Yeosu TV/Daewoo Yeosu TV - Desktop.png',
    tablet: '/uploads/projects/Daewoo Yeosu TV/Daewoo Yeosu TV - Tablet.png',
    mobile: '/uploads/projects/Daewoo Yeosu TV/Daewoo Yeosu TV - Mobile.png',
    gallery: [
      '/uploads/projects/Daewoo Yeosu TV/Daewoo Yeosu TV - Desktop.png',
      '/uploads/projects/Daewoo Yeosu TV/Daewoo Yeosu TV - Tablet.png',
      '/uploads/projects/Daewoo Yeosu TV/Daewoo Yeosu TV - Mobile.png'
    ]
  },

  // 8. SNOWA BILLIONAIRE SUMMER (LANDING)
  'snowa-summer-1405-landing': {
    cover: '/uploads/projects/Snowa Billionaire Summer/Snowa Billionaire Summer - Desktop.png',
    hero: '/uploads/projects/Snowa Billionaire Summer/Snowa Billionaire Summer - Desktop.png',
    tablet: '/uploads/projects/Snowa Billionaire Summer/Snowa Billionaire Summer - Tablet.png',
    mobile: '/uploads/projects/Snowa Billionaire Summer/Snowa Billionaire Summer - Mobile.png',
    gallery: [
      '/uploads/projects/Snowa Billionaire Summer/Snowa Billionaire Summer - Desktop.png',
      '/uploads/projects/Snowa Billionaire Summer/Snowa Billionaire Summer - Tablet.png',
      '/uploads/projects/Snowa Billionaire Summer/Snowa Billionaire Summer - Mobile.png'
    ]
  },

  // 9. SNOWA BILLIONAIRE SUMMER 1405 - FESTIVAL TV (FULL PROCESS PLATFORM)
  'snowa-summer-1405-app': {
    cover: '/uploads/projects/Billionaire Summer 1405 - Festival TV/Billionaire Summer 1405 - Festival TV - Step 0.png',
    hero: '/uploads/projects/Billionaire Summer 1405 - Festival TV/Billionaire Summer 1405 - Festival TV - Step 0.png',
    tablet: '/uploads/projects/Billionaire Summer 1405 - Festival TV/Billionaire Summer 1405 - Festival TV - Step 1.1.png',
    mobile: '/uploads/projects/Billionaire Summer 1405 - Festival TV/Billionaire Summer 1405 - Festival TV - Step 1.3.1.png',
    gallery: [
      '/uploads/projects/Billionaire Summer 1405 - Festival TV/Billionaire Summer 1405 - Festival TV - Step 0.png',
      '/uploads/projects/Billionaire Summer 1405 - Festival TV/Billionaire Summer 1405 - Festival TV - Step 1.1.png',
      '/uploads/projects/Billionaire Summer 1405 - Festival TV/Billionaire Summer 1405 - Festival TV - Step 1.2.png',
      '/uploads/projects/Billionaire Summer 1405 - Festival TV/Billionaire Summer 1405 - Festival TV - Step 1.2 - Error.png',
      '/uploads/projects/Billionaire Summer 1405 - Festival TV/Billionaire Summer 1405 - Festival TV - Step 1.3.1.png',
      '/uploads/projects/Billionaire Summer 1405 - Festival TV/Billionaire Summer 1405 - Festival TV - Step 1.3.2.png',
      '/uploads/projects/Billionaire Summer 1405 - Festival TV/Billionaire Summer 1405 - Festival TV - Step 1.3.3.png',
      '/uploads/projects/Billionaire Summer 1405 - Festival TV/Billionaire Summer 1405 - Festival TV - Step 1.3.4.png',
      '/uploads/projects/Billionaire Summer 1405 - Festival TV/Billionaire Summer 1405 - Festival TV - Step 1.3.5.png',
      '/uploads/projects/Billionaire Summer 1405 - Festival TV/Billionaire Summer 1405 - Festival TV - Step 1.4.png'
    ]
  },

  // 10. SNOWA WORLD CUP LANDING
  'snowa-sharayet-jamjahani': {
    cover: '/uploads/projects/Snowa World Cup Landing/Snowa World Cup Landing - Desktop.png',
    hero: '/uploads/projects/Snowa World Cup Landing/Snowa World Cup Landing - Desktop.png',
    tablet: '/uploads/projects/Snowa World Cup Landing/Snowa World Cup Landing - Tablet.png',
    mobile: '/uploads/projects/Snowa World Cup Landing/Snowa World Cup Landing - Mobile.png',
    gallery: [
      '/uploads/projects/Snowa World Cup Landing/Snowa World Cup Landing - Desktop.png',
      '/uploads/projects/Snowa World Cup Landing/Snowa World Cup Landing - Tablet.png',
      '/uploads/projects/Snowa World Cup Landing/Snowa World Cup Landing - Mobile.png'
    ]
  },

  // ADDITIONAL REFERENCE PLATFORMS
  'daewoo-website': {
    cover: '/uploads/projects/Daewoo General Landing/Daewoo General Landing - Desktop.png',
    hero: '/uploads/projects/Daewoo General Landing/Daewoo General Landing - Desktop.png',
    tablet: '/uploads/projects/Daewoo General Landing/Daewoo General Landing - Tablet.png',
    mobile: '/uploads/projects/Daewoo General Landing/Daewoo General Landing - Mobile.png',
    gallery: [
      '/uploads/projects/Daewoo General Landing/Daewoo General Landing - Desktop.png',
      '/uploads/projects/Daewoo General Landing/Daewoo General Landing - Tablet.png',
      '/uploads/projects/Daewoo General Landing/Daewoo General Landing - Mobile.png'
    ]
  },
  'snowa-website': {
    cover: '/uploads/projects/Snowa Billionaire Summer/Snowa Billionaire Summer - Desktop.png',
    hero: '/uploads/projects/Snowa Billionaire Summer/Snowa Billionaire Summer - Desktop.png',
    tablet: '/uploads/projects/Snowa Billionaire Summer/Snowa Billionaire Summer - Tablet.png',
    mobile: '/uploads/projects/Snowa Billionaire Summer/Snowa Billionaire Summer - Mobile.png',
    gallery: [
      '/uploads/projects/Snowa Billionaire Summer/Snowa Billionaire Summer - Desktop.png',
      '/uploads/projects/Snowa Billionaire Summer/Snowa Billionaire Summer - Tablet.png',
      '/uploads/projects/Snowa Billionaire Summer/Snowa Billionaire Summer - Mobile.png'
    ]
  }
};

// General fallback category placeholder images
const categoryPlaceholders: Record<string, string> = {
  'Website': '/uploads/projects/Daewoo General Landing/Daewoo General Landing - Desktop.png',
  'Landing Page': '/uploads/projects/Daewoo DW Landing/Daewoo DW Landing - Desktop.png',
  'Mobile / App': '/uploads/projects/Billionaire Summer 1405 - Festival TV/Billionaire Summer 1405 - Festival TV - Step 0.png',
  'Product Design': '/uploads/projects/Daewoo RF Landing/Daewoo RF Landing - Desktop.png',
  'E-commerce': '/uploads/projects/Daewoo HANA DW Landing/Daewoo HANA DW Landing - Desktop.png',
  'Campaign': '/uploads/projects/Snowa Billionaire Summer/Snowa Billionaire Summer - Desktop.png',
  'UI/UX': '/uploads/projects/Daewoo Shim Plus Washing Machine Landing/Daewoo Shim Plus Washing Machine Landing - Desktop.png',
  'Internal Tool': '/uploads/projects/Daewoo Yeosu TV/Daewoo Yeosu TV - Desktop.png',
  'default': '/uploads/projects/Daewoo General Landing/Daewoo General Landing - Desktop.png'
};

export function getProjectImage(projectId: string, type: string = 'Website', kind: 'cover' | 'hero' | 'mobile' | 'tablet' | 'gallery' = 'cover'): string {
  if (defaultProjectImages[projectId]) {
    if (kind === 'gallery') {
      return defaultProjectImages[projectId].gallery[0] || defaultProjectImages[projectId].cover;
    }
    if (kind === 'tablet') {
      return defaultProjectImages[projectId].tablet || defaultProjectImages[projectId].hero || defaultProjectImages[projectId].cover;
    }
    return defaultProjectImages[projectId][kind] || defaultProjectImages[projectId].cover;
  }
  return categoryPlaceholders[type] || categoryPlaceholders['default'];
}
