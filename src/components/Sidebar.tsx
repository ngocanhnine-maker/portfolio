import React from 'react';
import { PageId } from '../types';
import {
  Sparkles,
  ArrowLeft,
  Menu,
  X,
  Mail,
  User,
  GraduationCap,
  Award,
  BookOpen,
  Layers,
  Users,
  Activity,
  Compass,
  PanelLeftClose,
  PanelLeft,
  Github,
  Linkedin,
  FileText,
  Languages,
  FlaskConical,
  TrendingUp,
  HeartHandshake
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface SidebarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onBackToLanding: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItemDef {
  id: PageId;
  number: string;
  labelKey: keyof typeof TRANSLATIONS['en']['nav'];
  icon: React.ComponentType<{ className?: string }>;
}

const TOOLTIP =
  'pointer-events-none absolute top-full left-1/2 z-50 mt-3 -translate-x-1/2 whitespace-nowrap rounded-[3px] bg-[#EFE6D2] px-2.5 py-1 text-[11px] text-[#2A2620] opacity-0 shadow-[2px_2px_0_rgba(0,0,0,0.3)] transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none';

const TOOLTIP_BELOW =
  'pointer-events-none absolute top-full right-0 z-50 mt-3 whitespace-nowrap rounded-[3px] bg-[#EFE6D2] px-2.5 py-1 text-[11px] text-[#2A2620] opacity-0 shadow-[2px_2px_0_rgba(0,0,0,0.3)] transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none';

// One-word chapter names for the desktop bar; full names show as the tooltip.
const SHORT_LABELS: Record<'en' | 'vi', Partial<Record<PageId, string>>> = {
  en: {
    about: 'About',
    snapshot: 'Record',
    started: 'Foundations',
    economics: 'Economics',
    wico: 'Finance',
    finad: 'FinAD',
    'green-credit': 'Research',
    milestones: 'Milestones',
    beyond: 'Leadership',
    community: 'Community',
    outside: 'Beyond',
    closing: 'Closing'
  },
  vi: {
    about: 'Giới thiệu',
    snapshot: 'Học tập',
    started: 'Nền tảng',
    economics: 'Kinh tế',
    wico: 'Tài chính',
    finad: 'FinAD',
    'green-credit': 'Nghiên cứu',
    milestones: 'Dấu mốc',
    beyond: 'Lãnh đạo',
    community: 'Cộng đồng',
    outside: 'Đời sống',
    closing: 'Lời kết'
  }
};

const FOOT_BTN =
  'flex h-7 w-7 cursor-pointer items-center justify-center text-[#F2EBDD]/55 transition-colors hover:text-[#F2EBDD] focus-visible:ring-1 focus-visible:ring-white/40';

const SIDEBAR_SOCIAL_LINKS: Record<'github' | 'linkedin', boolean> = {
  github: false,
  linkedin: false
};

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  mobileMenuOpen,
  setMobileMenuOpen,
  onBackToLanding,
  isCollapsed,
  onToggleCollapse
}) => {
  const { language, setLanguage, toggleLanguage, isVi } = useLanguage();
  const t = TRANSLATIONS[language];
  const hasCv = Boolean(PERSONAL_INFO.cvUrl.trim());

  // Main numbered portfolio flow in exact requested order: About -> Honors & Awards -> Education -> Projects -> Research -> Leadership -> Activities -> Interests
  // Journal chapters, in page order.
  const numberedNavItems: NavItemDef[] = [
    { id: 'about', number: '01', labelKey: 'about', icon: User },
    { id: 'snapshot', number: '02', labelKey: 'record', icon: GraduationCap },
    { id: 'started', number: '03', labelKey: 'started', icon: FlaskConical },
    { id: 'economics', number: '04', labelKey: 'economics', icon: TrendingUp },
    { id: 'wico', number: '05', labelKey: 'wico', icon: Award },
    { id: 'finad', number: '06', labelKey: 'finad', icon: Layers },
    { id: 'green-credit', number: '07', labelKey: 'greenCredit', icon: BookOpen },
    { id: 'milestones', number: '08', labelKey: 'milestones', icon: GraduationCap },
    { id: 'beyond', number: '09', labelKey: 'beyond', icon: Users },
    { id: 'community', number: '10', labelKey: 'community', icon: HeartHandshake },
    { id: 'outside', number: '11', labelKey: 'outside', icon: Compass },
    { id: 'closing', number: '12', labelKey: 'closing', icon: BookOpen },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    if (id === 'ask-ai') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isHonorsActive = activePage === 'honors' || activePage === 'achievements';

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#5A2129]/95 backdrop-blur-md border-b border-white/10 z-40 px-4 sm:px-5 flex items-center justify-between">
        <button
          onClick={onBackToLanding}
          className="font-bold text-sm sm:text-base tracking-tight text-[#F2EBDD] hover:text-[#989A6C] transition-colors cursor-pointer"
          id="mobile-logo-btn"
        >
          {isVi ? 'TRẦN NGỌC ANH' : 'TRAN NGOC ANH'}
        </button>

        <div className="flex items-center gap-2">
          {/* Language Switcher on Mobile Header */}
          <div className="flex items-center bg-white/10 rounded-sm p-0.5 border border-white/10">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 text-[11px] font-mono rounded-xs transition-colors ${
                language === 'en'
                  ? 'bg-[#676749] text-[#F2EBDD] font-bold'
                  : 'text-[#F2EBDD]/60 hover:text-[#F2EBDD]'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('vi')}
              className={`px-2 py-0.5 text-[11px] font-mono rounded-xs transition-colors ${
                language === 'vi'
                  ? 'bg-[#676749] text-[#F2EBDD] font-bold'
                  : 'text-[#F2EBDD]/60 hover:text-[#F2EBDD]'
              }`}
              title="Tiếng Việt"
            >
              VI
            </button>
          </div>

          {/* Ask AI highlighted on mobile */}
          <button
            onClick={() => handleNavClick('ask-ai')}
            className={`px-2.5 py-1 rounded-sm text-xs font-mono font-medium flex items-center gap-1 transition-all cursor-pointer ${
              activePage === 'ask-ai'
                ? 'bg-[#676749] text-[#F2EBDD]'
                : 'bg-white/10 text-[#F2EBDD] border border-white/10 hover:bg-white/15'
            }`}
            id="mobile-quick-ai-btn"
          >
            <span className="text-[#989A6C]">✦</span>
            AI
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#F2EBDD] hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
            id="mobile-menu-toggle-btn"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop & Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-xs flex flex-col pt-14">
          <div className="bg-[#5A2129] border-b border-white/15 p-6 shadow-2xl space-y-5 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
            {/* Ask AI button separated at top */}
            <div className="pb-3 border-b border-white/10">
              <button
                onClick={() => handleNavClick('ask-ai')}
                id="mobile-nav-ask-ai"
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm text-sm transition-all cursor-pointer font-medium ${
                  activePage === 'ask-ai'
                    ? 'bg-[#676749] text-[#F2EBDD]'
                    : 'bg-white/5 text-[#F2EBDD] border border-white/10 hover:bg-white/10'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#989A6C]" />
                  <span>{t.nav.askAi}</span>
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 bg-black/40 text-[#F2EBDD]/80 rounded-xs">
                  AI
                </span>
              </button>
            </div>

            {/* Numbered Flow */}
            <nav className="flex flex-col space-y-1">
              <span className="text-[10px] font-mono text-[#F2EBDD]/40 uppercase tracking-wider px-3 pb-1">
                {t.nav.sections}
              </span>
              {numberedNavItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = item.id === 'honors' ? isHonorsActive : activePage === item.id;
                const label = t.nav[item.labelKey];

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    id={`mobile-nav-${item.id}`}
                    className={`flex items-center justify-between px-3 py-2 rounded-sm text-left text-sm transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white/15 text-[#F2EBDD] font-semibold'
                        : 'text-[#F2EBDD]/65 hover:text-[#F2EBDD] hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#989A6C] w-4">{item.number}</span>
                      <IconComponent className="w-4 h-4 text-[#F2EBDD]/60" />
                      <span>{label}</span>
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-mono font-medium uppercase text-[#989A6C]">{t.nav.active}</span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Bottom Links & Language Switch */}
            <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-3 text-xs font-mono text-[#F2EBDD]/70">
              <button
                onClick={onBackToLanding}
                className="flex items-center gap-1.5 hover:text-[#F2EBDD] transition-colors cursor-pointer"
                id="mobile-back-landing-btn"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {t.nav.introScreen}
              </button>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-1 hover:text-[#F2EBDD] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                {t.nav.email}
              </a>
              {hasCv ? (
                <a
                  href={PERSONAL_INFO.cvUrl}
                  download
                  className="flex items-center gap-1 hover:text-[#F2EBDD] transition-colors"
                  title={isVi ? 'Tải CV' : 'Download CV'}
                >
                  <FileText className="h-3.5 w-3.5" />
                  CV
                </a>
              ) : (
                <span title="Coming soon">
                  <button
                    type="button"
                    disabled
                    className="flex cursor-not-allowed items-center gap-1 opacity-40"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    CV
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Desktop top bar: the spine of a journal laid across the top. Identity
          on the left, chapter tabs in the middle, utilities and actions on the
          right. The active chapter is a cream paper tab hanging below the bar. */}
      <header
        className="hidden lg:flex fixed top-0 left-0 right-0 h-12 bg-[#682B2B] shadow-[0_1px_0_rgba(0,0,0,0.25),0_2px_8px_rgba(40,15,10,0.18)] z-30 select-none items-stretch pl-6 xl:pl-8 pr-4 xl:pr-6"
        id="desktop-sidebar"
        aria-label="Main Navigation"
      >
        {/* Stitching along the bottom edge */}
        <div className="pointer-events-none absolute left-0 right-0 bottom-[4px] border-b border-dashed border-[#EFE3CC]/15" aria-hidden="true" />

        {/* Identity */}
        <button
          onClick={onBackToLanding}
          className="group shrink-0 self-center text-left cursor-pointer mr-3 xl:mr-6"
          id="sidebar-brand-btn"
          title={isVi ? 'Quay lại màn hình mở đầu' : 'Return to Intro'}
          aria-label={isVi ? 'Trần Ngọc Anh - Quay lại giới thiệu' : 'Tran Ngoc Anh - Return to Intro'}
        >
          <div className="font-serif italic font-semibold text-[1.15rem] leading-none text-[#F2EBDD] group-hover:text-[#D9C9A3] transition-colors whitespace-nowrap">
            {isVi ? 'Trần Ngọc Anh' : 'Tran Ngoc Anh'}
          </div>
          <div className="hidden xl:block text-[8.5px] uppercase tracking-[0.2em] text-[#EFE3CC]/45 mt-[3px] whitespace-nowrap">
            {t.nav.portfolioSubtitle}
          </div>
        </button>

        {/* Chapter index: "01 About" … The active chapter gets a small cream bookmark tab hanging below the bar. */}
        <nav className="flex-1 min-w-0 flex items-stretch justify-center" aria-label="Portfolio Sections">
          {numberedNavItems.map((item) => {
            const isActive = activePage === item.id;
            const label = t.nav[item.labelKey];
            const short = (isVi ? SHORT_LABELS.vi : SHORT_LABELS.en)[item.id] ?? label;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                id={`sidebar-nav-${item.id}`}
                title={label}
                aria-label={`${item.number} · ${label}`}
                aria-current={isActive ? 'page' : undefined}
                className={`group/tab relative h-full flex items-center gap-[5px] px-[clamp(4px,0.5vw,11px)] cursor-pointer whitespace-nowrap text-[11.5px] min-[1400px]:text-[12.5px] tracking-[0.01em] transition-colors duration-200 ${
                  isActive ? 'text-[#F6EEDD]' : 'text-[#EFE3CC]/60 hover:text-[#F6EEDD]'
                }`}
              >
                <span className={`hidden min-[1520px]:inline font-serif italic text-[11px] min-[1600px]:text-[12px] tabular-nums ${isActive ? 'text-[#E3CFA3]' : 'text-[#EFE3CC]/35'}`}>
                  {item.number}
                </span>
                <span className="relative">
                  {short}
                  <span
                    className={`absolute left-0 right-0 -bottom-[3px] h-px bg-[#E3CFA3] origin-left transition-transform duration-200 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover/tab:scale-x-100'
                    }`}
                    aria-hidden="true"
                  />
                </span>
                {/* Bookmark tab peeking below the bar */}
                {isActive && (
                  <span
                    className="absolute left-1/2 -translate-x-1/2 -bottom-[13px] w-[16px] h-[15px] bg-[#EFE6D2] shadow-[0_2px_3px_rgba(40,15,10,0.25)]"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 72%, 0 100%)' }}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Utilities + actions */}
        <div className="shrink-0 self-center flex items-center gap-3 ml-3 pl-3 border-l border-[#EFE3CC]/12 opacity-80 hover:opacity-100 transition-opacity">
          <span className="flex items-center gap-1 text-[10px] tracking-[0.12em]">
            {(['en', 'vi'] as const).map((lang, i) => (
              <React.Fragment key={lang}>
                {i > 0 && <span className="text-[#F2EBDD]/25">/</span>}
                <button
                  onClick={() => setLanguage(lang)}
                  aria-label={lang === 'en' ? 'Switch language to English' : 'Chuyển ngôn ngữ sang Tiếng Việt'}
                  className={`cursor-pointer transition-colors pb-px border-b ${
                    language === lang
                      ? 'text-[#F2EBDD] font-semibold border-[#D9C9A3]'
                      : 'text-[#F2EBDD]/45 hover:text-[#F2EBDD] border-transparent'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              </React.Fragment>
            ))}
          </span>

          <button
            onClick={() => handleNavClick('ask-ai')}
            id="sidebar-nav-ask-ai"
            aria-label={t.nav.askAi}
            className={`flex items-center gap-1 text-[11.5px] cursor-pointer whitespace-nowrap transition-colors ${
              activePage === 'ask-ai' ? 'text-[#F2EBDD]' : 'text-[#F2EBDD]/70 hover:text-[#F2EBDD]'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#D9C9A3]" />
            <span className={`hidden min-[1520px]:inline border-b ${activePage === 'ask-ai' ? 'border-[#D9C9A3]' : 'border-transparent'}`}>{t.nav.askAi}</span>
          </button>

          <div className="hidden xl:flex items-center">
            <div className="group relative">
              <button
                onClick={onBackToLanding}
                className={FOOT_BTN}
                id="sidebar-back-to-landing-footer"
                aria-label={isVi ? 'Quay lại màn hình mở đầu' : 'Return to Intro Screen'}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>
              <div className={TOOLTIP_BELOW}>{t.nav.intro}</div>
            </div>

            <div className="group relative">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className={FOOT_BTN}
                id="sidebar-link-email"
                aria-label={`Email: ${PERSONAL_INFO.email}`}
              >
                <Mail className="h-3.5 w-3.5" />
              </a>
              <div className={TOOLTIP_BELOW}>{t.nav.email}</div>
            </div>

            <div className="group relative">
              {hasCv ? (
                <a
                  href={PERSONAL_INFO.cvUrl}
                  download
                  className={FOOT_BTN}
                  id="sidebar-link-cv"
                  aria-label={isVi ? 'Tải CV' : 'Download CV'}
                >
                  <FileText className="h-3.5 w-3.5" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className={`${FOOT_BTN} cursor-not-allowed opacity-40`}
                  id="sidebar-link-cv"
                  aria-label={isVi ? 'CV sắp được cập nhật' : 'CV coming soon'}
                >
                  <FileText className="h-3.5 w-3.5" />
                </button>
              )}
              <div className={TOOLTIP_BELOW}>{hasCv ? (isVi ? 'Tải CV' : 'Download CV') : 'Coming soon'}</div>
            </div>

            {SIDEBAR_SOCIAL_LINKS.github && (
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className={FOOT_BTN} aria-label="GitHub Profile">
                <Github className="h-3.5 w-3.5" />
              </a>
            )}

            {SIDEBAR_SOCIAL_LINKS.linkedin && (
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className={FOOT_BTN} aria-label="LinkedIn Profile">
                <Linkedin className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
