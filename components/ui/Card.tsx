"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ className, children, hover = true, onClick }: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -6, boxShadow: "var(--shadow-lg)" } : {}}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={clsx(
        "bg-bg-primary rounded-2xl border border-border p-6",
        "[box-shadow:var(--shadow-sm)]",
        hover && "cursor-pointer",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
