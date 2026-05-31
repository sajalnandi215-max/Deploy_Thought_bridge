import { Link } from "@tanstack/react-router";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const text = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-xl";
  const box = size === "lg" ? "h-10 w-10" : size === "sm" ? "h-7 w-7" : "h-9 w-9";
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className={`${box} relative rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow transition-transform group-hover:scale-105`}>
        <svg viewBox="0 0 24 24" className="h-1/2 w-1/2 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2z" />
          <path d="M8 13h8M8 17h5" />
        </svg>
      </div>
      <span className={`${text} font-display font-bold tracking-tight`}>
        Thought<span className="text-gradient">Bridge</span>
      </span>
    </Link>
  );
}
