import { motion } from "framer-motion";
import { Search, Bookmark, Users, GraduationCap, Globe, MapPin } from "lucide-react";
import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const FILTERS = ["All", "Scholarships", "Internships", "Remote Programs", "Near You"];

const SCHOLARSHIPS = [
  {
    id: "s1",
    title: "Coca-Cola Scholars Program",
    category: "Scholarship",
    deadline: "Oct 1, 2026",
    tags: ["Merit", "$10k"],
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "s2",
    title: "$2,500 Women in Business Scholarship",
    category: "Scholarship",
    deadline: "Jul 1, 2026",
    tags: ["Women", "Business"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "s3",
    title: "First-Gen Futures Scholarship",
    category: "Scholarship",
    deadline: "Aug 15, 2026",
    tags: ["First-Gen", "$5k"],
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "s4",
    title: "Society of Women Engineers Scholarship",
    category: "Scholarship",
    deadline: "Sep 20, 2026",
    tags: ["STEM", "Engineering"],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=400",
  },
];

const INTERNSHIPS = [
  {
    id: "i1",
    title: "Google STEP Internship 2026",
    category: "Paid Internship",
    deadline: "Jun 30, 2026",
    tags: ["STEM", "Google"],
    image: "https://images.unsplash.com/photo-1521898284481-a5ec348cb555?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "i2",
    title: "Nike Marketing Internship",
    category: "Paid Internship",
    deadline: "Jun 20, 2026",
    tags: ["Marketing", "Nike"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "i3",
    title: "Goldman Sachs Summer Analyst",
    category: "Paid Internship",
    deadline: "Aug 5, 2026",
    tags: ["Finance", "Summer"],
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "i4",
    title: "NASA JPL Student Internship",
    category: "Paid Internship",
    deadline: "Sep 1, 2026",
    tags: ["STEM", "NASA"],
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=400",
  },
];

const REMOTE_PROGRAMS = [
  {
    id: "r1",
    title: "MIT Summer Research Program",
    category: "Research Program",
    deadline: "Jul 5, 2026",
    tags: ["Research", "Remote"],
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "r2",
    title: "Global Leaders Virtual Fellowship",
    category: "Fellowship",
    deadline: "Aug 20, 2026",
    tags: ["Leadership", "Global"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "r3",
    title: "Design for Good – Remote",
    category: "Volunteer",
    deadline: "Aug 1, 2026",
    tags: ["Design", "Social Good"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "r4",
    title: "AI Ethics Research Initiative",
    category: "Program",
    deadline: "Sep 10, 2026",
    tags: ["AI/ML", "Ethics"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

interface OppCard {
  id: string;
  title: string;
  category: string;
  deadline: string;
  tags: string[];
  image: string;
}

function OpportunityCard({
  opp,
  saved,
  onToggle,
  delay = 0,
}: {
  opp: OppCard;
  saved: boolean;
  onToggle: () => void;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="bg-white border border-[#f1e4e9] rounded-[14px] overflow-hidden hover:shadow-[0_1px_3px_rgba(207,52,120,0.04),_0_6px_18px_rgba(207,52,120,0.05)] hover:-translate-y-[2px] transition-all flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div 
        className="h-[78px] relative bg-cover bg-center shrink-0" 
        style={{ backgroundImage: `url('${opp.image}')` }}
      >
      </div>

      {/* Body */}
      <div className="p-[11px_12px_13px] flex-1 flex flex-col">
        <h4 className="font-extrabold text-[12.5px] leading-[1.3] mb-[3px] text-[#2a2026]">
          {opp.title}
        </h4>
        <p className="text-[11px] font-bold text-[#8b7e85]">{opp.category}</p>
        <p className="text-[10.5px] font-semibold text-[#8b7e85] m-[3px_0_9px]">Deadline: {opp.deadline}</p>

        {/* Footer (Tags + Bookmark) */}
        <div className="flex items-end justify-between mt-auto">
          <div className="flex gap-[5px] flex-wrap">
            {opp.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="bg-[#fde8f1] text-[#cf3478] text-[9.5px] font-extrabold px-[8px] py-[2px] rounded-[12px]"
              >
                {t}
              </span>
            ))}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className={`text-[13px] p-[2px] transition-colors cursor-pointer ${saved ? "text-[#f14f98]" : "text-[#cbbcc3] hover:text-[#f14f98]"}`}
          >
            <Bookmark
              className="h-3.5 w-3.5"
              fill={saved ? "currentColor" : "none"}
              stroke="currentColor"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  count,
}: {
  icon: React.ElementType;
  title: string;
  count: number;
}) {
  return (
    <div className="flex items-center gap-[10px] mb-[12px]">
      <div className="w-[30px] h-[30px] rounded-[9px] bg-[#fde8f1] text-[#cf3478] flex items-center justify-center text-[13px] shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="font-extrabold text-[14px] flex-1 text-[#2a2026]">{title}</h3>
      <div className="text-[10.5px] text-[#8b7e85] font-bold">{count} open</div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function StudentOpportunitiesView() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const toggleSave = (id: string) =>
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 flex-wrap mb-[18px]">
        <div>
          <h1 className="text-[22px] font-black tracking-[-0.01em] text-[#2a2026]">Opportunities</h1>
          <p className="text-[12.5px] text-[#8b7e85] font-semibold mt-[3px]">
            Every scholarship, internship and program — organized for you.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-[10px] bg-white border border-[#f1e4e9] rounded-[24px] py-[11px] px-[18px] w-full md:w-[380px] max-w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search all opportunities..."
            className="flex-1 border-none outline-none text-[12.5px] bg-transparent text-[#2a2026] placeholder-[#8b7e85]"
          />
          <Search className="h-[13px] w-[13px] text-[#f14f98] shrink-0" />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-[8px] flex-wrap mb-[18px]">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-[16px] py-[8px] rounded-[20px] border text-[12px] font-extrabold whitespace-nowrap transition-colors cursor-pointer ${
                activeFilter === f
                  ? "bg-[#f14f98] border-[#f14f98] text-white"
                  : "bg-white border-[#f1e4e9] text-[#8b7e85] hover:border-[#fde8f1] hover:text-[#2a2026]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

      {/* ── Just Shared Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex flex-col md:flex-row md:items-center gap-[18px] bg-gradient-to-br from-[#fde8f1] to-[#f3e8ff] border border-[#f1e4e9] rounded-[18px] p-[18px_20px] mb-[20px]"
      >
        <div className="w-[96px] h-[72px] rounded-[14px] shrink-0 shadow-[0_4px_14px_rgba(207,52,120,0.18)] bg-center bg-cover overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=300"
            alt="MIT Summer Research"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[6px] text-[10.5px] font-black text-[#cf3478] uppercase tracking-[.05em] mb-[4px]">
            <div className="w-[18px] h-[18px] rounded-full bg-cover bg-center flex items-center justify-center bg-[#fde8f1] text-[#cf3478] font-black text-[9px]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=60')" }}>
              I
            </div>
            Just shared by Isabella R. · 2h ago
          </div>
          <div className="text-[15px] font-black text-[#2a2026] mb-[2px]">
            MIT Summer Research Program
          </div>
          <div className="text-[11.5px] text-[#8b7e85] font-bold">
            Scholarship · Paid Research Program · Deadline Jul 5, 2026
          </div>
        </div>
        <div className="flex flex-row md:flex-col gap-[8px] shrink-0 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-[18px] py-[9px] bg-[#f14f98] hover:bg-[#cf3478] text-white text-[12px] font-extrabold rounded-[20px] transition-colors whitespace-nowrap">
            View details
          </button>
          <button className="flex-1 md:flex-none px-[18px] py-[9px] bg-white border border-[#fde8f1] text-[#cf3478] text-[12px] font-extrabold rounded-[20px] transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
            <Bookmark className="h-[13px] w-[13px]" /> Save
          </button>
        </div>
      </motion.div>

      {/* ── Scholarships ── */}
      <div className="mb-[22px]">
        <SectionHeader icon={GraduationCap} title="Scholarships" count={12} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px]">
          {SCHOLARSHIPS.map((opp, i) => (
            <OpportunityCard
              key={opp.id}
              opp={opp}
              saved={savedIds.includes(opp.id)}
              onToggle={() => toggleSave(opp.id)}
              delay={i * 0.06}
            />
          ))}
        </div>
      </div>

      {/* ── Internships ── */}
      <div className="mb-[22px]">
        <SectionHeader icon={MapPin} title="Internships" count={8} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px]">
          {INTERNSHIPS.map((opp, i) => (
            <OpportunityCard
              key={opp.id}
              opp={opp}
              saved={savedIds.includes(opp.id)}
              onToggle={() => toggleSave(opp.id)}
              delay={i * 0.06}
            />
          ))}
        </div>
      </div>

      {/* ── Remote Programs ── */}
      <div className="mb-[22px]">
        <SectionHeader icon={Globe} title="Remote Programs" count={5} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px]">
          {REMOTE_PROGRAMS.map((opp, i) => (
            <OpportunityCard
              key={opp.id}
              opp={opp}
              saved={savedIds.includes(opp.id)}
              onToggle={() => toggleSave(opp.id)}
              delay={i * 0.06}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
