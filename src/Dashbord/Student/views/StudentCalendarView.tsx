import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// ─── June 2026 calendar data ──────────────────────────────────────────────────
// June 1, 2026 = Monday → 1 blank Sunday cell in Sun-start grid
const JUNE_START_OFFSET = 1;
const JUNE_DAYS = 30;
const TODAY = 28;

// Days with event dots in June
const EVENT_DAYS = new Set([1, 5, 29, 30]);

// "This week" events (Jun 27 – Jul 1)
const THIS_WEEK = [
  {
    id: "w1",
    monthLabel: "JUN",
    day: 27,
    title: "1:1 with Dr. Priya Nandan",
    dayName: "Fri",
    isDeadline: false,
  },
  {
    id: "w2",
    monthLabel: "JUN",
    day: 30,
    title: "Google STEP Internship deadline",
    dayName: "Mon",
    isDeadline: true,
  },
  {
    id: "w3",
    monthLabel: "JUL",
    day: 1,
    title: "Women in Business Scholarship deadline",
    dayName: "Tue",
    isDeadline: true,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function StudentCalendarView() {
  // Build cells: null = blank, number = day
  const cells: (number | null)[] = [
    ...Array(JUNE_START_OFFSET).fill(null),
    ...Array.from({ length: JUNE_DAYS }, (_, i) => i + 1),
  ];

  return (
    <div className="space-y-5">
      {/* ── Page Header (plain, no card) ── */}
      <div>
        <h2 className="text-xl font-black text-[#2d1b28]">Calendar</h2>
        <p className="text-[12px] text-gray-400 mt-0.5">
          Deadlines and mentor sessions, at a glance.
        </p>
      </div>

      {/* ── Main row: Calendar + This Week ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-start">

        {/* ── Calendar Card (3/5) ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 }}
          className="lg:col-span-3 bg-white rounded-3xl border border-pink-100 shadow-sm p-5"
        >
          {/* Month nav */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-[14px] text-[#2d1b28]">June 2026</h3>
            <div className="flex items-center gap-1.5">
              <button className="w-7 h-7 rounded-full border border-pink-100 flex items-center justify-center text-gray-400 hover:bg-pink-50 hover:text-[#e04f96] transition-colors cursor-pointer">
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button className="w-7 h-7 rounded-full border border-pink-100 flex items-center justify-center text-gray-400 hover:bg-pink-50 hover:text-[#e04f96] transition-colors cursor-pointer">
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Day-of-week headers */}
          <div className="grid grid-cols-7 mb-1">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
              <div
                key={d}
                className="text-center text-[9px] font-extrabold text-gray-400 uppercase py-1.5 tracking-wider"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7">
            {cells.map((day, i) => {
              if (day === null) return <div key={`blank-${i}`} className="h-10" />;

              const isToday   = day === TODAY;
              const hasEvent  = EVENT_DAYS.has(day);

              return (
                <div key={day} className="flex flex-col items-center justify-start h-10">
                  <button
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-[13px] font-semibold transition-all cursor-pointer select-none ${
                      isToday
                        ? "bg-[#e04f96] text-white shadow-md shadow-pink-300/40 font-bold"
                        : "text-gray-600 hover:bg-pink-50 hover:text-[#e04f96]"
                    }`}
                  >
                    {day}
                  </button>
                  {hasEvent && (
                    <span
                      className={`w-1 h-1 rounded-full mt-0.5 ${
                        isToday ? "bg-white/60" : "bg-[#e04f96]"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── This Week Card (2/5) ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white rounded-3xl border border-pink-100 shadow-sm p-5"
        >
          <h3 className="font-bold text-[13px] text-[#2d1b28] mb-4">This week</h3>

          <div className="space-y-3">
            {THIS_WEEK.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
                className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-pink-50/30 transition-colors cursor-pointer group"
              >
                {/* Date badge */}
                <div
                  className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center shrink-0 ${
                    event.isDeadline
                      ? "bg-pink-100/80 border border-pink-200"
                      : "bg-blue-50 border border-blue-100"
                  }`}
                >
                  <span
                    className={`text-[8px] font-extrabold uppercase leading-none ${
                      event.isDeadline ? "text-[#e04f96]" : "text-blue-500"
                    }`}
                  >
                    {event.monthLabel}
                  </span>
                  <span
                    className={`text-[16px] font-black leading-tight ${
                      event.isDeadline ? "text-[#e04f96]" : "text-blue-600"
                    }`}
                  >
                    {event.day}
                  </span>
                </div>

                {/* Title + Day name */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-[12px] font-semibold leading-snug line-clamp-2 ${
                      event.isDeadline
                        ? "text-[#e04f96]"
                        : "text-[#2d1b28] group-hover:text-[#e04f96] transition-colors"
                    }`}
                  >
                    {event.title}
                  </p>
                </div>

                {/* Day label */}
                <span className="text-[10px] font-bold text-gray-400 shrink-0">
                  {event.dayName}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
