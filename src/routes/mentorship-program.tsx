import { createFileRoute, Link } from "@tanstack/react-router";
import { UserCircle2, MessageCircle, CheckCircle2, Heart, Sparkles, Star } from "lucide-react";

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
          <button className="rounded-full bg-pink px-5 py-2 text-sm font-medium text-white shadow-md hover:bg-pink-deep hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
            Add to Chrome
          </button>
          <a href="#" className="flex items-center gap-1.5 text-ink/80 hover:text-pink transition-colors">
            <UserCircle2 className="h-5 w-5 text-pink" />
            <span className="text-sm font-medium">Log In</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function FloatingStickers() {
  return (
    <>
      {/* 3D Bow Top Left */}
      <div className="absolute left-6 top-10 z-10 text-4xl md:text-5xl animate-bounce duration-1000 select-none filter drop-shadow-md">
        🎀
      </div>
      {/* 3D Cloud Top Right */}
      <div className="absolute right-10 top-12 z-10 text-4xl md:text-5xl animate-pulse select-none filter drop-shadow-sm">
        ☁️
      </div>
      {/* Small Cloud Top Center */}
      <div className="absolute left-1/2 top-4 -translate-x-1/2 text-2xl opacity-70 select-none">
        ☁️
      </div>
      {/* Butterfly Margin Left */}
      <div className="absolute left-4 top-[550px] z-10 text-4xl md:text-5xl animate-pulse hidden lg:block select-none filter drop-shadow">
        🦋
      </div>
      {/* Cherry Badge Margin Right */}
      <div className="absolute right-6 top-[850px] z-10 text-4xl md:text-5xl animate-bounce hidden lg:block select-none filter drop-shadow">
        🍒
      </div>
    </>
  );
}

function HeroHeader() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fbf4ff] via-[#fff5fa] to-white py-14 md:py-20 text-center">
      <FloatingStickers />

      <div className="mx-auto max-w-4xl px-6 relative z-20">
        {/* Soft 3D Cloud Icon Badge */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/80 backdrop-blur shadow-md border border-pink-soft text-3xl">
          ☁️
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-[#1e1b4b] md:text-6xl lg:text-7xl leading-tight">
          The Mentorship Program
        </h1>
        <p className="mt-3 text-3xl md:text-4xl font-display italic text-pink-deep">
          for <span className="font-sans not-italic font-extrabold text-[#1e1b4b]">Girls by Girls</span>
        </p>

        {/* Glossy Pill Badge */}
        <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-pink/40 bg-gradient-to-r from-[#fce7f3] to-[#fbcfe8] px-7 py-2.5 shadow-md">
          <span className="h-3 w-3 rounded-full bg-pink animate-ping" />
          <span className="text-xs md:text-sm font-bold text-pink-deep tracking-wide">
            1-on-1 Personalized Mentorship
          </span>
        </div>

        <p className="mt-6 text-xs md:text-sm font-medium text-ink/75">
          Open to any girl of any age · Opening summer 2025
        </p>

        <div className="mt-3 inline-block rounded-full bg-pink/10 px-4 py-1 border border-pink/30">
          <p className="text-xs md:text-sm font-extrabold text-pink-deep tracking-wider uppercase">
            Applications are now closed!
          </p>
        </div>
      </div>
    </section>
  );
}

function PhoneIllustration() {
  return (
    <div className="relative flex items-center justify-center">
      {/* 3D Pink Rotary Telephone Card Container */}
      <div className="relative h-64 w-64 md:h-72 md:w-72 flex items-center justify-center rounded-3xl bg-gradient-to-tr from-[#fbcfe8] via-[#fce7f3] to-[#f5d0fe] p-6 shadow-2xl border-4 border-white transition-all duration-300 hover:scale-105">
        <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-xl" fill="none">
          {/* Telephone Base */}
          <path
            d="M 40 130 C 40 90, 70 70, 100 70 C 130 70, 160 90, 160 130 C 160 150, 140 160, 100 160 C 60 160, 40 150, 40 130 Z"
            fill="#ec4899"
          />
          <path
            d="M 50 125 C 50 95, 75 78, 100 78 C 125 78, 150 95, 150 125 Z"
            fill="#f472b6"
          />
          {/* Rotary Dial */}
          <circle cx="100" cy="125" r="32" fill="#ffffff" stroke="#f472b6" strokeWidth="4" />
          <circle cx="100" cy="125" r="14" fill="#db2777" />
          <circle cx="100" cy="100" r="5" fill="#f472b6" />
          <circle cx="118" cy="108" r="5" fill="#f472b6" />
          <circle cx="125" cy="125" r="5" fill="#f472b6" />
          <circle cx="118" cy="142" r="5" fill="#f472b6" />
          <circle cx="100" cy="150" r="5" fill="#f472b6" />
          <circle cx="82" cy="142" r="5" fill="#f472b6" />
          {/* Handset */}
          <path
            d="M 25 65 C 20 40, 50 25, 70 40 L 130 40 C 150 25, 180 40, 175 65 C 170 80, 150 80, 140 60 L 60 60 C 50 80, 30 80, 25 65 Z"
            fill="#db2777"
          />
          {/* Coiled Cord */}
          <path
            d="M 45 135 Q 35 155, 45 170 Q 55 185, 40 190"
            stroke="#db2777"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <div className="absolute -top-3 -left-3 text-4xl filter drop-shadow">🎀</div>
      </div>
    </div>
  );
}

function StarburstBadge() {
  return (
    <div className="relative flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#fce7f3] via-[#fbcfe8] to-[#f5d0fe] rounded-3xl border-3 border-white shadow-xl max-w-sm text-center transform hover:rotate-1 transition-transform">
      {/* 16-point Hot Pink Starburst Badge */}
      <div className="relative mb-4 flex items-center justify-center">
        <svg className="w-44 h-44 text-pink animate-spin-slow" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 L58 20 L78 8 L72 30 L95 30 L80 48 L100 62 L78 68 L85 90 L65 80 L58 100 L44 82 L30 96 L32 74 L10 75 L22 56 L0 44 L22 36 L12 15 L32 22 Z" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 text-white">
          <p className="font-display italic text-2xl md:text-3xl leading-none drop-shadow-md">
            Ready to
          </p>
          <p className="font-display italic text-2xl md:text-3xl leading-none drop-shadow-md">
            answer?
          </p>
        </div>
      </div>

      <button className="rounded-full bg-[#1e1b4b] px-8 py-3 text-xs font-bold text-white shadow-lg hover:bg-pink-deep hover:shadow-pink/40 transition-all duration-300 transform hover:-translate-y-0.5 tracking-wider uppercase">
        APPLY NOW
      </button>
    </div>
  );
}

function TelephoneSection() {
  return (
    <section className="relative mx-auto max-w-4xl px-6 py-10 md:py-16">
      <div className="flex flex-col items-center justify-center md:flex-row md:gap-16">
        <PhoneIllustration />
        <div className="mt-8 md:mt-0">
          <StarburstBadge />
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12 text-center">
      <div className="flex items-center justify-center gap-2">
        <h2 className="font-display italic text-3xl md:text-4xl lg:text-5xl text-[#1e1b4b]">
          How does it work?
        </h2>
        <span className="text-3xl select-none">🎀</span>
      </div>

      <div className="mt-6 rounded-3xl bg-gradient-to-b from-[#faf0ca]/30 via-[#fce7f3]/40 to-[#f5e6ff]/30 p-8 border border-pink-soft/50 shadow-sm">
        <p className="text-xs md:text-sm leading-relaxed text-ink/80 max-w-2xl mx-auto">
          The Girls On Campus mentorship program pairs high school and college
          students with experienced female mentors from various fields. Mentors
          provide guidance, support, and career advice to help mentees navigate
          their academic and professional journeys. The program includes one-on-one
          virtual meetings, monthly workshops, and networking events designed to
          empower students and foster a supportive community.
        </p>

        <p className="mt-5 text-xs md:text-sm font-semibold italic text-pink-deep">
          Available to any girl of any background, high school or college student
          anywhere in the world. Completely free of charge!
        </p>
      </div>

      <button className="mt-7 rounded-md bg-[#1e1b4b] px-8 py-3 text-xs font-bold text-white shadow-md hover:bg-pink-deep transition-all duration-300 tracking-wider">
        Tell me more
      </button>
    </section>
  );
}

function StepsTimeline() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-16">
      {/* Central Vertical Connecting Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-pink-soft via-pink to-pink-soft hidden md:block rounded-full opacity-60" />

      <div className="space-y-24 relative z-10">
        {/* Step 1: Get exposure to different careers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-left md:text-right md:pr-10">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#fce7f3] px-3 py-1 text-[11px] font-bold text-pink-deep uppercase tracking-wider mb-3">
              <span>☁️</span> CAREER EXPLORATION
            </div>
            <h3 className="font-display italic text-3xl md:text-4xl text-[#1e1b4b] leading-tight">
              Get exposure to different careers, industries and majors
            </h3>
            <p className="mt-3 text-xs md:text-sm leading-relaxed text-ink/75">
              Explore new options you didn't know existed with mentors from
              tech, law, finance, medicine and more!
            </p>
          </div>

          <div className="md:pl-10 flex justify-center md:justify-start">
            {/* Retro Y2K Lilac PC Graphic Card */}
            <div className="relative w-full max-w-sm rounded-2xl border-3 border-purple-300 bg-[#f3e8ff] p-5 shadow-xl transform hover:-rotate-1 transition-transform">
              <div className="flex items-center justify-between border-b border-purple-300/60 pb-2 mb-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="text-[10px] font-bold text-purple-700">RETRO-OS 98</span>
              </div>
              <div className="rounded-xl bg-[#1e1b4b] p-5 text-center text-white border border-purple-400/40 shadow-inner">
                <p className="text-xs font-mono text-purple-200 uppercase tracking-wide leading-relaxed">
                  "IT SEEMS LIKE THE WORK-LIFE BALANCE IS A LOT BETTER THAN I THOUGHT"
                </p>
              </div>
              {/* Blue Error Warning Pop-up */}
              <div className="mt-3 rounded-lg border border-blue-400 bg-blue-600 p-3 text-white text-[11px] font-mono shadow-md flex items-center justify-between">
                <span>⚠️ VP of Engineering matched!</span>
                <span className="rounded bg-white/20 px-2 py-0.5 text-[9px] font-bold">OK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: College and Career Advice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 md:pr-10 flex justify-center md:justify-end">
            {/* Retro Windows Popup Card */}
            <div className="relative w-full max-w-sm rounded-2xl border-3 border-pink-300 bg-white p-5 shadow-xl transform hover:rotate-1 transition-transform">
              <div className="flex items-center justify-between rounded-t-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-3 py-1.5 text-white text-xs font-bold">
                <span>College? Internships?</span>
                <span>✖</span>
              </div>
              <div className="p-5 bg-pink-soft/30 rounded-b-lg border border-t-0 border-pink-soft text-center">
                <p className="text-xs font-bold text-[#1e1b4b]">Personalized Essay & Resume Review</p>
                <p className="text-[11px] text-ink/70 mt-1">Direct 1-on-1 feedback from top university alumni</p>
                <button className="mt-4 rounded-full bg-pink px-5 py-1.5 text-xs font-bold text-white shadow-md hover:bg-pink-deep transition-colors">
                  Next Step
                </button>
              </div>
              {/* Blue Gummy Bear Floating Icon */}
              <div className="absolute -bottom-4 -right-4 text-5xl filter drop-shadow-md select-none">
                🧸
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 text-left md:pl-10">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#fce7f3] px-3 py-1 text-[11px] font-bold text-pink-deep uppercase tracking-wider mb-3">
              <span>☁️</span> ADVICE & GUIDANCE
            </div>
            <h3 className="font-display italic text-3xl md:text-4xl text-[#1e1b4b] leading-tight">
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
          <div className="text-left md:text-right md:pr-10">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#fce7f3] px-3 py-1 text-[11px] font-bold text-pink-deep uppercase tracking-wider mb-3">
              <span>⭐️</span> NETWORKING
            </div>
            <h3 className="font-display italic text-3xl md:text-4xl text-[#1e1b4b] leading-tight">
              Network and find a mentor
            </h3>
            <p className="mt-3 text-xs md:text-sm leading-relaxed text-ink/75">
              Build long-lasting connections with inspirational female leaders who
              can help unlock doors to your dream school or career path.
            </p>
          </div>

          <div className="md:pl-10 flex justify-center md:justify-start">
            {/* Retro Y2K Flip Phone Card */}
            <div className="relative w-full max-w-sm rounded-2xl border-3 border-pink-300 bg-gradient-to-r from-[#fde8f4] to-[#fce7f3] p-6 shadow-xl flex items-center gap-4 transform hover:-rotate-1 transition-transform">
              <div className="text-6xl select-none filter drop-shadow">📱</div>
              <div>
                <span className="rounded-full bg-pink px-2.5 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                  STAY FAB 💗
                </span>
                <p className="text-xs font-bold text-[#1e1b4b] mt-2">
                  Senior Product Designer at Google matched!
                </p>
              </div>
              <div className="absolute -top-4 -right-4 text-4xl filter drop-shadow select-none">
                ⭐️
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MenteeSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#f8f0ff] via-[#fce7f3]/60 to-[#fdf4ff] pt-20 pb-24 rounded-t-[60px] md:rounded-t-[100px] shadow-2xl mt-12">
      {/* 3D FAQ Pink Envelope Badge Bridging Section */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="flex h-22 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-pink via-pink-deep to-purple-600 shadow-2xl border-4 border-white text-white font-black text-xl tracking-wider transform hover:scale-105 transition-transform">
          ✉️ FAQ
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 text-center pt-8">
        <h2 className="font-display italic text-3xl md:text-5xl text-[#1e1b4b]">
          Join Us as a Mentee!
        </h2>
        <p className="mt-4 text-xs md:text-sm leading-relaxed text-ink/80 max-w-xl mx-auto">
          Girls On Campus is excited to launch our 1-on-1 mentorship program this
          summer. Below is a quick overview of what you can expect:
        </p>

        <div className="mt-8 text-left max-w-xl mx-auto space-y-3.5 bg-white/80 backdrop-blur-md p-7 rounded-3xl border border-pink/30 shadow-lg text-xs md:text-sm text-ink/80">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-pink shrink-0 mt-0.5" />
            <p>Matches are made based on shared interests, career goals, and academic level to ensure a meaningful connection.</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-pink shrink-0 mt-0.5" />
            <p>Mentors are verified female professionals and university students passionate about giving back.</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-pink shrink-0 mt-0.5" />
            <p>Program is 100% free of charge for all accepted mentees.</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-pink shrink-0 mt-0.5" />
            <p>Complete the form below to get notified when applications reopen!</p>
          </div>
        </div>

        {/* Glassmorphic Form Container */}
        <div className="mt-10 max-w-md mx-auto bg-white p-7 rounded-3xl shadow-xl border border-pink/40">
          <p className="text-xs font-bold uppercase tracking-wider text-pink-deep mb-3">
            GET NOTIFIED WHEN APPLICATIONS OPEN
          </p>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="e.g. alexa@gmail.com"
              className="w-full rounded-xl border border-pink-soft bg-pink-soft/20 px-4 py-3 text-xs text-ink outline-none focus:border-pink focus:ring-2 focus:ring-pink/20 transition-all"
            />
            <button
              type="button"
              className="w-full rounded-xl bg-pink px-5 py-3 text-xs font-extrabold text-white shadow-md hover:bg-pink-deep transition-all duration-300 uppercase tracking-wider"
            >
              Notify me
            </button>
            <label className="mt-2 flex items-center justify-center gap-2 text-[11px] text-ink/70">
              <input type="checkbox" className="accent-pink rounded" defaultChecked />
              I want to receive updates and news
            </label>
          </form>
        </div>

        {/* Y2K Accessories Row */}
        <div className="mt-14 flex justify-center items-center gap-8 text-4xl select-none filter drop-shadow">
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
    <div className="min-h-screen bg-white font-sans text-ink selection:bg-pink-soft selection:text-pink-deep">
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
        className="fixed right-5 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-pink text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-pink-deep active:scale-95"
      >
        <MessageCircle className="h-6 w-6 fill-current" />
      </button>
    </div>
  );
}
