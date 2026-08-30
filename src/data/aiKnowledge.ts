import { SuggestedPrompt, AIMessage, PageId } from '../types';

export const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  {
    id: 'overview-30s',
    title: '30-Second Overview',
    category: 'Summary',
    promptText: 'Give me a 30-second overview of Tran Ngoc Anh\'s portfolio template.'
  },
  {
    id: 'featured-projects',
    title: 'Featured Projects',
    category: 'Work',
    promptText: 'What projects are featured in this portfolio template?'
  },
  {
    id: 'research-focus',
    title: 'Research & Writing',
    category: 'Research',
    promptText: 'What research methodologies and publications are included?'
  },
  {
    id: 'leadership-evidence',
    title: 'Leadership & Impact',
    category: 'Impact',
    promptText: 'What leadership experiences and initiatives are showcased?'
  },
  {
    id: 'skills-capabilities',
    title: 'Skills & Stack',
    category: 'Skills',
    promptText: 'What tools, technologies, and core competencies are highlighted?'
  },
  {
    id: 'how-to-customize',
    title: 'Customizing this Template',
    category: 'Guide',
    promptText: 'How can I customize this portfolio with my own projects and experiences?'
  }
];

interface KnowledgeEntry {
  triggers: string[];
  response: string;
  cards: {
    type: 'project' | 'research' | 'leadership' | 'achievement' | 'page';
    id?: string;
    pageId?: PageId;
    title: string;
    subtitle: string;
    badge?: string;
  }[];
}

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    triggers: ['overview', '30-second', 'who is', 'summary', 'introduce', 'about', 'background', 'template', 'tran ngoc anh'],
    response: 'Welcome to Tran Ngoc Anh’s personal portfolio template. It is structured to highlight key projects, research publications, leadership case studies, verifiable milestones, and technical capabilities in a clean editorial format.',
    cards: [
      {
        type: 'project',
        id: 'featured-project-01',
        pageId: 'projects',
        title: 'Featured Project 01',
        subtitle: 'Flagship project case study with metrics & workflows',
        badge: 'Flagship'
      },
      {
        type: 'research',
        id: 'research-01',
        pageId: 'research',
        title: 'Green Credit & Bank Financial Performance',
        subtitle: 'Published in Journal of Management Research (2026)',
        badge: 'Published'
      },
      {
        type: 'page',
        pageId: 'about',
        title: 'About Section',
        subtitle: 'Profile overview and core pillars',
        badge: 'Profile'
      }
    ]
  },
  {
    triggers: ['project', 'work', 'code', 'technical', 'build', 'case study', 'strongest', 'top project'],
    response: 'The portfolio includes modular project case studies detailing the problem statement, development lifecycle, quantitative results, and key learnings.',
    cards: [
      {
        type: 'project',
        id: 'featured-project-01',
        pageId: 'projects',
        title: 'Featured Project 01 → View Case Study',
        subtitle: 'Comprehensive overview and performance metrics',
        badge: 'Project'
      },
      {
        type: 'project',
        id: 'featured-project-02',
        pageId: 'projects',
        title: 'Featured Project 02 → View Case Study',
        subtitle: 'Interactive application and workflow suite',
        badge: 'Web App'
      }
    ]
  },
  {
    triggers: ['research', 'paper', 'writing', 'academic', 'publication', 'investigation', 'methodology', 'green credit', 'bank'],
    response: 'The research section showcases empirical investigations into green finance and banking, published in peer-reviewed academic journals.',
    cards: [
      {
        type: 'research',
        id: 'research-01',
        pageId: 'research',
        title: 'Green Credit and Bank Financial Performance (Paper 01)',
        subtitle: 'Exploratory evidence from 8 Vietnamese commercial banks (2022–2024)',
        badge: 'Published'
      }
    ]
  },
  {
    triggers: ['leadership', 'team', 'community', 'volunteer', 'impact', 'initiative', 'story'],
    response: 'The leadership section uses structured STAR case studies (Situation, Task, Action, Result) showcasing project leadership, community initiatives, and collaborative execution.',
    cards: [
      {
        type: 'leadership',
        id: 'leadership-initiative-01',
        pageId: 'leadership',
        title: 'Project Lead Initiative → View Story',
        subtitle: 'Multidisciplinary team coordination and execution',
        badge: 'Leadership'
      },
      {
        type: 'leadership',
        id: 'community-initiative-02',
        pageId: 'leadership',
        title: 'Community Program → View Story',
        subtitle: 'Social responsibility and volunteerism',
        badge: 'Community'
      }
    ]
  },
  {
    triggers: ['skills', 'stack', 'technologies', 'tools', 'resume', 'cv', 'background'],
    response: 'The resume section presents a complete profile overview, educational milestones, analytical and technical skills matrix, and career highlights.',
    cards: [
      {
        type: 'page',
        pageId: 'resume',
        title: 'Full Resume & CV → View Resume',
        subtitle: 'Experience, education, and technical skills matrix',
        badge: 'Resume'
      },
      {
        type: 'page',
        pageId: 'achievements',
        title: 'Achievements & Milestones → View Timeline',
        subtitle: 'Chronological track record of awards and recognitions',
        badge: 'Timeline'
      }
    ]
  },
  {
    triggers: ['customize', 'edit', 'template', 'change', 'how to', 'modify'],
    response: 'You can easily customize this template by editing the data files (in src/data/portfolioData.ts) to insert your real project names, descriptions, images, publications, and credentials.',
    cards: [
      {
        type: 'page',
        pageId: 'about',
        title: 'Explore About Section',
        subtitle: 'Edit your intro, bio, and philosophy',
        badge: 'Template'
      },
      {
        type: 'page',
        pageId: 'projects',
        title: 'Explore Projects Section',
        subtitle: 'Add your own project case studies',
        badge: 'Template'
      }
    ]
  }
];

export function getAIResponse(query: string): { response: string; cards: KnowledgeEntry['cards'] } {
  const normalized = query.toLowerCase().trim();

  // Search in Knowledge Base
  for (const entry of KNOWLEDGE_BASE) {
    for (const trigger of entry.triggers) {
      if (normalized.includes(trigger)) {
        return {
          response: entry.response,
          cards: entry.cards
        };
      }
    }
  }

  // Fallback intelligent navigator response
  return {
    response: `Welcome to Tran Ngoc Anh’s personal portfolio template. You can explore featured projects, research papers, leadership case studies, and achievements using the navigation sidebar or ask specific questions here.`,
    cards: [
      {
        type: 'project',
        id: 'featured-project-01',
        pageId: 'projects',
        title: 'Featured Project 01',
        subtitle: 'Flagship project showcase',
        badge: 'Project'
      },
      {
        type: 'page',
        pageId: 'about',
        title: 'About Section',
        subtitle: 'Explore profile overview and core pillars',
        badge: 'Profile'
      },
      {
        type: 'page',
        pageId: 'resume',
        title: 'Resume & Credentials',
        subtitle: 'View skills, experience, and milestones',
        badge: 'Resume'
      }
    ]
  };
}
