import { motion } from "framer-motion";
import { RECOMMENDED_OPPORTUNITIES, CALENDAR_EVENTS } from "@/lib/mock-data";
import { ArrowRight, BookmarkPlus, Search } from "lucide-react";
import { TabType } from "../StudentSidebar";
import { StudentMetrics } from "../StudentMetrics";
import { StudentOpportunities } from "../StudentOpportunities";
import { StudentFeedAndCalendar } from "../StudentFeedAndCalendar";
import { useState } from "react";

interface StudentHomeViewProps {
  onNavigate: (tab: TabType) => void;
}

const OPPORTUNITY_CARDS = [
  {
    id: 1,
    title: "$2,500 Women in Business Scholarship",
    category: "Scholarship",
    deadline: "Jul 1, 2026",
    featured: true,
    tags: ["Women", "Business"],
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    title: "Google STEP Internship 2026",
    category: "Paid Internship",
    deadline: "Jun 30, 2026",
    featured: false,
    tags: ["STEM", "Google"],
    image: "https://images.unsplash.com/photo-1521898284481-a5ec348cb555?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    title: "Public Policy Fellowship",
    category: "Fellowship",
    deadline: "Jul 10, 2026",
    featured: false,
    tags: ["Policy", "Leadership"],
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 4,
    title: "Fully Funded Summer Program",
    category: "Paid Program",
    deadline: "Jul 15, 2026",
    featured: false,
    tags: ["Leadership", "Summer"],
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400",
  },
];

export function StudentHomeView({ onNavigate }: StudentHomeViewProps) {
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const toggleBookmark = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-[18px]">
      {/* Greeting & Search */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 flex-wrap">
        <div className="flex flex-col">
          <h1 className="text-[24px] font-black text-[#2a2026] tracking-[-0.01em] leading-tight">
            Hi, Karla! <span className="text-[#f14f98]">💕</span>
          </h1>
          <p className="text-[13px] text-[#8b7e85] font-semibold mt-[2px]">
            Let's find your next opportunity.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-[10px] bg-white border border-[#f1e4e9] rounded-[24px] py-[11px] px-[18px] w-full md:w-[380px] max-w-full">
          <Search className="h-[13px] w-[13px] text-[#f14f98] shrink-0" />
          <input
            type="text"
            placeholder="Search scholarships, internships, programs..."
            className="flex-1 border-none outline-none text-[12.5px] bg-transparent text-[#2a2026] placeholder-[#8b7e85]"
          />
        </div>
      </div>

      {/* Metrics */}
      <StudentMetrics />

      {/* Opportunities Cards */}
      <StudentOpportunities
        opportunities={OPPORTUNITY_CARDS}
        savedIds={savedIds}
        toggleBookmark={toggleBookmark}
        onViewAll={() => onNavigate("Opportunities")}
      />

      {/* Feed + Calendar */}
      <StudentFeedAndCalendar />
    </div>
  );
}
