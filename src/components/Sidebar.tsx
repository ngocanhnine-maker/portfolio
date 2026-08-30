import React from 'react';
import { PageId } from '../types';
import {
  Sparkles,
  ArrowLeft,
  Menu,
  X,
  ArrowUpRight,
  Mail,
  User,
  GraduationCap,
  Award,
  BookOpen,
  Layers,
  Users,
  Activity,
  Compass,
  FileText,
  PanelLeftClose,
  PanelLeft,
  Github,
  Linkedin,
  Languages
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

  // Main numbered portfolio flow in exact requested order: About -> Honors & Awards -> Education -> Projects -> Research -> Leadership -> Activities -> Interests
  const numberedNavItems: NavItemDef[] = [
    { id: 'about', number: '01', labelKey: 'about', icon: User },
    { id: 'honors', number: '02', labelKey: 'honors', icon: Award },
    { id: 'education', number: '03', labelKey: 'education', icon: GraduationCap },
    { id: 'projects', number: '04', labelKey: 'projects', icon: Layers },
    { id: 'research', number: '05', labelKey: 'research', icon: BookOpen },
    { id: 'leadership', number: '06', labelKey: 'leadership', icon: Users },
    { id: 'activities', number: '07', labelKey: 'activities', icon: Activity },
    { id: 'interests', number: '08', labelKey: 'interests', icon: Compass },
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
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#181816]/95 backdrop-blur-md border-b border-white/10 z-40 px-4 sm:px-5 flex items-center justify-between">
        <button
          onClick={onBackToLanding}
          className="font-bold text-sm sm:text-base tracking-tight text-[#F2EBDD] hover:text-[#989A6C] transition-colors cursor-pointer"
          id="mobile-logo-btn"
        >
          {isVi ? 'TRẦN NGỌC ÁNH' : 'TRAN NGOC ANH'}
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
          <div className="bg-[#181816] border-b border-white/15 p-6 shadow-2xl space-y-5 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
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

            {/* Separate Resume Link */}
            <div className="pt-3 border-t border-white/10">
              <button
                onClick={() => handleNavClick('resume')}
                id="mobile-nav-resume"
                className={`w-full flex items-center justify-between px-3 py-2 rounded-sm text-sm transition-all cursor-pointer ${
                  activePage === 'resume'
                    ? 'bg-white/15 text-[#F2EBDD] font-semibold'
                    : 'text-[#F2EBDD]/70 hover:text-[#F2EBDD] hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#989A6C]" />
                  <span>{t.nav.resume}</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F2EBDD]/40" />
              </button>
            </div>

            {/* Bottom Links & Language Switch */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#F2EBDD]/70">
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
            </div>
          </div>
        </div>
      )}

      {/* Desktop Fixed Left Sidebar: Collapsible with Smooth Transition */}
      <aside
        className={`hidden lg:flex fixed top-0 left-0 bottom-0 bg-[#181816] border-r border-white/10 flex-col justify-between z-20 select-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isCollapsed ? 'w-[72px] px-3 py-5' : 'w-[260px] p-5 xl:p-6'
        }`}
        id="desktop-sidebar"
        aria-label="Main Navigation"
      >
        {/* Top Section: Brand + Language Switcher + Toggle */}
        <div>
          <div className={`flex items-center mb-5 ${isCollapsed ? 'justify-center flex-col gap-3' : 'justify-between'}`}>
            {!isCollapsed ? (
              <>
                <button
                  onClick={onBackToLanding}
                  className="text-left group cursor-pointer overflow-hidden max-w-[170px]"
                  id="sidebar-brand-btn"
                  title={isVi ? 'Quay lại màn hình mở đầu' : 'Return to Intro'}
                  aria-label={isVi ? 'Trần Ngọc Ánh - Quay lại giới thiệu' : 'Tran Ngoc Anh - Return to Intro'}
                >
                  <div className="text-sm xl:text-base font-bold tracking-tight text-[#F2EBDD] group-hover:text-[#989A6C] transition-colors leading-tight truncate">
                    {isVi ? 'TRẦN NGỌC ÁNH' : 'TRAN NGOC ANH'}
                  </div>
                  <div className="text-[10px] font-mono text-[#F2EBDD]/45 uppercase tracking-wider mt-0.5 truncate">
                    {t.nav.portfolioSubtitle}
                  </div>
                </button>

                <button
                  onClick={onToggleCollapse}
                  className="p-1.5 text-[#F2EBDD]/50 hover:text-[#F2EBDD] hover:bg-white/10 rounded-sm transition-colors cursor-pointer shrink-0"
                  id="sidebar-collapse-btn"
                  aria-label="Collapse sidebar navigation"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              </>
            ) : (
              /* Collapsed Header State: Monogram & Expand Toggle */
              <div className="flex flex-col items-center gap-2.5">
                <div className="relative group">
                  <button
                    onClick={onBackToLanding}
                    className="font-mono text-xs font-bold text-[#F2EBDD] hover:text-[#989A6C] transition-colors cursor-pointer w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center focus-visible:ring-1 focus-visible:ring-white/40"
                    id="sidebar-collapsed-monogram"
                    aria-label={isVi ? 'Trần Ngọc Ánh · Quay lại màn hình giới thiệu' : 'Tran Ngoc Anh · Return to Intro'}
                  >
                    TNA
                  </button>
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#181816] text-[#F2EBDD] text-[11px] font-mono border border-white/15 rounded-xs shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 motion-reduce:transition-none z-50">
                    {isVi ? 'Trần Ngọc Ánh · Giới thiệu' : 'Tran Ngoc Anh · Intro'}
                  </div>
                </div>

                <div className="relative group">
                  <button
                    onClick={onToggleCollapse}
                    className="p-2 text-[#F2EBDD]/60 hover:text-[#F2EBDD] hover:bg-white/10 rounded-sm transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-white/40"
                    id="sidebar-expand-btn"
                    aria-label="Expand sidebar navigation"
                  >
                    <PanelLeft className="w-4 h-4 text-[#989A6C]" />
                  </button>
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#181816] text-[#F2EBDD] text-[11px] font-mono border border-white/15 rounded-xs shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 motion-reduce:transition-none z-50">
                    {isVi ? 'Mở rộng thanh bên' : 'Expand Sidebar'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Language Switcher (EN / VI) */}
          <div className="mb-4">
            {!isCollapsed ? (
              <div className="flex items-center justify-between px-2.5 py-1.5 rounded-sm bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#F2EBDD]/60">
                  <Languages className="w-3.5 h-3.5 text-[#989A6C]" />
                  <span>Language</span>
                </div>
                <div className="flex items-center bg-black/40 rounded-xs p-0.5 border border-white/10">
                  <button
                    onClick={() => setLanguage('en')}
                    aria-label="Switch language to English"
                    className={`px-2 py-0.5 text-[10px] font-mono rounded-xs transition-colors cursor-pointer ${
                      language === 'en'
                        ? 'bg-[#676749] text-[#F2EBDD] font-bold shadow-xs'
                        : 'text-[#F2EBDD]/60 hover:text-[#F2EBDD]'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('vi')}
                    aria-label="Chuyển ngôn ngữ sang Tiếng Việt"
                    className={`px-2 py-0.5 text-[10px] font-mono rounded-xs transition-colors cursor-pointer ${
                      language === 'vi'
                        ? 'bg-[#676749] text-[#F2EBDD] font-bold shadow-xs'
                        : 'text-[#F2EBDD]/60 hover:text-[#F2EBDD]'
                    }`}
                  >
                    VI
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center group relative">
                <button
                  onClick={toggleLanguage}
                  aria-label={`Current language: ${language.toUpperCase()}. Click to switch to ${language === 'en' ? 'Vietnamese' : 'English'}`}
                  className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 text-[10px] font-mono font-bold text-[#F2EBDD] hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors focus-visible:ring-1 focus-visible:ring-white/40"
                >
                  {language.toUpperCase()}
                </button>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#181816] text-[#F2EBDD] text-[11px] font-mono border border-white/15 rounded-xs shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 motion-reduce:transition-none z-50">
                  Switch: {language === 'en' ? 'Tiếng Việt' : 'English'}
                </div>
              </div>
            )}
          </div>

          {/* ✦ 1. Ask AI (Highlighted at top, not numbered) */}
          <div className="relative group mb-4">
            <button
              onClick={() => handleNavClick('ask-ai')}
              id="sidebar-nav-ask-ai"
              aria-label={t.nav.askAi}
              className={`w-full flex items-center rounded-sm font-medium text-sm transition-all duration-150 cursor-pointer ${
                isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2'
              } ${
                activePage === 'ask-ai'
                  ? 'bg-[#676749] text-[#F2EBDD] shadow-xs font-semibold border border-white/20'
                  : 'bg-white/5 text-[#F2EBDD] border border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <span className="flex items-center gap-2.5 min-w-0">
                <Sparkles className={`w-4 h-4 shrink-0 ${activePage === 'ask-ai' ? 'text-[#F2EBDD]' : 'text-[#989A6C]'}`} />
                {!isCollapsed && <span className="truncate">{t.nav.askAi}</span>}
              </span>
              {!isCollapsed && (
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 bg-black/40 text-[#F2EBDD]/80 rounded-xs shrink-0">
                  ✦ AI
                </span>
              )}
            </button>

            {/* Floating Tooltip in Collapsed Mode */}
            {isCollapsed && (
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#181816] text-[#F2EBDD] text-[11px] font-mono border border-white/15 rounded-xs shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 motion-reduce:transition-none z-50">
                ✦ {t.nav.askAi}
              </div>
            )}
          </div>

          {/* ✦ 2. Main Numbered Portfolio Flow */}
          <div className="space-y-1">
            {!isCollapsed && (
              <div className="text-[10px] font-mono text-[#F2EBDD]/35 uppercase tracking-wider px-3 pb-1">
                {t.nav.sections}
              </div>
            )}

            <nav className="space-y-0.5" aria-label="Portfolio Sections">
              {numberedNavItems.map((item) => {
                const isActive = item.id === 'honors' ? isHonorsActive : activePage === item.id;
                const IconComponent = item.icon;
                const label = t.nav[item.labelKey];

                return (
                  <div key={item.id} className="relative group">
                    <button
                      onClick={() => handleNavClick(item.id)}
                      id={`sidebar-nav-${item.id}`}
                      aria-label={`${item.number} · ${label}`}
                      className={`w-full flex items-center text-sm text-left transition-all duration-150 cursor-pointer rounded-sm ${
                        isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-1.5'
                      } ${
                        isActive
                          ? 'text-[#F2EBDD] font-bold bg-[#676749] border border-white/20 shadow-xs'
                          : 'text-[#F2EBDD]/60 hover:text-[#F2EBDD] hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {!isCollapsed && (
                          <span
                            className={`text-[11px] font-mono w-4 shrink-0 transition-colors ${
                              isActive ? 'text-[#DDD8C4] font-bold' : 'text-[#F2EBDD]/35'
                            }`}
                          >
                            {item.number}
                          </span>
                        )}
                        <IconComponent
                          className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                            isActive ? 'text-[#F2EBDD]' : 'text-[#F2EBDD]/40 group-hover:text-[#F2EBDD]'
                          }`}
                        />
                        {!isCollapsed && (
                          <span className="tracking-tight truncate text-xs sm:text-[13px]">{label}</span>
                        )}
                      </div>

                      {!isCollapsed && isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DDD8C4] shrink-0 ml-1" />
                      )}
                    </button>

                    {/* Floating Tooltip in Collapsed Mode */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#181816] text-[#F2EBDD] text-[11px] font-mono border border-white/15 rounded-xs shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 motion-reduce:transition-none z-50">
                        {item.number} · {label}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer with Separate Resume link */}
        <div className={`pt-3 border-t border-white/10 ${isCollapsed ? 'space-y-2.5' : 'space-y-2.5'}`}>
          {/* ✦ Separate Resume Link near bottom */}
          <div className="relative group">
            <button
              onClick={() => handleNavClick('resume')}
              id="sidebar-nav-resume"
              aria-label={t.nav.resume}
              className={`w-full flex items-center rounded-sm text-xs font-mono transition-all duration-150 cursor-pointer ${
                isCollapsed
                  ? 'justify-center p-2'
                  : 'justify-between px-3 py-1.5'
              } ${
                activePage === 'resume'
                  ? 'text-[#F2EBDD] font-bold bg-[#676749] border border-white/20 shadow-xs'
                  : 'text-[#F2EBDD]/70 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-[#F2EBDD]'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <FileText className={`w-3.5 h-3.5 shrink-0 ${activePage === 'resume' ? 'text-[#F2EBDD]' : 'text-[#989A6C]'}`} />
                {!isCollapsed && <span className="truncate">{t.nav.resume}</span>}
              </div>
              {!isCollapsed && <ArrowUpRight className="w-3 h-3 text-[#F2EBDD]/40 shrink-0" />}
            </button>

            {isCollapsed && (
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#181816] text-[#F2EBDD] text-[11px] font-mono border border-white/15 rounded-xs shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 motion-reduce:transition-none z-50">
                {t.nav.resume}
              </div>
            )}
          </div>

          {!isCollapsed ? (
            /* Full Footer Links */
            <>
              <div className="space-y-0.5 text-[10px] uppercase font-mono text-[#F2EBDD]/55 pt-0.5">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center justify-between hover:text-[#F2EBDD] transition-colors py-0.5"
                  id="sidebar-link-email"
                  aria-label={`Send email to ${PERSONAL_INFO.email}`}
                >
                  <span>{t.nav.email}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#F2EBDD]/40" />
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between hover:text-[#F2EBDD] transition-colors py-0.5"
                  id="sidebar-link-github"
                  aria-label="View GitHub Profile (opens in new tab)"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-[#F2EBDD]/40" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between hover:text-[#F2EBDD] transition-colors py-0.5"
                  id="sidebar-link-linkedin"
                  aria-label="View LinkedIn Profile (opens in new tab)"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-[#F2EBDD]/40" />
                </a>
              </div>

              <div className="pt-2 text-[10px] font-mono text-[#F2EBDD]/45 flex items-center justify-between uppercase border-t border-white/10">
                <button
                  onClick={onBackToLanding}
                  className="flex items-center gap-1.5 hover:text-[#F2EBDD] transition-colors cursor-pointer py-0.5"
                  id="sidebar-back-to-landing-footer"
                  aria-label={isVi ? 'Quay lại màn hình mở đầu' : 'Return to Intro Screen'}
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>{t.nav.intro}</span>
                </button>
                <span>2026 ED.</span>
              </div>
            </>
          ) : (
            /* Compact Collapsed Footer */
            <div className="flex flex-col items-center gap-2 pt-1">
              <div className="relative group">
                <button
                  onClick={onBackToLanding}
                  className="p-1.5 text-[#F2EBDD]/50 hover:text-[#F2EBDD] hover:bg-white/10 rounded-sm transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-white/40"
                  id="sidebar-collapsed-back-btn"
                  aria-label={isVi ? 'Quay lại màn hình mở đầu' : 'Return to Intro Screen'}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#181816] text-[#F2EBDD] text-[11px] font-mono border border-white/15 rounded-xs shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 motion-reduce:transition-none z-50">
                  {t.nav.intro}
                </div>
              </div>

              <div className="relative group">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-1.5 text-[#F2EBDD]/50 hover:text-[#F2EBDD] hover:bg-white/10 rounded-sm transition-colors block focus-visible:ring-1 focus-visible:ring-white/40"
                  id="sidebar-collapsed-email"
                  aria-label={`Email: ${PERSONAL_INFO.email}`}
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#181816] text-[#F2EBDD] text-[11px] font-mono border border-white/15 rounded-xs shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 motion-reduce:transition-none z-50">
                  {t.nav.email}
                </div>
              </div>

              <div className="relative group">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 text-[#F2EBDD]/50 hover:text-[#F2EBDD] hover:bg-white/10 rounded-sm transition-colors block focus-visible:ring-1 focus-visible:ring-white/40"
                  id="sidebar-collapsed-github"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#181816] text-[#F2EBDD] text-[11px] font-mono border border-white/15 rounded-xs shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 motion-reduce:transition-none z-50">
                  GitHub
                </div>
              </div>

              <div className="relative group">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 text-[#F2EBDD]/50 hover:text-[#F2EBDD] hover:bg-white/10 rounded-sm transition-colors block focus-visible:ring-1 focus-visible:ring-white/40"
                  id="sidebar-collapsed-linkedin"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#181816] text-[#F2EBDD] text-[11px] font-mono border border-white/15 rounded-xs shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 motion-reduce:transition-none z-50">
                  LinkedIn
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
