import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { interests } from "@/data/mockData";

export const Route = createFileRoute("/interests")({
  head: () => ({ meta: [{ title: "Choose your interests · ThoughtBridge" }] }),
  component: Interests,
});

function Interests() {
  const [picked, setPicked] = useState<string[]>(["tech", "wellness"]);
  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <div className="min-h-screen bg-background bg-mesh">
      <div className="p-6"><Logo /></div>
      <div className="max-w-4xl mx-auto px-6 py-8 pb-32">
        <div className="text-center mb-10 animate-slide-up">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">Step 1 of 1</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">What's on your mind?</h1>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">Pick a few. We'll match you with strangers who care about the same things.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {interests.map((it, i) => {
            const active = picked.includes(it.id);
            return (
              <button
                key={it.id}
                onClick={() => toggle(it.id)}
                className={`group relative rounded-2xl p-5 text-left transition-all hover:-translate-y-1 animate-scale-in ${
                  active
                    ? "bg-gradient-brand text-white shadow-glow scale-[1.02]"
                    : "glass hover:border-primary/40"
                }`}
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <div className="text-3xl mb-3">{it.emoji}</div>
                <p className="font-semibold text-sm">{it.name}</p>
                {active && (
                  <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-white text-primary flex items-center justify-center">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 glass border-t border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{picked.length}</span> selected
          </p>
          <Link
            to="/feed"
            className={`inline-flex h-11 items-center gap-2 px-6 rounded-full font-semibold transition ${
              picked.length > 0 ? "bg-gradient-brand text-white shadow-glow hover:scale-[1.02]" : "bg-muted text-muted-foreground pointer-events-none"
            }`}
          >
            Continue <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
