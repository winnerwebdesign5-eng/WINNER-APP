export interface FeaturedWebsiteItem {
  id: string;
  number: string;
  title: string;
  category: string;
  domain: string;
  url: string;
  description: string;
  highlights: string[];
  attribution: string;
  /**
   * Verified HTTP header check: domains returning X-Frame-Options: SAMEORIGIN
   * or CSP frame-ancestors restrictions cannot be framed cross-origin.
   */
  blocksIframeEmbedding: boolean;
  frameRestrictionReason: string;
  accentFrom: string;
  accentTo: string;
}

export interface PortfolioExpertiseLink {
  id: string;
  title: string;
  description: string;
  serviceAnchor: string;
  image: string;
  imageAlt: string;
  accentFrom: string;
  accentTo: string;
}

export const FEATURED_WEBSITES: FeaturedWebsiteItem[] = [
  {
    id: 'esthetics-express',
    number: '01',
    title: 'Esthetics Express',
    category: 'Beauty & Wellness',
    domain: 'estheticsexpress.com',
    url: 'https://estheticsexpress.com/',
    description:
      'A beauty and wellness website showcasing professional waxing, lash and brow services through an elegant service-focused digital experience.',
    highlights: [
      'Service Menu Architecture',
      'Booking & Appointment Flow',
      'Warm Editorial Brand Tone',
    ],
    attribution: 'Featured Website Showcase · Original Domain',
    blocksIframeEmbedding: true,
    frameRestrictionReason:
      'estheticsexpress.com sends X-Frame-Options: SAMEORIGIN to protect its booking and service environment.',
    accentFrom: '#FF2E93',
    accentTo: '#FF9A1F',
  },
  {
    id: 'jasmine-womack',
    number: '02',
    title: 'Jasmine Womack',
    category: 'Personal Brand & Coaching',
    domain: 'www.jasminewomack.com',
    url: 'https://www.jasminewomack.com/',
    description:
      'A personal brand and thought leadership website presenting coaching, publishing, education and professional development experiences through a content-rich digital platform.',
    highlights: [
      'Thought Leadership Positioning',
      'Publishing & Program Pathways',
      'Audience Conversion Architecture',
    ],
    attribution: 'Featured Website Showcase · Original Domain',
    blocksIframeEmbedding: true,
    frameRestrictionReason:
      'jasminewomack.com enforces cross-origin frame protection (X-Frame-Options: SAMEORIGIN).',
    accentFrom: '#8B3DFF',
    accentTo: '#2F6BFF',
  },
];

export const PORTFOLIO_EXPERTISE: PortfolioExpertiseLink[] = [
  {
    id: 'website-design',
    title: 'Website Design & Development',
    description:
      'Custom responsive websites engineered for brand authority and measurable conversion.',
    serviceAnchor: 'service-01',
    image: '/src/assets/images/service_web_design_1795002292093.jpg',
    imageAlt: 'Desktop and mobile business website interface mockup',
    accentFrom: '#FF2E93',
    accentTo: '#FF9A1F',
  },
  {
    id: 'ai-automation',
    title: 'AI Automation',
    description:
      'Connected business workflows, lead capture pipelines, and intelligent customer support.',
    serviceAnchor: 'service-02',
    image: '/src/assets/images/service_ai_automation_1795002292809.jpg',
    imageAlt: 'Workflow automation node interface on dark display',
    accentFrom: '#8B3DFF',
    accentTo: '#2F6BFF',
  },
  {
    id: 'ecommerce-development',
    title: 'E-commerce Development',
    description:
      'Modern online storefronts built around effortless product discovery and checkout.',
    serviceAnchor: 'service-03',
    image: '/src/assets/images/service_ecommerce_1795002293391.jpg',
    imageAlt: 'Luxury dark-mode e-commerce storefront mockup',
    accentFrom: '#FF4B4B',
    accentTo: '#FFC933',
  },
  {
    id: 'brand-graphic-design',
    title: 'Brand & Graphic Design',
    description:
      'Distinctive visual identities, typography systems, and cohesive campaign assets.',
    serviceAnchor: 'service-04',
    image: '/src/assets/images/service_brand_design_1795002293695.jpg',
    imageAlt: 'Brand identity stationery and color swatch presentation',
    accentFrom: '#FF2E93',
    accentTo: '#8B3DFF',
  },
  {
    id: 'digital-growth',
    title: 'Digital Growth Solutions',
    description:
      'Email campaigns, lead nurturing, and audience engagement systems built to convert.',
    serviceAnchor: 'service-05',
    image: '/src/assets/images/service_digital_growth_1795002293981.jpg',
    imageAlt: 'Email campaign and audience growth dashboard preview',
    accentFrom: '#18C8F0',
    accentTo: '#14E3A8',
  },
];
