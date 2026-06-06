import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, Sparkles, TrendingUp } from "lucide-react";
import { AppLayout } from "@/layouts/AppLayout";
import { aiSuggestions, trending } from "@/data/mockData";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, getDoc } from "firebase/firestore";

export const Route = createFileRoute("/feed")({
  head: () => ({ meta: [{ title: "Thought Feed · ThoughtBridge" }] }),
  component: Feed,
});

function Feed() {
  const navigate = useNavigate();
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [text, setText] = useState("");
  const [thoughts, setThoughts] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);

  // 1. Fetch real-time thoughts
  useEffect(() => {
    const q = query(collection(db, "thoughts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setThoughts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // 2. Fetch current user profile from Firestore
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } else {
        navigate({ to: "/login" });
      }
    });
    return () => unsubscribe();
  }, []);

  // 3. Handle Posting using the fetched userData
  const handlePostThought = async () => {
    if (!text.trim() || !userData) return;

    try {
      await addDoc(collection(db, "thoughts"), {
        content: text,
        author: userData.displayName || "Anonymous",
        avatar: userData.photoURL || "👤",
        createdAt: serverTimestamp(),
        userId: auth.currentUser?.uid,
      });
      setText("");
    } catch (e) {
      console.error("Error posting thought: ", e);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 grid lg:grid-cols-[1fr_320px] gap-8">
        <div className="pb-24">
          <div className="space-y-4">
            {thoughts.map((t, i) => (
              <article key={t.id} className="rounded-2xl glass p-5 hover:border-primary/30 transition animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <header className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-brand flex items-center justify-center text-lg">{t.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{t.author}</p>
                    <p className="text-xs text-muted-foreground">Just now · <span className="text-primary">#General</span></p>
                  </div>
                </header>
                <p className="mt-4 text-[15px] leading-relaxed">{t.content}</p>
                <footer className="mt-4 flex items-center gap-1 text-muted-foreground">
                  <button onClick={() => setLiked((l) => ({ ...l, [t.id]: !l[t.id] }))} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-destructive/10 transition ${liked[t.id] ? "text-destructive" : ""}`}>
                    <Heart className={`h-4 w-4 ${liked[t.id] ? "fill-current" : ""}`} />
                    <span className="text-xs font-medium">{t.likes + (liked[t.id] ? 1 : 0)}</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-primary/10 hover:text-primary transition">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs font-medium">{t.comments}</span>
                  </button>
                </footer>
              </article>
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-64 right-0 p-4 bg-slate-900/95 backdrop-blur border-t border-indigo-500/30 z-50">
          <div className="max-w-4xl mx-auto flex gap-3 items-center">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share a thought, anonymously..."
              className="flex-1 bg-slate-950 border border-indigo-500/50 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={1}
            />
            <button 
              onClick={handlePostThought}
              disabled={!text.trim()}
              className="h-10 px-6 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition disabled:opacity-50"
            >
              Post
            </button>
          </div>
        </div>

        <aside className="hidden lg:block space-y-5 sticky top-20 self-start">
          <div className="rounded-2xl bg-gradient-brand p-5 text-white shadow-glow">
            <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><Sparkles className="h-4 w-4" /> AI Topic Suggestions</h3>
            <ul className="space-y-3">{aiSuggestions.map((s, i) => <li key={i} className="text-sm bg-white/10 rounded-xl p-3">{s}</li>)}</ul>
          </div>
          <div className="rounded-2xl glass p-5">
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Trending Discussions</h3>
            <ul className="space-y-2.5">{trending.map((t) => <li key={t.tag} className="flex justify-between text-sm">{t.tag} <span className="text-muted-foreground">{t.posts}</span></li>)}</ul>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}