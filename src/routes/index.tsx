import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Check,
  MessageCircle,
  Play,
  ChevronRight,
  UserCircle2,
  Bookmark,
  LayoutGrid,
  LogOut,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Girls On Campus — Less gatekeeping, more access." },
      {
        name: "description",
        content:
          "Scholarships, internships, paid programs, career advice, and student resources — curated for girls building their future.",
      },
      { property: "og:title", content: "Girls On Campus — Less gatekeeping, more access." },
      {
        property: "og:description",
        content:
          "Scholarships, internships, paid programs, career advice, and student resources — curated for girls building their future.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

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
          <Link
            to="/dashboard"
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
                to="/dashboard"
                className="flex items-center gap-1.5 font-bold text-pink-deep hover:text-pink transition-colors bg-pink-soft/60 px-3 py-1.5 rounded-full border border-pink/30 text-xs"
              >
                <UserCircle2 className="h-4 w-4 text-pink" />
                <span>Hi, {user.name || "Student"}</span>
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

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fbf4ff]/40 via-white to-white">
      {/* Floating Coquette Theme Stickers */}
      <div className="absolute left-6 top-8 text-3xl md:text-4xl animate-bounce duration-1000 select-none filter drop-shadow opacity-80">
        🎀
      </div>
      <div className="absolute right-10 top-10 text-3xl md:text-4xl animate-pulse select-none opacity-80">
        ☁️
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2 md:py-24 relative z-10">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl">
            Less gatekeeping,
            <br />
            more <span className="font-display text-pink">access.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">
            Scholarships, internships, paid programs, career advice, and student
            resources — curated for girls building their future.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button className="rounded-full bg-pink px-6 py-3 text-sm font-medium text-white shadow-md hover:bg-pink-deep hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
              Add to Chrome
            </button>
            <button className="rounded-full border border-ink/20 bg-white px-6 py-3 text-sm font-medium text-ink hover:border-pink hover:text-pink transition-all duration-300 shadow-sm">
              Explore Opportunities
            </button>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-2">
              {["#f472b6", "#c4b5fd", "#60a5fa", "#f9a8d4"].map((c, i) => (
                <div
                  key={i}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-semibold text-white shadow-sm transition-transform hover:scale-110"
                  style={{ backgroundColor: c }}
                >
                  {["J", "M", "P", "L"][i]}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
              <span className="text-xs font-medium text-ink/70">10k+ girls in the community</span>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute right-8 top-0 h-40 w-40 rounded-2xl bg-lilac/50 blur-sm animate-pulse" />
          <div className="absolute left-4 top-16 h-44 w-44 rotate-[-6deg] rounded-2xl bg-pink-soft/60 shadow-sm transition-transform hover:rotate-0 duration-500" />
          <div className="relative z-10 transition-transform duration-500 hover:scale-105">
            <Logo className="text-6xl md:text-7xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { n: "550+", l: "opportunities" },
    { n: "75k", l: "reach" },
    { n: "230+", l: "partners" },
    { n: "20", l: "campuses" },
  ];
  return (
    <section
      className="w-full py-12"
      style={{
        background:
          "linear-gradient(90deg, oklch(0.94 0.04 260), oklch(0.93 0.05 320), oklch(0.94 0.04 20))",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-sm font-semibold text-ink">More About Us</p>
        <div className="mt-6 flex flex-wrap items-baseline justify-center gap-x-10 gap-y-4 text-ink">
          {items.map((it, i) => (
            <div key={it.n} className="flex items-baseline gap-3">
              <div>
                <span className="text-4xl font-bold md:text-5xl">{it.n}</span>
                <span className="ml-2 text-xs text-ink/60">{it.l}</span>
              </div>
              {i < items.length - 1 && (
                <span className="hidden text-3xl text-ink/40 md:inline">·</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  kicker,
  first,
  main,
  italic,
}: {
  kicker: string;
  first: string;
  main: string;
  italic?: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-pink">
        {kicker}
      </p>
      <h2 className="mt-3 text-4xl font-bold leading-tight text-ink md:text-5xl">
        <span className="text-pink">{first}</span>
        {main}
        {italic && <span className="font-display text-pink"> {italic}</span>}
      </h2>
    </div>
  );
}

function Extension() {
  const bullets = [
    "Save opportunities from any tab in one click.",
    "Get deadline reminders before you forget to apply.",
    "Everything lands in one clean, organized dashboard.",
    "Quietly flags opportunities as you scroll, so you don't have to look.",
  ];
  return (
    <section className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 py-24 md:grid-cols-2 md:items-center">
      <div>
        <SectionHeader
          kicker="Chrome extension — live now"
          first="S"
          main="ave it now,"
        />
        <h2 className="text-4xl font-bold leading-tight text-ink md:text-5xl">
          stress <span className="font-display text-pink">less later.</span>
        </h2>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/70">
          Install the Girls On Campus extension and save any scholarship,
          internship, or program the second you spot it — no more screenshotting
          and losing the link.
        </p>
        <ul className="mt-6 max-w-md space-y-2.5">
          {bullets.map((b, i) => (
            <li
              key={b}
              className="flex items-center gap-3 rounded-full border border-pink-soft bg-pink-soft/40 px-4 py-2.5 text-sm text-ink/80 transition-transform duration-300 hover:translate-x-1"
            >
              <span className="text-xs font-semibold text-pink">
                {String(i + 1).padStart(2, "0")}
              </span>
              {b}
            </li>
          ))}
        </ul>
        <button className="mt-7 rounded-full bg-pink px-6 py-3 text-sm font-medium text-white shadow-md hover:bg-pink-deep hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
          Add to Chrome — it's free
        </button>
      </div>

      <BrowserMock />
    </section>
  );
}

function BrowserMock() {
  const items = [
    { n: "Delphi Campus Internship", tag: "SAVED", color: "bg-pink" },
    { n: "Eva Leigh Scholarship — $1,500", tag: "SAVED", color: "bg-pink" },
    { n: "Youth Leadership Fellowship", tag: "SAVED", color: "bg-pink" },
    { n: "Open dashboard", tag: "→", color: "bg-ink/70" },
  ];
  return (
    <div className="relative group transition-transform duration-500 hover:-translate-y-1">
      {/* Subtle Floating Sticker */}
      <div className="absolute -top-6 -right-6 text-3xl select-none filter drop-shadow animate-bounce duration-1000">
        🎀
      </div>
      <div className="rounded-2xl border border-ink/10 bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] group-hover:shadow-[0_25px_70px_-25px_rgba(224,82,151,0.2)] transition-shadow duration-500">
        <div className="flex items-center justify-between border-b border-ink/5 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <span className="rounded-full bg-pink px-3 py-1 text-[10px] font-semibold text-white shadow-xs">
            INSTALL FREE
          </span>
        </div>
        <div className="p-6">
          <p className="mb-4 text-sm font-semibold text-ink flex items-center gap-1.5">
            <span>Opportunity saved</span>
            <span className="text-pink animate-pulse">✓</span>
          </p>
          <div className="space-y-2">
            {items.map((it) => (
              <div
                key={it.n}
                className="flex items-center justify-between rounded-lg bg-pink-soft/50 px-3 py-2.5 text-xs text-ink/80 transition-transform duration-300 hover:scale-[1.01]"
              >
                <span>{it.n}</span>
                <span
                  className={`${it.color} rounded-full px-2 py-0.5 text-[9px] font-semibold text-white`}
                >
                  {it.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const bullets = [
    "Track deadlines and get reminders",
    "Organize by status, category & tags",
    "Add notes, essays & eligibility",
    "See everything in one place",
    "Stay ahead and stress less",
  ];
  return (
    <section className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 py-24 md:grid-cols-2 md:items-center">
      <div>
        <SectionHeader kicker="Your dashboard" first="Y" main="our opportunities," />
        <h2 className="text-4xl font-bold leading-tight text-ink md:text-5xl">
          <span className="font-display text-pink">organized.</span>
        </h2>
        <ul className="mt-6 space-y-2 text-sm text-ink/80">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-2 transition-transform duration-300 hover:translate-x-1">
              <Check className="h-4 w-4 text-pink" />
              {b}
            </li>
          ))}
        </ul>
        <button className="mt-7 flex items-center gap-1.5 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink hover:border-pink hover:text-pink transition-all duration-300 shadow-xs transform hover:-translate-y-0.5">
          Open your dashboard <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <DashboardMock />
    </section>
  );
}

function DashboardMock() {
  const rows = [
    { name: "Gates Scholarship", type: "Scholarship", date: "May 15", status: "Due Soon", tone: "bg-pink text-white animate-pulse" },
    { name: "Canva Career Program", type: "Internship", date: "May 30", status: "Applied", tone: "bg-lilac text-ink" },
    { name: "Google STEP Internship", type: "Internship", date: "May 20", status: "Saved", tone: "bg-pink-soft text-pink-deep" },
    { name: "Female Founders Fellowship", type: "Fellowship", date: "Jun 1", status: "—", tone: "bg-muted text-ink/60" },
  ];
  return (
    <div className="relative group transition-transform duration-500 hover:-translate-y-1">
      {/* Subtle Floating Cloud Sticker */}
      <div className="absolute -top-5 -left-5 text-3xl select-none opacity-80 animate-pulse">
        ☁️
      </div>
      <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] group-hover:shadow-[0_25px_70px_-25px_rgba(224,82,151,0.2)] transition-shadow duration-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-ink">Good morning, bestie 💗</p>
            <p className="text-xs text-ink/60">You've got 5 deadlines coming up this week</p>
          </div>
          <div className="flex -space-x-1.5">
            <div className="h-5 w-5 rounded-full bg-pink animate-ping" />
            <div className="h-5 w-5 rounded-full bg-lilac" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2 text-center">
          {[
            { n: "23", l: "SAVED" },
            { n: "8", l: "APPLIED" },
            { n: "5", l: "DUE SOON" },
            { n: "3", l: "ESSAYS WROTE" },
          ].map((s) => (
            <div key={s.l} className="rounded-lg bg-pink-soft/40 p-2 transition-transform duration-300 hover:scale-105">
              <p className="text-xl font-bold text-ink">{s.n}</p>
              <p className="text-[9px] font-semibold tracking-wide text-ink/60">{s.l}</p>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-ink">My Opportunities</p>
            <div className="flex gap-1 text-[10px]">
              {["All", "Scholarships", "Remote", "Fellowship"].map((t, i) => (
                <span
                  key={t}
                  className={`rounded-full px-2 py-0.5 ${i === 0 ? "bg-ink text-white" : "bg-muted text-ink/70"}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <table className="mt-3 w-full text-left text-[11px]">
            <thead className="text-[9px] font-semibold uppercase tracking-wide text-ink/50">
              <tr>
                <th className="pb-2">Name</th>
                <th className="pb-2">Type</th>
                <th className="pb-2">Date</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {rows.map((r) => (
                <tr key={r.name} className="transition-colors hover:bg-pink-soft/20">
                  <td className="py-2 text-ink font-medium">{r.name}</td>
                  <td className="py-2 text-ink/70">{r.type}</td>
                  <td className="py-2 text-ink/70">{r.date}</td>
                  <td className="py-2">
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${r.tone}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Chat() {
  const tags = ["Essay feedback", "Essay feedback", "Essay feedback", "Essay feedback", "Essay feedback"];
  return (
    <section className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 py-24 md:grid-cols-2 md:items-center">
      <div>
        <SectionHeader kicker="Girl chat" first="A" main="sk, vent, or" />
        <h2 className="text-4xl font-bold leading-tight text-ink md:text-5xl">
          celebrate —
          <br />
          the chat's <span className="font-display text-pink">always open.</span>
        </h2>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/70">
          Drop a question at 1am or brag about an acceptance at noon. Girl Chat
          is where real students trade advice, deadlines, and hype in real time.
        </p>
        <div className="mt-5 flex max-w-md flex-wrap gap-2">
          {tags.map((t, i) => (
            <span
              key={i}
              className="rounded-full border border-ink/15 bg-white px-3 py-1 text-xs text-ink/70 transition-colors hover:border-pink hover:text-pink"
            >
              {t}
            </span>
          ))}
        </div>
        <button className="mt-7 rounded-full bg-pink px-6 py-3 text-sm font-medium text-white shadow-md hover:bg-pink-deep hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
          Join Girl Chat
        </button>
      </div>
      <ChatMock />
    </section>
  );
}

function ChatMock() {
  const msgs = [
    { who: "Paige", color: "bg-pink", text: "Anyone applied to Canva? I had steps for their new early careers thing?" },
    { who: "Mia", color: "bg-lilac", text: "yesss following !!" },
    { who: "Sam Kim", color: "bg-indigo-300", text: "yes! We do a 1-hr coaching prep + a quick mock interview — happy to send a PDF too if useful" },
  ];
  return (
    <div className="relative group transition-transform duration-500 hover:-translate-y-1">
      {/* Floating Heart Sticker */}
      <div className="absolute -bottom-5 -right-5 text-3xl select-none filter drop-shadow animate-bounce duration-1000">
        💖
      </div>
      <div className="relative rounded-2xl border border-ink/10 bg-white p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] group-hover:shadow-[0_25px_70px_-25px_rgba(224,82,151,0.2)] transition-shadow duration-500">
        <div className="absolute -top-3 left-5 rounded-full bg-pink px-3 py-1 text-[10px] font-semibold text-white shadow-xs flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
          LIVE NOW
        </div>
        <div className="flex items-center justify-between border-b border-ink/5 pb-3">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-pink" />
            <span className="text-sm font-semibold text-ink">Girl Chat</span>
          </div>
          <span className="text-[10px] font-medium text-ink/60 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            234 online
          </span>
        </div>
        <div className="mt-4 space-y-3">
          {msgs.map((m) => (
            <div key={m.who} className="flex gap-2 transition-transform duration-300 hover:translate-x-1">
              <div className={`h-7 w-7 shrink-0 rounded-full ${m.color} shadow-xs`} />
              <div className="flex-1">
                <p className="text-[11px] font-semibold text-ink">{m.who}</p>
                <p className="rounded-lg bg-muted px-3 py-2 text-xs text-ink/80">
                  {m.text}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-full border border-ink/10 px-3 py-2 transition-colors focus-within:border-pink">
          <input
            placeholder="Say hello ..."
            className="flex-1 bg-transparent text-xs outline-none"
          />
          <Bookmark className="h-4 w-4 text-pink" />
        </div>
      </div>
    </div>
  );
}

function Videos() {
  const reels = [
    {
      id: "DYtLWFcuchb",
      url: "https://www.instagram.com/reels/DYtLWFcuchb/",
      embedUrl: "https://www.instagram.com/p/DYtLWFcuchb/embed",
      title: "LinkedIn alone doesn't get you the internship",
    },
    {
      id: "DIujX1lTkg4",
      url: "https://www.instagram.com/reels/DIujX1lTkg4/",
      embedUrl: "https://www.instagram.com/p/DIujX1lTkg4/embed",
      title: "How to answer 'Why do you want to work for us?'",
    },
    {
      id: "DFkx3euxMga",
      url: "https://www.instagram.com/reels/DFkx3euxMga/",
      embedUrl: "https://www.instagram.com/p/DFkx3euxMga/embed",
      title: "I almost lost $10,000",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-pink">
        @girlsoncampus
      </p>
      <h2 className="mt-3 text-4xl font-bold leading-tight text-ink md:text-5xl">
        <span className="text-pink">E</span>verything we know,
        <br />
        in <span className="font-display text-pink">30 seconds.</span>
      </h2>
      <p className="mt-4 text-sm text-ink/70">
        Quick videos and carousels on the stuff nobody explains — essays,
        interviews, and more. New ones every week.
      </p>

      {/* Grid of Smartphone UI Mockups */}
      <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 justify-items-center">
        {reels.map((r) => (
          <div
            key={r.id}
            className="group relative w-full max-w-[320px] transition-all duration-300 hover:scale-[1.03] hover:-translate-y-2"
          >
            {/* Outer Phone Shell Frame */}
            <div className="relative overflow-hidden rounded-[42px] border-[10px] border-slate-900 bg-slate-900 shadow-[0_25px_60px_-15px_rgba(224,82,151,0.35)] ring-1 ring-slate-900/10">

              {/* Dynamic Island Notch */}
              <div className="absolute top-2 left-1/2 z-30 flex h-4 w-24 -translate-x-1/2 items-center justify-between rounded-full bg-black px-2">
                <span className="h-2 w-2 rounded-full bg-slate-800" />
                <span className="h-1.5 w-1.5 rounded-full bg-blue-900/40" />
              </div>

              {/* Status Bar */}
              <div className="flex items-center justify-between bg-white px-5 pt-3.5 pb-1 text-[10px] font-bold text-slate-800">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <span>5G</span>
                  <div className="h-2.5 w-4 rounded-sm border border-slate-800 p-0.5">
                    <div className="h-full w-full bg-slate-800" />
                  </div>
                </div>
              </div>

              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-pink-soft/40 bg-white px-4 py-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-ink">
                  <span className="h-2.5 w-2.5 rounded-full bg-pink animate-pulse" />
                  girls.on.campus
                </div>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-pink px-2.5 py-1 text-[9px] font-extrabold text-white shadow-sm hover:bg-pink-deep transition-colors"
                >
                  Watch ↗
                </a>
              </div>

              {/* Instagram Embed Display */}
              <div className="relative aspect-[9/16] w-full bg-black">
                <iframe
                  src={r.embedUrl}
                  title={r.title}
                  className="h-full w-full border-0"
                  allowTransparency
                  scrolling="no"
                />
              </div>

              {/* Bottom Home Bar */}
              <div className="bg-white py-2">
                <div className="h-1 w-28 rounded-full bg-slate-300 mx-auto" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BuiltBy() {
  const quotes = [
    { name: "Amara, first-gen sophomore", q: "Found a full-funded 3-yr fellowship in the hub — I'd never have found it in the school portal." },
    { name: "Kennedy K., scholarship recipient", q: "From uni advisor to no tips, y'all have helped me so much." },
    { name: "Brooke, ROTC student", q: "Finally a list of programs that don't ban for a scholarship. I love it here." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div
          className="rounded-3xl p-10"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.92 0.05 320), oklch(0.94 0.04 280))",
          }}
        >
          <h2 className="text-4xl font-bold leading-tight text-ink md:text-5xl">
            Built by
            <br />
            students,
            <br />
            for <span className="font-display text-pink">students.</span>
          </h2>
          <p className="mt-6 text-sm font-semibold text-pink">Get notified!</p>
          <form className="mt-3 max-w-md">
            <label className="text-xs text-ink/70">Email*</label>
            <div className="mt-1 flex gap-2">
              <input
                type="email"
                placeholder="example@address.com"
                className="flex-1 rounded-md border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-pink"
              />
              <button
                type="button"
                className="rounded-md bg-pink px-4 py-2 text-sm font-medium text-white hover:bg-pink-deep transition-colors"
              >
                Subscribe
              </button>
            </div>
            <label className="mt-3 flex items-center gap-2 text-xs text-ink/70">
              <input type="checkbox" className="accent-pink" />
              I want to subscribe to your mailing list.
            </label>
          </form>
        </div>

        <div className="flex flex-col justify-center gap-6">
          {quotes.map((q, i) => (
            <div key={q.name} className="flex gap-3">
              <div
                className="h-9 w-9 shrink-0 rounded-full"
                style={{ background: ["#f9a8d4", "#fcd34d", "#c4b5fd"][i] }}
              />
              <div>
                <p className="text-sm font-semibold text-ink">{q.name}</p>
                <p className="mt-1 text-sm text-ink/70">"{q.q}"</p>
              </div>
            </div>
          ))}
          <p className="text-xs text-ink/50">
            Proud to work with partners including The Princeton Review, Scholly,
            and RaiseMe.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { title: "Explore", items: ["Opportunities", "Extension", "Girl Chat", "Resources", "Newsletter"] },
    { title: "Company", items: ["Partner With Us", "About", "Contact", "Careers"] },
    { title: "Follow", items: ["Instagram", "Tik Tok", "LinkedIn"] },
    { title: "Legal", items: ["Privacy", "Terms"] },
  ];
  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 py-14 md:grid-cols-5">
        <div className="col-span-2">
          <Logo className="text-4xl" />
          <p className="mt-4 max-w-xs text-xs text-ink/60">
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
                  <a href="#" className="hover:text-pink">
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-ink/5 py-6 text-center text-xs text-ink/50">
        © 2026 Girls On Campus LLC
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <Hero />
      <Stats />
      <Extension />
      <Dashboard />
      <Chat />
      <Videos />
      <BuiltBy />
      <Footer />
    </div>
  );
}
