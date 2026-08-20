import { useState, useEffect } from "react";
import { Search, Bookmark, FileText, Calendar as CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";
import { API_BASE } from "../../lib/api";

interface MetricCardProps {
  icon: React.ElementType;
  value: number | string;
  label: string;
  delay?: number;
}

function MetricCard({ icon: Icon, value, label, delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white rounded-[14px] p-[15px_16px] border border-pink-100 shadow-xs flex items-center gap-[12px] hover:shadow-sm hover:-translate-y-[1px] hover:border-pink-200 transition-all cursor-pointer group"
    >
      <div className="w-10 h-10 rounded-2xl border border-pink-200 bg-pink-50/60 flex items-center justify-center text-[#e04f96] shrink-0 group-hover:scale-105 transition-transform">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-xl font-extrabold text-[#2d1b28]">{value}</div>
        <div className="text-[10px] text-gray-500 leading-tight font-medium">{label}</div>
      </div>
    </motion.div>
  );
}

export function StudentMetrics() {
  const [savedCount, setSavedCount] = useState(0);
  const [appliedCount, setAppliedCount] = useState(0);
  const [newThisWeek, setNewThisWeek] = useState(0);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState(0);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem("goc_token");

        const [userRes, oppsRes] = await Promise.all([
          fetch(`${API_BASE}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE}/api/opportunities`),
        ]);

        if (userRes.ok) {
          const data = await userRes.json();
          setSavedCount(data.user?.savedOpportunities?.length || 0);
          setAppliedCount(data.user?.appliedOpportunities?.length || 0);
        }

        if (oppsRes.ok) {
          const data = await oppsRes.json();
          const opps: any[] = data.opportunities || [];

          // Count opportunities published in the last 7 days
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          const thisWeek = opps.filter(
            (o) => o.status === "Published" && new Date(o.createdAt) >= oneWeekAgo
          ).length;
          setNewThisWeek(thisWeek);

          // Count upcoming deadlines (within next 30 days)
          const now = new Date();
          const in30 = new Date();
          in30.setDate(in30.getDate() + 30);
          const deadlines = opps.filter((o) => {
            if (!o.deadline || o.status !== "Published") return false;
            const d = new Date(o.deadline);
            return d >= now && d <= in30;
          }).length;
          setUpcomingDeadlines(deadlines);
        }
      } catch (err) {
        console.error("Failed to load metrics", err);
      }
    };

    fetchMetrics();

    // Refresh when user data changes (e.g., after save/apply)
    window.addEventListener("goc_user_updated", fetchMetrics);
    return () => window.removeEventListener("goc_user_updated", fetchMetrics);
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <MetricCard icon={Search} value={newThisWeek} label="New opportunities this week" delay={0} />
      <MetricCard icon={Bookmark} value={savedCount} label="Saved opportunities" delay={0.05} />
      <MetricCard icon={FileText} value={appliedCount} label="Applications submitted" delay={0.1} />
      <MetricCard icon={CalendarIcon} value={upcomingDeadlines} label="Upcoming deadlines" delay={0.15} />
    </div>
  );
}
