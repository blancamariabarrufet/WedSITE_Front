"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "primary"
      ? "button-primary"
      : variant === "secondary"
        ? "button-secondary"
        : "button-tertiary";

  return (
    <button
      type={type}
      className={`${variantClass} ${fullWidth ? "w-full justify-center" : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
