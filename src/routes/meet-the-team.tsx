import { createFileRoute, Link } from "@tanstack/react-router";
import { UserCircle2, Linkedin, MessageCircle } from "lucide-react";
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
    { label: "Mentorship Program", to: "/" },
  ];
  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-sm">
        <nav className="hidden items-center gap-7 text-ink/80 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`transition-colors hover:text-pink-deep ${
                l.to === "/meet-the-team" ? "font-semibold text-pink-deep" : ""
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

function StoryLogo() {
  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      <div className="relative">
        {/* Graduation cap */}
        <div className="absolute -top-7 left-4 text-pink-deep">
          <svg width="48" height="36" viewBox="0 0 48 36" fill="currentColor">
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

function OurStory() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#1e1b4b] md:text-4xl">
            Our Story
          </h1>
          <div className="mx-auto mt-2.5 h-[3px] w-10 rounded-full bg-pink" />
        </div>

        <div className="mt-12 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="text-sm md:text-base leading-relaxed text-ink/80 space-y-4">
            <p>
              Recognizing the need for support, our founders envision a
              platform for high school and college students to bridge the
              gap and create a supportive community. They aim to ensure
              that everyone, regardless of background, has equal access to
              educational opportunities. Their initiative seeks to build a
              more inclusive environment for students pursuing a higher
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
          <h2 className="text-3xl font-bold tracking-tight text-[#1e1b4b] md:text-4xl">
            Meet The Team
          </h2>
          <div className="mx-auto mt-2.5 h-[3px] w-10 rounded-full bg-pink" />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          {/* Member 1: Karla M. */}
          <div className="flex flex-col items-center text-left">
            <div className="relative mb-6 h-64 w-64 md:h-72 md:w-72 drop-shadow-md">
              <img
                src={karlaImg}
                alt="Karla M. - Co Founder & CEO"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="w-full max-w-md">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#1e1b4b] md:text-xl">
                  Karla M.
                </h3>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Karla M. LinkedIn"
                  className="text-ink hover:text-pink transition-colors"
                >
                  <Linkedin className="h-5 w-5 fill-current" />
                </a>
              </div>
              <p className="mt-1 text-xs md:text-sm font-medium text-ink/70">
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
                <p>
                  I'd love to connect with people who share similar interests!
                </p>
              </div>
            </div>
          </div>

          {/* Member 2: Julie M. */}
          <div className="flex flex-col items-center text-left">
            <div className="relative mb-6 h-64 w-64 md:h-72 md:w-72 drop-shadow-md">
              <img
                src={julieImg}
                alt="Julie M. - Co-founder and Website Designer"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="w-full max-w-md">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#1e1b4b] md:text-xl">
                  Julie M.
                </h3>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Julie M. LinkedIn"
                  className="text-ink hover:text-pink transition-colors"
                >
                  <Linkedin className="h-5 w-5 fill-current" />
                </a>
              </div>
              <p className="mt-1 text-xs md:text-sm font-medium text-ink/70">
                Co-founder and Website Designer
              </p>
              <div className="mt-4 text-xs md:text-sm leading-relaxed text-ink/80 space-y-3">
                <p>Hello! My name is Julie.</p>
                <p>
                  One of my greatest passions is connecting with animals,
                  especially dogs. There's something incredibly heartwarming
                  about the companionship and loyalty they offer. Corgis, in
                  particular, have stolen my heart with their adorable looks and
                  playful personalities. I also love to hang out with friends and
                  bake during my free time. My education is very important to me so
                  I would love to be able to uplift women in an education
                  setting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Action Button */}
      <button
        aria-label="Open chat"
        className="fixed right-5 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-pink text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        <MessageCircle className="h-6 w-6 fill-current" />
      </button>
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

export function MeetTheTeam() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Nav />
      <OurStory />
      <MeetTheTeamSection />
      <Footer />
    </div>
  );
}
