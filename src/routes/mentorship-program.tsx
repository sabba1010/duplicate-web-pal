import { createFileRoute, Link } from "@tanstack/react-router";
import { UserCircle2, MessageCircle, Sparkles, Heart, Star, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/mentorship-program")({
  head: () => ({
    meta: [
      { title: "Mentorship Program — Girls On Campus" },
      {
        name: "description",
        content:
          "The Mentorship Program for Girls by Girls. Pair with experienced female mentors from tech, law, finance, medicine, and more.",
      },
      { property: "og:title", content: "Mentorship Program — Girls On Campus" },
      {
        property: "og:description",
        content:
          "The Mentorship Program for Girls by Girls. Pair with experienced female mentors from tech, law, finance, medicine, and more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MentorshipPage,
});

function Nav() {
  const links: { label: string; to: string }[] = [
    { label: "Home", to: "/" },
    { label: "$1500 Social Science Excellence", to: "/social-science-excellence" },
    { label: "Meet the team", to: "/meet-the-team" },
    { label: "Partners", to: "/partners" },
    { label: "Member Page", to: "/" },
    { label: "Mentorship Program", to: "/mentorship-program" },
  ];
  return (
    <header className="w-full bg-white relative z-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-sm">
        <nav className="hidden items-center gap-7 text-ink/80 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`transition-colors hover:text-pink-deep ${
                l.to === "/mentorship-program" ? "font-semibold text-pink-deep" : ""
              }`}
            >
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

function HeroHeader() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf5ff] via-white to-white py-12 md:py-16 text-center">
      {/* Floating Y2K Coquette Background Icons */}
      <div className="absolute left-6 top-8 text-3xl md:text-5xl animate-bounce duration-1000">
        🎀
      </div>
      <div className="absolute right-8 top-10 text-3xl md:text-4xl animate-pulse">
        ☁️
      </div>
      <div className="absolute left-1/2 -top-2 -translate-x-1/2 text-2xl opacity-60">
        ☁️
      </div>

      <div className="mx-auto max-w-4xl px-6 relative z-10">
        <h1 className="text-3xl font-bold tracking-tight text-[#1e1b4b] md:text-5xl lg:text-6xl">
          The Mentorship Program
        </h1>
        <p className="mt-2 text-2xl md:text-3xl font-display italic text-pink-deep">
          for <span className="font-sans not-italic font-bold">Girls by Girls</span>
        </p>

        {/* Pink Tag Pill */}
        <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-pink-soft bg-[#fce7f3] px-6 py-2 shadow-inner">
          <span className="h-2.5 w-2.5 rounded-full bg-pink animate-ping" />
          <span className="text-xs font-semibold text-pink-deep">
            1-on-1 Personalized Mentorship
          </span>
        </div>

        <p className="mt-5 text-xs md:text-sm text-ink/70">
          Open to any girl of any age · Opening summer 2025
        </p>

        <p className="mt-2 text-sm font-bold text-pink-deep tracking-wide uppercase">
          Applications are now closed!
        </p>
      </div>
    </section>
  );
}

function TelephoneSection() {
  return (
    <section className="relative mx-auto max-w-4xl px-6 py-10 md:py-16">
      <div className="flex flex-col items-center justify-center md:flex-row md:gap-12">
        {/* Vintage Pink Telephone Illustration */}
        <div className="relative group cursor-pointer">
          <div className="relative h-56 w-56 md:h-64 md:w-64 flex items-center justify-center rounded-3xl bg-gradient-to-br from-[#fce7f3] to-[#fbcfe8] p-6 shadow-xl transition-transform duration-300 hover:scale-105">
            <div className="text-8xl md:text-9xl drop-shadow-lg select-none">
              ☎️
            </div>
            <div className="absolute -top-3 -left-3 text-3xl">🎀</div>
          </div>
        </div>

        {/* Starburst Speech Bubble "Ready to answer?" */}
        <div className="mt-8 md:mt-0 relative flex flex-col items-center justify-center p-8 bg-gradient-to-r from-pink-soft to-[#fce7f3] rounded-3xl border-2 border-pink/40 shadow-lg text-center max-w-sm">
          {/* Starburst badge */}
          <div className="absolute -top-5 right-4 rounded-full bg-pink px-3 py-1 text-[10px] font-extrabold text-white uppercase tracking-widest shadow">
            APPLY NOW
          </div>
          <h3 className="font-display italic text-3xl md:text-4xl text-pink-deep leading-tight">
            Ready to<br />answer?
          </h3>
          <button className="mt-4 rounded-full bg-[#1e1b4b] px-6 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-pink-deep transition-colors">
            APPLY NOW
          </button>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12 text-center">
      <div className="flex items-center justify-center gap-2">
        <h2 className="font-display italic text-3xl md:text-4xl text-[#1e1b4b]">
          How does it work?
        </h2>
        <span className="text-2xl">🎀</span>
      </div>

      <p className="mt-6 text-xs md:text-sm leading-relaxed text-ink/80 max-w-2xl mx-auto">
        The Girls On Campus mentorship program pairs high school and college
        students with experienced female mentors from various fields. Mentors
        provide guidance, support, and career advice to help mentees navigate
        their academic and professional journeys. The program includes one-on-one
        virtual meetings, monthly workshops, and networking events designed to
        empower students and foster a supportive community.
      </p>

      <p className="mt-4 text-xs italic text-pink-deep">
        Available to any girl of any background, high school or college student
        anywhere in the world. Completely free of charge!
      </p>

      <button className="mt-6 rounded-md bg-[#1e1b4b] px-6 py-2.5 text-xs font-semibold text-white shadow hover:bg-pink-deep transition-colors">
        Tell me more
      </button>
    </section>
  );
}

function StepsTimeline() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-16">
      {/* Central Vertical Connecting Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-pink/30 via-pink to-pink/30 hidden md:block" />

      {/* Floating Side Icons */}
      <div className="absolute left-4 top-12 text-4xl animate-pulse hidden md:block">
        🦋
      </div>
      <div className="absolute right-6 bottom-32 text-4xl animate-bounce hidden md:block">
        🍒
      </div>

      <div className="space-y-20 relative z-10">
        {/* Step 1: Get exposure to different careers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-left md:text-right md:pr-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-deep uppercase tracking-wider mb-2">
              <span>☁️</span> CAREER EXPLORATION
            </div>
            <h3 className="font-display italic text-2xl md:text-3xl text-[#1e1b4b]">
              Get exposure to different careers, industries and majors
            </h3>
            <p className="mt-3 text-xs md:text-sm leading-relaxed text-ink/75">
              Explore new options you didn't know existed with mentors from
              tech, law, finance, medicine and more!
            </p>
          </div>

          <div className="md:pl-8 flex justify-center md:justify-start">
            {/* Y2K Retro Lilac PC Graphic Card */}
            <div className="relative w-full max-w-sm rounded-2xl border-2 border-pink/30 bg-[#f5e6ff] p-5 shadow-lg">
              <div className="flex items-center justify-between border-b border-purple-200 pb-2 mb-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="text-[9px] font-bold text-purple-700">RETRO-OS 98</span>
              </div>
              <div className="rounded-xl bg-[#1e1b4b] p-4 text-center text-white">
                <p className="text-xs font-mono text-purple-200 uppercase tracking-wide">
                  "IT SEEMS LIKE THE WORK-LIFE BALANCE IS A LOT BETTER THAN I THOUGHT"
                </p>
              </div>
              {/* Blue Error Warning Pop-up */}
              <div className="mt-3 rounded-lg border border-blue-400 bg-blue-600 p-2.5 text-white text-[11px] font-mono shadow-md flex items-center justify-between">
                <span>⚠️ VP of Engineering matched!</span>
                <span className="rounded bg-white/20 px-2 py-0.5 text-[9px]">OK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: College and Career Advice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 md:pr-8 flex justify-center md:justify-end">
            {/* Y2K Retro Windows Popup Card */}
            <div className="relative w-full max-w-sm rounded-2xl border-2 border-pink/30 bg-white p-5 shadow-lg">
              <div className="flex items-center justify-between rounded-t-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 text-white text-xs font-bold">
                <span>College? Internships?</span>
                <span>✖</span>
              </div>
              <div className="p-4 bg-muted/40 rounded-b-lg border border-t-0 border-ink/10 text-center">
                <p className="text-xs font-semibold text-ink">Personalized Essay & Resume Review</p>
                <button className="mt-3 rounded bg-pink px-4 py-1 text-xs font-bold text-white shadow">
                  Next Step
                </button>
              </div>
              {/* Gummy Bear Icon */}
              <div className="absolute -bottom-3 -right-3 text-4xl">
                🧸
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 text-left md:pl-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-deep uppercase tracking-wider mb-2">
              <span>☁️</span> ADVICE & GUIDANCE
            </div>
            <h3 className="font-display italic text-2xl md:text-3xl text-[#1e1b4b]">
              College and Career advice
            </h3>
            <p className="mt-3 text-xs md:text-sm leading-relaxed text-ink/75">
              Get personalized advice on applying for college, writing essays,
              securing internships, and positioning yourself for success.
            </p>
          </div>
        </div>

        {/* Step 3: Network and Find a Mentor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-left md:text-right md:pr-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-deep uppercase tracking-wider mb-2">
              <span>⭐️</span> NETWORKING
            </div>
            <h3 className="font-display italic text-2xl md:text-3xl text-[#1e1b4b]">
              Network and find a mentor
            </h3>
            <p className="mt-3 text-xs md:text-sm leading-relaxed text-ink/75">
              Build long-lasting connections with inspirational female leaders who
              can help unlock doors to your dream school or career path.
            </p>
          </div>

          <div className="md:pl-8 flex justify-center md:justify-start">
            {/* Retro Y2K Flip Phone Card */}
            <div className="relative w-full max-w-sm rounded-2xl border-2 border-pink/30 bg-[#fde8f4] p-6 shadow-lg flex items-center gap-4">
              <div className="text-6xl select-none">📱</div>
              <div>
                <p className="text-xs font-bold text-[#1e1b4b]">STAY FAB 💗</p>
                <p className="text-[11px] text-ink/70 mt-1">
                  Connected with Senior Product Designer at Google!
                </p>
              </div>
              <div className="absolute -top-3 -right-3 text-3xl">⭐️</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MenteeSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#f8f0ff] to-[#fce7f3] pt-16 pb-20 rounded-t-[50px] md:rounded-t-[80px] shadow-inner mt-10">
      {/* FAQ Envelope Badge Bridging Section */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="flex h-20 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-soft to-pink shadow-xl border-2 border-white text-white font-extrabold text-lg tracking-wider">
          ✉️ FAQ
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 text-center pt-8">
        <h2 className="font-display italic text-3xl md:text-4xl text-[#1e1b4b]">
          Join Us as a Mentee!
        </h2>
        <p className="mt-4 text-xs md:text-sm leading-relaxed text-ink/80 max-w-xl mx-auto">
          Girls On Campus is excited to launch our 1-on-1 mentorship program this
          summer. Below is a quick overview of what you can expect:
        </p>

        <div className="mt-8 text-left max-w-xl mx-auto space-y-3 bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-pink/20 shadow-sm text-xs md:text-sm text-ink/80">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-pink shrink-0 mt-0.5" />
            <p>Matches are made based on shared interests, career goals, and academic level to ensure a meaningful connection.</p>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-pink shrink-0 mt-0.5" />
            <p>Mentors are verified female professionals and university students passionate about giving back.</p>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-pink shrink-0 mt-0.5" />
            <p>Program is 100% free of charge for all accepted mentees.</p>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-pink shrink-0 mt-0.5" />
            <p>Complete the form below to get notified when applications reopen!</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="mt-10 max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md border border-pink/30">
          <p className="text-xs font-bold uppercase tracking-wider text-pink-deep mb-3">
            GET NOTIFIED WHEN APPLICATIONS OPEN
          </p>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="e.g. alexa@gmail.com"
              className="w-full rounded-md border border-pink-soft px-4 py-2.5 text-xs text-ink outline-none focus:border-pink focus:ring-1 focus:ring-pink"
            />
            <button
              type="button"
              className="w-full rounded-md bg-pink px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-pink-deep transition-colors"
            >
              Notify me
            </button>
            <label className="mt-2 flex items-center justify-center gap-2 text-[11px] text-ink/70">
              <input type="checkbox" className="accent-pink" defaultChecked />
              I want to receive updates and news
            </label>
          </form>
        </div>

        {/* Y2K Accessories Footer Icons */}
        <div className="mt-12 flex justify-center items-center gap-6 text-3xl select-none">
          <span>🌸</span>
          <span>🎀</span>
          <span>🪞</span>
          <span>🎧</span>
        </div>
      </div>
    </section>
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

function Footer() {
  const cols = [
    { title: "Explore", items: ["Opportunities", "Extension", "Girl Chat", "Resources", "Newsletter"] },
    { title: "Company", items: ["Partner With Us", "About", "Contact", "Donate"] },
    { title: "Follow", items: ["Instagram", "Tik Tok", "Linkedin"] },
    { title: "Legal", items: ["Privacy", "Terms"] },
  ];
  return (
    <footer className="border-t border-ink/10 bg-white text-ink">
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

export function MentorshipPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Nav />
      <HeroHeader />
      <TelephoneSection />
      <HowItWorks />
      <StepsTimeline />
      <MenteeSection />
      <Footer />

      {/* Floating Chat Action Button */}
      <button
        aria-label="Open chat"
        className="fixed right-5 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-pink text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        <MessageCircle className="h-6 w-6 fill-current" />
      </button>
    </div>
  );
}
