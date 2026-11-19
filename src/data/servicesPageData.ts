export interface DetailedServiceItem {
  id: string;
  anchorId: string;
  number: string;
  categoryName: string;
  overviewIntro: string;
  overviewHighlights: string[];
  headline: string;
  description: string;
  capabilities: string[];
  ctaLabel: string;
  enquiryServiceTitle: string;
  image: string;
  imageAlt: string;
  accentFrom: string;
  accentTo: string;
  featuredWide?: boolean;
}

export interface WhyChooseItem {
  number: string;
  title: string;
  description: string;
  accentFrom: string;
  accentTo: string;
}

export interface WorkingProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const SERVICES_HERO_MEDIA = {
  image: '/src/assets/images/service_hero_composition_1795002291510.jpg',
  alt: 'Layered modern dark-mode website interface previews suspended with subtle warm coral, amber, and electric violet illumination',
};

export const DETAILED_SERVICES: DetailedServiceItem[] = [
  {
    id: 'website-design',
    anchorId: 'service-01',
    number: '01',
    categoryName: 'Website Design & Development',
    overviewIntro:
      'Strategic, responsive websites crafted to communicate credibility and turn visitors into enquiries.',
    overviewHighlights: [
      'Business website design',
      'WordPress website development',
      'Conversion-focused landing pages',
      'Responsive architecture',
    ],
    headline: 'Websites That Make Your Business Impossible to Ignore.',
    description:
      'We design and develop beautiful, responsive and strategically structured websites that help businesses establish credibility, showcase their services and turn visitors into potential customers.',
    capabilities: [
      'Business website design',
      'WordPress website development',
      'Landing page design',
      'E-commerce website development',
      'Website redesign',
      'Responsive website development',
      'Booking and appointment websites',
      'Conversion-focused website layouts',
    ],
    ctaLabel: 'Explore Website Solutions',
    enquiryServiceTitle: 'Website Design & Development',
    image: '/src/assets/images/service_web_design_1795002292093.jpg',
    imageAlt:
      'Desktop monitor and smartphone side by side displaying a dark-mode corporate website interface on charcoal slate',
    accentFrom: '#FF2E93',
    accentTo: '#FF9A1F',
    featuredWide: true,
  },
  {
    id: 'ai-automation',
    anchorId: 'service-02',
    number: '02',
    categoryName: 'AI Automation & Workflow Solutions',
    overviewIntro:
      'Connected systems and intelligent workflows that reduce manual work and accelerate client response.',
    overviewHighlights: [
      'AI-powered customer support',
      'Workflow & CRM integration',
      'Automated appointment booking',
      'Lead capture pipelines',
    ],
    headline: 'Smarter Systems. Less Manual Work.',
    description:
      'We help businesses simplify repetitive tasks and improve operations through intelligent automation, connected workflows and AI-powered digital experiences.',
    capabilities: [
      'AI-powered customer support',
      'Workflow automation',
      'Lead capture and management',
      'Automated appointment booking',
      'WhatsApp automation',
      'Email automation',
      'CRM workflow integration',
      'Business process optimization',
    ],
    ctaLabel: 'Explore Automation Solutions',
    enquiryServiceTitle: 'AI Automation & Workflows',
    image: '/src/assets/images/service_ai_automation_1795002292809.jpg',
    imageAlt:
      'Clean workflow automation interface showing connected application nodes, booking pipeline, and electric blue connector paths',
    accentFrom: '#8B3DFF',
    accentTo: '#2F6BFF',
  },
  {
    id: 'ecommerce-development',
    anchorId: 'service-03',
    number: '03',
    categoryName: 'E-Commerce Development',
    overviewIntro:
      'Modern online storefronts built for effortless browsing, clear merchandising, and smooth checkout.',
    overviewHighlights: [
      'Shopify & WooCommerce stores',
      'Product & catalogue layouts',
      'Cart & payment configuration',
      'Mobile shopping optimization',
    ],
    headline: 'Turn Your Products Into an Online Shopping Experience.',
    description:
      'We build attractive, functional online stores designed to make shopping easier, showcase products beautifully and support your business growth.',
    capabilities: [
      'Shopify store development',
      'WooCommerce development',
      'Online store design',
      'Product page design',
      'Shopping cart configuration',
      'Payment integration',
      'Product catalogue setup',
      'Responsive shopping experiences',
    ],
    ctaLabel: 'Explore E-Commerce Solutions',
    enquiryServiceTitle: 'E-commerce Development',
    image: '/src/assets/images/service_ecommerce_1795002293391.jpg',
    imageAlt:
      'Modern luxury online storefront displayed on desktop and mobile devices showing product cards and shopping cart panel',
    accentFrom: '#FF4B4B',
    accentTo: '#FFC933',
  },
  {
    id: 'brand-graphic-design',
    anchorId: 'service-04',
    number: '04',
    categoryName: 'Brand & Graphic Design',
    overviewIntro:
      'Distinctive visual identities, typography, and campaign graphics that keep every touchpoint memorable.',
    overviewHighlights: [
      'Brand identity & logo design',
      'Social media & ad creatives',
      'Marketing & print collateral',
      'Visual consistency systems',
    ],
    headline: 'Make Your Brand Visually Unforgettable.',
    description:
      'Your brand deserves a visual identity that communicates its personality and makes a lasting impression. We create thoughtful graphic assets that help businesses present themselves professionally.',
    capabilities: [
      'Brand identity design',
      'Logo design',
      'Marketing graphics',
      'Social media designs',
      'Promotional flyers',
      'Business graphics',
      'Digital advertising creatives',
      'Visual brand consistency',
    ],
    ctaLabel: 'Explore Creative Design',
    enquiryServiceTitle: 'Brand & Graphic Design',
    image: '/src/assets/images/service_brand_design_1795002293695.jpg',
    imageAlt:
      'Editorial brand identity presentation featuring geometric mark guidelines, color swatches, embossed dark stationery, and social layouts',
    accentFrom: '#FF2E93',
    accentTo: '#8B3DFF',
  },
  {
    id: 'digital-growth',
    anchorId: 'service-05',
    number: '05',
    categoryName: 'Digital Growth & Marketing Solutions',
    overviewIntro:
      'Email campaigns, lead nurturing, and conversion-focused experiences engineered to sustain momentum.',
    overviewHighlights: [
      'Email marketing & campaigns',
      'Lead generation & nurturing',
      'Marketing automation',
      'Conversion landing pages',
    ],
    headline: 'Turn Digital Attention Into Meaningful Opportunities.',
    description:
      'We help businesses communicate with their audiences, nurture potential customers and create better digital engagement through thoughtful marketing solutions.',
    capabilities: [
      'Email marketing',
      'Lead generation',
      'Email campaign design',
      'Marketing automation',
      'Customer engagement workflows',
      'Lead nurturing',
      'Conversion-focused landing pages',
      'Digital marketing support',
    ],
    ctaLabel: 'Explore Growth Solutions',
    enquiryServiceTitle: 'Email Marketing & Lead Generation',
    image: '/src/assets/images/service_digital_growth_1795002293981.jpg',
    imageAlt:
      'Dark-mode email newsletter campaign layout and audience growth dashboard displayed on laptop and tablet',
    accentFrom: '#18C8F0',
    accentTo: '#14E3A8',
  },
];

export const WHY_CHOOSE_SERVICES: WhyChooseItem[] = [
  {
    number: '01',
    title: 'Strategic Thinking',
    description:
      'We focus on understanding your business goals before creating a digital solution.',
    accentFrom: '#FF2E93',
    accentTo: '#FF9A1F',
  },
  {
    number: '02',
    title: 'Thoughtful Design',
    description:
      'We combine aesthetics, usability and functionality to create meaningful digital experiences.',
    accentFrom: '#FF4B4B',
    accentTo: '#FFC933',
  },
  {
    number: '03',
    title: 'Modern Technology',
    description:
      'We use modern digital tools and technologies to develop practical, effective solutions.',
    accentFrom: '#8B3DFF',
    accentTo: '#2F6BFF',
  },
  {
    number: '04',
    title: 'Client-Focused Execution',
    description:
      'We prioritize communication, attention to detail and solutions that align with your needs.',
    accentFrom: '#18C8F0',
    accentTo: '#14E3A8',
  },
];

export const WORKING_PROCESS_STEPS: WorkingProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We understand your business, goals, target audience and requirements.',
  },
  {
    number: '02',
    title: 'Planning',
    description:
      'We define the right strategy, structure and direction for your project.',
  },
  {
    number: '03',
    title: 'Development',
    description:
      'We bring the concept to life through thoughtful design and development.',
  },
  {
    number: '04',
    title: 'Review & Delivery',
    description:
      'We test, refine and prepare the final solution for delivery.',
  },
];

export const SERVICES_FAQ: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What types of businesses do you work with?',
    answer:
      'We work with businesses, entrepreneurs, service providers and brands looking to improve their digital presence and operations.',
  },
  {
    id: 'faq-2',
    question: 'Do you create custom websites?',
    answer:
      "Yes. We develop websites around each client's brand identity, business goals, content and functional requirements.",
  },
  {
    id: 'faq-3',
    question: 'Can you integrate automation into an existing business website?',
    answer:
      'Yes. Depending on the existing platform and requirements, we can integrate suitable automation and connected workflows.',
  },
  {
    id: 'faq-4',
    question: 'Do you offer website redesign services?',
    answer:
      "Yes. We can help improve an existing website's visual presentation, usability, structure and functionality.",
  },
  {
    id: 'faq-5',
    question: 'How can I get started?',
    answer:
      "Simply contact Winner Designs with your project requirements. We'll discuss your goals and identify the right solution.",
  },
];
