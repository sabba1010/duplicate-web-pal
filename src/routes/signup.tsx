import { createFileRoute, Link } from "@tanstack/react-router";
import { UserCircle2, Mail, Lock, Eye, EyeOff, User, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — Girls On Campus" },
      {
        name: "description",
        content:
          "Create your free Girls On Campus account to access scholarships, internships, Girl Chat, and student mentorship.",
      },
    ],
  }),
  component: SignupPage,
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
          <button className="rounded-full bg-pink px-4 py-1.5 text-xs font-medium text-white shadow-md hover:bg-pink-deep transition-all">
            Add to Chrome
          </button>
          {user ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 font-bold text-pink-deep hover:text-pink transition-colors bg-pink-soft/60 px-3 py-1.5 rounded-full border border-pink/30 text-xs"
            >
              <UserCircle2 className="h-4 w-4 text-pink" />
              <span>Hi, {user.name || "Student"}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 font-bold text-pink-deep hover:text-pink transition-colors text-xs"
            >
              <UserCircle2 className="h-4 w-4 text-pink" />
              <span>Log In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`font-display text-pink-deep leading-none tracking-tight ${className}`}>
      <span className="text-[1.6em]">girls</span>
      <span className="mx-1 text-[1.6em]">on</span>
      <span className="text-[1.6em]">campus</span>
    </div>
  );
}

function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState<"student" | "mentor" | "admin">("student");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !username.trim() || !password) {
      setError("Please fill in all required fields!");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (!agreed) {
      setError("Please accept terms & conditions to proceed.");
      return;
    }

    setError("");
    setSuccess(true);

    const userObj = {
      name: fullName.trim(),
      username: username.trim().toLowerCase(),
      email: email.trim(),
      role,
    };

    localStorage.setItem("goc_user", JSON.stringify(userObj));

    setTimeout(() => {
      if (role === "admin") {
        window.location.href = "/admin";
      } else if (role === "mentor") {
        window.location.href = "/mentor";
      } else {
        window.location.href = "/dashboard";
      }
    }, 1200);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Floating Coquette Stickers */}
      <div className="absolute -top-10 -left-10 text-4xl animate-bounce duration-1000 select-none hidden sm:block">
        🎀
      </div>
      <div className="absolute -top-12 -right-8 text-4xl animate-pulse select-none hidden sm:block">
        ✨
      </div>
      <div className="absolute -bottom-8 -right-10 text-4xl animate-bounce duration-1000 select-none hidden sm:block">
        🌸
      </div>

      {/* Glassmorphic Sign Up Card */}
      <div className="relative rounded-3xl bg-white/85 backdrop-blur-xl p-8 sm:p-10 border border-pink/30 shadow-2xl">
        <div className="text-center">
          <div className="relative inline-block mb-2">
            <Logo className="text-3xl" />
          </div>

          <h1 className="text-2xl font-black text-[#1e1b4b] mt-1">
            Join Girls On Campus! 💖
          </h1>
          <p className="text-xs text-ink/70 mt-1">
            Create your account to unlock scholarships, internships & peer mentorship.
          </p>
        </div>

        {error && (
          <div className="mt-4 p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Account created successfully! Redirecting...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Role Selection */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-ink/80 mb-1.5">
              Select Your Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "student", label: "🎓 Student" },
                { id: "mentor", label: "👩‍🏫 Mentor" },
                { id: "admin", label: "⚡ Admin" },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setRole(r.id as any);
                    setError("");
                  }}
                  className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    role === r.id
                      ? "bg-pink text-white border-pink shadow-xs"
                      : "bg-white text-ink/70 border-pink-soft/60 hover:border-pink"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-ink/80 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pink">
                <User className="h-4 w-4" />
              </div>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Karla Miller"
                className="w-full rounded-xl border border-pink-soft bg-pink-soft/20 pl-10 pr-4 py-2.5 text-xs text-ink outline-none focus:border-pink focus:ring-2 focus:ring-pink/20 transition-all"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-ink/80 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pink">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="karla@gmail.com"
                className="w-full rounded-xl border border-pink-soft bg-pink-soft/20 pl-10 pr-4 py-2.5 text-xs text-ink outline-none focus:border-pink focus:ring-2 focus:ring-pink/20 transition-all"
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-ink/80 mb-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pink">
                <Sparkles className="h-4 w-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="karla_student"
                className="w-full rounded-xl border border-pink-soft bg-pink-soft/20 pl-10 pr-4 py-2.5 text-xs text-ink outline-none focus:border-pink focus:ring-2 focus:ring-pink/20 transition-all"
              />
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-ink/80 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-pink">
                  <Lock className="h-3.5 w-3.5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-pink-soft bg-pink-soft/20 pl-9 pr-8 py-2.5 text-xs text-ink outline-none focus:border-pink transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-ink/40 hover:text-pink"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-ink/80 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-pink">
                  <Lock className="h-3.5 w-3.5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-pink-soft bg-pink-soft/20 pl-9 pr-4 py-2.5 text-xs text-ink outline-none focus:border-pink transition-all"
                />
              </div>
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="pt-1">
            <label className="flex items-center gap-2 text-xs text-ink/75 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="accent-pink rounded h-4 w-4 cursor-pointer"
              />
              <span>I agree to the Terms of Service & Privacy Policy 🌸</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-3 flex items-center justify-center gap-2 rounded-xl bg-pink py-3 text-xs font-extrabold text-white shadow-lg hover:bg-pink-deep hover:shadow-pink/40 transition-all duration-300 uppercase tracking-wider transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Create Account</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Existing Account Footer Link */}
        <p className="mt-6 text-center text-xs text-ink/75">
          Already have an account?{" "}
          <Link to="/login" className="font-extrabold text-pink-deep hover:underline">
            Log in here 💕
          </Link>
        </p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white py-6 text-center text-xs text-ink/50 mt-12">
      <p>© 2026 Girls On Campus. All rights reserved.</p>
    </footer>
  );
}

export function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fbf4ff] via-[#fff5fa] to-[#f5e6ff] font-sans text-ink flex flex-col justify-between">
      <Nav />
      <div className="py-10 px-6 flex-1 flex items-center justify-center">
        <SignupForm />
      </div>
      <Footer />
    </div>
  );
}
