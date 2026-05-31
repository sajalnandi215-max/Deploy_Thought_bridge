import { createFileRoute } from "@tanstack/react-router";
import { Settings, Award, MessageCircle, Users, Star } from "lucide-react";
import { AppLayout } from "@/layouts/AppLayout";
import { interests } from "@/data/mockData";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile · ThoughtBridge" }] }),
  component: Profile,
});

const myInterests = ["tech", "startups", "wellness", "books", "programming"];

function Profile() {
  const stats = [
    { label: "Conversations", value: "217", icon: MessageCircle },
    { label: "Rooms Joined", value: "12", icon: Users },
    { label: "Reputation", value: "842", icon: Star },
    { label: "Badges", value: "9", icon: Award },
  ];
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <div className="rounded-3xl glass p-8 md:p-10 relative overflow-hidden animate-slide-up">
          <div className="absolute inset-0 -z-0 opacity-50" style={{ background: "var(--gradient-glow)" }} />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="h-28 w-28 rounded-3xl bg-gradient-brand flex items-center justify-center text-6xl shadow-glow">🦊</div>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold">Stranger #482</h1>
              <p className="text-muted-foreground mt-1">Anonymous since · May 2026</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="text-xs rounded-full bg-success/15 text-success px-2.5 py-1 font-medium">Top Contributor</span>
                <span className="text-xs rounded-full bg-primary/15 text-primary px-2.5 py-1 font-medium">Late Night Regular</span>
              </div>
            </div>
            <button className="h-10 px-4 rounded-full glass border-border hover:bg-muted text-sm font-medium flex items-center gap-2 transition">
              <Settings className="h-4 w-4" /> Settings
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {stats.map((s, i) => (
            <div key={s.label} className="rounded-2xl glass p-5 animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <s.icon className="h-5 w-5 text-primary mb-3" />
              <p className="font-display text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <section className="mt-8 rounded-2xl glass p-6">
          <h2 className="font-display text-xl font-bold mb-4">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {interests.filter((i) => myInterests.includes(i.id)).map((i) => (
              <span key={i.id} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm font-medium">
                {i.emoji} {i.name}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl glass p-6">
          <h2 className="font-display text-xl font-bold mb-4">Recent Activity</h2>
          <ul className="space-y-3 text-sm">
            {[
              { t: "Posted a thought in Late Night Thoughts", time: "2h ago" },
              { t: "Joined room: Startup Founders", time: "1d ago" },
              { t: "Reached reputation 800 ⭐", time: "3d ago" },
              { t: "Completed 200 anonymous chats", time: "1w ago" },
            ].map((a, i) => (
              <li key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span>{a.t}</span>
                <span className="text-xs text-muted-foreground">{a.time}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppLayout>
  );
}
