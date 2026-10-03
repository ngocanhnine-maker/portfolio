export interface ProjectMetric {
  label: string;
  value: string;
}

export interface CaseStudyDecision {
  decision: string;
  reason: string;
}

export interface CaseStudyData {
  overview: string;
  problem: string;
  solution: string;
  results: string[];
  // Optional long-form case-study blocks (Projects template). When absent the
  // template renders sized placeholder copy so the layout stays testable.
  dataInput?: string;
  whatItDoes?: string;
  validation?: string;
  decisions?: CaseStudyDecision[];
  limits?: string[];
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
  // Optional case-study meta / media (Projects template)
  summary?: string;
  status?: string;
  timeline?: string;
  liveUrl?: string;
  sourceUrl?: string;
  heroImage?: string;
  detailImages?: string[];
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
  /** 2–3 sentence abstract shown in the card body. Rendered only when non-empty. */
  abstract?: string;
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
  /** mono type label shown in the drawer meta row */
  kind?: string;
  metrics: string[]; // tags — at most 3 are rendered
  /** short card description — 2 sentences max */
  summary: string;
  /** horizontal stat row (2–3 items) shown on the card and in the drawer */
  stats?: { value: string; label: string }[];
  /** drawer image area — [main, ...thumbnails]; empty renders a placeholder */
  images?: string[];
  /** "See more" drawer body — real copy optional, sized lorem shows otherwise */
  challenge?: string;
  contributions?: string[];
  outcome?: string;
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
  imageCaption?: string;
  details?: string[];
  isFeatured?: boolean;
  // Optional award/credential tied to this interest (e.g. a competition result)
  awardResult?: string;
  awardCategory?: string;
  awardEvent?: string;
  certificatePdf?: string;
  certificateImage?: string;
  certificates?: Array<{
    title: string;
    pdfUrl: string;
  }>;
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
  | 'ask-ai'
  // Journal pages
  | 'started'
  | 'economics'
  | 'wico'
  | 'finad'
  | 'green-credit'
  | 'milestones'
  | 'beyond'
  | 'community'
  | 'outside';

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
