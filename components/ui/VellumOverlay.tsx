"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";

import { CloseIcon } from "@/components/ui/icons";

type VellumOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  panelClassName?: string;
  showClose?: boolean;
  align?: "center" | "top";
};

export function VellumOverlay({
  isOpen,
  onClose,
  children,
  className = "",
  panelClassName = "",
  showClose = true,
  align = "center",
}: VellumOverlayProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`vellum-overlay ${className}`.trim()} role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Close overlay"
        className="absolute inset-0 h-full w-full cursor-default"
        onClick={onClose}
      />
      <div
        className={`relative z-10 flex min-h-full w-full px-4 py-6 sm:px-6 ${align === "top" ? "items-start" : "items-center"} justify-center`}
      >
        <div className={`vellum-panel ${panelClassName}`.trim()}>
          {showClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--primary)] transition-opacity hover:opacity-70"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
}
