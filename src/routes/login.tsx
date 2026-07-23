import { createFileRoute, Link } from "@tanstack/react-router";
import { UserCircle2, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log In — Girls On Campus" },
      {
        name: "description",
        content:
          "Log in to your Girls On Campus account to access scholarships, internships, Girl Chat, and student resources.",
      },
      { property: "og:title", content: "Log In — Girls On Campus" },
      {
        property: "og:description",
        content:
          "Log in to your Girls On Campus account to access scholarships, internships, Girl Chat, and student resources.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function Nav() {
  const [user, setUser] = useState<{ name: string; username: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("goc_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("goc_user");
    setUser(null);
    window.location.reload();
  };

  const links: { label: string; to: string }[] = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "$1500 Social Science Excellence", to: "/social-science-excellence" },
    { label: "Meet the team", to: "/meet-the-team" },
    { label: "Partners", to: "/partners" },
    { label: "Mentorship Program", to: "/mentorship-program" },
  ];

  return (
    <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-pink-soft/30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-sm">
        <nav className="hidden items-center gap-7 text-ink/80 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{
                className: "font-bold text-pink-deep",
              }}
              className="transition-colors hover:text-pink-deep text-ink/80"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button className="rounded-full bg-pink px-4 py-1.5 text-xs font-medium text-white shadow-md hover:bg-pink-deep hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
            Add to Chrome
          </button>
          {user ? (
            <div className="flex items-center gap-2 ml-1">
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 font-bold text-pink-deep hover:text-pink transition-colors bg-pink-soft/60 px-3 py-1.5 rounded-full border border-pink/30 text-xs"
              >
                <UserCircle2 className="h-4 w-4 text-pink" />
                <span>Hi, {user.name || "Student"}</span>
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 font-bold text-pink-deep hover:text-pink transition-colors"
            >
              <UserCircle2 className="h-5 w-5 text-pink" />
              <span className="text-sm">Log In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`font-display text-pink-deep leading-none tracking-tight ${className}`}
    >
      <span className="text-[1.6em]">girls</span>
      <span className="mx-1 text-[1.6em]">on</span>
      <span className="text-[1.6em]">campus</span>
    </div>
  );
}

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim().toLowerCase();
    // Accept "student" or "studetn" or email containing student
    if ((cleanUser === "student" || cleanUser === "studetn" || cleanUser.includes("student")) && password === "123456") {
      localStorage.setItem("goc_user", JSON.stringify({ name: "Karla", username: cleanUser }));
      window.location.href = "/dashboard";
    } else {
      setError("Invalid credentials! Hint: User: student | Pass: 123456");
    }
  };

  const handleQuickLogin = () => {
    setUsername("student");
    setPassword("123456");
    localStorage.setItem("goc_user", JSON.stringify({ name: "Karla", username: "student" }));
    window.location.href = "/dashboard";
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Floating Coquette Stickers */}
      <div className="absolute -top-10 -left-10 text-4xl animate-bounce duration-1000 select-none filter drop-shadow hidden sm:block">
        🎀
      </div>
      <div className="absolute -top-12 -right-8 text-4xl animate-pulse select-none filter drop-shadow hidden sm:block">
        ☁️
      </div>
      <div className="absolute -bottom-8 -right-10 text-4xl animate-bounce duration-1000 select-none filter drop-shadow hidden sm:block">
        🌸
      </div>

      {/* Glassmorphic Login Card */}
      <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl p-8 sm:p-10 border border-pink/30 shadow-2xl">
        {/* Header Branding */}
        <div className="text-center">
          <div className="relative inline-block mb-3">
            <div className="absolute -top-6 left-1 text-pink-deep">
              <svg width="40" height="30" viewBox="0 0 48 36" fill="currentColor">
                <path d="M24 2L2 14L24 26L46 14L24 2Z" fill="#e05297" />
                <path
                  d="M10 18.5V26.5C10 29.5 16.3 32 24 32C31.7 32 38 29.5 38 26.5V18.5"
                  stroke="#e05297"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <Logo className="text-3xl" />
          </div>

          <h1 className="text-2xl font-extrabold text-[#1e1b4b] mt-2">
            Welcome Back, Bestie! 💗
          </h1>
          <p className="text-xs text-ink/70 mt-1">
            Log in to access your student dashboard, saved opportunities & Girl Chat.
          </p>

          {/* Quick Demo Hint */}
          <div className="mt-4 p-2.5 rounded-xl bg-pink-soft/40 border border-pink/30 text-left flex items-center justify-between">
            <div className="text-[11px] text-pink-deep font-medium">
              <span className="font-bold uppercase tracking-wider">Demo Login:</span>
              <br />
              User: <code className="bg-white/80 px-1 py-0.5 rounded font-mono">student</code> | Pass: <code className="bg-white/80 px-1 py-0.5 rounded font-mono">123456</code>
            </div>
            <button
              type="button"
              onClick={handleQuickLogin}
              className="bg-pink text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow hover:bg-pink-deep transition-all"
            >
              Fill & Go →
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold text-center animate-shake">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Username Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5">
              Username or Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pink">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                placeholder="student"
                className="w-full rounded-xl border border-pink-soft bg-pink-soft/20 pl-10 pr-4 py-3 text-xs text-ink placeholder-ink/40 outline-none focus:border-pink focus:ring-2 focus:ring-pink/20 transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink/80">
                Password
              </label>
              <a
                href="#"
                className="text-xs font-semibold text-pink-deep hover:underline"
              >
                Forgot?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pink">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="123456"
                className="w-full rounded-xl border border-pink-soft bg-pink-soft/20 pl-10 pr-10 py-3 text-xs text-ink placeholder-ink/40 outline-none focus:border-pink focus:ring-2 focus:ring-pink/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-ink/50 hover:text-pink transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs text-ink/75 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="accent-pink rounded h-4 w-4 cursor-pointer"
              />
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-pink py-3 text-xs font-extrabold text-white shadow-lg hover:bg-pink-deep hover:shadow-pink/40 transition-all duration-300 uppercase tracking-wider transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Log In</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-ink/10" />
          </div>
          <span className="relative bg-white px-3 text-[10px] font-bold text-ink/50 uppercase tracking-wider">
            Or continue with
          </span>
        </div>

        {/* Social Logins */}
        <div>
          <button
            type="button"
            onClick={() => alert("Google Login")}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-ink/15 bg-white py-2.5 text-xs font-bold text-ink hover:border-pink transition-colors shadow-sm"
          >
            <span className="text-base">🌐</span> Continue with Google
          </button>
        </div>

        {/* Footer Sign Up Link */}
        <p className="mt-7 text-center text-xs text-ink/75">
          Don't have an account?{" "}
          <a href="#" className="font-extrabold text-pink-deep hover:underline">
            Sign up for free 💖
          </a>
        </p>
      </div>
    </div>
  );
}

function Footer() {
  const cols = [
    { title: "Explore", items: ["Opportunities", "Extension", "Girl Chat", "Resources", "Newsletter"] },
    { title: "Company", items: ["Partner With Us", "About", "Contact", "Donate"] },
    { title: "Follow", items: ["Instagram", "Tik Tok", "Linkedin"] },
    { title: "Legal", items: ["Privacy", "Terms"] },
  ];
  return (
    <footer className="border-t border-ink/10 bg-white text-ink mt-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 py-14 md:grid-cols-5">
        <div className="col-span-2">
          <Logo className="text-4xl" />
          <p className="mt-4 max-w-xs text-xs text-ink/60 leading-relaxed">
            Less gatekeeping, more access. A student-led platform for
            scholarships, internships, and real opportunities.
          </p>
          <p className="mt-4 text-xs text-ink/60">
            San Francisco, CA · info@girlsoncampus.org
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-sm font-semibold text-ink">{c.title}</p>
            <ul className="mt-3 space-y-2 text-xs text-ink/60">
              {c.items.map((i) => (
                <li key={i}>
                  <a href="#" className="hover:text-pink transition-colors">
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-ink/5 py-6">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-3 text-xs text-ink/60">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/20 text-[10px] font-semibold">
              IG
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/20 text-[10px] font-semibold">
              TT
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/20 text-[10px] font-semibold">
              LI
            </span>
          </div>
          <p className="text-xs text-ink/50">Girls On Campus LLC 2026</p>
        </div>
      </div>
    </footer>
  );
}

export function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fbf4ff] via-[#fff5fa] to-[#f5e6ff] font-sans text-ink selection:bg-pink-soft selection:text-pink-deep flex flex-col justify-between">
      <Nav />
      <div className="py-12 md:py-16 px-6 flex-1 flex items-center justify-center">
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}
