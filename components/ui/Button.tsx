"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  external?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#0066cc] text-white hover:bg-[#004499] active:bg-[#003377] shadow-sm hover:shadow-md",
  secondary:
    "bg-[#1d1d1f] text-white hover:bg-[#3d3d3f] active:bg-[#2d2d2f] shadow-sm hover:shadow-md",
  ghost:
    "bg-transparent text-[#0066cc] hover:bg-[#0066cc]/10 active:bg-[#0066cc]/20",
  outline:
    "bg-transparent border border-[#0066cc] text-[#0066cc] hover:bg-[#0066cc] hover:text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-xl",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  disabled = false,
  className = "",
  type = "button",
  external = false,
  icon,
  iconPosition = "right",
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0066cc] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="shrink-0">{icon}</span>
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className="inline-block"
      >
        <Link href={href} className={classes}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {content}
    </motion.button>
  );
}

export default Button;
