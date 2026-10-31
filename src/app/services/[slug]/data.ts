import { SubServiceHeroData } from '@/src/components/Service/SubServiceHero';

export interface SectionOneData {
  title: string;
  paragraph: string;
  bgImageUrl: string;
  sideImageUrl: string;
  fourParagraphs: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SectionTwoData {
  title: string;
  bgImageUrl: string;
  faqs: FAQItem[];
}

export interface FullServiceData {
  slug: string;
  hero: SubServiceHeroData;
  sectionOne: SectionOneData;
  sectionTwo: SectionTwoData;
}

export const SERVICES_DATA: Record<string, FullServiceData> = {
  'residential-pools-construction': {
    slug: 'residential-pools-construction',
    hero: {
      title: 'Residential Pool Construction',
      subtitle: 'Tailored pools for relaxing, hosting, and elevated outdoor living.',
      bgImageUrl: '/menu.webp',
      tabs: [
        {
          label: 'From Vision to Reality',
          type: 'paragraph',
          content: 'At Grand Pools, every new pool project begins with your vision. We take the time to understand your needs, style, and the space you’re working with—then bring it to life with a custom design and flawless construction.'
        },
        {
          label: 'Designed Around You',
          type: 'paragraph',
          content: 'We create pools that fit seamlessly into your outdoor area—whether you prefer sleek modern lines, a resort-inspired look, or something completely unique. Our designs take into account functionality, visual appeal, and the flow of your space.'
        },
        {
          label: 'Built with Precision & Quality',
          type: 'paragraph',
          content: 'Our experienced team manages the entire construction process, using top-grade materials and proven methods to ensure long-lasting durability. From excavation and plumbing to concreting and tiling, we oversee every detail with care.'

        },
        {
          label: 'Smooth Process',
          type: 'paragraph',
          content: 'We handle all planning, permits, and compliance so you don’t have to. Throughout the project, you’ll be kept updated at each step, with clear communication and timelines to ensure a smooth, stress-free experience.'
        },
        {
          label: 'Optional Upgrades & Features',
          type: 'paragraph',
            content: 'Enhance your new pool with spa zones, infinity edges, LED lighting, in-floor cleaning systems, water features, or heating options. We’ll guide you through the latest trends and technologies to elevate your pool experience.'

        }
      ]
    },
    sectionOne: {
      title: 'Design Build Details',
      paragraph: 'From the first design concept to the final finishing details, we manage every stage of your pool project with care, quality materials, and a clear process.',
      bgImageUrl: '/toorak-top-view.webp',
      sideImageUrl: '/toorak-view-front.webp',
      fourParagraphs: [
        'Custom Pool Design\nEvery pool is designed around your space, lifestyle, and vision for a truly tailored result.',
        'Expert Craftsmanship\nFrom excavation and plumbing to concreting and tiling, every stage is completed with precision and care.',
        'Modern Features & Upgrades\n Enhance your pool with spas, infinity edges, lighting, heating, water features, and smart technologies.',
        'Seamless Project Delivery\n We manage design, permits, approvals, construction, and handover for a smooth, stress-free experience.'
      ]
    },
    sectionTwo: {
      title: 'Everything You Need to Know',
      bgImageUrl: '/placeholder.webp',
      faqs: [
        { question: 'How long does new pool construction take?', answer: 'Construction timelines vary based on the design and site conditions, but most new pools take between 8 to 16 weeks from the start of excavation to final handover. We’ll provide a clear schedule before we begin and keep you informed throughout the build.' },
        { question: 'What is included in the new pool construction service?', answer: 'Our service includes everything from design consultation, site preparation, and construction, to finishing touches like tiling, fencing, and handover. We also help with permits, engineering approvals, and post-construction care.' },
        { question: 'Can I customise the shape and features of my pool?', answer: 'Absolutely. Every pool we build is custom-designed to suit your space and preferences. You can choose the size, shape, depth, finishes, lighting, and optional features like spas, water features, or heating.' },
        { question: 'Do you handle permits and approvals?', answer: 'Yes, we manage all necessary permits, council approvals, and compliance checks for your new pool. This includes structural engineering and site surveys to ensure everything is built safely and legally.' },
        { question: 'How do I get started with a new pool build?', answer: 'Simply contact us to book a consultation. We’ll discuss your ideas, inspect the site, and walk you through the process step-by-step. From there, we’ll provide a custom design plan and a detailed quote to get your project underway.' }
      ]
    }
  },

  'pool-equipment-and-installation': {
    slug: 'pool-equipment-and-installation',
    hero: {
      title: 'Pool Equipment & Installation',
      subtitle: 'From pumps and filters to heating systems and automation, we supply and install the latest pool equipment to keep your pool running smoothly.',
      bgImageUrl: '/service3.webp',
      tabs: [
        {
          label: 'Why Renovate Your Pool?',
          type: 'paragraph',
          content: 'Over time, pools can develop cracks, outdated finishes, or inefficient systems. A renovation enhances both aesthetics and functionality, making your pool safer, more efficient, and visually stunning.'
        },
        {
          label: 'Our Pool Renovation Services',
          type: 'points',
          content: [
            'Resurfacing & Tiling: Upgrade worn-out finishes with high-quality tiles, pebblecrete, or quartz.‍',
            'Structural Repairs: Fix cracks, leaks, or damaged pool shells to restore durability.‍',
            'Pool Equipment Upgrades: Install modern pumps, filters, and heating systems for efficiency.‍',
            'Modern Design Enhancements: Add water features, LED lighting, or a new shape to refresh your pool’s look.'
          ]},
        {
          label: 'Our Process',
          type: 'points',
          content: [
            'Assessment & Consultation – We inspect your pool and discuss renovation goals.‍',
            'Custom Design Plan – We create a tailored solution that suits your needs and budget.‍',
            'Renovation & Installation – Our skilled team handles all upgrades and improvements.‍',
            'Final Inspection & Handover – We ensure quality and customer satisfaction before completion.'
          ]
        }
      ]
    },
    sectionOne: {
      title: 'Design Build Details',
      paragraph: 'From the first design concept to the final finishing details, we manage every stage of your pool project with care, quality materials, and a clear process.',
      bgImageUrl: '/placeholder.webp',
      sideImageUrl: '/camberwell-side.webp',
      fourParagraphs: [
        'Tailored Equipment Solutions\nWe assess your pool and recommend the right equipment for its size, usage, and performance needs.',
        'Modern & Efficient Systems\nFrom pumps and filters to heating and smart automation, we install technology designed for better efficiency and control.',
        'Professional Installation\nEvery system is carefully installed, tested, and calibrated to ensure reliable, long-term performance.',
        'Ongoing Support\nWe guide you through operation and maintenance, making your pool equipment simple and hassle-free to manage.'
      ]
    },
    sectionTwo: {
  title: 'Everything You Need to Know',
      bgImageUrl: '/placeholder.webp',
      faqs: [
        { question: 'How long does new pool construction take?', answer: 'Construction timelines vary based on the design and site conditions, but most new pools take between 8 to 16 weeks from the start of excavation to final handover. We’ll provide a clear schedule before we begin and keep you informed throughout the build.' },
        { question: 'What is included in the new pool construction service?', answer: 'Our service includes everything from design consultation, site preparation, and construction, to finishing touches like tiling, fencing, and handover. We also help with permits, engineering approvals, and post-construction care.' },
        { question: 'Can I customise the shape and features of my pool?', answer: 'Absolutely. Every pool we build is custom-designed to suit your space and preferences. You can choose the size, shape, depth, finishes, lighting, and optional features like spas, water features, or heating.' },
        { question: 'Do you handle permits and approvals?', answer: 'Yes, we manage all necessary permits, council approvals, and compliance checks for your new pool. This includes structural engineering and site surveys to ensure everything is built safely and legally.' },
        { question: 'How do I get started with a new pool build?', answer: 'Simply contact us to book a consultation. We’ll discuss your ideas, inspect the site, and walk you through the process step-by-step. From there, we’ll provide a custom design plan and a detailed quote to get your project underway.' }
      ]
    }
  },

  'commercial-pool-construction': {
    slug: 'commercial-pool-construction',
    hero: {
      title: 'Commercial Pool Construction',
      subtitle: 'Architectural commercial pool construction across Melbourne & Bayside. High-performance aquatic engineering, structural compliance, and bespoke luxury builds.',
      bgImageUrl: '/service2.webp',
      tabs: [
        {
          label: 'Why Choose Us ',
          type: 'paragraph',
          content: 'Commercial pools require advanced planning, engineering, and compliance with safety standards. Our team specialises in delivering high-quality, fully compliant pools tailored to your business needs.'
        },
        {
          label: 'Our Commercial Pool Services',
          type: 'points',
          content: [
            'Custom Design & Engineering: Tailored solutions to fit your facility and vision.‍',
            'Structural Integrity & Safety Compliance: Pools built to meet industry regulations.‍',
            'Advanced Filtration & Sanitation Systems: Ensuring optimal water quality for high usage.‍',
            'Luxury Features & Smart Technology: Infinity edges, water jets, LED lighting, and automated systems.'
          ]
        },
        {
          label: 'Our Construction Process',
          type: 'points',
          content: [
            'Consultation & Planning – We assess your space and project requirements.‍',
            'Design & Engineering – Customised designs ensuring durability and compliance.‍',
            'Construction & Installation – Built with high-quality materials and expert craftsmanship.‍',
            'Final Testing & Approval – We conduct thorough safety checks before handover.'
          ]
        }
      ]
    },
    sectionOne: {
      title: 'Design Build Details',
      paragraph: 'From the first design concept to the final finishing details, we manage every stage of your pool project with care, quality materials, and a clear process.',
      bgImageUrl: '/placeholder.webp',
      sideImageUrl: '/camberwell3.webp',
      fourParagraphs: [
        'Custom Design & Engineering\nEvery commercial pool is tailored to your facility, operational needs, and architectural vision.',
        'Safety & Compliance\nWe design and build to meet strict Australian Standards, safety requirements, and local regulations.',
        'Built for High Performance \nDurable construction and advanced filtration systems ensure reliable performance even under heavy daily use.',
        'End-to-End Delivery \nFrom planning and approvals to construction, testing, and handover, we manage every stage of the project.'
      ]
    },
    sectionTwo: {
      title: 'Everything You Need to Know',
      bgImageUrl: '/placeholder.webp',
      faqs: [
        { question: 'How long does new pool construction take?', answer: 'Construction timelines vary based on the design and site conditions, but most new pools take between 8 to 16 weeks from the start of excavation to final handover. We’ll provide a clear schedule before we begin and keep you informed throughout the build.' },
        { question: 'What is included in the new pool construction service?', answer: 'Our service includes everything from design consultation, site preparation, and construction, to finishing touches like tiling, fencing, and handover. We also help with permits, engineering approvals, and post-construction care.' },
        { question: 'Can I customise the shape and features of my pool?', answer: 'Absolutely. Every pool we build is custom-designed to suit your space and preferences. You can choose the size, shape, depth, finishes, lighting, and optional features like spas, water features, or heating.' },
        { question: 'Do you handle permits and approvals?', answer: 'Yes, we manage all necessary permits, council approvals, and compliance checks for your new pool. This includes structural engineering and site surveys to ensure everything is built safely and legally.' },
        { question: 'How do I get started with a new pool build?', answer: 'Simply contact us to book a consultation. We’ll discuss your ideas, inspect the site, and walk you through the process step-by-step. From there, we’ll provide a custom design plan and a detailed quote to get your project underway.' }
      ]
    }
  }
};