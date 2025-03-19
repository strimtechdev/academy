"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
}

export function CustomButton({
  href,
  onClick,
  children,
  className,
  variant = "primary",
  size = "md",
  backgroundColor,
  textColor,
  disabled = false,
  ...props
}: ButtonProps) {
  // Base styles
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  // Variant styles
  const variants = {
    primary: "bg-white text-black hover:bg-white/90",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    outline: "border-2 border-white text-white hover:bg-white/10",
    ghost: "text-white hover:bg-white/10",
  };

  // Size styles
  const sizes = {
    sm: "h-8 px-4 text-sm",
    md: "h-10 px-6 text-base",
    lg: "h-12 px-8 text-lg",
    xl: "h-14 px-10 text-xl",
  };

  const buttonStyles = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    backgroundColor &&
      `bg-[${backgroundColor}] hover:bg-[${backgroundColor}]/90`,
    textColor && `text-[${textColor}]`,
    className
  );

  if (href) {
    return (
      <Link href={href} className={buttonStyles} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
