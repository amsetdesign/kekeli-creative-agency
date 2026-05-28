import { clsx } from "clsx";

type Variant = "gold" | "purple" | "dark" | "light";

interface BadgeProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

const variants: Record<Variant, string> = {
  gold: "bg-gold-pale text-gold-dark border border-[var(--border-gold)]",
  purple: "bg-purple-pale text-purple border border-[var(--border-purple)]",
  dark: "bg-black text-text-on-dark",
  light: "bg-bg-secondary text-text-muted border border-border",
};

export default function Badge({ variant = "gold", className, children }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
