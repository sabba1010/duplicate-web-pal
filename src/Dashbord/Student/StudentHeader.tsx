import { Bell, MoreVertical, Calendar, Clock, X, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE } from "../../lib/api";

interface StudentHeaderProps {
  user: { name: string; username: string } | null;
  onLogout: () => void;
}

export function StudentHeader({ user, onLogout }: StudentHeaderProps) {
  const [extensionOn, setExtensionOn] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showPopover, setShowPopover] = useState(false);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("goc_token");
      if (!token) return;

      const res = await fetch(`${API_BASE}/api/users/reminders`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        const items: any[] = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (data.reminders) {
          data.reminders.forEach((r: any) => {
            const d = new Date(r.date);
            if (d >= today && !r.isCompleted) {
              items.push({
                id: r._id,
                title: r.title,
                date: d,
                type: "Personal Reminder"
              });
            }
          });
        }

        if (data.savedOpportunities) {
          data.savedOpportunities.forEach((opp: any) => {
            if (opp.deadline) {
              const d = new Date(opp.deadline);
              if (!isNaN(d.getTime()) && d >= today) {
                items.push({
                  id: opp._id,
                  title: `${opp.title}`,
                  date: d,
                  type: "Saved Deadline"
                });
              }
            }
          });
        }

        if (data.appliedOpportunities) {
          data.appliedOpportunities.forEach((opp: any) => {
            if (opp.deadline) {
              const d = new Date(opp.deadline);
              if (!isNaN(d.getTime()) && d >= today) {
                items.push({
                  id: opp._id,
                  title: `${opp.title}`,
                  date: d,
                  type: "Applied Deadline"
                });
              }
            }
          });
        }

        items.sort((a, b) => a.date.getTime() - b.date.getTime());
        setNotifications(items);
      }
    } catch (err) {
      console.error("Failed to load notifications", err);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const handleUpdate = () => fetchNotifications();
    window.addEventListener("goc_user_updated", handleUpdate);
    return () => window.removeEventListener("goc_user_updated", handleUpdate);
  }, []);

  return (
    <div className="pt-[18px] pb-4 px-[22px] mb-[18px] border-b border-gray-100 flex items-center justify-between gap-3 flex-wrap relative">
      {/* Left side */}
      <div className="flex flex-col">
        <h2 className="text-base font-extrabold text-[#cf3478]">GOC Extension</h2>
        <p className="text-[11.5px] text-[#8b7e85] font-semibold">Opportunities. Community. Growth.</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-[14px]">
        {/* Toggle Pill */}
        <div className="flex items-center gap-[10px] border border-[#f1e4e9] rounded-[24px] py-[6px] pl-[14px] pr-[8px] bg-white">
          <span className="text-[12px] font-bold text-[#2a2026]">Extension {extensionOn ? "ON" : "OFF"}</span>
          <button
            onClick={() => setExtensionOn(!extensionOn)}
            className={`w-[40px] h-[22px] rounded-[22px] relative transition-colors cursor-pointer ${
              extensionOn ? "bg-[#f14f98]" : "bg-[#e8dbe1]"
            }`}
          >
            <motion.div
              layout
              className="absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
              animate={{ right: extensionOn ? "2px" : "20px" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>

        {/* Bell with Dynamic Count Badge & Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowPopover(!showPopover)}
            className="relative w-[34px] h-[34px] rounded-full flex items-center justify-center text-[#8b7e85] hover:bg-[#fff7fa] hover:text-[#cf3478] transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="h-[18px] w-[18px]" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#f14f98] text-white text-[10px] font-black h-4.5 min-w-[18px] px-1 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Popover */}
          <AnimatePresence>
            {showPopover && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowPopover(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-3xl shadow-2xl border border-[#f1e4e9] z-50 overflow-hidden"
                >
                  <div className="p-4 bg-[#fff7fa] border-b border-[#f1e4e9] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-[#f14f98]" />
                      <span className="text-xs font-black text-[#2a2026]">
                        Upcoming Reminders ({notifications.length})
                      </span>
                    </div>
                    <button 
                      onClick={() => setShowPopover(false)}
                      className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-[#f9f0f5]">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs font-semibold text-slate-400">
                        No upcoming deadlines or reminders.
                      </div>
                    ) : (
                      notifications.map((item, idx) => (
                        <div key={idx} className="p-3.5 hover:bg-[#fff7fa] transition-colors space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[9.5px] font-black uppercase tracking-wider text-[#f14f98] bg-[#fde8f1] px-2 py-0.5 rounded-full">
                              {item.type}
                            </span>
                            <span className="text-[10.5px] font-bold text-slate-500 flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-slate-400" />
                              {item.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-[#2a2026] leading-snug">
                            {item.title}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Avatar */}
        <button className="w-[34px] h-[34px] rounded-full bg-[#fde8f1] text-[#f14f98] font-bold text-[15px] flex items-center justify-center hover:brightness-95 transition-all cursor-pointer">
          {user?.name?.[0] || "K"}
        </button>

        {/* More */}
        <button 
          onClick={onLogout}
          className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[#8b7e85] text-base hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
          title="Logout"
        >
          <MoreVertical className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
}
