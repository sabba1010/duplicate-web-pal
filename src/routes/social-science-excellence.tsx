import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Clock,
  Eye,
  Mail,
  CheckCircle2,
  ChevronDown,
  UserCircle2,
  Calendar,
  Award,
  Sparkles,
  Heart,
  Laptop,
  Camera,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import winnerImg from "../Assets/2026winner.avif";

export const Route = createFileRoute("/social-science-excellence")({
  head: () => ({
    meta: [
      { title: "$1,500 Social Science Excellence Scholarship — Girls On Campus" },
      {
        name: "description",
        content:
          "Apply for the $1,500 Social Science Excellence Scholarship — presented by educations.com and Girls On Campus. Applications open November 2025.",
      },
      { property: "og:title", content: "$1,500 Social Science Excellence Scholarship" },
      {
        property: "og:description",
        content:
          "Presented by educations.com and Girls On Campus. Applications open November 2025.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SocialSciencePage,
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
          <Link
            to="/login"
            className="flex items-center gap-1.5 text-ink/80 hover:text-pink transition-colors"
          >
            <UserCircle2 className="h-5 w-5 text-pink" />
            <span className="text-sm font-medium">Log In</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

function FloatingStickers() {
  return (
    <>
      <div className="absolute left-6 top-8 text-4xl animate-bounce duration-1000 select-none filter drop-shadow opacity-90">
        🎀
      </div>
      <div className="absolute right-8 top-10 text-4xl animate-pulse select-none filter drop-shadow-sm opacity-90">
        ☁️
      </div>
    </>
  );
}

function SocialScienceLogo() {
  return (
    <div className="relative inline-flex items-center gap-4">
      <div className="text-left font-extrabold tracking-tight leading-none text-[#10b981]">
        <div className="text-3xl md:text-4xl">SOCIAL</div>
        <div className="text-3xl md:text-4xl mt-0.5">SCIENCE</div>
        <div className="text-2xl md:text-3xl tracking-wider text-pink-deep mt-0.5">
          EXCELLENCE
        </div>
      </div>
      {/* Pink Butterfly Vector Graphic */}
      <div className="text-5xl text-pink animate-pulse select-none transform rotate-12">
        🦋
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative overflow-hidden w-full py-16 md:py-24"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.95 0.03 260) 0%, oklch(0.94 0.05 320) 50%, oklch(0.96 0.04 340) 100%)",
      }}
    >
      <FloatingStickers />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 relative z-10 md:grid-cols-2">
        <div className="text-left">
          <SocialScienceLogo />
          <div className="mt-6">
            <a
              href="#apply"
              className="inline-block rounded-full border-2 border-pink/60 bg-white px-7 py-2.5 text-xs font-bold text-pink-deep shadow-md hover:bg-pink hover:text-white transition-all duration-300 uppercase tracking-wider transform hover:-translate-y-0.5"
            >
              Apply Here
            </a>
          </div>
        </div>

        {/* Presented by Card */}
        <div className="bg-white/85 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-2xl transition-all duration-300 hover:scale-[1.02] text-left">
          <p className="text-4xl font-extrabold text-[#1e1b4b] md:text-5xl">
            $1,500
          </p>
          <p className="mt-2 text-2xl font-display italic text-[#1e1b4b] md:text-3xl leading-snug">
            Social Science
            <br />
            Excellence Scholarship
          </p>
          <p className="mt-4 font-display text-sm text-ink/70">presented by</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-base font-bold text-[#10b981]">educations.com</span>
            <span className="text-[9px] font-extrabold text-ink/50 bg-ink/5 px-2.5 py-1 rounded-md">
              POWERED BY KEYSTONE
            </span>
            <span className="font-display text-lg text-pink-deep">girls on campus</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function WinnerSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7 text-left">
            <h2 className="text-3xl font-extrabold text-[#10b981] md:text-4xl">
              2026 Winner
            </h2>
            <p className="mt-1 text-sm font-bold uppercase tracking-wider text-ink/70">
              LILI-MAE G.
            </p>
            <p className="mt-4 text-xs md:text-sm leading-relaxed text-ink/80">
              Lili-Mae G. is the 2026 winner of the $1,500 Social Science
              Excellence Scholarship presented by educations.com and Girls On
              Campus. Congratulations! Her essay highlighted her passion for
              understanding human behavior and her drive to make a positive
              impact through sociology. We are honored to support her academic
              journey!
            </p>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <div className="relative group">
              <div className="h-56 w-56 md:h-64 md:w-64 overflow-hidden rounded-2xl border-2 border-ink/10 shadow-xl transition-transform duration-300 group-hover:scale-105">
                <img
                  src={winnerImg}
                  alt="2026 Winner Lili-Mae G."
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteBanner() {
  return (
    <section className="bg-gradient-to-r from-[#fce7f3] via-[#f5d0fe] to-[#e0e7ff] py-12 text-center">
      <div className="mx-auto max-w-4xl px-6">
        <p className="font-display italic text-xl md:text-3xl text-[#1e1b4b] leading-relaxed drop-shadow-xs">
          For students ready to drive impact through sociology, psychology, politics, and beyond.
        </p>
      </div>
    </section>
  );
}

function TimelineSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-3xl font-extrabold text-[#10b981] md:text-4xl">
          Timeline
        </h2>

        {/* Staggered Horizontal Line Timeline */}
        <div className="relative mt-16 max-w-4xl mx-auto">
          {/* Horizontal Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-teal-500/40 -translate-y-1/2 hidden md:block" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 relative z-10">
            {/* 1. November 2025 (Top) */}
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shadow-md mb-2">
                <Clock className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-[#1e1b4b]">November 2025</p>
              <p className="text-[10px] text-ink/70">Applications Open</p>
            </div>

            {/* 2. January 2026 (Bottom) */}
            <div className="flex flex-col items-center text-center md:translate-y-8">
              <div className="h-12 w-12 rounded-full bg-pink-soft text-pink-deep flex items-center justify-center shadow-md mb-2">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-[#1e1b4b]">January 2026</p>
              <p className="text-[10px] text-ink/70">Midpoint Check-in</p>
            </div>

            {/* 3. April 30th 2026 (Top) */}
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-md mb-2">
                <Calendar className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-[#1e1b4b]">April 30th 2026</p>
              <p className="text-[10px] text-ink/70">Applications Close</p>
            </div>

            {/* 4. April/May 2026 (Bottom) */}
            <div className="flex flex-col items-center text-center md:translate-y-8">
              <div className="h-12 w-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shadow-md mb-2">
                <Laptop className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-[#1e1b4b]">April/May 2026</p>
              <p className="text-[10px] text-ink/70">Review Period</p>
            </div>

            {/* 5. June 2026 (Top) */}
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shadow-md mb-2">
                <Camera className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-[#1e1b4b]">June 2026</p>
              <p className="text-[10px] text-ink/70">Winner Announced</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="bg-white py-16 md:py-20 pt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="text-left">
            <h2 className="text-3xl font-extrabold text-[#1e1b4b] md:text-4xl">
              About the <span className="underline decoration-ink decoration-2 underline-offset-4">Scholarship</span>
            </h2>
            <p className="mt-6 text-xs md:text-sm leading-relaxed text-ink/80 space-y-4">
              The $1,500 Social Science Excellence Scholarship is awarded to
              students demonstrating passion and academic drive in social science
              disciplines, including sociology, psychology, political science,
              anthropology, economics, and international relations.
              <br /><br />
              Founded by Girls On Campus and educations.com, this scholarship
              recognizes students who aim to solve real-world problems and
              create positive change in their communities. We encourage all
              eligible students to apply!
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative overflow-hidden rounded-2xl border border-ink/10 shadow-xl transition-transform duration-500 hover:scale-[1.02]">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                alt="Student on campus"
                className="h-80 w-full object-cover md:h-96"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RealitySection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1 flex justify-center">
            <div className="relative overflow-hidden rounded-2xl border border-ink/10 shadow-xl transition-transform duration-500 hover:scale-[1.02]">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
                alt="Graduation ceremony"
                className="h-80 w-full object-cover md:h-96"
              />
            </div>
          </div>

          <div className="order-1 md:order-2 text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base font-bold text-[#10b981]">educations.com</span>
              <span className="text-[9px] font-bold text-ink/50 bg-ink/5 px-2 py-0.5 rounded">
                POWERED BY KEYSTONE
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#1e1b4b] md:text-4xl">
              Making this a reality
            </h2>
            <p className="mt-4 text-xs md:text-sm leading-relaxed text-ink/80">
              At educations.com, we believe that education has the power to
              transform lives and shape a better future. Partnering with Girls
              On Campus allows us to support ambitious young women as they
              pursue higher education and build meaningful careers in social
              sciences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailsSection() {
  return (
    <section className="bg-[#fce7f3] py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6 text-left space-y-10">
        {/* How to apply */}
        <div>
          <h2 className="text-2xl font-extrabold text-[#1e1b4b] md:text-3xl">
            How to apply
          </h2>
          <ul className="mt-3 space-y-2 text-xs md:text-sm text-ink/80 list-disc pl-5">
            <li>Submit your application form including all required fields.</li>
            <li>
              Write a short essay (up to 500 words) describing your passion for
              social sciences and your future goals.
            </li>
          </ul>
        </div>

        {/* Eligibility */}
        <div>
          <h2 className="text-2xl font-extrabold text-[#1e1b4b] md:text-3xl">
            Eligibility
          </h2>
          <ul className="mt-3 space-y-2 text-xs md:text-sm text-ink/80 list-disc pl-5">
            <li>Must be enrolled or planning to enroll in a Social Science program.</li>
            <li>Open to high school seniors, undergraduate, and graduate students.</li>
            <li>Open globally to students of any nationality.</li>
          </ul>
        </div>

        {/* Scholarship Award */}
        <div>
          <h2 className="text-2xl font-extrabold text-[#1e1b4b] md:text-3xl">
            Scholarship Award
          </h2>
          <ul className="mt-3 space-y-2 text-xs md:text-sm text-ink/80 list-disc pl-5">
            <li>$1,500 USD direct scholarship grant.</li>
            <li>Feature highlight on Girls On Campus platform & educations.com.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function FormSection() {
  return (
    <section id="apply" className="bg-white py-16 md:py-24 text-center">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-2xl font-extrabold text-[#1e1b4b] md:text-4xl">
          Apply Here!! You must fill two forms!
        </h2>
        <p className="mt-2 text-sm font-semibold text-pink-deep">
          1) This form &nbsp;&nbsp;|&nbsp;&nbsp; 2) Fill google form
        </p>

        {/* Embedded Form Card */}
        <div className="mt-10 mx-auto max-w-xl bg-white p-8 rounded-2xl border border-ink/15 shadow-2xl text-left">
          <div className="border-b border-ink/10 pb-4 mb-6">
            <h3 className="text-base font-bold text-[#1e1b4b]">
              Girls On Campus $1,500 Social Science Excellence Scholarship
            </h3>
            <p className="text-xs text-ink/60 mt-1">Required fields *</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-bold text-ink mb-1">First Name *</label>
              <input
                type="text"
                required
                placeholder="First name"
                className="w-full rounded-lg border border-ink/20 px-4 py-2.5 text-xs text-ink outline-none focus:border-pink"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-ink mb-1">Last Name *</label>
              <input
                type="text"
                required
                placeholder="Last name"
                className="w-full rounded-lg border border-ink/20 px-4 py-2.5 text-xs text-ink outline-none focus:border-pink"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-ink mb-1">Email *</label>
              <input
                type="email"
                required
                placeholder="example@address.com"
                className="w-full rounded-lg border border-ink/20 px-4 py-2.5 text-xs text-ink outline-none focus:border-pink"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-ink mb-1">Short Essay Submission *</label>
              <textarea
                rows={4}
                required
                placeholder="Tell us about your passion for social sciences..."
                className="w-full rounded-lg border border-ink/20 px-4 py-2.5 text-xs text-ink outline-none focus:border-pink"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-3 rounded-full bg-pink py-3 text-xs font-bold text-white shadow hover:bg-pink-deep transition-colors uppercase tracking-wider"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Who is eligible to apply?",
      a: "High school seniors, undergraduate, and graduate students enrolled or planning to enroll in a Social Science program anywhere in the world.",
    },
    {
      q: "How is the winner chosen?",
      a: "Applications are evaluated based on essay quality, clarity of vision, community impact, and passion for social science disciplines.",
    },
    {
      q: "Do I need to be attending a US university?",
      a: "No! The scholarship is open globally to students attending universities in any country.",
    },
    {
      q: "Can international students apply for this scholarship?",
      a: "Yes, international students of any nationality are eligible to apply.",
    },
    {
      q: "Am I guaranteed to win if I apply?",
      a: "While we review every submission carefully, only one $1,500 winner is selected per cycle.",
    },
    {
      q: "When will the winner be announced?",
      a: "The winner will be officially announced in June 2026.",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* FAQ Left Column */}
          <div className="md:col-span-7 text-left">
            <h2 className="text-3xl font-extrabold text-[#1e1b4b] md:text-4xl">
              Frequently asked questions
            </h2>
            <div className="mt-8 space-y-3">
              {faqs.map((f, i) => (
                <div
                  key={f.q}
                  className="rounded-xl border border-ink/15 bg-white p-4 shadow-xs"
                >
                  <button
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    className="flex w-full items-center justify-between text-left text-xs md:text-sm font-bold text-[#1e1b4b]"
                  >
                    <span>{f.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-pink transition-transform duration-300 ${
                        openIdx === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openIdx === i && (
                    <p className="mt-3 text-xs leading-relaxed text-ink/75 border-t border-ink/10 pt-3">
                      {f.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Sidebar Right Column */}
          <div className="md:col-span-5 text-left bg-white p-8 rounded-2xl border border-ink/15 shadow-xl h-fit">
            <h3 className="text-xl font-extrabold text-[#1e1b4b]">
              Scholarship Timeline
            </h3>

            <div className="mt-6 space-y-4 text-xs">
              <div>
                <p className="font-bold text-[#1e1b4b]">Applications Open:</p>
                <p className="text-ink/80">November 8th 2025</p>
              </div>
              <div>
                <p className="font-bold text-[#1e1b4b]">Applications Close: April 30th 2026</p>
              </div>
              <div>
                <p className="font-bold text-[#1e1b4b]">Winner Announced: June 2026</p>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="#apply"
                className="inline-block w-full text-center rounded-full bg-pink py-2.5 text-xs font-bold text-white shadow hover:bg-pink-deep transition-colors uppercase tracking-wider"
              >
                Apply Here
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-ink/10 flex justify-center">
              <SocialScienceLogo />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button
        aria-label="Open chat"
        className="fixed right-5 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-pink text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-pink-deep active:scale-95"
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

export function SocialSciencePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink selection:bg-pink-soft selection:text-pink-deep">
      <Nav />
      <Hero />
      <WinnerSection />
      <QuoteBanner />
      <TimelineSection />
      <AboutSection />
      <RealitySection />
      <DetailsSection />
      <FormSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
