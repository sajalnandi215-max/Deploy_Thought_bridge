import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Users, MessageSquare, UserPlus, Check } from "lucide-react";
import { AppLayout } from "@/layouts/AppLayout";
import { notifications } from "@/data/mockData";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications · ThoughtBridge" }] }),
  component: Notifications,
});

const icons = {
  message: MessageCircle,
  room: Users,
  reply: MessageSquare,
  friend: UserPlus,
} as const;

function Notifications() {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center justify-between mb-6 animate-slide-up">
          <div>
            <h1 className="font-display text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground mt-1 text-sm">Your quiet activity from a noisy world.</p>
          </div>
          <button className="text-sm text-primary font-semibold flex items-center gap-1.5 hover:underline">
            <Check className="h-4 w-4" /> Mark all read
          </button>
        </div>

        <div className="rounded-2xl glass overflow-hidden">
          {notifications.map((n, i) => {
            const Icon = icons[n.type as keyof typeof icons];
            return (
              <div
                key={n.id}
                className={`flex items-center gap-4 p-4 border-b border-border last:border-0 hover:bg-muted/40 transition cursor-pointer animate-fade-in ${n.unread ? "bg-primary/[0.04]" : ""}`}
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <div className={`h-11 w-11 shrink-0 rounded-xl flex items-center justify-center ${n.unread ? "bg-gradient-brand text-white shadow-glow" : "bg-muted text-muted-foreground"}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${n.unread ? "font-semibold" : ""}`}>{n.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                </div>
                {n.unread && <span className="h-2 w-2 rounded-full bg-primary" />}
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
