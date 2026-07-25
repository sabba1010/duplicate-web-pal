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
      className="group bg-white border border-pink-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-pink-200 transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Image */}
      <div className="relative h-28 overflow-hidden bg-gray-100 shrink-0">
        <img
          src={opp.image}
          alt={opp.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Body */}
      <div className="p-3 flex-1 flex flex-col gap-1">
        <h4 className="font-bold text-[12px] text-[#2d1b28] leading-snug line-clamp-2 group-hover:text-[#e04f96] transition-colors">
          {opp.title}
        </h4>
        <p className="text-[10px] text-gray-500 font-medium">{opp.category}</p>
        <p className="text-[10px] text-gray-400">Deadline: {opp.deadline}</p>

        {/* Tags + Bookmark */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
          <div className="flex flex-wrap gap-1">
            {opp.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="bg-pink-50 text-[#e04f96] text-[9px] font-bold px-1.5 py-0.5 rounded-md"
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
            className="text-gray-300 hover:text-[#e04f96] transition-colors cursor-pointer shrink-0"
          >
            <Bookmark
              className="h-3.5 w-3.5"
              fill={saved ? "#e04f96" : "none"}
              stroke={saved ? "#e04f96" : "currentColor"}
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
  color,
}: {
  icon: React.ElementType;
  title: string;
  count: number;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className={`p-1.5 rounded-lg ${color}`}>
          <Icon className="h-3.5 w-3.5 text-[#e04f96]" />
        </div>
        <h3 className="font-bold text-[13px] text-[#2d1b28]">{title}</h3>
      </div>
      <a href="#" className="text-[11px] font-semibold text-[#e04f96] hover:underline cursor-pointer flex items-center gap-1">
        {count} open · View all →
      </a>
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
      <div className="bg-white rounded-3xl border border-pink-100 shadow-sm p-5 space-y-4">
        {/* Title + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-[#2d1b28]">Opportunities</h2>
            <p className="text-[12px] text-gray-400 mt-0.5">
              Every scholarship, internship and program — organized for you.
            </p>
          </div>

          <div className="relative w-full sm:w-72 group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all opportunities..."
              className="w-full bg-gray-50 border border-gray-200 text-[12px] text-gray-700 rounded-full py-2.5 pl-10 pr-10 outline-none focus:bg-white focus:border-[#e04f96] focus:ring-4 focus:ring-pink-500/10 transition-all placeholder:text-gray-400"
            />
            <Search className="absolute left-3.5 top-3 h-3.5 w-3.5 text-gray-400 group-focus-within:text-[#e04f96] transition-colors" />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                activeFilter === f
                  ? "bg-[#e04f96] text-white shadow-sm shadow-pink-300/30"
                  : "border border-pink-200 text-gray-500 hover:bg-pink-50 hover:text-[#e04f96] bg-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Just Shared Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white border border-pink-100 rounded-3xl overflow-hidden shadow-sm flex flex-col sm:flex-row items-stretch"
      >
        <div className="sm:w-32 h-24 sm:h-auto shrink-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=300"
            alt="MIT Summer Research"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="flex items-center gap-1.5 bg-pink-50 border border-pink-200 rounded-full px-2.5 py-0.5">
                <Users className="h-2.5 w-2.5 text-[#e04f96]" />
                <span className="text-[9px] font-extrabold text-[#e04f96] uppercase tracking-wider">
                  Just Shared by Isabella R. · 2h ago
                </span>
              </div>
            </div>
            <h3 className="font-extrabold text-[14px] text-[#2d1b28]">
              MIT Summer Research Program
            </h3>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Scholarship · Paid Research Program · Deadline Jul 5, 2026
            </p>
          </div>
          <div className="flex flex-row sm:flex-col gap-2 shrink-0">
            <button className="px-4 py-2 bg-[#e04f96] hover:bg-[#c43d83] text-white text-[11px] font-bold rounded-xl shadow-sm transition-colors cursor-pointer whitespace-nowrap">
              View details
            </button>
            <button className="px-4 py-2 bg-white border border-pink-200 hover:bg-pink-50 text-[#e04f96] text-[11px] font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap">
              <Bookmark className="h-3 w-3" />
              Save
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Scholarships ── */}
      <div className="bg-white rounded-3xl border border-pink-100 shadow-sm p-5">
        <SectionHeader
          icon={GraduationCap}
          title="Scholarships"
          count={4}
          color="bg-pink-50"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
      <div className="bg-white rounded-3xl border border-pink-100 shadow-sm p-5">
        <SectionHeader
          icon={MapPin}
          title="Internships"
          count={4}
          color="bg-pink-50"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
      <div className="bg-white rounded-3xl border border-pink-100 shadow-sm p-5">
        <SectionHeader
          icon={Globe}
          title="Remote Programs"
          count={4}
          color="bg-pink-50"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
