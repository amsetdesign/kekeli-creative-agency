import { clsx } from "clsx";

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={clsx(centered && "text-center", className)}>
      {eyebrow && (
        <p className={clsx(
          "text-xs font-body font-semibold uppercase tracking-[0.2em] mb-3",
          light ? "text-gold-light" : "text-gold",
        )}>
          {eyebrow}
        </p>
      )}
      <h2 className={clsx(
        "font-display text-4xl md:text-5xl leading-tight",
        light ? "text-text-on-dark" : "text-text-primary",
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={clsx(
          "mt-4 text-base md:text-lg font-body leading-relaxed max-w-2xl",
          centered && "mx-auto",
          light ? "text-text-on-dark/70" : "text-text-muted",
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
