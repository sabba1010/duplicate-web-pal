import { FileText, CheckCircle2, Mail, ChevronRight, Bookmark } from "lucide-react";
import { motion } from "framer-motion";

export function StudentFeedAndCalendar() {
  const deadlines = [
    { month: "JUN", day: "30", title: "Google STEP Internship 2026", daysLeft: "6 days left", urgent: true },
    { month: "JUL", day: "01", title: "$2,500 Women in Business Scholarship", daysLeft: "6 days left", urgent: true },
    { month: "JUL", day: "10", title: "Public Policy Fellowship", daysLeft: "15 days left", urgent: false },
  ];

  const sharedItems = [
    {
      name: "Isabella R.",
      program: "MIT Summer Research Program",
      time: "2h ago",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80",
    },
    {
      name: "Sofia M.",
      program: "Yale Young Global Scholars",
      time: "5h ago",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
    },
    {
      name: "Ava K.",
      program: "Nike Marketing Internship",
      time: "1d ago",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&auto=format&fit=crop&q=80",
    },
  ];

  const pending = [
    { icon: FileText, label: "2 applications to complete" },
    { icon: Mail, label: "1 recommendation request" },
    { icon: FileText, label: "1 document to upload" },
  ];

  const calendarDays = [
    { day: 25, hasEvent: false },
    { day: 26, hasEvent: false },
    { day: 27, hasEvent: false },
    { day: 28, isToday: true, hasEvent: true },
    { day: 29, hasEvent: false },
    { day: 30, hasEvent: true },
    { day: 31, hasEvent: false },
  ];

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
            {deadlines.map((d, i) => (
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
                <span className="text-[10px] font-bold text-[#e04f96] bg-pink-50 px-2 py-0.5 rounded-full shrink-0">
                  {d.daysLeft}
                </span>
              </div>
            ))}
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
                    <span className="text-[12px] font-semibold text-gray-700 group-hover:text-[#e04f96] transition-colors">
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

      {/* RIGHT: Shared by Others + Calendar */}
      <div className="space-y-5">
        {/* Shared by Others */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-[18px] p-[16px_18px] border border-pink-100 shadow-xs space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[13px] text-[#2d1b28]">What's been shared by others</h3>
            <a href="#" className="text-[11px] font-semibold text-[#e04f96] hover:underline cursor-pointer">
              View all →
            </a>
          </div>

          <div className="space-y-3">
            {sharedItems.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between ${i > 0 ? "border-t border-gray-50 pt-3" : ""}`}
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-8 h-8 rounded-full object-cover border border-pink-200 shrink-0"
                  />
                  <div>
                    <div className="text-[12px] font-bold text-[#2d1b28]">
                      {item.name}{" "}
                      <span className="font-normal text-gray-500">shared</span>
                    </div>
                    <div className="text-[10px] text-gray-400 italic">{item.program}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[9px] text-gray-400">{item.time}</span>
                  <button className="text-gray-300 hover:text-[#e04f96] transition-colors cursor-pointer">
                    <Bookmark className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
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
            <h3 className="font-bold text-[13px] text-[#2d1b28]">Your calendar</h3>
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

            {calendarDays.map((item) => (
              <div key={item.day} className="flex flex-col items-center py-1">
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
