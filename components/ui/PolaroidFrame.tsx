import type { ReactNode } from "react";

type PolaroidFrameProps = {
  children: ReactNode;
  className?: string;
};

export function PolaroidFrame({ children, className = "" }: PolaroidFrameProps) {
  return (
    <div
      className={`rounded-[var(--radius-lg)] bg-[color:var(--surface-container-lowest)] p-3 shadow-[var(--shadow-ambient)] ${className}`.trim()}
    >
      {children}
    </div>
  );
}
