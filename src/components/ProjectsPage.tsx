import React, { useState } from 'react';
import { PageId } from '../types';
import { getProjects } from '../data/portfolioData';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface ProjectsPageProps {
  onOpenCaseStudy?: (projectId: string) => void;
  onNavigate: (page: PageId) => void;
  /** Show "Coming soon" placeholder cards to keep three slots. Set false to
   *  deploy with only the real project(s). */
  showComingSoonSlots?: boolean;
}

/* ---------------------------------------------------------------------------
 * TEMPLATE placeholder copy for the case-study blocks. Lorem sized to the
 * expected real length (~60–80 words). Real copy goes into
 * portfolioData.ts (ProjectItem.caseStudy.*).
 * ------------------------------------------------------------------------- */
const PLACEHOLDER = {
  problem:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur sint occaecat.',
  dataInput:
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus, nec venenatis nisl condimentum sit amet. Nunc porttitor arcu quis vestibulum bibendum, velit turpis dignissim nibh, ut consequat orci lacus id massa donec sollicitudin.',
  whatItDoes:
    'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Etiam porta sem malesuada magna mollis euismod, eget suscipit sapien fermentum non. Nulla facilisi, sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum, aenean lacinia bibendum nulla sed consectetur integer posuere.',
  validation:
    'Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et bibendum nibh euismod.',
  decisions: [
    {
      decision: 'Shipped a rule-based baseline before building any model',
      reason:
        'It set a measurable floor and made every later improvement attributable to the model itself rather than to changes in the surrounding data pipeline.',
    },
    {
      decision: 'Kept the feature set small and human-readable',
      reason:
        'Fewer inputs meant faster iteration and predictions a non-technical reviewer could still follow line by line without a walkthrough.',
    },
    {
      decision: 'Deferred the interface until the core logic was stable',
      reason:
        'The front-end would have churned with every change to the underlying rules, so building it early would have meant rebuilding it twice.',
    },
  ],
  limits: [
    'Validated on a small sample, so the numbers may not generalise beyond the specific cases that were actually tested.',
    'The pipeline assumes clean, well-formed input and has no handling for malformed or missing records yet.',
    'No automated retraining — the model is a static snapshot and will drift as the underlying conditions change.',
  ],
};

// Olive section shares the Leadership treatment. Reading text uses the primary
// tone (#EDE8DC, ~5.2:1 on #5C6247); mono chrome uses the dim tone (#C8C3B4).
const SECTION =
  'w-full bg-[#5C6247] text-[#EDE8DC] border-b border-black/15 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-16 sm:py-24 md:py-28 select-none';
const CONTAINER = 'max-w-6xl xl:max-w-7xl 2xl:max-w-[1500px] mx-auto w-full';

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onNavigate,
  showComingSoonSlots = true,
}) => {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language];
  const projects = getProjects(language);
  const [activeId, setActiveId] = useState<string | null>(null);

  const L = {
    problem: isVi ? 'Vấn đề' : 'The Problem',
    data: isVi ? 'Dữ liệu & đầu vào' : 'Data & Input',
    does: isVi ? 'Chức năng' : 'What It Does',
    validation: isVi ? 'Kiểm chứng' : 'Validation',
    decisions: isVi ? 'Quyết định' : 'Decisions',
    limits: isVi ? 'Giới hạn' : 'Limits',
    status: isVi ? 'Trạng thái' : 'Status',
    timeline: isVi ? 'Thời gian' : 'Timeline',
    role: isVi ? 'Vai trò' : 'Role',
    stack: isVi ? 'Công nghệ' : 'Stack',
    live: isVi ? 'Bản demo' : 'Live demo',
    source: isVi ? 'Mã nguồn' : 'Source',
    screenshot: isVi ? 'ảnh chụp' : 'screenshot',
    allProjects: isVi ? 'Tất cả dự án' : 'All projects',
    prevProject: isVi ? 'Dự án trước' : 'Previous project',
    nextProject: isVi ? 'Dự án tiếp' : 'Next project',
    viewCase: isVi ? 'Xem case study' : 'View case study',
    tbd: isVi ? 'chưa có' : 'not yet',
    inProgress: isVi ? 'Đang thực hiện' : 'In progress',
    comingSoon: isVi ? 'Sắp có' : 'Coming soon',
    liveTag: isVi ? 'Đang làm' : 'Live',
  };
  const eyebrow = isVi ? '04 / DỰ ÁN' : '04 / PROJECTS';

  const scrollToTop = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const hasIndex = showComingSoonSlots || projects.length > 1;
  const activeProject = activeId
    ? projects.find((p) => p.id === activeId)
    : hasIndex
    ? null
    : projects[0];

  // Shared footer nav — "← Education / Research →" with hover underline
  const navLink =
    'inline-flex items-center gap-2 border-b border-transparent pb-0.5 transition-colors cursor-pointer';
  const FooterNav = () => (
    <div className="mt-16 flex items-center justify-between border-t border-[#EDE8DC]/15 pt-6 font-mono text-xs">
      <button
        onClick={() => onNavigate('education')}
        className={`${navLink} text-[#C8C3B4] hover:border-[#C8C3B4] hover:text-[#EDE8DC]`}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>{t.projects.prevSection}</span>
      </button>
      <button
        onClick={() => onNavigate('research')}
        className={`${navLink} font-medium text-[#EDE8DC] hover:border-[#EDE8DC]`}
      >
        <span>{t.projects.nextSection}</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );

  // ===================================================================
  // CASE STUDY DETAIL
  // ===================================================================
  if (activeProject) {
    const project = activeProject;
    const cs = project.caseStudy;
    const decisions = cs.decisions && cs.decisions.length ? cs.decisions : PLACEHOLDER.decisions;
    const limits = cs.limits && cs.limits.length ? cs.limits : PLACEHOLDER.limits;

    const blockLabel =
      'block font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[#C8C3B4]';
    const bodyText = 'max-w-[65ch] text-[16px] sm:text-[17px] leading-[1.65] text-[#EDE8DC]';

    const MetaLink = ({ href, label }: { href?: string; label: string }) =>
      href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-[#EDE8DC] underline-offset-4 transition-colors hover:underline"
        >
          <span>{label}</span>
          <ArrowUpRight className="h-3 w-3" />
        </a>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex cursor-not-allowed select-none items-center gap-1 text-[#C8C3B4]"
        >
          <span>{label}</span>
          <span className="text-[10px] tracking-wide">— {L.tbd}</span>
        </span>
      );

    const imageFrame =
      'flex items-center justify-center overflow-hidden rounded border border-[#EDE8DC]/15 bg-[#EDE8DC]/[0.06]';

    return (
      <section id="projects" className={SECTION}>
        {/* narrower reading column for the long-form study */}
        <div className="max-w-4xl mx-auto w-full">
          {hasIndex && (
            <button
              type="button"
              onClick={() => setActiveId(null)}
              className="mb-10 inline-flex cursor-pointer items-center gap-1.5 font-mono text-xs text-[#C8C3B4] transition-colors hover:text-[#EDE8DC]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{L.allProjects}</span>
            </button>
          )}

          {/* 1 — Header */}
          <header className="max-w-[65ch] space-y-4">
            <span className="block font-mono text-xs uppercase tracking-[0.2em] text-[#C8C3B4]">
              {isVi ? '04 / DỰ ÁN' : '04 / PROJECT'}
            </span>
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-[#EDE8DC] sm:text-5xl md:text-[3.25rem]">
              {project.name}
            </h1>
            <p className="text-lg leading-relaxed text-[#EDE8DC] sm:text-xl">
              {project.summary || cs.overview}
            </p>
          </header>

          {/* 2 — Meta bar (the two rules allowed on this screen) */}
          <div className="mt-10 flex flex-col gap-x-8 gap-y-4 border-y border-[#EDE8DC]/15 py-4 lg:flex-row lg:items-center">
            <dl className="flex flex-1 flex-wrap gap-x-8 gap-y-3 font-mono text-xs">
              {(
                [
                  [L.status, project.status || L.inProgress],
                  [L.timeline, project.timeline || project.year],
                  [L.role, project.role],
                  [L.stack, project.tools.join(' · ')],
                ] as [string, string][]
              ).map(([k, v]) => (
                <div key={k} className="flex min-w-0 flex-col gap-0.5">
                  <dt className="uppercase tracking-[0.15em] text-[#C8C3B4]">{k}</dt>
                  <dd className="break-words text-[#EDE8DC]">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex shrink-0 items-center gap-5 font-mono text-xs">
              <MetaLink href={project.liveUrl} label={L.live} />
              <MetaLink href={project.sourceUrl} label={L.source} />
            </div>
          </div>

          {/* 3 — Hero visual */}
          <div className={`mt-10 aspect-[16/9] ${imageFrame}`}>
            {project.heroImage ? (
              <img
                src={project.heroImage}
                alt={project.name}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#C8C3B4]">
                {L.screenshot}
              </span>
            )}
          </div>

          {/* 4 — Content blocks (separated by space, not rules) */}
          <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-20">
            <div className="space-y-3">
              <span className={blockLabel}>{L.problem}</span>
              <p className={bodyText}>{PLACEHOLDER.problem}</p>
            </div>

            <div className="space-y-3">
              <span className={blockLabel}>{L.data}</span>
              <p className={bodyText}>{cs.dataInput || PLACEHOLDER.dataInput}</p>
            </div>

            <div className="space-y-5">
              <span className={blockLabel}>{L.does}</span>
              <p className={bodyText}>{cs.whatItDoes || PLACEHOLDER.whatItDoes}</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[0, 1].map((i) => (
                  <div key={i} className={`aspect-[4/3] ${imageFrame}`}>
                    {project.detailImages && project.detailImages[i] ? (
                      <img
                        src={project.detailImages[i]}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C8C3B4]">
                        {L.screenshot}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <span className={blockLabel}>{L.validation}</span>
              <p className={bodyText}>{cs.validation || PLACEHOLDER.validation}</p>
            </div>

            <div className="space-y-4">
              <span className={blockLabel}>{L.decisions}</span>
              <ol className="max-w-[65ch] space-y-5">
                {decisions.map((d, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="shrink-0 pt-1.5 font-mono text-xs text-[#C8C3B4]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="space-y-1">
                      <p className="text-[16px] font-semibold leading-snug text-[#EDE8DC] sm:text-[17px]">
                        {d.decision}
                      </p>
                      <p className="text-[15px] leading-[1.6] text-[#EDE8DC]/90">{d.reason}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-4">
              <span className={blockLabel}>{L.limits}</span>
              <ul className="max-w-[65ch] space-y-3">
                {limits.map((lim, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[16px] leading-[1.6] text-[#EDE8DC] sm:text-[17px]"
                  >
                    <span className="shrink-0 text-[#C8C3B4]" aria-hidden="true">
                      —
                    </span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <FooterNav />
        </div>
      </section>
    );
  }

  // ===================================================================
  // INDEX — Leadership-style cards
  // ===================================================================
  const emptySlots = showComingSoonSlots ? Math.max(0, 3 - projects.length) : 0;

  return (
    <section id="projects" className={SECTION}>
      <div className={`${CONTAINER} space-y-10`}>
        <header className="section-heading">
          <span className="block font-mono text-xs uppercase tracking-[0.2em] text-[#C8C3B4]">
            {eyebrow}
          </span>
          <h1 className="section-h1 font-bold tracking-tight text-[#EDE8DC] lg:whitespace-nowrap">
            {t.projects.title}
          </h1>
        </header>

        <div className="space-y-6">
          {projects.map((p) => (
            <article
              key={p.id}
              id={`project-card-${p.id}`}
              className="space-y-4 rounded border border-[#EDE8DC]/15 bg-[#EDE8DC]/[0.05] p-8 sm:p-10 transition-[transform,border-color] duration-150 hover:-translate-y-0.5 hover:border-[#EDE8DC]/30"
            >
              {/* top row: mono index · mono tag list */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs text-[#C8C3B4]">{p.number}</span>
                <span className="font-mono text-[11px] tracking-wide text-[#C8C3B4]">
                  {[...p.tools.slice(0, 3), p.liveUrl ? L.liveTag : L.inProgress].join(' · ')}
                </span>
              </div>

              <div className="space-y-1.5">
                <h2 className="text-2xl font-bold tracking-tight text-[#EDE8DC] sm:text-[1.7rem]">
                  {p.name}
                </h2>
                {/* project type / context — sans (it is a phrase, not a label) */}
                <span className="block text-[13px] text-[#C8C3B4]">
                  {p.tag} · {p.role}
                </span>
              </div>

              <p className="max-w-[65ch] text-[15px] leading-relaxed text-[#EDE8DC] sm:text-base">
                {p.summary || p.caseStudy.overview}
              </p>

              <button
                type="button"
                onClick={() => {
                  setActiveId(p.id);
                  scrollToTop();
                }}
                className="mt-2 inline-flex cursor-pointer items-center gap-1.5 border-b border-[#EDE8DC]/40 pb-0.5 font-mono text-xs text-[#EDE8DC] transition-colors hover:border-[#EDE8DC]"
              >
                <span>{L.viewCase}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </article>
          ))}

          {Array.from({ length: emptySlots }).map((_, i) => (
            <div
              key={`slot-${i}`}
              aria-hidden="true"
              className="pointer-events-none flex min-h-[200px] select-none items-center justify-center rounded border border-dashed border-[#EDE8DC]/25 p-8 opacity-40 sm:p-10"
            >
              <span className="font-mono text-sm text-[#C8C3B4]">
                {String(projects.length + i + 1).padStart(2, '0')} — {L.comingSoon}
              </span>
            </div>
          ))}
        </div>

        <FooterNav />
      </div>
    </section>
  );
};
