import React, { useState, useEffect } from 'react';
import { PageId, ProjectItem } from './types';
import { PROJECTS } from './data/portfolioData';
import { Sidebar } from './components/Sidebar';
import { LandingIntro } from './components/LandingIntro';
import { AskAIPage } from './components/AskAIPage';
import { AboutPage } from './components/AboutPage';
import { EducationPage } from './components/EducationPage';
import { HonorsPage } from './components/HonorsPage';
import { ResearchPage } from './components/ResearchPage';
import { ProjectsPage } from './components/ProjectsPage';
import { LeadershipPage } from './components/LeadershipPage';
import { ActivitiesPage } from './components/ActivitiesPage';
import { InterestsPage } from './components/InterestsPage';
import { CaseStudyModal } from './components/CaseStudyModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('landing');
  const [activeSection, setActiveSection] = useState<PageId>('about');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedResearchId, setSelectedResearchId] = useState<string | undefined>(undefined);
  const [selectedAwardId, setSelectedAwardId] = useState<string | undefined>(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sidebar_collapsed');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('sidebar_collapsed', JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  // Smooth scroll to section in profile mode
  const scrollToSection = (sectionId: string) => {
    setTimeout(() => {
      const targetId = sectionId === 'achievements' ? 'honors' : sectionId;
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  // Track active section as user scrolls through the profile
  useEffect(() => {
    if (currentPage === 'landing' || currentPage === 'ask-ai') return;

    const sections = [
      'about',
      'honors',
      'education',
      'projects',
      'research',
      'leadership',
      'activities',
      'interests'
    ];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId as PageId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleNavigate = (page: PageId, itemId?: string) => {
    setMobileMenuOpen(false);

    if (page === 'landing') {
      setCurrentPage('landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'ask-ai') {
      setCurrentPage('ask-ai');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Navigating to a profile section
    if (currentPage === 'ask-ai' || currentPage === 'landing') {
      setCurrentPage('about'); // Sets to continuous profile mode
    }

    const targetSection = page === 'achievements' ? 'honors' : page;
    setActiveSection(targetSection);
    scrollToSection(targetSection);

    if (itemId) {
      const proj = PROJECTS.find((p) => p.id === itemId);
      if (proj) {
        setSelectedProject(proj);
      }
      if (page === 'research' || targetSection === 'research') {
        setSelectedResearchId(itemId);
      }
      if (page === 'honors' || targetSection === 'honors') {
        setSelectedAwardId(itemId);
      }
    }
  };

  const handleOpenCaseStudy = (projectId: string) => {
    const proj = PROJECTS.find((p) => p.id === projectId);
    if (proj) {
      setSelectedProject(proj);
    }
  };

  const handleCloseCaseStudy = () => {
    setSelectedProject(null);
  };

  // If on Landing Screen experience
  if (currentPage === 'landing') {
    return (
      <div className="bg-[#F2EBDD] min-h-screen text-[#292929]">
        <LandingIntro
          onEnterPortfolio={(targetPage: PageId = 'about') => {
            handleNavigate(targetPage);
          }}
        />
      </div>
    );
  }

  const isAIMode = currentPage === 'ask-ai';

  // Main Portfolio Experience (Fixed Sidebar + Scrollable Content in requested order)
  return (
    <div className="bg-[#F2EBDD] min-h-screen text-[#292929] flex flex-col lg:flex-row relative selection:bg-[#676749] selection:text-white">
      {/* Fixed Left Sidebar */}
      <Sidebar
        activePage={isAIMode ? 'ask-ai' : activeSection}
        onNavigate={handleNavigate}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onBackToLanding={() => setCurrentPage('landing')}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />

      {/* Main Content Area: Dynamically responsive to sidebar collapse state */}
      <main
        className={`flex-1 min-h-screen pt-14 lg:pt-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isSidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'
        }`}
        id="portfolio-main-content"
      >
        {isAIMode ? (
          <AskAIPage
            onNavigate={handleNavigate}
            onOpenCaseStudy={handleOpenCaseStudy}
            onOpenResearchModal={(id) => {
              handleNavigate('research', id);
            }}
          />
        ) : (
          /* Continuous, full scrollable profile feed in alternating rhythm:
             1. About Me (Beige)
             2. Honors & Awards (Muted Olive)
             3. Education (Beige)
             4. Projects (Muted Olive)
             5. Research (Beige)
             6. Leadership (Muted Olive)
             7. Activities (Beige)
             8. Interests (Muted Olive)
          */
          <div className="w-full">
            <AboutPage onNavigate={handleNavigate} />
            <HonorsPage
              onNavigate={handleNavigate}
              initialAwardId={selectedAwardId}
            />
            <EducationPage onNavigate={handleNavigate} />
            <ProjectsPage
              onOpenCaseStudy={handleOpenCaseStudy}
              onNavigate={handleNavigate}
            />
            <ResearchPage
              onNavigate={handleNavigate}
              onOpenCaseStudy={handleOpenCaseStudy}
              initialPaperId={selectedResearchId}
            />
            <LeadershipPage onNavigate={handleNavigate} />
            <ActivitiesPage onNavigate={handleNavigate} />
            <InterestsPage onNavigate={handleNavigate} />
          </div>
        )}
      </main>

      {/* Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={handleCloseCaseStudy}
        />
      )}
    </div>
  );
}
