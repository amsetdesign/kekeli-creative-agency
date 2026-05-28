"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { clsx } from "clsx";

type Variant = "gold" | "outline-gold" | "outline-purple" | "dark" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variants: Record<Variant, string> = {
  gold: "bg-gold text-black-soft font-semibold hover:bg-gold-light border border-gold",
  "outline-gold": "bg-transparent text-gold border border-gold hover:bg-gold-pale",
  "outline-purple": "bg-transparent text-purple border border-purple hover:bg-purple-pale",
  dark: "bg-black text-text-on-dark border border-black hover:bg-black-soft",
  ghost: "bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-secondary border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  variant = "gold",
  size = "md",
  href,
  className,
  children,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full font-body transition-colors duration-200 cursor-pointer select-none",
    variants[variant],
    sizes[size],
    disabled && "opacity-50 cursor-not-allowed",
    className,
  );

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.97 },
    transition: { duration: 0.15 },
  };

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
