import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Users, Shield, Sparkles, Globe, Zap } from "lucide-react";
import { Logo } from "@/components/Logo";
import { thoughts as mockThoughts } from "@/data/mockData";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ThoughtBridge — Share Your Thoughts. Meet New Minds." },
      {
        name: "description",
        content:
          "Connect anonymously with people around the world and discuss ideas, experiences, and interests.",
      },
      { property: "og:title", content: "ThoughtBridge" },
      {
        property: "og:description",
        content: "Anonymous social platform for ideas and real conversations.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);
        const data = snap.exists() ? snap.data() : null;

        const hasInterests = Array.isArray(data?.interests) && data!.interests.length > 0;

        // Only redirect to feed if the user has already selected interests
        if (hasInterests) {
          navigate({ to: "/feed" });
        }
      } catch (err) {
        console.error("Error checking user interests:", err);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background bg-mesh">
      {/* Nav */}
      <header className="sticky top-0 z-50 glass border-b border-border/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <Logo />
            <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
              <a href="/" className="hover:text-foreground transition">Home</a>
              <a href="#features" className="hover:text-foreground transition">Features</a>
              <a href="#testimonials" className="hover:text-foreground transition">Voices</a>
              <Link to="/rooms" className="hover:text-foreground transition">Rooms</Link>
            </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="hidden sm:inline-flex h-9 items-center px-4 text-sm font-medium hover:text-primary transition"
            >
              Login
            </Link>
            <Link
              to="/login"
              className="inline-flex h-9 items-center px-4 rounded-full bg-gradient-brand text-white text-sm font-semibold shadow-glow hover:opacity-90 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-glow)" }} />
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground mb-8 animate-fade-in">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
            12,482 strangers online right now
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] animate-slide-up">
            Share Your Thoughts. <br />
            <span className="text-gradient">Meet New Minds.</span>
          </h1>
          <p
            className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Connect anonymously with people around the world and discuss ideas, experiences, and
            interests — without the noise of profiles, followers, or feeds tuned to outrage.
          </p>
          <div
            className="mt-10 flex flex-col sm:flex-row gap-3 justify-center animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Link
              to="/login"
              className="group inline-flex h-12 items-center justify-center gap-2 px-7 rounded-full bg-gradient-brand text-white font-semibold shadow-glow hover:scale-[1.02] transition"
            >
              Start Chatting <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              to="/rooms"
              className="inline-flex h-12 items-center justify-center gap-2 px-7 rounded-full glass border-border text-foreground font-semibold hover:bg-muted transition"
            >
              Explore Thought Rooms
            </Link>
          </div>

          {/* Floating preview cards */}
          <div className="relative mt-24 max-w-4xl mx-auto h-[280px] hidden md:block">
            <div
              className="absolute left-0 top-4 w-72 rounded-2xl glass p-5 text-left animate-float shadow-card"
              style={{ animationDelay: "0s" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🦊</span>
                <span className="text-xs text-muted-foreground">Stranger #482 · 2m</span>
              </div>
              <p className="text-sm">Sometimes the loudest minds belong to the quietest people.</p>
            </div>
            <div
              className="absolute right-0 top-12 w-80 rounded-2xl glass p-5 text-left animate-float shadow-card"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🐙</span>
                <span className="text-xs text-muted-foreground">Stranger #119 · 8m</span>
              </div>
              <p className="text-sm">
                Just shipped my first product after 11 months of silence. Someone clicked "Pay $5".
                I cried.
              </p>
            </div>
            <div
              className="absolute left-1/4 top-44 w-72 rounded-2xl bg-gradient-brand p-5 text-left text-white animate-float shadow-glow"
              style={{ animationDelay: "3s" }}
            >
              <div className="flex items-center gap-2 mb-3 opacity-90">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs">AI suggestion</span>
              </div>
              <p className="text-sm">
                What's a belief you held 5 years ago that you've completely changed your mind on?
              </p>
            </div>
          </div>

          {/* Home quick actions: reselect interests + random thought */}
          <div className="mt-10 max-w-3xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Link
                to="/onboarding"
                className="inline-flex h-11 items-center px-4 rounded-full bg-white text-primary font-semibold hover:scale-105 transition"
              >
                Reselect Interests
              </Link>
              <Link
                to="/rooms"
                className="inline-flex h-11 items-center px-4 rounded-full glass border border-border text-foreground font-semibold hover:bg-muted transition"
              >
                Explore Rooms
              </Link>
            </div>

            <RandomThoughtCard className="mt-8" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">
            Why ThoughtBridge
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold tracking-tight">
            Conversations without the <span className="text-gradient">performance</span>.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: Shield,
              title: "Truly Anonymous",
              desc: "No real names, no photo grids. Just minds and the words between them.",
            },
            {
              icon: MessageCircle,
              title: "Random 1-on-1 Chats",
              desc: "Get matched with a stranger by interest. Skip when it's not clicking.",
            },
            {
              icon: Users,
              title: "Thought Rooms",
              desc: "Live communities for 3am thoughts, founders, gamers, and everyone in between.",
            },
            {
              icon: Sparkles,
              title: "AI Topic Suggestions",
              desc: "Stuck for words? Smart prompts to break the ice — or break it open.",
            },
            {
              icon: Globe,
              title: "Global by Default",
              desc: "Trade perspectives across timezones. Tonight's stranger might be tomorrow's hero.",
            },
            {
              icon: Zap,
              title: "Real-time Everything",
              desc: "Typing indicators, live rooms, instant notifications. No lag, no waiting.",
            },
          ].map((f, i) => (
            <div
              key={f.title}
              className="group rounded-2xl glass p-6 hover:border-primary/40 transition-all hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="h-11 w-11 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow mb-4 group-hover:scale-110 transition">
                <f.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-display font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">
            Anonymous Voices
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold tracking-tight">
            What strangers are saying.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              quote:
                "I told a stranger something I never told my therapist. Then I told my therapist.",
              who: "Stranger #2,194",
              vibe: "🦋",
            },
            {
              quote:
                "Best 2am decision I've made in years. The 'Late Night Thoughts' room is my new diary.",
              who: "Stranger #841",
              vibe: "🌙",
            },
            {
              quote:
                "Matched with a founder in Lagos. We're now shipping a side project together. Wild.",
              who: "Stranger #117",
              vibe: "🚀",
            },
          ].map((t, i) => (
            <figure
              key={i}
              className="rounded-2xl glass p-7 hover:shadow-glow transition animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-3xl mb-4">{t.vibe}</div>
              <blockquote className="text-lg leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-6 text-sm text-muted-foreground">— {t.who}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="rounded-3xl bg-gradient-brand p-12 md:p-16 text-center text-white shadow-glow relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{ background: "radial-gradient(circle at 30% 0%, white, transparent 50%)" }}
          />
          <h2 className="relative font-display text-4xl md:text-5xl font-bold tracking-tight">
            Your next favorite conversation is one click away.
          </h2>
          <Link
            to="/login"
            className="relative mt-8 inline-flex h-12 items-center px-8 rounded-full bg-white text-primary font-bold hover:scale-105 transition"
          >
            Join Anonymously <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">
              An anonymous social platform for ideas, late-night thoughts, and the people who think
              them.
            </p>
          </div>
          {[
            { title: "Product", links: ["Thought Rooms", "Random Chat", "Feed", "AI Prompts"] },
            { title: "Community", links: ["Guidelines", "Safety", "Report", "Status"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm mb-3">{col.title}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-foreground transition">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border/40 py-6 text-center text-xs text-muted-foreground">
          © 2026 ThoughtBridge. Built for minds, not metrics.
        </div>
      </footer>
    </div>
  );
}

function RandomThoughtCard(props: { className?: string }) {
  const [thought, setThought] = useState<any>(null);

  useEffect(() => {
    if (!mockThoughts || mockThoughts.length === 0) return;
    const pick = mockThoughts[Math.floor(Math.random() * mockThoughts.length)];
    setThought(pick);
  }, []);

  if (!thought) return null;

  return (
    <figure className={`mx-auto max-w-xl rounded-2xl glass p-6 text-left ${props.className || ""}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="text-2xl">{thought.avatar}</div>
        <div>
          <div className="text-sm font-semibold">{thought.author}</div>
          <div className="text-xs text-muted-foreground">
            {thought.time} · {thought.tag}
          </div>
        </div>
      </div>
      <blockquote className="text-lg leading-relaxed">{thought.content}</blockquote>
      <figcaption className="mt-4 text-sm text-muted-foreground">
        {thought.likes} likes · {thought.comments} comments
      </figcaption>
    </figure>
  );
}
