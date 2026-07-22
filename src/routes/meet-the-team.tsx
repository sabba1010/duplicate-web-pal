import { createFileRoute, Link } from "@tanstack/react-router";
import { UserCircle2, Linkedin, MessageCircle, Sparkles, Heart } from "lucide-react";
import karlaImg from "../Assets/Karla M..avif";
import julieImg from "../Assets/Julie M..avif";

export const Route = createFileRoute("/meet-the-team")({
  head: () => ({
    meta: [
      { title: "Meet the Team — Girls On Campus" },
      {
        name: "description",
        content:
          "Meet Karla M. and Julie M., founders of Girls On Campus — empowering high school and college women with scholarships, internships, and opportunities.",
      },
      { property: "og:title", content: "Meet the Team — Girls On Campus" },
      {
        property: "og:description",
        content:
          "Meet Karla M. and Julie M., founders of Girls On Campus — empowering high school and college women with scholarships, internships, and opportunities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MeetTheTeam,
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

function StoryLogo() {
  return (
    <div className="relative flex flex-col items-center justify-center p-6">
      <div className="relative transform hover:scale-105 transition-transform duration-300">
        {/* Graduation cap */}
        <div className="absolute -top-8 left-4 text-pink-deep">
          <svg width="52" height="38" viewBox="0 0 48 36" fill="currentColor">
            <path d="M24 2L2 14L24 26L46 14L24 2Z" fill="#e05297" />
            <path d="M10 18.5V26.5C10 29.5 16.3 32 24 32C31.7 32 38 29.5 38 26.5V18.5" stroke="#e05297" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M42 16V27" stroke="#e05297" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="42" cy="28.5" r="2" fill="#e05297" />
          </svg>
        </div>
        <div className="text-center font-display text-5xl md:text-6xl text-pink-deep leading-tight">
          Girls on
          <br />
          <span className="text-5xl md:text-6xl">campus</span>
        </div>
      </div>
    </div>
  );
}

function FloatingStickers() {
  return (
    <>
      <div className="absolute left-6 top-10 text-4xl md:text-5xl animate-bounce duration-1000 select-none filter drop-shadow">
        🎀
      </div>
      <div className="absolute right-10 top-12 text-4xl md:text-5xl animate-pulse select-none filter drop-shadow-sm">
        ☁️
      </div>
      <div className="absolute left-10 top-[480px] text-4xl hidden lg:block select-none filter drop-shadow animate-pulse">
        🦋
      </div>
      <div className="absolute right-12 top-[600px] text-4xl hidden lg:block select-none filter drop-shadow animate-bounce">
        🌸
      </div>
    </>
  );
}

function OurStory() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fbf4ff] via-white to-white py-16 md:py-24">
      <FloatingStickers />

      <div className="mx-auto max-w-5xl px-6 relative z-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-soft px-4 py-1 text-xs font-bold text-pink-deep uppercase tracking-wider mb-2">
            <Sparkles className="h-3.5 w-3.5" /> OUR VISION & MISSION
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#1e1b4b] md:text-5xl">
            Our Story
          </h1>
          <div className="mx-auto mt-3 h-[3px] w-12 rounded-full bg-pink" />
        </div>

        <div className="mt-12 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="text-sm md:text-base leading-relaxed text-ink/80 space-y-4 bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-pink-soft/50 shadow-lg">
            <p>
              Recognizing the need for support, our founders envision a
              platform for high school and college students to bridge the
              gap and create a supportive community.
            </p>
            <p>
              They aim to ensure that everyone, regardless of background, has
              equal access to educational opportunities. Their initiative seeks
              to build a more inclusive environment for students pursuing a higher
              education.
            </p>
          </div>

          <div className="flex justify-center">
            <StoryLogo />
          </div>
        </div>
      </div>
    </section>
  );
}

function MeetTheTeamSection() {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.95 0.03 240) 0%, oklch(0.94 0.04 300) 40%, oklch(0.96 0.03 340) 70%, oklch(0.95 0.02 20) 100%)",
      }}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-4 py-1 text-xs font-bold text-pink-deep uppercase tracking-wider mb-2 shadow-sm">
            <Heart className="h-3.5 w-3.5 fill-current" /> THE LEADERSHIP
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#1e1b4b] md:text-5xl">
            Meet The Team
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-12 rounded-full bg-pink" />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          {/* Member 1: Karla M. */}
          <div className="flex flex-col items-center text-left bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-white/80 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
            <div className="relative mb-6 h-64 w-64 md:h-72 md:w-72 drop-shadow-xl transform hover:scale-105 transition-transform duration-300">
              <img
                src={karlaImg}
                alt="Karla M. - Co Founder & CEO"
                className="h-full w-full object-contain filter drop-shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 text-3xl">🎀</div>
            </div>

            <div className="w-full max-w-md">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-[#1e1b4b] md:text-2xl">
                  Karla M.
                </h3>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Karla M. LinkedIn"
                  className="rounded-full bg-pink-soft p-2 text-ink hover:bg-pink hover:text-white transition-colors shadow-sm"
                >
                  <Linkedin className="h-4 w-4 fill-current" />
                </a>
              </div>
              <p className="mt-1 text-xs md:text-sm font-bold text-pink-deep uppercase tracking-wider">
                Co Founder & CEO
              </p>
              <div className="mt-4 text-xs md:text-sm leading-relaxed text-ink/80 space-y-3">
                <p>
                  Hi! My name is Karla, and I'm currently a junior in
                  College. I love creating things and wanted to make a place
                  where women can support each other.
                </p>
                <p>
                  I love pets. I have two geckos of my own and would love a
                  dog. I'm also very into makeup and anime. So far, my
                  favorite animes are JoJo's Bizarre Adventure and Jujutsu
                  Kaisen.
                </p>
                <p className="font-semibold text-pink-deep">
                  I'd love to connect with people who share similar interests!
                </p>
              </div>
            </div>
          </div>

          {/* Member 2: Julie M. */}
          <div className="flex flex-col items-center text-left bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-white/80 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
            <div className="relative mb-6 h-64 w-64 md:h-72 md:w-72 drop-shadow-xl transform hover:scale-105 transition-transform duration-300">
              <img
                src={julieImg}
                alt="Julie M. - Co-founder and Website Designer"
                className="h-full w-full object-contain filter drop-shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 text-3xl">🌸</div>
            </div>

            <div className="w-full max-w-md">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-[#1e1b4b] md:text-2xl">
                  Julie M.
                </h3>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Julie M. LinkedIn"
                  className="rounded-full bg-pink-soft p-2 text-ink hover:bg-pink hover:text-white transition-colors shadow-sm"
                >
                  <Linkedin className="h-4 w-4 fill-current" />
                </a>
              </div>
              <p className="mt-1 text-xs md:text-sm font-bold text-pink-deep uppercase tracking-wider">
                Co-founder and Website Designer
              </p>
              <div className="mt-4 text-xs md:text-sm leading-relaxed text-ink/80 space-y-3">
                <p>Hello! My name is Julie.</p>
                <p>
                  One of my greatest passions is connecting with animals,
                  especially dogs. There's something incredibly heartwarming
                  about the companionship and loyalty they offer. Corgis, in
                  particular, have stolen my heart with their adorable looks and
                  playful personalities.
                </p>
                <p className="font-semibold text-pink-deep">
                  My education is very important to me so I would love to be
                  able to uplift women in an education setting.
                </p>
              </div>
            </div>
          </div>
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
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/20 text-[10px] font-semibold hover:border-pink hover:text-pink transition-colors">
              IG
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/20 text-[10px] font-semibold hover:border-pink hover:text-pink transition-colors">
              TT
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/20 text-[10px] font-semibold hover:border-pink hover:text-pink transition-colors">
              LI
            </span>
          </div>
          <p className="text-xs text-ink/50">Girls On Campus LLC 2026</p>
        </div>
      </div>
    </footer>
  );
}

export function MeetTheTeam() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink selection:bg-pink-soft selection:text-pink-deep">
      <Nav />
      <OurStory />
      <MeetTheTeamSection />
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
