import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Eye, Mail, CheckCircle2, Laptop, Camera, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/social-science-excellence")({
  head: () => ({
    meta: [
      { title: "$1,500 Social Science Excellence Scholarship — Girls On Campus" },
      {
        name: "description",
        content:
          "Apply for the $1,500 Social Science Excellence Scholarship — for students ready to drive impact through sociology, psychology, politics, and beyond.",
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
  component: Page,
});

function Nav() {
  const links = [
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
          <span className="text-sm text-ink/80">Log In</span>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      className="w-full"
      style={{
        background:
          "linear-gradient(90deg, oklch(0.94 0.04 260), oklch(0.93 0.05 320), oklch(0.94 0.05 20))",
      }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight text-teal-700 md:text-5xl">
            SOCIAL
            <br />
            SCIENCE
            <br />
            EXCELLENCE
          </h1>
          <div className="mt-2 h-1 w-24 rounded-full bg-pink" />
          <a
            href="#apply"
            className="mt-6 inline-block rounded-full border border-ink/20 bg-white px-5 py-2 text-sm font-medium text-ink hover:border-pink transition-colors"
          >
            Apply Here
          </a>
        </div>
        <div>
          <p className="text-3xl font-bold text-ink md:text-4xl">$1,500</p>
          <p className="mt-1 text-2xl italic text-ink/90 md:text-3xl">
            Social Science
            <br />
            Excellence Scholarship
          </p>
          <p className="mt-4 font-display text-lg text-ink/70">presented by</p>
          <div className="mt-3 flex items-center gap-4">
            <span className="text-lg font-bold text-green-600">educations.com</span>
            <span className="text-xs text-ink/50">POWERED BY KEYSTONE</span>
            <span className="font-display text-xl text-pink-deep">girls on campus</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Winner() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-14">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
        <div>
          <h2 className="text-2xl font-bold text-teal-700">2026 Winner</h2>
          <p className="mt-2 text-sm font-semibold text-ink">Sisi Yono A.</p>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">
            Receiving the Social Science Excellence Scholarship has been such an
            honor and a reminder that the world needs a deep, grounded look at
            our campus and the challenges we face today. As a first-gen student
            at the Ateneo, I focus on youth psychology, forced displacement,
            and equity in social systems — grounded on the belief that we can
            build both academically and collectively.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="h-52 w-40 rounded-md bg-gradient-to-br from-pink-soft to-lilac shadow-md" />
        </div>
      </div>
    </section>
  );
}

function Tagline() {
  return (
    <section
      className="w-full py-10 text-center"
      style={{
        background: "linear-gradient(90deg, oklch(0.94 0.05 260), oklch(0.94 0.05 320))",
      }}
    >
      <p className="mx-auto max-w-2xl px-6 text-lg italic text-ink/80">
        For students ready to drive impact through sociology,
        <br />
        psychology, politics, and beyond.
      </p>
    </section>
  );
}

function Timeline() {
  const items = [
    { icon: Clock, date: "November 2025", label: "Applications open" },
    { icon: CheckCircle2, date: "January 24th 2026", label: "Midpoint Check-In" },
    { icon: Eye, date: "April 30th 2026", label: "Applications Close" },
    { icon: Laptop, date: "April – May 2026", label: "Judging & Interviews" },
    { icon: Mail, date: "May 25th 2026", label: "Finalists notified" },
    { icon: Camera, date: "July 15th 2026", label: "Winner Announced" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-center text-2xl font-bold text-teal-700">Timeline</h2>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((it) => (
          <div key={it.date} className="flex gap-3 rounded-lg border border-ink/10 bg-white p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-soft">
              <it.icon className="h-5 w-5 text-pink-deep" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{it.date}</p>
              <p className="text-xs text-ink/60">{it.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-ink">
            About the <span className="underline decoration-pink">Scholarship</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/70">
            The scholarship was born from a Girls On Campus × educations.com
            collaboration. Educations.com powers the world's largest student
            education platform — and Girls On Campus is our student-led
            community with the community of over 75,000+ girls. Together, we
            want to open access to meaningful, educational opportunities
            abroad. This scholarship rewards a student who thinks
            structurally, curiously, and boldly about the topics we all share:
            who are the outsiders in your school or town, what conversations
            haven't happened, and what needs to change and how does one
            student research it.
          </p>
        </div>
        <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-pink-soft via-lilac to-pink shadow-md" />
      </div>
    </section>
  );
}

function Making() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
        <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-sky-200 via-blue-300 to-indigo-300 shadow-md" />
        <div>
          <p className="text-lg font-bold text-green-600">educations.com</p>
          <p className="text-xs uppercase tracking-widest text-ink/50">
            POWERED BY KEYSTONE
          </p>
          <h2 className="mt-4 text-3xl font-bold text-ink">Making this a reality</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/70">
            With the support of our partners at educations.com, we're able to
            offer one $1,500 award to a promising social science student every
            year. Girls On Campus and partners are standing in to support this
            student through social media, mentorship, and internal support.
            Our shared mission is simple: we want more diverse voices in the
            social sciences — not to change the conversation, but to broaden
            it. Together we look toward a future when scholars, students, and
            researchers can gain recognition for their scholarship, service,
            and academic community.
          </p>
        </div>
      </div>
    </section>
  );
}

function HowToApply() {
  return (
    <section className="w-full bg-pink-soft/40 py-16">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-3xl font-bold text-ink">How to apply</h2>
        <p className="mt-6 text-sm text-ink/70">
          In 200-300 words, respond to the following:
          <br />
          "How do you plan to use your studies in the social sciences to create
          meaningful change in your community or the world at large?" Share your
          personal story or the challenges you want to tackle and your goals
          once being in the position to make change professionally.
        </p>

        <h3 className="mt-8 text-xl font-bold text-pink-deep">Eligibility</h3>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-ink/70">
          <li>Applicant must be applying to a Social Science major, such as sociology, psychology, anthropology, political science, economics, or social work.</li>
          <li>Applicants who currently plan to apply to the undergraduate Social Science planning post $1,500 programs are decided in the fall of 2024.</li>
          <li>Open to both US citizens and international students, provided they are legally an minor as of essay upload.</li>
          <li>Universities that are of legal age must provide a headshot and cover letter to announce winners to peers. Winners will accept the Girls On Campus scholarship terms and conditions.</li>
        </ul>

        <h3 className="mt-8 text-xl font-bold text-pink-deep">Scholarship Award</h3>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-ink/70">
          <li>One $1,500 award will be given.</li>
          <li>The award will be applied directly toward the student's tuition, admission, and fees at their chosen university.</li>
          <li>Payment will be made directly to the receiving college or university if awarded.</li>
        </ul>
      </div>
    </section>
  );
}

function ApplyForm() {
  return (
    <section id="apply" className="mx-auto max-w-3xl px-6 py-16 text-center">
      <p className="text-lg font-semibold text-ink">
        Apply Here! You must fill two forms!
      </p>
      <p className="mt-2 text-sm text-ink/70">
        1) this form
        <br />
        2) fill google form
      </p>
      <div className="mt-8 rounded-lg border border-ink/15 bg-white p-6 text-left shadow-sm">
        <h3 className="text-base font-semibold text-ink">
          Complete the first step of your application for the Social Science
          Excellence Scholarship.
        </h3>
        <p className="mt-1 text-xs text-ink/50">* Indicates required question</p>
        <div className="mt-6 space-y-5">
          <Field label="First name*" />
          <Field label="Last name*" />
          <Field label="Email address*" />
        </div>
        <button className="mt-6 rounded-full bg-pink px-6 py-2.5 text-sm font-medium text-white hover:bg-pink-deep transition-colors">
          Submit
        </button>
      </div>
    </section>
  );
}

function Field({ label }: { label: string }) {
  return (
    <div>
      <label className="text-xs text-ink/70">{label}</label>
      <input className="mt-1 w-full border-b border-ink/20 bg-transparent py-1.5 text-sm outline-none focus:border-pink" />
    </div>
  );
}

function FAQ() {
  const items = [
    "Is this scholarship only for arts?",
    "How may citizens submit their work?",
    "Do I need to be applying to a school in the USA?",
    "Can current students apply, or must I be applying?",
    "Do I have to attend the Global Beauty Fair?",
    "When is the winner receiving funding?",
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-ink">Frequently asked questions</h2>
          <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
            {items.map((q, i) => (
              <details key={q} className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between text-sm text-ink">
                  <span>{q}</span>
                  <ChevronDown className="h-4 w-4 text-ink/50 transition-transform group-open:rotate-180" />
                </summary>
                {i === 0 && (
                  <p className="mt-3 text-xs leading-relaxed text-ink/60">
                    The scholarship is open to any eligibility while may be
                    utilized outside of the arts as well. We look for a strong
                    academic record, a commitment to community change, and a
                    genuine interest in the social sciences.
                  </p>
                )}
              </details>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-ink">Scholarship Timeline</h2>
          <ul className="mt-6 space-y-3 text-sm text-ink">
            <li>
              <span className="font-semibold">Applications Open:</span>
              <br />
              November 8th 2025
            </li>
            <li>
              <span className="font-semibold">Applications Close:</span>
              <br />
              April 30th 2026
            </li>
            <li>
              <span className="font-semibold">Winner Announced:</span>
              <br />
              June 2026
            </li>
          </ul>
          <a
            href="#apply"
            className="mt-6 inline-block rounded-full border border-ink/20 bg-white px-5 py-2 text-sm font-medium text-ink hover:border-pink transition-colors"
          >
            Apply Here
          </a>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-2xl font-extrabold leading-tight text-teal-700">
              SOCIAL
              <br />
              SCIENCE
              <br />
              EXCELLENCE
            </span>
          </div>
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-ink/60">
            Girls On Campus and educations.com are committed to protecting your
            privacy. By applying to the Social Science Excellence Scholarship
            you agree to your data being used to administer the scholarship
            and communicate with you. Please see our{" "}
            <a href="#" className="text-pink underline">
              Privacy Policy
            </a>{" "}
            for details.
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
          <div className="font-display text-3xl text-pink-deep">girls on campus</div>
          <p className="mt-4 max-w-xs text-xs text-ink/60">
            Less gatekeeping, more access. A student-led platform for
            scholarships, internships, and real opportunities.
          </p>
          <p className="mt-4 text-xs text-ink/60">San Francisco, CA · info@girlsoncampus.org</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-sm font-semibold text-ink">{c.title}</p>
            <ul className="mt-3 space-y-2 text-xs text-ink/60">
              {c.items.map((i) => (
                <li key={i}>
                  <a href="#" className="hover:text-pink">{i}</a>
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

function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <Hero />
      <Winner />
      <Tagline />
      <Timeline />
      <About />
      <Making />
      <HowToApply />
      <ApplyForm />
      <FAQ />
      <Footer />
    </div>
  );
}
