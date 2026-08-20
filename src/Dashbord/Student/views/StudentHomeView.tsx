import { useState, useEffect } from "react";
import { API_BASE } from "../../../lib/api";
import { ArrowRight, Search } from "lucide-react";
import { TabType } from "../StudentSidebar";
import { StudentMetrics } from "../StudentMetrics";
import { StudentOpportunities } from "../StudentOpportunities";
import { StudentFeedAndCalendar } from "../StudentFeedAndCalendar";

interface StudentHomeViewProps {
  onNavigate: (tab: TabType) => void;
}

export function StudentHomeView({ onNavigate }: StudentHomeViewProps) {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("goc_token");
      const [oppsRes, userRes] = await Promise.all([
        fetch(`${API_BASE}/api/opportunities`),
        fetch(`${API_BASE}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (oppsRes.ok) {
        const data = await oppsRes.json();
        const mapped = data.opportunities
          .filter((o: any) => o.status === "Published")
          .map((o: any) => ({ ...o, id: o._id }))
          .slice(0, 4); // Show only top 4
        setOpportunities(mapped);
      }

      if (userRes.ok) {
        const data = await userRes.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error("Error fetching home data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const savedIds = user?.savedOpportunities?.map((o: any) => o._id) || [];

  const toggleBookmark = async (id: string) => {
    try {
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/users/save-opportunity/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        window.dispatchEvent(new Event("goc_user_updated"));
        fetchData();
      }
    } catch (err) {
      console.error("Failed to save", err);
    }
  };

  return (
    <div className="space-y-[18px]">
      {/* Greeting & Search */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 flex-wrap">
        <div className="flex flex-col">
          <h1 className="text-[24px] font-black text-[#2a2026] tracking-[-0.01em] leading-tight">
            Hi, {user?.name?.split(" ")[0] || "there"}! <span className="text-[#f14f98]">💕</span>
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
        opportunities={opportunities}
        savedIds={savedIds}
        toggleBookmark={toggleBookmark}
        onViewAll={() => onNavigate("Opportunities")}
      />

      {/* Feed + Calendar */}
      <StudentFeedAndCalendar />
    </div>
  );
}
