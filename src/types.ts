export interface ProjectMetric {
  label: string;
  value: string;
}

export interface CaseStudyData {
  overview: string;
  problem: string;
  solution: string;
  results: string[];
}

export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  role: string;
  tools: string[];
  year: string;
  tag: string;
  metrics: ProjectMetric[];
  caseStudy: CaseStudyData;
}

export interface ResearchSnapshotItem {
  value: string;
  label: string;
}

export interface ResearchMaterial {
  title: string;
  subtitle?: string;
  type: 'report' | 'poster' | 'presentation' | 'pdf' | 'link';
  url?: string;
  actionLabel?: string;
}

export interface ResearchItem {
  id: string;
  number: string;
  year: string;
  badge?: string;
  researchType?: 'published_paper' | 'research_project';
  title: string;
  mainTitle?: string;
  subtitle?: string;
  tags: string[];
  shortDescription: string;
  snapshot: ResearchSnapshotItem[];
  inlineMetrics?: string[];
  equation?: string;
  equationNote?: string;
  publishedIn: string;
  authorRole?: string;
  methodology?: string;
  sampleScope?: string;
  keyFindings?: string[];
  awardId?: string;
  awardDescription?: string;
  doi?: string;
  doiUrl?: string;
  paperUrl?: string;
  pdfUrl?: string;
  previewImage?: string;
  overview: string;
  researchProblem?: string;
  researchQuestions?: string[];
  detailSnapshot: string[];
  dataSample?: string[];
  methodologyFlow: string[];
  keyFindingHeadline: string;
  keyFindingDetail: string;
  proposedAiModel?: {
    headline: string;
    description: string;
    highlights?: string[];
  };
  myContribution?: string[];
  researchMaterials?: ResearchMaterial[];
  crossReference?: {
    label: string;
    targetPage: PageId;
    targetId?: string;
  };
  publicationDetails?: {
    journal: string;
    issue: string;
    year: string;
  };
}

export interface LeadershipStory {
  id: string;
  roleTitle: string;
  organization: string;
  period: string;
  metrics: string[];
  highlight: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  tag?: string;
  aspect?: 'landscape' | 'portrait' | 'wide' | 'square';
  description?: string;
}

export interface AchievementItem {
  id?: string;
  year: string;
  award: string;
  competition: string;
  level: 'national_international' | 'city';
  categoryLabel: string;
  imageUrl?: string;
  imageAspect?: 'portrait' | 'landscape';
  pdfUrl?: string;
  aboutCompetition?: string;
  levelScope?: string;
  result?: string;
  projectTopic?: string;
  teamMembers?: string[];
  organizationDetails?: string;
  datesLocation?: string;
  additionalNotes?: string;
  websiteUrl?: string;
  galleryTitle?: string;
  gallery?: GalleryPhoto[];
}

export interface ActivityItem {
  id: string;
  title: string;
  role: string;
  organization: string;
  period: string;
  location?: string;
  tags?: string[];
  description: string;
  impacts?: string[];
  category?: string;
  categoryGroup?: 'mentoring' | 'volunteering' | 'featured';
  heroImage?: string;
  heroCaption?: string;
  supportingImage?: string;
  supportingCaption?: string;
  documentUrl?: string;
  documentTitle?: string;
  gallery?: GalleryPhoto[];
}

export interface InterestItem {
  id: string;
  number?: string;
  category: string;
  title: string;
  description: string;
  quote?: string;
  image?: string;
  details?: string[];
  isFeatured?: boolean;
}

export type PageId =
  | 'landing'
  | 'about'
  | 'education'
  | 'honors'
  | 'achievements' // backward-compat alias
  | 'research'
  | 'projects'
  | 'leadership'
  | 'activities'
  | 'interests'
  | 'resume'
  | 'ask-ai';

export interface AIMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedCards?: {
    id?: string;
    pageId?: PageId;
    title: string;
    subtitle: string;
    badge?: string;
  }[];
}

export interface SuggestedPrompt {
  id: string;
  title: string;
  category: string;
  promptText: string;
}
