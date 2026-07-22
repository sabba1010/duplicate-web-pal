import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Check,
  MessageCircle,
  Play,
  ChevronRight,
  UserCircle2,
  Bookmark,
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
  const links: { label: string; to: string }[] = [
    { label: "Home", to: "/" },
    { label: "$1500 Social Science Excellence", to: "/social-science-excellence" },
    { label: "Meet the team", to: "/" },
    { label: "Partners", to: "/" },
    { label: "Member Page", to: "/" },
    { label: "Mentorship Program", to: "/" },
  ];
  return (
    <header className="w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-sm">
        <nav className="hidden items-center gap-7 text-ink/80 md:flex">
          {links.map((l) => (
            <Link key={l.label} to={l.to} className="hover:text-pink-deep transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button className="rounded-full bg-pink px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-pink-deep transition-colors">
            Add to Chrome
          </button>
          <a href="#" className="flex items-center gap-1.5 text-ink/80">
            <UserCircle2 className="h-5 w-5 text-pink" />
            <span className="text-sm">Log In</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
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
            <button className="rounded-full bg-pink px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-pink-deep transition-colors">
              Add to Chrome
            </button>
            <button className="rounded-full border border-ink/20 bg-white px-6 py-3 text-sm font-medium text-ink hover:border-ink/40 transition-colors">
              Explore Opportunities
            </button>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-2">
              {["#f472b6", "#c4b5fd", "#60a5fa", "#f9a8d4"].map((c, i) => (
                <div
                  key={i}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-semibold text-white"
                  style={{ backgroundColor: c }}
                >
                  {["J", "M", "P", "L"][i]}
                </div>
              ))}
            </div>
            <span className="text-xs text-ink/60">10k+ girls in the community</span>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute right-8 top-0 h-40 w-40 rounded-sm bg-lilac/60" />
          <div className="absolute left-4 top-16 h-44 w-44 rotate-[-6deg] rounded-sm bg-cream shadow-sm" />
          <div className="relative z-10">
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
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 py-24 md:grid-cols-2 md:items-center">
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
              className="flex items-center gap-3 rounded-full border border-pink-soft bg-pink-soft/40 px-4 py-2.5 text-sm text-ink/80"
            >
              <span className="text-xs font-semibold text-pink">
                {String(i + 1).padStart(2, "0")}
              </span>
              {b}
            </li>
          ))}
        </ul>
        <button className="mt-7 rounded-full bg-pink px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-pink-deep transition-colors">
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
    <div className="relative">
      <div className="rounded-2xl border border-ink/10 bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between border-b border-ink/5 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <span className="rounded-full bg-pink px-3 py-1 text-[10px] font-semibold text-white">
            INSTALL FREE
          </span>
        </div>
        <div className="p-6">
          <p className="mb-4 text-sm font-semibold text-ink">
            Opportunity saved ✓
          </p>
          <div className="space-y-2">
            {items.map((it) => (
              <div
                key={it.n}
                className="flex items-center justify-between rounded-lg bg-pink-soft/50 px-3 py-2.5 text-xs text-ink/80"
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
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 py-24 md:grid-cols-2 md:items-center">
      <div>
        <SectionHeader kicker="Your dashboard" first="Y" main="our opportunities," />
        <h2 className="text-4xl font-bold leading-tight text-ink md:text-5xl">
          <span className="font-display text-pink">organized.</span>
        </h2>
        <ul className="mt-6 space-y-2 text-sm text-ink/80">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-pink" />
              {b}
            </li>
          ))}
        </ul>
        <button className="mt-7 flex items-center gap-1 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/40 transition-colors">
          Open your dashboard <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <DashboardMock />
    </section>
  );
}

function DashboardMock() {
  const rows = [
    { name: "Gates Scholarship", type: "Scholarship", date: "May 15", status: "Due Soon", tone: "bg-pink text-white" },
    { name: "Canva Career Program", type: "Internship", date: "May 30", status: "Applied", tone: "bg-lilac text-ink" },
    { name: "Google STEP Internship", type: "Internship", date: "May 20", status: "Saved", tone: "bg-pink-soft text-pink-deep" },
    { name: "Female Founders Fellowship", type: "Fellowship", date: "Jun 1", status: "—", tone: "bg-muted text-ink/60" },
  ];
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">Good morning, bestie 💗</p>
          <p className="text-xs text-ink/60">You've got 5 deadlines coming up this week</p>
        </div>
        <div className="flex -space-x-1.5">
          <div className="h-5 w-5 rounded-full bg-pink" />
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
          <div key={s.l} className="rounded-lg bg-pink-soft/40 p-2">
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
              <tr key={r.name}>
                <td className="py-2 text-ink">{r.name}</td>
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
  );
}

function Chat() {
  const tags = ["Essay feedback", "Essay feedback", "Essay feedback", "Essay feedback", "Essay feedback"];
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 py-24 md:grid-cols-2 md:items-center">
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
              className="rounded-full border border-ink/15 bg-white px-3 py-1 text-xs text-ink/70"
            >
              {t}
            </span>
          ))}
        </div>
        <button className="mt-7 rounded-full bg-pink px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-pink-deep transition-colors">
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
    <div className="relative rounded-2xl border border-ink/10 bg-white p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]">
      <div className="absolute -top-3 left-5 rounded-full bg-pink px-3 py-1 text-[10px] font-semibold text-white">
        LIVE NOW
      </div>
      <div className="flex items-center justify-between border-b border-ink/5 pb-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-pink" />
          <span className="text-sm font-semibold text-ink">Girl Chat</span>
        </div>
        <span className="text-[10px] text-ink/50">234 online</span>
      </div>
      <div className="mt-4 space-y-3">
        {msgs.map((m) => (
          <div key={m.who} className="flex gap-2">
            <div className={`h-7 w-7 shrink-0 rounded-full ${m.color}`} />
            <div className="flex-1">
              <p className="text-[11px] font-semibold text-ink">{m.who}</p>
              <p className="rounded-lg bg-muted px-3 py-2 text-xs text-ink/80">
                {m.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-full border border-ink/10 px-3 py-2">
        <input
          placeholder="Say hello ..."
          className="flex-1 bg-transparent text-xs outline-none"
        />
        <Bookmark className="h-4 w-4 text-pink" />
      </div>
    </div>
  );
}

function Videos() {
  const cards = [
    { title: "LinkedIn alone doesn't get you the internship", bg: "from-pink-soft to-pink" },
    { title: "How to answer 'Why do you want to work for us?'", bg: "from-lilac to-pink-soft" },
    { title: "I almost lost $10,000", bg: "from-pink to-pink-deep" },
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
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.title}
            className={`group relative aspect-[9/14] overflow-hidden rounded-2xl bg-gradient-to-br ${c.bg} shadow-[0_20px_60px_-30px_rgba(0,0,0,0.3)]`}
          >
            <div className="absolute left-3 right-3 top-3 flex items-center justify-between rounded-full bg-white/90 px-2 py-1 text-[10px]">
              <div className="flex items-center gap-1.5">
                <div className="h-4 w-4 rounded-full bg-pink" />
                <span className="font-semibold text-ink">girls.on.campus</span>
              </div>
              <span className="rounded-full bg-blue-500 px-2 py-0.5 text-white">
                View profile
              </span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-white/25 p-4 backdrop-blur-sm group-hover:bg-white/40 transition-colors">
                <Play className="h-8 w-8 fill-white text-white" />
              </div>
            </div>
            <p className="absolute bottom-4 left-4 right-4 text-left text-lg font-bold leading-tight text-white drop-shadow">
              {c.title}
            </p>
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
