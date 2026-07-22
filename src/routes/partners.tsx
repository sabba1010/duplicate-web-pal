import { createFileRoute, Link } from "@tanstack/react-router";
import { UserCircle2, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners — Girls On Campus" },
      {
        name: "description",
        content:
          "Partner with Girls On Campus to empower young women, gain access to talent, expand networking opportunities, and build brand visibility.",
      },
      { property: "og:title", content: "Partners — Girls On Campus" },
      {
        property: "og:description",
        content:
          "Partner with Girls On Campus to empower young women, gain access to talent, expand networking opportunities, and build brand visibility.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PartnersPage,
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
                l.to === "/partners" ? "font-semibold text-pink-deep" : ""
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

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f5ebff] via-[#fbf5ff] to-white pb-16 pt-12 md:pb-24 md:pt-16">
      {/* Subtle Arc shape on top background */}
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#1e1b4b] md:text-4xl">
          We can make a change together
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-xs md:text-sm leading-relaxed text-ink/75">
          Your support can make a significant impact in fostering a supportive
          environment for women to connect, share experiences, and grow
          together. Whether you're a company passionate about supporting
          women's initiatives, a brand that values community building, or an
          individual looking to make a positive impact, we invite you to join us
          on this exciting venture.
          <br />
          Reach us at{" "}
          <a
            href="mailto:info@girlsoncampus.org"
            className="text-pink-deep underline hover:text-pink"
          >
            info@girlsoncampus.org
          </a>
        </p>

        <div className="mt-7">
          <a
            href="mailto:info@girlsoncampus.org"
            className="inline-block rounded-md bg-[#4a4a4a] px-7 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-[#333333] transition-colors"
          >
            Donate Here
          </a>
        </div>
      </div>
    </section>
  );
}

function BigLogo() {
  return (
    <div className="relative flex flex-col items-center justify-center p-6 text-center">
      {/* Decorative Pink Wavy Lines */}
      <div className="absolute -top-2 right-4 md:right-12">
        <svg
          width="80"
          height="32"
          viewBox="0 0 100 40"
          fill="none"
          stroke="#f472b6"
          strokeWidth="2.5"
          opacity="0.6"
        >
          <path d="M 0 10 Q 12.5 0 25 10 T 50 10 T 75 10 T 100 10" />
          <path d="M 0 20 Q 12.5 10 25 20 T 50 20 T 75 20 T 100 20" />
          <path d="M 0 30 Q 12.5 20 25 30 T 50 30 T 75 30 T 100 30" />
        </svg>
      </div>

      <div className="relative">
        {/* Graduation Cap on logo */}
        <div className="absolute -top-9 left-4 text-pink-deep">
          <svg width="60" height="45" viewBox="0 0 48 36" fill="currentColor">
            <path d="M24 2L2 14L24 26L46 14L24 2Z" fill="#e05297" />
            <path
              d="M10 18.5V26.5C10 29.5 16.3 32 24 32C31.7 32 38 29.5 38 26.5V18.5"
              stroke="#e05297"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path d="M42 16V27" stroke="#e05297" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="42" cy="28.5" r="2" fill="#e05297" />
          </svg>
        </div>

        <div className="font-display text-6xl md:text-7xl lg:text-8xl text-pink-deep leading-none tracking-tight">
          Girls on
          <br />
          <span className="text-6xl md:text-7xl lg:text-8xl">campus</span>
        </div>
      </div>
    </div>
  );
}

function BenefitsGrid() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-20">
      {/* Floating Background Shapes */}
      {/* Light Blue Oval Shape on Left */}
      <div className="absolute -left-12 bottom-20 h-44 w-72 rounded-full bg-[#dbeafe] opacity-80 pointer-events-none" />
      {/* Soft Yellow Box on Right */}
      <div className="absolute -right-8 bottom-6 h-28 w-80 rounded-2xl bg-[#ffec99] opacity-80 pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 items-stretch">
          {/* Card 1: Empowering Young Women */}
          <div className="relative rounded-2xl bg-[#fcdbe8] p-7 md:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#1e1b4b]">
                Empowering Young Women
              </h2>
              <p className="mt-3 text-xs md:text-sm leading-relaxed text-ink/75">
                We focus on empowering young women by providing them with the
                tools, resources, and support necessary to succeed in their
                academic and professional endeavors. By partnering, you
                contribute to a cause that promotes gender equality and empowers
                the next generation of female leaders.
              </p>
            </div>

            {/* Overlapping Photo Badge (Bottom Left) */}
            <div className="absolute -bottom-5 -left-4 z-10 flex items-center gap-2 overflow-hidden rounded-full border-2 border-white bg-white px-3 py-1.5 shadow-md">
              <div className="flex -space-x-1.5">
                <div className="h-6 w-6 rounded-full bg-pink-deep border border-white" />
                <div className="h-6 w-6 rounded-full bg-amber-400 border border-white" />
                <div className="h-6 w-6 rounded-full bg-indigo-500 border border-white" />
              </div>
              <span className="text-[10px] font-bold text-ink">Empowerment</span>
            </div>
          </div>

          {/* Card 2: Access to Talent */}
          <div className="relative rounded-2xl bg-[#fcdbe8] p-7 md:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#1e1b4b]">
                Access to Talent
              </h2>
              <p className="mt-3 text-xs md:text-sm leading-relaxed text-ink/75">
                Being a partner provides access to a network of motivated and
                talented young women. This can be an excellent opportunity for
                talent scouting, internships, and recruitment, ensuring a
                diverse and qualified future workforce.
              </p>
            </div>

            {/* Overlapping Avatar Pill (Bottom Right) */}
            <div className="absolute -bottom-5 -right-4 z-10 flex items-center gap-1.5 overflow-hidden rounded-full border-2 border-white bg-white px-3 py-1.5 shadow-md">
              <div className="flex -space-x-2">
                {["#9333ea", "#f59e0b", "#065f46", "#be185d"].map((c, i) => (
                  <div
                    key={i}
                    className="h-6 w-6 rounded-full border border-white flex items-center justify-center text-[8px] font-bold text-white"
                    style={{ backgroundColor: c }}
                  >
                    👩
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-bold text-ink">Talent Pool</span>
            </div>
          </div>

          {/* Central Logo Span */}
          <div className="md:col-span-2 py-4 flex justify-center z-10">
            <BigLogo />
          </div>

          {/* Card 3: Networking Opportunities */}
          <div className="relative rounded-2xl bg-[#fcdbe8] p-7 md:p-8 shadow-sm flex flex-col justify-between z-10">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#1e1b4b]">
                Networking Opportunities
              </h2>
              <p className="mt-3 text-xs md:text-sm leading-relaxed text-ink/75">
                Partners can benefit from networking opportunities with other
                organizations, educational institutions, and individuals who are
                dedicated to the same cause. This can lead to potential
                collaborations, knowledge sharing, and business opportunities.
              </p>
            </div>

            {/* Overlapping Photo Badge (Bottom Right) */}
            <div className="absolute -bottom-5 -right-4 z-10 flex items-center gap-2 overflow-hidden rounded-full border-2 border-white bg-white px-3 py-1.5 shadow-md">
              <div className="flex -space-x-1.5">
                <div className="h-6 w-6 rounded-full bg-blue-600 border border-white text-[9px] flex items-center justify-center text-white">🎓</div>
                <div className="h-6 w-6 rounded-full bg-purple-600 border border-white text-[9px] flex items-center justify-center text-white">🎓</div>
                <div className="h-6 w-6 rounded-full bg-pink-600 border border-white text-[9px] flex items-center justify-center text-white">🎓</div>
              </div>
              <span className="text-[10px] font-bold text-ink">Network</span>
            </div>
          </div>

          {/* Card 4: Brand Visibility and Recognition */}
          <div className="relative rounded-2xl bg-[#fcdbe8] p-7 md:p-8 shadow-sm flex flex-col justify-between z-10">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#1e1b4b]">
                Brand Visibility and Recognition
              </h2>
              <p className="mt-3 text-xs md:text-sm leading-relaxed text-ink/75">
                Partnerships often come with promotional opportunities. Your
                brand could be featured in events, social media campaigns, and on
                the "Girls on Campus" website, increasing your visibility among
                a broad audience that values social impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DiverseWomenArtwork() {
  return (
    <div className="flex items-center justify-end overflow-hidden pt-4">
      <svg
        className="h-48 w-auto md:h-60 lg:h-72"
        viewBox="0 0 620 250"
        fill="none"
      >
        {/* Woman 1 - Purple Hijab Profile */}
        <g transform="translate(10, 0)">
          <path d="M40 250 C40 180, 70 140, 110 140 C150 140, 170 180, 170 250 Z" fill="#7c3aed" />
          <circle cx="110" cy="120" r="38" fill="#d97706" />
          <path d="M70 120 C70 70, 150 70, 150 120 C150 150, 70 150, 70 120 Z" fill="#8b5cf6" />
          <circle cx="95" cy="115" r="3.5" fill="#1e1b4b" />
          <circle cx="130" cy="135" r="8" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
        </g>

        {/* Woman 2 - Orange Hair & Hoop Earring */}
        <g transform="translate(110, 0)">
          <path d="M40 250 C40 175, 75 130, 120 130 C165 130, 195 175, 195 250 Z" fill="#1e1b4b" />
          <circle cx="115" cy="110" r="40" fill="#f59e0b" />
          <path d="M75 100 C75 50, 155 50, 155 100 C155 130, 75 130, 75 100 Z" fill="#d97706" />
          <circle cx="135" cy="125" r="10" fill="none" stroke="#fbbf24" strokeWidth="3" />
        </g>

        {/* Woman 3 - Short Dark Hair & Dark Skin */}
        <g transform="translate(220, 0)">
          <path d="M40 250 C40 180, 75 135, 115 135 C155 135, 185 180, 185 250 Z" fill="#991b1b" />
          <circle cx="110" cy="115" r="38" fill="#78350f" />
          <path d="M80 95 C80 65, 140 65, 140 95 Z" fill="#1e1b4b" />
        </g>

        {/* Woman 4 - Teal Headcover */}
        <g transform="translate(320, 0)">
          <path d="M40 250 C40 170, 75 130, 120 130 C165 130, 195 170, 195 250 Z" fill="#065f46" />
          <circle cx="115" cy="110" r="38" fill="#fcd34d" />
          <path d="M75 100 C75 55, 155 55, 155 100 Z" fill="#14b8a6" />
        </g>

        {/* Woman 5 - Pink Profile */}
        <g transform="translate(420, 0)">
          <path d="M40 250 C40 180, 70 140, 110 140 C150 140, 170 180, 170 250 Z" fill="#be185d" />
          <circle cx="105" cy="120" r="36" fill="#fbcfe8" />
          <path d="M75 110 C75 70, 135 70, 135 110 Z" fill="#9d174d" />
        </g>

        {/* Woman 6 - Lavender Headcover */}
        <g transform="translate(510, 0)">
          <path d="M30 250 C30 180, 60 140, 100 140 C140 140, 160 180, 160 250 Z" fill="#4c1d95" />
          <circle cx="95" cy="120" r="36" fill="#f5d0fe" />
          <path d="M65 110 C65 70, 125 70, 125 110 Z" fill="#a855f7" />
        </g>
      </svg>
    </div>
  );
}

function CommunityPartners() {
  return (
    <section className="bg-[#fce7f3] py-16 md:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center">
          {/* Left Side: Title and Logos */}
          <div className="md:col-span-6">
            <h2 className="text-3xl font-bold tracking-tight text-[#1e1b4b] md:text-4xl">
              Our Community Partners
            </h2>
            <p className="mt-3 text-xs md:text-sm text-ink/75">
              We are proud to be the trusted by these community partners.
            </p>

            {/* Partners Logo Grid */}
            <div className="mt-8 flex flex-wrap items-center gap-5">
              {/* COHORTO Logo */}
              <div className="flex items-center gap-1 text-xl md:text-2xl font-black tracking-widest text-[#1e1b4b]">
                C
                <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-pink text-pink text-[10px]">
                  O
                </span>
                H
                <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-pink text-pink text-[10px]">
                  O
                </span>
                RT
                <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-pink text-pink text-[10px]">
                  O
                </span>
              </div>

              {/* Financial Specialist Badge */}
              <div className="rounded-full bg-black px-3.5 py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-yellow-400">
                FINANCIAL ADVISORS
              </div>

              {/* Bobatalks */}
              <div className="flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 shadow-sm border border-pink/20">
                <span className="text-lg">🧋</span>
                <span className="font-extrabold text-xs text-[#1e1b4b] tracking-tight">
                  BOBATALKS
                </span>
              </div>

              {/* Pine Apple */}
              <div className="flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 shadow-sm border border-pink/20">
                <span className="text-lg">🍍</span>
                <div className="text-[10px] font-extrabold leading-tight text-[#1e1b4b]">
                  PINE APPLE
                  <br />
                  <span className="text-[8px] font-normal text-ink/60">FOUNDERS</span>
                </div>
              </div>

              {/* The Princeton Review */}
              <div className="flex items-center gap-2 rounded-full border border-ink/20 bg-white px-4 py-1.5 text-[10px] font-bold text-ink">
                <span>The Princeton Review</span>
              </div>

              {/* It Logo Box */}
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white text-xs">
                it
              </div>
            </div>
          </div>

          {/* Right Side: Diverse Women Artwork */}
          <div className="md:col-span-6">
            <DiverseWomenArtwork />
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

export function PartnersPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Nav />
      <Hero />
      <BenefitsGrid />
      <CommunityPartners />
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
