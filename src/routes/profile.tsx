import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Settings, Award, MessageCircle, Users, Star } from "lucide-react";
import { AppLayout } from "@/layouts/AppLayout";
import { interests } from "@/data/mockData";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile · ThoughtBridge" }] }),
  component: Profile,
});

function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for auth to be fully initialized before setting up Firestore listener
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, now set up Firestore listener
        const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
          if (doc.exists()) {
            setProfile(doc.data());
          }
          setLoading(false);
        });
        return () => unsub();
      } else {
        // User not authenticated
        setLoading(false);
      }
    });

    return () => unsubAuth();
  }, []);

  // Use dynamic stats if available, otherwise fallback to 0
  const stats = [
    { label: "Conversations", value: profile?.conversations || 0, icon: MessageCircle },
    { label: "Rooms Joined", value: profile?.roomsJoined || 0, icon: Users },
    { label: "Reputation", value: profile?.reputation || 0, icon: Star },
    { label: "Badges", value: profile?.badges || 0, icon: Award },
  ];

  if (loading) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
          <div className="rounded-3xl glass p-8 md:p-10 animate-pulse">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="h-28 w-28 rounded-3xl bg-gradient-brand flex items-center justify-center text-6xl shadow-glow bg-muted/50" />
              <div className="flex-1 space-y-3">
                <div className="h-8 bg-muted rounded-lg w-64" />
                <div className="h-4 bg-muted rounded-lg w-40" />
                <div className="h-6 bg-muted rounded-full w-32" />
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!profile) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
          <div className="rounded-3xl glass p-8 md:p-10 text-center">
            <p className="text-muted-foreground">Profile data not found. Please log in again.</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <div className="rounded-3xl glass p-8 md:p-10 relative overflow-hidden animate-slide-up">
          <div className="absolute inset-0 -z-0 opacity-50" style={{ background: "var(--gradient-glow)" }} />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="h-28 w-28 rounded-3xl bg-gradient-brand flex items-center justify-center text-6xl shadow-glow overflow-hidden">
              {profile?.avatar?.startsWith('http') ? (
                <img src={profile.avatar} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                profile?.avatar || "🦊"
              )}
            </div>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold">{profile?.displayName || "Loading..."}</h1>
              <p className="text-muted-foreground mt-1">Anonymous since · {profile?.joinDate || "..."}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="text-xs rounded-full bg-success/15 text-success px-2.5 py-1 font-medium">Top Contributor</span>
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
            {profile?.interests && profile.interests.length > 0 ? (
              profile.interests.map((interestId: string) => {
                const interest = interests.find(i => i.id === interestId)
                return interest ? (
                  <span key={interest.id} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm font-medium">
                    {interest.emoji} {interest.name}
                  </span>
                ) : null
              })
            ) : (
              <p className="text-muted-foreground text-sm">No interests selected yet. <a href="/onboarding" className="text-primary hover:underline">Add interests</a></p>
            )}
          </div>
        </section>

        {/* Recent Activity remains static as per your design */}
        <section className="mt-6 rounded-2xl glass p-6">
          <h2 className="font-display text-xl font-bold mb-4">Recent Activity</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between py-2"><span>Welcome to ThoughtBridge!</span> <span className="text-xs text-muted-foreground">Just now</span></li>
          </ul>
        </section>
      </div>
    </AppLayout>
  );
}