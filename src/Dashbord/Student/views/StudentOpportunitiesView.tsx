import { motion, AnimatePresence } from "framer-motion";
import { Search, Bookmark, Users, GraduationCap, Globe, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { StudentOpportunityDetailView } from "./StudentOpportunityDetailView";

// ─── Data ────────────────────────────────────────────────────────────────────

const FILTERS = ["All", "Scholarships", "Internships", "Remote Programs", "Near You"];



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
  onClick,
  delay = 0,
}: {
  opp: OppCard;
  saved: boolean;
  onToggle: () => void;
  onClick?: () => void;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      onClick={onClick}
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
  const [selectedOpp, setSelectedOpp] = useState<OppCard | null>(null);
  
  const [opportunities, setOpportunities] = useState<OppCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const fetchOppsAndUser = async () => {
    try {
      const token = localStorage.getItem("goc_token");
      
      const [oppsRes, userRes] = await Promise.all([
        fetch("https://goc-backend-swart.vercel.app/api/opportunities"),
        fetch("https://goc-backend-swart.vercel.app/api/users/me", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (oppsRes.ok) {
        const data = await oppsRes.json();
        const mapped = data.opportunities
          .filter((o: any) => o.status === "Published")
          .map((o: any) => ({ ...o, id: o._id }));
        setOpportunities(mapped);
      }

      if (userRes.ok) {
        const data = await userRes.json();
        setUser(data.user);
      }
    } catch (err) {
      console.error("Failed to load data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOppsAndUser();
  }, []);

  const savedIds = user?.savedOpportunities?.map((o: any) => o._id) || [];
  const appliedIds = user?.appliedOpportunities?.map((o: any) => o._id) || [];

  const toggleSave = async (id: string) => {
    try {
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`https://goc-backend-swart.vercel.app/api/users/save-opportunity/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        window.dispatchEvent(new Event("goc_user_updated"));
        fetchOppsAndUser(); // refresh user data to reflect changes
      }
    } catch (error) {
      console.error("Failed to toggle save", error);
    }
  };

  if (selectedOpp) {
    return (
      <StudentOpportunityDetailView 
        opp={selectedOpp} 
        onBack={() => setSelectedOpp(null)} 
        relatedOpps={opportunities.filter(s => s.id !== selectedOpp.id)}
        isSaved={savedIds.includes(selectedOpp.id)}
        isApplied={appliedIds.includes(selectedOpp.id)}
        onInteraction={fetchOppsAndUser}
      />
    );
  }

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
          <button 
            onClick={() => opportunities.length > 0 && setSelectedOpp(opportunities[0])}
            className="flex-1 md:flex-none px-[18px] py-[9px] bg-[#f14f98] hover:bg-[#cf3478] text-white text-[12px] font-extrabold rounded-[20px] transition-colors whitespace-nowrap"
          >
            View details
          </button>
          <button className="flex-1 md:flex-none px-[18px] py-[9px] bg-white border border-[#fde8f1] text-[#cf3478] text-[12px] font-extrabold rounded-[20px] transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
            <Bookmark className="h-[13px] w-[13px]" /> Save
          </button>
        </div>
      </motion.div>

      {loading ? (
        <div className="py-20 text-center text-[#8b7e85] font-bold">Loading opportunities...</div>
      ) : (
        <>
          {/* ── Scholarships ── */}
          <div className="mb-[22px]">
            <SectionHeader icon={GraduationCap} title="Scholarships" count={opportunities.filter(o => o.category === "Scholarship").length} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px]">
              {opportunities.filter(o => o.category === "Scholarship").map((opp, i) => (
                <OpportunityCard
                  key={opp.id}
                  opp={opp}
                  saved={savedIds.includes(opp.id)}
                  onToggle={() => toggleSave(opp.id)}
                  onClick={() => setSelectedOpp(opp)}
                  delay={i * 0.06}
                />
              ))}
            </div>
          </div>

          {/* ── Internships ── */}
          <div className="mb-[22px]">
            <SectionHeader icon={MapPin} title="Internships" count={opportunities.filter(o => o.category === "Paid Internship").length} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px]">
              {opportunities.filter(o => o.category === "Paid Internship").map((opp, i) => (
                <OpportunityCard
                  key={opp.id}
                  opp={opp}
                  saved={savedIds.includes(opp.id)}
                  onToggle={() => toggleSave(opp.id)}
                  onClick={() => setSelectedOpp(opp)}
                  delay={i * 0.06}
                />
              ))}
            </div>
          </div>

          {/* ── Remote Programs ── */}
          <div className="mb-[22px]">
            <SectionHeader icon={Globe} title="Other Programs" count={opportunities.filter(o => !["Scholarship", "Paid Internship"].includes(o.category)).length} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px]">
              {opportunities.filter(o => !["Scholarship", "Paid Internship"].includes(o.category)).map((opp, i) => (
                <OpportunityCard
                  key={opp.id}
                  opp={opp}
                  saved={savedIds.includes(opp.id)}
                  onToggle={() => toggleSave(opp.id)}
                  onClick={() => setSelectedOpp(opp)}
                  delay={i * 0.06}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
