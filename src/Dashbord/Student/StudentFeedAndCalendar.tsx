import { FileText, CheckCircle2, ChevronRight, Bookmark } from "lucide-react";

export function StudentFeedAndCalendar() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Left Column (Upcoming deadlines & Pending/Action needed) */}
      <div className="space-y-5">
        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-3xl p-5 border border-pink-100/60 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-[#2d1b28]">Upcoming deadlines</h3>
            <a href="#" className="text-[11px] font-semibold text-[#e04f96] hover:underline">
              View calendar →
            </a>
          </div>

          <div className="space-y-2.5">
            {/* Item 1 */}
            <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-pink-50/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-100/70 border border-pink-200 flex flex-col items-center justify-center text-[#e04f96] leading-none shrink-0">
                  <span className="text-[8px] font-bold uppercase">JUN</span>
                  <span className="text-sm font-extrabold">30</span>
                </div>
                <div>
                  <div className="font-bold text-xs text-[#2d1b28]">Google STEP Internship 2026</div>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-[#e04f96] bg-pink-50 px-2 py-0.5 rounded-full shrink-0">
                5 days left
              </span>
            </div>

            {/* Item 2 */}
            <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-pink-50/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-100/70 border border-pink-200 flex flex-col items-center justify-center text-[#e04f96] leading-none shrink-0">
                  <span className="text-[8px] font-bold uppercase">JUL</span>
                  <span className="text-sm font-extrabold">01</span>
                </div>
                <div>
                  <div className="font-bold text-xs text-[#2d1b28]">$2,500 Women in Business Scholarship</div>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-[#e04f96] bg-pink-50 px-2 py-0.5 rounded-full shrink-0">
                6 days left
              </span>
            </div>

            {/* Item 3 */}
            <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-pink-50/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-100/70 border border-pink-200 flex flex-col items-center justify-center text-[#e04f96] leading-none shrink-0">
                  <span className="text-[8px] font-bold uppercase">JUL</span>
                  <span className="text-sm font-extrabold">10</span>
                </div>
                <div>
                  <div className="font-bold text-xs text-[#2d1b28]">Public Policy Fellowship</div>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-[#e04f96] bg-pink-50 px-2 py-0.5 rounded-full shrink-0">
                15 days left
              </span>
            </div>
          </div>

          <div className="text-center pt-2">
            <a href="#" className="text-[11px] font-bold text-[#e04f96] hover:underline">
              See all deadlines →
            </a>
          </div>
        </div>

        {/* Pending / Action Needed */}
        <div className="bg-white rounded-3xl p-5 border border-pink-100/60 shadow-xs space-y-3">
          <h3 className="font-bold text-xs text-[#2d1b28]">Pending / Action needed</h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-2xl border border-pink-100/60 hover:border-pink-300 bg-pink-50/20 transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-pink-100/70 text-[#e04f96] flex items-center justify-center shrink-0">
                  <FileText className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-bold text-gray-700">2 applications to complete</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl border border-pink-100/60 hover:border-pink-300 bg-pink-50/20 transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-pink-100/70 text-[#e04f96] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-bold text-gray-700">1 recommendation request</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl border border-pink-100/60 hover:border-pink-300 bg-pink-50/20 transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-pink-100/70 text-[#e04f96] flex items-center justify-center shrink-0">
                  <FileText className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-bold text-gray-700">1 document to upload</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column (What's been shared by others & Your calendar) */}
      <div className="space-y-5">
        {/* What's been shared by others */}
        <div className="bg-white rounded-3xl p-5 border border-pink-100/60 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-[#2d1b28]">What's been shared by others</h3>
            <a href="#" className="text-[11px] font-semibold text-[#e04f96] hover:underline">
              View all →
            </a>
          </div>

          <div className="space-y-3">
            {/* Share 1 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80"
                  alt="Isabella R."
                  className="w-8 h-8 rounded-full object-cover border border-pink-200 shrink-0"
                />
                <div>
                  <div className="text-xs font-bold text-[#2d1b28]">
                    Isabella R. <span className="font-normal text-gray-500">shared</span>
                  </div>
                  <div className="text-[10px] text-gray-500 italic">MIT Summer Research Program</div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[9px] text-gray-400">2h ago</span>
                <Bookmark className="h-3.5 w-3.5 text-gray-300 hover:text-[#e04f96] cursor-pointer" />
              </div>
            </div>

            {/* Share 2 */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-2.5">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                  alt="Sofia M."
                  className="w-8 h-8 rounded-full object-cover border border-pink-200 shrink-0"
                />
                <div>
                  <div className="text-xs font-bold text-[#2d1b28]">
                    Sofia M. <span className="font-normal text-gray-500">shared</span>
                  </div>
                  <div className="text-[10px] text-gray-500 italic">Yale Young Global Scholars</div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[9px] text-gray-400">5h ago</span>
                <Bookmark className="h-3.5 w-3.5 text-gray-300 hover:text-[#e04f96] cursor-pointer" />
              </div>
            </div>

            {/* Share 3 */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-2.5">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&auto=format&fit=crop&q=80"
                  alt="Ava K."
                  className="w-8 h-8 rounded-full object-cover border border-pink-200 shrink-0"
                />
                <div>
                  <div className="text-xs font-bold text-[#2d1b28]">
                    Ava K. <span className="font-normal text-gray-500">shared</span>
                  </div>
                  <div className="text-[10px] text-gray-500 italic">Nike Marketing Internship</div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[9px] text-gray-400">1d ago</span>
                <Bookmark className="h-3.5 w-3.5 text-gray-300 hover:text-[#e04f96] cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Your calendar Mini Widget */}
        <div className="bg-white rounded-3xl p-5 border border-pink-100/60 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-[#2d1b28]">Your calendar</h3>
            <a href="#" className="text-[11px] font-semibold text-[#e04f96] hover:underline">
              View full calendar →
            </a>
          </div>

          {/* Mini Days Week */}
          <div className="grid grid-cols-7 text-center gap-1">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
              <span key={d} className="text-[9px] font-bold text-gray-400 uppercase">
                {d}
              </span>
            ))}

            {[
              { day: 25, hasEvent: false },
              { day: 26, hasEvent: false },
              { day: 27, hasEvent: false },
              { day: 28, isToday: true, hasEvent: true },
              { day: 29, hasEvent: false },
              { day: 30, hasEvent: true },
              { day: 31, hasEvent: false },
            ].map((item) => (
              <div key={item.day} className="flex flex-col items-center py-1">
                <span
                  className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold transition-all ${
                    item.isToday
                      ? "bg-[#e04f96] text-white shadow-sm"
                      : "text-gray-700 hover:bg-pink-50"
                  }`}
                >
                  {item.day}
                </span>
                {item.hasEvent && !item.isToday && (
                  <span className="w-1 h-1 bg-[#e04f96] rounded-full mt-0.5"></span>
                )}
                {item.hasEvent && item.isToday && (
                  <span className="w-1 h-1 bg-[#e04f96] rounded-full mt-0.5"></span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
