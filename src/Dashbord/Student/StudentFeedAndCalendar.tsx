import { useState, useEffect } from "react";
import { FileText, Mail, ChevronRight, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { API_BASE } from "../../lib/api";

export function StudentFeedAndCalendar() {
  const [deadlines, setDeadlines] = useState<
    { month: string; day: string; title: string; daysLeft: string; urgent: boolean }[]
  >([]);
  const [pending, setPending] = useState<{ icon: React.ElementType; label: string }[]>([]);
  const [calendarDays, setCalendarDays] = useState<
    { day: number; hasEvent: boolean; isToday?: boolean }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("goc_token");

        const [oppsRes, userRes] = await Promise.all([
          fetch(`${API_BASE}/api/opportunities`),
          fetch(`${API_BASE}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const now = new Date();
        const in30Days = new Date();
        in30Days.setDate(now.getDate() + 30);

        if (oppsRes.ok) {
          const data = await oppsRes.json();
          const opps: any[] = data.opportunities || [];

          // Build deadline list from published opportunities with upcoming deadlines
          const upcomingOpps = opps
            .filter((o) => {
              if (!o.deadline || o.status !== "Published") return false;
              const d = new Date(o.deadline);
              return d >= now && d <= in30Days;
            })
            .sort(
              (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
            )
            .slice(0, 3);

          const formatted = upcomingOpps.map((o) => {
            const d = new Date(o.deadline);
            const diffDays = Math.ceil(
              (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
            );
            const monthStr = d
              .toLocaleString("default", { month: "short" })
              .toUpperCase();
            const dayStr = String(d.getDate()).padStart(2, "0");
            return {
              month: monthStr,
              day: dayStr,
              title: o.title,
              daysLeft: diffDays <= 1 ? "Due today!" : `${diffDays} days left`,
              urgent: diffDays <= 7,
            };
          });

          setDeadlines(formatted);

          // Build mini calendar: current week
          const today = now.getDate();
          const todayDay = now.getDay(); // 0=Sun
          // Show 7 days starting from start of this week (Sun)
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - todayDay);

          const days: { day: number; hasEvent: boolean; isToday?: boolean }[] = [];
          const deadlineDays = new Set(
            opps
              .filter((o) => o.deadline && o.status === "Published")
              .map((o) => new Date(o.deadline).getDate())
          );

          for (let i = 0; i < 7; i++) {
            const d = new Date(weekStart);
            d.setDate(weekStart.getDate() + i);
            days.push({
              day: d.getDate(),
              isToday: d.getDate() === today && d.getMonth() === now.getMonth(),
              hasEvent: deadlineDays.has(d.getDate()),
            });
          }
          setCalendarDays(days);
        }

        if (userRes.ok) {
          const data = await userRes.json();
          const user = data.user;
          const savedCount = user?.savedOpportunities?.length || 0;
          const appliedCount = user?.appliedOpportunities?.length || 0;

          const pendingItems: { icon: React.ElementType; label: string }[] = [];
          if (appliedCount > 0)
            pendingItems.push({ icon: FileText, label: `${appliedCount} application${appliedCount !== 1 ? "s" : ""} submitted` });
          if (savedCount > 0)
            pendingItems.push({ icon: Bookmark, label: `${savedCount} saved opportunit${savedCount !== 1 ? "ies" : "y"} to review` });
          if (pendingItems.length === 0)
            pendingItems.push({ icon: Mail, label: "No pending actions — you're all caught up!" });

          setPending(pendingItems);
        }
      } catch (err) {
        console.error("Failed to load feed data", err);
      }
    };

    fetchData();
    window.addEventListener("goc_user_updated", fetchData);
    return () => window.removeEventListener("goc_user_updated", fetchData);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* LEFT: Upcoming Deadlines + Pending */}
      <div className="space-y-5">
        {/* Upcoming Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[18px] p-[16px_18px] border border-pink-100 shadow-xs space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[13px] text-[#2d1b28]">Upcoming deadlines</h3>
            <a href="#" className="text-[11px] font-semibold text-[#e04f96] hover:underline cursor-pointer">
              View calendar →
            </a>
          </div>

          <div className="space-y-2">
            {deadlines.length === 0 ? (
              <p className="text-[12px] text-gray-400 py-2 font-medium">
                No upcoming deadlines in the next 30 days.
              </p>
            ) : (
              deadlines.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-2xl hover:bg-pink-50/40 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-100/70 border border-pink-200 flex flex-col items-center justify-center text-[#e04f96] leading-none shrink-0">
                      <span className="text-[8px] font-bold uppercase">{d.month}</span>
                      <span className="text-sm font-extrabold">{d.day}</span>
                    </div>
                    <span className="font-bold text-[12px] text-[#2d1b28] leading-snug group-hover:text-[#e04f96] transition-colors line-clamp-1">
                      {d.title}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${d.urgent ? "text-red-600 bg-red-50" : "text-[#e04f96] bg-pink-50"}`}>
                    {d.daysLeft}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="text-center pt-1">
            <a href="#" className="text-[11px] font-bold text-[#e04f96] hover:underline cursor-pointer">
              See all deadlines →
            </a>
          </div>
        </motion.div>

        {/* Pending / Action Needed */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[18px] p-[16px_18px] border border-pink-100 shadow-xs space-y-3"
        >
          <h3 className="font-bold text-[13px] text-[#2d1b28]">Pending / Action needed</h3>
          <div className="space-y-2">
            {pending.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={i}
                  className="w-full flex items-center justify-between p-3 rounded-2xl border border-pink-100/60 hover:border-[#e04f96]/30 hover:bg-pink-50/20 bg-pink-50/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-pink-100/70 text-[#e04f96] flex items-center justify-center shrink-0">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-[12px] font-semibold text-gray-700 group-hover:text-[#e04f96] transition-colors text-left">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-[#e04f96] transition-colors shrink-0" />
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* RIGHT: Info + Mini Calendar */}
      <div className="space-y-5">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-[18px] p-[16px_18px] border border-pink-100 shadow-xs space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[13px] text-[#2d1b28]">Platform highlights</h3>
          </div>
          <div className="space-y-2 text-[12px] text-gray-600">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-pink-50/30">
              <span className="text-[#e04f96] font-bold">🎓</span>
              <span>New scholarships and internships added regularly — check the Opportunities tab!</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-pink-50/30">
              <span className="text-[#e04f96] font-bold">💡</span>
              <span>Save opportunities to track them and apply before deadlines.</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-pink-50/30">
              <span className="text-[#e04f96] font-bold">📚</span>
              <span>Browse Resources for tips on writing strong applications.</span>
            </div>
          </div>
        </motion.div>

        {/* Mini Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-[18px] p-[16px_18px] border border-pink-100 shadow-xs space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[13px] text-[#2d1b28]">This week</h3>
            <a href="#" className="text-[11px] font-semibold text-[#e04f96] hover:underline cursor-pointer">
              View full calendar →
            </a>
          </div>

          <div className="grid grid-cols-7 text-center gap-1">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
              <span key={d} className="text-[9px] font-bold text-gray-400 uppercase">
                {d}
              </span>
            ))}

            {calendarDays.map((item, i) => (
              <div key={i} className="flex flex-col items-center py-1">
                <span
                  className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold transition-all cursor-pointer ${
                    item.isToday
                      ? "bg-[#e04f96] text-white shadow-sm shadow-pink-300/40"
                      : "text-gray-700 hover:bg-pink-50 hover:text-[#e04f96]"
                  }`}
                >
                  {item.day}
                </span>
                {item.hasEvent && (
                  <span className="w-1 h-1 bg-[#e04f96] rounded-full mt-0.5" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
