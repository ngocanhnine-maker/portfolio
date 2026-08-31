import React, { useEffect, useRef } from 'react';

interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
  /** id of the element (inside children) that labels the dialog */
  labelledBy?: string;
  /** focus returns here on close */
  returnFocusRef?: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
}

const FOCUSABLE =
  'a[href],area[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Right-hand side drawer used across the site (Awards / Leadership).
 * - overlay dims + blurs the page behind it
 * - closes on X (rendered by the consumer), Esc, and overlay click
 * - locks page scroll; the panel scrolls on its own
 * - role="dialog" aria-modal, focus moves in on open and returns on close,
 *   Tab is trapped while open
 * - ≥900px: 40% width, slides from the right
 *   600–900px: full width, slides from the right
 *   <600px: bottom sheet, slides up
 * - prefers-reduced-motion: no slide, fade only
 */
export const SideDrawer: React.FC<SideDrawerProps> = ({
  open,
  onClose,
  labelledBy,
  returnFocusRef,
  children,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  // lock background scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // focus management: move focus in on open, Esc + Tab trap while open
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const list = (): HTMLElement[] =>
      (Array.from(panel.querySelectorAll(FOCUSABLE)) as HTMLElement[]).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );

    // let the panel render, then focus its first control (the close button).
    // preventScroll: the panel animates in from off-screen, and a plain focus()
    // would scroll the page to chase it (jumping the reader away from the section).
    const id = window.setTimeout(() => {
      (list()[0] ?? panel).focus({ preventScroll: true });
    }, 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const els = list();
      if (els.length === 0) {
        e.preventDefault();
        panel.focus({ preventScroll: true });
        return;
      }
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    document.addEventListener('keydown', onKey, true);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener('keydown', onKey, true);
    };
  }, [open, onClose]);

  // return focus to the trigger when the drawer closes (without scrolling to it)
  useEffect(() => {
    if (wasOpen.current && !open) {
      returnFocusRef?.current?.focus({ preventScroll: true });
    }
    wasOpen.current = open;
  }, [open, returnFocusRef]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end max-[599px]:items-end">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm [animation:drawer-overlay-in_200ms_ease-out_both]"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 flex h-full w-full flex-col overflow-y-auto bg-[#23261D] text-[#F2EBDD] shadow-2xl outline-none border-l border-white/12
                   min-[900px]:w-[40%] min-[900px]:min-w-[440px]
                   max-[599px]:h-[88%] max-[599px]:w-full max-[599px]:rounded-t-xl max-[599px]:border-l-0 max-[599px]:border-t
                   motion-safe:[animation:drawer-slide-right_300ms_cubic-bezier(0.4,0,0.2,1)_both]
                   motion-safe:max-[599px]:[animation:drawer-slide-up_300ms_cubic-bezier(0.4,0,0.2,1)_both]
                   motion-reduce:[animation:drawer-overlay-in_160ms_ease-out_both]"
      >
        {children}
      </div>
    </div>
  );
};
