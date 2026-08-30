import React from 'react';
import { PageId } from '../types';
import { getProjects } from '../data/portfolioData';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface ProjectsPageProps {
  onOpenCaseStudy: (projectId: string) => void;
  onNavigate: (page: PageId) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onOpenCaseStudy,
  onNavigate
}) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const projects = getProjects(language);

  return (
    <section id="projects" className="w-full bg-[#5E6044] text-[#F2EBDD] border-b border-black/15">
      <div className="max-w-4xl mx-auto py-12 md:py-20 px-5 sm:px-8 md:px-12 space-y-10">
        {/* Title */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-[#DDD8C4] uppercase tracking-wider">
            {t.projects.sectionNum}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F2EBDD] tracking-tight">
            {t.projects.title}
          </h1>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {projects.map((project) => (
            <article
              key={project.id}
              onClick={() => onOpenCaseStudy(project.id)}
              id={`project-card-${project.id}`}
              className="p-6 sm:p-7 border border-white/15 bg-white/10 hover:bg-white/15 rounded-xs transition-all duration-200 cursor-pointer backdrop-blur-xs group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#DDD8C4]">
                    <span>{project.number}</span>
                    <span>·</span>
                    <span>{project.tag}</span>
                    <span>·</span>
                    <span>{project.year}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#F2EBDD] group-hover:text-white transition-colors">
                    {project.name}
                  </h2>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tools.map((item) => (
                      <span
                        key={item}
                        className="text-xs font-mono bg-white/15 border border-white/20 px-2.5 py-0.5 rounded-xs text-[#F2EBDD]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-[#F2EBDD] group-hover:translate-x-1 transition-transform">
                  <span>{t.projects.viewCase}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="pt-2 flex justify-between items-center text-sm font-semibold">
          <button
            onClick={() => onNavigate('education')}
            className="inline-flex items-center gap-2 text-[#F2EBDD]/75 hover:text-white cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.projects.prevSection}</span>
          </button>
          <button
            onClick={() => onNavigate('research')}
            className="inline-flex items-center gap-2 text-[#F2EBDD] hover:text-white cursor-pointer transition-colors"
          >
            <span>{t.projects.nextSection}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
