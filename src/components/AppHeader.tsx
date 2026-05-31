import { Search, Bell, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function AppHeader() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);
  return (
    <header className="sticky top-0 z-40 glass border-b border-border">
      <div className="flex items-center gap-3 px-4 lg:px-8 h-16">
        <div className="lg:hidden">
          <Logo size="sm" />
        </div>
        <div className="flex-1 max-w-xl mx-auto relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search thoughts, rooms, strangers…"
            className="w-full h-10 rounded-full bg-muted/60 border border-border/50 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:bg-muted transition"
          />
        </div>
        <button
          onClick={() => setLight((v) => !v)}
          className="h-10 w-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
          aria-label="Toggle theme"
        >
          {light ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
        </button>
        <Link to="/notifications" className="h-10 w-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors relative">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive animate-pulse-glow" />
        </Link>
      </div>
    </header>
  );
}
