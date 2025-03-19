import React from "react";
import Link from "next/link";

interface LinkButtonProps {
  href: string;
  bgColor?: string;
  textColor?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  bgColor = "bg-blue-500",
  textColor = "text-white",
  size = "md",
  className = "",
  children,
}) => {
  const sizeStyles: Record<string, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-10 py-3 text-lg",
  };

  return (
    <Link
      href={href}
      className={`inline-block rounded-xl font-medium transition duration-200 ${bgColor} ${textColor} ${sizeStyles[size]} hover:opacity-70 ${className}`}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
