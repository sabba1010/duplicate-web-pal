import { motion } from "framer-motion";
import { RECOMMENDED_OPPORTUNITIES, CALENDAR_EVENTS } from "@/lib/mock-data";
import { ArrowRight, BookmarkPlus } from "lucide-react";
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
    <div className="space-y-5">
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
