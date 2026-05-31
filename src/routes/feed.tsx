import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, MessageCircle, Share2, Sparkles, TrendingUp, Image as ImageIcon } from "lucide-react";
import { AppLayout } from "@/layouts/AppLayout";
import { thoughts, aiSuggestions, trending } from "@/data/mockData";

export const Route = createFileRoute("/feed")({
  head: () => ({ meta: [{ title: "Thought Feed · ThoughtBridge" }] }),
  component: Feed,
});

function Feed() {
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [text, setText] = useState("");
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 grid lg:grid-cols-[1fr_320px] gap-8">
        <div>
          {/* Composer */}
          <div className="rounded-2xl glass p-5 mb-5 animate-fade-in">
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-brand flex items-center justify-center text-lg shrink-0">🦊</div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={2}
                placeholder="Share a thought, anonymously…"
                className="flex-1 resize-none bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <button className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted transition">
                <ImageIcon className="h-4 w-4" />
              </button>
              <button className="h-9 px-5 rounded-full bg-gradient-brand text-white text-sm font-semibold shadow-glow hover:scale-105 transition disabled:opacity-50 disabled:scale-100" disabled={!text.trim()}>
                Post Thought
              </button>
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {thoughts.map((t, i) => (
              <article key={t.id} className="rounded-2xl glass p-5 hover:border-primary/30 transition animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <header className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-brand flex items-center justify-center text-lg">{t.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.time} · <span className="text-primary">{t.tag}</span></p>
                  </div>
                </header>
                <p className="mt-4 text-[15px] leading-relaxed">{t.content}</p>
                <footer className="mt-4 flex items-center gap-1 text-muted-foreground">
                  <button
                    onClick={() => setLiked((l) => ({ ...l, [t.id]: !l[t.id] }))}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-destructive/10 hover:text-destructive transition ${liked[t.id] ? "text-destructive" : ""}`}
                  >
                    <Heart className={`h-4 w-4 ${liked[t.id] ? "fill-current" : ""}`} />
                    <span className="text-xs font-medium">{t.likes + (liked[t.id] ? 1 : 0)}</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-primary/10 hover:text-primary transition">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs font-medium">{t.comments}</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-accent transition ml-auto">
                    <Share2 className="h-4 w-4" />
                  </button>
                </footer>
              </article>
            ))}
            <div className="text-center py-8 text-sm text-muted-foreground">Loading more thoughts…</div>
          </div>
        </div>

        <aside className="hidden lg:block space-y-5 sticky top-20 self-start">
          <div className="rounded-2xl bg-gradient-brand p-5 text-white shadow-glow">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <h3 className="font-display font-semibold text-sm">AI Topic Suggestions</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {aiSuggestions.map((s, i) => (
                <li key={i} className="text-sm leading-relaxed bg-white/10 rounded-xl p-3 hover:bg-white/15 cursor-pointer transition">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl glass p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h3 className="font-display font-semibold text-sm">Trending Discussions</h3>
            </div>
            <ul className="space-y-2.5">
              {trending.map((t) => (
                <li key={t.tag} className="flex justify-between text-sm hover:bg-muted/50 -mx-2 px-2 py-1.5 rounded-lg cursor-pointer transition">
                  <span className="font-semibold">{t.tag}</span>
                  <span className="text-xs text-muted-foreground">{t.posts}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}
