import React, { useEffect } from 'react';
import { ProjectItem } from '../types';
import { X, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#292929]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#F8F6F1] text-[#292929] w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xs border border-[#292929]/15 shadow-2xl p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
        id="case-study-modal"
      >
        {/* Top Controls */}
        <div className="flex items-center justify-between border-b border-[#292929]/10 pb-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#676749]">
            <span>{project.number}</span>
            <span>·</span>
            <span>{project.tag}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#292929]/60 hover:text-[#292929] cursor-pointer"
            id="close-case-study-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div className="space-y-2 mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#292929]">
            {project.name}
          </h2>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tools.map((item) => (
              <span key={item} className="text-xs font-mono bg-[#EFE8D8]/70 border border-[#292929]/10 px-2 py-0.5 rounded-xs text-[#4A4A38]">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Metrics Strip */}
        {project.metrics && (
          <div className="grid grid-cols-3 gap-2 mb-6">
            {project.metrics.map((m, i) => (
              <div key={i} className="p-3 bg-[#EFE8D8]/60 border border-[#292929]/10 rounded-xs text-center">
                <span className="text-[10px] font-mono text-[#676749] uppercase block">{m.label}</span>
                <span className="text-base font-bold text-[#292929]">{m.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-4 bg-[#F2EBDD]/60 rounded-xs border border-[#292929]/10 space-y-1">
            <span className="font-mono text-[10px] text-[#676749] uppercase font-semibold block">{t.projects.overview}</span>
            <p className="text-[#292929]/80">{caseStudy.overview}</p>
          </div>

          <div className="p-4 bg-[#F2EBDD]/60 rounded-xs border border-[#292929]/10 space-y-1">
            <span className="font-mono text-[10px] text-[#676749] uppercase font-semibold block">{t.projects.solution}</span>
            <p className="text-[#292929]/80">{caseStudy.solution}</p>
          </div>

          <div className="p-4 bg-[#F2EBDD]/60 rounded-xs border border-[#292929]/10 space-y-2">
            <span className="font-mono text-[10px] text-[#676749] uppercase font-semibold block">{t.projects.keyResults}</span>
            <div className="space-y-1.5">
              {caseStudy.results.map((res, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <Check className="w-3.5 h-3.5 text-[#676749] flex-none" />
                  <span>{res}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 pt-4 border-t border-[#292929]/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#292929] text-[#F2EBDD] text-xs font-mono rounded-xs cursor-pointer hover:bg-[#676749]"
          >
            {isVi ? 'Đóng' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
