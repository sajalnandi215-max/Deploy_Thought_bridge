import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, SkipForward, Flag, Ban, X, Smile } from "lucide-react";
import { AppLayout } from "@/layouts/AppLayout";
import { chatMessages } from "@/data/mockData";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "Random Chat · ThoughtBridge" }] }),
  component: Chat,
});

function Chat() {
  const [msgs, setMsgs] = useState(chatMessages);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { id: String(Date.now()), from: "me", text, time: "now" }]);
    setText("");
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] flex">
        {/* Stranger info panel */}
        <aside className="hidden md:flex w-72 border-r border-border bg-card/30 flex-col p-6">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="h-24 w-24 rounded-3xl bg-gradient-brand flex items-center justify-center text-5xl shadow-glow">
                🐙
              </div>
              <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-success border-2 border-card" />
            </div>
            <h2 className="mt-4 font-display text-xl font-bold">Stranger #119</h2>
            <p className="text-xs text-success flex items-center justify-center gap-1.5 mt-1">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Online now
            </p>
          </div>
          <div className="mt-6 space-y-3">
            <div className="rounded-xl glass p-3">
              <p className="text-xs text-muted-foreground">Shared interests</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["Tech", "Startups", "Late Night"].map((t) => (
                  <span key={t} className="text-xs rounded-full bg-primary/15 text-primary px-2 py-1 font-medium">{t}</span>
                ))}
              </div>
            </div>
            <div className="rounded-xl glass p-3 text-xs">
              <p className="text-muted-foreground">Reputation</p>
              <p className="text-foreground font-semibold text-base mt-1">⭐ 4.8 · 217 chats</p>
            </div>
          </div>
          <div className="mt-auto space-y-2">
            <button className="w-full h-10 rounded-xl bg-muted hover:bg-accent text-sm font-medium flex items-center justify-center gap-2 transition">
              <Flag className="h-4 w-4" /> Report user
            </button>
            <button className="w-full h-10 rounded-xl bg-muted hover:bg-accent text-sm font-medium flex items-center justify-center gap-2 transition">
              <Ban className="h-4 w-4" /> Block user
            </button>
          </div>
        </aside>

        {/* Chat area */}
        <section className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between px-4 md:px-6 h-14 border-b border-border bg-card/20">
            <div className="flex items-center gap-3 md:hidden">
              <div className="h-9 w-9 rounded-xl bg-gradient-brand flex items-center justify-center text-lg">🐙</div>
              <div>
                <p className="text-sm font-semibold">Stranger #119</p>
                <p className="text-[10px] text-success">Online</p>
              </div>
            </div>
            <p className="hidden md:block text-sm text-muted-foreground">Matched on shared interests · End-to-end anonymous</p>
            <div className="flex items-center gap-2">
              <button className="h-9 px-3 rounded-lg bg-muted hover:bg-accent text-xs font-medium flex items-center gap-1.5 transition">
                <SkipForward className="h-3.5 w-3.5" /> Next
              </button>
              <button className="h-9 w-9 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 flex items-center justify-center transition">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-3">
            <div className="text-center text-xs text-muted-foreground">— You connected with Stranger #119 —</div>
            {msgs.map((m) => (
              <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"} animate-fade-in`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.from === "me"
                    ? "bg-gradient-brand text-white rounded-br-sm"
                    : "glass rounded-bl-sm"
                }`}>
                  {m.text}
                  <div className={`text-[10px] mt-1 ${m.from === "me" ? "text-white/70" : "text-muted-foreground"}`}>{m.time}</div>
                </div>
              </div>
            ))}
            <div className="flex justify-start animate-fade-in">
              <div className="glass rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse" />
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "0.15s" }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "0.3s" }} />
              </div>
            </div>
          </div>

          <div className="border-t border-border bg-card/30 p-3 md:p-4">
            <div className="flex items-end gap-2">
              <button className="h-11 w-11 shrink-0 rounded-xl hover:bg-muted flex items-center justify-center text-muted-foreground transition">
                <Smile className="h-5 w-5" />
              </button>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                rows={1}
                placeholder="Type a message…"
                className="flex-1 resize-none rounded-xl bg-muted/60 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring max-h-32"
              />
              <button onClick={send} className="h-11 w-11 shrink-0 rounded-xl bg-gradient-brand text-white flex items-center justify-center shadow-glow hover:scale-105 transition">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
