import React, { useEffect } from 'react';
import { X, ExternalLink, Download, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

export interface CertificateModalData {
  title: string;
  test: string;
  score: string;
  date: string;
  descriptor?: string;
  pdfUrl: string;
}

interface CertificateViewerProps {
  cert: CertificateModalData | null;
  onClose: () => void;
}

/** Full-screen PDF viewer for score reports and certificates (Education, Academic Snapshot). */
export const CertificateViewer: React.FC<CertificateViewerProps> = ({ cert, onClose }) => {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language];
  const selectedCert = cert;

  // Lock body scroll and close on Esc while open
  useEffect(() => {
    if (!cert) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onKey);
    };
  }, [cert, onClose]);

  if (!selectedCert) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/70 backdrop-blur-xs"
      onClick={() => onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#F8F6F1] text-[#292929] border border-[#292929]/20 shadow-2xl rounded-xs flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#181816] text-[#F2EBDD] flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono text-[#989A6C] uppercase tracking-wider">
              {isVi ? 'Chứng nhận học thuật' : 'Academic Credential'}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#F2EBDD] tracking-tight">
              {selectedCert.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={selectedCert.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-[#F2EBDD] text-xs font-mono rounded-xs transition-colors flex items-center gap-1.5"
              title="Open in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#989A6C]" />
              <span className="hidden sm:inline">{t.education.openFull}</span>
            </a>

            <a
              href={selectedCert.pdfUrl}
              download
              className="px-3 py-1.5 bg-[#676749] hover:bg-[#7e8354] text-[#F2EBDD] text-xs font-mono font-medium rounded-xs transition-colors flex items-center gap-1.5"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.education.downloadPdf}</span>
            </a>

            <button
              onClick={() => onClose()}
              className="p-1.5 text-[#F2EBDD]/60 hover:text-[#F2EBDD] hover:bg-white/10 rounded-xs transition-colors cursor-pointer ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Score & Detail Bar */}
        <div className="px-6 py-2.5 bg-[#EAE2D2] border-b border-[#292929]/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#292929]">{selectedCert.test}:</span>
            <span className="text-[#676749] font-bold">{isVi ? 'Điểm số ' : 'Score '}{selectedCert.score}</span>
          </div>
          <span className="text-[#676749]">{selectedCert.date}</span>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 w-full min-h-[500px] max-h-[calc(90vh-140px)] bg-[#292929] relative overflow-hidden flex items-center justify-center">
          <object
            data={selectedCert.pdfUrl}
            type="application/pdf"
            className="w-full h-full min-h-[500px] border-none"
          >
            <div className="p-8 text-center text-white space-y-4 max-w-md">
              <FileText className="w-10 h-10 text-[#989A6C] mx-auto" />
              <h4 className="text-base font-bold">{isVi ? 'Tài liệu PDF sẵn sàng' : 'PDF Document Ready'}</h4>
              <p className="text-xs text-white/70">
                {isVi ? 'Trình duyệt của bạn không hỗ trợ nhúng trực tiếp file PDF. Bạn có thể mở xem hoặc tải tài liệu bên dưới:' : 'Your browser does not support embedded PDF viewing. You can view or download the verified document directly:'}
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <a
                  href={selectedCert.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#676749] text-white text-xs font-mono rounded-xs font-medium inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  {t.education.openFull}
                </a>
              </div>
            </div>
          </object>
        </div>
      </div>
    </div>
  );
};
