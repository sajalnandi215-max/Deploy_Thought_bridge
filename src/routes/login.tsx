import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { Logo } from "@/components/Logo";
import {
  signInWithPopup,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth, googleProvider, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Join ThoughtBridge" },
      {
        name: "description",
        content: "Continue as guest or create an anonymous account.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate({ to: "/feed" });
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Sync user profile to Firestore
  const syncUserToFirestore = async (user: any) => {
    if (!user || !user.uid) return;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    const avatar = user.photoURL || "🦊";
    const displayName = user.displayName || "New Stranger";

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        displayName,
        avatar,
        joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        reputation: 0,
        badges: 0,
        conversations: 0,
        roomsJoined: 0,
      });
      console.log("New user document created in Firestore");
      return;
    }

    const existingData = userSnap.data() || {};
    const updates: any = {};

    if (existingData.displayName !== displayName) {
      updates.displayName = displayName;
    }

    if (existingData.avatar !== avatar) {
      updates.avatar = avatar;
    }

    if (Object.keys(updates).length > 0) {
      await setDoc(userRef, updates, { merge: true });
      console.log("Updated user profile avatar/displayName in Firestore");
    }
  };

  // -------------------------
  // Google Login
  // -------------------------
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, googleProvider);
      await syncUserToFirestore(result.user);
      console.log("Google user:", result.user.email);
      navigate({ to: "/onboarding" });
    } catch (error) {
      console.error(error);
      alert("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Guest Login (Anonymous)
  // -------------------------
  const handleGuestLogin = async () => {
    try {
      setLoading(true);
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInAnonymously(auth);
      await syncUserToFirestore(result.user);
      console.log("Guest user created:", result.user.uid);
      navigate({ to: "/onboarding" });
    } catch (error) {
      console.error(error);
      alert("Failed to continue as guest");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Create Account
  // -------------------------
  const handleCreateAccount = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await syncUserToFirestore(userCredential.user);
      console.log("Created user:", userCredential.user.email);
      navigate({ to: "/onboarding" });
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Account creation failed");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Login
  // -------------------------
  const handleLogin = async () => {
    console.log("Login clicked");

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await syncUserToFirestore(userCredential.user);
      console.log("LOGIN SUCCESS:", userCredential.user);
      alert(`Welcome back ${userCredential.user.email}`);
      navigate({ to: "/onboarding" });
    } catch (error: any) {
      console.error("LOGIN ERROR:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background bg-mesh flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Logo />
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md animate-slide-up">
          
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Welcome, stranger.
            </h1>
            <p className="mt-2 text-muted-foreground">
              Pick how you want to show up tonight.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-3xl glass p-7 shadow-card">

            {/* Guest Login */}
            <button
              onClick={handleGuestLogin}
              disabled={loading}
              className="group flex items-center justify-between w-full p-4 rounded-2xl bg-gradient-brand text-white shadow-glow hover:scale-[1.01] transition disabled:opacity-50"
            >
              <div className="text-left">
                <p className="font-semibold">Continue as Guest</p>
                <p className="text-xs opacity-80">
                  No email. Instant. Fully anonymous.
                </p>
              </div>

              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
            </button>

            {/* Divider */}
            <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="h-px flex-1 bg-border" />
              <span>OR</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full h-11 rounded-xl border border-border bg-card hover:bg-accent font-medium flex items-center justify-center gap-3 transition disabled:opacity-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>

              Continue with Google
            </button>

            {/* Inputs */}
            <div className="mt-5 space-y-3">

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 rounded-xl bg-muted/50 border border-border pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 rounded-xl bg-muted/50 border border-border pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3">
               <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="h-11 rounded-xl border border-border hover:bg-accent text-sm font-semibold transition disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

                <button
                  onClick={handleCreateAccount}
                  disabled={loading}
                  className="h-11 rounded-xl bg-foreground text-background hover:opacity-90 text-sm font-semibold transition disabled:opacity-50"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            By continuing you agree to be kind. The rest is on us.
          </p>

        </div>
      </div>
    </div>
  );
}