import { createFileRoute } from "@tanstack/react-router";
import { Users, ArrowRight, TrendingUp } from "lucide-react";
import { AppLayout } from "@/layouts/AppLayout";
import { rooms, trending } from "@/data/mockData";

export const Route = createFileRoute("/rooms")({
  head: () => ({ meta: [{ title: "Thought Rooms · ThoughtBridge" }] }),
  component: Rooms,
});

function Rooms() {
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-end justify-between mb-8 animate-slide-up">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Thought Rooms</h1>
            <p className="mt-2 text-muted-foreground">Live rooms full of strangers thinking out loud.</p>
          </div>
          <button className="hidden md:inline-flex h-10 px-4 rounded-full bg-gradient-brand text-white text-sm font-semibold shadow-glow hover:scale-105 transition">
            + Create Room
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {rooms.map((r, i) => (
              <article key={r.id} className="group rounded-2xl glass p-5 hover:border-primary/40 hover:-translate-y-1 transition-all animate-slide-up" style={{ animationDelay: `${i * 0.04}s` }}>
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-xl bg-gradient-brand flex items-center justify-center text-2xl shadow-glow">
                    {r.vibe}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs text-success font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                    {r.active.toLocaleString()}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{r.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{r.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="h-3.5 w-3.5" /> {r.active.toLocaleString()} active
                  </div>
                  <button className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Join <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl glass p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-4 w-4 text-primary" />
                <h3 className="font-display font-semibold">Trending Now</h3>
              </div>
              <ul className="space-y-3">
                {trending.map((t, i) => (
                  <li key={t.tag} className="flex items-center justify-between cursor-pointer hover:bg-muted/40 -mx-2 px-2 py-1.5 rounded-lg transition">
                    <div>
                      <p className="text-xs text-muted-foreground">#{String(i + 1).padStart(2, "0")}</p>
                      <p className="font-semibold text-sm">{t.tag}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{t.posts} posts</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-gradient-brand p-5 text-white shadow-glow">
              <h3 className="font-display font-bold text-lg">Start your own room</h3>
              <p className="mt-1 text-sm text-white/85">Got a niche thought no room covers? Spin one up.</p>
              <button className="mt-4 w-full h-10 rounded-xl bg-white text-primary font-semibold text-sm hover:bg-white/90 transition">
                Create Room
              </button>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}
