import React, { useState, useEffect } from 'react';
import { PageId, ResearchItem } from '../types';
import { getResearchPapers } from '../data/portfolioData';
import { ArrowRight, ArrowUpRight, X, FileText, ExternalLink, Download, Maximize2, Award, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface ResearchPageProps {
  onNavigate: (page: PageId, itemId?: string) => void;
  onOpenCaseStudy?: (projectId: string) => void;
  initialPaperId?: string;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({
  onNavigate,
  initialPaperId
}) => {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language];
  const researchPapers = getResearchPapers(language);

  const [drawerPaper, setDrawerPaper] = useState<ResearchItem | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<{
    title: string;
    subtitle?: string;
    url: string;
    journal: string;
    doi?: string;
  } | null>(null);

  // Sync initialPaperId if passed from external navigation (e.g. Ask AI)
  useEffect(() => {
    if (initialPaperId) {
      const found = researchPapers.find((p) => p.id === initialPaperId);
      if (found) {
        setDrawerPaper(found);
      }
    }
  }, [initialPaperId, researchPapers]);

  const handleOpenPdf = (paper: ResearchItem) => {
    const pdfUrl = paper.pdfUrl || paper.paperUrl || '/papers/green-credit-banking-2026.pdf';
    setSelectedPdf({
      title: paper.mainTitle || paper.title,
      subtitle: paper.subtitle,
      url: pdfUrl,
      journal: paper.publishedIn,
      doi: paper.doi
    });
  };

  const handleOpenMaterial = (materialUrl?: string, title?: string) => {
    if (!materialUrl) return;
    setSelectedPdf({
      title: title || (isVi ? 'Tài liệu nghiên cứu' : 'Research Documentation'),
      subtitle: isVi ? 'Trình bày tại WICO 2026' : 'Presented at WICO 2026',
      url: materialUrl,
      journal: 'World Invention Creativity Olympic (WICO 2026)'
    });
  };

  return (
    <section id="research" className="w-full bg-[#F2EBDD] text-[#292929] border-b border-[#292929]/10 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-12 sm:py-16 md:py-20 select-none relative">
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1500px] mx-auto w-full space-y-10">
        {/* Section Header */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-[#676749] uppercase tracking-wider block font-medium">
            {t.research.sectionNum}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#292929] tracking-tight">
            {t.research.title}
          </h1>
        </div>

        {/* Academic Research Papers Showcase */}
        <div className="space-y-5 sm:space-y-6">
          {researchPapers.map((paper, index) => {
            const isFeatured = index === 0;

            return (
              <article
                key={paper.id}
                className="group relative bg-[#F8F6F1] border border-[#292929]/12 rounded-xs p-5 sm:p-6 md:p-6 space-y-3.5 sm:space-y-4 transition-all duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.035)] hover:border-[#292929]/25"
              >
                {/* Top Row: Identifier, Year & Publication Status Stamp */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#292929]/10 pb-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#676749]">
                    <span className="font-bold tracking-wider text-[#292929]">
                      {isVi ? 'BÀI BÁO' : 'PAPER'} {paper.number}
                    </span>
                    <span className="text-[#292929]/25">/</span>
                    <span className="text-[#676749]">{paper.year}</span>
                    {isFeatured && (
                      <>
                        <span className="text-[#292929]/20 hidden sm:inline">·</span>
                        <span className="text-[10px] uppercase tracking-wider text-[#4F513B] font-semibold hidden sm:inline">
                          {t.research.featuredPub}
                        </span>
                      </>
                    )}
                  </div>

                  {paper.badge && (
                    <span className="text-[10px] font-mono tracking-wider uppercase text-[#4A4A38] bg-[#EFE8D8]/70 border border-[#292929]/12 px-2.5 py-0.5 rounded-xs font-medium">
                      {paper.badge}
                    </span>
                  )}
                </div>

                {/* Main Content Layout */}
                <div className="flex flex-col md:flex-row items-stretch gap-5 lg:gap-7">
                  
                  {/* Left Side: Editorial Typography & Metadata */}
                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <h2
                          onClick={() => setDrawerPaper(paper)}
                          className="text-xl sm:text-2xl font-bold tracking-tight text-[#292929] leading-snug cursor-pointer group-hover:text-[#4F513B] transition-colors"
                        >
                          {paper.mainTitle || paper.title}
                        </h2>
                        {paper.subtitle && (
                          <p className="text-xs sm:text-[13px] text-[#292929]/70 leading-relaxed font-mono">
                            {paper.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Micro Metadata Grid */}
                      <div className="pt-2 border-t border-[#292929]/8 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono text-[#676749]">
                        <div>
                          <span className="text-[#292929]/50 uppercase text-[10px] block">{t.research.publishedIn}:</span>
                          <span className="font-semibold text-[#292929] truncate block">{paper.publishedIn}</span>
                        </div>
                        <div>
                          <span className="text-[#292929]/50 uppercase text-[10px] block">{t.research.leadAuthor}:</span>
                          <span className="font-semibold text-[#292929] truncate block">{paper.authorRole}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-[#292929]/10 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenPdf(paper)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#4F513B] hover:bg-[#3D3F2D] text-[#F2EBDD] text-xs font-mono font-medium rounded-xs transition-colors cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{t.research.readFullPdf}</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => setDrawerPaper(paper)}
                          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#292929] hover:text-[#4F513B] transition-colors cursor-pointer group/btn ml-0.5"
                        >
                          <span>{t.research.viewResearch}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Curated Document Preview Anchor */}
                  {paper.previewImage && (
                    <div className="w-full md:w-[44%] lg:w-[45%] shrink-0 flex flex-col justify-center">
                      <button
                        type="button"
                        onClick={() => handleOpenPdf(paper)}
                        className="group/doc w-full relative bg-[#F8F6F1] border border-[#292929]/15 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-300 rounded-xs overflow-hidden text-left cursor-pointer"
                        title="Click to view full research publication PDF"
                      >
                        <div className="relative w-full aspect-[16/9] bg-[#ECE5D5] overflow-hidden">
                          <img
                            src={paper.previewImage}
                            alt={`${paper.title} - Cover Page Preview`}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/doc:scale-[1.02]"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover/doc:bg-black/10 transition-colors duration-200 flex items-end justify-center p-2">
                            <span className="opacity-0 group-hover/doc:opacity-100 transition-opacity duration-200 bg-[#292929]/90 text-[#F2EBDD] text-[9.5px] font-mono px-2 py-0.5 rounded-xs flex items-center gap-1.5 shadow-sm">
                              <span>{t.research.readFullPdf}</span>
                              <ArrowUpRight className="w-2.5 h-2.5" />
                            </span>
                          </div>
                        </div>

                        <div className="px-2.5 py-1 bg-[#F2EBDD] border-t border-[#292929]/10 flex items-center justify-between text-[9.5px] font-mono text-[#676749]">
                          <span>{isVi ? 'Trang 1 / Bìa tài liệu nghiên cứu' : `Page 1 / ${isFeatured ? 'Publication Cover' : 'Research Document'}`}</span>
                          <span className="text-[#292929] group-hover/doc:underline flex items-center gap-0.5">
                            <span>Open PDF</span>
                            <ArrowUpRight className="w-2 h-2" />
                          </span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Section Navigation */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-[#292929]/12 flex justify-between items-center text-xs sm:text-sm font-mono">
          <button
            onClick={() => onNavigate('projects')}
            className="group inline-flex items-center gap-2 text-[#676749] hover:text-[#292929] cursor-pointer transition-colors"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
            <span>{t.research.prevSection}</span>
          </button>

          <button
            onClick={() => onNavigate('leadership')}
            className="group inline-flex items-center gap-2 text-[#292929] hover:text-[#676749] cursor-pointer transition-colors font-medium"
          >
            <span>{t.research.nextSection}</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </button>
        </div>
      </div>

      {/* Editorial Research Detail Panel / Right Drawer */}
      {drawerPaper && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerPaper(null)}
            aria-hidden="true"
          />

          {/* Slide-in Drawer Container */}
          <div
            className="relative w-full max-w-xl h-full bg-[#23261D] text-[#F2EBDD] border-l border-white/15 shadow-2xl z-10 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#23261D]/95 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#DDD8C4] font-semibold">
                  {isVi ? 'BÀI BÁO' : 'PAPER'} {drawerPaper.number}
                </span>
                <span className="text-white/30 font-mono">/</span>
                <span className="text-xs font-mono uppercase tracking-widest text-[#DDD8C4]/80">
                  {drawerPaper.year}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setDrawerPaper(null)}
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-xs transition-colors cursor-pointer"
                aria-label="Close research panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body Content */}
            <div className="p-6 sm:p-8 space-y-8 flex-1">
              {/* Paper Title & Tags */}
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {drawerPaper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-white/10 border border-white/15 text-[10px] font-mono text-[#DDD8C4] rounded-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F2EBDD] leading-snug">
                    {drawerPaper.mainTitle || drawerPaper.title}
                  </h2>
                  {drawerPaper.subtitle && (
                    <p className="text-sm font-serif italic text-[#DDD8C4]/80 leading-relaxed">
                      {drawerPaper.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Editorial Sections */}
              <div className="space-y-7 pt-2 border-t border-white/10 text-sm">
                {/* 01 / RESEARCH PROBLEM */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#DDD8C4] block font-medium">
                    {t.research.problem}
                  </span>
                  <p className="text-[#DDD8C4]/85 font-mono text-xs leading-relaxed">
                    {drawerPaper.researchProblem || drawerPaper.overview}
                  </p>
                </div>

                {/* 02 / RESEARCH QUESTIONS */}
                {drawerPaper.researchQuestions && drawerPaper.researchQuestions.length > 0 && (
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#DDD8C4] block font-medium">
                      {t.research.questions}
                    </span>
                    <ul className="space-y-1.5 text-xs font-mono text-[#DDD8C4]/85 pl-4 list-disc marker:text-[#989A6C]">
                      {drawerPaper.researchQuestions.map((q, qIdx) => (
                        <li key={qIdx} className="leading-relaxed">
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 03 / METHODOLOGY */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#DDD8C4] block font-medium">
                    {t.research.methodology}
                  </span>
                  <p className="text-[#DDD8C4]/85 font-mono text-xs leading-relaxed">
                    {drawerPaper.methodology}
                  </p>
                  {drawerPaper.sampleScope && (
                    <p className="text-[11px] font-mono text-[#DDD8C4]/70 pt-1">
                      <strong className="text-[#DDD8C4] font-medium">{t.research.scope}:</strong> {drawerPaper.sampleScope}
                    </p>
                  )}
                </div>

                {/* 04 / KEY FINDINGS */}
                {drawerPaper.keyFindings && drawerPaper.keyFindings.length > 0 && (
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#DDD8C4] block font-medium">
                      {t.research.findings}
                    </span>
                    <ul className="space-y-2 text-xs font-mono text-[#DDD8C4]/85">
                      {drawerPaper.keyFindings.map((finding, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-[#989A6C] font-bold shrink-0">·</span>
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 05 / AWARDS & RECOGNITION */}
                {drawerPaper.awardId && (
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xs space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#DDD8C4]">
                      <Award className="w-4 h-4 text-[#989A6C]" />
                      <span className="uppercase font-semibold tracking-wider">
                        {isVi ? 'Giải thưởng liên quan' : 'Associated Honor & Recognition'}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[#DDD8C4]/80">
                      {drawerPaper.awardDescription || (isVi ? 'Bài nghiên cứu này đã đạt được giải thưởng xuất sắc tại cuộc thi quốc tế.' : 'This research paper earned premier recognition in international competition.')}
                    </p>
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setDrawerPaper(null);
                          onNavigate('honors', drawerPaper.awardId);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#989A6C] hover:text-[#DDD8C4] transition-colors cursor-pointer"
                      >
                        <span>{t.research.viewAward}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="sticky bottom-0 z-20 px-6 py-4 border-t border-white/10 bg-[#23261D]/95 backdrop-blur-sm flex justify-between items-center text-xs font-mono text-[#DDD8C4]/70">
              <span>{isVi ? 'Lưu trữ nghiên cứu học thuật' : 'Academic Research Showcase'}</span>
              <button
                type="button"
                onClick={() => setDrawerPaper(null)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {isVi ? 'Đóng bảng' : 'Close Panel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Academic Document / PDF Modal Reader */}
      {selectedPdf && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-5 md:p-8 animate-fade-in">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedPdf(null)}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <div
            className="relative w-full max-w-5xl h-[92vh] max-h-[92vh] bg-[#1E2019] text-[#F2EBDD] border border-white/20 shadow-2xl rounded-xs z-10 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/15 bg-[#23261D] shrink-0">
              <div className="space-y-0.5 max-w-[65%] sm:max-w-[75%]">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest bg-white/10 text-[#DDD8C4] px-2 py-0.5 rounded-xs border border-white/15">
                    {isVi ? 'Trình đọc tài liệu' : 'Document Viewer'}
                  </span>
                  <span className="text-xs font-mono text-[#DDD8C4]/70 truncate hidden sm:inline">
                    {selectedPdf.journal}
                  </span>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-[#F2EBDD] truncate">
                  {selectedPdf.title}
                </h3>
              </div>

              {/* Header Right Actions */}
              <div className="flex items-center gap-2">
                <a
                  href={selectedPdf.url}
                  download={selectedPdf.title.toLowerCase().replace(/\s+/g, '-') + '.pdf'}
                  className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xs text-[#DDD8C4] hover:text-white bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-mono inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Download Document"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.education.downloadPdf}</span>
                </a>

                <a
                  href={selectedPdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xs text-[#DDD8C4] hover:text-white bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-mono inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Open in new tab"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.education.openFull}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedPdf(null)}
                  className="p-1.5 rounded-xs text-white/70 hover:text-white hover:bg-white/15 border border-white/10 transition-colors cursor-pointer ml-1"
                  aria-label="Close PDF viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer / Object Frame */}
            <div className="flex-1 w-full h-full bg-[#141611] relative overflow-hidden flex flex-col">
              <iframe
                src={`${selectedPdf.url}#toolbar=1&navpanes=0&scrollbar=1`}
                title={selectedPdf.title}
                className="w-full h-full border-0 flex-1"
              />
            </div>

            {/* Modal Bottom Bar */}
            <div className="px-5 py-2.5 border-t border-white/15 bg-[#23261D] flex items-center justify-between text-xs font-mono text-[#DDD8C4]/70 shrink-0">
              <span className="text-[11px] truncate">
                {selectedPdf.doi ? `DOI: ${selectedPdf.doi}` : `${selectedPdf.journal} · Documentation`}
              </span>

              <div className="flex items-center gap-3">
                <a
                  href={selectedPdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#F2EBDD] hover:underline inline-flex items-center gap-1"
                >
                  {isVi ? 'Mở trong trình duyệt' : 'Open in browser'} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
