import { Link } from "@tanstack/react-router";
import { UserCircle2, LogOut, LayoutGrid } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const [user, setUser] = useState<{ name: string; username: string; role?: string } | null>(null);

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
    localStorage.removeItem("goc_token");
    setUser(null);
    window.location.href = "/";
  };

  // Returns the correct dashboard route based on logged-in user's role
  const getDashboardPath = (): "/dashboard" | "/admin" | "/mentor" => {
    if (!user) return "/dashboard";
    if (user.role === "admin") return "/admin";
    if (user.role === "mentor") return "/mentor";
    return "/dashboard";
  };

  const dashboardPath = getDashboardPath();

  const links: { label: string; to: string }[] = [
    { label: "Home", to: "/" },
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
          <Link
            to={dashboardPath}
            className="flex items-center gap-1.5 font-bold text-white bg-pink px-4 py-2 rounded-full shadow-sm hover:bg-pink-deep transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="text-xs">Dashboard</span>
          </Link>
          <button className="rounded-full border border-pink text-pink px-4 py-1.5 text-xs font-medium hover:bg-pink-soft/40 transition-all duration-300">
            Add to Chrome
          </button>
          {user ? (
            <div className="flex items-center gap-2 ml-1">
              <Link
                to={dashboardPath}
                className="flex items-center gap-1.5 font-bold text-pink-deep hover:text-pink transition-colors bg-pink-soft/60 px-3 py-1.5 rounded-full border border-pink/30 text-xs"
              >
                <UserCircle2 className="h-4 w-4 text-pink" />
                <span>Hi, {user.name?.split(" ")[0] || "User"}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs text-ink/50 hover:text-red-500 font-medium transition-colors px-1 py-1"
                title="Log Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 text-ink/80 hover:text-pink transition-colors ml-1"
            >
              <UserCircle2 className="h-5 w-5 text-pink" />
              <span className="text-xs font-medium">Log In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

