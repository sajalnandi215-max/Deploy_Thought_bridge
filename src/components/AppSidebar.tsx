import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Compass, MessageCircle, Users, Sparkles, Bell, User, Settings, Home } from "lucide-react";
import { Logo } from "./Logo";
import { auth, db } from "@/lib/firebase"; // Ensure db is exported from firebase.ts
import { doc, onSnapshot } from "firebase/firestore";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/feed", label: "Thought Feed", icon: Sparkles },
  { to: "/chat", label: "Random Chat", icon: MessageCircle },
  { to: "/rooms", label: "Thought Rooms", icon: Users },
  { to: "/notifications", label: "Notifications", icon: Bell, badge: 3 },
  { to: "/profile", label: "Profile", icon: User },
];

export function AppSidebar() {
  const [profile, setProfile] = useState<any>(null);
  const path = useRouterState({ select: (r) => r.location.pathname });

  useEffect(() => {
    // Listen to Auth State to get the current UID
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Subscribe to real-time updates for this specific user in Firestore
        const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
          if (doc.exists()) {
            setProfile(doc.data());
          }
        });
        return () => unsub();
      } else {
        setProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-4 gap-1 sticky top-0 h-screen">
      <div className="px-2 py-3">
        <Logo />
      </div>
      <div className="mt-4 flex flex-col gap-1">
        {nav.map((item) => {
          const active = path === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "bg-gradient-brand text-white shadow-glow"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className="h-4.5 w-4.5" strokeWidth={2} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
      
      {/* Dynamic Profile Section */}
      <div className="mt-auto rounded-2xl glass p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-brand flex items-center justify-center text-lg overflow-hidden">
            {profile?.avatar?.startsWith('http') ? (
              <img src={profile.avatar} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              profile?.avatar || "🦊"
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">
              {profile?.displayName || "Stranger #482"}
            </p>
            <p className="text-xs text-muted-foreground">
              Reputation {profile?.reputation ?? 842}
            </p>
          </div>
          <Settings className="h-4 w-4 text-muted-foreground ml-auto" />
        </div>
      </div>
    </aside>
  );
}

export function MobileTabBar() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const items = nav.slice(0, 5);
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 glass border-t border-border px-2 py-2 flex justify-around">
      {items.map((item) => {
        const active = path === item.to;
        return (
          <Link key={item.to} to={item.to} className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${active ? "text-primary" : "text-muted-foreground"}`}>
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.label.split(" ")[0]}</span>
          </Link>
        );
      })}
    </nav>
  );
}